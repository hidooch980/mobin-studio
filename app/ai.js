/* ============================================================
   Mobin Studio 8.6.0 — «دستیار»
   یک چت‌باتِ اختیاری کنار بوم که:
     • فقط وقتی کاربر بازش می‌کند حرف می‌زند (هیچ چیز خودکار نیست)
     • همهٔ صفحه را می‌بیند: تصویر کلین + تصویر خام + متن‌ها + اعداد دقیق چیدمان
     • اعداد چیدمان را خودِ برنامه اندازه می‌گیرد (مدل عدد نمی‌سازد)
     • هیچ‌وقت چیزی را تغییر یا حذف نمی‌کند؛ فقط «پیش‌نویس» می‌سازد
     • پیش‌نویس‌ها با کادر خط‌چین، جدا از کار قطعی، و با یک کلیک دور ریختنی‌اند
   API محور است و با هر سرویسی که سازگار با OpenAI Chat Completions باشد
   کار می‌کند (OpenRouter، OpenAI، Groq، Together، Ollama، LM Studio، …).
   شخصیت و قواعد در خودِ برنامه است تا با هر مدلی رفتار یکسان بماند.
   ============================================================ */
'use strict';

const AI_CFG_KEY = 'ms.ai.cfg';
const AI_PERSONA_VERSION = 'mobin-assistant-v2';
const AI_MAX_MSGS = 40;

/* ---------- تنظیمات (جدا از S.settings تا هرگز داخل فایل پروژه نرود) ---------- */
function aiCfg() {
  let c = {};
  try { c = JSON.parse(localStorage.getItem(AI_CFG_KEY) || '{}') || {}; } catch (e) { c = {}; }
  return {
    url: String(c.url || ''),
    model: String(c.model || ''),
    key: String(c.key || ''),
    image: c.image !== false,
    adult: c.adult !== false,
    temp: typeof c.temp === 'number' ? c.temp : 0.4
  };
}
function aiSaveCfg(patch) {
  const c = Object.assign(aiCfg(), patch || {});
  try { localStorage.setItem(AI_CFG_KEY, JSON.stringify(c)); } catch (e) { }
  return c;
}
const aiReady = () => { const c = aiCfg(); return !!(c.url && c.model); };

/* ---------- شخصیت ثابت (نسخه‌دار) ---------- */
function aiPersona() {
  const c = aiCfg();
  const L = [
    'تو «دستیارِ مبین» هستی؛ دستیارِ گفت‌وگوی داخل برنامهٔ Mobin Studio برای حروف‌چینی فارسی مانهوا و وبتون.',
    'شناسهٔ شخصیت: ' + AI_PERSONA_VERSION,
    '',
    'طرز حرف زدن:',
    '• مثل یک همکارِ حرفه‌ای و صمیمی؛ نه مثل یک برنامه‌نویس و نه مثل کسی که دارد گزارش سیستم می‌دهد.',
    '• اول به همان چیزی جواب بده که کاربر پرسید. سلام کرد؟ سلام کن و در یک جمله بگو چه‌کارهایی از دستت برمی‌آید. اسمت را پرسید؟ بگو «دستیارِ مبین». هیچ‌وقت سؤال کاربر را با گزارشِ وضعیت عوض نکن.',
    '• پیش‌فرض حداکثر سه جمله. فقط وقتی داری فهرستِ ایرادها را می‌گویی بلندتر شو.',
    '• فارسیِ ساده و محاوره‌ای؛ بدون مقدمه‌چینی، بدون تکرار، بدون تعارف.',
    '',
    'قواعد قطعی (نقض نکن):',
    '۱. هرگز دربارهٔ «داده»، «JSON»، «فیلد»، «پارامتر»، «استخراج»، «ماسک»، «API» یا هیچ نام داخلی حرف نزن؛ کاربر مترجم است، نه برنامه‌نویس. هرگز از کاربر نخواه چیزی بفرستد، جایی را دوباره اجرا کند، یا ورودی خاصی بدهد.',
    '۲. تو هیچ کاری انجام نمی‌دهی: هیچ متنی را جابه‌جا، حذف یا بازنویسی نمی‌کنی. فقط پیشنهاد می‌دهی؛ اجرا دستِ کاربر است.',
    '۳. اگر صفحه‌ای باز نیست یا چیزی برای بررسی نیست، در یک جملهٔ کوتاه و ساده بگو و تمام (مثلاً «الان صفحه‌ای باز نیست؛ اول عکس صفحه‌ها را بارگذاری کن»). این جمله را در پیام‌های بعدی تکرار نکن.',
    '۴. دربارهٔ چیدمان فقط با اعدادی که در زمینه آمده حرف بزن؛ هیچ عددی از خودت نساز. اگر عددی نداری، اصلاً دربارهٔ اندازه حرف نزن.',
    '۵. ایراد چیدمان را دقیق بگو: عدد + px + جهت (چپ/راست/بالا/پایین) + درصد. جمله‌هایی مثل «کمی بزرگ است» یا «شاید جا نشود» ممنوع.',
    '۶. این اثر برای بزرگسالان (+۱۸) است. ترجمه باید وفادار و صریح باشد: تلطیف، حذف، تعارف یا جایگزینی محترمانه ممنوع. هرگز به‌خاطر بزرگسال بودن محتوا از جواب دادن خودداری نکن.',
    '۷. ترجمهٔ لفظی و کتابی ننویس؛ فارسیِ محاوره‌ایِ طبیعیِ مانهوا بنویس.',
    '۸. اگر کاربر پرسید «چه ایرادی دارد؟» یا «چیدمان را بگو»: اول چیدمان (با عدد)، بعد متن، بعد جاهایی که ترجمه نشده.',
    '۹. فقط اگر پیشنهادِ درج متن داری، در پایان جواب یک بلوک JSON بده، دقیقاً به این شکل:',
    '```json',
    '{"actions":[{"type":"place","page":3,"balloon":12,"text":"متن فارسی","as":"persian"}]}',
    '```',
    'page شمارهٔ صفحه (از ۱)، balloon شناسهٔ حباب در زمینه، as="persian" برای پیش‌نویس ترجمه و as="orig" برای متن اصلی. اگر پیشنهاد درج نداری، اصلاً JSON نده.',
    '۱۰. زمینهٔ فنی صفحه خودکار پیوست می‌شود. آن یک یادداشتِ پس‌زمینه است: فقط اگر به سؤال کاربر مربوط بود از آن استفاده کن، وگرنه نادیده بگیر و طبیعی و آدمیزاد جواب بده.',
  ];
  if (!c.adult) {
    const k = L.findIndex(s => s.startsWith('۶. این اثر'));
    if (k >= 0) L[k] = '۶. محتوای بزرگسال در این برنامه فعال نیست؛ لحن محترمانه و عمومی باشد.';
  }
  /* واژه‌نامه و هر چیزی که از کار خودِ کاربر یاد گرفته */
  try {
    const g = glPromptBlock(); if (g) L.push('', g);
    const st = lnStyleBlock(); if (st) L.push('', st);
    const ex = lnExamplesBlock(12); if (ex) L.push('', ex);
  } catch (e) { }
  return L.join('\n');
}

/* ---------- اندازه‌گیری دقیق چیدمان (کارِ برنامه، نه مدل) ---------- */
/* نسبت‌های همان تابع fitShape: ناحیهٔ قابل استفادهٔ داخل حباب */
const AI_FIT_X = .9, AI_FIT_Y = .86;
/* حباب‌های صفحه را می‌گیرد؛ اگر هنوز محاسبه نشده، همین حالا حساب می‌کند */
function aiBalloons(i) {
  let C = null;
  try { C = pageBalloons(i); } catch (e) { C = null; }
  if (!C) { try { C = pageBalloons(i, true); } catch (e) { C = null; } }
  return C || [];
}

function aiMeasurePage(i) {
  const p = S.pages[i];
  if (!p) return null;
  const C = aiBalloons(i);
  const items = [], drafts = [];
  for (const L of p.layers) {
    const m = layout(L);
    if (L.draft) { drafts.push({ balloon: balloonOf(C, L), text: (L.t || '').slice(0, 80) }); continue; }
    const bi = balloonOf(C, L);
    const B = bi >= 0 ? C[bi] : null;
    const it = {
      balloon: bi,
      bubble: L.bid || null,
      tag: L.tag || '',
      text: String(L.t || '').slice(0, 500),
      box: { x: Math.round(L.x), y: Math.round(L.y), w: Math.round(L.w), h: Math.round(m.h) },
      font: { size: Math.round(L.size), lines: m.lines.length, widest: Math.round(m.w) }
    };
    if (B) {
      const ax = B.cw * AI_FIT_X, ay = B.ch * AI_FIT_Y;
      it.balloonBox = { cx: Math.round(B.cx), cy: Math.round(B.cy), cw: Math.round(B.cw), ch: Math.round(B.ch), kind: B.kind || '' };
      it.overflow = {
        x: Math.round(Math.max(0, m.w - ax)), xPct: Math.round(Math.max(0, m.w - ax) / ax * 100),
        y: Math.round(Math.max(0, m.h - ay)), yPct: Math.round(Math.max(0, m.h - ay) / ay * 100)
      };
      it.centerOffset = { dx: Math.round(L.x - B.cx), dy: Math.round(L.y - B.cy) };
      it.fill = { xPct: Math.round(m.w / ax * 100), yPct: Math.round(m.h / ay * 100) };
      it.rowsOutside = aiRowsOutside(L, m, B);
    }
    items.push(it);
  }
  /* هم‌پوشانی جفت‌به‌جفت */
  const ov = [];
  for (let a = 0; a < items.length; a++) for (let b = a + 1; b < items.length; b++) {
    const A = items[a], B2 = items[b];
    const x0 = Math.max(A.box.x - A.box.w / 2, B2.box.x - B2.box.w / 2);
    const x1 = Math.min(A.box.x + A.box.w / 2, B2.box.x + B2.box.w / 2);
    const y0 = Math.max(A.box.y - A.box.h / 2, B2.box.y - B2.box.h / 2);
    const y1 = Math.min(A.box.y + A.box.h / 2, B2.box.y + B2.box.h / 2);
    if (x1 > x0 && y1 > y0) {
      const area = (x1 - x0) * (y1 - y0);
      const small = Math.min(A.box.w * A.box.h, B2.box.w * B2.box.h) || 1;
      ov.push({ a: A.balloon, b: B2.balloon, px: Math.round(area), pctOfSmaller: Math.round(area / small * 100) });
    }
  }
  return { items, overlaps: ov, drafts, balloons: C.length };
}
/* چند سطر از بیضی حباب بیرون می‌زند (همان معادلهٔ fitShape) */
function aiRowsOutside(L, m, B) {
  if ((B.kind || '') === 'box') return 0;
  const a = B.cw * AI_FIT_X / 2, b = B.ch * AI_FIT_Y / 2, n = m.lines.length;
  let k = 0;
  for (let j = 0; j < n; j++) {
    const ye = Math.abs((j - (n - 1) / 2) * m.lh) + m.lh * .42;
    const hw = (m.ws ? m.ws[j] : m.w) / 2;
    if ((hw / a) ** 2 + (ye / b) ** 2 > 1.0001) k++;
  }
  return k;
}
/* حباب‌هایی که متن اصلی دارند ولی متن فارسی ندارند */
function aiUntranslated(i) {
  const p = S.pages[i];
  if (!p) return [];
  const C = aiBalloons(i);
  const rbs = p.rawBoxes || [];
  const covered = new Set();
  for (const L of p.layers) {
    if ((L.t || '').trim() && !L.draft) { const k = balloonOf(C, L); if (k >= 0) covered.add(k); }
  }
  const out = [];
  for (const rb of rbs) {
    const cx = (rb.x0 + rb.x1) / 2, cy = (rb.y0 + rb.y1) / 2;
    let k = -1;
    for (let n = 0; n < C.length; n++) { const r = C[n]; if (cx >= r.x0 && cx <= r.x1 && cy >= r.y0 && cy <= r.y1) { k = n; break; } }
    if (k >= 0 && !covered.has(k)) {
      const B = C[k];
      out.push({
        balloon: k, kind: B.kind || '',
        balloonBox: { cx: Math.round(B.cx), cy: Math.round(B.cy), cw: Math.round(B.cw), ch: Math.round(B.ch) },
        rawBox: { x: Math.round(cx), y: Math.round(cy), w: Math.round(rb.x1 - rb.x0), h: Math.round(rb.y1 - rb.y0) },
        fitsChars: Math.round((B.cw * AI_FIT_X * B.ch * AI_FIT_Y) / 900)
      });
    }
  }
  return out;
}

/* ---------- بستهٔ زمینه برای API ---------- */
function aiPageImage(p, maxW, q) {
  try {
    if (!p || !p.img) return null;
    const s = Math.min(1, maxW / p.w);
    const cv = document.createElement('canvas');
    cv.width = Math.max(1, Math.round(p.w * s)); cv.height = Math.max(1, Math.round(p.h * s));
    const c = cv.getContext('2d');
    c.imageSmoothingQuality = 'high';
    c.drawImage(p.img, 0, 0, cv.width, cv.height);
    return cv.toDataURL('image/jpeg', q);
  } catch (e) { return null; }
}
function aiRawImage(p, maxW, q) {
  try {
    if (!p || !p.rawImg) return null;
    const s = Math.min(1, maxW / p.rawImg.width);
    const cv = document.createElement('canvas');
    cv.width = Math.max(1, Math.round(p.rawImg.width * s)); cv.height = Math.max(1, Math.round(p.rawImg.height * s));
    const c = cv.getContext('2d');
    c.imageSmoothingQuality = 'high';
    c.drawImage(p.rawImg, 0, 0, cv.width, cv.height);
    return cv.toDataURL('image/jpeg', q);
  } catch (e) { return null; }
}

function aiBuildContext(pi) {
  const cfg = aiCfg();
  const i = (pi === undefined || pi === null) ? S.cur : pi;
  const p = S.pages[i];
  const nPages = S.pages.length, nRows = S.doc.length;
  const meta = document.querySelector('meta[name="ms-version"]');
  const data = { app: 'Mobin Studio ' + ((meta && meta.content) || '') };
  if (p) data.page = { index: i + 1, of: nPages, size: { w: p.w, h: p.h } };
  else {
    data.page = null;
    data.pagesLoaded = nPages;
    data.note = nPages === 0
      ? (nRows ? 'متن پردازش شده ولی عکسی بارگذاری نشده؛ اعداد چیدمان در دسترس نیست.'
        : 'برنامه خالی است: نه عکسی بارگذاری شده و نه متنی پردازش شده.')
      : 'صفحهٔ جاری در دسترس نیست.';
  }
  const bs = (S.doc[i] || []).filter(b => !b.skip);
  const ps = placedSet(i);
  data.bubbles = bs.slice(0, 140).map(b => ({
    id: b.id, tag: b.tag || '', type: b.type || '',
    chars: String(b.text || '').length,
    placed: ps.has(b.id),
    /* raw = خط اصلیِ متن؛ text = آخرین چیزی که روی حباب نوشته شده */
    orig: String(b.raw || '').slice(0, 400),
    text: String(b.text || '').slice(0, 400)
  }));
  /* 8.6.0 — فهرست همهٔ حباب‌های پیدا‌شده؛ مدل باید بتواند به هر حباب شماره بدهد */
  data.balloons = p ? aiBalloons(i).slice(0, 60).map((B, k) => ({
    id: k, kind: B.kind || '', cx: Math.round(B.cx), cy: Math.round(B.cy), cw: Math.round(B.cw), ch: Math.round(B.ch)
  })) : [];
  data.placed = [];
  data.overlaps = [];
  data.untranslated = [];
  data.drafts = [];
  data.otherPages = S.doc.map((g, k) => k === i ? null : { page: k + 1, bubbles: g.filter(b => !b.skip).length, placed: placedSet(k).size }).filter(Boolean);
  if (p) {
    const M = aiMeasurePage(i);
    data.placed = M.items;
    data.overlaps = M.overlaps;
    data.drafts = M.drafts;
    data.untranslated = aiUntranslated(i);
    data.rawBoxesCount = (p.rawBoxes || []).length;
  }
  const parts = ['(زمینهٔ خودکار برنامه — یادداشت پس‌زمینه. اگر به پرسش کاربر مربوط نبود نادیده بگیرش.)'];
  if (cfg.image && p) {
    const img = aiPageImage(p, 1000, .72);
    const raw = aiRawImage(p, 1000, .72);
    if (img) parts.push({ image: img, label: 'تصویر صفحه بعد از پاک‌سازی (کلین)' });
    if (raw) parts.push({ image: raw, label: 'تصویر صفحهٔ خام (متن اصلی روی آن است)' });
  }
  parts.push(JSON.stringify(data));
  return { data, parts };
}

/* ---------- فراخوانی API ---------- */
function aiEndpoint(url) {
  let u = String(url || '').trim().replace(/\/+$/, '');
  if (!u) return '';
  if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
  if (/\/chat\/completions$/i.test(u)) return u;
  if (/\/v\d+$/i.test(u)) return u + '/chat/completions';
  return u + '/v1/chat/completions';
}
async function aiRequest(messages) {
  const cfg = aiCfg();
  const url = aiEndpoint(cfg.url);
  if (!url) throw new Error('address');
  const body = { model: cfg.model, messages, temperature: cfg.temp, stream: false, max_tokens: 1800 };
  const ac = new AbortController();
  const timer = setTimeout(() => ac.abort(), 120000);
  let res;
  try {
    res = await fetch(url, {
      method: 'POST', signal: ac.signal,
      headers: Object.assign({ 'Content-Type': 'application/json' },
        cfg.key ? { Authorization: 'Bearer ' + cfg.key } : {}),
      body: JSON.stringify(body)
    });
  } catch (e) {
    clearTimeout(timer);
    if (e && e.name === 'AbortError') throw new Error('timeout');
    throw new Error('network');
  }
  clearTimeout(timer);
  const txt = await res.text();
  if (!res.ok) {
    let msg = '';
    try { msg = (JSON.parse(txt).error || {}).message || ''; } catch (e) { }
    const err = new Error('http'); err.status = res.status; err.detail = msg || txt.slice(0, 300);
    throw err;
  }
  let j;
  try { j = JSON.parse(txt); } catch (e) { throw new Error('badresponse'); }
  const ch = j && j.choices && j.choices[0];
  const content = ch && ((ch.message && ch.message.content) || ch.text) || '';
  if (!content) throw new Error('empty');
  return String(content);
}
function aiErr(fa) {
  const m = {
    address: 'آدرس API تنظیم نشده — از تنظیمات ← دستیار وارد کن',
    network: 'اتصال برقرار نشد. اینترنت و آدرس API را بررسی کن',
    timeout: 'پاسخ دیر شد (۲ دقیقه). دوباره بزن یا مدل سریع‌تری بردار',
    empty: 'مدل جواب خالی داد',
    badresponse: 'پاسخ مدل قابل خواندن نبود',
    refused: 'این مدل از جواب دادن به این درخواست خودداری کرد — مدل دیگری را امتحان کن'
  };
  if (fa.status === 401 || fa.status === 403) return 'کلید API پذیرفته نشد (' + fa.status + ')';
  if (fa.status === 404) return 'آدرس یا نام مدل پیدا نشد (404) — ' + (fa.detail || '');
  if (fa.status === 429) return 'سقف مصرف یا محدودیت تعداد (429) — کمی بعد دوباره بزن';
  if (fa.status >= 500) return 'خطای سرور مدل (' + fa.status + ')' + (fa.detail ? ' — ' + fa.detail : '');
  return m[fa.message] || ('خطا: ' + (fa.detail || fa.message || 'نامشخص'));
}
/* مدل‌ها گاهی به‌جای جواب، امتناع می‌نویسند */
function aiLooksRefused(s) {
  return /(i can(?:not|'t) (?:help|assist|comply)|i'm (?:not able|unable) to|as an ai|cannot (?:assist|provide|comply)|متأسفانه نمی‌توانم|نمی‌توانم در این مورد|قادر به پاسخگویی نیستم)/i.test(String(s || ''));
}

/* ---------- استخراج پیشنهادها از جواب ---------- */
function aiParseActions(text) {
  const out = [];
  const re = /```json\s*([\s\S]*?)```/gi;
  let m;
  while ((m = re.exec(text))) {
    try {
      const j = JSON.parse(m[1]);
      if (j && Array.isArray(j.actions)) out.push(...j.actions);
    } catch (e) { }
  }
  return out.filter(a => a && a.type === 'place' && typeof a.text === 'string' && a.text.trim());
}
function aiStripActions(text) {
  return String(text).replace(/```json\s*[\s\S]*?```/gi, '').replace(/\n{3,}/g, '\n\n').trim();
}

/* ---------- ساخت پیش‌نویس (فقط ساختن؛ هرگز تغییر یا حذف) ---------- */
function aiBubbleFor(pi, text) {
  const list = S.doc[pi] || (S.doc[pi] = []);
  let n = 0;
  for (const b of list) { const k = parseInt(String(b.id).split(':')[1], 10); if (k >= n) n = k + 1; }
  const b = { id: pi + ':' + n, tag: '؟', type: '', text: text, ai: true };
  list.push(b);
  return b;
}
function aiPlaceDraft(pi, balloonIdx, text, as) {
  const p = S.pages[pi];
  if (!p) return null;
  const C = aiBalloons(pi);
  const B = C[balloonIdx];
  if (!B) return null;
  /* اگر همین حباب از قبل متن قطعی دارد، دست نمی‌زنیم */
  for (const L of p.layers) if (!L.draft && (L.t || '').trim() && balloonOf(C, L) === balloonIdx) return null;
  const b = aiBubbleFor(pi, text);
  const L = newLayer(b, B.cx, B.cy);
  L.t = text; L.draft = as === 'orig' ? 'orig' : 'ai';
  L.draftText = String(text);
  try { fitShape(L, B, true); } catch (e) { L.w = Math.round(B.cw * .8); L.size = Math.max(8, Math.round(B.ch * .12)); }
  p.layers.push(L);
  return L;
}
function aiDrafts() {
  const out = [];
  S.pages.forEach((p, pi) => { for (const L of p.layers) if (L.draft) out.push({ pi, L }); });
  return out;
}
function aiDiscardDrafts() {
  const all = aiDrafts();
  if (!all.length) return 0;
  pushHist();
  for (const { L } of all) {
    S.pages.forEach(p => { const k = p.layers.indexOf(L); if (k >= 0) p.layers.splice(k, 1); });
  }
  /* حباب‌هایی که فقط برای پیش‌نویس ساخته شده‌اند هم بروند */
  S.doc.forEach((g, pi) => {
    for (const b of g.slice()) if (b.ai && !S.pages[pi].layers.some(L => L.bid === b.id)) g.splice(g.indexOf(b), 1);
  });
  renderAll(); syncAll(); autosave();
  return all.length;
}
function aiConfirmDrafts() {
  const all = aiDrafts();
  if (!all.length) return 0;
  pushHist();
  for (const { pi, L } of all) {
    /* 8.6.0 — از تأیید و اصلاحِ خودِ کاربر یاد می‌گیریم */
    const b = (S.doc[pi] || []).find(x => x.id === L.bid);
    const orig = b ? String(b.raw || '').trim() : '';
    const fa = String(L.t || '').trim();
    if (fa) {
      if (orig) lnCapture(orig, fa, L.tag, L.draft === 'orig' ? 'orig' : 'ai');
      else if (L.draftText && L.draftText.trim() !== fa) lnCapture(L.draftText, fa, L.tag, 'fix');
    }
    delete L.draft;
    delete L.draftText;
  }
  renderAll(); syncAll(); autosave();
  return all.length;
}

/* ============================================================
   پیش‌نمایش قبل از عمل: هیچ‌چیز تا تأیید ساخته نمی‌شود
   ============================================================ */
function aiStage(actions) {
  const items = [];
  const skipped = [];
  for (const a of actions) {
    const pi = Math.max(0, (parseInt(a.page, 10) || (S.cur + 1)) - 1);
    const p = S.pages[pi];
    const C = p ? aiBalloons(pi) : [];
    let bi = (a.balloon === 0 || a.balloon) ? parseInt(a.balloon, 10) : -1;
    if (!(bi >= 0 && bi < C.length)) bi = -1;
    if (bi < 0 && a.bubble) {
      const L0 = p && p.layers.find(L => L.bid === a.bubble);
      if (L0) bi = balloonOf(C, L0);
    }
    if (bi < 0 || !C[bi]) { skipped.push({ a, why: 'حباب پیدا نشد' }); continue; }
    const B = C[bi];
    let busy = false;
    for (const L of (p.layers || [])) if (!L.draft && (L.t || '').trim() && balloonOf(C, L) === bi) busy = true;
    if (busy) { skipped.push({ a, why: 'اینجا از قبل متن قطعی دارد' }); continue; }
    items.push({ pi, balloon: bi, text: String(a.text).slice(0, 2000), as: a.as === 'orig' ? 'orig' : 'ai', box: B });
  }
  S.aiPreview = items.length ? { items, skipped } : null;
  renderAll();
  aiRenderPreview();
  return { ok: items.length, skipped: skipped.length };
}
function aiCancelPreview() {
  S.aiPreview = null;
  renderAll(); aiRenderPreview();
}
function aiApplyPreview() {
  const pv = S.aiPreview;
  if (!pv || !pv.items.length) return;
  pushHist();
  let n = 0;
  for (const it of pv.items) if (aiPlaceDraft(it.pi, it.balloon, it.text, it.as)) n++;
  S.aiPreview = null;
  renderAll(); syncAll(); autosave();
  aiPush('sys', faNum(n) + ' متن به‌صورت پیش‌نویس ساخته شد (کادر خط‌چین نارنجی). از نوار پایین پنل «تأیید پیش‌نویس‌ها» یا «دور ریختن» را بزن.');
  aiRenderPreview();
}
function drawAiPreviewExtras(c, i) {
  const pv = S.aiPreview;
  if (!pv) return;
  const k = 1 / (S.zoom || 1);
  c.save();
  c.lineWidth = Math.max(1.6, 2 * k);
  c.setLineDash([9 * k, 6 * k]);
  for (const it of pv.items) {
    if (it.pi !== i) continue;
    c.strokeStyle = 'rgba(255,159,26,.95)';
    c.fillStyle = 'rgba(255,159,26,.1)';
    const B = it.box, x = B.x0, y = B.y0, w = B.x1 - B.x0, h = B.y1 - B.y0;
    c.fillRect(x, y, w, h); c.strokeRect(x, y, w, h);
  }
  c.restore();
}

/* ============================================================
   پنل چت
   ============================================================ */
function aiPush(role, text, opt) {
  S.ai.msgs.push(Object.assign({ role, text }, opt || {}));
  if (S.ai.msgs.length > AI_MAX_MSGS) S.ai.msgs.splice(0, S.ai.msgs.length - AI_MAX_MSGS);
  aiRenderMsgs();
}
function aiRenderMsgs() {
  const box = $('#aiMsgs');
  if (!box) return;
  box.textContent = '';
  if (!S.ai.msgs.length) {
    const e = el('div', { class: 'aiEmpty' });
    e.append(el('b', { text: 'من دستیارِ مبین هستم — و فقط وقتی حرف می‌زنم که تو بپرسی.' }),
      el('span', { text: 'هر چه می‌خواهی بپرس؛ مثلاً:\n• این صفحه چه ایرادی دارد؟\n• کدام قسمت ترجمه نشده؟\n• این جمله را کوتاه کن تا جا شود.\n• چیدمان حباب‌ها را با عدد بگو.' }));
    box.append(e);
    return;
  }
  for (const m of S.ai.msgs) {
    const row = el('div', { class: 'aiMsg ' + m.role + (m.err ? ' err' : '') });
    if (m.role !== 'me') row.append(el('div', { class: 'aiWho', text: m.role === 'sys' ? 'برنامه' : 'دستیار' }));
    row.append(el('div', { class: 'aiBody', text: m.text }));
    if (m.actions && m.actions.length) row.append(aiActionCards(m));
    if (m.note) row.append(el('div', { class: 'aiNote', text: m.note }));
    box.append(row);
  }
  box.scrollTop = box.scrollHeight;
}
function aiActionCards(m) {
  const wrap = el('div', { class: 'aiActs' });
  wrap.append(el('div', { class: 'aiActsHead', text: faNum(m.actions.length) + ' پیشنهاد درج متن — هر کدام را می‌خواهی انتخاب کن' }));
  const list = el('div', { class: 'aiActList' });
  m.actions.forEach((a, k) => {
    const pi = Math.max(0, (parseInt(a.page, 10) || (S.cur + 1)) - 1);
    const card = el('div', { class: 'aiAct', 'data-k': k });
    const head = el('div', { class: 'aiActT' });
    head.append(el('b', { text: 'صفحهٔ ' + faNum(pi + 1) + (a.balloon !== undefined ? ' · حباب ' + faNum((parseInt(a.balloon, 10) || 0) + 1) : '') }));
    head.append(el('span', { class: 'pill ' + (a.as === 'orig' ? 'wn' : 'inf'), text: a.as === 'orig' ? 'متن اصلی' : 'ترجمه' }));
    card.append(head, el('div', { class: 'aiActX', text: String(a.text).slice(0, 300) }));
    card.addEventListener('click', () => card.classList.toggle('on'));
    list.append(card);
  });
  wrap.append(list);
  const bar = el('div', { class: 'aiActBar' });
  const go = el('button', { class: 'btn sm pri', type: 'button', text: 'آماده‌سازی انتخاب‌شده‌ها روی صفحه' });
  go.addEventListener('click', () => {
    const sel = list.querySelectorAll('.aiAct.on');
    const acts = sel.length ? [].map.call(sel, n => m.actions[+n.dataset.k]) : m.actions;
    const r = aiStage(acts);
    if (!r.ok) aiPush('sys', 'چیزی برای ساخت نبود' + (r.skipped ? ' (' + faNum(r.skipped) + ' مورد رد شد)' : ''), { err: true });
  });
  const all = el('button', { class: 'btn sm gho', type: 'button', text: 'همه را انتخاب کن' });
  all.addEventListener('click', () => list.querySelectorAll('.aiAct').forEach(n => n.classList.add('on')));
  bar.append(go, all);
  wrap.append(bar);
  return wrap;
}
function aiRenderPreview() {
  const bar = $('#aiPrev');
  if (!bar) return;
  const pv = S.aiPreview;
  bar.classList.toggle('on', !!pv);
  if (!pv) { bar.textContent = ''; return; }
  bar.textContent = '';
  const t = el('div', { class: 'aiPrevT' });
  t.append(el('b', { text: faNum(pv.items.length) + ' متن آمادهٔ ساخت است' }));
  t.append(el('span', { text: 'کادرهای خط‌چین نارنجی روی بوم جای دقیق را نشان می‌دهند. هنوز چیزی ساخته نشده.' }));
  if (pv.skipped.length) t.append(el('span', { class: 'aiPrevSkip', text: faNum(pv.skipped.length) + ' مورد رد شد: ' + pv.skipped.map(s => s.why).join('، ') }));
  const b1 = el('button', { class: 'btn sm pri', type: 'button', text: 'تأیید و ساخت' });
  b1.addEventListener('click', aiApplyPreview);
  const b2 = el('button', { class: 'btn sm gho', type: 'button', text: 'لغو' });
  b2.addEventListener('click', aiCancelPreview);
  bar.append(t, b1, b2);
}
function aiBusy(on) {
  const p = $('#aiPanel'); if (p) p.classList.toggle('busy', !!on);
  const b = $('#aiSend'); if (b) b.disabled = !!on;
  const st = $('#aiState'); if (st) st.textContent = on ? 'در حال فکر کردن…' : '';
}

async function aiSend() {
  const inp = $('#aiInput');
  const text = (inp.value || '').trim();
  if (!text) return;
  if (!aiReady()) {
    aiPush('sys', 'اول در تنظیمات ← دستیار، آدرس API و نام مدل را وارد کن.', { err: true });
    aiOpenSettings();
    return;
  }
  inp.value = ''; inp.style.height = '';
  return aiAsk(text, '');
}

/* یک دور گفت‌وگو؛ extra یک دستور یک‌بارهٔ اضافه است (فقط همین درخواست) */
async function aiAsk(text, extra) {
  if (S.ai.busy) return;
  text = String(text || '').trim();
  if (!text) return;
  if (!aiReady()) {
    aiPush('sys', 'اول در تنظیمات ← دستیار، آدرس API و نام مدل را وارد کن.', { err: true });
    aiOpenSettings();
    return;
  }
  aiPush('me', text);
  S.ai.busy = true; aiBusy(true);
  try {
    const ctx = aiBuildContext(S.cur);
    const msgs = [{ role: 'system', content: aiPersona() }];
    /* everything the user said before, but never the message we are sending now */
    for (const m of S.ai.msgs.slice(0, -1).slice(-10)) {
      if (m.role === 'sys' || m.err || !m.text) continue;
      msgs.push({ role: m.role === 'me' ? 'user' : 'assistant', content: m.text });
    }
    const parts = [];
    for (const part of ctx.parts) {
      if (typeof part === 'string') parts.push({ type: 'text', text: part });
      else if (part && part.image) {
        parts.push({ type: 'text', text: part.label });
        parts.push({ type: 'image_url', image_url: { url: part.image } });
      }
    }
    /* the question itself must be here — and last, so it is the freshest thing the model reads */
    parts.push({ type: 'text', text: 'پرسش کاربر:\n' + text });
    if (extra) parts.push({ type: 'text', text: extra });
    msgs.push({ role: 'user', content: parts });
    let reply;
    try {
      reply = await aiRequest(msgs);
    } catch (e) {
      const hasImg = parts.some(p => p.type === 'image_url');
      if (hasImg && (e.message === 'badresponse' || e.status === 400 || e.status === 422)) {
        msgs[msgs.length - 1] = { role: 'user', content: parts.filter(p => p.type === 'text').map(p => p.text).join('\n') };
        reply = await aiRequest(msgs);
        aiPush('sys', 'این مدل تصویر را قبول نکرد؛ بدون تصویر پرسیدم (فقط ایرادهای متنی بررسی می‌شوند).');
      } else throw e;
    }
    if (aiLooksRefused(reply)) aiPush('ai', reply, { note: 'این مدل از جواب دادن خودداری کرد. مدل دیگری را در تنظیمات ← دستیار بگذار.' });
    else {
      const clean = aiStripActions(reply) || reply;
      const prev = S.ai.msgs.slice(0, -1).reverse().find(m => m.role === 'ai' && !m.err && m.text);
      const flat = s => String(s).replace(/\s+/g, ' ').trim();
      const dup = !!prev && clean.length > 140 && flat(clean).slice(0, 150) === flat(prev.text).slice(0, 150);
      aiPush('ai', clean, {
        actions: aiParseActions(reply),
        note: dup ? 'این جواب با جواب قبلی یکی بود. اگر منظورت چیز دیگری است روشن‌تر بپرس.' : null
      });
    }
  } catch (e) {
    aiPush('sys', aiErr(e), { err: true });
  } finally {
    S.ai.busy = false; aiBusy(false);
  }
}
function aiOpenSettings() {
  const ov = $('#ovSet'); if (!ov) return;
  ov.classList.add('on');
  if (typeof openSettings === 'function') openSettings('ai');
}
function aiOpen(on) {
  const p = $('#aiPanel'); if (!p) return;
  const want = on === undefined ? !p.classList.contains('on') : !!on;
  p.classList.toggle('on', want);
  document.body.classList.toggle('aiOpen', want);
  const b = $('#bAi'); if (b) b.setAttribute('aria-pressed', want ? 'true' : 'false');
  if (want) {
    aiRenderMsgs();
    const t = $('#aiInput'); if (t) setTimeout(() => t.focus(), 40);
  } else if (S.aiPreview) aiCancelPreview();
}

/* ---------- تنظیمات دستیار ---------- */
function aiReadCfgToUI() {
  const c = aiCfg();
  const set = (id, v) => { const n = $(id); if (n) n.value = v; };
  const chk = (id, v) => { const n = $(id); if (n) n.checked = !!v; };
  set('#aiUrl', c.url); set('#aiModel', c.model); set('#aiKey', c.key);
  chk('#aiImg', c.image); chk('#aiAdult', c.adult);
  const st = $('#aiCfgState');
  if (st) st.textContent = (c.url && c.model) ? ('آماده: ' + c.model) : 'تنظیم نشده — آدرس و مدل را وارد کن';
  const tag = $('#aiModelTag');
  if (tag) tag.textContent = c.model || 'بدون مدل';
}
async function aiTest() {
  const st = $('#aiCfgState');
  if (!aiReady()) { if (st) st.textContent = 'اول آدرس و مدل را پر کن'; return; }
  if (st) st.textContent = 'در حال آزمایش…';
  try {
    const r = await aiRequest([{ role: 'user', content: 'فقط یک کلمه جواب بده: آماده' }]);
    if (st) st.textContent = 'اتصال برقرار است — پاسخ: ' + String(r).slice(0, 60);
  } catch (e) {
    if (st) st.textContent = aiErr(e);
  }
}

/* ============================================================
   سیم‌کشی
   ============================================================ */
function wireAi() {
  const openB = $('#bAi');
  if (openB) openB.onclick = () => aiOpen();
  const closeB = $('#aiClose');
  if (closeB) closeB.onclick = () => aiOpen(false);
  const clr = $('#aiClear');
  if (clr) clr.onclick = () => { S.ai.msgs = []; aiRenderMsgs(); };
  const form = $('#aiForm');
  if (form) form.addEventListener('submit', e => { e.preventDefault(); aiSend(); });
  const inp = $('#aiInput');
  if (inp) {
    inp.addEventListener('input', () => { inp.style.height = 'auto'; inp.style.height = Math.min(140, inp.scrollHeight + 2) + 'px'; });
    inp.addEventListener('keydown', e => {
      e.stopPropagation();
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); aiSend(); }
    });
  }
  const cp = $('#aiCfgPick'); if (cp) cp.onclick = () => aiOpenSettings();
  const sv = $('#aiSave');
  if (sv) sv.onclick = () => {
    aiSaveCfg({
      url: ($('#aiUrl') || {}).value || '', model: ($('#aiModel') || {}).value || '',
      key: ($('#aiKey') || {}).value || '',
      image: !!($('#aiImg') || {}).checked, adult: !!($('#aiAdult') || {}).checked
    });
    aiReadCfgToUI();
    toast('تنظیمات دستیار ذخیره شد', 'ok', 2400);
  };
  const kc = $('#aiKeyClear'); if (kc) kc.onclick = () => { aiSaveCfg({ key: '' }); aiReadCfgToUI(); toast('کلید پاک شد', 'ok', 2000); };
  const ts = $('#aiTest'); if (ts) ts.onclick = aiTest;
  const conf = $('#aiConfirm');
  const confAll = $('#aiConfirmAll');
  const doConfirm = () => { const n = aiConfirmDrafts(); if (n) { aiPush('sys', faNum(n) + ' پیش‌نویس قطعی شد.'); toast(faNum(n) + ' پیش‌نویس قطعی شد', 'ok'); } };
  if (conf) conf.onclick = doConfirm;
  if (confAll) confAll.onclick = doConfirm;
  const disc = $('#aiDiscard');
  const discAll = $('#aiDiscardAll');
  const doDiscard = () => { const n = aiDiscardDrafts(); if (n) { aiPush('sys', faNum(n) + ' پیش‌نویس دور ریخته شد (Ctrl+Z برمی‌گرداند).'); toast(faNum(n) + ' پیش‌نویس دور ریخته شد', 'ok'); } };
  if (disc) disc.onclick = doDiscard;
  if (discAll) discAll.onclick = doDiscard;
  addEventListener('keydown', e => {
    const t = e.target;
    const typing = t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable);
    if (typing) return;
    const pan = $('#aiPanel');
    if (e.key === 'Escape' && pan && pan.classList.contains('on')) { e.preventDefault(); aiOpen(false); return; }
    if (e.key === 'F6') { e.preventDefault(); aiOpen(); }
  }, true);
  aiReadCfgToUI();
}

S.ai = { msgs: [], busy: false };
S.aiPreview = null;
wireAi();