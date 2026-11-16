/* ============================================================
   Mobin Studio 8.6.0 — «واژه‌نامه»، «یادگیری از کار کاربر»،
   «کارت ترجمهٔ صفحه» و «بازخوانی فصل»
   همه‌چیز اختیاری و فقط با درخواست کاربر اجرا می‌شود.
   ============================================================ */
'use strict';

/* ============================================================
   ۱) واژه‌نامه — یکدست ماندن اسم‌ها و اصطلاح‌ها
   ============================================================ */
const GL_KEY = 'ms.gloss', GL_MAX = 400;
let GL = [];                       // فهرست عمومی (روی همهٔ پروژه‌ها)
let glScope = 'p';                 // 'p' = این پروژه، 'g' = عمومی

function glossClean(arr) {
  if (!Array.isArray(arr)) return [];
  const out = [];
  for (const r of arr) {
    if (!r || typeof r !== 'object') continue;
    const src = String(r.src || '').trim().slice(0, 80);
    const fa = String(r.fa || '').trim().slice(0, 80);
    if (!src || !fa) continue;
    if (out.some(x => x.src.toLowerCase() === src.toLowerCase())) continue;
    out.push({ src, fa, note: String(r.note || '').trim().slice(0, 120) });
    if (out.length >= GL_MAX) break;
  }
  return out;
}
function glLoadGlobal() { try { GL = glossClean(JSON.parse(localStorage.getItem(GL_KEY) || '[]')); } catch (e) { GL = []; } }
function glSaveGlobal() { try { localStorage.setItem(GL_KEY, JSON.stringify(GL)); } catch (e) { } }
function glAll() {
  const out = [], seen = new Set();
  for (const r of (S.gloss || [])) { const k = r.src.toLowerCase(); if (seen.has(k)) continue; seen.add(k); out.push(r); }
  for (const r of GL) { const k = r.src.toLowerCase(); if (seen.has(k)) continue; seen.add(k); out.push(r); }
  return out;
}
function glAdd(src, fa, note, toGlobal) {
  src = String(src || '').trim().slice(0, 80); fa = String(fa || '').trim().slice(0, 80);
  if (!src || !fa) return toast('هم واژهٔ اصلی و هم معادل فارسی لازم است', 'wn');
  const rec = { src, fa, note: String(note || '').trim().slice(0, 120) };
  const list = toGlobal ? GL : (S.gloss || (S.gloss = []));
  const k = list.findIndex(x => x.src.toLowerCase() === src.toLowerCase());
  if (k >= 0) list[k] = rec; else list.push(rec);
  if (toGlobal) glSaveGlobal(); else autosave();
  buildGloss();
  return rec;
}
function glDel(rec) {
  let k = (S.gloss || []).findIndex(x => x.src === rec.src);
  if (k >= 0) { S.gloss.splice(k, 1); autosave(); }
  k = GL.findIndex(x => x.src === rec.src);
  if (k >= 0) { GL.splice(k, 1); glSaveGlobal(); }
  buildGloss();
}
/* متن واژه‌نامه برای دستیار */
function glPromptBlock() {
  const all = glAll();
  if (!all.length) return '';
  const rows = all.slice(0, 200).map(e => '• ' + e.src + ' ← ' + e.fa + (e.note ? ' (' + e.note + ')' : ''));
  return 'واژه‌نامه (این معادل‌ها را عیناً و بدون تغییر به‌کار ببر):\n' + rows.join('\n');
}
/* چسباندن گروهی: هر خط «اصل = فارسی» یا «اصل | فارسی» یا با Tab */
function glPaste(text) {
  const lines = String(text || '').split(/\r?\n/);
  let n = 0;
  for (const ln of lines) {
    const m = ln.split(/\s*[=|\t]\s*/).map(s => s.trim()).filter(Boolean);
    if (m.length < 2) continue;
    glAdd(m[0], m[1], m.slice(2).join(' '), glScope === 'g');
    n++;
  }
  buildGloss();
  toast(n ? faNum(n) + ' واژه اضافه شد' : 'خطی با قالب «اصل = فارسی» پیدا نشد', n ? 'ok' : 'wn');
}
function buildGloss() {
  const host = $('#glList'); if (!host) return;
  const q = ($('#glSearch') ? $('#glSearch').value : '').trim().toLowerCase();
  const all = glAll().filter(e => !q || e.src.toLowerCase().includes(q) || e.fa.includes(q));
  host.textContent = '';
  if (!all.length) {
    host.append(el('div', { class: 'empty-s' }, [el('p', { text: glAll().length ? 'چیزی با این جست‌وجو نبود.' : 'هنوز واژه‌ای اضافه نشده.\nمثال: ‏Seoul = سئول‏' })]));
  }
  const inProj = new Set((S.gloss || []).map(x => x.src));
  for (const e of all) {
    const row = el('div', { class: 'glRow' + (inProj.has(e.src) ? ' p' : '') });
    row.append(el('code', { class: 'glSrc', text: e.src }));
    row.append(el('span', { class: 'glArw', text: '←' }));
    row.append(el('b', { class: 'glFa', text: e.fa }));
    if (e.note) row.append(el('span', { class: 'hint', text: e.note }));
    row.append(el('span', { class: 'grow' }));
    row.append(el('span', { class: 'pill ' + (inProj.has(e.src) ? 'inf' : ''), text: inProj.has(e.src) ? 'پروژه' : 'عمومی' }));
    const b = el('button', { class: 'btn sm ico gho dgr', type: 'button', title: 'حذف' });
    b.append(svg(I.trash)); b.onclick = () => glDel(e);
    row.append(b);
    host.append(row);
  }
  const cnt = $('#glCount');
  if (cnt) cnt.textContent = faNum(glAll().length) + ' واژه · ' + faNum((S.gloss || []).length) + ' در این پروژه';
}
function openGloss(on) {
  const ov = $('#ovGloss'); if (!ov) return;
  const want = on === undefined ? !ov.classList.contains('on') : !!on;
  ov.classList.toggle('on', want);
  if (want) { buildGloss(); const n = $('#glSrc'); if (n) setTimeout(() => n.focus(), 40); }
}
/* واژه‌های خاصی که کاربر زیاد تکرار کرده — پیشنهاد برای واژه‌نامه */
const GL_STOP = new Set(('the a an and or but if of to in on at for with from by as is are was were be been am do does did not no yes i you he she it we they me him her them his her its our their this that these those what who how why when where can could will would shall should may might must have has had get got go going come came say said see saw look take took make made know think want need use used one two three all some any more most other than then there here now just only also very well back even still way much many new old good bad big small up down out off over under again'.split(' ')));

/* ============================================================
   ۲) یادگیری از کار کاربر — سبک و اصلاحات خودش
   ============================================================ */
const LN_KEY = 'ms.ai.learn', LN_MAX = 200;
let LN = { pairs: [], on: true };
function lnLoad() {
  try {
    const j = JSON.parse(localStorage.getItem(LN_KEY) || 'null');
    if (j && Array.isArray(j.pairs)) LN = { pairs: j.pairs.filter(p => p && p.o && p.f).slice(0, LN_MAX), on: j.on !== false };
  } catch (e) { }
}
function lnSave() { try { localStorage.setItem(LN_KEY, JSON.stringify({ pairs: LN.pairs.slice(0, LN_MAX), on: LN.on })); } catch (e) { } }
/* اصل کارِ کاربر + ترجمهٔ خودش = یک نمونه */
function lnCapture(orig, fa, tag, kind) {
  if (LN.on === false) return;
  orig = String(orig || '').trim().replace(/\s+/g, ' ').slice(0, 300);
  fa = String(fa || '').trim().replace(/\s+/g, ' ').slice(0, 300);
  if (orig.length < 2 || fa.length < 2) return;
  if (orig === fa) return;
  const k = LN.pairs.findIndex(p => p.o === orig);
  const rec = { o: orig, f: fa, tag: tag || '', k: kind || 'work', at: Date.now() };
  if (k >= 0) LN.pairs[k] = rec; else LN.pairs.unshift(rec);
  if (LN.pairs.length > LN_MAX) LN.pairs.length = LN_MAX;
  lnSave();
}
/* متن اصلاح‌های خودِ کاربر (کوتاه، آخرین‌ها) برای دستیار */
function lnExamplesBlock(n) {
  if (LN.on === false) return '';
  const list = LN.pairs.slice(0, n || 14);
  if (!list.length) return '';
  const good = list.filter(p => p.k !== 'fix');
  const fix = list.filter(p => p.k === 'fix');
  const out = [];
  if (good.length) {
    out.push('نمونه‌کارهای خودِ کاربر — همین سبک را ادامه بده (عین جمله‌ها را کپی نکن):');
    out.push(good.map(p => '• «' + p.o.slice(0, 120) + '» ← «' + p.f.slice(0, 120) + '»').join('\n'));
  }
  if (fix.length) {
    out.push('اصلاح‌های کاربر روی پیش‌نویس دستیار — این اشتباه‌ها را تکرار نکن:');
    out.push(fix.map(p => '• دستیار نوشت «' + p.o.slice(0, 90) + '»، کاربر کرد «' + p.f.slice(0, 90) + '»').join('\n'));
  }
  return out.join('\n');
}
function lnStats() {
  const p = LN.pairs;
  if (!p.length) return null;
  let ro = 0, rf = 0, q = 0;
  for (const x of p) { ro += x.o.length; rf += x.f.length; if (/[«»]/.test(x.f)) q++; }
  return {
    n: p.length, ratio: ro ? +(rf / ro).toFixed(2) : 1,
    quotes: Math.round(q / p.length * 100),
    tags: [...new Set(p.map(x => x.tag).filter(Boolean))].slice(0, 6)
  };
}
function lnStyleBlock() {
  if (LN.on === false) return '';
  const s = lnStats(); if (!s) return '';
  const L = ['از کارهای قبلی کاربر این‌ها را می‌دانی:'];
  L.push('• ' + faNum(s.n) + ' نمونهٔ ترجمهٔ خودش را دیده‌ای؛ سبک و واژه‌هایش را ادامه بده.');
  L.push('• میانگین طول ترجمهٔ او ' + s.ratio + ' برابر متن اصلی است' + (s.ratio < .75 ? ' (کوتاه می‌نویسد)' : s.ratio > 1.15 ? ' (کمی بلندتر می‌نویسد)' : '') + '.');
  if (s.quotes >= 30) L.push('• در ' + faNum(s.quotes) + '٪ نمونه‌ها از گیومهٔ «» استفاده کرده؛ همان را ادامه بده.');
  return L.join('\n');
}
/* نام‌های خاصی که زیاد تکرار شده‌اند: پیشنهاد واژه‌نامه */
function lnNameIdeas(limit) {
  const have = new Set(glAll().map(e => e.src.toLowerCase()));
  const cnt = new Map();
  for (const p of LN.pairs) {
    const words = String(p.o).match(/[A-Za-z][A-Za-z'’-]{2,}/g) || [];
    for (const w of words) {
      if (!/^[A-Z]/.test(w) && w !== w.toUpperCase()) continue;
      const k = w.toLowerCase();
      if (GL_STOP.has(k) || have.has(k)) continue;
      cnt.set(w, (cnt.get(w) || 0) + 1);
    }
  }
  return [...cnt.entries()].filter(([, n]) => n >= 3).sort((a, b) => b[1] - a[1]).slice(0, limit || 8).map(([w, n]) => ({ w, n }));
}
function buildLearn() {
  const host = $('#lnBody'); if (!host) return;
  host.textContent = '';
  const s = lnStats();
  const on = $('#lnOn'); if (on) on.checked = LN.on !== false;
  if (!s) {
    host.append(el('div', { class: 'empty-s' }, [el('p', { text: 'هنوز چیزی یاد نگرفته.\nهر متنی که خودت روی حباب‌ها بگذاری یا پیش‌نویس دستیار را اصلاح کنی، اینجا جمع می‌شود تا سبک خودت را ادامه بدهد.' })]));
    return;
  }
  const stat = el('div', { class: 'lnStat' });
  stat.append(el('b', { text: faNum(s.n) + ' نمونه' }));
  stat.append(el('span', { text: 'میانگین طول ترجمه: ' + s.ratio + ' برابر متن اصلی' }));
  if (s.quotes) stat.append(el('span', { text: 'گیومهٔ «» در ' + faNum(s.quotes) + '٪' }));
  if (s.tags.length) stat.append(el('span', { text: 'تگ‌ها: ' + s.tags.join('، ') }));
  host.append(stat);

  const ideas = lnNameIdeas(8);
  if (ideas.length) {
    const box = el('div', { class: 'lnIdeas' });
    box.append(el('p', { class: 'hint', text: 'این‌ها را در کارت زیاد نوشته‌ای؛ اگر اسم خاص‌اند به واژه‌نامه اضافه کن تا یکدست بماند:' }));
    const row = el('div', { class: 'lnChips' });
    for (const it of ideas) {
      const b = el('button', { class: 'btn sm gho', type: 'button', text: it.w + ' (' + faNum(it.n) + ')' });
      b.onclick = () => { openGloss(true); const n = $('#glSrc'); if (n) { n.value = it.w; const f = $('#glFa'); if (f) f.focus(); } buildGloss(); };
      row.append(b);
    }
    box.append(row);
    host.append(box);
  }

  const list = el('div', { class: 'lnList' });
  const head = el('div', { class: 'lnHead' });
  head.append(el('span', { text: 'آخرین نمونه‌ها' }), el('span', { class: 'grow' }));
  const clr = el('button', { class: 'btn sm gho dgr', type: 'button', text: 'پاک کردن حافظهٔ یادگیری' });
  clr.onclick = async () => {
    if (!await ask('پاک کردن یادگیری', 'همهٔ ' + faNum(LN.pairs.length) + ' نمونه‌ای که از کارت یاد گرفته پاک شود؟', 'پاک کن')) return;
    LN.pairs = []; lnSave(); buildLearn(); toast('حافظهٔ یادگیری پاک شد', 'ok');
  };
  head.append(clr);
  list.append(head);
  for (const p of LN.pairs.slice(0, 40)) {
    const r = el('div', { class: 'lnRow' });
    r.append(el('code', { class: 'lnO', text: p.o.slice(0, 90) }));
    r.append(el('span', { class: 'glArw', text: '←' }));
    r.append(el('b', { class: 'lnF', text: p.f.slice(0, 90) }));
    if (p.k === 'fix') r.append(el('span', { class: 'pill wn', text: 'اصلاح' }));
    else if (p.tag) r.append(el('span', { class: 'pill', text: p.tag }));
    list.append(r);
  }
  host.append(list);
}
function openLearn(on) {
  const ov = $('#ovLearn'); if (!ov) return;
  const want = on === undefined ? !ov.classList.contains('on') : !!on;
  ov.classList.toggle('on', want);
  if (want) buildLearn();
}
/* گرفته‌شده از ویرایش دستی متن روی بوم */
function learnFromSelection() {
  const L = S.sel; if (!L) return;
  const b = (S.doc[S.cur] || []).find(x => x.id === L.bid);
  if (!b) return;
  /* raw = خط اصلی (انگلیسی)؛ اگر خالی بود از text استفاده کن */
  const orig = String(b.raw || b.text || '').trim();
  const fa = String(L.t || '').trim();
  if (!orig || !fa || orig === fa) return;
  lnCapture(orig, fa, L.tag, L.draft ? 'ai' : 'manual');
}

/* ============================================================
   ۳) کارت ترجمهٔ صفحه — با دستیار یا با تایپ دستی
   ============================================================ */
let PG = { rows: [], pi: 0 };
/* برش تصویر خام همان حباب، برای اینکه کاربر اصل دیالوگ را ببیند */
function rawCrop(p, B, w) {
  try {
    if (!p || !p.rawImg || !B) return null;
    const src = p.rawImg;
    const k = src.width / p.w;
    const pad = 8;
    const x = Math.max(0, (B.x0 - pad) * k), y = Math.max(0, (B.y0 - pad) * k);
    const cw = Math.min(src.width - x, (B.x1 - B.x0 + pad * 2) * k), ch = Math.min(src.height - y, (B.y1 - B.y0 + pad * 2) * k);
    if (cw < 4 || ch < 4) return null;
    const sc = Math.min(1, (w || 220) / cw);
    const cv = document.createElement('canvas');
    cv.width = Math.max(1, Math.round(cw * sc)); cv.height = Math.max(1, Math.round(ch * sc));
    const c = cv.getContext('2d');
    c.imageSmoothingQuality = 'high';
    c.drawImage(src, x, y, cw, ch, 0, 0, cv.width, cv.height);
    return cv.toDataURL('image/jpeg', .82);
  } catch (e) { return null; }
}
/* حباب‌هایی که متن فارسی قطعی ندارند */
function pgTargets(pi) {
  const p = S.pages[pi]; if (!p) return [];
  const C = aiBalloons(pi);
  const busy = new Set();
  for (const L of p.layers) if (!L.draft && (L.t || '').trim()) { const k = balloonOf(C, L); if (k >= 0) busy.add(k); }
  const out = [];
  for (let k = 0; k < C.length; k++) if (!busy.has(k)) out.push({ balloon: k, B: C[k] });
  return out;
}
function pgOpen(pi) {
  PG.pi = pi === undefined ? S.cur : pi;
  PG.rows = pgTargets(PG.pi).map(t => ({ balloon: t.balloon, B: t.B, text: '', busy: false }));
  buildPageCard();
  const ov = $('#ovPg'); if (ov) ov.classList.add('on');
}
function buildPageCard() {
  const host = $('#pgList'); if (!host) return;
  host.textContent = '';
  const p = S.pages[PG.pi];
  const title = $('#pgTitle');
  if (title) title.textContent = 'کارت ترجمهٔ صفحهٔ ' + faNum(PG.pi + 1);
  const cnt = $('#pgCount');
  const filled = PG.rows.filter(r => r.text.trim()).length;
  if (cnt) cnt.textContent = faNum(PG.rows.length) + ' حباب خالی · ' + faNum(filled) + ' پر شده';
  if (!PG.rows.length) {
    host.append(el('div', { class: 'empty-s' }, [el('p', { text: 'همهٔ حباب‌های این صفحه متن فارسی دارند. کاری نمانده.' })]));
    return;
  }
  PG.rows.forEach((r, k) => {
    const row = el('div', { class: 'pgRow' });
    const side = el('div', { class: 'pgSide' });
    const crop = rawCrop(p, r.B, 240);
    if (crop) side.append(el('img', { src: crop, alt: 'متن اصلی', loading: 'lazy' }));
    else side.append(el('div', { class: 'pgNoImg', text: 'تصویر خام نیست' }));
    side.append(el('span', { class: 'pgN', text: 'حباب ' + faNum(r.balloon + 1) }));
    const mid = el('div', { class: 'pgMid' });
    const ta = el('textarea', { rows: 3, placeholder: 'فارسی را اینجا بنویس...', spellcheck: 'false' });
    ta.value = r.text;
    ta.addEventListener('input', () => { r.text = ta.value; const c2 = $('#pgCount'); if (c2) c2.textContent = faNum(PG.rows.length) + ' حباب خالی · ' + faNum(PG.rows.filter(x => x.text.trim()).length) + ' پر شده'; });
    mid.append(ta);
    if (r.note) mid.append(el('div', { class: 'hint', text: r.note }));
    row.append(side, mid);
    host.append(row);
    r.ta = ta;
  });
}
/* پر کردن کارت با دستیار */
async function pgFill() {
  if (!aiReady()) { aiPush('sys', 'اول در تنظیمات ← دستیار، آدرس API و نام مدل را وارد کن.', { err: true }); aiOpenSettings(); return; }
  if (!PG.rows.length) return toast('حباب خالی‌ای روی این صفحه نیست', 'i');
  const list = PG.rows.map((r, k) => faNum(k + 1) + ') balloon=' + r.balloon + ' — ' + Math.round(r.B.cw) + '×' + Math.round(r.B.ch) + 'px').join('\n');
  await aiAsk('همهٔ حباب‌های خالیِ این صفحه را ترجمه کن',
    'کار: این‌ها حباب‌های خالیِ همین صفحه‌اند (شماره، شناسه، اندازه):\n' + list +
    '\n\nبرای هر کدام از این‌ها یک ترجمهٔ فارسی بده و در بلوک JSON برای هر حباب دقیقاً یک عمل با type="place"، page=' + (PG.pi + 1) + '، همان balloon، as="persian" بگذار. لحن محاوره‌ای مانهوا، مطابق واژه‌نامه و سبک کاربر. اگر حبابی صدای پس‌زمینه (SFX) است، معادل صوتی کوتاه بده.');
  const last = S.ai.msgs[S.ai.msgs.length - 1];
  const acts = (last && last.actions) || [];
  let n = 0;
  for (const a of acts) {
    const bi = parseInt(a.balloon, 10);
    const row = PG.rows.find(r => r.balloon === bi);
    if (row && a.text) { row.text = String(a.text); if (row.ta) row.ta.value = row.text; n++; }
  }
  buildPageCard();
  toast(n ? faNum(n) + ' ترجمه آمد — حالا هر کدام را خواستی دستی اصلاح کن' : 'دستیار متن آماده‌ای نداد؛ خودت تایپ کن', n ? 'ok' : 'wn', 4200);
}
/* ساخت پیش‌نویس از هر ردیف پرشده */
function pgBuild() {
  const acts = PG.rows.filter(r => r.text.trim()).map(r => ({
    type: 'place', page: PG.pi + 1, balloon: r.balloon, text: r.text.trim(), as: 'persian'
  }));
  if (!acts.length) return toast('هیچ ردیفی پر نشده', 'wn');
  const r = aiStage(acts);
  if (!r.ok) return toast('چیزی برای ساخت نبود' + (r.skipped ? ' (' + faNum(r.skipped) + ' مورد رد شد)' : ''), 'wn');
  const ov = $('#ovPg'); if (ov) ov.classList.remove('on');
  toast(faNum(r.ok) + ' متن آمادهٔ ساخت شد — روی بوم تأیید کن', 'ok', 3600);
}

/* ============================================================
   ۴) بازخوانی کل فصل — یکدستی اسم‌ها، ضمیرها و لحن
   ============================================================ */
async function chReview() {
  if (!aiReady()) { aiPush('sys', 'اول در تنظیمات ← دستیار، آدرس API و نام مدل را وارد کن.', { err: true }); aiOpenSettings(); return; }
  const pages = [];
  let chars = 0;
  S.pages.forEach((p, pi) => {
    const rows = [];
    for (const L of p.layers) {
      if (!L.t || !String(L.t).trim()) continue;
      const b = (S.doc[pi] || []).find(x => x.id === L.bid);
      const o = b ? String(b.raw || b.text || '') : '';
      rows.push('  • ' + (o ? '[' + o.slice(0, 90) + '] → ' : '') + String(L.t).slice(0, 140));
      chars += String(L.t).length;
      if (chars > 9000) break;
    }
    if (rows.length) pages.push('صفحهٔ ' + (pi + 1) + ':\n' + rows.join('\n'));
    if (chars > 9000) return;
  });
  if (!pages.length) return toast('هنوز متن فارسی‌ای روی صفحه‌ها نیست', 'wn');
  const corpus = (chars > 9000 ? '(فقط بخشی از فصل)\n' : '') + pages.join('\n\n');
  await aiAsk('کل فصل را بازخوانی کن و ناهماهنگی‌ها را بگو',
    'کار: این متن کل فصل است.\n' + corpus +
    '\n\nفقط این چهار چیز را گزارش کن: ۱) یک اسم که دو جور نوشته شده ۲) ضمیر یا لحن ناهماهنگ ۳) غلط تایپی واضح ۴) جمله‌ای که با واژه‌نامه نمی‌خواند. هر مورد را با شمارهٔ صفحه بگو. اگر جایی اصلاح لازم دارد، برایش عمل با as="persian" بده.');
}

/* ============================================================
   سیم‌کشی
   ============================================================ */
function wireAiTools() {
  glLoadGlobal(); lnLoad();
  const on = (id, fn) => { const n = $(id); if (n) n.onclick = fn; };
  on('#bGloss', () => openGloss());
  on('#aiGloss', () => openGloss(true));
  on('#aiLearn', () => openLearn(true));
  on('#aiRead', () => {
    const C = aiBalloons(S.cur);
    const list = C.length
      ? 'حباب‌های این صفحه (شناسه، مرکز، اندازه):\n' + C.slice(0, 40).map((B, k) => 'balloon=' + k + ' — ' + Math.round(B.cx) + ',' + Math.round(B.cy) + ' — ' + Math.round(B.cw) + '×' + Math.round(B.ch)).join('\n')
      : 'حبابی روی این صفحه پیدا نشد.';
    aiAsk('متن اصلی حباب‌ها را از تصویر خام بخوان',
      list + '\n\nکار: فقط از روی تصویر صفحهٔ خام، متن اصلی داخل هر حباب را بخوان و برای هرکدام یک عمل با as="orig" و همان balloon بده. اگر حرفی را مطمئن نیستی، همان حباب را رد کن. توضیح اضافه نده.');
  });
  on('#aiPageCard', () => { PG.pi = S.cur; PG.rows = pgTargets(S.cur).map(t => ({ balloon: t.balloon, B: t.B, text: '' })); buildPageCard(); const ov = $('#ovPg'); if (ov) ov.classList.add('on'); });
  on('#aiChapter', () => chReview());
  const glAddB = $('#glAdd');
  if (glAddB) glAddB.onclick = () => {
    const s = $('#glSrc'), f = $('#glFa'), n = $('#glNote');
    if (s && f) { glAdd(s.value, f.value, n ? n.value : '', glScope === 'g'); s.value = ''; if (f) f.value = ''; if (n) n.value = ''; s.focus(); }
  };
  const gs = $('#glSearch'); if (gs) gs.addEventListener('input', buildGloss);
  const gp = $('#glPaste'); if (gp) gp.onclick = () => {
    const box = $('#glPasteBox'); if (!box) return;
    glPaste(box.value); box.value = '';
  };
  const seg = $('#glScope');
  if (seg) $$('#glScope button').forEach(b => b.onclick = () => {
    glScope = b.dataset.s;
    $$('#glScope button').forEach(x => x.setAttribute('aria-selected', x === b));
    buildGloss();
  });
  const gc = $('#glClearP'); if (gc) gc.onclick = async () => {
    if (!(S.gloss || []).length) return toast('واژه‌نامهٔ پروژه خالی است', 'i');
    if (!await ask('پاک کردن واژه‌نامهٔ پروژه', faNum(S.gloss.length) + ' واژه از این پروژه حذف شود؟', 'پاک کن')) return;
    S.gloss = []; autosave(); buildGloss();
  };
  const lo = $('#lnOn'); if (lo) lo.onchange = () => { LN.on = lo.checked; lnSave(); toast(LN.on ? 'یادگیری روشن شد' : 'یادگیری خاموش شد', 'ok', 2200); };
  on('#pgFill', pgFill);
  on('#pgBuild', pgBuild);
  const gpl = $('#pgManual'); if (gpl) gpl.onclick = () => { const t = PG.rows[0] && PG.rows[0].ta; if (t) t.focus(); else toast('حباب خالی‌ای نیست', 'i'); };
  const mb = document.getElementById('manyBar');
  if (mb) mb.addEventListener('click', e => {
    const b = e.target.closest ? e.target.closest('button[data-al]') : null;
    if (!b) return;
    const a = b.dataset.al;
    if (a === 'clear') { S.many = []; syncManyBar(); renderAll(); return; }
    if (a === 'same') return manySameSize();
    if (a === 'dh' || a === 'dv') return manyDist(a === 'dh' ? 'h' : 'v');
    manyAlign(a);
  });
  /* Escape انتخاب گروهی را پاک می‌کند */
  addEventListener('keydown', e => {
    const t = e.target;
    if (t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable)) return;
    if (e.key === 'Escape' && S.many.length > 1) { S.many = []; syncManyBar(); renderAll(); }
    /* جابه‌جایی گروهی با کلیدهای جهت‌دار */
    if (S.many.length > 1 && /^Arrow(Left|Right|Up|Down)$/.test(e.key)) {
      const st = e.shiftKey ? 10 : 1;
      const d = { ArrowLeft: [-st, 0], ArrowRight: [st, 0], ArrowUp: [0, -st], ArrowDown: [0, st] }[e.key];
      if (manyNudge(d[0], d[1])) e.preventDefault();
    }
  }, true);
}

S.many = S.many || [];
wireAiTools();
