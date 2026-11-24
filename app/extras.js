/* ============================================================
   Mobin Studio 8.4.0 — ابزارهای تازه
   ۱) خطکش هوشمند و چسبیدن هنگام کشیدن متن
   ۲) اصلاح سریع فارسی (نیم‌فاصله، ی/ک، فاصله‌ها)
   ۳) بازبینی متن: خطاهای نگارشی + سند پشت‌سرهم
   ۴) حالت تایپ پشت‌سرهم (Enter = متن بعدی)
   این فایل بعد از app.js بسته می‌شود؛ پس همهٔ توابع و وضعیت
   برنامه در دسترس است و کد بالاخره یک‌بار درست اجرا می‌شود.
   ============================================================ */
'use strict';

/* ============================================================
   ۱) خطکش هوشمند
   هنگام جابه‌جا کردن یک متن، لبه‌ها و مرکز آن با مرکز صفحه،
   لبه‌های صفحه و سایر متن‌های همان صفحه مقایسه می‌شوند و اگر
   به اندازهٔ چند پیکسل نزدیک باشند، خودکار می‌چسبند.
   کلید Alt هنگام کشیدن، چسبیدن را موقتاً خاموش می‌کند.
   ============================================================ */
const GUIDE_PX = 6;                    // آستانهٔ چسبیدن، بر حسب پیکسلِ صفحه‌نمایش

function snapAxisExtras(lines, own, thr) {
  let best = 0, hit = false;
  for (const v of lines) for (const a of own) {
    const d = v - a;
    if (Math.abs(d) <= thr && (!hit || Math.abs(d) < Math.abs(best))) { best = d; hit = true; }
  }
  if (!hit) return { d: 0, at: [] };
  const at = [];
  for (const v of lines) if (own.some(a => Math.abs(a + best - v) < .6) && at.indexOf(v) < 0) at.push(v);
  return { d: best, at };
}
/* فقط L را جابه‌جا می‌کند (بدون تغییر اندازه) و S.guides را پر می‌کند */
function snapLayerExtras(L) {
  const p = S.pages[S.cur];
  if (!p || !L) { S.guides = null; return; }
  const thr = Math.max(1, GUIDE_PX / (S.zoom || 1));
  const hw = L.w / 2, hh = layout(L).h / 2;
  const VX = [p.w / 2, 0, p.w], HY = [p.h / 2, 0, p.h];
  for (const o of p.layers) {
    if (o === L) continue;
    const m = layout(o);
    VX.push(o.x, o.x - o.w / 2, o.x + o.w / 2);
    HY.push(o.y, o.y - m.h / 2, o.y + m.h / 2);
  }
  const sx = snapAxisExtras(VX, [L.x, L.x - hw, L.x + hw], thr);
  const sy = snapAxisExtras(HY, [L.y, L.y - hh, L.y + hh], thr);
  L.x = Math.round(L.x + sx.d);
  L.y = Math.round(L.y + sy.d);
  S.guides = (sx.at.length || sy.at.length) ? { x: sx.at, y: sy.at } : null;
}
function clearGuides() { if (S.guides) { S.guides = null; } }
/* خطوط راهنما روی همان بوم صفحه کشیده می‌شوند (مختصات تصویر) */
function drawGuidesExtras(c, i) {
  const p = S.pages[i], g = S.guides;
  if (!p || !g) return;
  const k = 1 / (S.zoom || 1);
  c.save();
  c.lineWidth = Math.max(1, k);
  c.setLineDash([5 * k, 4 * k]);
  c.strokeStyle = 'rgba(255,122,61,.95)';
  for (const x of g.x) { c.beginPath(); c.moveTo(x, 0); c.lineTo(x, p.h); c.stroke(); }
  for (const y of g.y) { c.beginPath(); c.moveTo(0, y); c.lineTo(p.w, y); c.stroke(); }
  c.restore();
}

/* ============================================================
   ۲) اصلاح سریع فارسی
   fixText خودِ برنامه (همان نرمال‌ساز ورودی متن) با تنظیمات
   همیشه‌فعال استفاده می‌شود: ی/ک فارسی، علائم فارسی، نیم‌فاصله
   و فاصله‌های اضافه. رقم‌ها دست‌نخورده می‌مانند.
   ============================================================ */
function fixFaOpts() {
  return { arabic: true, punct: true, zwnj: true, zwnjTar: !!S.settings.zwnjTar, ellip: false, digits: false };
}
function fixFa(t) { return fixText(String(t == null ? '' : t), fixFaOpts()); }

function setLayerText(L, txt) {
  if (!L || L.t === txt) return false;
  L.t = txt;
  if (L.bid) { const b = bubbles(S.cur).find(x => x.id === L.bid); if (b) b.text = txt; }
  return true;
}
function applyQuickFix(L) {
  if (!L) return toast('اول یک متن روی صفحه را انتخاب کنید', 'wn');
  const before = L.t || '';
  const after = fixFa(before);
  if (after === before) return toast('چیزی برای اصلاح نبود — متن سالم است', 'ok', 2600);
  pushHist();
  setLayerText(L, after);
  afterEdit();
  toast('اصلاح شد: نیم‌فاصله، ی/ک فارسی و فاصله‌های اضافه', 'ok', 3600);
}

/* ============================================================
   ۳) بازبینی متن
   ============================================================ */
const escHtml = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* هر قاعده: k = نام خطا، re = الگو، soft = فقط وقتی تنظیم مربوطه روشن است */
const PROOF_RULES = [
  { k: 'ی/ک عربی یا همزهٔ عربی', re: /[يكأإةۀ]/ },
  { k: 'نیم‌فاصلهٔ «می/نمی»', re: /(^|[\s،؛؟!.:«»"'\u200c\n(])(ن?می)\s+(?=[آ-یء])/ },
  { k: 'نیم‌فاصلهٔ «ها/های»', re: /[آ-ی]{2,}\s+(ها|های|هایی|هایم|هایت|هایش|هایمان|هایتان|هایشان)(?=[\s،؛؟!«»)"'\n]|$)/ },
  { k: 'نیم‌فاصلهٔ «تر/ترین»', re: /[آ-ی]{3,}\s+(تر|تری|ترین)(?=[\s،؛؟!«»)"'\n]|$)/, soft: 'zwnjTar' },
  { k: 'فاصلهٔ اضافه', re: /[ \t]{2,}/ },
  { k: 'فاصله پیش از علامت', re: /\s+[،؛؟!.:]/ },
  { k: 'تکرار علامت', re: /([؟!،.])\1/ },
  { k: 'گیومهٔ انگلیسی', re: /["']/ },
  { k: 'رقم لاتین', re: /[0-9]/ },
  { k: 'حروف لاتین در متن فارسی', re: /[آ-ی]\s?[A-Za-z]|[A-Za-z]\s?[آ-ی]/ }
];

/* یک‌بار کل پروژه را می‌گردد و برای هر متن، همهٔ خطاهایش را برمی‌گرداند */
function scanProof() {
  const out = [];
  for (let pi = 0; pi < S.doc.length; pi++) {
    for (const b of (S.doc[pi] || [])) {
      if (b.skip) continue;
      const t = b.text == null ? '' : String(b.text);
      if (!t.trim()) {
        out.push({ pi, bid: b.id, tag: b.tag || '', kinds: ['متن خالی'], empty: true, text: '', fixed: null });
        continue;
      }
      const kinds = [], marks = [];
      for (const r of PROOF_RULES) {
        if (r.soft && !S.settings[r.soft]) continue;
        const m = r.re.exec(t);
        if (!m) continue;
        if (kinds.indexOf(r.k) < 0) kinds.push(r.k);
        marks.push({ i: m.index, n: m[0].length });
      }
      if (!kinds.length) continue;
      const fixed = fixFa(t);
      out.push({ pi, bid: b.id, tag: b.tag || '', kinds, text: t, marks, fixed: fixed !== t ? fixed : null });
    }
  }
  return out;
}

let proofItems = [];

function proofRow(it) {
  const row = el('div', { class: 'pfRow' });
  const meta = el('div', { class: 'pfMeta' });
  meta.append(el('b', { text: 'صفحهٔ ' + faNum(it.pi + 1) }), document.createTextNode(it.tag || '—'));
  const body = el('div', { class: 'pfBody' });
  body.append(el('div', { class: 'pfKind', text: it.kinds.join(' · ') }));
  const tx = el('div', { class: 'pfText' });
  if (it.marks && it.marks.length) {
    const m = it.marks[0];
    tx.innerHTML = escHtml(it.text.slice(0, m.i)) + '<mark>' + escHtml(it.text.substr(m.i, m.n)) + '</mark>' + escHtml(it.text.slice(m.i + m.n));
  } else tx.textContent = it.text || '(بدون متن)';
  body.append(tx);
  if (it.fixed) {
    const af = el('div', { class: 'pfAfter' });
    af.append(el('span', { text: 'درست می‌شود به: ' }), el('span', { text: it.fixed }));
    body.append(af);
  }
  const acts = el('div', { class: 'pfActs' });
  const go = el('button', { class: 'btn sm gho', type: 'button', text: 'برو' });
  go.addEventListener('click', () => proofJump(it));
  acts.append(go);
  if (it.fixed) {
    const fx = el('button', { class: 'btn sm', type: 'button', text: 'اصلاح' });
    fx.addEventListener('click', () => { proofFixOne(it); });
    acts.append(fx);
  }
  row.append(meta, body, acts);
  return row;
}
function buildProof() {
  const box = $('#proofIssues');
  if (!box) return;
  box.textContent = '';
  proofItems = scanProof();
  const sum = el('div', { class: 'pfSum' });
  const kinds = new Map();
  for (const it of proofItems) for (const k of it.kinds) kinds.set(k, (kinds.get(k) || 0) + 1);
  if (!proofItems.length) {
    const e = el('div', { class: 'pfEmpty' });
    e.append(el('b', { text: 'چیزی پیدا نشد' }), el('span', { text: 'همهٔ متن‌های پروژه از نظر نیم‌فاصله، ی/ک عربی، فاصله و علائم سالم‌اند.' }));
    box.append(e);
  } else {
    for (const [k, n] of kinds) sum.append(el('span', { class: 'pill wn', text: k + ': ' + faNum(n) }));
    box.append(sum);
    const list = el('div', { id: 'proofList' });
    for (const it of proofItems) list.append(proofRow(it));
    box.append(list);
  }
  const fx = $('#bProofFixAll');
  if (fx) fx.disabled = !proofItems.some(it => it.fixed);
}
function proofJump(it) {
  $('#ovProof').classList.remove('on');
  if (S.cur !== it.pi) gotoPage(it.pi, true);
  S.selB = it.bid;
  const L = S.pages[it.pi] && S.pages[it.pi].layers.find(l => l.bid === it.bid);
  if (L) { selectLayer(L, true); focusLayer(L, it.pi); }
  else { S.sel = null; syncInspector(); render(it.pi); syncCards(); toast('این متن هنوز روی صفحه گذاشته نشده', 'i', 3000); }
}
function proofFixOne(it) {
  if (!it.fixed) return;
  pushHist();
  const b = (S.doc[it.pi] || []).find(x => x.id === it.bid);
  if (b) b.text = it.fixed;
  for (const L of (S.pages[it.pi] ? S.pages[it.pi].layers : [])) if (L.bid === it.bid) { L.t = it.fixed; L.fontAuto = false; }
  autosave(); render(it.pi); syncCards();
  const before = proofItems.length;
  buildProof();
  toast(proofItems.length < before ? 'اصلاح شد' : 'اصلاح شد — مورد دیگری هم بود', 'ok', 2400);
}
function proofFixAll() {
  const items = proofItems.filter(it => it.fixed);
  if (!items.length) return toast('موردی برای اصلاح نیست', 'wn');
  pushHist();
  let n = 0;
  const seen = new Set();
  for (const it of items) {
    const key = it.pi + '|' + it.bid;
    if (seen.has(key)) continue;
    seen.add(key);
    const b = (S.doc[it.pi] || []).find(x => x.id === it.bid);
    if (!b) continue;
    const t = fixFa(b.text);
    if (t === b.text) continue;
    b.text = t; n++;
    for (const L of (S.pages[it.pi] ? S.pages[it.pi].layers : [])) if (L.bid === it.bid) L.t = t;
  }
  autosave(); renderAll(); syncCards();
  buildProof();
  toast(n ? `${faNum(n)} متن اصلاح شد` : 'موردی اصلاح نشد', n ? 'ok' : 'wn');
}

/* ---- سند پشت‌سرهم ---- */
let docCommitT = 0;
function buildProofDoc() {
  const box = $('#proofDoc');
  if (!box) return;
  box.textContent = '';
  if (!S.doc.length) {
    box.append(el('div', { class: 'pfEmpty', text: 'هنوز متنی بارگذاری نشده است.' }));
    return;
  }
  let total = 0;
  for (let pi = 0; pi < S.doc.length; pi++) {
    const bs = (S.doc[pi] || []).filter(b => !b.skip);
    if (!bs.length) continue;
    const head = el('div', { class: 'pvPage' });
    head.append(el('span', { text: 'صفحهٔ ' + faNum(pi + 1) }), el('span', { class: 'hint', text: `${faNum(bs.length)} متن` }));
    if (pi !== S.cur) {
      const go = el('button', { class: 'btn sm gho', type: 'button', text: 'رفتن به این صفحه' });
      go.addEventListener('click', () => { $('#ovProof').classList.remove('on'); gotoPage(pi, true); });
      head.append(go);
    }
    box.append(head);
    for (const b of bs) {
      if (total++ > 600) { box.append(el('div', { class: 'pfEmpty', text: 'برای روان ماندن، بقیهٔ صفحه‌ها نمایش داده نشد.' })); return; }
      const row = el('div', { class: 'pvRow' });
      const tag = el('div', { class: 'pvTag', text: (b.tag || '—') });
      const ta = el('textarea', { spellcheck: 'false' });
      ta.value = b.text == null ? '' : b.text;
      ta.rows = 1;
      const grow = () => { ta.style.height = 'auto'; ta.style.height = Math.min(220, ta.scrollHeight + 2) + 'px'; };
      requestAnimationFrame(grow);
      ta.addEventListener('input', () => {
        grow();
        clearTimeout(docCommitT);
        docCommitT = setTimeout(() => {
          pushHistSoon();
          const t = ta.value;
          const bb = (S.doc[pi] || []).find(x => x.id === b.id);
          if (bb) bb.text = t;
          for (const L of (S.pages[pi] ? S.pages[pi].layers : [])) if (L.bid === b.id) L.t = t;
          autosave(); render(pi); syncCards();
        }, 420);
      });
      ta.addEventListener('keydown', e => {
        e.stopPropagation();
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) ta.blur();
      });
      row.append(tag, ta);
      box.append(row);
    }
  }
  if (!box.childNodes.length) box.append(el('div', { class: 'pfEmpty', text: 'متنی برای نمایش نیست.' }));
}
function proofTab(which) {
  $$('#ovProof [data-pt]').forEach(b => b.setAttribute('aria-selected', b.dataset.pt === which ? 'true' : 'false'));
  const doc = which === 'doc';
  $('#proofIssues').style.display = doc ? 'none' : '';
  $('#proofDoc').style.display = doc ? '' : 'none';
  const fx = $('#bProofFixAll'); if (fx) fx.style.display = doc ? 'none' : '';
  if (doc) buildProofDoc(); else buildProof();
  const n = $('#proofCount');
  if (n) n.textContent = doc ? '' : (proofItems.length ? faNum(proofItems.length) + ' مورد' : 'سالم');
}
function openProof(which) {
  const ov = $('#ovProof'); if (!ov) return;
  ov.classList.add('on');
  proofTab(which || 'issues');
}

/* ============================================================
   ۴) حالت تایپ پشت‌سرهم
   ============================================================ */
function typeListExtras() { return live(S.cur); }
function typeAutoGrow(ta) { ta.style.height = 'auto'; ta.style.height = Math.min(180, ta.scrollHeight + 2) + 'px'; }

function typeCommit() {
  const ta = $('#tbText'); if (!ta) return;
  const bs = typeListExtras(), b = bs[S.typeIdx];
  if (!b || b.text === ta.value) return;
  const t = ta.value;
  b.text = t;
  for (const L of (S.pages[S.cur] ? S.pages[S.cur].layers : [])) if (L.bid === b.id) L.t = t;
  autosave(); render(S.cur); syncCards();
}
function typeShow(focus) {
  if (!S.typeMode) return;
  const bs = typeListExtras();
  if (!bs.length) return typeClose();
  S.typeIdx = clamp(S.typeIdx, 0, bs.length - 1);
  const b = bs[S.typeIdx];
  S.selB = b.id;
  const L = (S.pages[S.cur] ? S.pages[S.cur].layers : []).find(l => l.bid === b.id) || null;
  S.sel = L;
  const cnt = $('#tbCount'), tag = $('#tbTag'), st = $('#tbState'), ta = $('#tbText');
  if (cnt) cnt.textContent = `${faNum(S.typeIdx + 1)} از ${faNum(bs.length)}`;
  if (tag) { tag.textContent = b.tag || '—'; tag.style.color = tagHue(b.tag || ''); }
  if (st) { st.textContent = L ? 'روی صفحه' : 'هنوز گذاشته نشده'; st.style.color = L ? 'var(--ok)' : 'var(--tx3)'; }
  if (ta) { ta.value = b.text == null ? '' : b.text; if (focus) typeAutoGrow(ta); }
  const pr = $('#tbProg i'); if (pr) pr.style.width = ((S.typeIdx + 1) / bs.length * 100).toFixed(1) + '%';
  syncCards(); syncInspector(); render(S.cur);
  if (L) focusLayer(L, S.cur);
  if (focus && ta) { ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length); }
}
function typeStep(d) {
  typeCommit();
  const bs = typeListExtras();
  let n = S.typeIdx + d;
  if (d > 0 && n >= bs.length) {
    for (let pi = S.cur + 1; pi < Math.max(S.doc.length, S.pages.length); pi++) {
      if (!(S.doc[pi] || []).some(b => !b.skip)) continue;
      gotoPage(pi, true);
      S.typeIdx = 0;
      return typeShow(true);
    }
    return toast('آخرین متن پروژه بود — کار تمام است', 'ok', 3800);
  }
  S.typeIdx = clamp(n, 0, bs.length - 1);
  typeShow(true);
}
function typeOpen(on) {
  const bar = $('#typeBar'); if (!bar) return;
  if (!on) return typeClose();
  if (!typeListExtras().length) return toast('برای این صفحه متنی نیست', 'wn');
  typeCommit();
  S.typeMode = true;
  document.body.classList.add('typeMode');
  bar.classList.add('on');
  const btn = $('#bTypeMode'); if (btn) btn.setAttribute('aria-pressed', 'true');
  const bs = typeListExtras();
  let idx = bs.findIndex(b => b.id === S.selB);
  if (idx < 0) { idx = bs.findIndex(b => !placedSet(S.cur).has(b.id)); }
  S.typeIdx = Math.max(0, idx);
  typeShow(true);
  toast('حالت تایپ: با Enter برو به متن بعدی، Shift+Enter خط تازه', 'i', 4200);
}
function typeClose() {
  if (S.typeMode) typeCommit();
  S.typeMode = false;
  document.body.classList.remove('typeMode');
  const bar = $('#typeBar'); if (bar) bar.classList.remove('on');
  const btn = $('#bTypeMode'); if (btn) btn.setAttribute('aria-pressed', 'false');
  syncCards(); syncInspector(); render(S.cur);
}

/* صفحه عوض شد -> نوار تایپ باید متن‌های همان صفحه را نشان بدهد */
const __gotoPageRaw = gotoPage;
gotoPage = function (i, scroll) {
  __gotoPageRaw(i, scroll);
  if (S.typeMode) { const bs = typeListExtras(); S.typeIdx = 0; if (bs.length) typeShow(false); }
};

/* ============================================================
   سیم‌کشی
   ============================================================ */
function wireExtras() {
  const bt = $('#bTypeMode');
  if (bt) bt.onclick = () => typeOpen(!S.typeMode);
  const fix = $('#iFix');
  if (fix) fix.onclick = () => applyQuickFix(S.sel);

  const ta = $('#tbText');
  if (ta) {
    ta.addEventListener('input', () => {
      typeAutoGrow(ta);
      clearTimeout(ta._t);
      ta._t = setTimeout(typeCommit, 380);
    });
    ta.addEventListener('keydown', e => {
      e.stopPropagation();
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); typeStep(1); }
      else if (e.key === 'Escape') { e.preventDefault(); typeClose(); }
      else if (e.key === 'Tab') { e.preventDefault(); typeStep(e.shiftKey ? -1 : 1); }
      else if (e.key === 'ArrowUp' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); typeStep(-1); }
      else if (e.key === 'ArrowDown' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); typeStep(1); }
    });
    ta.addEventListener('blur', () => { clearTimeout(ta._t); typeCommit(); });
  }
  const prev = $('#tbPrev'), next = $('#tbNext'), close = $('#tbClose');
  if (prev) prev.onclick = () => typeStep(-1);
  if (next) next.onclick = () => typeStep(1);
  if (close) close.onclick = () => typeClose();

  /* بازبینی */
  $$('#ovProof [data-pt]').forEach(b => b.addEventListener('click', () => proofTab(b.dataset.pt)));
  const fx = $('#bProofFixAll'); if (fx) fx.onclick = proofFixAll;
  const rf = $('#bProofRefresh'); if (rf) rf.onclick = () => proofTab('issues');

  /* بازبینی از این‌جا باز نمی‌شود: از منوی برنامه (data-cmd="proof") و F8 باز می‌شود. */

  /* میان‌بر صفحه‌کلید — F7 تایپ، F8 بازبینی */
  addEventListener('keydown', e => {
    const t = e.target;
    const typing = t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable);
    if (typing) return;
    if (e.key === 'F7') { e.preventDefault(); typeOpen(!S.typeMode); return; }
    if (e.key === 'F8') { e.preventDefault(); openProof('issues'); return; }
    if (e.key === 'Escape' && S.typeMode) { e.preventDefault(); typeClose(); }
  }, true);
}

wireExtras();