/* ============================================================
   PHONES AND TOUCH SCREENS
   body.mob      phone held upright: bottom bar, panels as bottom sheets
   body.touchUI  touch screen: one finger scrolls, two fingers zoom,
                 a tap places / selects, press-and-hold picks a text up
   (only function declarations at the top level: init() calls
    initMobile() before this part of the script has run)
   ============================================================ */
function isMob() { return document.body.classList.contains('mob'); }
function isMobLayout() {
  let portrait = innerHeight >= innerWidth;
  try { const t = screen.orientation && screen.orientation.type; if (t) portrait = t.indexOf('portrait') === 0; } catch (e) { }
  let coarse = false;
  try { coarse = matchMedia('(pointer: coarse)').matches || (navigator.maxTouchPoints || 0) > 0; } catch (e) { }
  /* big phones in landscape: still the thumb layout, with the composer moved
     to the side instead of eating the few available pixels of height */
  const landscape = coarse && !portrait && innerWidth <= 960 && innerHeight <= 560;
  return innerWidth <= 560 || (coarse && portrait && innerWidth <= 760) || landscape;
}
/* -> true when the layout changed */
function syncMob() {
  const b = document.body, m = isMobLayout();
  document.documentElement.style.setProperty('--vh', innerHeight + 'px');
  if (b.classList.contains('mob') === m) { if (typeof syncSinglePageMode === 'function') syncSinglePageMode(); return false; }
  b.classList.toggle('mob', m);
  if (typeof syncSinglePageMode === 'function') syncSinglePageMode();
  return true;
}

/* the big «بعدی» button: next line into the next empty balloon;
   when this page is done, on to the next page that still has lines */
function placeNextLine() {
  closeMenus();
  if (!S.pages.length) return toast('اول عکس‌ها را بارگذاری کنید', 'wn');
  if (!S.doc.length) return toast('اول متن مترجم را بدهید — از منوی «بارگذاری»', 'wn', 4000);
  if (S.tool !== 'text') setTool('text');
  /* SFX / manual lines never go into a balloon by themselves — skip them here */
  const auto = b => lineKind(b) !== 'manual';
  const ps = placedSet(S.cur), left = live(S.cur).filter(b => !ps.has(b.id) && auto(b));
  if (!left.length) {
    const n = S.pages.length;
    for (let k = 1; k < n; k++) {
      const i = (S.cur + k) % n, q = placedSet(i);
      if (!live(i).some(b => !q.has(b.id) && auto(b))) continue;
      gotoPage(i, false);
      if (!goTarget(true) && S.pages[i].wrap) { S.navLock = Date.now(); S.pages[i].wrap.scrollIntoView({ block: 'start', behavior: 'smooth' }); }
      toast('صفحهٔ ' + faNum(i + 1) + ' — دوباره «بعدی» را بزنید', 'i', 2200);
      return;
    }
    return toast('همهٔ متن‌ها گذاشته شده', 'ok');
  }
  let b = currentBubble();
  if (!b || b.skip || ps.has(b.id) || !auto(b)) { b = left[0]; S.selB = b.id; syncCards(); }
  if (!placeAuto(b)) {
    render(S.cur); goTarget(true);
    toast('برای این متن بالن خالی پیدا نشد — روی صفحه بزنید تا همان‌جا برود', 'wn', 3800);
  }
}

/* Android: every page as its own picture, straight into the gallery */
async function exportGallery() {
  if (!S.pages.length) return toast('عکسی نیست', 'wn');
  const D = window.msDesktop;
  if (!D || !D.android || !D.save) return exportAll();
  const f = S.settings.fmt, dir = safeName(docName()).trim() || 'MobinStudio';
  let n = 0;
  busy.show('ذخیره در گالری…');
  try {
    for (let i = 0; i < S.pages.length; i++) {
      busy.set(i, S.pages.length, `صفحهٔ ${faNum(i + 1)} از ${faNum(S.pages.length)}`);
      await nextFrame();
      const c = flatten(i);
      const b = await toBlob(c, MIME[f], f === 'png' ? undefined : S.settings.quality / 100);
      c.width = c.height = 0;
      if (!b) throw new Error('ساخت عکس صفحهٔ ' + faNum(i + 1) + ' نشد');
      const r = await D.save(`${dir}/${String(i + 1).padStart(3, '0')}_${S.pages[i].name}.${f}`, await b.arrayBuffer());
      if (!r || !r.ok) throw new Error((r && r.error) || 'ذخیره نشد');
      n++;
    }
    busy.hide();
    toast(`${faNum(n)} صفحه در گالری ذخیره شد — Pictures/MobinStudio/${dir}`, 'ok', 6000);
  } catch (e) { toast('ذخیره در گالری ناموفق بود: ' + ((e && e.message) || e), 'er', 7000); }
  finally { busy.hide(); }
}

/* ============================================================
   MOBILE 2.0 — چهار مقصد پایین + ورودی همیشه در دسترس
   ============================================================ */
function syncMobTabs(mode) {
  const tabs = $$('#mobTabs .mobtab');
  if (!tabs.length) return;
  let cur = mode;
  if (!cur) {
    if (document.body.classList.contains('moreOpen')) cur = 'more';
    else if (document.body.classList.contains('composerMode')) cur = 'work';
    else if (!$('#inspect').classList.contains('hide')) cur = $('#pPages').classList.contains('on') ? 'pages' : 'style';
    else cur = 'work';
  }
  tabs.forEach(b => {
    const on = b.dataset.mtab === cur;
    b.classList.toggle('on', on);
    if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
  });
}

/* keep the tab state honest whenever a sheet opens/closes */
function mobPanelSync() {
  if (!isMob()) return;
  if ($('#inspect').classList.contains('hide') && document.body.classList.contains('composerMode')) {
    document.body.classList.remove('composerMode');
    mobComposerRestore();
  }
  syncMobTabs();
}

let mobComposerZoom = false;
/* while the composer is open, shrink a page that only just overflows so the
   whole page sits above the keyboard instead of hiding its lower balloons */
function mobFitStage() {
  if (!isMob() || !S.pages.length) return;
  const st = $('#stage'), p = S.pages[S.cur];
  if (!st || !p || !p.h) return;
  /* in landscape the side composer leaves plenty of height but little width:
     fitting the height would make the page a narrow strip, so fit the width
     and let the selected balloon scroll into view instead */
  if (innerWidth > innerHeight) { fitZoom(); return; }
  const fitH = (st.clientHeight - 24) / p.h;
  if (fitH < S.zoom && fitH > S.zoom * .55) {
    setZoom(fitH); mobComposerZoom = true;
    st.style.scrollBehavior = 'auto'; st.scrollTop = 0; st.scrollLeft = 0; st.style.scrollBehavior = '';
  }
}
function mobComposerRestore() {
  if (!mobComposerZoom) return;
  mobComposerZoom = false;
  requestAnimationFrame(() => { if (!document.body.classList.contains('composerMode') && S.pages.length) fitZoom(); });
}
/* the canvas can be shorter than the page while typing: keep the balloon
   being translated above the composer instead of hiding it below the fold */
function mobRevealSel() {
  if (!isMob() || !S.sel || !S.pages[S.cur]) return;
  try {
    const L = S.sel, m = layout(L);
    revealRect(S.cur, { x0: L.x - L.w / 2, x1: L.x + L.w / 2, y0: L.y - m.h / 2, y1: L.y + m.h / 2 }, false);
  } catch (e) { }
}
function mobComposerOpen() {
  if (!isMob() || !S.sel) return;
  document.body.classList.remove('moreOpen');
  document.body.classList.add('composerMode');
  setPanel('layer');
  syncMobTabs('work');
  requestAnimationFrame(() => { mobFitStage(); mobRevealSel(); });
}

function mobComposerClose(closeSheet) {
  if (document.body.classList.contains('composerMode') && typeof flushTextEdits === 'function') flushTextEdits();
  document.body.classList.remove('composerMode');
  mobComposerRestore();
  if (closeSheet) closePanels();
  else syncMobTabs();
}

let mobMoreResume = false;
function mobMoreOpen(on) {
  if (!isMob()) return;
  const open = !!on;
  if (open) mobMoreResume = document.body.classList.contains('composerMode');
  document.body.classList.toggle('moreOpen', open);
  $('#mobMore').setAttribute('aria-hidden', open ? 'false' : 'true');
  if (open) {
    if (document.body.classList.contains('composerMode') && typeof flushTextEdits === 'function') flushTextEdits();
    document.body.classList.remove('composerMode');
    mobComposerRestore();
    closePanels();
    const body = $('#mobMore .mm-body'); if (body) body.scrollTop = 0;
    syncMobTabs('more');
  } else {
    syncMobTabs('work');
  }
}

function mobMoreClose() {
  document.body.classList.remove('moreOpen');
  $('#mobMore').setAttribute('aria-hidden', 'true');
  const q = $('#mobMoreSearch'); if (q) q.value = '';
  $$('#mobMore .mm-tile').forEach(t => { t.hidden = false; });
  $$('#mobMore .mm-group').forEach(g => { g.hidden = false; });
  const resume = mobMoreResume; mobMoreResume = false;
  if (resume && S.sel) mobComposerOpen(); else { closePanels(); syncMobTabs('work'); }
}

function mobTab(kind) {
  if (!isMob()) return;
  if (document.body.classList.contains('composerMode') && typeof flushTextEdits === 'function') flushTextEdits();
  if (kind === 'work') {
    document.body.classList.remove('moreOpen');
    $('#mobMore').setAttribute('aria-hidden', 'true');
    document.body.classList.remove('composerMode');
    mobComposerRestore();
    closePanels();
    syncMobTabs('work');
    return;
  }
  if (kind === 'style') {
    document.body.classList.remove('moreOpen');
    $('#mobMore').setAttribute('aria-hidden', 'true');
    document.body.classList.remove('composerMode');
    mobComposerRestore();
    setPanel('layer');
    syncMobTabs('style');
    return;
  }
  if (kind === 'pages') {
    document.body.classList.remove('moreOpen');
    $('#mobMore').setAttribute('aria-hidden', 'true');
    document.body.classList.remove('composerMode');
    mobComposerRestore();
    setPanel('pages');
    syncMobTabs('pages');
    return;
  }
  if (document.body.classList.contains('moreOpen')) mobMoreClose();
  else mobMoreOpen(true);
}

function mobRunCommand(name) {
  if (name === 'ghost') {
    mobMoreOpen(false);
    setTimeout(() => { if (typeof toggleGhost === 'function') toggleGhost(); }, 20);
    return;
  }
  const map = {
    newProj: '#bNewProj', openProj: '#bOpenProj', saveProj: '#bSaveProj', saveAs: '#bSaveAs',
    imgs: '#fImgs', raw: '#fRawImgs', txt: '#fTxt', paste: '#bPaste', remote: '#bRemoteRail',
    expAll: '#bExpAll', expOne: '#bExpOne', clean: '#tClean',
    ai: '#bAi', settings: '#bSettings', help: '#bHelp'
  };
  const n = $(map[name]);
  if (!n) { toast('این کار در این نسخه در دسترس نیست', 'wn'); return; }
  mobMoreOpen(false);
  closeMenus();
  setTimeout(() => { try { n.click(); } catch (e) { toast('اجرای این کار ممکن نشد', 'wn'); } }, 20);
}

function initMobile() {
  const body = document.body;
  if (window.MOBIN_ANDROID) body.classList.add('android');
  const mv = document.querySelector('meta[name="ms-version"]');
  if (mv && $('#mmVer')) $('#mmVer').textContent = typeof faNum === 'function' ? faNum(mv.content) : mv.content;
  let touch = false;
  try { touch = (navigator.maxTouchPoints || 0) > 0 || matchMedia('(pointer: coarse)').matches; } catch (e) { }
  if (touch) body.classList.add('touchUI');
  syncMob();

  /* soft keyboard open = the window got much shorter while a text field has focus */
  let baseH = innerHeight, wasMob = isMob();
  const typing = () => {
    const a = document.activeElement;
    return !!a && (a.tagName === 'TEXTAREA' || a.isContentEditable || (a.tagName === 'INPUT' && /^(text|search|number|email|url|tel|password)$/i.test(a.type || 'text')));
  };
  const syncKbd = () => {
    const t = typing(); if (!t) baseH = innerHeight;
    const was = body.classList.contains('kbd');
    body.classList.toggle('kbd', t && innerHeight < baseH - 120);
    if (body.classList.contains('kbd') && !was && body.classList.contains('composerMode')) setTimeout(mobRevealSel, 80);
  };
  addEventListener('resize', () => {
    const changed = syncMob();
    const mobNow = isMob();
    if (changed && mobNow && !wasMob) { closePanels(); refitSoon(); }
    /* only leaving the phone layout clears these; a soft-keyboard resize must
       keep the composer (and the selected layer) exactly where it was */
    if (!mobNow) {
      body.classList.remove('composerMode', 'moreOpen');
      if ($('#mobMore')) $('#mobMore').setAttribute('aria-hidden', 'true');
      syncMobTabs();
    }
    wasMob = mobNow;
    syncKbd();
  });
  document.addEventListener('focusin', () => setTimeout(syncKbd, 320));
  document.addEventListener('focusout', () => setTimeout(syncKbd, 320));

  /* bottom sheets: handle on top — tap = taller / shorter, pull down = close */
  for (const id of ['script', 'inspect']) {
    const side = $('#' + id);
    const grab = el('div', { class: 'sgrab', 'aria-hidden': 'true' }, el('i'));
    side.prepend(grab);
    const head = side.querySelector('.sh,.ihead');
    const tall = on => { side.classList.toggle('tall', !!on); syncPanelMode(); };
    let d = null;
    const down = e => {
      if (!isMob() || d) return;
      if (e.currentTarget !== grab && e.target.closest('button,input,select,textarea,label,a')) return;
      d = { y: e.clientY, t: e.timeStamp, id: e.pointerId, dy: 0, grab: e.currentTarget === grab };
      try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) { }
      side.classList.add('dragging');
    };
    const move = e => {
      if (!d || e.pointerId !== d.id) return;
      d.dy = e.clientY - d.y;
      side.style.transform = d.dy > 0 ? `translateY(${Math.round(d.dy)}px)` : '';
    };
    const up = e => {
      if (!d || e.pointerId !== d.id) return;
      const { dy, t, grab: g } = d; d = null;
      side.classList.remove('dragging'); side.style.transform = '';
      if (e.type === 'pointercancel') return;
      const fast = e.timeStamp - t < 260;
      if (Math.abs(dy) < 8) { if (g) tall(!side.classList.contains('tall')); return; }
      if (dy > 80 || (fast && dy > 26)) {
        if (side.classList.contains('tall') && !fast && dy < 240) tall(false);
        else togglePanel(id, false);
      } else if (dy < -30) tall(true);
    };
    for (const n of [grab, head]) if (n) {
      n.addEventListener('pointerdown', down);
      n.addEventListener('pointermove', move);
      n.addEventListener('pointerup', up);
      n.addEventListener('pointercancel', up);
    }
  }

  $('#bNextM').onclick = placeNextLine;

  /* four destinations + page pill + more screen */
  $$('#mobTabs .mobtab').forEach(b => { b.onclick = () => mobTab(b.dataset.mtab); });
  if ($('#mobMoreBtn')) $('#mobMoreBtn').onclick = () => { if (body.classList.contains('moreOpen')) mobMoreClose(); else mobMoreOpen(true); };
  if ($('#mobMoreClose')) $('#mobMoreClose').onclick = mobMoreClose;
  if ($('#mpPrev')) $('#mpPrev').onclick = () => { const b = $('#bPgPrev'); if (b && !b.disabled) b.click(); };
  if ($('#mpNext')) $('#mpNext').onclick = () => { const b = $('#bPgNext'); if (b && !b.disabled) b.click(); };
  if ($('#mcNext')) $('#mcNext').onclick = () => { if (typeof flushTextEdits === 'function') flushTextEdits(); placeNextLine(); setTimeout(mobRevealSel, 80); };
  if ($('#mcAll')) $('#mcAll').onclick = () => { mobComposerClose(true); togglePanel('script', true); syncMobTabs('work'); };
  if ($('#mcClose')) $('#mcClose').onclick = () => mobComposerClose(true);
  if ($('#mobGhostFab')) $('#mobGhostFab').onclick = () => { if (typeof toggleGhost === 'function') toggleGhost(); };
  $$('#mobMore .mm-tile').forEach(t => { t.onclick = () => mobRunCommand(t.dataset.mcmd); });
  if ($('#mobMoreSearch')) $('#mobMoreSearch').addEventListener('input', e => {
    const q = e.target.value.trim();
    $$('#mobMore .mm-group').forEach(g => {
      let any = false;
      [...g.querySelectorAll('.mm-tile')].forEach(t => { const hit = !q || t.textContent.includes(q); t.hidden = !hit; if (hit) any = true; });
      g.hidden = !any;
    });
  });
  syncMobTabs();
  const gal = $('#bExpGal'); if (gal) gal.onclick = () => { closeMenus(); exportGallery(); };
  /* Android's file box selects several pictures only after a long press on the first one */
  if (window.MOBIN_ANDROID) ['#fImgs', '#fImgs2'].forEach(q => { const n = $(q); if (n) n.addEventListener('click', () =>
    toast('برای انتخاب چند عکس با هم: روی اولی انگشت را نگه دارید، بعد بقیه را بزنید (یا یک ZIP بدهید)', 'i', 7000)); });
  $('#tClean').addEventListener('click', () => {
    if (touch && S.tool === 'clean') toast('روی فضای خالیِ داخل بالن بزنید — برای برداشتن رنگ، انگشت را نگه دارید', 'i', 4500);
  });
  if (typeof syncGhostUI === 'function') syncGhostUI();
  if (touch) initTouch();

  /* Android back button: close whatever is open, one thing at a time.
     0 = nothing left to close (the app then goes to the background) */
  window.__msBack = () => {
    try {
      if ($('#busy').classList.contains('on')) return 1;
      if (typeof tOn !== 'undefined' && tOn) { endTour(false); return 1; }
      if ($$('.dd.open').length) { closeMenus(); return 1; }
      if ($('#ovAsk').classList.contains('on')) { askEnd(false); return 1; }
      const ov = $$('.ov.on'); if (ov.length) { ov[ov.length - 1].classList.remove('on'); return 1; }
      const a = document.activeElement;
      if (a && a !== body && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) { a.blur(); return 1; }
      if (body.classList.contains('moreOpen')) { mobMoreClose(); return 1; }
      if (body.classList.contains('composerMode')) { mobComposerClose(true); return 1; }
      if (NARROW() && (!$('#script').classList.contains('hide') || !$('#inspect').classList.contains('hide'))) { closePanels(); return 1; }
      if (S.tool === 'clean') { setTool('text'); return 1; }
      if (S.sel) { S.sel = null; selectLayer(null); render(S.cur); return 1; }
      if (window.__msDirty && window.__msDirty()) {
        confirmDiscard('بستن برنامه').then(ok => { if (ok) dcmd('quit'); });
        return 1;
      }
    } catch (e) { }
    return 0;
  };

  /* ---------- fingers on the pages ---------- */
  function initTouch() {
    const st = $('#stage'), host = $('#pages');
    const pts = new Map();               // finger id -> {x, y}
    let g = null, fl = 0, lp = 0, pz = null, praf = 0;
    /* A slightly larger intent threshold avoids accidental canvas actions while panning. */
    const SLOP = 12;
    const pageOf = t => { const w = t && t.closest ? t.closest('.pw') : null; return w ? +w.dataset.pg : -1; };
    const fake = (tgt, pid, x, y, alt) => ({ button: 0, pointerType: 'touch', isPrimary: true, pointerId: pid, target: tgt,
      clientX: x, clientY: y, altKey: !!alt, shiftKey: false, ctrlKey: false, metaKey: false, preventDefault() { }, stopPropagation() { } });
    const pad = () => 14 / (S.zoom || 1);            // a finger is wider than a mouse pointer
    const buzz = () => { try { if (navigator.vibrate) navigator.vibrate(12); } catch (e) { } };
    const stopFling = () => { if (fl) cancelAnimationFrame(fl); fl = 0; };
    const stopLp = () => { clearTimeout(lp); lp = 0; };

    function dragStart(L, i, o, h) {
      pushHist();
      S.drag = { mode: h === 2 || h === 3 ? 'width' : 'move', o, x: L.x, y: L.y, w: L.w, i, side: h, moved: false };
    }
    function cancelDrag() {
      const d = S.drag; if (!d) return;
      const L = S.sel;
      if (L && d.moved) { L.x = d.x; L.y = d.y; L.w = d.w; }
      S.drag = null; S.hist.pop(); updateHistBtns(); render(d.i);
    }
    function longPress() {
      lp = 0;
      if (!g || g.k !== 'tap' || g.i < 0) return;
      const i = g.i, p = S.pages[i]; if (!p) return;
      g.k = 'held';
      if (S.tool === 'clean') { onDown(fake(g.tgt, g.pid, g.sx, g.sy, true), i); buzz(); return; }   // hold = take a fill away
      const o = toImg(fake(g.tgt, g.pid, g.sx, g.sy), i);
      for (let k = p.layers.length - 1; k >= 0; k--) {
        const L = p.layers[k]; if (!hitLayer(L, o.x, o.y, pad())) continue;
        if (i !== S.cur) { const old = S.cur; S.cur = i; pickNextBubble(); render(old); syncLight(); }
        selectLayer(L, false);
        dragStart(L, i, o, 1);
        g.k = 'drag'; g.L = L; g.ox = L.x; g.oy = L.y; g.ow = L.w;
        buzz();
        return;
      }
    }
    function fling(vx, vy) {
      stopFling();
      let last = performance.now();
      const step = now => {
        const dt = Math.min(34, Math.max(1, now - last)); last = now;
        const l = st.scrollLeft, t = st.scrollTop;
        st.scrollLeft = l - vx * dt; st.scrollTop = t - vy * dt;
        const f = Math.pow(.9965, dt); vx *= f; vy *= f;
        if ((st.scrollLeft === l && st.scrollTop === t) || Math.hypot(vx, vy) < .02) { fl = 0; return; }
        fl = requestAnimationFrame(step);
      };
      fl = requestAnimationFrame(step);
    }
    /* zoom so that the point that was under (px,py) ends up under (x,y) */
    function zoomAround(z, px, py, x, y) {
      setZoom(z, { x: px, y: py });
      st.scrollLeft += px - x;
      st.scrollTop += py - y;
    }
    function startPinch() {
      stopFling(); stopLp();
      const [a, b] = [...pts.values()];
      g = { k: 'pinch' };
      pz = { d0: Math.max(24, Math.hypot(b.x - a.x, b.y - a.y)), z0: S.zoom, mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2 };
    }
    function pinchMove() {
      if (praf) return;
      praf = requestAnimationFrame(() => {
        praf = 0;
        if (!pz || pts.size < 2) return;
        const [a, b] = [...pts.values()];
        const d = Math.max(24, Math.hypot(b.x - a.x, b.y - a.y)), mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
        const lo = Math.min(S.fitZoom || 1, 1) * .5;
        zoomAround(clamp(pz.z0 * d / pz.d0, lo, 4), pz.mx, pz.my, mx, my);
        pz.mx = mx; pz.my = my;
      });
    }
    function endPinch() { pz = null; if (praf) { cancelAnimationFrame(praf); praf = 0; } sharpenSoon(80); }

    addEventListener('pointerdown', stopFling, true);
    host.addEventListener('contextmenu', e => e.preventDefault());
    host.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'touch') return;          // mouse and pen keep the desktop behaviour
      e.stopPropagation();
      pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pts.size === 1) {
        const i = pageOf(e.target);
        g = { k: 'tap', i, pid: e.pointerId, tgt: e.target, sx: e.clientX, sy: e.clientY, t: e.timeStamp,
          bl: st.scrollLeft, bt: st.scrollTop, vx: 0, vy: 0, lx: e.clientX, ly: e.clientY, lt: e.timeStamp };
        /* finger on the text that is already selected: move it (or its width, at the sides) */
        if (i >= 0 && i === S.cur && S.sel && S.tool === 'text' && !S.drag && S.pages[i].layers.includes(S.sel)) {
          const o = toImg(e, i), h = hitLayer(S.sel, o.x, o.y, pad());
          if (h) { const L = S.sel; dragStart(L, i, o, h); g.k = 'drag'; g.L = L; g.ox = L.x; g.oy = L.y; g.ow = L.w; return; }
        }
        stopLp(); lp = setTimeout(longPress, 430);
        return;
      }
      stopLp();
      if (pts.size === 2) { if (g && g.k === 'drag') cancelDrag(); startPinch(); }
    }, true);

    addEventListener('pointermove', e => {
      const q = pts.get(e.pointerId); if (!q) return;
      q.x = e.clientX; q.y = e.clientY;
      if (!g) return;
      if (g.k === 'pinch') return pinchMove();
      if (g.k === 'tap' || g.k === 'held') {
        const dx = e.clientX - g.sx, dy = e.clientY - g.sy;
        if (dx * dx + dy * dy < SLOP * SLOP) return;
        stopLp();
        Object.assign(g, { k: 'pan', sx: e.clientX, sy: e.clientY, bl: st.scrollLeft, bt: st.scrollTop, lx: e.clientX, ly: e.clientY, lt: e.timeStamp });
        return;
      }
      if (g.k !== 'pan') return;
      const wl = g.bl - (e.clientX - g.sx), wt = g.bt - (e.clientY - g.sy);
      st.scrollLeft = wl; st.scrollTop = wt;
      /* stopped at an edge: going back moves the page again right away */
      if (Math.abs(st.scrollLeft - wl) > 1) { g.bl = st.scrollLeft; g.sx = e.clientX; }
      if (Math.abs(st.scrollTop - wt) > 1) { g.bt = st.scrollTop; g.sy = e.clientY; }
      const dt = e.timeStamp - g.lt;
      if (dt > 0) {
        const a = Math.min(1, dt / 50);
        g.vx += ((e.clientX - g.lx) / dt - g.vx) * a;
        g.vy += ((e.clientY - g.ly) / dt - g.vy) * a;
        g.lx = e.clientX; g.ly = e.clientY; g.lt = e.timeStamp;
      }
    }, { passive: true });

    const up = e => {
      if (!pts.has(e.pointerId)) return;
      pts.delete(e.pointerId);
      if (!g) return;
      if (g.k === 'pinch') {
        if (pts.size >= 2) return;
        endPinch();
        if (pts.size === 1) {        // one finger stays down: keep scrolling with it
          const [pid, q] = [...pts.entries()][0];
          g = { k: 'pan', i: -1, pid, sx: q.x, sy: q.y, bl: st.scrollLeft, bt: st.scrollTop, vx: 0, vy: 0, lx: q.x, ly: q.y, lt: e.timeStamp };
        } else g = null;
        return;
      }
      if (pts.size) return;
      stopLp();
      const s = g; g = null;
      if (e.type !== 'pointerup') return;
      if (s.k === 'tap' && s.i >= 0 && e.timeStamp - s.t < 600) {
        /* a tap on another page works on that page right away */
        if (s.i !== S.cur && S.pages[s.i]) { const old = S.cur; S.cur = s.i; S.sel = null; pickNextBubble(); render(old); syncLight(); syncPagesPanel(); }
        onDown(fake(s.tgt, s.pid, s.sx, s.sy), s.i);
        onUp();
      } else if (s.k === 'drag' && s.L && s.L.x === s.ox && s.L.y === s.oy && s.L.w === s.ow && e.timeStamp - s.t < 450) {
        if (isMob() && typeof mobComposerOpen === 'function') mobComposerOpen();
        else setPanel('layer');      // a tap on the selected text: open its settings
      } else if (s.k === 'pan' && e.timeStamp - s.lt < 70 && Math.hypot(s.vx, s.vy) > .2) fling(s.vx, s.vy);
    };
    addEventListener('pointerup', up);
    addEventListener('pointercancel', up);
  }
}
