
/* modern lettering fonts (SIL Open Font License), filled in at build time */
const LETTER=/*@@LETTERFONTS@@*/[];

const I={"close": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m6 6 8 8M14 6l-8 8\"/></svg>", "img": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2.5\" y=\"3.5\" width=\"15\" height=\"13\" rx=\"2.2\"/><circle cx=\"7\" cy=\"8\" r=\"1.4\"/><path d=\"m3 13.5 4-3.6 4 3.3 3-2.4 3 2.7\"/></svg>", "doc": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 3h7l5 5v9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 4 17V4.5A1.5 1.5 0 0 1 5.5 3Z\"/><path d=\"M11 3v5h5M7 12h6M7 15h4\"/></svg>", "pen": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M13.3 3.6a1.8 1.8 0 0 1 2.6 2.6L7.4 14.7 4 15.9l1.2-3.4 8.1-8.9Z\"/></svg>", "bolt": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M11 2.5 4.8 11h4L9 17.5 15.2 9h-4L11 2.5Z\"/></svg>", "search": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"9\" cy=\"9\" r=\"5.3\"/><path d=\"m13 13 3.5 3.5\"/></svg>", "star": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m10 2.8 2.2 4.6 5 .7-3.6 3.5.9 5-4.5-2.4L5.5 16.6l.9-5L2.8 8.1l5-.7L10 2.8Z\"/></svg>", "copy": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"7\" y=\"7\" width=\"10\" height=\"10\" rx=\"2\"/><path d=\"M13 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2\"/></svg>", "fit": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 8V4.5A1.5 1.5 0 0 1 4.5 3H8M12 3h3.5A1.5 1.5 0 0 1 17 4.5V8M17 12v3.5a1.5 1.5 0 0 1-1.5 1.5H12M8 17H4.5A1.5 1.5 0 0 1 3 15.5V12\"/><rect x=\"7\" y=\"7\" width=\"6\" height=\"6\" rx=\"1.3\"/></svg>", "trash": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 6h12M8 6V4.5A1.5 1.5 0 0 1 9.5 3h1A1.5 1.5 0 0 1 12 4.5V6M6 6l.7 9.6A1.5 1.5 0 0 0 8.2 17h3.6a1.5 1.5 0 0 0 1.5-1.4L14 6\"/></svg>", "redoArrow": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M13.5 6.5h3v-3M16.2 6.8A6.5 6.5 0 1 0 16.5 11\"/></svg>", "swap": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 7h10l-2.4-2.4M16 13H6l2.4 2.4\"/></svg>", "folder": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2.5 6a2 2 0 0 1 2-2h3l1.6 2h6.4a2 2 0 0 1 2 2v6.5a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2V6Z\"/></svg>", "upload": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 13V4m0 0L7 7m3-3 3 3M4 14v1.5A1.5 1.5 0 0 0 5.5 17h9a1.5 1.5 0 0 0 1.5-1.5V14\"/></svg>", "eraser": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M8.6 15.5 3.9 10.8a1.5 1.5 0 0 1 0-2.1l5.3-5.3a1.5 1.5 0 0 1 2.1 0l4.7 4.7a1.5 1.5 0 0 1 0 2.1l-5.3 5.3H17\"/><path d=\"m6.6 7.6 5.8 5.8\"/></svg>", "save": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3.5 5.5A2 2 0 0 1 5.5 3.5h7.3L16.5 7v7.5a2 2 0 0 1-2 2h-9a2 2 0 0 1-2-2v-9Z\"/><path d=\"M6.5 3.5v4h6M6.5 16.5v-4h7\"/></svg>", "box": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 6.6 10 3l7 3.6v6.8L10 17l-7-3.6V6.6Z\"/><path d=\"M3 6.6 10 10.2l7-3.6M10 10.2V17\"/></svg>", "clock": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"10\" cy=\"10\" r=\"7\"/><path d=\"M10 6v4.3l2.7 1.6\"/></svg>", "panelR": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2.5\" y=\"3\" width=\"15\" height=\"14\" rx=\"2.5\"/><path d=\"M12.5 3v14\"/></svg>", "panelL": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"2.5\" y=\"3\" width=\"15\" height=\"14\" rx=\"2.5\"/><path d=\"M7.5 3v14\"/></svg>", "undoArrow": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M7 7H4V4M4.3 7A6.5 6.5 0 1 1 4 11.3\"/></svg>", "export": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 13V4m0 9-3.2-3.2M10 13l3.2-3.2M4 14.5v1A1.5 1.5 0 0 0 5.5 17h9a1.5 1.5 0 0 0 1.5-1.5v-1\"/></svg>", "import": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 4v9m0-9L6.8 7.2M10 4l3.2 3.2M4 14.5v1A1.5 1.5 0 0 0 5.5 17h9a1.5 1.5 0 0 0 1.5-1.5v-1\"/></svg>", "sliders": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 6h12M4 10h12M4 14h7\"/><circle cx=\"13.5\" cy=\"14\" r=\"2.1\"/></svg>", "help": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"10\" cy=\"10\" r=\"7.2\"/><path d=\"M8 7.8a2.1 2.1 0 1 1 2.6 2.05c-.4.12-.6.45-.6.85v.6\"/><path d=\"M10 14.3v.05\" stroke-width=\"2\"/></svg>", "dots": "<svg viewBox=\"0 0 20 20\" fill=\"currentColor\"><circle cx=\"10\" cy=\"4.5\" r=\"1.6\"/><circle cx=\"10\" cy=\"10\" r=\"1.6\"/><circle cx=\"10\" cy=\"15.5\" r=\"1.6\"/></svg>", "plus": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 4.5v11M4.5 10h11\"/></svg>", "left": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 4.5 6.5 10l5.5 5.5\"/></svg>", "right": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M8 4.5 13.5 10 8 15.5\"/></svg>", "play": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5.5 4.3 15.5 10l-10 5.7V4.3Z\"/></svg>", "wand": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M4 16 13.5 6.5M12 3.2l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6L9.8 5.4l1.6-.6L12 3.2ZM16.4 9.6l.4 1.1 1.1.4-1.1.4-.4 1.1-.4-1.1-1.1-.4 1.1-.4.4-1.1Z\"/></svg>", "grid": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"3\" y=\"3\" width=\"6\" height=\"6\" rx=\"1.5\"/><rect x=\"11\" y=\"3\" width=\"6\" height=\"6\" rx=\"1.5\"/><rect x=\"3\" y=\"11\" width=\"6\" height=\"6\" rx=\"1.5\"/><rect x=\"11\" y=\"11\" width=\"6\" height=\"6\" rx=\"1.5\"/></svg>", "zip": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 6.6 10 3l7 3.6v6.8L10 17l-7-3.6V6.6Z\"/><path d=\"M3 6.6 10 10.2l7-3.6M10 10.2V17\"/></svg>", "device": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"5.5\" y=\"2.5\" width=\"9\" height=\"15\" rx=\"2\"/><path d=\"M8.6 15.4h2.8\"/></svg>", "layers": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M10 2.8 17 6.4 10 10 3 6.4l7-3.6Z\"/><path d=\"m3.6 10 6.4 3.3 6.4-3.3M3.6 13.4 10 16.7l6.4-3.3\"/></svg>", "bubble": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3.2 5.5A2.3 2.3 0 0 1 5.5 3.2h9A2.3 2.3 0 0 1 16.8 5.5v6A2.3 2.3 0 0 1 14.5 13.8H10l-4 3.2v-3.2h-.5A2.3 2.3 0 0 1 3.2 11.5v-6Z\"/></svg>", "sun": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"10\" cy=\"10\" r=\"3.6\"/><path d=\"M10 1.8v1.9M10 16.3v1.9M18.2 10h-1.9M3.7 10H1.8M15.8 4.2l-1.35 1.35M5.55 14.45 4.2 15.8M15.8 15.8l-1.35-1.35M5.55 5.55 4.2 4.2\"/></svg>", "moon": "<svg viewBox=\"0 0 20 20\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M16.2 12.4A6.9 6.9 0 0 1 7.6 3.8a6.9 6.9 0 1 0 8.6 8.6Z\"/></svg>"};

/* ============================================================
   استودیو تایپ مانهوا v6 — کاملاً آفلاین
   ============================================================ */
'use strict';
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const FA = '۰۱۲۳۴۵۶۷۸۹';
const faNum = n => String(n).replace(/\d/g, d => FA[d]);
const toLatin = s => String(s).replace(/[۰-۹]/g, d => FA.indexOf(d)).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
const el = (tag, props, kids) => {
  const n = document.createElement(tag);
  if (props) for (const k in props) {
    const v = props[k];
    if (k === 'class') n.className = v;
    else if (k === 'text') n.textContent = v;
    else if (k === 'html') n.innerHTML = v;              // static markup only
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
    else if (v !== null && v !== undefined && v !== false) n.setAttribute(k, v === true ? '' : v);
  }
  if (kids) for (const c of [].concat(kids)) if (c) n.append(c);
  return n;
};
const svg = d => { const w = el('span'); w.innerHTML = d; return w.firstElementChild; };

/* ---------- toast ---------- */
const ICONS = {
  ok: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="8" cy="8" r="6.4"/><path d="m5.2 8.2 2 2 3.6-4.1" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  wn: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 2.2 14.6 13.6H1.4L8 2.2Z" stroke-linejoin="round"/><path d="M8 6.4v3.2M8 11.7v.1" stroke-linecap="round"/></svg>',
  er: '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="8" cy="8" r="6.4"/><path d="m5.8 5.8 4.4 4.4M10.2 5.8 5.8 10.2" stroke-linecap="round"/></svg>',
  i:  '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="8" cy="8" r="6.4"/><path d="M8 7.3v3.6M8 5.1v.1" stroke-linecap="round"/></svg>'
};
let lastToast = null;
function toast(msg, kind = 'i', ms = 3200) {
  if (lastToast && lastToast.msg === msg && Date.now() - lastToast.at < 900) return;
  lastToast = { msg, at: Date.now() };
  const n = el('div', { class: 'toast ' + kind });
  n.append(svg(ICONS[kind] || ICONS.i), el('span', { text: msg }));
  $('#toasts').append(n);
  const kill = () => { if (n._dead) return; n._dead = true; n.classList.add('out'); setTimeout(() => n.remove(), 280); };
  n._kill = kill;
  setTimeout(kill, ms);
  while ($('#toasts').children.length > 4) $('#toasts').firstChild.remove();
}

/* tool buttons clicked with the mouse give the keyboard back to the page (no stray focus ring, Enter/Space never re-press them) */
addEventListener('click', e => {
  const b = e.detail > 0 && e.target.closest && e.target.closest('#rail .rb, #sbar button, #cleanBar button');
  if (b) setTimeout(() => { if (document.activeElement === b) b.blur(); }, 0);
}, true);
/* toasts let clicks through to the page under them; starting to work on the page clears the informational ones */
addEventListener('pointerdown', e => {
  if (!e.target.closest || !e.target.closest('#stage')) return;
  document.querySelectorAll('#toasts .toast.i, #toasts .toast.ok').forEach(n => n._kill && n._kill());
}, true);

/* ---------- confirm dialog ---------- */
let askResolve = null;
function ask(title, body, yes = 'بله', no = 'انصراف', alt = '') {
  $('#askTitle').textContent = title;
  const ab = $('#askAlt'); if (ab) { ab.textContent = alt || ''; ab.style.display = alt ? '' : 'none'; }
  $('#askBody').textContent = body;
  $('#askYes').textContent = yes;
  $('#askNo').textContent = no;
  $('#ovAsk').classList.add('on');
  setTimeout(() => $('#askYes').focus(), 30);
  return new Promise(r => { askResolve = r; });
}
const askEnd = v => { $('#ovAsk').classList.remove('on'); if (askResolve) askResolve(v); askResolve = null; };

/* ---------- busy overlay ---------- */
const busy = {
  show(t) { $('#busyT').textContent = t; $('#busyI').style.width = '0%'; $('#busyS').textContent = ''; $('#busy').classList.add('on'); },
  set(i, n, note) { $('#busyI').style.width = (n ? i / n * 100 : 0) + '%'; $('#busyS').textContent = note || (faNum(i) + ' از ' + faNum(n)); },
  hide() { $('#busy').classList.remove('on'); }
};
const nextFrame = () => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

/* ============================================================
   STATE
   ============================================================ */
const DEFAULTS = {
  autoFit: true, grow: false, invert: true, next: true, autoPlace: true, autoGo: true, rtlOrder: false,
  dragBox: true, openSpace: true, singlePageMob: true, directSave: false, saveDirPath: '',
  arabic: true, zwnj: true, zwnjTar: false, punct: true, ellip: false, digits: false,
  fmt: 'png', quality: 92, scale: 1,
  autoClean: false, cleanTol: 58, cleanGrow: 0, cleanAuto: true, cleanColor: '#FFFFFF',
  smartGuides: true, autoResume: true
};
const S = {
  pages: [], doc: [], cur: 0,
  selB: null,            // bubble id
  sel: null,             // layer object
  zoom: 1, fitZoom: 1,
  styles: {},            // tag -> style
  uploads: {},           // name -> true (data in IndexedDB)
  settings: { ...DEFAULTS },
  hist: [], future: [],
  raw: '',               // raw translator script
  rawDoc: [],            // parsed doc before alignment shift
  shift: 0,              // empty script pages prepended (image/text alignment)
  drag: null, filterLeft: false, imgNames: [], quotaWarned: false,
  tool: 'text',          // 'text' | 'clean'
  rawGhost: false,       // Hold Space or toggle Ghost Overlay of Raw reference
  rawBoxes: [],          // page index -> [{x0,y0,x1,y1,cx,cy,cw,ch,kind,rawHint:true}]
  remCode: '',           // last remote sync code
  meta: { title: '', created: Date.now() },
  file: null,            // the .mobin on disk {path, name} — Ctrl+S writes straight into it
  dir: null, dirPending: null, dirSavedAt: 0, snapTimer: 0, lastSnapSig: '',
  tour: null
};

/* ---------- IndexedDB (uploaded fonts) ---------- */
const idb = (mode, key, val) => new Promise((ok, no) => {
  let rq;
  try { rq = indexedDB.open('manhwa-studio-6', 1); } catch (e) { return ok(null); }
  rq.onupgradeneeded = () => { if (!rq.result.objectStoreNames.contains('f')) rq.result.createObjectStore('f'); };
  rq.onerror = () => ok(null);
  rq.onsuccess = () => {
    try {
      const ro = mode === 'get' || mode === 'keys';
      const st = rq.result.transaction('f', ro ? 'readonly' : 'readwrite').objectStore('f');
      const q = mode === 'get' ? st.get(key) : mode === 'put' ? st.put(val, key) : mode === 'del' ? st.delete(key) : st.getAllKeys();
      q.onsuccess = () => ok(q.result); q.onerror = () => ok(null);
    } catch (e) { ok(null); }
  };
});

/* ---------- localStorage with guards ---------- */
const LS = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); return true; } catch (e) { return false; } },
  del(k) { try { localStorage.removeItem(k); } catch (e) { } }
};

/* ---------- light / dark theme ---------- */
const THEME_KEY = 'ms.theme';
const THEME_LIST = ['macos', 'nordic', 'light', 'neon', 'paper', 'lumen'];
const THEME_LABELS = {
  macos: 'طراحی ۲: مکاواس شیشه‌ای (macOS Glass)',
  nordic: 'طراحی ۶: نوردیک قطبی (Nordic Frost)',
  light: 'حالت روشن (Snow Light)',
  neon: 'طراحی ۷: نئون ترمینال (Neon Terminal)',
  paper: 'طراحی ۸: کاغذ و جوهر (Ink & Paper)',
  lumen: 'طراحی ۹: لومن (Lumen)'
};
const THEME_SHORT = {
  macos: 'مکاواس', nordic: 'نوردیک', light: 'روشن',
  neon: 'نئون', paper: 'کاغذ', lumen: 'لومن'
};
const THEME_BG = {
  macos: '#14171D', nordic: '#242933', light: '#E9EEF5',
  neon: '#05070B', paper: '#F4EFE4', lumen: '#EEF1F9'
};
/* تم‌هایی که زمینهٔ روشن دارند: قاب پنجره هم باید روشن شود */
const THEME_LIGHT = ['light', 'paper', 'lumen'];
function curTheme() {
  const v = LS.get(THEME_KEY);
  return THEME_LIST.includes(v) ? v : 'macos';
}
function applyTheme(mode, save) {
  const m = THEME_LIST.includes(mode) ? mode : 'macos';
  const isLight = THEME_LIGHT.includes(m);
  document.documentElement.dataset.theme = m;
  if (save) LS.set(THEME_KEY, m);
  const mt = document.querySelector('meta[name=theme-color]');
  if (mt) mt.setAttribute('content', THEME_BG[m] || '#14171D');
  try { if (window.msDesktop && msDesktop.cmd) msDesktop.cmd('theme', isLight ? 'light' : 'dark').catch(() => { }); } catch (e) { }
  const nextM = THEME_LIST[(THEME_LIST.indexOf(m) + 1) % THEME_LIST.length];
  const tm = document.querySelector('#ddApp [data-cmd=theme]');
  if (tm) {
    const sp = tm.querySelector('span');
    if (sp) sp.textContent = 'تم فعلی: ' + (THEME_SHORT[m] || 'مکاواس');
    const i = tm.querySelector('svg');
    if (i && typeof I !== 'undefined') i.outerHTML = isLight ? I.moon : I.sun;
  }
  for (const s of ['#bTheme', '#bMoreTheme']) {
    const n = document.querySelector(s);
    if (n) {
      const i = n.querySelector('svg');
      if (i) i.outerHTML = isLight ? I.moon : I.sun;
      n.title = 'تغییر تم به «' + THEME_LABELS[nextM] + '»';
      const lbl = n.querySelector('i');
      if (lbl) lbl.textContent = THEME_SHORT[m] || 'مکاواس';
    }
  }
  return m;
}
function toggleTheme() {
  const cur = curTheme();
  const next = THEME_LIST[(THEME_LIST.indexOf(cur) + 1) % THEME_LIST.length];
  const res = applyTheme(next, true);
  toast(THEME_LABELS[res] + ' فعال شد', 'ok', 2600);
  return res;
}
applyTheme(curTheme(), false);

/* ============================================================
   FONTS
   ============================================================ */
const FONT_FALLBACK = '"Segoe UI","Noto Sans Arabic",Tahoma,Arial,sans-serif';
const fontReg = new Map();     // id -> {id,label,family,bold,kind}

function fontId(kind, name) { return kind + ':' + name; }
function fontInfo(id) {
  if (!id) return null;
  if (fontReg.has(id)) return fontReg.get(id);
  if (id.startsWith('s:')) return { id, label: id.slice(2), family: `"${id.slice(2).replace(/"/g, '')}"`, bold: false, kind: 's' };
  return null;
}
function cssFamily(id) {
  const f = fontInfo(id);
  return (f ? f.family + ',' : '') + FONT_FALLBACK;
}
async function registerFont(id, label, buf, naturalBold, kind) {
  const fam = 'msf' + [...id].reduce((a, c) => (a * 33 + c.charCodeAt(0)) >>> 0, 7).toString(36);
  try {
    const face = new FontFace(fam, buf, { weight: naturalBold ? '100 900' : '400', display: 'block' });
    await face.load();
    document.fonts.add(face);
    fontReg.set(id, { id, label, family: `"${fam}"`, bold: naturalBold, kind });
    fontEpoch++;
    return true;
  } catch (e) { console.warn('font fail', id, e); return false; }
}
const b64buf = s => { const bin = atob(s), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return u.buffer; };

/* the UI font is embedded once in the stylesheet; lettering reuses those bytes */
function cssFontB64(family, weight) {
  for (const sh of document.styleSheets) {
    let rules; try { rules = sh.cssRules; } catch (e) { continue; }
    for (const r of rules) {
      if (!(r instanceof CSSFontFaceRule)) continue;
      if (r.style.getPropertyValue('font-family').replace(/["']/g, '').trim() !== family) continue;
      if (String(r.style.getPropertyValue('font-weight')).trim() !== String(weight)) continue;
      const m = r.style.getPropertyValue('src').match(/base64,([A-Za-z0-9+/=]+)/);
      if (m) return m[1];
    }
  }
  return null;
}
/* one family with real regular + bold faces (no fake bold) */
async function registerFamily(f) {
  const id = fontId('b', f.k);
  const fam = 'msf' + [...id].reduce((a, c) => (a * 33 + c.charCodeAt(0)) >>> 0, 7).toString(36);
  let n = 0;
  for (const [w, d] of f.faces || []) {
    try {
      const b64 = d || (f.css && cssFontB64(f.css, w));
      if (!b64) continue;
      const face = new FontFace(fam, b64buf(b64), { weight: f.bold ? '100 900' : String(w), display: 'block' });
      await face.load(); document.fonts.add(face); n++;
    } catch (e) { console.warn('font fail', f.k, w, e); }
  }
  f.faces = null;                     // free base64
  if (n) { fontReg.set(id, { id, label: f.k, family: `"${fam}"`, bold: !!f.bold, kind: 'b', hq: true }); fontEpoch++; }
  return n > 0;
}
/* default lettering fonts: the modern ones when available */
function defFont(big) {
  const id = fontId('b', big ? 'لاله‌زار' : 'وزیرمتن');
  return fontReg.has(id) ? id : fontId('b', big ? 'کودک' : 'یکان');
}
/* ---------- script tags that name a font: "کادر ۱ (یکان): …" ---------- */
const normF = s => String(s || '').toLowerCase().replace(/ي/g, 'ی').replace(/ك/g, 'ک')
  .replace(/[\u064b-\u065f\u0670\u0640\u200c\u200d\u200e\u200f\s\-_.'"«»()]+/g, '');
const FONT_ALIAS = {
  vazir: 'وزیرمتن', vazirmatn: 'وزیرمتن', 'وزیر': 'وزیرمتن',
  yekan: 'یکان', koodak: 'کودک', kodak: 'کودک', kudak: 'کودک',
  kourosh: 'کوروش', koorosh: 'کوروش', koroush: 'کوروش', korosh: 'کوروش', kurosh: 'کوروش', 'کورش': 'کوروش',
  morvarid: 'مروارید', elham: 'الهام', moj: 'موج', mooj: 'موج', afsaneh: 'افسانه', afsane: 'افسانه',
  mehr: 'مهر', fanoos: 'فانوس', fanous: 'فانوس', fanus: 'فانوس', zangar: 'زنگار',
  dastnevis: 'دستنویس', 'دستنوشته': 'دستنویس',
  sahel: 'ساحل', shabnam: 'شبنم', estedad: 'استعداد', lalezar: 'لاله‌زار'
};
/** the font a tag names (built-in, uploaded or installed on this PC) — or null */
function fontForTag(tag) {
  const k = normF(tag);
  if (k.length < 2) return null;
  const idx = new Map();
  for (const f of fontReg.values()) if (f.kind !== 's') idx.set(normF(f.label), f.id);
  const look = key => idx.get(key) || (FONT_ALIAS[key] ? idx.get(normF(FONT_ALIAS[key])) : null) || null;
  let id = look(k);
  if (!id) for (const pre of ['فونت', 'font', 'بی', 'b', 'ب']) if (k.startsWith(pre) && k.length > pre.length + 1) { id = look(k.slice(pre.length)); if (id) break; }
  if (!id) { const t = String(tag).trim(); if (t.length >= 2 && t.length <= 40 && systemHas(t)) id = fontId('s', t); }
  return id;
}
/* styles made automatically follow the font their tag names; a font picked by hand is never touched */
function remapTagFonts() {
  const fixed = [];
  const V = fontId('b', 'وزیرمتن');
  for (const tag of Object.keys(S.styles)) {
    const st = S.styles[tag];
    const auto = st.fontAuto === true || (st.fontAuto !== false && (st.font === defFont(false) || st.font === defFont(true)));
    if (!auto) continue;
    const id = fontForTag(tag);
    if (!id || id === st.font) { if (st.fontAuto === undefined) st.fontAuto = true; continue; }
    if (st.font === V && id !== V) st.size = Math.round(st.size / .9);
    fixed.push(tag); st.font = id; st.fontAuto = true;
  }
  if (fixed.length) { LS.set('ms6.styles', JSON.stringify(S.styles)); const n = $('#iFont'); if (n) n.dataset.sig = ''; }
  return fixed;
}
/* layers placed before the tag's font was known (older versions used the default font) */
let fontFixAsked = false;
function offerFontFix(delay = 500) {
  setTimeout(async () => {
    if (fontFixAsked) return;
    if ($('#ovAsk').classList.contains('on') || $('#busy').classList.contains('on')) return offerFontFix(1200);
    const list = [];
    for (const p of S.pages) for (const L of p.layers) {
      const st = S.styles[L.tag]; if (!st || st.fontAuto === false) continue;
      const id = fontForTag(L.tag);
      if (id && L.font !== id && (L.font === defFont(false) || L.font === defFont(true))) list.push([L, id]);
    }
    if (!list.length) return;
    fontFixAsked = true;
    const tags = [...new Set(list.map(x => x[0].tag))].slice(0, 4).map(t => '«' + t + '»').join('، ');
    if (!await ask('فونت متن‌های گذاشته‌شده',
      `${faNum(list.length)} متن با فونت پیش‌فرض گذاشته شده‌اند، ولی تگشان نام فونت دیگری است (${tags}). فونت درست رویشان اعمال شود؟`,
      'اعمال کن', 'نه')) return;
    pushHist();
    for (const [L, id] of list) L.font = id;
    renderAll(); syncInspector(); autosave();
    toast(`فونت ${faNum(list.length)} متن درست شد`, 'ok');
  }, delay);
}
async function loadBuiltins() {
  for (const f of LETTER) await registerFamily(f);
  for (const f of BUILTIN) {
    if (f.a) continue;
    await registerFont(fontId('b', f.k), f.k, b64buf(f.d), !!f.b, 'b');
    f.d = null;                       // free base64
  }
  for (const f of BUILTIN) {          // aliases reuse an already-loaded face
    if (!f.a) continue;
    const src = fontReg.get(fontId('b', f.a));
    if (src) fontReg.set(fontId('b', f.k), { id: fontId('b', f.k), label: f.k, family: src.family, bold: src.bold, kind: 'b', alias: f.a });
  }
}
async function loadUploads() {
  const keys = await idb('keys') || [];
  for (const k of keys) {
    const s = String(k);
    if (!s.startsWith('font:')) continue;
    const name = s.slice(5), buf = await idb('get', s);
    if (buf && await registerFont(fontId('u', name), name, buf.slice(0), false, 'u')) S.uploads[name] = 1;
  }
}

/* ============================================================
   PERSIAN TEXT NORMALISER
   ============================================================ */
function fixText(t, o = S.settings) {
  if (!t) return '';
  t = t.replace(/\r/g, '').replace(/\ufeff/g, '');
  if (o.arabic) t = t.replace(/ي/g, 'ی').replace(/ك/g, 'ک').replace(/ﻻ/g, 'لا')
    .replace(/[أإآ]/g, m => m === 'آ' ? 'آ' : 'ا').replace(/ۀ/g, 'هٔ');
  if (o.punct) {
    t = t.replace(/\?/g, '؟').replace(/;/g, '؛');
    t = t.replace(/,/g, (m, i, s) => (/[0-9۰-۹]/.test(s[i - 1] || '') && /[0-9۰-۹]/.test(s[i + 1] || '')) ? ',' : '،');
  }
  if (o.ellip) t = t.replace(/\.{3,}/g, '…');
  if (o.zwnj) {
    t = t.replace(/(^|[\s،؛؟!.:«»"'\u200c\n(])(ن?می)\s+(?=[آ-یء])/g, '$1$2\u200c');
    t = t.replace(/([آ-ی]{2,})\s+(ها|های|هایی|هایم|هایت|هایش|هایمان|هایتان|هایشان)(?=[\s،؛؟!.…»)"'\n]|$)/g, '$1\u200c$2');
  }
  if (o.zwnjTar) t = t.replace(/([آ-ی]{3,})\s+(تر|تری|ترین)(?=[\s،؛؟!.…»)"'\n]|$)/g, '$1\u200c$2');
  t = t.replace(/[ \t]{2,}/g, ' ').replace(/ *\n */g, '\n').trim();
  if (o.digits) t = t.replace(/\d/g, d => FA[d]);
  return t;
}

/* ============================================================
   SCRIPT PARSER  — page numbers respected, nothing merged silently
   ============================================================ */
const SFX_LABELS = ['sfx', 'SFX', 'Sfx', 'افکت', 'صدا', 'صداگذاری', 'نریشن', 'راوی', 'تابلو', 'نوشته', 'متن', 'پیامک', 'اس‌ام‌اس', 'فلش‌بک', 'عنوان', 'تیتر'];
const PAGE_RE = /^[#>*\s\-–—]*(?:تصویر|عکس|صفحه|صفحه‌ی|صفحهٔ|پیج|پنل|page|Page|PAGE|PG|pg|p)\s*[:：.\-–—]?\s*([0-9۰-۹٠-٩]{1,4})\s*[:：.\-–—)\]]*\s*$/;

function parseScript(raw, o = S.settings) {
  const lines = raw.replace(/\r/g, '').replace(/\ufeff/g, '').split('\n');
  const warn = [], pages = new Map();
  let curPage = -1, seq = 0, last = null, maxPage = -1, numbered = 0, unnumbered = 0;

  /* pass 1 — collect tags that are unambiguous (line starts with "(" or "(tag):") */
  const known = new Set(), freq = new Map();
  for (const ln0 of lines) {
    const ln = ln0.replace(/^[\u200e\u200f]+/, '').trim(); if (!ln) continue;
    let m = ln.match(/^\(([^)]{1,32})\)/);
    if (m) { known.add(m[1].trim()); continue; }
    m = ln.match(/^([^()\n]{0,32}?)\(([^)]{1,32})\)\s*[:：]/);
    if (m) { known.add(m[2].trim()); continue; }
    m = ln.match(/^([^()\n]{0,32}?)\(([^)]{1,32})\)\s+\S/);
    if (m) freq.set(m[2].trim(), (freq.get(m[2].trim()) || 0) + 1);
  }
  if (!known.size) for (const [k, n] of freq) if (n >= 2) known.add(k);
  if (!known.size) for (const k of freq.keys()) known.add(k);   // last resort
  const labels = new Set(SFX_LABELS.map(x => x.toLowerCase()));

  const push = b => {
    if (curPage < 0) { curPage = 0; unnumbered++; }
    if (!pages.has(curPage)) pages.set(curPage, []);
    pages.get(curPage).push(b); last = b; maxPage = Math.max(maxPage, curPage);
  };

  lines.forEach((ln0, lineNo) => {
    const ln = ln0.replace(/^[\u200e\u200f]+/, '').trim();
    if (!ln) { last = null; return; }                      // blank line ends a bubble
    if (/^[-=_*]{3,}$/.test(ln)) { last = null; return; }  // separator

    const pm = ln.match(PAGE_RE);
    if (pm) {
      const n = parseInt(toLatin(pm[1]), 10);
      if (n >= 1 && n <= 9999) { curPage = n - 1; numbered++; }
      else { curPage = maxPage + 1; unnumbered++; }
      if (!pages.has(curPage)) pages.set(curPage, []);
      maxPage = Math.max(maxPage, curPage); last = null; seq = 0; return;
    }

    /* "(تگ): متن"  or  "گوینده (تگ): متن"  or  "گوینده (تگ) متن" */
    let m = ln.match(/^([^()\n]{0,32}?)\s*\(([^)]{1,32})\)\s*[:：]?\s*(.*)$/);
    if (m) {
      const tag = m[2].replace(/[\u200c\s]+/g, ' ').trim();
      const hasColon = /\)\s*[:：]/.test(ln);
      const atStart = ln.startsWith('(');
      const okTag = atStart || hasColon || (known.has(tag) && !/[.!?؟،؛]\s*$/.test(m[1]));
      if (okTag && tag) { push({ tag, type: m[1].trim(), raw: m[3], line: lineNo + 1 }); return; }
    }

    /* "SFX: بوم" / "نریشن: ..." */
    m = ln.match(/^([^:：()\n]{1,16})\s*[:：]\s*(.+)$/);
    if (m) {
      const lab = m[1].trim();
      if (labels.has(lab.toLowerCase()) || known.has(lab)) { push({ tag: lab, type: '', raw: m[2], line: lineNo + 1 }); return; }
    }

    /* continuation */
    if (last) { last.raw += '\n' + ln; }
    else { push({ tag: 'بدون تگ', type: '', raw: ln, line: lineNo + 1 }); warn.push({ line: lineNo + 1, msg: 'خطی بدون تگ، در بالن جداگانه گذاشته شد', t: ln }); }
  });

  /* build dense array */
  const n = maxPage + 1, doc = [];
  for (let i = 0; i < n; i++) {
    const arr = (pages.get(i) || []).map((b, k) => ({
      id: i + ':' + k, tag: b.tag, type: b.type, raw: b.raw, text: fixText(b.raw, o), line: b.line
    }));
    doc.push(arr);
  }
  /* gap warnings */
  for (let i = 0; i < n; i++) if (!pages.has(i)) warn.push({ line: 0, msg: 'صفحهٔ ' + faNum(i + 1) + ' در متن نیست (خالی ماند)', t: '' });
  return { doc, warn, numbered, unnumbered, tags: [...new Set(doc.flat().map(b => b.tag))] };
}

/* ============================================================
   MINI ZIP (store only, no dependency)
   ============================================================ */
const CRC_T = (() => { const t = new Uint32Array(256); for (let i = 0; i < 256; i++) { let c = i; for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[i] = c >>> 0; } return t; })();
function crc32(u8) { let c = 0xFFFFFFFF; for (let i = 0; i < u8.length; i++) c = CRC_T[(c ^ u8[i]) & 0xFF] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
function makeZip(files) {           // [{name, data:Uint8Array}]
  const enc = new TextEncoder(), parts = [], central = [];
  let off = 0;
  for (const f of files) {
    const nm = enc.encode(f.name), crc = crc32(f.data), sz = f.data.length;
    const lh = new DataView(new ArrayBuffer(30));
    lh.setUint32(0, 0x04034b50, true); lh.setUint16(4, 20, true); lh.setUint16(6, 0x0800, true);
    lh.setUint16(8, 0, true); lh.setUint16(10, 0, true); lh.setUint16(12, 0x21, true);
    lh.setUint32(14, crc, true); lh.setUint32(18, sz, true); lh.setUint32(22, sz, true);
    lh.setUint16(26, nm.length, true); lh.setUint16(28, 0, true);
    parts.push(new Uint8Array(lh.buffer), nm, f.data);
    const ch = new DataView(new ArrayBuffer(46));
    ch.setUint32(0, 0x02014b50, true); ch.setUint16(4, 20, true); ch.setUint16(6, 20, true);
    ch.setUint16(8, 0x0800, true); ch.setUint16(10, 0, true); ch.setUint16(12, 0, true); ch.setUint16(14, 0x21, true);
    ch.setUint32(16, crc, true); ch.setUint32(20, sz, true); ch.setUint32(24, sz, true);
    ch.setUint16(28, nm.length, true); ch.setUint32(42, off, true);
    central.push(new Uint8Array(ch.buffer), nm);
    off += 30 + nm.length + sz;
  }
  let cs = 0; for (const p of central) cs += p.length;
  const eo = new DataView(new ArrayBuffer(22));
  eo.setUint32(0, 0x06054b50, true); eo.setUint16(8, files.length, true); eo.setUint16(10, files.length, true);
  eo.setUint32(12, cs, true); eo.setUint32(16, off, true);
  return new Blob([...parts, ...central, new Uint8Array(eo.buffer)], { type: 'application/zip' });
}

/* ============================================================
   TAG STYLES
   ============================================================ */
const PALETTE = ['#5E9FE8', '#EAC26B', '#72BC8F', '#BF8EDA', '#DE9255', '#DF84A8', '#4FB9C9', '#E97366'];
const tagHue = t => PALETTE[Math.abs([...t].reduce((a, c) => a * 31 + c.charCodeAt(0), 0)) % PALETTE.length];

function baseSize() {
  const w = S.pages.length ? S.pages[clamp(S.cur, 0, S.pages.length - 1)].w : 900;
  return clamp(Math.round(w / 1000 * 27), 13, 90);
}
function style(tag) {
  if (!S.styles[tag]) {
    const big = /فریاد|داد|جیغ|عصبانی|SFX|sfx|افکت|صدا/i.test(tag);
    const font = fontForTag(tag) || defFont(big);
    S.styles[tag] = {
      font, fontAuto: true,
      /* the modern text fonts look bigger than B Yekan at the same size */
      size: Math.round(baseSize() * (big ? 1.25 : 1) * (font === fontId('b', 'وزیرمتن') ? .9 : 1)),
      color: '#111111', stroke: big ? 4 : 0, strokeColor: '#FFFFFF',
      shadow: 0, shadowColor: '#000000',
      bold: false, italic: false, lh: 1.32
    };
  }
  return S.styles[tag];
}

/* ============================================================
   TEXT LAYOUT + DRAW
   ============================================================ */
const measCv = document.createElement('canvas').getContext('2d');
function setFont(c, L, k = 1) {
  c.font = `${L.italic ? 'italic ' : ''}${L.bold ? 'bold ' : ''}${Math.max(1, L.size) * k}px ${cssFamily(L.font)}`;
  c.direction = 'rtl'; c.textAlign = 'center'; c.textBaseline = 'middle';
}
function wrapLines(c, text, maxW) {
  const out = [];
  for (const para of String(text).split('\n')) {
    if (!para) { out.push(''); continue; }
    let line = '';
    for (const word of para.split(' ')) {
      const t = line ? line + ' ' + word : word;
      if (line && c.measureText(t).width > maxW) { out.push(line); line = word; }
      else line = t;
    }
    out.push(line);
  }
  return out;
}
function layout(L) {
  /* when Windows paints jagged text it also rounds every letter width to whole pixels;
     measuring 8× larger gives the true widths (the same as on other PCs and as painted) */
  const k = sysAA === false ? 8 : 1;
  setFont(measCv, L, k);
  let lines = wrapLines(measCv, L.t, L.w * k);
  /* balance: shrink the box while the line count stays the same -> nicer shape */
  const n = lines.length;
  if (n > 1) for (let w = L.w * .94; w > L.w * .45; w *= .94) {
    const m = wrapLines(measCv, L.t, w * k);
    if (m.length === n) lines = m; else break;
  }
  const lh = L.size * (L.lh || 1.32);
  const ws = lines.map(s => measCv.measureText(s).width / k);
  let maxW = 0;
  for (const v of ws) if (v > maxW) maxW = v;
  return { lines, lh, h: lines.length * lh, w: maxW, ws };
}
/* the glyphs of one layer, origin = layer centre; k = scale of sizes/positions */
function paintText(c, L, m, k = 1) {
  setFont(c, L, k);
  c.lineJoin = 'round'; c.miterLimit = 2;
  m.lines.forEach((t, i) => {
    const y = (i - (m.lines.length - 1) / 2) * m.lh * k;
    if (L.shadow > 0) {
      c.save();
      c.shadowColor = L.shadowColor || '#000000';
      c.shadowBlur = L.shadow * 1.5 * k;
      c.shadowOffsetX = 0; c.shadowOffsetY = Math.round(L.shadow * 0.25 * k);
      c.fillStyle = L.shadowColor || '#000000';
      c.fillText(t, 0, y);
      c.restore();
    }
    if (L.stroke > 0) { c.strokeStyle = L.strokeColor; c.lineWidth = L.stroke * 2 * k; c.strokeText(t, 0, y); }
    c.fillStyle = L.color; c.fillText(t, 0, y);
  });
}

/* ============================================================
   SMOOTH LETTERING
   When Windows "Smooth edges of screen fonts" is off (performance
   settings, Remote Desktop, many virtual machines) Chromium paints every
   glyph with hard black/white pixels and the lettering came out jagged.
   Text layers are then painted several times larger on a scratch canvas
   and averaged down in exact 2×2 steps: clean, smooth edges whatever the
   Windows settings are. Exports always use it, so a page looks the same
   on every PC; the editor only when this PC paints jagged text.
   ============================================================ */
let sysAA = null;                          // does this PC anti-alias canvas text? (null = not tested yet)
let fontEpoch = 0;                         // bumps when fonts arrive -> cached text bitmaps are redrawn
function probeAA() {
  let aa = true;
  try {
    const c = document.createElement('canvas'); c.width = 96; c.height = 40;
    const x = c.getContext('2d', { willReadFrequently: true });
    x.font = `22px ${cssFamily(defFont(false))}`; x.fillStyle = '#000';
    x.direction = 'rtl'; x.textBaseline = 'middle';
    x.fillText('سلام ببین', 92, 20);
    const d = x.getImageData(0, 0, 96, 40).data;
    let ink = 0, mid = 0;
    for (let i = 3; i < d.length; i += 4) { if (d[i]) ink++; if (d[i] > 20 && d[i] < 235) mid++; }
    aa = !ink || mid * 8 > ink;            // jagged text has (almost) no in-between pixels
  } catch (e) { }
  const changed = sysAA !== null && sysAA !== aa;
  sysAA = aa;
  if (changed) { dropTextCache(); renderAll(); }
  return aa;
}
/* how many times larger the glyphs are painted (power of two). em = glyph size in output pixels */
function ssFactor(em, forExport) {
  if (sysAA === false) return forExport && em < 56 ? 8 : 4;
  return forExport ? (em < 40 ? 4 : 2) : 1;
}
const SS_MAX_PX = 24e6, SS_MAX_SIDE = 8192;
/* layer-space box that surely holds every painted pixel (glyphs measured at the size really drawn) */
function inkBox(L, m, k, unit) {
  setFont(measCv, L, k);
  let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
  m.lines.forEach((t, i) => {
    if (!t.trim()) return;
    const y = (i - (m.lines.length - 1) / 2) * m.lh, q = measCv.measureText(t);
    x0 = Math.min(x0, -q.actualBoundingBoxLeft / k); x1 = Math.max(x1, q.actualBoundingBoxRight / k);
    y0 = Math.min(y0, y - q.actualBoundingBoxAscent / k); y1 = Math.max(y1, y + q.actualBoundingBoxDescent / k);
  });
  if (!(x1 > x0 && y1 > y0)) return null;
  const pad = Math.max(0, L.stroke || 0) + Math.max(0, (L.shadow || 0) * 1.8) + L.size * .12 + 2 * unit, sk = L.italic ? L.size * .3 : 0;
  return { x0: x0 - pad - sk, x1: x1 + pad + sk, y0: y0 - pad, y1: y1 + pad };
}
/* A = layer space -> output pixels (linear part). Returns {cv, x, y}: bitmap + offset from the layer origin */
function textBitmap(L, m, A, s) {
  const sc = Math.sqrt(Math.abs(A.a * A.d - A.b * A.c)) || 1;
  let rx, ry, w, h;
  for (; ;) {                              // measured at the size really drawn (s× larger)
    const bx = inkBox(L, m, s, 1 / sc); if (!bx) return null;
    const px = [], py = [];
    for (const [u, v] of [[bx.x0, bx.y0], [bx.x1, bx.y0], [bx.x0, bx.y1], [bx.x1, bx.y1]]) {
      px.push(A.a * u + A.c * v); py.push(A.b * u + A.d * v);
    }
    rx = Math.floor(Math.min(...px)) - 1; ry = Math.floor(Math.min(...py)) - 1;
    w = Math.ceil(Math.max(...px)) + 1 - rx; h = Math.ceil(Math.max(...py)) + 1 - ry;
    if (s > 1 && (w * h * s * s > SS_MAX_PX || Math.max(w, h) * s > SS_MAX_SIDE)) { s /= 2; continue; }
    break;
  }
  if (s <= 1 || w < 1 || h < 1) return null;
  let cv = document.createElement('canvas'); cv.width = w * s; cv.height = h * s;
  const x = cv.getContext('2d');
  /* glyphs are drawn s× bigger with a real font size (not a scale transform), so letter spacing
     is not rounded to whole pixels of the small size — joins of Persian letters stay seamless */
  x.setTransform(A.a, A.b, A.c, A.d, -rx * s, -ry * s);
  paintText(x, L, m, s);
  return { cv: shrink(cv, s), x: rx, y: ry, px: w * h };
}
/* s× smaller (s = power of two); each step is an exact average of 2×2 pixels */
function shrink(cv, s) {
  for (let k = s; k > 1; k /= 2) {
    const d = document.createElement('canvas'); d.width = cv.width / 2; d.height = cv.height / 2;
    const y = d.getContext('2d');
    y.imageSmoothingEnabled = true; y.imageSmoothingQuality = 'low';
    y.drawImage(cv, 0, 0, d.width, d.height);
    cv.width = cv.height = 0; cv = d;
  }
  return cv;
}
/* plain fillText (uses x's font, colour, alignment), smooth even when Windows paints jagged text */
function fillTextSmooth(x, txt, cx, cy, k = 4) {
  if (sysAA !== false) return x.fillText(txt, cx, cy);
  const q = x.measureText(txt);
  const l = Math.floor(cx - q.actualBoundingBoxLeft) - 2, t = Math.floor(cy - q.actualBoundingBoxAscent) - 2;
  const w = Math.ceil(cx + q.actualBoundingBoxRight) + 2 - l, h = Math.ceil(cy + q.actualBoundingBoxDescent) + 2 - t;
  if (!(w > 0 && h > 0)) return;
  const cv = document.createElement('canvas'); cv.width = w * k; cv.height = h * k;
  const y = cv.getContext('2d');
  y.font = x.font.replace(/(\d+(?:\.\d+)?)px/, (_, n) => (n * k) + 'px');
  y.fillStyle = x.fillStyle; y.textAlign = x.textAlign; y.textBaseline = x.textBaseline; y.direction = x.direction;
  y.fillText(txt, (cx - l) * k, (cy - t) * k);
  const sm = shrink(cv, k);
  x.drawImage(sm, l, t);
  sm.width = sm.height = 0;
}
/* editor bitmaps: moving a layer reuses its bitmap; least recently used ones are dropped */
const TXT_CACHE_PX = 30e6;
let txtCache = new Map(), txtCachePx = 0;
function dropTextCache() {
  for (const e of txtCache.values()) e.cv.width = e.cv.height = 0;
  txtCache = new Map(); txtCachePx = 0;
}
function cachedText(L, key) {
  const e = txtCache.get(L);
  if (!e || e.k !== key) return null;
  txtCache.delete(L); txtCache.set(L, e);
  return e;
}
function keepText(L, e) {
  const old = txtCache.get(L);
  if (old) { txtCache.delete(L); txtCachePx -= old.px; if (old.cv !== e.cv) old.cv.width = old.cv.height = 0; }
  txtCache.set(L, e); txtCachePx += e.px;
  for (const [k, v] of txtCache) {
    if (txtCachePx <= TXT_CACHE_PX || v === e) break;
    txtCache.delete(k); txtCachePx -= v.px; v.cv.width = v.cv.height = 0;
  }
}
/* paints the layer smoothly through a bitmap; false = not needed here (caller paints directly) */
function smoothText(c, L, m, forExport) {
  const M = c.getTransform(), r = (L.rot || 0) * Math.PI / 180, cs = Math.cos(r), sn = Math.sin(r);
  const A = { a: M.a * cs + M.c * sn, b: M.b * cs + M.d * sn, c: M.c * cs - M.a * sn, d: M.d * cs - M.b * sn };
  const em = L.size * Math.sqrt(Math.abs(A.a * A.d - A.b * A.c));
  const s = ssFactor(em, forExport);
  if (s <= 1) return false;
  let bm = null;
  if (forExport) bm = textBitmap(L, m, A, s);
  else {
    const key = [L.t, L.font, L.size, L.lh, L.w, L.bold, L.italic, L.color, L.stroke, L.strokeColor, L.shadow || 0, L.shadowColor || '', s, fontEpoch,
      A.a.toFixed(5), A.b.toFixed(5), A.c.toFixed(5), A.d.toFixed(5)].join('\u0001');
    bm = cachedText(L, key);
    if (!bm) { bm = textBitmap(L, m, A, s); if (bm) { bm.k = key; keepText(L, bm); } }
  }
  if (!bm) return false;
  const ox = Math.round(M.a * L.x + M.c * L.y + M.e), oy = Math.round(M.b * L.x + M.d * L.y + M.f);
  c.save();
  c.setTransform(1, 0, 0, 1, 0, 0); c.imageSmoothingEnabled = false;
  c.drawImage(bm.cv, ox + bm.x, oy + bm.y);
  c.restore();
  if (forExport) bm.cv.width = bm.cv.height = 0;
  return true;
}

function drawLayer(c, L, selected, forExport) {
  const m = layout(L);
  const smooth = !!(m.lines.length && smoothText(c, L, m, forExport));
  c.save();
  c.translate(L.x, L.y);
  if (L.rot) c.rotate(L.rot * Math.PI / 180);
  if (!smooth) paintText(c, L, m);
  if (selected) {
    const hw = L.w / 2 + 7, hh = m.h / 2 + 7, k = 1 / (S.zoom || 1);
    c.lineWidth = 1.6 * k; c.setLineDash([]);
    c.strokeStyle = 'rgba(10,12,14,.55)'; c.strokeRect(-hw - k, -hh - k, (hw + k) * 2, (hh + k) * 2);
    c.strokeStyle = '#FF7A3D'; c.strokeRect(-hw, -hh, hw * 2, hh * 2);
    const s = 5 * k;
    c.fillStyle = '#FF7A3D';
    for (const hx of [-hw, hw]) { c.fillRect(hx - s, -s, s * 2, s * 2); }
    c.strokeStyle = 'rgba(255,255,255,.9)'; c.lineWidth = 1 * k;
    for (const hx of [-hw, hw]) { c.strokeRect(hx - s, -s, s * 2, s * 2); }
  }
  if (L.draft) {                       /* 8.5.0 — پیش‌نویس دستیار: کادر خط‌چین نارنجی */
    const hw = L.w / 2 + 6, hh = m.h / 2 + 6, k = 1 / (S.zoom || 1);
    c.lineWidth = 1.8 * k; c.setLineDash([7 * k, 5 * k]);
    c.strokeStyle = 'rgba(255,159,26,.95)';
    c.strokeRect(-hw, -hh, hw * 2, hh * 2);
  }
  c.restore();
  return m;
}
/* The page canvases are drawn at the real screen resolution
   (zoom × Windows display scale), so lettering stays sharp at 125 % / 150 %
   scaling and when zoomed in. Pages far from the view stay small to save
   memory. Exports never use these canvases — flatten() draws at image size
   (or 2× / 3× of it when a larger export is chosen). */
function render(i = S.cur) {
  const p = S.pages[i]; if (!p || !p.cx) return;
  const W = p.bw || p.w, H = p.bh || p.h, c = p.cx;
  if (p.cv.width !== W || p.cv.height !== H) { p.cv.width = W; p.cv.height = H; }
  c.setTransform(1, 0, 0, 1, 0, 0);
  c.clearRect(0, 0, W, H);
  c.setTransform(W / p.w, 0, 0, H / p.h, 0, 0);
  c.imageSmoothingEnabled = true; c.imageSmoothingQuality = W < p.w ? 'high' : 'medium';
  c.drawImage(p.img, 0, 0, p.w, p.h);
  const cc = cleanCanvas(i); if (cc) c.drawImage(cc, 0, 0, p.w, p.h);
  if (S.rawGhost && p.rawImg) {
    c.save(); c.globalAlpha = 0.58; c.drawImage(p.rawImg, 0, 0, p.w, p.h); c.restore();
  }
  if ((S.rawGhost || (S.pages[i] && S.pages[i].rawBoxes && S.pages[i].rawBoxes.length)) && i === S.cur) {
    const rbs = S.pages[i].rawBoxes || [];
    if (rbs.length) {
      const k = 1 / (S.zoom || 1);
      c.save();
      c.lineWidth = 1.8 * k; c.setLineDash([6 * k, 5 * k]);
      for (const rb of rbs) {
        c.strokeStyle = S.rawGhost ? '#38BDF8' : 'rgba(56,189,248,.48)';
        c.strokeRect(rb.x0, rb.y0, rb.x1 - rb.x0, rb.y1 - rb.y0);
      }
      c.restore();
    }
  }
  const sel = i === S.cur ? S.sel : null;
  for (const L of p.layers) drawLayer(c, L, L === sel);
  if (i === S.cur && S.guides && S.drag) drawGuidesExtras(c, i);
  if (i === S.cur && S.aiPreview) drawAiPreviewExtras(c, i);
  if (i === S.cur) drawTarget(c, i);
  if (i === S.cur && S.drag && S.drag.mode === 'drawbox' && S.drag.moved) {
    const k = 1 / (S.zoom || 1), x0 = Math.min(S.drag.o.x, S.drag.cur.x), y0 = Math.min(S.drag.o.y, S.drag.cur.y);
    const w = Math.abs(S.drag.cur.x - S.drag.o.x), h = Math.abs(S.drag.cur.y - S.drag.o.y);
    c.save();
    c.fillStyle = 'rgba(255,122,61,.14)'; c.fillRect(x0, y0, w, h);
    c.lineWidth = 2.2 * k; c.setLineDash([7 * k, 5 * k]); c.strokeStyle = '#FF7A3D'; c.strokeRect(x0, y0, w, h);
    c.restore();
  }
  if (S.flash && p.layers.includes(S.flash.L)) {
    const L = S.flash.L, m = layout(L), t = (performance.now() - S.flash.t) / 1100, k = 1 / (S.zoom || 1);
    const a = Math.max(0, 1 - t), grow = 10 + 26 * t;
    c.save(); c.translate(L.x, L.y); if (L.rot) c.rotate(L.rot * Math.PI / 180);
    c.lineWidth = (3 + 3 * a) * k; c.strokeStyle = `rgba(255,122,61,${a.toFixed(3)})`;
    c.strokeRect(-L.w / 2 - grow * k, -m.h / 2 - grow * k, L.w + 2 * grow * k, m.h + 2 * grow * k);
    c.fillStyle = `rgba(255,122,61,${(a * .12).toFixed(3)})`;
    c.fillRect(-L.w / 2 - 8 * k, -m.h / 2 - 8 * k, L.w + 16 * k, m.h + 16 * k);
    c.restore();
  }
}
const SHARP_MAX_PX = 16e6;            // per canvas (≈64 MB)
(function watchDisplayScale() {       // window moved to a monitor with another scale
  try {
    matchMedia(`(resolution: ${window.devicePixelRatio || 1}dppx)`)
      .addEventListener('change', () => { sharpenSoon(60); watchDisplayScale(); }, { once: true });
  } catch (e) { }
})();
let sharpT = 0;
function sharpenSoon(ms = 150) { clearTimeout(sharpT); sharpT = setTimeout(sharpen, ms); }
function sharpen() {
  if (!S.pages.length) return;
  if (S.drag) return sharpenSoon(250);
  const st = $('#stage'); if (!st) return;
  const sr = st.getBoundingClientRect(), pad = Math.max(400, sr.height);
  const dpr = Math.max(.5, Math.min(4, window.devicePixelRatio || 1));
  const lowMem = !!window.MOBIN_ANDROID || document.body.classList.contains('mob'), maxPx = lowMem ? 10e6 : SHARP_MAX_PX;
  const spMob = isSinglePageMob();
  S.pages.forEach((p, i) => {
    if (!p.cv || !p.img) return;
    if (spMob && i !== S.cur) {
      if (p.cv.width > 1 || p.cv.height > 1) { p.cv.width = 1; p.cv.height = 1; p.bw = 1; p.bh = 1; }
      return;
    }
    const r = p.cv.getBoundingClientRect();
    if (!r.width || !r.height) return;
    const near = r.bottom > sr.top - pad && r.top < sr.bottom + pad;
    let W = Math.round(r.width * dpr), H = Math.round(r.height * dpr);
    if (!near) {
      if (lowMem) { W = Math.round(r.width); H = Math.round(r.height); }
      W = Math.min(W, p.w); H = Math.min(H, p.h);
    }
    if (W * H > maxPx) { const f = Math.sqrt(maxPx / (W * H)); W = Math.floor(W * f); H = Math.floor(H * f); }
    W = Math.max(1, W); H = Math.max(1, H);
    if (W !== (p.bw || p.w) || H !== (p.bh || p.h)) { p.bw = W; p.bh = H; render(i); }
  });
}
const renderAll = () => S.pages.forEach((_, i) => render(i));

/* ============================================================
   ZOOM
   ============================================================ */
function applyZoom(anchor) {
  const st = $('#stage');
  /* the spot under the anchor (a screen point) stays under it. Measured on the
     page itself, so right-to-left scrolling and centring cannot throw it off. */
  let keep = null;
  if (anchor) {
    let pg = null, best = 1e9;
    for (const q of S.pages) {
      if (!q.cv) continue;
      const r = q.cv.getBoundingClientRect();
      const d = anchor.y < r.top ? r.top - anchor.y : anchor.y > r.bottom ? anchor.y - r.bottom : 0;
      if (d < best) { best = d; pg = q; if (!d) break; }
    }
    const r = pg && pg.cv.getBoundingClientRect();
    if (r && r.width && r.height) keep = { pg, fx: (anchor.x - r.left) / r.width, fy: (anchor.y - r.top) / r.height };
  }
  for (const p of S.pages) if (p.cv) { p.cv.style.width = Math.round(p.w * S.zoom) + 'px'; p.cv.style.height = Math.round(p.h * S.zoom) + 'px'; }
  $('#zVal').textContent = faNum(Math.round(S.zoom * 100)) + '٪';
  if (keep) {
    const r = keep.pg.cv.getBoundingClientRect();
    st.style.scrollBehavior = 'auto';
    st.scrollLeft += r.left + keep.fx * r.width - anchor.x;
    st.scrollTop += r.top + keep.fy * r.height - anchor.y;
    st.style.scrollBehavior = '';
  }
  S.lastZoom = S.zoom;
  updateStatus();
  sharpenSoon();
}
function setZoom(z, anchor) { S.zoom = clamp(z, .05, 4); applyZoom(anchor); }
/* zoom buttons / keys: around the middle of what is on screen */
function stageMid() { const r = $('#stage').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }
function fitZoom() {
  if (!S.pages.length) return;
  const avail = $('#stage').clientWidth - (document.body.classList.contains('mob') ? 12 : 48);
  const w = Math.max(...S.pages.map(p => p.w));
  S.fitZoom = clamp(avail / w, .05, 1.5);
  setZoom(S.fitZoom);
}

/* ============================================================
   BUBBLE DETECTION  (bounded flood fill)
   ============================================================ */
const PIXCACHE = new Map();            // page index -> ImageData.data
function pixels(i) {
  if (PIXCACHE.has(i)) return PIXCACHE.get(i);
  const p = S.pages[i];
  if (!p || p.w * p.h > 60e6) return null;
  let d = null;
  try {
    const t = document.createElement('canvas'); t.width = p.w; t.height = p.h;
    const c = t.getContext('2d', { willReadFrequently: true });
    c.drawImage(p.img, 0, 0);
    d = c.getImageData(0, 0, p.w, p.h).data;
    t.width = t.height = 0;
  } catch (e) { return null; }
  PIXCACHE.set(i, d);
  while (PIXCACHE.size > 2) PIXCACHE.delete(PIXCACHE.keys().next().value);
  return d;
}
/* ============================================================
   BALLOON FINDER — whole page, no clicks needed
   Light (white-ish) closed regions -> balloons / boxes, in reading order.
   Works on min-pooled blocks so thin outlines stay closed.
   ============================================================ */
function balBlocks(d, W, H) {
  const f = Math.max(1, Math.round(W / 360));
  const w = Math.ceil(W / f), h = Math.ceil(H / f), n = w * h;
  const mn = new Uint8Array(n).fill(255), mx = new Uint8Array(n), cm = new Uint8Array(n);
  /* mean colour of each block too (flat-colour boxes: chat messages, coloured captions) */
  const cr = new Uint8Array(n), cg = new Uint8Array(n), cb = new Uint8Array(n);
  const sr = new Uint32Array(w), sg = new Uint32Array(w), sb = new Uint32Array(w), sn = new Uint32Array(w);
  for (let y = 0; y < H; y++) {
    const by = (y / f) | 0, row = by * w;
    let k = y * W * 4;
    for (let x = 0; x < W; x++, k += 4) {
      const r = d[k], g = d[k + 1], b = d[k + 2], op = d[k + 3] >= 128;
      let l = (r * 77 + g * 150 + b * 29) >> 8;
      if (!op) l = 0;
      const hi = r > g ? (r > b ? r : b) : (g > b ? g : b), lo = r < g ? (r < b ? r : b) : (g < b ? g : b);
      const bx = (x / f) | 0, i = row + bx;
      if (l < mn[i]) mn[i] = l;
      if (l > mx[i]) mx[i] = l;
      if (hi - lo > cm[i]) cm[i] = hi - lo;
      if (op) { sr[bx] += r; sg[bx] += g; sb[bx] += b; }
      sn[bx]++;
    }
    if ((y + 1) % f === 0 || y === H - 1) {
      for (let bx = 0; bx < w; bx++) { const c = sn[bx]; if (c) { cr[row + bx] = sr[bx] / c; cg[row + bx] = sg[bx] / c; cb[row + bx] = sb[bx] / c; } }
      sr.fill(0); sg.fill(0); sb.fill(0); sn.fill(0);
    }
  }
  return { f, w, h, mn, mx, cm, cr, cg, cb };
}
/* 4-connected components of mask m (Uint8Array) -> labels + stats */
function balLabel(m, w, h) {
  const lab = new Int32Array(w * h), q = new Int32Array(w * h), st = [null];
  let id = 0;
  for (let s = 0; s < w * h; s++) {
    if (!m[s] || lab[s]) continue;
    id++;
    let qh = 0, qt = 0, n = 0, x0 = w, x1 = -1, y0 = h, y1 = -1;
    q[qt++] = s; lab[s] = id;
    while (qh < qt) {
      const i = q[qh++], x = i % w, y = (i - x) / w;
      n++;
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
      if (x > 0 && m[i - 1] && !lab[i - 1]) { lab[i - 1] = id; q[qt++] = i - 1; }
      if (x < w - 1 && m[i + 1] && !lab[i + 1]) { lab[i + 1] = id; q[qt++] = i + 1; }
      if (y > 0 && m[i - w] && !lab[i - w]) { lab[i - w] = id; q[qt++] = i - w; }
      if (y < h - 1 && m[i + w] && !lab[i + w]) { lab[i + w] = id; q[qt++] = i + w; }
    }
    st.push({ id, n, x0, x1, y0, y1 });
  }
  return { lab, st };
}
/* region mask inside its box (+1 pad), holes filled (left-over lettering, dots) */
function balFilled(lab, w, c) {
  const bw = c.x1 - c.x0 + 3, bh = c.y1 - c.y0 + 3, m = new Uint8Array(bw * bh);
  for (let y = c.y0; y <= c.y1; y++) for (let x = c.x0; x <= c.x1; x++) if (lab[y * w + x] === c.id) m[(y - c.y0 + 1) * bw + (x - c.x0 + 1)] = 1;
  /* outside = reachable from the padding without crossing the region */
  const out = new Uint8Array(bw * bh), q = new Int32Array(bw * bh);
  let qh = 0, qt = 0;
  out[0] = 1; q[qt++] = 0;
  while (qh < qt) {
    const i = q[qh++], x = i % bw;
    const nb = [x > 0 ? i - 1 : -1, x < bw - 1 ? i + 1 : -1, i - bw, i + bw];
    for (const j of nb) if (j >= 0 && j < bw * bh && !out[j] && !m[j]) { out[j] = 1; q[qt++] = j; }
  }
  let holes = 0;
  for (let i = 0; i < bw * bh; i++) if (!m[i] && !out[i]) { m[i] = 2; holes++; }
  return { m, bw, bh, holes };
}
/* shape numbers of a filled mask: concavity per row / column, total variation of the outline */
function balShape(F) {
  const { m, bw, bh } = F;
  let tvx = 0, tvy = 0, multiR = 0, rows = 0, multiC = 0, cols = 0, pl = -1, pr = -1;
  for (let y = 0; y < bh; y++) {
    let l = -1, r = -1, runs = 0, inr = false;
    for (let x = 0; x < bw; x++) { const v = m[y * bw + x]; if (v) { if (l < 0) l = x; r = x; if (!inr) { runs++; inr = true; } } else inr = false; }
    if (l < 0) continue;
    rows++; if (runs > 1) multiR++;
    if (pl >= 0) tvx += Math.abs(l - pl) + Math.abs(r - pr); else tvx += 0;
    pl = l; pr = r;
  }
  pl = -1; pr = -1;
  for (let x = 0; x < bw; x++) {
    let t = -1, b = -1, runs = 0, inr = false;
    for (let y = 0; y < bh; y++) { const v = m[y * bw + x]; if (v) { if (t < 0) t = y; b = y; if (!inr) { runs++; inr = true; } } else inr = false; }
    if (t < 0) continue;
    cols++; if (runs > 1) multiC++;
    if (pl >= 0) tvy += Math.abs(t - pl) + Math.abs(b - pr);
    pl = t; pr = b;
  }
  /* how much of the outline lies on its bounding box: rectangles ~1 even with a few notches, ovals low */
  let L0 = bw, R0 = -1, T0 = bh, B0 = -1;
  for (let y = 0; y < bh; y++) for (let x = 0; x < bw; x++) if (m[y * bw + x]) { if (x < L0) L0 = x; if (x > R0) R0 = x; if (y < T0) T0 = y; if (y > B0) B0 = y; }
  const tol = Math.max(1, Math.round(Math.min(R0 - L0, B0 - T0) * .03));
  let rOn = 0, cOn = 0;
  for (let y = T0; y <= B0; y++) { let l = -1, r = -1; for (let x = L0; x <= R0; x++) if (m[y * bw + x]) { if (l < 0) l = x; r = x; } if (l >= 0 && l <= L0 + tol && r >= R0 - tol) rOn++; }
  for (let x = L0; x <= R0; x++) { let t = -1, b = -1; for (let y = T0; y <= B0; y++) if (m[y * bw + x]) { if (t < 0) t = y; b = y; } if (t >= 0 && t <= T0 + tol && b >= B0 - tol) cOn++; }
  return { tvx, tvy, mr: rows ? multiR / rows : 1, mc: cols ? multiC / cols : 1, rOn: rOn / Math.max(1, B0 - T0 + 1), cOn: cOn / Math.max(1, R0 - L0 + 1) };
}
/* biggest inscribed circle (chamfer distance) -> core centre + chords through it */
function balCore(F) {
  const { m, bw, bh } = F, D = new Float32Array(bw * bh);
  const BIG = 1e9;
  for (let i = 0; i < bw * bh; i++) D[i] = m[i] ? BIG : 0;
  const A = 1, B = 1.4142;
  for (let y = 0; y < bh; y++) for (let x = 0; x < bw; x++) {
    const i = y * bw + x; if (!D[i]) continue;
    let v = D[i];
    if (x > 0) v = Math.min(v, D[i - 1] + A);
    if (y > 0) { v = Math.min(v, D[i - bw] + A); if (x > 0) v = Math.min(v, D[i - bw - 1] + B); if (x < bw - 1) v = Math.min(v, D[i - bw + 1] + B); }
    D[i] = v;
  }
  let best = -1, bi = 0;
  for (let y = bh - 1; y >= 0; y--) for (let x = bw - 1; x >= 0; x--) {
    const i = y * bw + x; if (!D[i]) continue;
    let v = D[i];
    if (x < bw - 1) v = Math.min(v, D[i + 1] + A);
    if (y < bh - 1) { v = Math.min(v, D[i + bw] + A); if (x < bw - 1) v = Math.min(v, D[i + bw + 1] + B); if (x > 0) v = Math.min(v, D[i + bw - 1] + B); }
    D[i] = v;
  }
  for (let i = 0; i < bw * bh; i++) if (D[i] > best) { best = D[i]; bi = i; }
  /* centre of the "core" (all points nearly as deep as the deepest) — steadier than one pixel */
  let sx = 0, sy = 0, sn = 0;
  const thr = best * .8;
  for (let i = 0; i < bw * bh; i++) if (D[i] >= thr) { const x = i % bw; sx += x; sy += (i - x) / bw; sn++; }
  let cx = Math.round(sx / sn), cy = Math.round(sy / sn);
  if (!m[cy * bw + cx]) { cx = bi % bw; cy = (bi - cx) / bw; }
  let l = cx, r = cx, t = cy, b = cy;
  while (l > 0 && m[cy * bw + l - 1]) l--;
  while (r < bw - 1 && m[cy * bw + r + 1]) r++;
  while (t > 0 && m[(t - 1) * bw + cx]) t--;
  while (b < bh - 1 && m[(b + 1) * bw + cx]) b++;
  return { cx, cy, rad: best, cw: r - l + 1, ch: b - t + 1, cl: l, ct: t, D };
}

/* the deep part of a region (far from its outline): spikes, hair and tails drop away */
function balCoreShape(F, C, k) {
  const { bw, bh } = F, D = C.D, thr = C.rad * k;
  const cm = new Uint8Array(bw * bh);
  let n = 0, x0 = bw, x1 = -1, y0 = bh, y1 = -1;
  for (let i = 0; i < bw * bh; i++) if (D[i] >= thr) { cm[i] = 1; n++; const x = i % bw, y = (i - x) / bw; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  if (!n) return { n: 0, parts: 0, fill: 0, mr: 1, mc: 1 };
  const total = n;
  /* pieces */
  const seen = new Uint8Array(bw * bh), q = new Int32Array(n + 4);
  let parts = 0, bigPart = 0;
  for (let s = 0; s < bw * bh; s++) {
    if (!cm[s] || seen[s]) continue;
    parts++; let qh = 0, qt = 0, cnt = 0; q[qt++] = s; seen[s] = 1;
    while (qh < qt) { const i = q[qh++], x = i % bw; cnt++;
      for (const j of [x > 0 ? i - 1 : -1, x < bw - 1 ? i + 1 : -1, i - bw, i + bw]) if (j >= 0 && j < bw * bh && cm[j] && !seen[j]) { seen[j] = 1; q[qt++] = j; } }
    if (cnt > bigPart) bigPart = cnt;
  }
  if (parts > 1) {                     /* keep only the biggest piece */
    const keep = new Uint8Array(bw * bh); let best = -1, bs = -1;
    seen.fill(0);
    for (let s = 0; s < bw * bh; s++) {
      if (!cm[s] || seen[s]) continue;
      let qh = 0, qt = 0; q[qt++] = s; seen[s] = 1;
      while (qh < qt) { const i = q[qh++], x = i % bw; for (const j of [x > 0 ? i - 1 : -1, x < bw - 1 ? i + 1 : -1, i - bw, i + bw]) if (j >= 0 && j < bw * bh && cm[j] && !seen[j]) { seen[j] = 1; q[qt++] = j; } }
      if (qt > best) { best = qt; bs = s; }
    }
    let qh = 0, qt = 0; q[qt++] = bs; keep[bs] = 1;
    while (qh < qt) { const i = q[qh++], x = i % bw; for (const j of [x > 0 ? i - 1 : -1, x < bw - 1 ? i + 1 : -1, i - bw, i + bw]) if (j >= 0 && j < bw * bh && cm[j] && !keep[j]) { keep[j] = 1; q[qt++] = j; } }
    cm.set(keep); x0 = bw; x1 = -1; y0 = bh; y1 = -1;
    for (let i = 0; i < bw * bh; i++) if (cm[i]) { const x = i % bw, y = (i - x) / bw; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    n = best;
  }
  let mr = 0, rows = 0, mc = 0, cols = 0;
  for (let y = y0; y <= y1; y++) { let runs = 0, inr = false, any = false; for (let x = x0; x <= x1; x++) { if (cm[y * bw + x]) { any = true; if (!inr) { runs++; inr = true; } } else inr = false; } if (any) { rows++; if (runs > 1) mr++; } }
  for (let x = x0; x <= x1; x++) { let runs = 0, inr = false, any = false; for (let y = y0; y <= y1; y++) { if (cm[y * bw + x]) { any = true; if (!inr) { runs++; inr = true; } } else inr = false; } if (any) { cols++; if (runs > 1) mc++; } }
  return { n, parts, big: bigPart / total, kx0: x0, ky0: y0, fill: n / ((x1 - x0 + 1) * (y1 - y0 + 1)), mr: mr / rows, mc: mc / cols, cw: x1 - x0 + 1, ch: y1 - y0 + 1 };
}
/* separate lobes of joined balloons: pieces of the deep core */
function balLobes(F, C, k) {
  const { bw, bh } = F, D = C.D, n = bw * bh, thr = C.rad * k;
  const pl = new Int32Array(n), q = new Int32Array(n), pieces = [];
  let id = 0;
  for (let s = 0; s < n; s++) {
    if (D[s] < thr || pl[s]) continue;
    id++; let qh = 0, qt = 0, mx = 0; q[qt++] = s; pl[s] = id;
    while (qh < qt) {
      const i = q[qh++], x = i % bw; if (D[i] > mx) mx = D[i];
      if (x > 0 && !pl[i - 1] && D[i - 1] >= thr) { pl[i - 1] = id; q[qt++] = i - 1; }
      if (x < bw - 1 && !pl[i + 1] && D[i + 1] >= thr) { pl[i + 1] = id; q[qt++] = i + 1; }
      if (i >= bw && !pl[i - bw] && D[i - bw] >= thr) { pl[i - bw] = id; q[qt++] = i - bw; }
      if (i + bw < n && !pl[i + bw] && D[i + bw] >= thr) { pl[i + bw] = id; q[qt++] = i + bw; }
    }
    pieces.push({ id, cnt: qt, mx });
  }
  const top = pieces.reduce((a, p) => Math.max(a, p.cnt), 0);
  const lobes = pieces.filter(p => p.cnt >= top * .12 && p.mx >= C.rad * .6);
  return { pl, lobes };
}
/* grow the lobes through the region (nearest lobe wins), one cropped mask per lobe */
function balSplit(F, L) {
  const { m, bw, bh } = F, n = bw * bh, own = new Int32Array(n), q = new Int32Array(n);
  let qh = 0, qt = 0;
  const keep = new Set(L.lobes.map(p => p.id));
  for (let i = 0; i < n; i++) if (keep.has(L.pl[i])) { own[i] = L.pl[i]; q[qt++] = i; }
  while (qh < qt) {
    const i = q[qh++], x = i % bw, o = own[i];
    if (x > 0 && m[i - 1] && !own[i - 1]) { own[i - 1] = o; q[qt++] = i - 1; }
    if (x < bw - 1 && m[i + 1] && !own[i + 1]) { own[i + 1] = o; q[qt++] = i + 1; }
    if (i >= bw && m[i - bw] && !own[i - bw]) { own[i - bw] = o; q[qt++] = i - bw; }
    if (i + bw < n && m[i + bw] && !own[i + bw]) { own[i + bw] = o; q[qt++] = i + bw; }
  }
  return L.lobes.map(p => {
    let x0 = bw, x1 = -1, y0 = bh, y1 = -1;
    for (let i = 0; i < n; i++) if (own[i] === p.id) { const x = i % bw, y = (i - x) / bw; if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    const cw = x1 - x0 + 3, chh = y1 - y0 + 3, cm = new Uint8Array(cw * chh);
    let cnt = 0;
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) if (own[y * bw + x] === p.id) { cm[(y - y0 + 1) * cw + (x - x0 + 1)] = 1; cnt++; }
    return { m: cm, bw: cw, bh: chh, holes: 0, n: cnt, ox: x0 - 1, oy: y0 - 1 };
  });
}
/* outline made only of horizontal / vertical runs: a box, or a step of boxes that touch */
function balRectilinear(F) {
  const { m, bw, bh } = F;
  let n = 0, same = 0, a = -1, b = -1;
  for (let y = 0; y < bh; y++) {
    let l = -1, r = -1; for (let x = 0; x < bw; x++) if (m[y * bw + x]) { if (l < 0) l = x; r = x; }
    if (l < 0) continue; if (a >= 0) { n++; if (l === a && r === b) same++; } a = l; b = r;
  }
  const sr = n ? same / n : 0; n = 0; same = 0; a = -1; b = -1;
  for (let x = 0; x < bw; x++) {
    let t = -1, u = -1; for (let y = 0; y < bh; y++) if (m[y * bw + x]) { if (t < 0) t = y; u = y; }
    if (t < 0) continue; if (a >= 0) { n++; if (t === a && u === b) same++; } a = t; b = u;
  }
  const sc = n ? same / n : 0;
  return sr >= .85 && sc >= .85;
}
/* shape test of one (sub)region; F coords -> verdict + numbers */
function balJudge(F, C) {
  const S = balShape(F), K = balCoreShape(F, C, .5);
  const bw = F.bw - 2, bh = F.bh - 2;
  let n = 0; for (let i = 0; i < F.m.length; i++) if (F.m[i]) n++;
  const round = 2 * C.rad / Math.min(bw, bh), fill = n / (bw * bh);
  const cvx = S.tvx / (2 * bw), cvy = S.tvy / (2 * bh);
  let why = '';
  if (round < .35) why = 'flat';
  else if (K.big < .6) why = 'parts';
  else if (!((K.fill >= .55 && K.mr <= .12 && K.mc <= .12) || (round >= .85 && K.fill >= .65 && K.mr <= .34 && K.mc <= .34))) why = 'core';
  else if (fill < .4) why = 'thin';
  return { why, round, fill, cvx, cvy, K, rOn: S.rOn, cOn: S.cOn, box: fill > .9 && ((cvx < .35 && cvy < .35) || (S.rOn > .8 && S.cOn > .8)) };
}
/* paper-white blocks, then one step of erosion: closes small gaps in hairy / broken outlines */
function balMask(B) {
  const { w, h, mn, cm } = B;
  const m0 = new Uint8Array(w * h), m = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) m0[i] = mn[i] >= 236 && cm[i] <= 26 ? 1 : 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = y * w + x;
    m[i] = m0[i] && (x === 0 || m0[i - 1]) && (x === w - 1 || m0[i + 1]) && (y === 0 || m0[i - w]) && (y === h - 1 || m0[i + w]) ? 1 : 0;
  }
  return m;
}
/* deepest point of a mask (chamfer distance, in blocks) */
function balDepth(m, bw, bh) {
  const D = new Float32Array(bw * bh), A = 1, B = 1.4142;
  for (let i = 0; i < bw * bh; i++) D[i] = m[i] ? 1e9 : 0;
  for (let y = 0; y < bh; y++) for (let x = 0; x < bw; x++) {
    const i = y * bw + x; if (!D[i]) continue;
    let v = D[i];
    if (x > 0) v = Math.min(v, D[i - 1] + A);
    if (y > 0) { v = Math.min(v, D[i - bw] + A); if (x > 0) v = Math.min(v, D[i - bw - 1] + B); if (x < bw - 1) v = Math.min(v, D[i - bw + 1] + B); }
    if (x === 0 || y === 0) v = Math.min(v, 1);
    D[i] = v;
  }
  let best = 0;
  for (let y = bh - 1; y >= 0; y--) for (let x = bw - 1; x >= 0; x--) {
    const i = y * bw + x; if (!D[i]) continue;
    let v = D[i];
    if (x < bw - 1) v = Math.min(v, D[i + 1] + A); else v = Math.min(v, 1);
    if (y < bh - 1) { v = Math.min(v, D[i + bw] + A); if (x < bw - 1) v = Math.min(v, D[i + bw + 1] + B); if (x > 0) v = Math.min(v, D[i + bw - 1] + B); } else v = Math.min(v, 1);
    D[i] = v; if (v > best) best = v;
  }
  return best;
}
/* ============================================================
   FLAT-COLOUR BOXES — chat messages, notifications, coloured captions.
   One even colour (grey, yellow, blue, black…), crisp edges, a (rounded) rectangle, standing
   out from what is around it. The paper-white finder needs white paper and an inked outline.
   ============================================================ */
function findFlat(B, W, H, have, rej) {
  const { f, w, h, mn, mx, cr, cg, cb } = B, n = w * h;
  if (!cr) return [];
  const fl = new Uint8Array(n);
  for (let i = 0; i < n; i++) fl[i] = mx[i] - mn[i] <= 16 ? 1 : 0;
  const dif = (i, R, G, Bc) => Math.abs(cr[i] - R) + Math.abs(cg[i] - G) + Math.abs(cb[i] - Bc);
  const lab = new Int32Array(n), q = new Int32Array(n), out = [];
  const minA = Math.max(2400, W * W * .006), minW = Math.max(56, W * .11), minH = Math.max(28, W * .05);
  let id = 0;
  for (let s = 0; s < n; s++) {
    if (!fl[s] || lab[s]) continue;
    id++;
    let qh = 0, qt = 0, x0 = w, x1 = -1, y0 = h, y1 = -1;
    q[qt++] = s; lab[s] = id;
    while (qh < qt) {
      const i = q[qh++], x = i % w, y = (i - x) / w, r = cr[i], g = cg[i], b = cb[i];
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
      /* neighbours of nearly the same colour (a slow gradient still joins up: chat backgrounds) */
      if (x > 0 && fl[i - 1] && !lab[i - 1] && dif(i - 1, r, g, b) <= 12) { lab[i - 1] = id; q[qt++] = i - 1; }
      if (x < w - 1 && fl[i + 1] && !lab[i + 1] && dif(i + 1, r, g, b) <= 12) { lab[i + 1] = id; q[qt++] = i + 1; }
      if (y > 0 && fl[i - w] && !lab[i - w] && dif(i - w, r, g, b) <= 12) { lab[i - w] = id; q[qt++] = i - w; }
      if (y < h - 1 && fl[i + w] && !lab[i + w] && dif(i + w, r, g, b) <= 12) { lab[i + w] = id; q[qt++] = i + w; }
    }
    const bwp = (x1 - x0 + 1) * f, bhp = (y1 - y0 + 1) * f, ap = qt * f * f;
    if (bwp < minW || bhp < minH || ap < minA) continue;
    const c = { id, n: qt, x0, x1, y0, y1 }, box = { x0, y0, x1, y1 };
    const edges = (x0 === 0) + (x1 === w - 1) + (y0 === 0) + (y1 === h - 1);
    let why = '';
    if (edges >= 2 || (x0 === 0 && x1 === w - 1)) why = 'edges';
    else if (bwp > W * .97 || bhp > Math.min(H * .6, W * .75) || bwp * bhp > W * W * .35) why = 'big';
    else if (bhp > bwp * 1.5) why = 'tall';
    else if (qt / ((x1 - x0 + 1) * (y1 - y0 + 1)) < .45) why = 'sparse';
    if (why) { rej(box, 'f:' + why); continue; }
    /* one even colour: shading and gradients belong to the drawing */
    let sr = 0, sg = 0, sb = 0;
    for (let k = 0; k < qt; k++) { const i = q[k]; sr += cr[i]; sg += cg[i]; sb += cb[i]; }
    const R0 = sr / qt, G0 = sg / qt, B0 = sb / qt;
    let odd = 0;
    for (let k = 0; k < qt; k++) if (dif(q[k], R0, G0, B0) > 30) odd++;
    if (odd > qt * .06) { rej(box, 'f:uneven'); continue; }
    /* dark plates are logos, screens and shadows far more often than message boxes */
    if (.299 * R0 + .587 * G0 + .114 * B0 < 90) { rej(box, 'f:dark'); continue; }
    /* a (rounded) rectangle, holes (letters) filled; ovals and odd shapes are not boxes */
    const F = balFilled(lab, w, c), fbw = F.bw, fbh = F.bh, fm = F.m;
    let fn = 0; for (let i = 0; i < fm.length; i++) if (fm[i]) fn++;
    const fill = fn / ((fbw - 2) * (fbh - 2));
    if (fill < .86) { rej(box, 'f:shape ' + fill.toFixed(2)); continue; }
    const Sh = balShape(F);
    if (Sh.mr > .1 || Sh.mc > .1) { rej(box, 'f:concave'); continue; }
    /* what is inside besides the box colour: letters are thin, a face or an object is not */
    const fh = new Uint8Array(fbw * fbh); let fhn = 0;
    for (let y = 1; y < fbh - 1; y++) for (let x = 1; x < fbw - 1; x++) {
      const k = y * fbw + x; if (fm[k] !== 2) continue;
      const i = (y0 + y - 1) * w + x0 + x - 1;
      if (fl[i] && dif(i, R0, G0, B0) <= 36) continue;
      fh[k] = 1; fhn++;
    }
    if (fhn > fn * .5) { rej(box, 'f:busy'); continue; }
    if (fhn && balDepth(fh, fbw, fbh) * f > Math.max(12, W * .028)) { rej(box, 'f:object'); continue; }
    /* it has to stand out: just outside the edge the colour is clearly different */
    let ring = 0, rd = 0;
    for (let y = 1; y < fbh - 1; y++) for (let x = 1; x < fbw - 1; x++) {
      const k = y * fbw + x; if (!fm[k]) continue;
      for (let dd = 0; dd < 4; dd++) {
        const dx = dd === 0 ? -1 : dd === 1 ? 1 : 0, dy = dd === 2 ? -1 : dd === 3 ? 1 : 0;
        if (fm[k + dy * fbw + dx]) continue;
        const gx = x0 + x - 1 + dx * 3, gy = y0 + y - 1 + dy * 3;
        if (gx < 0 || gy < 0 || gx >= w || gy >= h) continue;
        ring++; if (dif(gy * w + gx, R0, G0, B0) > 40) rd++;
      }
    }
    if (!ring || rd < ring * .7) { rej(box, 'f:blend ' + (ring ? rd / ring : 0).toFixed(2)); continue; }
    const px0 = Math.max(0, x0 - 1) * f, py0 = Math.max(0, y0 - 1) * f, px1 = Math.min(W, (x1 + 2) * f), py1 = Math.min(H, (y1 + 2) * f);
    const dup = have.some(r => {
      const ox = Math.min(r.x1, px1) - Math.max(r.x0, px0), oy = Math.min(r.y1, py1) - Math.max(r.y0, py0);
      return ox > 0 && oy > 0 && ox * oy > .3 * Math.min((r.x1 - r.x0) * (r.y1 - r.y0), (px1 - px0) * (py1 - py0));
    });
    if (dup) { rej(box, 'f:dup'); continue; }
    const C = balCore(F);
    /* where the old lettering is wiped from: a block of the box colour near the middle */
    const ccx = x0 - 1 + C.cx, ccy = y0 - 1 + C.cy;
    let si = q[0], sd = 1e18;
    for (let k = 0; k < qt; k++) { const i = q[k], x = i % w, y = (i - x) / w, dd = (x - ccx) ** 2 + (y - ccy) ** 2; if (dd < sd) { sd = dd; si = i; } }
    const sx = si % w, sy = (si - sx) / w;
    out.push({
      x0: px0, y0: py0, x1: px1, y1: py1,
      cx: (ccx + .5) * f, cy: (ccy + .5) * f, cw: (C.cw + 2) * f, ch: (C.ch + 2) * f, rad: (C.rad + 1) * f,
      kind: 'box', flat: true, fill: +fill.toFixed(2), lum: +(.299 * R0 + .587 * G0 + .114 * B0).toFixed(1),
      rgb: [R0, G0, B0].map(Math.round), seed: { x: (sx + .5) * f, y: (sy + .5) * f }
    });
  }
  return out;
}
function findBalloons(d, W, H, opt = {}) {
  const B = opt.B || balBlocks(d, W, H), { f, w, h, mn, cm } = B;
  const m = opt.m || balMask(B);
  const { lab, st } = balLabel(m, w, h);
  const out = [], dbg = [];
  const minA = Math.max(1500, W * W * .004);
  const rej = (c, why, extra) => { if (opt.debug) dbg.push({ x0: c.x0 * f, y0: c.y0 * f, x1: (c.x1 + 1) * f, y1: (c.y1 + 1) * f, why, extra }); };
  for (let k = 1; k < st.length; k++) {
    const c = st[k];
    const bwp = (c.x1 - c.x0 + 1) * f, bhp = (c.y1 - c.y0 + 1) * f, ap = c.n * f * f;
    if (bwp < 40 || bhp < 30 || ap < minA) continue;
    const edges = (c.x0 === 0) + (c.x1 === w - 1) + (c.y0 === 0) + (c.y1 === h - 1);
    let why = '';
    if (edges >= 2) why = 'edges';
    else if (bwp > W * .97 || bhp > Math.min(H * .6, W * 1.8) || ap > W * W * .6) why = 'big';
    else if (c.x0 === 0 && c.x1 === w - 1) why = 'lr';
    else if (c.n / ((c.x1 - c.x0 + 1) * (c.y1 - c.y0 + 1)) < .42) why = 'sparse';
    if (why) { rej(c, why); continue; }
    const F = balFilled(lab, w, c);
    /* colour of the inside: balloons are flat paper-white, skin / cloth highlights are tinted */
    let sl = 0, sc = 0, pw = 0, cnt = 0;
    for (let y = c.y0; y <= c.y1; y++) for (let x = c.x0; x <= c.x1; x++) { const i = y * w + x; if (lab[i] !== c.id) continue; cnt++; sl += mn[i]; sc += cm[i]; if (mn[i] >= 247 && cm[i] <= 14) pw++; }
    /* outline: how much of the border is dark ink (sides cut by the page edge do not count) */
    let edge = 0, dark = 0;
    const fm = F.m, fbw = F.bw;
    for (let y = 1; y < F.bh - 1; y++) for (let x = 1; x < fbw - 1; x++) {
      const i = y * fbw + x; if (!fm[i]) continue;
      if (fm[i - 1] && fm[i + 1] && fm[i - fbw] && fm[i + fbw]) continue;
      const gx = c.x0 + x - 1, gy = c.y0 + y - 1;
      let any = false, dk = false;
      for (let q = 0; q < 4; q++) {
        const dx = q === 0 ? -1 : q === 1 ? 1 : 0, dy = q === 2 ? -1 : q === 3 ? 1 : 0;
        const nx = gx + dx, ny = gy + dy;
        if (nx < 0 || ny < 0 || nx >= w || ny >= h) continue;
        if (fm[(y + dy) * fbw + x + dx]) continue;
        any = true;
        for (let s = 0; s < 3 && !dk; s++) { const fx = nx + dx * s, fy = ny + dy * s; if (fx >= 0 && fy >= 0 && fx < w && fy < h && mn[fy * w + fx] < 170) dk = true; }
      }
      if (any) { edge++; if (dk) dark++; }
    }
    const ink = edge ? dark / edge : 0, white = cnt ? pw / cnt : 0;
    const C0 = balCore(F);
    const L = balLobes(F, C0, .5);
    const subs = L.lobes.length >= 2 ? balSplit(F, L) : [Object.assign({ ox: 0, oy: 0 }, F)];
    const steps = subs.length > 1 && balRectilinear(F);
    for (const sF of subs) {
      const C = sF === subs[0] && subs.length === 1 ? C0 : balCore(sF);
      const J = balJudge(sF, C);
      const sap = (subs.length === 1 ? c.n + F.holes : sF.n) * f * f;
      if (opt.feat) opt.feat.push({ box: [(c.x0 + sF.ox) * f, (c.y0 + sF.oy) * f], lobes: subs.length, round: +J.round.toFixed(2), kbig: +J.K.big.toFixed(2), kfill: +J.K.fill.toFixed(2), kmr: +J.K.mr.toFixed(2), kmc: +J.K.mc.toFixed(2), fill: +J.fill.toFixed(2), white: +white.toFixed(2), ink: +ink.toFixed(2) });
      /* block coords of this piece */
      const bx0 = c.x0 + sF.ox, by0 = c.y0 + sF.oy, bx1 = bx0 + sF.bw - 3, by1 = by0 + sF.bh - 3;
      const box = { x0: bx0, y0: by0, x1: bx1, y1: by1 };
      if (J.why) { rej(box, J.why + (subs.length > 1 ? '·' + subs.length : ''), J); continue; }
      if (subs.length > 1 && sap < minA) { rej(box, 'small·lobe'); continue; }
      const okColour = (white >= .9 && (ink >= .6 || (J.box && ink >= .4) || (white >= .985 && sap >= W * W * .03))) ||
        (white >= .7 && ink >= .2 && J.round >= .85 && J.K.fill >= .55 && sap >= W * W * .08);
      if (!okColour) { rej(box, 'colour ' + white.toFixed(2) + '/' + ink.toFixed(2)); continue; }
      const lumIn = sl / cnt, chordMin = Math.min(C.cw, C.ch) * f;
      /* tiny light patches (eyes, screens, highlights) are greyer than real paper-white balloons */
      if (chordMin < W * .17 && lumIn < 254) { rej(box, 'tiny ' + lumIn.toFixed(1)); continue; }
      /* white panel slivers between balloons: thin, ragged */
      if (J.K.fill < .7 && J.fill < .56) { rej(box, 'sliver'); continue; }
      out.push({
        x0: Math.max(0, bx0 - 1) * f, y0: Math.max(0, by0 - 1) * f, x1: Math.min(W, (bx1 + 2) * f), y1: Math.min(H, (by1 + 2) * f),
        cx: (c.x0 - 1 + sF.ox + C.cx + .5) * f, cy: (c.y0 - 1 + sF.oy + C.cy + .5) * f,
        cw: (C.cw + 2) * f, ch: (C.ch + 2) * f, rad: (C.rad + 1) * f,
        kind: J.box || steps ? 'box' : 'bubble', fill: +J.fill.toFixed(2), ink: +ink.toFixed(2), lobes: subs.length,
        lum: +(sl / cnt).toFixed(1), chroma: +(sc / cnt).toFixed(1), white: +white.toFixed(2), round: +J.round.toFixed(2), kfill: +J.K.fill.toFixed(2)
      });
    }
  }
  if (opt.flat !== false) try { out.push(...findFlat(B, W, H, out, rej)); } catch (e) { console.warn('flat boxes', e); }
  if (opt.rawBoxes && opt.rawBoxes.length) {
    for (const rb of opt.rawBoxes) {
      const dup = out.some(r => {
        const ox = Math.min(r.x1, rb.x1) - Math.max(r.x0, rb.x0), oy = Math.min(r.y1, rb.y1) - Math.max(r.y0, rb.y0);
        return ox > 0 && oy > 0 && ox * oy > .25 * Math.min((r.x1 - r.x0) * (r.y1 - r.y0), (rb.x1 - rb.x0) * (rb.y1 - rb.y0));
      });
      if (!dup) out.push(rb);
    }
  }
  /* reading order: top to bottom; side by side (overlapping rows) left to right (or right to left) */
  out.sort((a, b) => (a.y0 + a.y1) - (b.y0 + b.y1));
  const rows = [];
  for (const r of out) {
    const last = rows[rows.length - 1];
    if (last && last.some(o => Math.min(o.y1, r.y1) - Math.max(o.y0, r.y0) > .5 * Math.min(o.y1 - o.y0, r.y1 - r.y0))) last.push(r);
    else rows.push([r]);
  }
  const res = [];
  for (const row of rows) { row.sort((a, b) => opt.rtl ? b.cx - a.cx : a.cx - b.cx); res.push(...row); }
  return opt.debug ? { res, dbg } : res;
}

/* ---------- page cache: blocks + light mask (2 pages) and found balloons (all pages) ---------- */
const BLKCACHE = new Map(), BALCACHE = new Map();
function pageBlocks(i) {
  const p = S.pages[i]; if (!p) return null;
  const c = BLKCACHE.get(i);
  if (c && c.p === p) return c;
  const d = pixels(i); if (!d) return null;
  const B = balBlocks(d, p.w, p.h), v = { p, B, m: balMask(B) };
  BLKCACHE.set(i, v);
  while (BLKCACHE.size > 2) BLKCACHE.delete(BLKCACHE.keys().next().value);
  return v;
}
/** balloons + boxes of a whole page in reading order (computed once, later or now) */
function pageBalloons(i, now) {
  const p = S.pages[i]; if (!p || !p.img) return null;
  const rtl = !!S.settings.rtlOrder, rlen = (p.rawBoxes && p.rawBoxes.length) || 0, c = BALCACHE.get(i);
  if (c && c.p === p && c.rtl === rtl && c.rlen === rlen) return c.res;
  if (!now) { scheduleBalloons(i); return null; }
  let res = [];
  try {
    const k = pageBlocks(i);
    if (k) res = findBalloons(null, p.w, p.h, { B: k.B, m: k.m, rtl, rawBoxes: p.rawBoxes || [] });
  } catch (e) { console.warn('balloon finder', e); }
  BALCACHE.set(i, { p, rtl, rlen, res });
  return res;
}
let balT = 0;
function scheduleBalloons(i) {
  clearTimeout(balT);
  balT = setTimeout(() => { if (!S.pages[i]) return; pageBalloons(i, true); if (i === S.cur) render(i); }, 80);
}
/* the light region under a click, also when the page finder did not list it */
function clickRegion(i, px, py) {
  const p = S.pages[i], k = pageBlocks(i); if (!p || !k) return null;
  const { B, m } = k, { f, w, h } = B;
  let sx = clamp(Math.floor(px / f), 0, w - 1), sy = clamp(Math.floor(py / f), 0, h - 1);
  if (!m[sy * w + sx]) {               /* on a letter or on the outline: nearest light block */
    let best = -1, bd = 1e9;
    for (let dy = -4; dy <= 4; dy++) for (let dx = -4; dx <= 4; dx++) {
      const x = sx + dx, y = sy + dy;
      if (x < 0 || y < 0 || x >= w || y >= h || !m[y * w + x]) continue;
      const dd = dx * dx + dy * dy; if (dd < bd) { bd = dd; best = y * w + x; }
    }
    if (best < 0) return null;
    sx = best % w; sy = (best - sx) / w;
  }
  const lab = new Int32Array(w * h), q = new Int32Array(w * h);
  let qh = 0, qt = 0, n = 0, x0 = sx, x1 = sx, y0 = sy, y1 = sy;
  q[qt++] = sy * w + sx; lab[sy * w + sx] = 1;
  while (qh < qt) {
    const j = q[qh++], x = j % w, y = (j - x) / w; n++;
    if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y;
    if (x > 0 && m[j - 1] && !lab[j - 1]) { lab[j - 1] = 1; q[qt++] = j - 1; }
    if (x < w - 1 && m[j + 1] && !lab[j + 1]) { lab[j + 1] = 1; q[qt++] = j + 1; }
    if (y > 0 && m[j - w] && !lab[j - w]) { lab[j - w] = 1; q[qt++] = j - w; }
    if (y < h - 1 && m[j + w] && !lab[j + w]) { lab[j + w] = 1; q[qt++] = j + w; }
  }
  const bwp = (x1 - x0 + 1) * f, bhp = (y1 - y0 + 1) * f;
  if (bwp < 24 || bhp < 18 || n * f * f < 500) return null;
  const edges = (x0 === 0) + (x1 === w - 1) + (y0 === 0) + (y1 === h - 1);
  if (edges >= 2 || (x0 === 0 && x1 === w - 1) || bwp > p.w * .97 || bhp > Math.min(p.h * .6, p.w * 1.8) || n * f * f > p.w * p.w * .6) return null;
  const c = { id: 1, n, x0, x1, y0, y1 };
  const F = balFilled(lab, w, c), C0 = balCore(F), Lb = balLobes(F, C0, .5);
  let sF = Object.assign({ ox: 0, oy: 0 }, F), C = C0;
  if (Lb.lobes.length >= 2) {          /* joined balloons: the lobe that was clicked */
    const fx = sx - x0 + 1, fy = sy - y0 + 1;
    const hit = balSplit(F, Lb).find(s => { const u = fx - s.ox, v = fy - s.oy; return u >= 0 && v >= 0 && u < s.bw && v < s.bh && s.m[v * s.bw + u]; });
    if (hit) { sF = hit; C = balCore(hit); }
  }
  const J = balJudge(sF, C);
  const bx0 = x0 + sF.ox, by0 = y0 + sF.oy, bx1 = bx0 + sF.bw - 3, by1 = by0 + sF.bh - 3;
  const g = {
    x0: Math.max(0, bx0 - 1) * f, y0: Math.max(0, by0 - 1) * f, x1: Math.min(p.w, (bx1 + 2) * f), y1: Math.min(p.h, (by1 + 2) * f),
    cx: (x0 - 1 + sF.ox + C.cx + .5) * f, cy: (y0 - 1 + sF.oy + C.cy + .5) * f,
    cw: (C.cw + 2) * f, ch: (C.ch + 2) * f, kind: J.box ? 'box' : 'bubble', lum: 255
  };
  if (g.cw < 50 || g.ch < 26) return null;
  return g;
}
/* coloured / dark balloons: bounded flood fill from the click (old way), centred on its widest part */
function detectFlood(i, px, py) {
  const p = S.pages[i], d = pixels(i);
  if (!d) return null;
  const W = p.w, H = p.h;
  px = clamp(Math.round(px), 0, W - 1); py = clamp(Math.round(py), 0, H - 1);
  const R = Math.round(clamp(Math.min(W, H) * .42, 140, 700));
  const x0w = Math.max(0, px - R), x1w = Math.min(W - 1, px + R);
  const y0w = Math.max(0, py - R), y1w = Math.min(H - 1, py + R);
  const ww = x1w - x0w + 1, hh = y1w - y0w + 1;
  const s0 = (py * W + px) * 4;
  if (d[s0 + 3] < 20) return null;
  const r0 = d[s0], g0 = d[s0 + 1], b0 = d[s0 + 2];
  const TOL = 58, CAP = Math.min(ww * hh * .55, 1.4e6);
  const vis = new Uint8Array(ww * hh);
  const qx = new Int32Array(Math.min(ww * hh, 1.6e6)), qy = new Int32Array(qx.length);
  let qh = 0, qt = 0, n = 0;
  let X0 = px, X1 = px, Y0 = py, Y1 = py;
  const ok = (x, y) => { const k = (y * W + x) * 4; return d[k + 3] > 20 && Math.abs(d[k] - r0) + Math.abs(d[k + 1] - g0) + Math.abs(d[k + 2] - b0) < TOL; };
  qx[qt] = px; qy[qt++] = py; vis[(py - y0w) * ww + (px - x0w)] = 1;
  while (qh < qt) {
    const x = qx[qh], y = qy[qh]; qh++;
    if (++n > CAP) return null;
    if (x < X0) X0 = x; if (x > X1) X1 = x; if (y < Y0) Y0 = y; if (y > Y1) Y1 = y;
    for (let k = 0; k < 4; k++) {
      const nx = x + (k === 0 ? -1 : k === 1 ? 1 : 0), ny = y + (k === 2 ? -1 : k === 3 ? 1 : 0);
      if (nx < x0w || nx > x1w || ny < y0w || ny > y1w) continue;
      const vi = (ny - y0w) * ww + (nx - x0w);
      if (vis[vi]) continue;
      if (!ok(nx, ny)) { vis[vi] = 2; continue; }
      vis[vi] = 1; if (qt < qx.length) { qx[qt] = nx; qy[qt++] = ny; }
    }
  }
  const bw = X1 - X0, bh = Y1 - Y0;
  if (n < 500 || bw < 24 || bh < 18) return null;
  if (bw > W * .92 || bh > H * .55) return null;                 // ran into the gutter
  if (bw / Math.max(1, bh) > 14 || bh / Math.max(1, bw) > 14) return null;
  let edges = 0;
  if (X0 <= 1) edges++; if (X1 >= W - 2) edges++; if (Y0 <= 1) edges++; if (Y1 >= H - 2) edges++;
  if (edges >= 2) return null;
  /* leaked: the fill reached the search window on two sides that are not the page edge */
  let wl = 0;
  if (X0 === x0w && x0w > 0) wl++; if (X1 === x1w && x1w < W - 1) wl++; if (Y0 === y0w && y0w > 0) wl++; if (Y1 === y1w && y1w < H - 1) wl++;
  if (wl >= 2) return null;
  if (n / ((bw + 1) * (bh + 1)) < .35) return null;              // too sparse to be a bubble
  /* widest part (inscribed circle) instead of the box middle: tails and spikes do not pull the text */
  const f = Math.max(1, Math.round(W / 360)), gw = Math.floor(bw / f) + 1, gh = Math.floor(bh / f) + 1;
  const cnt = new Uint16Array(gw * gh);
  for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) if (vis[(y - y0w) * ww + (x - x0w)] === 1) cnt[((y - Y0) / f | 0) * gw + ((x - X0) / f | 0)]++;
  const lab = new Int32Array(gw * gh); let nb = 0;
  for (let k = 0; k < gw * gh; k++) if (cnt[k] * 2 >= f * f) { lab[k] = 1; nb++; }
  let cx = (X0 + X1) / 2, cy = (Y0 + Y1) / 2, cw = bw, ch = bh;
  if (nb > 20) {
    const F = balFilled(lab, gw, { id: 1, x0: 0, x1: gw - 1, y0: 0, y1: gh - 1 }), C = balCore(F);
    if (C.rad > 1) { cx = X0 + (C.cx - 1 + .5) * f; cy = Y0 + (C.cy - 1 + .5) * f; cw = C.cw * f; ch = C.ch * f; }
  }
  if (Math.abs(px - cx) > cw * .75 + 8 || Math.abs(py - cy) > ch * .75 + 8) return null;
  const fill = n / ((bw + 1) * (bh + 1));
  return { x0: X0, y0: Y0, x1: X1, y1: Y1, cx, cy, cw, ch, kind: fill > .9 ? 'box' : 'bubble', lum: .299 * r0 + .587 * g0 + .114 * b0 };
}
/** the balloon under a point: page finder first, then the light region, then the old flood fill */
function detectAt(i, x, y) {
  const C = pageBalloons(i, true) || [];
  let best = null;
  for (const r of C) if (x >= r.x0 && x <= r.x1 && y >= r.y0 && y <= r.y1) {
    const dd = (x - r.cx) ** 2 + (y - r.cy) ** 2; if (!best || dd < best.d) best = { r, d: dd };
  }
  if (best) return Object.assign({ lum: best.r.lum !== undefined ? best.r.lum : 255 }, best.r);
  return clickRegion(i, x, y) || detectFlood(i, x, y) || detectOpenBand(i, x, y);
}
/* a light pixel near a point (seed for erasing the old lettering) */
function brightSeed(i, x, y, r = 18) {
  const p = S.pages[i], d = pixels(i); if (!p || !d) return { x, y };
  const W = p.w, H = p.h, lum = (xx, yy) => { const k = (yy * W + xx) * 4; return (d[k] * 77 + d[k + 1] * 150 + d[k + 2] * 29) >> 8; };
  x = clamp(Math.round(x), 0, W - 1); y = clamp(Math.round(y), 0, H - 1);
  if (lum(x, y) > 200) return { x, y };
  for (let rr = 1; rr <= r; rr++) for (let dy = -rr; dy <= rr; dy++) for (let dx = -rr; dx <= rr; dx++) {
    if (Math.max(Math.abs(dx), Math.abs(dy)) !== rr) continue;
    const xx = x + dx, yy = y + dy; if (xx < 0 || yy < 0 || xx >= W || yy >= H) continue;
    if (lum(xx, yy) > 200) return { x: xx, y: yy };
  }
  return { x, y };
}
/* sample background luminance & variance around a non-balloon point to auto-invert or add stroke/shadow */
function sampleBg(i, cx, cy, bw = 180, bh = 80) {
  const p = S.pages[i], k = pageBlocks(i);
  if (!p || !k || !k.B) return { lum: 255, varL: 0 };
  const { f, w, h, mn, mx } = k.B;
  const x0 = clamp(Math.floor((cx - bw / 2) / f), 0, w - 1), x1 = clamp(Math.floor((cx + bw / 2) / f), 0, w - 1);
  const y0 = clamp(Math.floor((cy - bh / 2) / f), 0, h - 1), y1 = clamp(Math.floor((cy + bh / 2) / f), 0, h - 1);
  let sum = 0, cnt = 0, minL = 255, maxL = 0;
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
    const idx = y * w + x, l = (mn[idx] + mx[idx]) >> 1;
    sum += l; cnt++;
    if (mn[idx] < minL) minL = mn[idx];
    if (mx[idx] > maxL) maxL = mx[idx];
  }
  return { lum: cnt ? sum / cnt : 255, spread: maxL - minL };
}
/* detect open uniform/gradient bands (gutter or dark/light narration space) around a point when no balloon exists */
function detectOpenBand(i, px, py) {
  if (!S.settings.openSpace) return null;
  const p = S.pages[i], k = pageBlocks(i);
  if (!p || !k || !k.B) return null;
  const { f, w, h, mn, mx } = k.B;
  const sx = clamp(Math.floor(px / f), 0, w - 1), sy = clamp(Math.floor(py / f), 0, h - 1);
  const baseL = (mn[sy * w + sx] + mx[sy * w + sx]) >> 1;
  const okBlock = (x, y) => {
    const idx = y * w + x;
    return (mx[idx] - mn[idx]) <= 34 && Math.abs(((mn[idx] + mx[idx]) >> 1) - baseL) <= 38;
  };
  if (!okBlock(sx, sy)) return null;
  let l = sx, r = sx, t = sy, b = sy;
  const maxW = Math.round(w * 0.72), maxH = Math.round(Math.min(h * 0.25, w * 0.55));
  while (l > 1 && (sx - l) < maxW / 2 && okBlock(l - 1, sy)) l--;
  while (r < w - 2 && (r - sx) < maxW / 2 && okBlock(r + 1, sy)) r++;
  while (t > 1 && (sy - t) < maxH / 2 && okBlock(sx, t - 1)) t--;
  while (b < h - 2 && (b - sy) < maxH / 2 && okBlock(sx, b + 1)) b++;
  const cw = (r - l + 1) * f, ch = (b - t + 1) * f;
  if (cw < 90 || ch < 36) return null;
  const clampW = Math.min(cw, Math.round(p.w * 0.68)), clampH = Math.min(ch, Math.round(p.w * 0.42));
  const cx = px, cy = py;
  return {
    x0: Math.round(cx - clampW / 2), y0: Math.round(cy - clampH / 2),
    x1: Math.round(cx + clampW / 2), y1: Math.round(cy + clampH / 2),
    cx, cy, cw: clampW, ch: clampH, kind: 'box', lum: baseL, openBand: true
  };
}

/* ---------- which balloon a script line goes into by itself ---------- */
/* never placed by themselves: names, buttons, text written on the drawing, sound effects… */
const MANUAL_T = /متن\s*صفحه|دکمه|(^|\s)نام(\s|$)|مخاطب|فرستنده|بیرون|خارج|دست[\s\u200c]*نویس|پایانی|sfx|افکت|صدا|زیرنویس|تابلو|عنوان|تیتر|نوشته|ساعت|زمان|تاریخ/i;
/* chat / phone messages: they go into the flat-colour message boxes */
const MSG_T = /پیام|چت|اس[\s\u200c]*ام[\s\u200c]*اس|اعلان|نوتیف|sms|message|chat|notif/i;
function lineKind(b) {
  const t = String(b.type || '');
  if (MANUAL_T.test(t) || (!t && /^(sfx|افکت|صدا|صداگذاری)$/i.test(String(b.tag || '')))) return 'manual';
  if (MSG_T.test(t)) return 'msg';
  if (/کادر|مستطیل|باکس|جعبه|box|روایت|نریشن|narr/i.test(t)) return 'box';
  if (/بالن|بالون|حباب|فکر|ابر|balloon|bubble/i.test(t)) return 'bubble';
  return '';
}
/* the detected balloon that holds a layer (nearest centre among the boxes around it) */
function balloonOf(C, L) {
  let bi = -1, bd = 1e18;
  C.forEach((r, k) => { if (L.x >= r.x0 && L.x <= r.x1 && L.y >= r.y0 && L.y <= r.y1) { const dd = (L.x - r.cx) ** 2 + (L.y - r.cy) ** 2; if (dd < bd) { bd = dd; bi = k; } } });
  return bi;
}
/** the balloon line b goes into.
    The unplaced script lines between their placed neighbours are aligned with the empty balloons
    between those neighbours, in reading order (like a diff). The kind written in the script
    ("کادر" / "بالن") is only a hint, so one wrongly guessed shape does not push every later line
    into the wrong balloon; a missing or extra balloon costs a skip. On a tie the earlier balloon wins. */
const AL_MIS = .6, AL_SKIP_LINE = .9, AL_SKIP_BAL = .5, AL_NO = 9;
/* line kind k into balloon r: chat lines belong in the flat-colour boxes; balloon lines and
   untyped lines never go there by themselves (a phone screen must not swallow a dialogue line) */
function alCost(k, r) {
  if (r.flat) return k === 'msg' ? 0 : k === 'box' ? AL_MIS : AL_NO;
  if (k === 'msg') return AL_MIS;
  return k && k !== r.kind ? AL_MIS : 0;
}
function nextTarget(i, b) {
  if (!b || b.skip || !S.settings.autoFit) return null;
  const p = S.pages[i]; if (!p) return null;
  if (lineKind(b) === 'manual') return null;
  const C = pageBalloons(i); if (!C || !C.length) return null;
  const used = new Uint8Array(C.length);
  for (const L of p.layers) { const k = balloonOf(C, L); if (k >= 0) used[k] = 1; }
  const bs = live(i), at = bs.findIndex(x => x.id === b.id);
  if (at < 0) return null;
  const layerOf = id => p.layers.find(l => l.bid === id);
  const posOf = L => { const k = balloonOf(C, L); if (k >= 0) return k; const j = C.findIndex(r => r.cy > L.y); return j < 0 ? C.length : j - .5; };
  let start = 0, end = C.length, a0 = 0, a1 = bs.length;
  for (let j = at - 1; j >= 0; j--) { const L = layerOf(bs[j].id); if (L) { start = Math.floor(posOf(L)) + 1; a0 = j + 1; break; } }
  for (let j = at + 1; j < bs.length; j++) { const L = layerOf(bs[j].id); if (L) { end = Math.ceil(posOf(L)); a1 = j; break; } }
  const F = [];
  for (let k = Math.max(0, start); k < Math.min(end, C.length); k++) if (!used[k]) F.push(C[k]);
  if (!F.length) return null;
  const K = bs.slice(a0, a1).map(lineKind), n = K.length, m = F.length, W = m + 1;
  const cm = (x, y) => alCost(K[x], F[y]);
  const cl = x => K[x] === 'manual' ? 0 : AL_SKIP_LINE;
  /* E[x][y] = cheapest way to finish from line x / balloon y */
  const E = new Float64Array((n + 1) * W);
  for (let x = n; x >= 0; x--) for (let y = m; y >= 0; y--) {
    if (x === n && y === m) continue;
    let v = Infinity;
    if (x < n && y < m && K[x] !== 'manual') v = Math.min(v, E[(x + 1) * W + y + 1] + cm(x, y));
    if (x < n) v = Math.min(v, E[(x + 1) * W + y] + cl(x));
    if (y < m) v = Math.min(v, E[x * W + y + 1] + AL_SKIP_BAL);
    E[x * W + y] = v;
  }
  const want = at - a0;
  let x = 0, y = 0;
  while (x < n) {
    const here = E[x * W + y];
    if (y < m && K[x] !== 'manual' && Math.abs(here - (E[(x + 1) * W + y + 1] + cm(x, y))) < 1e-9) { if (x === want) return F[y]; x++; y++; }
    else if (Math.abs(here - (E[(x + 1) * W + y] + cl(x))) < 1e-9) { if (x === want) return null; x++; }
    else if (y < m) y++;
    else return null;
  }
  return null;
}
/* dashed frame around the balloon the current line will go into (screen only, never exported) */
function drawTarget(c, i) {
  if (S.tool !== 'text' || S.drag || !S.settings.autoFit) return;
  const b = currentBubble(); if (!b || b.skip || placedSet(i).has(b.id)) return;
  const t = nextTarget(i, b); if (!t) return;
  const k = 1 / (S.zoom || 1), x = t.x0 + 3 * k, y = t.y0 + 3 * k, w = t.x1 - t.x0 - 6 * k, h = t.y1 - t.y0 - 6 * k;
  c.save();
  c.beginPath(); if (c.roundRect) c.roundRect(x, y, w, h, 12 * k); else c.rect(x, y, w, h);
  c.lineWidth = 4 * k; c.setLineDash([]); c.strokeStyle = 'rgba(255,255,255,.75)'; c.stroke();
  c.lineWidth = 2.2 * k; c.setLineDash([9 * k, 6 * k]); c.strokeStyle = '#FF7A3D'; c.stroke();
  c.setLineDash([]);
  const label = document.body.classList.contains('mob') ? 'متن بعدی اینجا' : 'متن بعدی اینجا · Enter', fs = 12.5 * k;
  c.font = `700 ${fs}px ${FONT_FALLBACK}`; c.direction = 'rtl'; c.textAlign = 'center'; c.textBaseline = 'middle';
  const tw = c.measureText(label).width + 16 * k, th = fs + 10 * k;
  const bx = clamp(t.x0 + (t.x1 - t.x0) / 2, tw / 2 + 2 * k, S.pages[i].w - tw / 2 - 2 * k), by = Math.max(th / 2 + 2 * k, t.y0 - th / 2 - 2 * k);
  c.beginPath(); if (c.roundRect) c.roundRect(bx - tw / 2, by - th / 2, tw, th, th / 2); else c.rect(bx - tw / 2, by - th / 2, tw, th);
  c.fillStyle = '#FF7A3D'; c.fill();
  c.fillStyle = '#fff'; c.fillText(label, bx, by + .5 * k);
  c.restore();
}

/* ============================================================
   PLACE / FIT
   ============================================================ */
function fitInto(L, boxW, boxH, allowGrow) {
  const start = L.size;
  const fits = s => { L.size = s; const m = layout(L); return m.h <= boxH && m.w <= L.w + .5; };
  let lo = 8, hi = allowGrow ? Math.min(Math.round(start * 1.6), 160) : start, best = 8;
  while (lo <= hi) { const mid = (lo + hi) >> 1; if (fits(mid)) { best = mid; lo = mid + 1; } else hi = mid - 1; }
  L.size = best;
}
function newLayer(b, x, y) {
  const q = style(b.tag);
  return {
    bid: b.id, tag: b.tag, t: b.text, x: Math.round(x), y: Math.round(y),   // whole pixels: crisp and identical at 1× / 2× / 3×
    w: Math.round(q.size * 7.5), size: q.size, lh: q.lh || 1.32, rot: 0,
    color: q.color, stroke: q.stroke, strokeColor: q.strokeColor,
    shadow: q.shadow || 0, shadowColor: q.shadowColor || '#000000',
    bold: !!q.bold, italic: !!q.italic, font: q.font, autoInvert: false
  };
}
/* text block fitted to the balloon shape: ellipse for balloons, rectangle for boxes.
   Tries several line widths, keeps the biggest size (up to the tag size) and,
   among equal sizes, the block shaped most like the balloon. */
function fitShape(L, g, allowGrow) {
  const box = g.kind === 'box';
  const A = Math.max(30, g.cw * (box ? .86 : .9)), Bh = Math.max(16, g.ch * (box ? .8 : .86));
  const a = A / 2, b = Bh / 2;
  const cap = Math.max(6, allowGrow ? Math.min(Math.round(L.size * 1.6), 160) : Math.round(L.size));
  const fits = m => {
    if (m.w > A + .5 || m.h > Bh + .5) return false;
    if (box) return true;
    const n = m.lines.length;
    for (let j = 0; j < n; j++) {
      const ye = Math.abs((j - (n - 1) / 2) * m.lh) + m.lh * .42, hw = (m.ws ? m.ws[j] : m.w) / 2;
      if ((hw / a) ** 2 + (ye / b) ** 2 > 1.0001) return false;
    }
    return true;
  };
  const tgt = A / Bh;
  let best = null;
  for (const fr of box ? [1, .92, .84, .76, .68, .6, .52] : [1, .92, .84, .76, .68, .6, .52, .44]) {
    L.w = Math.max(30, Math.round(A * fr));
    let lo = 6, hi = cap, ok = 0;
    while (lo <= hi) { const mid = (lo + hi) >> 1; L.size = mid; if (fits(layout(L))) { ok = mid; lo = mid + 1; } else hi = mid - 1; }
    if (!ok) continue;
    L.size = ok;
    const m = layout(L), asp = m.w / Math.max(1, m.h);
    const score = ok * 100 - Math.abs(Math.log(Math.max(.05, asp) / tgt)) * 9;
    if (!best || score > best.score) best = { score, w: L.w, size: ok };
  }
  if (best) { L.w = best.w; L.size = best.size; return true; }
  L.w = Math.round(A); fitInto(L, L.w, Bh, allowGrow);
  return false;
}
/* the painted letters (not the line boxes) of a layer, relative to its centre */
function inkOffset(L) {
  const m = layout(L), k = sysAA === false ? 8 : 1;
  setFont(measCv, L, k);
  let t = 1e9, bt = -1e9, l = 1e9, r = -1e9;
  m.lines.forEach((s, j) => {
    if (!s) return;
    const mt = measCv.measureText(s), y = (j - (m.lines.length - 1) / 2) * m.lh;
    if (!isFinite(mt.actualBoundingBoxAscent)) return;
    t = Math.min(t, y - mt.actualBoundingBoxAscent / k); bt = Math.max(bt, y + mt.actualBoundingBoxDescent / k);
    l = Math.min(l, -mt.actualBoundingBoxLeft / k); r = Math.max(r, mt.actualBoundingBoxRight / k);
  });
  if (!(t < bt) || !(l < r)) return { dx: 0, dy: 0 };
  return { dx: (l + r) / 2, dy: (t + bt) / 2 };
}
/* put a layer into a found balloon: fitted, and the ink itself centred */
function placeInto(L, g) {
  if (S.settings.invert && g.lum < 92) { L.color = '#FFFFFF'; L.strokeColor = '#000000'; L.autoInvert = true; }
  L.rot = 0;
  fitShape(L, g, S.settings.grow);
  const o = inkOffset(L);
  L.x = Math.round(g.cx - o.dx); L.y = Math.round(g.cy - o.dy);
}
function placeBubble(b, x, y, g) {
  const p = S.pages[S.cur];
  const L = newLayer(b, x, y);
  let det = g || null;
  if (!det && S.settings.autoFit) det = detectAt(S.cur, x, y);
  if (det) {
    if (det.rawHint && det.lum === undefined) det.lum = sampleBg(S.cur, det.cx, det.cy, det.cw, det.ch).lum;
    placeInto(L, det);
  } else {
    L.w = Math.round(clamp(p.w * .42, 130, 520));
    fitInto(L, L.w, 1e5, false);
    if (S.settings.invert) {
      const bg = sampleBg(S.cur, x, y, L.w, L.size * 3);
      if (bg.lum < 105) {
        L.color = '#FFFFFF'; L.strokeColor = '#000000';
        if (!L.stroke && !L.shadow) L.shadow = 6;
        L.autoInvert = true;
      } else if (bg.spread > 55 && !L.stroke) {
        L.stroke = 3.5; L.strokeColor = '#FFFFFF';
      }
    }
  }
  if (det && S.settings.autoClean) {
    const s = g ? (g.seed || brightSeed(S.cur, det.cx, det.cy)) : { x, y };
    try { addClean(S.cur, s.x, s.y); render(S.cur); } catch (e) { }
  }
  p.layers.push(L);
  /* 8.5.0 — متن واقعی جای پیش‌نویس دستیار را می‌گیرد */
  for (let k = p.layers.length - 2; k >= 0; k--) { const o = p.layers[k]; if (o.draft && o.bid === L.bid) p.layers.splice(k, 1); }
  return L;
}
function refit(L) {
  const det = detectAt(S.cur, L.x, L.y);
  if (!det) { toast('بالنی در این نقطه پیدا نشد', 'wn'); return false; }
  L.size = style(L.tag).size;
  placeInto(L, det);
  return true;
}
/* after a line was placed: select it, move on to the next line, show where that one goes */
function afterPlace(i, L) {
  selectLayer(L, false);
  if (S.settings.next) { const ps = placedSet(i), nx = live(i).find(x => !ps.has(x.id)); if (nx) S.selB = nx.id; }
  syncLight(); syncPagesPanel(); render(i); autosave(); syncCards();
  if (S.settings.autoGo) setTimeout(() => goTarget(false), 40);
}
function goTarget(always) {
  const b = currentBubble(); if (!b || b.skip || placedSet(S.cur).has(b.id)) return false;
  pageBalloons(S.cur, true);
  const t = nextTarget(S.cur, b);
  if (t) { revealRect(S.cur, t, always); render(S.cur); }
  return !!t;
}
/** line b into the next empty balloon of the page (Enter / click on its card) */
function placeAuto(b) {
  const i = S.cur, p = S.pages[i];
  if (!p || !b || b.skip || placedSet(i).has(b.id) || S.tool !== 'text') return false;
  pageBalloons(i, true);
  const t = nextTarget(i, b); if (!t) return false;
  pushHist();
  const L = placeBubble(b, t.cx, t.cy, t);
  afterPlace(i, L);
  return true;
}
/** every remaining line of this page into the empty balloons, in order (one undo step) */
function autoPlacePage() {
  const i = S.cur, p = S.pages[i];
  if (!p) return toast('اول عکس‌ها را بارگذاری کنید', 'wn');
  if (!S.settings.autoFit) return toast('«پیدا کردن خودکار بالن» در تنظیمات خاموش است', 'wn');
  if (S.tool !== 'text') setTool('text');
  busy.show('پیدا کردن بالن‌ها…');
  try { pageBalloons(i, true); } finally { busy.hide(); }
  const before = snapshot();
  let n = 0, left = 0;
  for (const b of live(i)) {
    if (placedSet(i).has(b.id)) continue;
    const t = nextTarget(i, b);
    if (!t) { left++; continue; }
    placeBubble(b, t.cx, t.cy, t); n++;
  }
  if (!n) return toast('بالن خالی‌ای برای چیدن پیدا نشد — روی بالن‌ها کلیک کنید', 'wn', 4500);
  S.hist.push(before); if (S.hist.length > 60) S.hist.shift(); S.future.length = 0; updateHistBtns();
  pickNextBubble(); S.sel = null;
  syncAll(); autosave();
  toast(`${faNum(n)} متن در بالن‌ها چیده شد` + (left ? ` — ${faNum(left)} متن ماند؛ آن‌ها را با کلیک بگذارید` : '') + ' (Ctrl+Z برمی‌گرداند)', 'ok', 6000);
}

/* ============================================================
   HISTORY  (snapshot only on real mutations)
   ============================================================ */
const snapshot = () => JSON.stringify({ L: S.pages.map(p => p.layers), D: S.doc.map(g => g.map(b => b.text)), K: S.doc.map(g => g.map(b => b.skip ? 1 : 0)), C: S.pages.map(p => p.cleans || []), shift: S.shift, raw: S.raw, rawDoc: S.rawDoc });
function pushHist() {
  const s = snapshot();
  if (S.hist.length && S.hist[S.hist.length - 1] === s) return;
  S.hist.push(s); if (S.hist.length > 60) S.hist.shift();
  S.future.length = 0; updateHistBtns();
}
let histTimer = 0;
function pushHistSoon() { clearTimeout(histTimer); const s = snapshot(); histTimer = setTimeout(() => { if (S.hist[S.hist.length - 1] !== s) { S.hist.push(s); if (S.hist.length > 60) S.hist.shift(); S.future.length = 0; updateHistBtns(); } }, 10); }
function restore(json) {
  let o; try { o = JSON.parse(json); } catch (e) { return; }
  (o.L || []).forEach((l, i) => { if (S.pages[i]) S.pages[i].layers = l; });
  if (Number.isFinite(o.shift) && Array.isArray(o.rawDoc)) {
    S.shift = o.shift;
    S.raw = typeof o.raw === 'string' ? o.raw : S.raw;
    S.rawDoc = o.rawDoc;
    S.doc = shiftDoc(S.rawDoc, S.shift);
  }
  (o.D || []).forEach((g, i) => g.forEach((t, k) => { if (S.doc[i] && S.doc[i][k]) S.doc[i][k].text = t; }));
  if (Array.isArray(o.K)) S.doc.forEach((g, i) => g.forEach((b, k) => { b.skip = !!(o.K[i] && o.K[i][k]); }));
  if (Array.isArray(o.C)) S.pages.forEach((p, i) => {
    const nw = Array.isArray(o.C[i]) ? o.C[i] : [];
    if (JSON.stringify(p.cleans || []) !== JSON.stringify(nw)) { p.cleans = nw; markClean(i); }
  });
  S.sel = null;
  syncAll(); autosave();
}
function undo() { if (!S.hist.length) return toast('چیزی برای واگرد نیست'); S.future.push(snapshot()); restore(S.hist.pop()); updateHistBtns(); }
function redo() { if (!S.future.length) return toast('چیزی برای ازنو نیست'); S.hist.push(snapshot()); restore(S.future.pop()); updateHistBtns(); }
function clearHist() { S.hist.length = 0; S.future.length = 0; updateHistBtns(); }
function updateHistBtns() { $('#bUndo').toggleAttribute('aria-disabled', !S.hist.length); $('#bRedo').toggleAttribute('aria-disabled', !S.future.length); }

/* ============================================================
   AUTOSAVE
   ============================================================ */
let saveTimer = 0, saveFlash = 0, editSeq = 0, savedSeq = 0;
function autosave() {
  editSeq++;
  syncTitle();
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    const payload = JSON.stringify({
      v: 7, raw: S.raw, doc: S.doc, L: S.pages.map(p => p.layers), C: S.pages.map(p => p.cleans || []),
      styles: S.styles, settings: S.settings, names: S.pages.map(p => p.name), shift: S.shift,
      file: S.file ? { path: S.file.path || '', name: S.file.name || '' } : null, at: Date.now()
    });
    if (LS.set('ms6.auto', payload)) {
      const f = $('#fSave'); f.classList.remove('idle'); $('#fSaveT').textContent = 'ذخیره شد';
      clearTimeout(saveFlash); saveFlash = setTimeout(() => { f.classList.add('idle'); $('#fSaveT').textContent = 'ذخیرهٔ خودکار'; }, 1600);
    } else if (!S.quotaWarned) {
      S.quotaWarned = true;
      toast('حافظهٔ مرورگر پر است — پروژه را دستی ذخیره کنید (Ctrl+S)', 'wn', 7000);
    }
  }, 350);
}
const saveStyles = () => { LS.set('ms6.styles', JSON.stringify(S.styles)); autosave(); };
const saveSettings = () => { LS.set('ms6.settings', JSON.stringify(S.settings)); };

/* ============================================================
   UI SYNC
   ============================================================ */
const bubbles = i => S.doc[i] || [];
function placedSet(i) {
  const p = S.pages[i]; const s = new Set();
  /* پیش‌نویس‌های دستیار «گذاشته‌شده» حساب نمی‌شوند تا پیشرفت فصل درست بماند */
  if (p) for (const L of p.layers) if (L.bid && !L.draft) s.add(L.bid);
  return s;
}
/* lines the user removed from the page ("I do not want this one") are skipped everywhere */
const live = i => bubbles(i).filter(b => !b.skip);
function pageStat(i) { const b = live(i), ps = placedSet(i); return { n: b.length, done: b.filter(x => ps.has(x.id)).length }; }

const CHECK = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="m3.5 8.4 3 3 6-6.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function syncCards() {
  const list = $('#cards'), bs = bubbles(S.cur), ps = placedSet(S.cur);
  list.textContent = '';
  const st = pageStat(S.cur);
  $('#shSub').textContent = S.doc.length ? `صفحهٔ ${faNum(S.cur + 1)} — ${faNum(st.done)} از ${faNum(st.n)} گذاشته شد` : 'هنوز متنی بارگذاری نشده';
  const pct = st.n ? st.done / st.n : 0;
  const c = 2 * Math.PI * 14.5;
  $('#donut').classList.toggle('done', st.n > 0 && st.done === st.n);
  $('#donut .fg').style.strokeDashoffset = c * (1 - pct);
  $('#donutT').textContent = faNum(Math.round(pct * 100)) + '٪';

  const nSkip = bs.filter(b => b.skip).length;
  const shown = bs.filter(b => (!b.skip || S.showSkipped) && (!S.filterLeft || !ps.has(b.id)));
  const skipRow = () => {
    if (!nSkip) return;
    const r = el('div', { class: 'skiprow' });
    r.append(el('span', { text: `${faNum(nSkip)} متن کنار گذاشته شد` }));
    r.append(el('button', { class: 'btn sm gho', type: 'button', 'data-showskip': '1', text: S.showSkipped ? 'پنهان کن' : 'نشان بده' }));
    list.append(r);
  };
  if (!shown.length) {
    list.append(el('div', { class: 'empty-s' }, [
      svg('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M4 5.5A1.5 1.5 0 0 1 5.5 4h13A1.5 1.5 0 0 1 20 5.5v8a1.5 1.5 0 0 1-1.5 1.5H12l-4.5 4v-4h-2A1.5 1.5 0 0 1 4 13.5v-8Z"/></svg>'),
      el('p', { text: !S.doc.length ? 'متن مترجم را بارگذاری یا بچسبانید.' : bs.length ? 'همهٔ بالن‌های این صفحه گذاشته شدند.' : 'برای این صفحه متنی در فایل نبود.' })
    ]));
    skipRow();
    return;
  }
  for (const b of shown) {
    const done = ps.has(b.id), cur = b.id === S.selB && !b.skip;
    const card = el('div', { class: 'card' + (done ? ' placed' : '') + (b.skip ? ' skipped' : ''), 'aria-current': cur ? 'true' : 'false', role: 'button', tabindex: '0', 'data-id': b.id });
    const row = el('div', { class: 'crow' });
    const col = tagHue(b.tag);
    const tg = el('span', { class: 'tag', style: `color:${col};background:${col}22` });
    tg.append(el('i'), document.createTextNode(b.tag));
    row.append(tg);
    if (b.type) row.append(el('span', { class: 'ctype', text: b.type }));
    if (done) { const s = el('span', { class: 'cst' }); s.append(svg(CHECK), document.createTextNode('گذاشته شد')); row.append(s); }
    if (S.pages[S.cur] && S.pages[S.cur].layers.some(l => l.draft && l.bid === b.id))
      row.append(el('span', { class: 'cst ai', text: 'پیش‌نویس دستیار' }));
    if (b.skip) row.append(el('button', { class: 'btn sm gho cunskip', type: 'button', 'data-unskip': b.id, text: 'برگردان', title: 'این متن دوباره در فهرست بیاید' }));
    else if (!done) { const x = el('button', { class: 'cskip', type: 'button', 'data-skip': b.id, title: 'این متن را نمی‌خواهم — از فهرست کنار برود (Ctrl+Z برمی‌گرداند)', 'aria-label': 'کنار گذاشتن متن' }); x.append(svg(I.trash)); row.append(x); }
    const tx = el('div', { class: 'ctx', text: b.text });
    card.append(row, tx);
    requestAnimationFrame(() => { if (tx.scrollHeight > tx.clientHeight + 2) tx.classList.add('clip'); });
    list.append(card);
  }
  skipRow();
  /* keep the line that will be placed next in view (only when it changes, so reading the list is never interrupted) */
  const key = S.cur + '|' + S.selB;
  if (syncCards.last !== key) {
    syncCards.last = key;
    const cc = list.querySelector('[aria-current=true]');
    if (cc) requestAnimationFrame(() => revealIn(cc));
  }
}
/* scroll only the nearest scrolling list (scrollIntoView would also nudge the fixed layout) */
function revealIn(node) {
  let sc = node.parentElement;
  while (sc && sc !== document.body) { const o = getComputedStyle(sc).overflowY; if ((o === 'auto' || o === 'scroll') && sc.scrollHeight > sc.clientHeight) break; sc = sc.parentElement; }
  if (!sc || sc === document.body) return;
  const r = node.getBoundingClientRect(), q = sc.getBoundingClientRect();
  if (r.top < q.top + 4) sc.scrollTop += r.top - q.top - 8;
  else if (r.bottom > q.bottom - 4) sc.scrollTop += r.bottom - q.bottom + 8;
}
function syncStrip() {
  const strip = $('#strip'); strip.textContent = '';
  const n = Math.max(S.pages.length, S.doc.length);
  for (let i = 0; i < n; i++) {
    const st = pageStat(i), has = !!S.pages[i];
    const chip = el('div', { class: 'pchip' + (st.n && st.done === st.n ? ' done' : '') + (has ? '' : ' empty'), 'aria-current': i === S.cur ? 'true' : 'false', role: 'button', tabindex: '0', 'data-pg': i, title: has ? S.pages[i].name : 'عکسی برای این صفحه نیست' });
    chip.append(el('b', { text: faNum(i + 1) }), el('i', { text: st.n ? faNum(st.done) + '/' + faNum(st.n) : '—' }),
      el('span', { class: 'pb', style: 'width:' + (st.n ? st.done / st.n * 100 : 0) + '%' }));
    strip.append(chip);
  }
  const act = strip.querySelector('[aria-current=true]');
  if (act) act.scrollIntoView({ block: 'nearest', inline: 'center' });
}
function syncPagesPanel() {
  const g = $('#pgrid'); g.textContent = '';
  let tot = 0, done = 0;
  for (let i = 0; i < Math.max(S.pages.length, S.doc.length); i++) { const s = pageStat(i); tot += s.n; done += s.done; }
  $('#stPages').textContent = faNum(S.pages.length);
  $('#stBub').textContent = faNum(tot);
  $('#stDone').textContent = faNum(done);
  $('#stLeft').textContent = faNum(tot - done);
  S.pages.forEach((p, i) => {
    const st = pageStat(i);
    const card = el('div', { class: 'pcard' + (st.n && st.done === st.n ? ' done' : ''), 'aria-current': i === S.cur ? 'true' : 'false', role: 'button', tabindex: '0', 'data-pg': i });
    const im = el('img', { class: 'th', alt: '', loading: 'lazy' });
    if (p.thumb) im.src = p.thumb;
    const me = el('div', { class: 'me' });
    me.append(el('b', { text: faNum(i + 1) }), el('i', { text: st.n ? faNum(st.done) + '/' + faNum(st.n) : '—' }));
    card.append(im, me); g.append(card);
  });
  if (!S.pages.length) g.append(el('div', { class: 'empty-s' }, [el('p', { text: 'عکسی بارگذاری نشده.' })]));
}
function updateStatus() {
  syncTitle();
  $('#fPage').textContent = S.pages.length ? faNum(S.cur + 1) + ' از ' + faNum(S.pages.length) : '—';
  const sb = $('#sbPg');
  if (sb) {
    sb.textContent = S.pages.length ? faNum(S.cur + 1) + ' / ' + faNum(S.pages.length) : '—';
    $('#bPgPrev').disabled = !S.pages.length || S.cur <= 0;
    $('#bPgNext').disabled = !S.pages.length || S.cur >= S.pages.length - 1;
  }
  const st = pageStat(S.cur);
  $('#fBub').textContent = st.n ? faNum(st.done) + ' از ' + faNum(st.n) : '—';
  const p = S.pages[S.cur];
  $('#fSize').textContent = p ? `\u2066${faNum(p.w)}\u00d7${faNum(p.h)}\u2069 پیکسل` : '—';
}
function syncInspector() {
  const L = S.sel;
  const mq = $('#mobQuick');
  if (mq) mq.classList.toggle('on', !!(L && S.tool === 'text'));
  $('#noSel').style.display = L ? 'none' : '';
  $('#selBody').style.display = L ? '' : 'none';
  if (!L) return;
  if (document.activeElement !== $('#iText')) $('#iText').value = L.t;
  buildFontSelect(L.font);
  const set = (id, v) => { const n = $(id); if (document.activeElement !== n) n.value = v; };
  set('#iSize', Math.round(L.size)); set('#iSizeR', clamp(Math.round(L.size), 8, 140));
  set('#iWidth', Math.round(L.w)); set('#iWidthR', clamp(Math.round(L.w), 40, 1400));
  set('#iLh', (L.lh || 1.32).toFixed(2)); set('#iLhR', Math.round((L.lh || 1.32) * 100));
  set('#iRot', Math.round(L.rot || 0)); set('#iRotR', Math.round(L.rot || 0));
  set('#iStroke', L.stroke); set('#iStrokeR', clamp(L.stroke, 0, 20));
  set('#iShadow', L.shadow || 0); set('#iShadowR', clamp(L.shadow || 0, 0, 30));
  $('#iColor').value = L.color; set('#iColorT', L.color.toUpperCase());
  $('#iStrokeC').value = L.strokeColor;
  if ($('#iShadowC')) $('#iShadowC').value = L.shadowColor || '#000000';
  $('#iBold').checked = !!L.bold; $('#iItalic').checked = !!L.italic;
  const fi = fontInfo(L.font);
  $('#iBold').disabled = !!(fi && fi.bold);
  $('#iBold').parentElement.title = fi && fi.bold ? 'این فونت ذاتاً ضخیم است' : '';
  $('#invNote').style.display = L.autoInvert ? '' : 'none';
  markSwatches();
}
function syncTitle() {
  const tt = $('#tbTitle'); if (!tt) return;
  const t = (S.meta && S.meta.title) || (S.file ? fileBase(S.file.name) : ''), n = S.pages.length;
  tt.textContent = t || (n ? 'پروژهٔ بی‌نام' : 'پروژهٔ تازه');
  let tot = 0, done = 0;
  for (let i = 0; i < Math.max(n, S.doc.length); i++) { const s = pageStat(i); tot += s.n; done += s.done; }
  $('#tbSub').textContent = n ? faNum(n) + ' صفحه' + (tot ? ' · ' + faNum(done) + ' از ' + faNum(tot) + ' بالن' : '') : '';
  const dirty = !!((n || S.doc.length) && window.__msDirty && window.__msDirty());
  const dot = $('#tbDot'); dot.classList.toggle('wn', dirty); dot.classList.toggle('ok', !dirty && n > 0);
  $('#tbDoc').title = (S.file && S.file.path ? S.file.path + '\n' : '') + (!n ? 'هنوز عکسی بارگذاری نشده' : dirty ? 'تغییرات هنوز در فایل ذخیره نشده‌اند — Ctrl+S' : 'ذخیره شده');
  const dt = t ? t + (dirty ? ' •' : '') + ' — Mobin Studio' : 'Mobin Studio';
  if (document.title !== dt) document.title = dt;
}
function syncAll() {
  document.body.classList.toggle('noPages', !S.pages.length);
  const blank = !S.pages.length && !S.doc.length;
  if (blank !== S.wasBlank) {
    const first = S.wasBlank === undefined; S.wasBlank = blank;
    if (blank) closePanels();
    else if (!NARROW()) { $('#script').classList.remove('hide'); $('#inspect').classList.remove('hide'); syncPanelMode(); if (!first) refitSoon(); }
    else if (!first) togglePanel('script', true);
  }
  syncSinglePageMode();
  syncCards(); syncStrip(); syncPagesPanel(); syncInspector(); updateStatus();
  if (isSinglePageMob()) render(S.cur); else renderAll();
  $('#welcome').style.display = S.pages.length ? 'none' : '';
  for (const p of S.pages) if (p.wrap) p.wrap.classList.toggle('cur', S.pages[S.cur] === p);
}
function syncLight() {
  syncCards(); syncStrip(); updateStatus();
  for (const p of S.pages) if (p.wrap) p.wrap.classList.toggle('cur', S.pages[S.cur] === p);
}

/* ---------- swatches ---------- */
const SW_TEXT = ['#111111', '#FFFFFF', '#E8372C', '#2255CC', '#1E8A4C', '#8A3FBF', '#C9881F', '#6B6B6B'];
const SW_STROKE = ['#FFFFFF', '#000000', '#FFE44D', '#E8372C', '#2255CC', '#1E8A4C'];
function buildSwatches() {
  const mk = (host, arr, apply) => {
    host.textContent = '';
    for (const c of arr) host.append(el('button', { class: 'sw', style: 'background:' + c, 'data-c': c, title: c, type: 'button', onclick: () => apply(c) }));
  };
  mk($('#swText'), SW_TEXT, c => { if (!S.sel) return; pushHist(); S.sel.color = c; S.sel.autoInvert = false; afterEdit(); });
  mk($('#swStroke'), SW_STROKE, c => { if (!S.sel) return; pushHist(); S.sel.strokeColor = c; if (!S.sel.stroke) S.sel.stroke = 3; afterEdit(); });
}
function markSwatches() {
  const L = S.sel; if (!L) return;
  $$('#swText .sw').forEach(b => b.setAttribute('aria-pressed', b.dataset.c.toLowerCase() === L.color.toLowerCase()));
  $$('#swStroke .sw').forEach(b => b.setAttribute('aria-pressed', b.dataset.c.toLowerCase() === L.strokeColor.toLowerCase()));
}

/* ---------- font select ---------- */
function buildFontSelect(value) {
  const sel = $('#iFont');
  const sig = [...fontReg.keys()].join('|');
  if (sel.dataset.sig !== sig) {
    sel.textContent = ''; sel.dataset.sig = sig;
    const groups = { hq: el('optgroup', { label: 'فونت‌های باکیفیت' }), b: el('optgroup', { label: 'فونت‌های کلاسیک' }), u: el('optgroup', { label: 'فونت‌های شما' }) };
    for (const f of fontReg.values()) {
      const g = f.hq ? groups.hq : groups[f.kind];
      if (!g) continue;
      g.append(el('option', { value: f.id, text: f.label + (f.bold ? ' (ضخیم)' : '') }));
    }
    for (const g of Object.values(groups)) if (g.children.length) sel.append(g);
  }
  if (value && ![...sel.options].some(o => o.value === value)) {
    const f = fontInfo(value);
    sel.append(el('option', { value, text: (f ? f.label : value.slice(2)) + ' (سیستم)' }));
  }
  if (document.activeElement !== sel) sel.value = value || '';
}

/* ---------- commit helpers ---------- */
function afterEdit(light) {
  render(S.cur);
  syncInspector();
  if (!light) { syncCards(); syncStrip(); updateStatus(); }
  autosave();
}
function selectLayer(L, scroll) {
  S.sel = L;
  if (L && L.bid) {
    const b = bubbles(S.cur).find(x => x.id === L.bid);
    if (b) S.selB = b.id;
  }
  syncInspector(); render(S.cur); syncCards();
  if (L && scroll) setPanel('layer');
}
/* lines the user does not want on the page: out of the list, never picked automatically */
function skipLine(id, on) {
  const b = bubbles(S.cur).find(x => x.id === id); if (!b) return;
  if (on && placedSet(S.cur).has(id)) return toast('این متن روی صفحه است — اول لایه‌اش را پاک کنید', 'wn');
  pushHist();
  b.skip = !!on;
  if (on && S.selB === id) pickNextBubble();
  if (!on) S.selB = id;
  syncCards(); syncStrip(); updateStatus(); syncPagesPanel(); render(S.cur); autosave();
  if (on) toast('متن کنار گذاشته شد — Ctrl+Z برمی‌گرداند', 'i', 3200);
}
/* scroll the stage so a part of a page (image pixels) is in view */
function revealRect(i, r, always) {
  const p = S.pages[i], st = $('#stage'); if (!p || !p.cv || !st) return;
  const sr = st.getBoundingClientRect(), cr = p.cv.getBoundingClientRect(), k = cr.height / p.h;
  const top = cr.top + r.y0 * k, bot = cr.top + r.y1 * k, left = cr.left + r.x0 * k, right = cr.left + r.x1 * k;
  const inView = top >= sr.top + 24 && bot <= sr.bottom - 24 && left >= sr.left - 2 && right <= sr.right + 2;
  if (inView && !always) return;
  const dy = (top + bot) / 2 - (sr.top + sr.height * .45);
  const dx = (right - left) > sr.width ? 0 : (left + right) / 2 - (sr.left + sr.width / 2);
  S.navLock = Date.now();
  st.scrollTo({ top: st.scrollTop + dy, left: st.scrollLeft + dx, behavior: 'smooth' });
}
/* placed text from the list: bring it into view and flash it */
function focusLayer(L, i) {
  const m = layout(L);
  revealRect(i, { x0: L.x - L.w / 2, x1: L.x + L.w / 2, y0: L.y - m.h / 2, y1: L.y + m.h / 2 }, true);
  flashLayer(L, i);
}
let flashT = 0;
function flashLayer(L, i) {
  S.flash = { L, t: performance.now() };
  clearTimeout(flashT);
  const step = () => {
    if (!S.flash) return;
    if (performance.now() - S.flash.t > 1100) { S.flash = null; render(i); return; }
    render(i); flashT = setTimeout(step, 70);
  };
  step();
}
function gotoPage(i, scroll = true) {
  if (i < 0 || i >= Math.max(S.pages.length, S.doc.length)) return;
  const old = S.cur; S.cur = i; S.sel = null;
  pickNextBubble();
  syncSinglePageMode();
  if (old !== i && !isSinglePageMob()) render(old);
  if (scroll && S.pages[i] && S.pages[i].wrap) {
    if (isSinglePageMob()) $('#stage').scrollTop = 0;
    else S.pages[i].wrap.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }
  syncAll();
  if (isSinglePageMob()) sharpenSoon(10);
}
function pickNextBubble() {
  const bs = live(S.cur), ps = placedSet(S.cur);
  const n = bs.find(b => !ps.has(b.id));
  S.selB = n ? n.id : (bs[0] ? bs[0].id : null);
}
function currentBubble() { return bubbles(S.cur).find(b => b.id === S.selB) || null; }

/* ============================================================
   IMAGES
   ============================================================ */
const natSort = (a, b) => String(a).localeCompare(String(b), 'en', { numeric: true, sensitivity: 'base' });
function releasePages() {
  for (const p of S.pages) {
    if (p.url) { try { URL.revokeObjectURL(p.url); } catch (e) { } p.url = null; }
    if (p.cv) { p.cv.width = p.cv.height = 0; }
    dropCleanCv(p);
    p.img = null; p.cx = null; p.cv = null; p.blob = null;
  }
  PIXCACHE.clear(); BLKCACHE.clear(); BALCACHE.clear();
}
async function loadImages(fileList, keepWork, ordered) {
  let src = [...fileList];
  if (src.some(f => /\.zip$/i.test(f.name) || /zip/i.test(f.type || ''))) src = await expandZips(src);
  const files = src.filter(f => /^image\//.test(f.type) || /\.(png|jpe?g|webp|gif|bmp|avif)$/i.test(f.name));
  if (!ordered) files.sort((a, b) => natSort(a.name, b.name));
  if (!files.length) { if (!src.some(f => /\.zip$/i.test(f.name))) toast('فایل عکسی پیدا نشد', 'wn'); return; }

  const hasWork = !keepWork && S.pages.some(p => p.layers.length);
  if (hasWork && !await ask('عکس‌های تازه بارگذاری شود؟',
    `${faNum(S.pages.reduce((a, p) => a + p.layers.length, 0))} متن روی عکس‌های فعلی گذاشته‌اید. با بارگذاری عکس تازه همهٔ آن‌ها پاک می‌شوند. اگر می‌خواهید نگهشان دارید، اول پروژه را ذخیره کنید.`,
    'بله، پاک کن', 'انصراف')) return;

  busy.show('بارگذاری عکس‌ها…');
  const loaded = [], bad = [];
  for (let i = 0; i < files.length; i++) {
    busy.set(i, files.length, files[i].name);
    const f = files[i];
    let url = null;
    try {
      url = URL.createObjectURL(f);
      const img = new Image();
      img.src = url;
      await img.decode();
      if (!img.naturalWidth || !img.naturalHeight) throw new Error('empty');
      loaded.push({ name: f.name.replace(/\.[^.]+$/, ''), img, url, blob: f, w: img.naturalWidth, h: img.naturalHeight, layers: [], cleans: [] });
      url = null; // owned by the loaded page from here on
    } catch (e) { if (url) { try { URL.revokeObjectURL(url); } catch (e2) { } } bad.push(f.name); }
    if (i % 4 === 3) await nextFrame();
  }
  busy.hide();
  if (!loaded.length) { toast('هیچ‌کدام از عکس‌ها باز نشد', 'er', 6000); return; }

  if (!keepWork && S.pages.length) S.file = null;   // other pictures = another document
  releasePages();
  S.pages = loaded;
  buildCanvases();
  clearHist();
  S.cur = 0; S.sel = null; pickNextBubble();
  fitZoom(); syncAll(); makeThumbs();
  $('#stage').scrollTop = 0;
  autosave();

  if (S.pendingCleans) { const cs = S.pendingCleans; S.pendingCleans = null; applyCleans(cs); }
  if (S.pending) {
    const n = S.pending; S.pending = null;
    applyLayers(n);
    const got = S.pages.reduce((a, p) => a + p.layers.length, 0);
    if (S.imgNames.length && S.imgNames.length !== loaded.length)
      toast(`کار ذخیره‌شده برای ${faNum(S.imgNames.length)} صفحه بود ولی ${faNum(loaded.length)} عکس باز شد`, 'wn', 6500);
    if (got && !ordered) toast(`${faNum(got)} لایهٔ ذخیره‌شده برگشت`, 'ok');
    pickNextBubble(); syncAll(); autosave();
    if (got) offerFontFix();
  }

  if (bad.length) toast(`${faNum(bad.length)} عکس باز نشد و رد شد: ${bad.slice(0, 2).join('، ')}${bad.length > 2 ? '…' : ''}`, 'wn', 7000);
  else if (!ordered) toast(`${faNum(loaded.length)} صفحه بارگذاری شد`, 'ok');
  if (S.doc.length && S.doc.length !== loaded.length)
    toast(`توجه: متن ${faNum(S.doc.length)} صفحه دارد ولی ${faNum(loaded.length)} عکس بارگذاری شد`, 'wn', 6500);
}
function buildCanvases() {
  const host = $('#pages'); host.textContent = '';
  S.pages.forEach((p, i) => {
    const wrap = el('div', { class: 'pw', 'data-pg': i });
    const cv = document.createElement('canvas');
    cv.width = p.w; cv.height = p.h; p.bw = p.w; p.bh = p.h;
    cv.style.width = Math.round(p.w * S.zoom) + 'px'; cv.style.height = Math.round(p.h * S.zoom) + 'px';
    p.cv = cv; p.cx = cv.getContext('2d');
    p.wrap = wrap;
    wrap.append(el('span', { class: 'pnum', text: faNum(i + 1) }), cv);
    host.append(wrap);
    cv.addEventListener('pointerdown', e => onDown(e, i));
    cv.addEventListener('wheel', e => onWheel(e, i), { passive: false });
    cv.addEventListener('contextmenu', e => { if (S.sel) e.preventDefault(); });
  });
}
async function makeThumbs() {
  for (let i = 0; i < S.pages.length; i++) {
    const p = S.pages[i];
    try {
      const tw = 150, th = Math.max(1, Math.round(tw * Math.min(p.h / p.w, 1.9)));
      const c = document.createElement('canvas'); c.width = tw; c.height = th;
      const x = c.getContext('2d');
      x.fillStyle = '#15171A'; x.fillRect(0, 0, tw, th);
      x.drawImage(p.img, 0, 0, p.w, Math.min(p.h, p.w * 1.9), 0, 0, tw, th);
      p.thumb = c.toDataURL('image/jpeg', .6);
      c.width = c.height = 0;
    } catch (e) { }
    if (i % 3 === 2) await nextFrame();
  }
  syncPagesPanel();
}

/* ============================================================
   TEXT FILE READING (encoding fallback)
   ============================================================ */
async function readTextFile(file) {
  const buf = await file.arrayBuffer(), u = new Uint8Array(buf);
  if (u[0] === 0xFF && u[1] === 0xFE) return { text: new TextDecoder('utf-16le').decode(buf), enc: 'UTF-16' };
  if (u[0] === 0xFE && u[1] === 0xFF) return { text: new TextDecoder('utf-16be').decode(buf), enc: 'UTF-16' };
  let t = new TextDecoder('utf-8').decode(buf);
  if (t.includes('\uFFFD')) {
    for (const enc of ['windows-1256', 'iso-8859-6']) {
      try {
        const alt = new TextDecoder(enc).decode(buf);
        if (!alt.includes('\uFFFD') && /[آ-ی]/.test(alt)) return { text: alt, enc: 'Windows-1256' };
      } catch (e) { }
    }
  }
  return { text: t, enc: 'UTF-8' };
}

/* ============================================================
   APPLY SCRIPT
   ============================================================ */
function applyScript(raw, quiet) {
  if (!raw || !raw.trim()) return toast('متن خالی است', 'wn');
  const keepLayers = S.pages.map(p => p.layers.slice());
  const wasSkip = new Map(); for (const b of S.doc.flat()) if (b.skip) wasSkip.set(b.id, b.raw);
  const r = parseScript(raw, S.settings);
  /* snapshot the old document before replacing its parsed text */
  const hadWork = S.pages.some(p => p.layers && p.layers.length) || S.doc.length > 0;
  if (hadWork) pushHist();
  S.raw = raw;
  S.rawDoc = r.doc;
  S.doc = shiftDoc(r.doc, S.shift);
  for (const b of S.doc.flat()) { style(b.tag); if (wasSkip.has(b.id) && wasSkip.get(b.id) === b.raw) b.skip = true; }
  remapTagFonts();
  /* layers survive: ids are deterministic (page:index) */
  S.pages.forEach((p, i) => {
    p.layers = (keepLayers[i] || []).map(L => {
      const b = (S.doc[i] || []).find(x => x.id === L.bid);
      if (b) L.t = b.text;
      return L;
    });
  });
  if (!hadWork) clearHist();
  S.cur = clamp(S.cur, 0, Math.max(0, Math.max(S.pages.length, S.doc.length) - 1));
  pickNextBubble();
  saveStyles(); syncAll(); autosave();
  renderReport(r, '#parseReport'); renderReport(r, '#pasteReport');
  offerFontFix();
  if (!quiet) {
    toast(`${faNum(r.doc.length)} صفحه و ${faNum(r.doc.flat().length)} بالن خوانده شد`, 'ok');
    if (S.pages.length && S.pages.length !== S.doc.length) offerAlign();
  }
  return r;
}

/* ============================================================
   SCRIPT <-> IMAGE ALIGNMENT
   text page 1 lands on image (shift+1); ids stay "page:index"
   ============================================================ */
function shiftDoc(doc, k) {
  k = Math.round(num(k, 0, -500, 500));
  if (!Array.isArray(doc)) return [];
  if (!k) return doc.map((g, i) => g.map((b, j) => ({ ...b, id: i + ':' + j })));
  const out = k > 0 ? Array.from({ length: k }, () => []).concat(doc) : doc.slice(-k);
  return out.map((g, i) => g.map((b, j) => ({ ...b, id: i + ':' + j })));
}
/* re-apply a new shift value; keeps already placed layers tied to their page */
function setShift(k, quiet) {
  k = Math.round(num(k, 0, -500, 500));
  if (!S.rawDoc.length) { S.shift = k; return; }
  pushHist();
  S.shift = k;
  S.doc = shiftDoc(S.rawDoc, k);
  for (const b of S.doc.flat()) style(b.tag);
  S.pages.forEach((p, pi) => {
    const pgDoc = S.doc[pi] || [];
    p.layers.forEach((L, li) => {
      if (L.bid) {
        const idx = parseInt(String(L.bid).split(':')[1] || '0', 10);
        const nb = pgDoc[idx];
        if (nb) { L.bid = nb.id; L.t = nb.text; L.tag = nb.tag; }
      }
    });
  });
  S.cur = clamp(S.cur, 0, Math.max(0, Math.max(S.pages.length, S.doc.length) - 1));
  S.selB = null; pickNextBubble();
  saveStyles(); syncAll(); autosave();
  if (!quiet) toast(k ? `متن ${faNum(Math.abs(k))} صفحه ${k > 0 ? 'جلو' : 'عقب'} رفت` : 'هم‌ترازی برداشته شد', 'ok');
}
/* soft nudge when counts differ */
function offerAlign() {
  const d = S.doc.length, p = S.pages.length;
  toast(`متن ${faNum(d)} صفحه دارد ولی ${faNum(p)} عکس باز است — برای هم‌تراز کردن روی «هم‌ترازی» بزنید`, 'wn', 7000);
  const b = $('#bAlign'); if (b) { b.classList.add('pulse'); setTimeout(() => b.classList.remove('pulse'), 6000); }
}
function renderReport(r, sel) {
  const host = $(sel); if (!host) return;
  host.textContent = '';
  const box = el('div', { class: 'note' + (r.warn.length ? ' w' : '') });
  box.append(svg(r.warn.length ? ICONS.wn : ICONS.ok));
  const txt = el('span');
  txt.append(el('b', { text: `${faNum(r.doc.length)} صفحه، ${faNum(r.doc.flat().length)} بالن، ${faNum(r.tags.length)} تگ` }));
  txt.append(el('br'));
  txt.append(document.createTextNode(r.numbered ? `شمارهٔ صفحه‌ها از متن خوانده شد.` : 'شمارهٔ صفحه پیدا نشد؛ ترتیب خطوط استفاده شد.'));
  if (r.warn.length) {
    txt.append(el('br'));
    txt.append(document.createTextNode(`${faNum(r.warn.length)} هشدار: `));
    txt.append(document.createTextNode(r.warn.slice(0, 3).map(w => w.msg).join('؛ ') + (r.warn.length > 3 ? ' …' : '')));
  }
  box.append(txt); host.append(box);
  if (r.tags.length) {
    const row = el('div', { style: 'display:flex;gap:5px;flex-wrap:wrap;margin-top:10px' });
    for (const t of r.tags) { const c = tagHue(t); const s = el('span', { class: 'tag', style: `color:${c};background:${c}22` }); s.append(el('i'), document.createTextNode(t)); row.append(s); }
    host.append(row);
  }
}

/* ============================================================
   POINTER
   ============================================================ */
const toImg = (e, i) => {
  const p = S.pages[i], r = p.cv.getBoundingClientRect();
  return { x: (e.clientX - r.left) * p.w / r.width, y: (e.clientY - r.top) * p.h / r.height };
};
function hitLayer(L, x, y, pad = 0) {
  const m = layout(L), a = -(L.rot || 0) * Math.PI / 180;
  const dx = x - L.x, dy = y - L.y;
  const u = dx * Math.cos(a) - dy * Math.sin(a), v = dx * Math.sin(a) + dy * Math.cos(a);
  const hw = L.w / 2 + 7, hh = m.h / 2 + 7;
  if (Math.abs(u) > hw + 8 + pad || Math.abs(v) > hh + 8 + pad) return 0;
  const edge = Math.min(9 + pad * .6, hw * .45);                                     // pad: finger margin (touch)
  if (Math.abs(Math.abs(u) - hw) <= edge && Math.abs(v) <= hh + pad * .5) return u > 0 ? 2 : 3;   // edge handle
  return 1;
}
function onDown(e, i) {
  if (e.button !== 0 && e.pointerType === 'mouse') return;
  if (e.pointerType === 'touch' && e.isPrimary === false) return;
  const o = toImg(e, i);
  if (S.tool === 'clean') {
    e.preventDefault();
    if (i !== S.cur) { const old = S.cur; S.cur = i; S.sel = null; pickNextBubble(); render(old); }
    pushHist();
    const erase = e.altKey || e.shiftKey || e.ctrlKey || e.metaKey;
    const done = erase ? removeCleanAt(i, o.x, o.y) : addClean(i, o.x, o.y);
    if (!done) { S.hist.pop(); updateHistBtns(); return; }
    render(i); syncLight(); syncPagesPanel(); autosave();
    return;
  }
  let switched = false;
  if (i !== S.cur) { const old = S.cur; S.cur = i; S.sel = null; pickNextBubble(); render(old); switched = true; }
  const p = S.pages[i];

  const fpad = e.pointerType === 'touch' ? 14 / (S.zoom || 1) : 0;
  for (let k = p.layers.length - 1; k >= 0; k--) {
    const L = p.layers[k], h = hitLayer(L, o.x, o.y, fpad);
    if (!h) continue;
    pushHist();
    S.drag = { mode: h === 1 ? 'move' : 'width', o, x: L.x, y: L.y, w: L.w, i, side: h, moved: false };
    try { e.target.setPointerCapture(e.pointerId); } catch (err) { }
    selectLayer(L, true);
    if (switched) syncLight();
    e.preventDefault();
    return;
  }
  const b = currentBubble();
  if (!switched && b && !b.skip && !placedSet(i).has(b.id)) {
    if (S.settings.dragBox && e.pointerType !== 'touch') {
      S.drag = { mode: 'drawbox', o, cur: o, i, b, moved: false };
      try { e.target.setPointerCapture(e.pointerId); } catch (err) { }
      e.preventDefault();
      return;
    }
    pushHist();
    const L = placeBubble(b, o.x, o.y);
    /* auto-advance: the next click places the next line of the script (afterPlace selects the placed one) */
    afterPlace(i, L);
    e.preventDefault();
    return;
  }
  /* a click beside the selected text only deselects; the next click places the next line */
  if (!switched && b && placedSet(i).has(b.id)) pickNextBubble();
  S.sel = null; selectLayer(null); if (switched) syncLight(); render(i);
}
function onMove(e) {
  if (!S.drag) return;
  const d = S.drag, o = toImg(e, d.i);
  if (d.mode === 'drawbox') {
    d.cur = o;
    if (Math.hypot(o.x - d.o.x, o.y - d.o.y) > 18) d.moved = true;
    render(d.i);
    return;
  }
  if (!S.sel) return;
  const L = S.sel;
  d.moved = true;
  if (d.mode === 'move') {
    L.x = Math.round(d.x + (o.x - d.o.x)); L.y = Math.round(d.y + (o.y - d.o.y));
    /* 8.4.0 — چسبیدن به مرکز/لبه‌ها؛ Alt موقتاً خاموشش می‌کند */
    if (S.settings.smartGuides !== false && !e.altKey) snapLayerExtras(L);
    else S.guides = null;
  }
  else { const dx = (o.x - d.o.x) * (d.side === 2 ? 2 : -2); L.w = clamp(Math.round(d.w + dx), 30, S.pages[d.i].w * 2); }
  render(d.i);
}
function onUp() {
  if (!S.drag) return;
  const d = S.drag; S.drag = null; S.guides = null;
  if (d.mode === 'drawbox') {
    const i = d.i, b = d.b;
    pushHist();
    let L;
    if (d.moved) {
      const x0 = Math.min(d.o.x, d.cur.x), x1 = Math.max(d.o.x, d.cur.x);
      const y0 = Math.min(d.o.y, d.cur.y), y1 = Math.max(d.o.y, d.cur.y);
      const cw = Math.max(50, x1 - x0), ch = Math.max(28, y1 - y0), cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      const bg = sampleBg(i, cx, cy, cw, ch);
      const customBox = { x0, y0, x1, y1, cx, cy, cw, ch, kind: 'box', lum: bg.lum, custom: true };
      L = placeBubble(b, cx, cy, customBox);
      if (bg.spread > 55 && !L.stroke && !L.shadow) { L.stroke = 3.5; L.strokeColor = bg.lum < 110 ? '#000000' : '#FFFFFF'; }
    } else {
      L = placeBubble(b, d.o.x, d.o.y);
    }
    afterPlace(i, L);
    return;
  }
  const moved = d.moved;
  if (!moved) S.hist.pop();
  else { syncInspector(); autosave(); }
  if (d.mode === 'move') render(d.i);      // 8.4.0 — خطوط راهنما از بوم پاک شوند
  updateHistBtns();
}
addEventListener('pointermove', onMove, { passive: true });
addEventListener('pointerup', onUp);
addEventListener('pointercancel', onUp);

function onWheel(e, i) {
  if (e.ctrlKey || e.metaKey) { e.preventDefault(); setZoom(S.zoom * (e.deltaY < 0 ? 1.12 : 1 / 1.12), { x: e.clientX, y: e.clientY }); return; }
  if (e.altKey && S.sel && i === S.cur) {
    e.preventDefault(); pushHistSoon();
    S.sel.size = clamp(Math.round(S.sel.size + (e.deltaY < 0 ? 1 : -1)), 6, 400);
    afterEdit(true); autosave();
  }
}
/* track the page the user is looking at */
let scrollTimer = 0;
$('#stage').addEventListener('scroll', () => sharpenSoon(160), { passive: true });
$('#stage').addEventListener('scroll', () => {
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    if (!S.pages.length || S.drag) return;
    if (S.navLock && Date.now() - S.navLock < 900) return;
    const mid = innerHeight * .42;
    let best = S.cur, bestD = 1e9;
    S.pages.forEach((p, i) => { if (!p.wrap) return; const r = p.wrap.getBoundingClientRect(); const d = (r.top <= mid && r.bottom >= mid) ? 0 : Math.min(Math.abs(r.top - mid), Math.abs(r.bottom - mid)); if (d < bestD) { bestD = d; best = i; } });
    if (best !== S.cur) { const old = S.cur; S.cur = best; S.sel = null; pickNextBubble(); render(old); syncInspector(); syncLight(); syncPagesPanel(); }
  }, 110);
}, { passive: true });

/* ============================================================
   EXPORT
   ============================================================ */
const MIME = { png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp' };
/* export size: 1 = the image's own size; 2 / 3 = that many times larger.
   Lettering is then painted with 4× / 9× the pixels, so its edges stay smooth
   even when the page is zoomed in or shown on a large / high-DPI screen. */
const EXP_MAX_SIDE = 32000, EXP_MAX_PX = 120e6;
const expScale = () => { const k = +S.settings.scale; return k === 2 || k === 3 ? k : 1; };
function expSize(p) {
  const k = Math.max(1, Math.min(expScale(), EXP_MAX_SIDE / Math.max(p.w, p.h), Math.sqrt(EXP_MAX_PX / (p.w * p.h))));
  return { k, W: Math.round(p.w * k), H: Math.round(p.h * k) };
}
function flatten(i) {
  probeAA();                          // Windows font smoothing may have been switched meanwhile
  const p = S.pages[i], { W, H } = expSize(p);
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d');
  x.setTransform(W / p.w, 0, 0, H / p.h, 0, 0);      // everything below is in image pixels
  x.imageSmoothingEnabled = true; x.imageSmoothingQuality = 'high';
  if (S.settings.fmt !== 'png') { x.fillStyle = '#FFFFFF'; x.fillRect(0, 0, p.w, p.h); }
  x.drawImage(p.img, 0, 0, p.w, p.h);
  const cc = cleanCanvas(i); if (cc) x.drawImage(cc, 0, 0, p.w, p.h);
  for (const L of p.layers) drawLayer(x, L, false, true);
  return c;
}
const toBlob = (c, mime, q) => new Promise(r => c.toBlob(r, mime, q));
/* save a file. In the desktop app this opens the Windows "Save as" box and
   resolves only after the file is really on disk: {ok, name, path} | {canceled} | {error} */
async function download(blob, name) {
  const D = window.msDesktop;
  if (D && D.save && blob.size < 1.5e9) {
    try {
      if (S.settings.saveDirPath && D.cmd) {
        try { await D.cmd('setSaveDir', S.settings.saveDirPath); } catch (e) { }
      }
      const buf = await blob.arrayBuffer();
      const r = await D.save(name, buf, !!S.settings.directSave);
      return r || { ok: false };
    } catch (e) {
      return { ok: false, error: String((e && e.message) || e) };
    }
  }
  if (S._dirHandle && S.settings.directSave) {
    try {
      const fh = await S._dirHandle.getFileHandle(name, { create: true });
      const wr = await fh.createWritable();
      await wr.write(blob); await wr.close();
      return { ok: true, name: S._dirHandle.name + '/' + name };
    } catch (e) { console.warn('dirHandle save', e); }
  }
  const a = el('a', { href: URL.createObjectURL(blob), download: name });
  document.body.append(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 8000);
  return Promise.resolve({ ok: true });
}
/* one place that tells the user what happened to a save */
function saved(r, okMsg) {
  if (r && r.ok) { toast(r.name ? okMsg + ' — ' + r.name : okMsg, 'ok', 4200); return true; }
  if (r && r.error) toast('ذخیره نشد: ' + r.error, 'er', 7000);
  return false;
}
async function exportPage() {
  if (!S.pages.length) return toast('عکسی نیست', 'wn');
  const f = S.settings.fmt, c = flatten(S.cur);
  const b = await toBlob(c, MIME[f], f === 'png' ? undefined : S.settings.quality / 100);
  c.width = c.height = 0;
  if (!b) return toast('ساخت فایل خروجی ناموفق بود', 'er');
  saved(await download(b, `${S.pages[S.cur].name}_typeset.${f}`), 'فایل ذخیره شد');
}
async function exportAll() {
  if (!S.pages.length) return toast('عکسی نیست', 'wn');
  const f = S.settings.fmt, files = [];
  busy.show('ساخت فایل ZIP…');
  try {
    let bytes = 0;
    for (let i = 0; i < S.pages.length; i++) {
      busy.set(i, S.pages.length, `صفحهٔ ${faNum(i + 1)} از ${faNum(S.pages.length)}`);
      await nextFrame();
      const c = flatten(i);
      const b = await toBlob(c, MIME[f], f === 'png' ? undefined : S.settings.quality / 100);
      c.width = c.height = 0;
      if (!b) throw new Error('encode');
      const u = new Uint8Array(await b.arrayBuffer());
      bytes += u.length;
      if (bytes > 3.6e9) throw new Error('حجم کل از ۴ گیگابایت بیشتر شد');
      files.push({ name: `${String(i + 1).padStart(3, '0')}_${S.pages[i].name}.${f}`, data: u });
    }
    busy.set(S.pages.length, S.pages.length, 'بسته‌بندی…');
    await nextFrame();
    const zip = makeZip(files);
    busy.hide();
    saved(await download(zip, 'typeset.zip'), `${faNum(files.length)} صفحه در ZIP ذخیره شد`);
  } catch (e) {
    toast('ساخت ZIP ناموفق بود: ' + (e.message || e), 'er', 7000);
  } finally { busy.hide(); }
}

/* ============================================================
   PROJECT FILE
   ============================================================ */
const num = (v, d, a, b) => (typeof v === 'number' && isFinite(v)) ? clamp(v, a, b) : d;
const str = (v, d, max = 400) => (typeof v === 'string') ? v.slice(0, max) : d;
const hex = (v, d) => (typeof v === 'string' && /^#[0-9a-fA-F]{3,8}$/.test(v)) ? v : d;
function cleanLayer(o) {
  if (!o || typeof o !== 'object') return null;
  return {
    bid: typeof o.bid === 'string' ? o.bid.slice(0, 24) : null,
    tag: str(o.tag, 'بدون تگ', 60), t: str(o.t, '', 4000),
    x: num(o.x, 0, -1e5, 1e5), y: num(o.y, 0, -1e5, 1e5),
    w: num(o.w, 200, 10, 2e4), size: num(o.size, 24, 4, 600),
    lh: num(o.lh, 1.32, .5, 4), rot: num(o.rot, 0, -360, 360),
    color: hex(o.color, '#111111'), stroke: num(o.stroke, 0, 0, 60), strokeColor: hex(o.strokeColor, '#FFFFFF'),
    shadow: num(o.shadow, 0, 0, 60), shadowColor: hex(o.shadowColor, '#000000'),
    bold: !!o.bold, italic: !!o.italic,
    font: /^[bus]:/.test(o.font || '') ? String(o.font).slice(0, 80) : defFont(false),
    autoInvert: !!o.autoInvert
  };
}
function cleanStyles(o) {
  const out = {};
  if (o && typeof o === 'object') for (const k of Object.keys(o).slice(0, 300)) {
    const v = o[k]; if (!v || typeof v !== 'object') continue;
    out[String(k).slice(0, 60)] = {
      font: /^[bus]:/.test(v.font || '') ? String(v.font).slice(0, 80) : defFont(false),
      size: num(v.size, 24, 4, 600), color: hex(v.color, '#111111'),
      stroke: num(v.stroke, 0, 0, 60), strokeColor: hex(v.strokeColor, '#FFFFFF'),
      shadow: num(v.shadow, 0, 0, 60), shadowColor: hex(v.shadowColor, '#000000'),
      bold: !!v.bold, italic: !!v.italic, lh: num(v.lh, 1.32, .5, 4)
    };
    if (typeof v.fontAuto === 'boolean') out[String(k).slice(0, 60)].fontAuto = v.fontAuto;
  }
  return out;
}
function cleanDoc(d) {
  if (!Array.isArray(d)) return [];
  return d.slice(0, 2000).map((g, i) => Array.isArray(g) ? g.slice(0, 400).map((b, k) => ({
    id: i + ':' + k, tag: str(b && b.tag, 'بدون تگ', 60), type: str(b && b.type, '', 60),
    raw: str(b && b.raw, '', 4000), text: str(b && b.text, '', 4000),
    ...(b && b.skip ? { skip: true } : {})
  })) : []);
}
function cleanSeeds(arr) {
  if (!Array.isArray(arr)) return [];
  return arr.slice(0, 400).map(o => o && typeof o === 'object' ? {
    x: num(o.x, 0, -1e5, 1e5), y: num(o.y, 0, -1e5, 1e5),
    tol: num(o.tol, 58, 6, 200), grow: num(o.grow, 0, -5, 5),
    color: (typeof o.color === 'string' && /^#[0-9a-fA-F]{6}$/.test(o.color)) ? o.color : ''
  } : null).filter(Boolean);
}
function applyCleans(arr) {
  if (!Array.isArray(arr)) return;
  S.pages.forEach((p, i) => { p.cleans = cleanSeeds(arr[i]); markClean(i); });
}
function projectJSON() {
  return JSON.stringify({
    app: 'mobin-studio', v: 7, at: new Date().toISOString(),
    meta: { title: S.meta.title || '', created: S.meta.created || Date.now(), modified: Date.now() },
    raw: S.raw, doc: S.doc, shift: S.shift,
    layers: S.pages.map(p => p.layers),
    cleans: S.pages.map(p => p.cleans || []),
    rawBoxes: S.pages.map(p => p.rawBoxes || []),
    names: S.pages.map(p => p.name),
    sizes: S.pages.map(p => [p.w, p.h]),
    fonts: Object.keys(S.uploads),
    styles: S.styles, settings: S.settings
  });
}
async function saveProject() {
  const r = await download(new Blob([projectJSON()], { type: 'application/json' }), projName() + '.json');
  if (!saved(r, 'پروژه ذخیره شد (بدون عکس)')) return false;
  savedSeq = editSeq; syncTitle();
  return true;
}
function applyLayers(arr) {
  if (!Array.isArray(arr)) return;
  S.pages.forEach((p, i) => { p.layers = Array.isArray(arr[i]) ? arr[i].map(cleanLayer).filter(Boolean) : []; });
}
/* one entry point used by file / bundle / folder / snapshot */
async function loadProjectObject(o, from) {
  if (!o || typeof o !== 'object') return toast('پروژه خوانده نشد', 'er');
  if (o.app !== 'mobin-studio' && o.app !== 'manhwa-studio' && from === 'file') {
    if (!await ask('فایل ناشناس', 'این فایل با این برنامه ساخته نشده. باز شود؟', 'باز کن')) return;
  }
  if (o.meta && typeof o.meta === 'object') S.meta = { title: str(o.meta.title, '', 120), created: num(o.meta.created, Date.now(), 0, 4e12) };
  S.raw = str(o.raw, '', 2e6);
  S.doc = cleanDoc(o.doc);
  S.shift = Math.round(num(o.shift, 0, -500, 500));
  S.rawDoc = S.shift > 0 ? S.doc.slice(S.shift).map((g, i) => g.map((b, j) => ({ ...b, id: i + ':' + j }))) : S.doc;
  S.styles = Object.assign(cleanStyles(o.styles), {});
  remapTagFonts();
  if (o.settings && typeof o.settings === 'object') for (const k in DEFAULTS)
    if (typeof o.settings[k] === typeof DEFAULTS[k]) S.settings[k] = o.settings[k];
  const layers = Array.isArray(o.layers) ? o.layers : [];
  const cleans = Array.isArray(o.cleans) ? o.cleans : [];
  const rawBoxes = Array.isArray(o.rawBoxes) ? o.rawBoxes : [];
  const names = Array.isArray(o.names) ? o.names : [];
  if (S.pages.length) {
    applyLayers(layers); applyCleans(cleans);
    if (rawBoxes.length) S.pages.forEach((p, i) => { if (Array.isArray(rawBoxes[i])) p.rawBoxes = rawBoxes[i]; });
    BALCACHE.clear();
    offerFontFix();
    if (names.length && names.length !== S.pages.length)
      toast(`پروژه برای ${faNum(names.length)} صفحه بود ولی ${faNum(S.pages.length)} عکس باز است`, 'wn', 6500);
  } else { S.pending = layers; S.pendingCleans = cleans; S.imgNames = names; }
  clearHist(); S.cur = 0; S.sel = null; pickNextBubble();
  readSettingsToUI(); buildFontList(); saveStyles(); renderAll(); syncAll(); autosave();
  S.lastSnapSig = typeof snapSig === 'function' ? snapSig() : '';
  if (from !== 'bundle' && from !== 'folder')
    toast(S.pages.length ? 'پروژه باز شد' : 'پروژه باز شد — حالا عکس‌ها را بارگذاری کنید', 'ok', 5000);
}
async function openProject(file) {
  if (/\.mobin$/i.test(file.name)) {
    const D = window.msDesktop, p = D && D.pathOf ? D.pathOf(file) : '';
    if (S.file && p && S.file.path === p) return toast('این پروژه همین الان باز است', 'i');
    if (!await confirmDiscard('باز کردن «' + fileBase(file.name) + '»')) return;
    if (p && D.openProject) { const r = await D.openProject(p); if (r && r.ok) return openAnyData(r.data, r.path, r.name); }
    return openMobinData(new Uint8Array(await file.arrayBuffer()), null, file.name);
  }
  if (/\.zip$/i.test(file.name)) { S.file = null; return openBundle(file); }
  let o;
  try { o = JSON.parse(await file.text()); } catch (e) { return toast('فایل پروژه خراب است یا JSON معتبر نیست', 'er', 6000); }
  if (!S.pages.length) S.file = null;
  await loadProjectObject(o, 'file');
}

/* ============================================================
   BUBBLE CLEANUP  —  erase original lettering inside a balloon
   ============================================================
   A page keeps only tiny seed records (x, y, tol, grow, color).
   The mask is recomputed from the pixels, so project files stay small.
   ============================================================ */
const CLEAN_MAXPX = 48e6;

function pageCleans(i) { const p = S.pages[i]; if (!p) return []; if (!p.cleans) p.cleans = []; return p.cleans; }
function markClean(i) { const p = S.pages[i]; if (!p) return; p.cleanDirty = true; }
function dropCleanCv(p) { if (p && p.cleanCv) { p.cleanCv.width = p.cleanCv.height = 0; p.cleanCv = null; } }

/* flood fill the balloon background, then close the holes the lettering left */
function cleanPatch(i, seed) {
  const p = S.pages[i], d = pixels(i);
  if (!d) return null;
  const W = p.w, H = p.h;
  const px = clamp(Math.round(seed.x), 0, W - 1), py = clamp(Math.round(seed.y), 0, H - 1);
  const R = Math.round(clamp(Math.min(W, H) * .45, 170, 780));
  const x0 = Math.max(0, px - R), x1 = Math.min(W - 1, px + R);
  const y0 = Math.max(0, py - R), y1 = Math.min(H - 1, py + R);
  const ww = x1 - x0 + 1, hh = y1 - y0 + 1;
  const s0 = (py * W + px) * 4;
  if (d[s0 + 3] < 20) return null;
  const r0 = d[s0], g0 = d[s0 + 1], b0 = d[s0 + 2];
  const tol = clamp(seed.tol || 58, 6, 200);
  const mask = new Uint8Array(ww * hh);
  const qx = new Int32Array(ww * hh), qy = new Int32Array(ww * hh);
  let qh = 0, qt = 0, n = 0, X0 = px, X1 = px, Y0 = py, Y1 = py;
  const ok = (x, y) => { const k = (y * W + x) * 4; return d[k + 3] > 20 && Math.abs(d[k] - r0) + Math.abs(d[k + 1] - g0) + Math.abs(d[k + 2] - b0) < tol; };
  qx[qt] = px; qy[qt++] = py; mask[(py - y0) * ww + (px - x0)] = 1;
  while (qh < qt) {
    const x = qx[qh], y = qy[qh]; qh++; n++;
    if (x < X0) X0 = x; if (x > X1) X1 = x; if (y < Y0) Y0 = y; if (y > Y1) Y1 = y;
    for (let k = 0; k < 4; k++) {
      const nx = x + (k === 0 ? -1 : k === 1 ? 1 : 0), ny = y + (k === 2 ? -1 : k === 3 ? 1 : 0);
      if (nx < x0 || nx > x1 || ny < y0 || ny > y1) continue;
      const vi = (ny - y0) * ww + (nx - x0);
      if (mask[vi]) continue;
      mask[vi] = 1;
      if (!ok(nx, ny)) { mask[vi] = 2; continue; }        // 2 = visited, outside
      if (qt < qx.length) { qx[qt] = nx; qy[qt++] = ny; }
    }
  }
  for (let k = 0; k < mask.length; k++) if (mask[k] === 2) mask[k] = 0;
  if (n < 60) return null;
  if (n > ww * hh * .86) return null;                     // leaked into the page

  /* work inside the region box with a 1px frame so hole finding is simple */
  const bx0 = Math.max(x0, X0 - 1), bx1 = Math.min(x1, X1 + 1);
  const by0 = Math.max(y0, Y0 - 1), by1 = Math.min(y1, Y1 + 1);
  const bw = bx1 - bx0 + 1, bh = by1 - by0 + 1;
  const m = new Uint8Array(bw * bh);
  for (let y = 0; y < bh; y++) for (let x = 0; x < bw; x++)
    m[y * bw + x] = mask[(y + by0 - y0) * ww + (x + bx0 - x0)];

  /* everything not reachable from the frame is a hole (the old lettering) */
  const out = new Uint8Array(bw * bh);
  const st = new Int32Array(bw * bh); let sp = 0;
  const push = k => { if (!out[k] && !m[k]) { out[k] = 1; st[sp++] = k; } };
  for (let x = 0; x < bw; x++) { push(x); push((bh - 1) * bw + x); }
  for (let y = 0; y < bh; y++) { push(y * bw); push(y * bw + bw - 1); }
  while (sp) {
    const k = st[--sp], x = k % bw, y = (k / bw) | 0;
    if (x > 0) push(k - 1); if (x < bw - 1) push(k + 1);
    if (y > 0) push(k - bw); if (y < bh - 1) push(k + bw);
  }
  for (let k = 0; k < m.length; k++) if (!m[k] && !out[k]) m[k] = 1;

  /* grow (+) eats into the balloon outline, shrink (-) keeps a safety ring */
  const g = clamp(Math.round(seed.grow || 0), -5, 5);
  for (let s = 0; s < Math.abs(g); s++) {
    const cp = m.slice();
    for (let y = 1; y < bh - 1; y++) for (let x = 1; x < bw - 1; x++) {
      const k = y * bw + x;
      const nb = cp[k - 1] + cp[k + 1] + cp[k - bw] + cp[k + bw];
      if (g > 0) { if (!cp[k] && nb) m[k] = 1; }
      else { if (cp[k] && nb < 4) m[k] = 0; }
    }
  }

  /* soft 1px edge so the patch does not look cut out */
  const img = new ImageData(bw, bh);
  const px8 = img.data;
  const col = seed.color && /^#[0-9a-fA-F]{6}$/.test(seed.color)
    ? [parseInt(seed.color.slice(1, 3), 16), parseInt(seed.color.slice(3, 5), 16), parseInt(seed.color.slice(5, 7), 16)]
    : [r0, g0, b0];
  for (let y = 0; y < bh; y++) for (let x = 0; x < bw; x++) {
    const k = y * bw + x; if (!m[k]) continue;
    let a = 255;
    if (x && y && x < bw - 1 && y < bh - 1 && (!m[k - 1] || !m[k + 1] || !m[k - bw] || !m[k + bw])) a = 190;
    const o = k * 4;
    px8[o] = col[0]; px8[o + 1] = col[1]; px8[o + 2] = col[2]; px8[o + 3] = a;
  }
  return { img, x: bx0, y: by0, w: bw, h: bh, n };
}

function cleanCanvas(i) {
  const p = S.pages[i];
  if (!p) return null;
  if (!p.cleans || !p.cleans.length) { dropCleanCv(p); p.cleanDirty = false; return null; }
  if (p.cleanCv && !p.cleanDirty) return p.cleanCv;
  if (p.w * p.h > CLEAN_MAXPX) return null;
  dropCleanCv(p);
  const cv = document.createElement('canvas'); cv.width = p.w; cv.height = p.h;
  const cx = cv.getContext('2d');
  const tmp = document.createElement('canvas'), tx = tmp.getContext('2d');
  let bad = 0;
  for (const s of p.cleans) {
    const r = cleanPatch(i, s);
    if (!r) { bad++; continue; }
    tmp.width = r.w; tmp.height = r.h;
    tx.putImageData(r.img, 0, 0);
    cx.drawImage(tmp, r.x, r.y);
  }
  tmp.width = tmp.height = 0;
  p.cleanCv = cv; p.cleanDirty = false; p.cleanBad = bad;
  return cv;
}

function addClean(i, x, y) {
  const p = S.pages[i]; if (!p) return false;
  if (p.w * p.h > CLEAN_MAXPX) { toast('این صفحه برای پاک‌کردن خودکار خیلی بزرگ است', 'wn'); return false; }
  const seed = { x: Math.round(x), y: Math.round(y), tol: S.settings.cleanTol, grow: S.settings.cleanGrow, color: S.settings.cleanAuto ? '' : S.settings.cleanColor };
  const t = cleanPatch(i, seed);
  if (!t) { toast('اینجا ناحیهٔ بسته‌ای پیدا نشد — روی قسمت خالی داخل بالن بزنید یا حساسیت را بیشتر کنید', 'wn', 5000); return false; }
  pageCleans(i).push(seed);
  markClean(i);
  return true;
}
function removeCleanAt(i, x, y) {
  const cs = pageCleans(i);
  let best = -1, bd = 1e9;
  cs.forEach((s, k) => { const d = (s.x - x) ** 2 + (s.y - y) ** 2; if (d < bd) { bd = d; best = k; } });
  if (best < 0 || bd > 140 * 140) return false;
  cs.splice(best, 1); markClean(i); return true;
}
function clearCleans(i) { const p = S.pages[i]; if (!p || !p.cleans || !p.cleans.length) return 0; const n = p.cleans.length; p.cleans = []; markClean(i); return n; }
const cleanCount = () => S.pages.reduce((a, p) => a + ((p.cleans && p.cleans.length) || 0), 0);

function setTool(t) {
  S.tool = t;
  document.body.classList.toggle('toolClean', t === 'clean');
  const b = $('#tClean');
  if (b) { b.classList.toggle('on', t === 'clean'); b.setAttribute('aria-pressed', t === 'clean'); }
  $('#cleanBar').classList.toggle('on', t === 'clean');
  if (t === 'clean' && S.sel) { S.sel = null; selectLayer(null); render(S.cur); }
 
}
function reclean() { S.pages.forEach((p, i) => { if (p.cleans && p.cleans.length) markClean(i); }); renderAll(); }

/* ============================================================
   RESTORE POINTS  (several snapshots in IndexedDB)
   ============================================================ */
const SNAP_MAX = 25, SNAP_BYTES = 9e6;
let snapList = [];          // [{id, at, label, pin, pages, layers, size}]

async function snapLoad() {
  const v = await idb('get', 'snaps');
  snapList = Array.isArray(v) ? v : [];
  return snapList;
}
async function snapSave() { await idb('put', 'snaps', snapList); }

async function makeSnapshot(label, auto) {
  if (!S.pages.length && !S.doc.length) return null;
  const data = projectJSON();
  const rec = {
    id: 'sn' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    at: Date.now(), label: label || (auto ? 'خودکار' : 'دستی'), pin: false, auto: !!auto,
    pages: S.pages.length, layers: S.pages.reduce((a, p) => a + p.layers.length, 0),
    cleans: cleanCount(), size: data.length
  };
  const ok = await idb('put', 'snap:' + rec.id, data);
  if (ok === null && !(await idb('get', 'snap:' + rec.id))) { toast('ساخت نقطهٔ بازگشت ناموفق بود', 'er'); return null; }
  snapList.unshift(rec);
  /* keep it bounded: drop the oldest unpinned ones */
  let total = snapList.reduce((a, s) => a + s.size, 0);
  for (let k = snapList.length - 1; k >= 0 && (snapList.length > SNAP_MAX || total > SNAP_BYTES); k--) {
    if (snapList[k].pin) continue;
    total -= snapList[k].size;
    await idb('del', 'snap:' + snapList[k].id);
    snapList.splice(k, 1);
  }
  await snapSave();
  S.lastSnapSig = snapSig();
  buildSnapList();
  return rec;
}
const snapSig = () => S.pages.length + '|' + S.doc.length + '|' + S.pages.reduce((a, p) => a + p.layers.length, 0) + '|' + cleanCount() + '|' + S.raw.length;

async function restoreSnapshot(id) {
  const rec = snapList.find(s => s.id === id); if (!rec) return;
  const data = await idb('get', 'snap:' + id);
  if (typeof data !== 'string') return toast('دادهٔ این نقطهٔ بازگشت پیدا نشد', 'er');
  if (!await ask('بازگشت به این نقطه', `کار فعلی با «${rec.label}» (${relTime(rec.at)}) جایگزین می‌شود. قبلش یک نقطهٔ بازگشت از وضعیت فعلی ساخته می‌شود.`, 'بازگردان')) return;
  await makeSnapshot('پیش از بازگردانی', true);
  await loadProjectObject(JSON.parse(data), 'snapshot');
  toast('به نقطهٔ بازگشت برگشتیم', 'ok');
}
async function deleteSnapshot(id) {
  const k = snapList.findIndex(s => s.id === id); if (k < 0) return;
  if (!await ask('حذف نقطهٔ بازگشت', `«${snapList[k].label}» حذف شود؟`, 'حذف کن')) return;
  await idb('del', 'snap:' + id); snapList.splice(k, 1); await snapSave(); buildSnapList();
}
async function pinSnapshot(id) { const s = snapList.find(x => x.id === id); if (!s) return; s.pin = !s.pin; await snapSave(); buildSnapList(); }
async function renameSnapshot(id, v) { const s = snapList.find(x => x.id === id); if (!s) return; s.label = String(v || '').slice(0, 60) || 'بدون نام'; await snapSave(); buildSnapList(); }

function relTime(t) {
  const d = Math.round((Date.now() - t) / 1000);
  if (d < 60) return 'همین الان';
  if (d < 3600) return faNum(Math.round(d / 60)) + ' دقیقه پیش';
  if (d < 86400) return faNum(Math.round(d / 3600)) + ' ساعت پیش';
  if (d < 86400 * 7) return faNum(Math.round(d / 86400)) + ' روز پیش';
  return new Date(t).toLocaleDateString('fa-IR');
}
const kb = n => n < 1024 ? faNum(n) + ' بایت' : n < 1048576 ? faNum((n / 1024).toFixed(0)) + ' کیلوبایت' : faNum((n / 1048576).toFixed(1)) + ' مگابایت';

function buildSnapList() {
  const host = $('#snapList'); if (!host) return;
  host.textContent = '';
  if (!snapList.length) { host.append(el('div', { class: 'empty-s' }, [el('p', { text: 'هنوز نقطهٔ بازگشتی ساخته نشده. هر چند دقیقه یک‌بار خودکار ساخته می‌شود.' })])); return; }
  for (const s of snapList) {
    const row = el('div', { class: 'snap' + (s.pin ? ' pin' : '') });
    const nm = el('input', { type: 'text', value: s.label, class: 'snapName' });
    nm.addEventListener('change', () => renameSnapshot(s.id, nm.value));
    const meta = el('div', { class: 'hint', text: `${relTime(s.at)} • ${faNum(s.pages)} صفحه • ${faNum(s.layers)} لایه${s.cleans ? ' • ' + faNum(s.cleans) + ' پاک‌شده' : ''} • ${kb(s.size)}` });
    row.append(el('div', { class: 'snapMain' }, [nm, meta]));
    const acts = el('div', { class: 'snapActs' });
    const pb = el('button', { class: 'btn sm ico gho' + (s.pin ? ' on' : ''), type: 'button', title: s.pin ? 'برداشتن سنجاق' : 'سنجاق (حذف خودکار نشود)' });
    pb.append(svg(I.star)); pb.onclick = () => pinSnapshot(s.id);
    const rb = el('button', { class: 'btn sm', type: 'button', text: 'بازگردانی' }); rb.onclick = () => restoreSnapshot(s.id);
    const db = el('button', { class: 'btn sm ico gho dgr', type: 'button', title: 'حذف' });
    db.append(svg(I.trash)); db.onclick = () => deleteSnapshot(s.id);
    acts.append(pb, rb, db); row.append(acts);
    host.append(row);
  }
}
function startSnapTimer() {
  clearInterval(S.snapTimer);
  S.snapTimer = setInterval(() => {
    if (!S.pages.length && !S.doc.length) return;
    const sig = snapSig();
    if (sig === S.lastSnapSig) return;
    makeSnapshot('خودکار', true);
  }, 4 * 60 * 1000);
}

/* ============================================================
   ZIP READING  (store + deflate)  — for project bundles
   ============================================================ */
const dv = u8 => new DataView(u8.buffer, u8.byteOffset, u8.byteLength);
async function readZip(u8) {
  const v = dv(u8);
  let eo = -1;
  for (let i = u8.length - 22; i >= Math.max(0, u8.length - 66000); i--) if (v.getUint32(i, true) === 0x06054b50) { eo = i; break; }
  if (eo < 0) throw new Error('فایل ZIP معتبر نیست');
  const n = v.getUint16(eo + 10, true);
  let off = v.getUint32(eo + 16, true);
  const out = [];
  const dec = new TextDecoder('utf-8');
  for (let k = 0; k < n; k++) {
    if (v.getUint32(off, true) !== 0x02014b50) break;
    const method = v.getUint16(off + 10, true);
    const csize = v.getUint32(off + 20, true);
    const nameLen = v.getUint16(off + 28, true), extLen = v.getUint16(off + 30, true), cmtLen = v.getUint16(off + 32, true);
    const lho = v.getUint32(off + 42, true);
    const name = dec.decode(u8.subarray(off + 46, off + 46 + nameLen));
    const lNameLen = v.getUint16(lho + 26, true), lExtLen = v.getUint16(lho + 28, true);
    const start = lho + 30 + lNameLen + lExtLen;
    let data = u8.subarray(start, start + csize);
    if (method === 8) {
      if (typeof DecompressionStream !== 'function') throw new Error('این ZIP فشرده است و مرورگر شما بازش نمی‌کند');
      const ds = new DecompressionStream('deflate-raw');
      data = new Uint8Array(await new Response(new Blob([data]).stream().pipeThrough(ds)).arrayBuffer());
    } else if (method !== 0) throw new Error('روش فشرده‌سازی پشتیبانی نمی‌شود');
    out.push({ name, data });
    off += 46 + nameLen + extLen + cmtLen;
  }
  return out;
}

/* ---- raw chapter ZIP → image files ------------------------- */
const ZIMG = /\.(png|jpe?g|webp|gif|bmp|avif)$/i;
const ZMIME = { png: 'image/png', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp',
  gif: 'image/gif', bmp: 'image/bmp', avif: 'image/avif' };
const isZipFile = f => /\.zip$/i.test(f.name) || /zip/i.test(f.type || '');
/** هر ZIP را باز می‌کند و عکس‌هایش را به فهرست فایل‌ها اضافه می‌کند */
async function expandZips(list) {
  const arr = [...list];
  const zips = arr.filter(isZipFile);
  if (!zips.length) return arr;
  const out = arr.filter(f => !isZipFile(f));
  for (const z of zips) {
    busy.show('باز کردن ' + z.name + '…');
    try {
      const items = await readZip(new Uint8Array(await z.arrayBuffer()));
      if (items.some(it => it.name.split('/').pop() === 'project.json')) {
        busy.hide(); await openBundle(z); continue;
      }
      const pics = items.filter(it => ZIMG.test(it.name) &&
        !/(^|\/)__MACOSX\//.test(it.name) && !/(^|\/)\._/.test(it.name));
      if (!pics.length) { toast(`در «${z.name}» عکسی پیدا نشد`, 'wn', 5000); continue; }
      for (const it of pics) {
        const base = it.name.split('/').pop();
        const ext = (base.split('.').pop() || 'png').toLowerCase();
        out.push(new File([it.data], base, { type: ZMIME[ext] || 'image/png' }));
      }
      toast(`${faNum(pics.length)} عکس از ${z.name} باز شد`, 'ok');
    } catch (e) {
      toast(`${z.name}: ${e.message || 'باز نشد'}`, 'er', 6000);
    } finally { busy.hide(); }
  }
  return out;
}

/* ============================================================
   PROJECT BUNDLE  (.zip with images + fonts)
   ============================================================ */
const enc = new TextEncoder();
async function pageBytes(p) {
  if (p.blob) { try { return { u: new Uint8Array(await p.blob.arrayBuffer()), ext: (p.blob.name.match(/\.([a-z0-9]+)$/i) || [, 'png'])[1].toLowerCase() }; } catch (e) { } }
  const c = document.createElement('canvas'); c.width = p.w; c.height = p.h;
  c.getContext('2d').drawImage(p.img, 0, 0);
  const b = await toBlob(c, 'image/png');
  c.width = c.height = 0;
  return { u: new Uint8Array(await b.arrayBuffer()), ext: 'png' };
}
async function saveBundle() {
  if (!S.pages.length) return toast('اول عکس‌ها را بارگذاری کنید', 'wn');
  busy.show('ساخت بستهٔ پروژه…');
  try {
    const files = [{ name: 'project.json', data: enc.encode(projectJSON()) }];
    for (let i = 0; i < S.pages.length; i++) {
      busy.set(i, S.pages.length, `صفحهٔ ${faNum(i + 1)}`); await nextFrame();
      const { u, ext } = await pageBytes(S.pages[i]);
      files.push({ name: `pages/${String(i + 1).padStart(3, '0')}_${safeName(S.pages[i].name)}.${ext}`, data: u });
    }
    for (const nm of Object.keys(S.uploads)) {
      const buf = await idb('get', 'font:' + nm);
      if (buf) files.push({ name: 'fonts/' + safeName(nm) + '.ttf', data: new Uint8Array(buf) });
    }
    const zip = makeZip(files);
    busy.hide();
    if (!saved(await download(zip, projName() + '.mhz.zip'), 'بستهٔ کامل پروژه ذخیره شد')) return false;
    savedSeq = editSeq; syncTitle();
    return true;
  } catch (e) { toast('ساخت بسته ناموفق بود: ' + (e.message || e), 'er', 7000); return false; }
  finally { busy.hide(); }
}
const safeName = s => String(s || 'page').replace(/[\\/:*?"<>|]+/g, '_').slice(0, 60);
const projName = () => safeName(S.meta.title || 'mobin-studio');

async function openBundle(file) {
  if (!await confirmDiscard('باز کردن بستهٔ پروژه')) return;
  busy.show('باز کردن بستهٔ پروژه…');
  try {
    const items = await readZip(new Uint8Array(await file.arrayBuffer()));
    const pj = items.find(f => /(^|\/)project\.json$/i.test(f.name));
    if (!pj) throw new Error('فایل project.json داخل بسته نبود');
    const obj = JSON.parse(new TextDecoder().decode(pj.data));
    const imgs = items.filter(f => /\.(png|jpe?g|webp|gif|bmp|avif)$/i.test(f.name) && !/^__MACOSX/.test(f.name))
      .sort((a, b) => natSort(a.name, b.name))
      .map(f => new File([f.data], f.name.split('/').pop(), { type: 'image/' + (f.name.split('.').pop().toLowerCase().replace('jpg', 'jpeg')) }));
    for (const f of items.filter(f => /^fonts\//i.test(f.name))) {
      const nm = f.name.split('/').pop().replace(/\.[^.]+$/, '');
      if (S.uploads[nm]) continue;
      const buf = f.data.slice().buffer;
      if (await registerFont(fontId('u', nm), nm, buf.slice(0), false, 'u')) { await idb('put', 'font:' + nm, buf.slice(0)); S.uploads[nm] = 1; }
    }
    busy.hide();
    if (imgs.length) await loadImages(imgs, true);
    S.file = null;
    await loadProjectObject(obj, 'bundle');
    toast('بستهٔ پروژه باز شد', 'ok');
  } catch (e) { busy.hide(); toast('باز کردن بسته ناموفق بود: ' + (e.message || e), 'er', 7000); }
}

/* ============================================================
   PROJECT FILE  (.mobin) — one file, like .psd / .aep:
   pictures + script + every text layer + clean-ups + uploaded fonts.
   Layout: "MOBINPRJ" | u32 version | u32 header length | header JSON | data blocks
   ============================================================ */
const MOBIN_MAGIC = 'MOBINPRJ', MOBIN_VER = 1;
async function buildMobin() {
  const proj = JSON.parse(projectJSON());
  const parts = [], index = [];
  let off = 0;
  for (let i = 0; i < S.pages.length; i++) {
    busy.set(i, S.pages.length, `صفحهٔ ${faNum(i + 1)} از ${faNum(S.pages.length)}`);
    const { u, ext } = await pageBytes(S.pages[i]);
    index.push({ kind: 'page', i, name: S.pages[i].name, ext, off, len: u.length });
    parts.push(u); off += u.length;
    if (i % 4 === 3) await nextFrame();
  }
  for (const nm of Object.keys(S.uploads)) {
    const buf = await idb('get', 'font:' + nm); if (!buf) continue;
    const u = new Uint8Array(buf);
    index.push({ kind: 'font', name: nm, off, len: u.length }); parts.push(u); off += u.length;
  }
  const head = enc.encode(JSON.stringify({ app: 'mobin-studio', format: 'mobin', v: MOBIN_VER, saved: new Date().toISOString(), project: proj, blobs: index }));
  const pre = new Uint8Array(16); pre.set(enc.encode(MOBIN_MAGIC), 0);
  const v = new DataView(pre.buffer); v.setUint32(8, MOBIN_VER, true); v.setUint32(12, head.length, true);
  return new Blob([pre, head, ...parts], { type: 'application/x-mobin' });
}
function parseMobin(u8) {
  if (!u8 || u8.length < 16) throw new Error('فایل خالی یا ناقص است');
  if (new TextDecoder().decode(u8.subarray(0, 8)) !== MOBIN_MAGIC) throw new Error('این فایل پروژهٔ Mobin Studio نیست');
  const v = dv(u8), ver = v.getUint32(8, true), hl = v.getUint32(12, true);
  if (ver > MOBIN_VER) throw new Error('این پروژه با نسخهٔ جدیدتر برنامه ذخیره شده — برنامه را به‌روز کنید');
  if (16 + hl > u8.length) throw new Error('فایل ناقص است (کامل ذخیره یا کپی نشده)');
  const h = JSON.parse(new TextDecoder().decode(u8.subarray(16, 16 + hl)));
  const base = 16 + hl;
  const part = b => { const s0 = base + (b.off | 0), e0 = s0 + (b.len | 0); if (s0 < base || e0 > u8.length || e0 < s0) throw new Error('فایل ناقص است'); return u8.subarray(s0, e0); };
  return { h, part };
}
function fileBase(n) { return String(n || '').split(/[\\/]/).pop().replace(/\.mobin$/i, ''); }
function docName() { return (S.meta && S.meta.title) || (S.file ? fileBase(S.file.name) : 'پروژهٔ بی‌نام'); }
/** Ctrl+S: same file, no questions; first time / Ctrl+Shift+S: pick a place */
async function saveMobin(asNew) {
  closeMenus();
  if (!S.pages.length && !S.doc.length) { toast('هنوز چیزی برای ذخیره نیست', 'wn'); return false; }
  if (saveMobin.busy) return false;
  saveMobin.busy = true;
  busy.show('ذخیرهٔ پروژه…');
  try {
    const blob = await buildMobin();
    const D = window.msDesktop;
    const name = (S.file && !asNew ? S.file.name : safeName(S.file ? fileBase(S.file.name) : (S.meta.title || 'پروژه')) + '.mobin');
    let r;
    if (D && D.saveProject) {
      busy.set(1, 1, 'نوشتن روی دیسک…');
      r = await D.saveProject(S.file ? S.file.path : null, name, new Uint8Array(await blob.arrayBuffer()), !!asNew || !S.file);
    } else r = await download(blob, name);
    busy.hide();
    if (!r || !r.ok) { if (r && r.error) toast('ذخیره نشد: ' + r.error, 'er', 7000); return false; }
    if (r.path) S.file = { path: r.path, name: r.name || name };
    savedSeq = editSeq; syncTitle();
    toast('پروژه ذخیره شد — ' + (r.name || name), 'ok', 3200);
    return true;
  } catch (e) { toast('ذخیرهٔ پروژه ناموفق بود: ' + (e.message || e), 'er', 7000); return false; }
  finally { busy.hide(); saveMobin.busy = false; }
}
async function openMobinData(u8, path, name) {
  let P;
  try { P = parseMobin(u8); } catch (e) { toast((e && e.message) || 'فایل باز نشد', 'er', 7000); return false; }
  const { h, part } = P;
  busy.show('باز کردن پروژه…');
  try {
    for (const b of h.blobs || []) if (b.kind === 'font' && b.name && !S.uploads[b.name]) {
      const buf = part(b).slice().buffer;
      if (await registerFont(fontId('u', b.name), b.name, buf.slice(0), false, 'u')) { await idb('put', 'font:' + b.name, buf.slice(0)); S.uploads[b.name] = 1; }
    }
    const pics = (h.blobs || []).filter(b => b.kind === 'page').sort((a, b) => (a.i | 0) - (b.i | 0)).map(b => {
      const ext = String(b.ext || 'png').toLowerCase().replace(/[^a-z0-9]/g, '') || 'png';
      return new File([part(b)], String(b.name || 'page').slice(0, 120) + '.' + ext, { type: ZMIME[ext] || 'image/png' });
    });
    busy.hide();
    releasePages(); S.pages = []; buildCanvases(); S.sel = null;
    await loadProjectObject(h.project, 'bundle');
    if (pics.length) await loadImages(pics, true, true);
    S.file = path ? { path, name: name || fileBase(path) + '.mobin' } : null;
    if (!S.meta.title) S.meta.title = fileBase(name || path || '');
    readSettingsToUI();
    savedSeq = editSeq; syncTitle();
    toast('پروژه باز شد — ' + fileBase(name || path || ''), 'ok', 3500);
    return true;
  } catch (e) { toast('باز کردن پروژه ناموفق بود: ' + (e.message || e), 'er', 7000); return false; }
  finally { busy.hide(); }
}
/* any project file the desktop side read for us */
async function openAnyData(u8, path, name) {
  name = name || fileBase(path);
  if (/\.json$/i.test(name)) {
    let o; try { o = JSON.parse(new TextDecoder().decode(u8)); } catch (e) { return toast('فایل پروژه خراب است یا JSON معتبر نیست', 'er', 6000); }
    S.file = null; return loadProjectObject(o, 'file');
  }
  if (/\.zip$/i.test(name)) { S.file = null; return openBundle(new File([u8], name, { type: 'application/zip' })); }
  return openMobinData(u8, path, name);
}
/* unsaved changes: save / do not save / cancel  -> true = go on */
async function confirmDiscard(what) {
  if (!window.__msDirty || !window.__msDirty()) return true;
  const r = await ask('تغییرات ذخیره شود؟', `تغییرات «${docName()}» هنوز ذخیره نشده. قبل از ${what} ذخیره شود؟`, 'ذخیره کن', 'انصراف', 'ذخیره نکن');
  if (r === true) return saveMobin(false);
  return r === 'alt';
}
async function openProjectDialog() {
  closeMenus();
  const D = window.msDesktop;
  if (!D || !D.openProject) return $('#fProj').click();
  if (!await confirmDiscard('باز کردن پروژهٔ دیگر')) return;
  const r = await D.openProject(null);
  if (!r || !r.ok) { if (r && r.error) toast(r.error, 'er', 6000); return; }
  return openAnyData(r.data, r.path, r.name);
}
async function openRecent(p) {
  closeMenus();
  const D = window.msDesktop; if (!D || !D.openProject) return;
  if (S.file && S.file.path === p) return toast('این پروژه همین الان باز است', 'i');
  if (!await confirmDiscard('باز کردن پروژهٔ دیگر')) return;
  const r = await D.openProject(p);
  if (!r || !r.ok) { toast((r && r.error) || 'فایل باز نشد', 'er', 6000); return fillRecent(); }
  return openAnyData(r.data, r.path, r.name);
}
/* Explorer: double-click on a .mobin while the app is open */
window.__msOpenPath = async (p, nm) => {
  if (!p) return false;
  if (S.file && S.file.path === p) return true;
  if (!await confirmDiscard('باز کردن «' + fileBase(nm || p) + '»')) return false;
  const r = await window.msDesktop.openProject(p);
  if (!r || !r.ok) { toast((r && r.error) || 'فایل باز نشد', 'er', 6000); return false; }
  return openAnyData(r.data, r.path, r.name);
};
async function newProject() {
  closeMenus();
  if (!S.pages.length && !S.doc.length) return toast('پروژه همین الان خالی است', 'i');
  if (!await confirmDiscard('شروع پروژهٔ تازه')) return;
  releasePages(); S.pages = []; buildCanvases();
  S.doc = []; S.rawDoc = []; S.raw = ''; S.shift = 0; S.cur = 0; S.sel = null; S.selB = null;
  S.meta = { title: '', created: Date.now() }; S.file = null;
  S.pending = null; S.pendingCleans = null; S.imgNames = [];
  clearHist(); readSettingsToUI();
  ['#parseReport', '#pasteReport'].forEach(q => { const n = $(q); if (n) n.textContent = ''; });
  syncAll(); autosave(); savedSeq = editSeq; syncTitle();
  toast('پروژهٔ تازه — عکس‌ها و متن را بدهید', 'ok');
}
/* recent projects in the file menu */
async function fillRecent() {
  const host = $('#recentList'); if (!host) return;
  const D = window.msDesktop;
  const list = D && D.cmd ? (await dcmd('recent')) || [] : [];
  host.textContent = '';
  $('#recentHead').style.display = list.length ? '' : 'none';
  for (const r of list.slice(0, 6)) {
    const b = el('button', { class: 'mi rec' + (r.ok ? '' : ' gone'), type: 'button', title: r.path });
    b.append(svg('<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 2.8h6.5L15 6.3v10a1.2 1.2 0 0 1-1.2 1.2H5A1.2 1.2 0 0 1 3.8 16.3V4A1.2 1.2 0 0 1 5 2.8Z"/><path d="M11.2 2.8v3.7H15"/></svg>'));
    const sp = el('span', { text: fileBase(r.name) });
    sp.append(el('small', { text: r.ok ? r.dir || '' : 'پیدا نشد' }));
    b.append(sp);
    b.onclick = e => { e.stopPropagation(); openRecent(r.path); };
    host.append(b);
  }
}

/* the last session belonged to a .mobin: open it from disk (pictures included)
   and put back whatever had not been saved into it yet */
async function reopenAuto(a) {
  const D = window.msDesktop; if (!D || !D.openProject || !a.file || !a.file.path) return false;
  const r = await D.openProject(a.file.path);
  if (!r || !r.ok) { toast('فایل پروژهٔ «' + fileBase(a.file.name || a.file.path) + '» پیدا نشد — فقط متن و لایه‌ها برگشت', 'wn', 7000); return false; }
  if (!await openAnyData(r.data, r.path, r.name)) return false;
  const sig = () => JSON.stringify([S.doc, S.pages.map(p => p.layers), S.pages.map(p => p.cleans || [])]);
  const before = sig();
  if (Array.isArray(a.names) && a.names.length === S.pages.length && a.names.every((n, i) => n === S.pages[i].name)) {
    S.raw = str(a.raw, '', 2e6); S.doc = cleanDoc(a.doc);
    if (typeof a.shift === 'number') S.shift = Math.round(num(a.shift, 0, -500, 500));
    S.rawDoc = S.shift > 0 ? S.doc.slice(S.shift).map((g, i) => g.map((b, j) => ({ ...b, id: i + ':' + j }))) : S.doc;
    if (a.styles) { S.styles = cleanStyles(a.styles); remapTagFonts(); }
    applyLayers(a.L); applyCleans(a.C);
  }
  const changed = sig() !== before;
  clearHist(); pickNextBubble(); buildFontList(); renderAll(); syncAll(); autosave();
  if (!changed) savedSeq = editSeq;
  syncTitle();
  if (changed) toast('تغییراتی که هنوز در فایل ذخیره نشده بود هم برگشت — برای نگه داشتنشان Ctrl+S', 'ok', 6500);
  return true;
}

/* ---------- settings dialog ---------- */
function openSettings(tab) {
  $('#ovSet').classList.add('on');
  if (tab) { const b = $(`#setTabs button[data-t="${tab}"]`); if (b) b.click(); }
}

/* ============================================================
   RAW REFERENCE DIFF & GHOST OVERLAY (NON-BALLOON DETECTOR)
   ============================================================ */
function toggleGhost(on) {
  if (!S.pages.some(p => p.rawImg || (p.rawBoxes && p.rawBoxes.length))) {
    return toast('اول فایل ZIP یا عکس‌های «نسخهٔ خام» را از منوی بارگذاری بدهید', 'wn', 4200);
  }
  S.rawGhost = on === undefined ? !S.rawGhost : !!on;
  document.body.classList.toggle('rawGhost', S.rawGhost);
  const b = $('#bGhost');
  if (b) { b.classList.toggle('on', S.rawGhost); b.setAttribute('aria-pressed', S.rawGhost); }
  render(S.cur);
}

/* Compare raw image against clean image at 1/4 scale to find exact text boxes even when there are no balloons */
function diffRawClean(cleanImg, rawImg, W, H) {
  const f = Math.max(2, Math.round(W / 240));
  const w = Math.max(1, Math.floor(W / f)), h = Math.max(1, Math.floor(H / f)), n = w * h;
  const cv = document.createElement('canvas'); cv.width = w; cv.height = h;
  const cx = cv.getContext('2d', { willReadFrequently: true });
  cx.drawImage(cleanImg, 0, 0, w, h);
  const dc = cx.getImageData(0, 0, w, h).data;
  cx.clearRect(0, 0, w, h);
  cx.drawImage(rawImg, 0, 0, w, h);
  const dr = cx.getImageData(0, 0, w, h).data;
  cv.width = cv.height = 0;

  const m0 = new Uint8Array(n);
  for (let i = 0, k = 0; i < n; i++, k += 4) {
    const diff = Math.abs(dc[k] - dr[k]) + Math.abs(dc[k + 1] - dr[k + 1]) + Math.abs(dc[k + 2] - dr[k + 2]);
    if (diff > 48) m0[i] = 1;
  }
  /* Dilate horizontally & vertically so words/lines of a block join together */
  const rx = Math.max(3, Math.round(w * 0.045)), ry = Math.max(2, Math.round(w * 0.032));
  const mh = new Uint8Array(n), m = new Uint8Array(n);
  for (let y = 0; y < h; y++) {
    const row = y * w;
    for (let x = 0; x < w; x++) {
      let any = 0;
      for (let dx = -rx; dx <= rx; dx++) { const xx = x + dx; if (xx >= 0 && xx < w && m0[row + xx]) { any = 1; break; } }
      mh[row + x] = any;
    }
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let any = 0;
      for (let dy = -ry; dy <= ry; dy++) { const yy = y + dy; if (yy >= 0 && yy < h && mh[yy * w + x]) { any = 1; break; } }
      m[y * w + x] = any;
    }
  }
  const { st } = balLabel(m, w, h);
  const boxes = [];
  for (let k = 1; k < st.length; k++) {
    const c = st[k];
    const bw = (c.x1 - c.x0 + 1) * f, bh = (c.y1 - c.y0 + 1) * f;
    if (bw < 36 || bh < 18 || bw * bh < 1000) continue;
    if (bw > W * 0.96 && bh > H * 0.4) continue;
    const x0 = Math.max(0, c.x0 * f - 8), y0 = Math.max(0, c.y0 * f - 6);
    const x1 = Math.min(W, (c.x1 + 1) * f + 8), y1 = Math.min(H, (c.y1 + 1) * f + 6);
    const cx0 = (x0 + x1) / 2, cy0 = (y0 + y1) / 2;
    /* measure clean luminance inside this box */
    let sl = 0, cnt = 0;
    for (let yy = c.y0; yy <= c.y1; yy++) for (let xx = c.x0; xx <= c.x1; xx++) {
      const p4 = (yy * w + xx) * 4;
      sl += (dc[p4] * 77 + dc[p4 + 1] * 150 + dc[p4 + 2] * 29) >> 8; cnt++;
    }
    boxes.push({
      x0, y0, x1, y1, cx: cx0, cy: cy0,
      cw: Math.max(60, x1 - x0), ch: Math.max(32, y1 - y0),
      kind: 'box', rawHint: true, lum: cnt ? Math.round(sl / cnt) : 255
    });
  }
  boxes.sort((a, b) => (a.y0 + a.y1) - (b.y0 + b.y1));
  return boxes;
}

async function loadRawImages(fileList) {
  if (!S.pages.length) return toast('اول عکس‌های کلین را بارگذاری کنید، بعد نسخهٔ خام را بدهید', 'wn', 4500);
  let src = [...fileList];
  if (src.some(f => /\.zip$/i.test(f.name) || /zip/i.test(f.type || ''))) src = await expandZips(src);
  const files = src.filter(f => /^image\//.test(f.type) || /\.(png|jpe?g|webp|gif|bmp|avif)$/i.test(f.name));
  files.sort((a, b) => natSort(a.name, b.name));
  if (!files.length) return toast('عکسی در فایل خام پیدا نشد', 'wn');

  busy.show('مقایسهٔ نسخهٔ خام و کلین (پیدا کردن جای متن‌های بدون بالن)…');
  let totalFound = 0, matchedPages = 0;
  try {
    const n = Math.min(S.pages.length, files.length);
    for (let i = 0; i < n; i++) {
      busy.set(i, n, `صفحهٔ ${faNum(i + 1)} از ${faNum(n)}`);
      const f = files[i], p = S.pages[i];
      let url = null;
      try {
        url = URL.createObjectURL(f);
        const img = new Image(); img.src = url;
        await img.decode();
        if (p.rawUrl) { try { URL.revokeObjectURL(p.rawUrl); } catch (e) { } }
        p.rawImg = img; p.rawUrl = url; url = null;
        p.rawBoxes = diffRawClean(p.img, img, p.w, p.h);
        totalFound += p.rawBoxes.length;
        matchedPages++;
      } catch (e) { if (url) { try { URL.revokeObjectURL(url); } catch (e2) { } } }
      if (i % 3 === 2) await nextFrame();
    }
    BALCACHE.clear();
    const bg = $('#bGhost'); if (bg) bg.style.display = '';
    pageBalloons(S.cur, true);
    render(S.cur); autosave();
    toast(`نسخهٔ خام بررسی شد: ${faNum(totalFound)} جای متن در ${faNum(matchedPages)} صفحه پیدا شد! (نگه‌داشتن Space = نمایش روح خام)`, 'ok', 6500);
  } finally { busy.hide(); }
}

/* ============================================================
   REMOTE CLOUD SYNC (CONTINUE ON MOBILE WHEN LAPTOP IS OFF)
   ============================================================ */
async function compressString(str) {
  const u8 = new TextEncoder().encode(str);
  if (typeof CompressionStream === 'function') {
    const cs = new CompressionStream('deflate-raw');
    const ab = await new Response(new Blob([u8]).stream().pipeThrough(cs)).arrayBuffer();
    return { u8: new Uint8Array(ab), z: 1 };
  }
  return { u8, z: 0 };
}
async function decompressBytes(u8, z) {
  if (z && typeof DecompressionStream === 'function') {
    const ds = new DecompressionStream('deflate-raw');
    const ab = await new Response(new Blob([u8]).stream().pipeThrough(ds)).arrayBuffer();
    return new TextDecoder().decode(ab);
  }
  return new TextDecoder().decode(u8);
}
function u8ToB64Url(u8) {
  let s = '';
  for (let i = 0; i < u8.length; i += 0x8000) s += String.fromCharCode.apply(null, u8.subarray(i, i + 0x8000));
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function b64UrlToU8(str) {
  let b64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) b64 += '=';
  const bin = atob(b64), u = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
  return u;
}

async function remotePush() {
  if (!S.pages.length && !S.doc.length) return toast('هنوز پروژه‌ای باز نیست', 'wn');
  const pill = $('#remStatusPill'); if (pill) { pill.textContent = 'در حال ساخت…'; pill.className = 'pill inf'; }
  try {
    const json = projectJSON();
    const { u8, z } = await compressString(json);
    const InlineToken = (z ? 'MS8Z_' : 'MS8R_') + u8ToB64Url(u8);
    let finalCode = InlineToken;
    /* Try cloud relay first for a short code; fallback to self-contained offline/online token */
    try {
      const ctrl = new AbortController(), t = setTimeout(() => ctrl.abort(), 4500);
      const res = await fetch('https://bytebin.lucko.me/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ v: 8, token: InlineToken }),
        signal: ctrl.signal
      });
      clearTimeout(t);
      if (res.ok) {
        const d = await res.json();
        if (d && d.key) finalCode = 'CLOUD-' + d.key;
      }
    } catch (e) { }
    S.remCode = finalCode;
    const wrap = $('#remCodeWrap'), box = $('#remCodeBox');
    if (wrap && box) {
      wrap.style.display = '';
      box.textContent = finalCode.length > 48 ? finalCode.slice(0, 28) + '… (' + faNum(Math.round(finalCode.length / 1024)) + ' کیلوبایت — کپی شد)' : finalCode;
      box.dataset.full = finalCode;
    }
    try { await navigator.clipboard.writeText(finalCode); } catch (e) {
      const ta = el('textarea', { value: finalCode }); document.body.append(ta); ta.select();
      try { document.execCommand('copy'); } catch (e2) { } ta.remove();
    }
    if (pill) { pill.textContent = finalCode.startsWith('CLOUD-') ? 'ابری (کد کوتاه)' : 'بستهٔ مستقیم (کپی شد)'; pill.className = 'pill ok'; }
    toast(finalCode.startsWith('CLOUD-')
      ? `کد ابری «${finalCode}» ساخته و کپی شد! در موبایل واردش کنید.`
      : 'کد کامل پیشرفت پروژه در کلیپ‌بورد کپی شد! آن را در تلگرام/یادداشت بفرستید و در موبایل بچسبانید.', 'ok', 6000);
  } catch (e) {
    if (pill) { pill.textContent = 'خطا'; pill.className = 'pill wn'; }
    toast('ساخت کد انتقال ناموفق بود: ' + (e.message || e), 'er');
  }
}

async function remotePull() {
  let code = ($('#remPullInput') && $('#remPullInput').value || '').trim();
  if (!code) {
    try { code = (await navigator.clipboard.readText() || '').trim(); if ($('#remPullInput')) $('#remPullInput').value = code; } catch (e) { }
  }
  if (!code) return toast('کد انتقال ابری یا متن کپی‌شده را در کادر وارد کنید', 'wn');
  const pill = $('#remStatusPill'); if (pill) { pill.textContent = 'در حال دریافت…'; pill.className = 'pill inf'; }
  try {
    let token = code;
    if (/^CLOUD-[A-Za-z0-9_-]+$/i.test(code)) {
      const key = code.replace(/^CLOUD-/i, '');
      const res = await fetch('https://bytebin.lucko.me/' + encodeURIComponent(key));
      if (!res.ok) throw new Error('کد ابری منقضی شده یا اینترنت وصل نیست');
      const d = await res.json();
      token = d.token || '';
    }
    if (token.startsWith('MS8Z_') || token.startsWith('MS8R_')) {
      const z = token.startsWith('MS8Z_') ? 1 : 0;
      const u8 = b64UrlToU8(token.slice(5));
      const json = await decompressBytes(u8, z);
      const obj = JSON.parse(json);
      if (!await confirmDiscard('دریافت پروژهٔ همگام‌شده')) return;
      await loadProjectObject(obj, 'remote');
      if (pill) { pill.textContent = 'دریافت شد'; pill.className = 'pill ok'; }
      $('#ovSet').classList.remove('on');
      toast('پروژه با موفقیت همگام‌سازی شد! تمام لایه‌ها، متن‌ها و جای بالن‌ها منتقل شدند.', 'ok', 6000);
      return;
    }
    /* maybe raw JSON */
    const obj = JSON.parse(token);
    if (!await confirmDiscard('دریافت پروژهٔ همگام‌شده')) return;
    await loadProjectObject(obj, 'remote');
    if (pill) { pill.textContent = 'دریافت شد'; pill.className = 'pill ok'; }
    $('#ovSet').classList.remove('on');
    toast('پروژه با موفقیت دریافت شد!', 'ok', 5500);
  } catch (e) {
    if (pill) { pill.textContent = 'خطا'; pill.className = 'pill wn'; }
    toast('دریافت ناموفق بود: ' + (e.message || 'کد معتبر نیست'), 'er', 5500);
  }
}

async function remoteShareMobin() {
  if (!S.pages.length && !S.doc.length) return toast('هنوز پروژه‌ای باز نیست', 'wn');
  busy.show('آماده‌سازی فایل کامل .mobin برای ارسال به موبایل…');
  try {
    const blob = await buildMobin();
    const name = safeName(S.meta.title || 'project') + '.mobin';
    const file = new File([blob], name, { type: 'application/octet-stream' });
    busy.hide();
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ files: [file], title: name, text: 'پروژهٔ Mobin Studio — آمادهٔ ادامه در موبایل' });
      toast('فایل پروژه همرسانی شد', 'ok');
      return;
    }
    await download(blob, name);
    toast('فایل .mobin ذخیره شد — آن را در Saved Messages تلگرام یا درایو بیندازید تا در گوشی باز کنید', 'ok', 6500);
  } catch (e) {
    busy.hide();
    if (e && e.name === 'AbortError') return;
    toast('خطا در اشتراک‌گذاری: ' + (e.message || e), 'er');
  }
}

function isSinglePageMob() {
  return !!(S.settings.singlePageMob && (document.body.classList.contains('mob') || window.MOBIN_ANDROID));
}
function syncSinglePageMode() {
  const on = isSinglePageMob();
  document.body.classList.toggle('singlePage', on);
  if (on && S.pages.length) {
    S.pages.forEach((p, i) => {
      if (i !== S.cur && p.cv && (p.cv.width > 1 || p.cv.height > 1)) {
        p.cv.width = 1; p.cv.height = 1; p.bw = 1; p.bh = 1;
      }
    });
    sharpenSoon(20);
  }
}

/* ============================================================
   GUIDED TOUR  +  PRACTICE SAMPLE
   ============================================================ */
const TOUR_KEY = 'ms6.tour';


const STEPS = [
  {
    t: 'خوش آمدید 👋',
    b: 'این برنامه متن مترجم را می‌گیرد و داخل بالن‌های مانهوا می‌گذارد. در ۹ گام کوتاه همه‌جا را نشانتان می‌دهم. هر لحظه می‌توانید «رد کردن» را بزنید.'
  },
  {
    sel: () => '#ddFile',
    t: '۱ — بارگذاری',
    b: 'از اینجا عکس‌های کلین فصل و فایل متن مترجم (TXT) را می‌دهید. ترتیب صفحه‌ها از روی نام فایل‌ها چیده می‌شود. متن را می‌توانید مستقیم هم بچسبانید.'
  },
  {
    sel: () => '#stage',
    t: '۲ — میز کار',
    b: 'صفحه‌ها اینجا پشت‌سرهم می‌آیند. با چرخ ماوس یا دو انگشت حرکت می‌کنید، با <kbd>Ctrl</kbd>+چرخ زوم می‌کنید و دکمهٔ «اندازهٔ پنجره» صفحه را جا می‌کند.'
  },
  {
    sel: () => '#tScript',
    t: '۳ — پنل متن',
    b: 'فهرست بالن‌های همین صفحه. روی هر بالن بزنید تا انتخاب شود؛ حلقهٔ درصد بالا نشان می‌دهد چند بالن صفحه تمام شده. با <kbd>Tab</kbd> هم به بالن بعدی می‌روید.',
    pre: () => togglePanel('script', true)
  },
  {
    sel: () => '#stage',
    t: '۴ — گذاشتن متن',
    b: 'بالن را انتخاب کنید و بعد <b>وسط بالن در تصویر</b> بزنید. برنامه لبهٔ بالن را پیدا می‌کند، پهنا را تنظیم می‌کند و اگر جا نشد قلم را کوچک‌تر می‌کند. متن را می‌شود کشید و با دستگیرهٔ کناری پهن‌تر کرد.'
  },
  {
    sel: () => '#tInspect',
    t: '۵ — تنظیم ظاهر',
    b: 'فونت، اندازه، رنگ، خط دور، فاصلهٔ خطوط و چرخشِ لایهٔ انتخاب‌شده اینجاست. تب «صفحات» هم فهرست کل فصل و میزان پیشرفت را نشان می‌دهد.',
    pre: () => { togglePanel('inspect', true); if (typeof setPanel === 'function') setPanel('layer'); }
  },
  {
    sel: () => '#tClean',
    t: '۶ — پاک‌کردن متن قدیمی',
    b: 'اگر حروف اصلی هنوز داخل بالن هستند، این ابزار (کلید <kbd>E</kbd>) را روشن کنید و روی فضای خالی داخل بالن بزنید. خط دور بالن سالم می‌ماند و عکس اصلی خراب نمی‌شود.'
  },
  {
    sel: () => '#ddExp',
    t: '۷ — خروجی',
    b: 'قالب را انتخاب کنید (PNG برای بهترین کیفیت) و «همین صفحه» یا «همهٔ صفحات» را بزنید. دومی یک فایل ZIP از کل فصل می‌دهد.'
  },
  {
    sel: () => '#bSettings',
    t: '۸ — تنظیمات',
    b: 'فونت هر تگ (SFX، نریشن، …)، تنظیمات اصلاح خودکار متن فارسی، <b>نقاط بازگشت</b>، ذخیرهٔ پروژه و پوشهٔ فصل همگی اینجا هستند. همین آموزش هم در تب «آموزش» می‌ماند.'
  },
  {
    sel: () => '#ddApp',
    t: '۹ — منوی برنامه',
    b: 'ذخیرهٔ پروژه، اندازهٔ متن برنامه، حالت روشن و تیره، تمام‌صفحه و خروج همه در این منو هستند.'
  },
  {
    t: 'تمام ✅',
    b: 'برای تمرین می‌توانید «نمونهٔ تمرینی» را بارگذاری کنید: دو صفحهٔ ساختگی با متن قدیمی داخل بالن‌ها، که می‌شود رویشان همه‌چیز را امتحان کرد.',
    end: true
  }
];

let tIdx = 0, tOn = false, tKey = null, tBack = null;

function tourTarget(s) {
  if (!s.sel) return null;
  const n = $(s.sel());
  if (!n) return null;
  const r = n.getBoundingClientRect();
  return (r.width < 2 || r.height < 2) ? null : n;
}

function placeTour() {
  const s = STEPS[tIdx];
  const card = $('#tCard'), ring = $('#tRing');
  const node = tourTarget(s);
  const pad = 7, W = innerWidth, H = innerHeight;
  const masks = $$('#tour .tmask');
  if (!node) {
    ring.classList.add('none');
    masks[0].style.cssText = 'inset:0';
    masks[1].style.cssText = 'display:none'; masks[2].style.cssText = 'display:none'; masks[3].style.cssText = 'display:none';
    card.style.left = Math.round((W - card.offsetWidth) / 2) + 'px';
    card.style.top = Math.round(Math.max(16, (H - card.offsetHeight) / 2)) + 'px';
    return;
  }
  const r = node.getBoundingClientRect();
  const x = Math.max(0, r.left - pad), y = Math.max(0, r.top - pad);
  const w = Math.min(W - x, r.width + pad * 2), h = Math.min(H - y, r.height + pad * 2);
  ring.classList.remove('none');
  ring.style.cssText = `left:${x}px;top:${y}px;width:${w}px;height:${h}px`;
  masks[0].style.cssText = `left:0;top:0;width:${W}px;height:${y}px`;
  masks[1].style.cssText = `left:0;top:${y + h}px;width:${W}px;height:${Math.max(0, H - y - h)}px`;
  masks[2].style.cssText = `left:0;top:${y}px;width:${x}px;height:${h}px`;
  masks[3].style.cssText = `left:${x + w}px;top:${y}px;width:${Math.max(0, W - x - w)}px;height:${h}px`;

  const cw = card.offsetWidth, ch = card.offsetHeight;
  let top = y + h + 12;
  if (top + ch > H - 12) top = y - ch - 12;
  if (top < 12) top = Math.min(H - ch - 12, Math.max(12, y + h + 12));
  let left = r.left + r.width / 2 - cw / 2;
  left = clamp(left, 12, Math.max(12, W - cw - 12));
  card.style.left = Math.round(left) + 'px';
  card.style.top = Math.round(Math.max(12, top)) + 'px';
}

function showStep(i) {
  tIdx = clamp(i, 0, STEPS.length - 1);
  const s = STEPS[tIdx];
  if (s.pre) { try { s.pre(); } catch (e) { } }
  $('#tTitle').textContent = s.t;
  $('#tBody').innerHTML = s.b;
  $('#tNum').textContent = `${faNum(tIdx + 1)} از ${faNum(STEPS.length)}`;
  $('#tPrev').style.visibility = tIdx ? '' : 'hidden';
  $('#tNext').textContent = tIdx === STEPS.length - 1 ? 'تمام' : 'بعدی';
  const dots = $('#tDots'); dots.textContent = '';
  STEPS.forEach((_, k) => dots.appendChild(el('i', { class: k === tIdx ? 'on' : k < tIdx ? 'did' : '' })));
  requestAnimationFrame(placeTour);
  setTimeout(placeTour, 240);
}

function startTour() {
  $$('.dd').forEach(d => d.classList.remove('open'));
  $('#ovSet').classList.remove('on');
  tOn = true;
  tBack = { sc: !$('#script').classList.contains('hide'), ins: !$('#inspect').classList.contains('hide') };
  $('#tour').classList.add('on');
  $('#tour').setAttribute('aria-hidden', 'false');
  showStep(0);
  if (!tKey) {
    tKey = e => {
      if (!tOn) return;
      if (e.key === 'Escape') { e.preventDefault(); endTour(); }
      else if (e.key === 'ArrowLeft' || e.key === 'Enter') { e.preventDefault(); nextStep(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); showStep(tIdx - 1); }
    };
    addEventListener('keydown', tKey, true);
  }
  addEventListener('resize', placeTour);
}
function nextStep() { if (tIdx >= STEPS.length - 1) endTour(true); else showStep(tIdx + 1); }
function endTour(done) {
  tOn = false;
  $('#tour').classList.remove('on');
  $('#tour').setAttribute('aria-hidden', 'true');
  removeEventListener('resize', placeTour);
  if (tBack) { togglePanel('script', tBack.sc); togglePanel('inspect', tBack.ins); tBack = null; }
  LS.set(TOUR_KEY, '1');
  if (done) toast('هر وقت خواستید، از دکمهٔ «راهنما» در نوار کناری دوباره ببینید', 'ok', 5000);
}

/* ============================================================
   PRACTICE SAMPLE  (generated, no files needed)
   ============================================================ */
const DEMO_TXT = `صفحه ۱

بالاخره رسیدی! دو ساعت منتظرت بودم.

SFX: تـــق

ببخشید، اتوبوس خراب شد.

صفحه ۲

نریشن: هیچ‌کس نمی‌دانست آن شب چه اتفاقی می‌افتد.

یعنی واقعاً کسی چیزی ندیده؟

SFX: خـــش`;

function demoPage(n) {
  const W = 900, H = 1280;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const x = c.getContext('2d');
  x.fillStyle = '#fff'; x.fillRect(0, 0, W, H);
  const panels = [[40, 40, 820, 360], [40, 430, 820, 380], [40, 840, 820, 400]];
  const bubbles = n === 1
    ? [[300, 170, 190, 95, 'ようやく きたね!'], [600, 620, 160, 80, 'ごめん'], [330, 1020, 200, 100, 'バスが…']]
    : [[450, 150, 260, 80, 'NARRATION'], [300, 620, 190, 95, 'だれも みて'], [620, 1040, 150, 75, 'ない?']];
  panels.forEach(([px, py, pw, ph], k) => {
    const g = x.createLinearGradient(px, py, px + pw, py + ph);
    g.addColorStop(0, k % 2 ? '#dfe4ea' : '#e8ebef'); g.addColorStop(1, '#cfd6de');
    x.fillStyle = g; x.fillRect(px, py, pw, ph);
    x.strokeStyle = '#111'; x.lineWidth = 4; x.strokeRect(px, py, pw, ph);
    x.save(); x.beginPath(); x.rect(px, py, pw, ph); x.clip();
    x.fillStyle = 'rgba(40,46,54,.22)';
    for (let i = 0; i < 26; i++) {
      x.beginPath();
      x.ellipse(px + ((i * 137 + k * 59 + n * 23) % pw), py + ((i * 211 + k * 97) % ph),
        7 + (i % 5) * 5, 11 + (i % 3) * 7, (i % 7) * .4, 0, 7);
      x.fill();
    }
    x.restore();
  });
  bubbles.forEach(([bx, by, rw, rh, txt]) => {
    x.beginPath(); x.ellipse(bx, by, rw / 2, rh / 2, 0, 0, 7);
    x.fillStyle = '#fff'; x.fill(); x.strokeStyle = '#111'; x.lineWidth = 3.5; x.stroke();
    x.fillStyle = '#1a1a1a'; x.textAlign = 'center'; x.textBaseline = 'middle';
    x.font = `600 ${Math.round(rh / 4.4)}px "Noto Sans JP","Liberation Sans",sans-serif`;
    txt.split(' ').forEach((w, i, a) => fillTextSmooth(x, w, bx, by + (i - (a.length - 1) / 2) * rh / 3.4));
  });
  x.fillStyle = 'rgba(0,0,0,.45)'; x.font = '600 26px "Liberation Sans",sans-serif'; x.textAlign = 'left';
  fillTextSmooth(x, 'demo ' + n, 46, H - 18);
  return c;
}

async function loadDemo() {
  if (S.pages.some(p => p.layers.length) &&
    !await ask('نمونهٔ تمرینی بارگذاری شود؟', 'کار فعلی شما پاک می‌شود. اگر لازمش دارید اول پروژه را ذخیره کنید.', 'بله', 'انصراف')) return;
  busy.show('ساخت نمونه…');
  const files = [];
  for (const n of [1, 2]) {
    const blob = await new Promise(r => demoPage(n).toBlob(r, 'image/png'));
    files.push(new File([blob], `demo-0${n}.png`, { type: 'image/png' }));
    await nextFrame();
  }
  busy.hide();
  $('#ovSet').classList.remove('on');
  await loadImages(files, true);
  applyScript(DEMO_TXT, true);
  toast('نمونهٔ تمرینی آماده است — یک بالن را انتخاب کنید و روی تصویر بزنید', 'ok', 7000);
}

function wireTour() {
  const on = (id, fn) => { const n = $(id); if (n) n.onclick = fn; };
  on('#tNext', nextStep);
  on('#tPrev', () => showStep(tIdx - 1));
  on('#tSkip', () => endTour());
  on('#bTour', startTour);
  on('#bTour2', startTour);
  on('#bHelp', () => openSettings('help'));
  on('#bTheme', toggleTheme);
  on('#bDemo', loadDemo);
  on('#bDemo2', loadDemo);
}
function maybeFirstRun() {
  if (LS.get(TOUR_KEY)) return;
  LS.set(TOUR_KEY, '1');
  if (document.body.classList.contains('mob')) return;
  if (S.doc.length || S.pages.length) return;
  /* بدون هیچ پنجره‌ای: آموزش همیشه از دکمهٔ «راهنما» در نوار کناری باز می‌شود */
  toast('آموزش کوتاه هر وقت خواستی از دکمهٔ «راهنما» در نوار کناری باز می‌شود', 'i', 6000);
}

/* ============================================================
   FONTS TAB
   ============================================================ */
function buildFontList() {
  const host = $('#fontList'); host.textContent = '';
  const q = ($('#fontSearch').value || '').trim();
  const tags = Object.keys(S.styles).filter(t => !q || t.includes(q));
  if (!tags.length) { host.append(el('div', { class: 'empty-s' }, [el('p', { text: Object.keys(S.styles).length ? 'تگی با این نام نیست.' : 'اول متن مترجم را پردازش کنید تا تگ‌ها اینجا بیایند.' })])); return; }
  for (const tag of tags) {
    const st = style(tag), col = tagHue(tag), fi = fontInfo(st.font), isSys = st.font.startsWith('s:');
    const card = el('div', { class: 'fcard' + (isSys ? ' sys' : '') });

    /* header: tag chip + source pill + layer count */
    const head = el('div', { class: 'fh' });
    const chip = el('span', { class: 'tag', style: `color:${col};background:${col}22` });
    chip.append(el('i'), document.createTextNode(tag));
    head.append(chip);
    head.append(el('span', { class: 'pill ' + (fi ? (fi.kind === 'b' ? 'ok' : 'inf') : 'wn'), text: fi ? (fi.kind === 'b' ? 'داخلی' : fi.kind === 'u' ? 'آپلودی' : 'سیستمی') : 'پیدا نشد' }));
    const cnt = S.pages.reduce((a, p) => a + p.layers.filter(l => l.tag === tag).length, 0);
    head.append(el('span', { class: 'hint', style: 'margin-inline-start:auto', text: cnt ? faNum(cnt) + ' لایه' : 'بدون لایه' }));
    card.append(head);

    const g = el('div', { class: 'fgrid' });

    /* row 1 — font picker (+ toggle for system fonts) */
    const sel = el('select', { style: 'flex:1;min-width:0' });
    for (const f of fontReg.values()) sel.append(el('option', { value: f.id, text: f.label + (f.kind === 'u' ? ' (آپلودی)' : '') + (f.bold ? ' (ضخیم)' : '') }));
    const sysIn = el('input', { type: 'text', list: 'dlLocal', placeholder: 'نام دقیق فونت نصب‌شده…', value: isSys ? st.font.slice(2) : '' });
    if (isSys) sel.append(el('option', { value: st.font, text: st.font.slice(2) + ' (سیستمی)' }));
    sel.value = st.font;
    sel.addEventListener('change', () => { st.font = sel.value; st.fontAuto = false; applyTagProp(tag, ['font']); applyTagFont(tag); });
    const sysBtn = el('button', { class: 'btn sm gho' + (isSys ? ' on' : ''), type: 'button', text: 'سیستمی', title: 'استفاده از فونت نصب‌شده روی این دستگاه' });
    sysBtn.onclick = () => { card.classList.toggle('sys'); sysBtn.classList.toggle('on', card.classList.contains('sys')); if (card.classList.contains('sys')) sysIn.focus(); };
    sysIn.addEventListener('change', () => {
      const v = sysIn.value.trim(); if (!v) return;
      if (!systemHas(v)) toast(`فونت «${v}» روی این سیستم نیست`, 'wn');
      st.font = fontId('s', v); st.fontAuto = false; applyTagProp(tag, ['font']); buildFontList(); applyTagFont(tag);
    });
    g.append(el('span', { text: 'فونت' }), el('div', { class: 'cell' }, [sel, sysBtn]));
    g.append(el('div', { class: 'sysrow' }, [el('span', { text: 'فونت سیستمی' }), sysIn]));

    /* row 2 — everything else on one line */
    /* changes reach the texts of this tag at once — only the one property that changed
       (size stays per balloon: it is used for new texts; «اعمال به لایه‌ها» applies everything) */
    const num = (key, min, max, step) => {
      const n = el('input', { type: 'number', min, max, step, value: st[key] });
      n.title = key === 'size' ? 'اندازهٔ متن‌های تازهٔ این تگ' : '';
      n.addEventListener('change', () => { st[key] = clamp(parseFloat(n.value) || 0, min, max); n.value = st[key]; if (key === 'size') saveStyles(); else applyTagProp(tag, [key]); });
      return n;
    };
    const colr = key => { const c = el('input', { type: 'color', value: st[key] }); c.addEventListener('input', () => { st[key] = c.value; applyTagProp(tag, [key], true); }); return c; };
    const mini = t => el('span', { class: 'mini', text: t });
    const bchk = el('input', { type: 'checkbox' }); bchk.checked = !!st.bold; bchk.disabled = !!(fi && fi.bold);
    const bl = el('label', { class: 'chk', title: fi && fi.bold ? 'این فونت ذاتاً ضخیم است' : 'ضخیم' });
    bl.append(bchk, document.createTextNode('ضخیم'));
    g.append(el('span', { text: 'سبک' }), el('div', { class: 'cell' }, [
      mini('اندازه'), num('size', 6, 400, 1), colr('color'),
      mini('دورخط'), num('stroke', 0, 60, .5), colr('strokeColor'),
      mini('فاصله'), num('lh', .6, 4, .05),
      el('span', { style: 'flex:1' }), bl
    ]));
    card.append(g);

    /* actions */
    const acts = el('div', { class: 'acts' });
    const up = el('label', { class: 'btn sm' });
    const upIn = el('input', { type: 'file', accept: '.ttf,.otf,.woff,.woff2' });
    upIn.addEventListener('change', async () => { if (upIn.files[0]) { await uploadFont(upIn.files[0], tag); upIn.value = ''; } });
    up.append(svg(I.upload), document.createTextNode('آپلود فونت'), upIn);
    const ap = el('button', { class: 'btn sm', type: 'button', title: 'سبک این تگ روی لایه‌های ساخته‌شده اعمال شود' });
    ap.append(svg(I.redoArrow), document.createTextNode('اعمال به لایه‌ها'));
    ap.onclick = () => applyTagStyleToLayers(tag);
    acts.append(up, ap, el('span', { style: 'flex:1' }));

    /* live preview */
    const prev = el('div', { class: 'prev', text: 'نمونهٔ متن فارسی ۱۲۳' });
    prev.style.fontFamily = cssFamily(st.font);
    prev.style.fontWeight = st.bold || (fi && fi.bold) ? '700' : '400';
    bchk.addEventListener('change', () => { st.bold = bchk.checked; prev.style.fontWeight = bchk.checked ? '700' : '400'; applyTagProp(tag, ['bold']); });
    const paintPrev = () => {
      prev.style.color = st.color || '#111111';
      const w = Math.min(3, (+st.stroke || 0) * 0.45), sh = [];
      if (w > 0) for (let a = 0; a < 16; a++) { const t = a / 16 * Math.PI * 2; sh.push(`${(Math.cos(t) * w).toFixed(2)}px ${(Math.sin(t) * w).toFixed(2)}px 0 ${st.strokeColor}`); }
      prev.style.textShadow = sh.length ? sh.join(',') : 'none';
      const hx = String(st.color || '#000000').replace('#', ''), n = parseInt(hx.length === 3 ? hx.replace(/./g, '$&$&') : hx.slice(0, 6), 16) || 0;
      prev.classList.toggle('dark', (0.299 * (n >> 16 & 255) + 0.587 * (n >> 8 & 255) + 0.114 * (n & 255)) / 255 > 0.72);
    };
    paintPrev(); card.addEventListener('input', paintPrev); card.addEventListener('change', paintPrev);
    acts.append(prev);
    card.append(acts);
    host.append(card);
  }
  /* uploaded font manager */
  const names = Object.keys(S.uploads);
  if (names.length) {
    const box = el('div', { class: 'fcard' });
    box.append(el('div', { class: 'fh' }, [el('b', { text: 'فونت‌های آپلودی شما' })]));
    for (const n of names) {
      const r = el('div', { class: 'acts', style: 'margin-top:7px' });
      r.append(el('span', { style: 'flex:1;font-size:13px', text: n }));
      const d = el('button', { class: 'btn sm ico dgr', type: 'button', title: 'حذف', onclick: () => removeUpload(n) });
      d.append(svg(I.trash)); r.append(d);
      box.append(r);
    }
    host.append(box);
  }
}
function systemHas(name) {
  const c = measCv, probe = 'مممم ABC 123';
  c.font = '40px monospace'; const a = c.measureText(probe).width;
  c.font = `40px "${name.replace(/"/g, '')}",monospace`;
  return Math.abs(c.measureText(probe).width - a) > .5;
}
async function uploadFont(file, tag) {
  if (file.size > 12e6) return toast('فایل فونت خیلی بزرگ است (بیشتر از ۱۲ مگابایت)', 'er');
  const name = file.name.replace(/\.[^.]+$/, '').slice(0, 50);
  const buf = await file.arrayBuffer();
  if (!await registerFont(fontId('u', name), name, buf.slice(0), false, 'u'))
    return toast(`فایل فونت «${name}» معتبر نیست`, 'er');
  await idb('put', 'font:' + name, buf.slice(0));
  S.uploads[name] = 1;
  if (tag) { style(tag).font = fontId('u', name); style(tag).fontAuto = false; applyTagProp(tag, ['font']); applyTagFont(tag); }
  else if (remapTagFonts().length) offerFontFix(300);
  buildFontList(); $('#iFont').dataset.sig = '';
  toast(`فونت «${name}» اضافه شد`, 'ok');
}
async function removeUpload(name) {
  if (!await ask('حذف فونت', `فونت «${name}» حذف شود؟ تگ‌هایی که از آن استفاده می‌کنند به فونت داخلی برمی‌گردند.`, 'حذف کن')) return;
  await idb('del', 'font:' + name);
  delete S.uploads[name];
  const id = fontId('u', name); fontReg.delete(id);
  const fb = defFont(false);
  for (const t in S.styles) if (S.styles[t].font === id) S.styles[t].font = fb;
  for (const p of S.pages) for (const L of p.layers) if (L.font === id) L.font = fb;
  $('#iFont').dataset.sig = '';
  saveStyles(); buildFontList(); syncAll();
  toast('فونت حذف شد', 'ok');
}
function applyTagFont(tag) { saveStyles(); buildFontList(); $('#iFont').dataset.sig = ''; syncInspector(); }
/* one property of a tag style -> every text of that tag (one undo step) */
function applyTagProp(tag, keys, soft) {
  const st = style(tag), ls = [];
  for (const p of S.pages) for (const L of p.layers) if (L.tag === tag) ls.push(L);
  saveStyles();
  if (!ls.length) return;
  if (soft) pushHistSoon(); else pushHist();
  for (const L of ls) for (const k of keys) {
    if ((k === 'color' || k === 'strokeColor') && L.autoInvert) continue;
    L[k] = st[k];
  }
  renderAll(); syncInspector(); autosave();
}
function applyTagStyleToLayers(tag) {
  const st = style(tag);
  let n = 0, skipped = 0;
  pushHist();
  for (const p of S.pages) for (const L of p.layers) if (L.tag === tag) {
    L.font = st.font; L.size = st.size; L.stroke = st.stroke; L.lh = st.lh; L.bold = st.bold; L.italic = st.italic;
    if (L.autoInvert) skipped++; else { L.color = st.color; L.strokeColor = st.strokeColor; }
    n++;
  }
  saveStyles(); syncAll();
  toast(`${faNum(n)} لایه به‌روز شد` + (skipped ? ` (رنگ ${faNum(skipped)} لایهٔ خودکارسفید دست نخورد)` : ''), 'ok', 4500);
}

/* ============================================================
   WIRING
   ============================================================ */
const NARROW = () => innerWidth <= 1240;
function syncPanelMode() {
  const sc = !$('#script').classList.contains('hide'), ins = !$('#inspect').classList.contains('hide');
  document.body.classList.toggle('panelOpen', NARROW() && (sc || ins));
  if (!sc) $('#script').classList.remove('tall');
  if (!ins) $('#inspect').classList.remove('tall');
  document.body.classList.toggle('sheetTall', (sc && $('#script').classList.contains('tall')) || (ins && $('#inspect').classList.contains('tall')));
  $('#tScript').classList.toggle('on', sc); $('#tScript').setAttribute('aria-pressed', sc);
  $('#tInspect').classList.toggle('on', ins); $('#tInspect').setAttribute('aria-pressed', ins);
 
}
function togglePanel(id, on) {
  const n = $('#' + id), show = on === undefined ? n.classList.contains('hide') : !!on;
  n.classList.toggle('hide', !show);
  if (show && NARROW()) $('#' + (id === 'script' ? 'inspect' : 'script')).classList.add('hide');
  syncPanelMode(); refitSoon();
}
function refitSoon() { requestAnimationFrame(() => { if (S.pages.length && Math.abs(S.zoom - S.fitZoom) < .02) fitZoom(); }); }
function closePanels() { $('#script').classList.add('hide'); $('#inspect').classList.add('hide'); syncPanelMode(); refitSoon(); }
function setPanel(p) {
  $$('#segInsp button').forEach(b => b.setAttribute('aria-selected', b.dataset.p === p));
  $('#pLayer').classList.toggle('on', p === 'layer');
  $('#pPages').classList.toggle('on', p === 'pages');
  togglePanel('inspect', true);
}
const OPT_MAP = {
  optAutoFit: 'autoFit', optGrow: 'grow', optInvert: 'invert', optNext: 'next', optAutoClean: 'autoClean',
  optAutoPlace: 'autoPlace', optAutoGo: 'autoGo', optRtlOrder: 'rtlOrder',
  optDragBox: 'dragBox', optOpenSpace: 'openSpace', optSinglePageMob: 'singlePageMob', optDirectSave: 'directSave',
  optArabic: 'arabic', optZwnj: 'zwnj', optZwnjTar: 'zwnjTar', optPunct: 'punct', optEllip: 'ellip', optDigits: 'digits',
  optCleanAuto: 'cleanAuto', optSmartGuides: 'smartGuides', optAutoResume: 'autoResume'
};
function readSettingsToUI() {
  for (const id in OPT_MAP) { const n = $('#' + id); if (n) n.checked = !!S.settings[OPT_MAP[id]]; }
  syncCleanUI();
  $$('#segFmt button').forEach(b => b.setAttribute('aria-selected', b.dataset.f === S.settings.fmt));
  $('#qWrap').style.display = S.settings.fmt === 'png' ? 'none' : '';
  $('#qRange').value = S.settings.quality; $('#qVal').textContent = faNum(S.settings.quality);
  syncScaleUI();
  $('#rawText').value = S.raw;
  $('#pTitle').value = S.meta.title || '';
  syncSaveDirUI();
}
function syncSaveDirUI() {
  const p = S.settings.saveDirPath || '';
  if ($('#inpSaveDir')) $('#inpSaveDir').value = p;
  if ($('#expDirSub')) $('#expDirSub').textContent = p ? p : 'پیش‌فرض سیستم';
  if (window.msDesktop && msDesktop.cmd) {
    msDesktop.cmd('getSaveDir').then(r => {
      if (!r) return;
      const cur = r.custom || S.settings.saveDirPath || r.dir || '';
      if ($('#inpSaveDir') && !$('#inpSaveDir').value) $('#inpSaveDir').value = cur;
      if ($('#expDirSub')) $('#expDirSub').textContent = cur || 'پیش‌فرض سیستم';
    }).catch(() => { });
  }
}
async function pickSaveDirFlow() {
  if (window.msDesktop && msDesktop.cmd) {
    const r = await msDesktop.cmd('pickDir');
    if (r && r.ok && r.dir) {
      S.settings.saveDirPath = r.dir;
      saveSettings(); syncSaveDirUI();
      toast('مسیر و درایو ذخیره تنظیم شد: ' + r.dir, 'ok', 4200);
    }
    return;
  }
  if (typeof window.showDirectoryPicker === 'function') {
    try {
      const dh = await window.showDirectoryPicker({ mode: 'readwrite' });
      S._dirHandle = dh;
      S.settings.saveDirPath = dh.name;
      saveSettings(); syncSaveDirUI();
      toast('پوشهٔ «' + dh.name + '» برای ذخیره انتخاب شد', 'ok');
    } catch (e) { }
    return;
  }
  openSettings('gen');
  setTimeout(() => { if ($('#inpSaveDir')) $('#inpSaveDir').focus(); }, 120);
}
function syncScaleUI() {
  const k = expScale(), p = S.pages[S.cur], n = $('#scaleHint');
  $$('#segScale button').forEach(b => b.setAttribute('aria-selected', +b.dataset.k === k));
  if (!n) return;
  const z = p && p.w && p.h ? expSize(p) : null, px = z ? `${faNum(z.W)}×${faNum(z.H)} پیکسل` : '';
  n.textContent = (k === 1 ? 'اندازهٔ خود عکس' : 'حروف صاف‌تر، فایل حجیم‌تر') + (px ? '\n' + px : '');
}
function syncCleanUI() {
  const t = S.settings.cleanTol, g = S.settings.cleanGrow, c = S.settings.cleanColor, a = S.settings.cleanAuto;
  [['#ckTol', '#setCleanTol'], null].length;
  ['#ckTol', '#setCleanTol'].forEach(s => { const n = $(s); if (n) n.value = t; });
  ['#ckTolV', '#setCleanTolV'].forEach(s => { const n = $(s); if (n) n.textContent = faNum(t); });
  ['#ckGrow', '#setCleanGrow'].forEach(s => { const n = $(s); if (n) n.value = g; });
  ['#ckColor', '#setCleanColor'].forEach(s => { const n = $(s); if (n) { n.value = c; n.disabled = a; n.style.opacity = a ? .4 : 1; } });
  ['#ckAuto', '#optCleanAuto'].forEach(s => { const n = $(s); if (n) n.checked = a; });
  const inf = $('#cleanInfo');
  if (inf) { const n = cleanCount(); inf.textContent = n ? `${faNum(n)} لکه روی ${faNum(S.pages.filter(p => p.cleans && p.cleans.length).length)} صفحه` : 'هنوز چیزی پاک نشده'; }
}
function wire() {
  /* dropdowns */
  $$('[data-dd]').forEach(b => b.addEventListener('click', e => {
    e.stopPropagation(); const dd = b.closest('.dd'); const open = dd.classList.contains('open');
    $$('.dd').forEach(d => d.classList.remove('open')); dd.classList.toggle('open', !open);
  }));
  document.addEventListener('click', e => { if (!e.target.closest('.dd')) $$('.dd').forEach(d => d.classList.remove('open')); });
  addEventListener('blur', () => $$('.dd').forEach(d => d.classList.remove('open')));
  wireAppMenu();

  /* modals */
  $$('.ov').forEach(o => {
    o.addEventListener('click', e => { if (e.target === o) { if (o.id === 'ovAsk') askEnd(false); else o.classList.remove('on'); } });
    o.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => o.classList.remove('on')));
  });
  $('#askYes').onclick = () => askEnd(true);
  $('#askNo').onclick = () => askEnd(false);
  $('#askAlt').onclick = () => askEnd('alt');

  /* files */
  const imgIn = e => { loadImages(e.target.files); e.target.value = ''; $$('.dd').forEach(d => d.classList.remove('open')); };
  $('#fImgs').onchange = imgIn; $('#fImgs2').onchange = imgIn;
  if ($('#fRawImgs')) $('#fRawImgs').onchange = e => { loadRawImages(e.target.files); e.target.value = ''; $$('.dd').forEach(d => d.classList.remove('open')); };
  if ($('#bGhost')) $('#bGhost').onclick = () => toggleGhost();
  if ($('#bRemoteMenu')) $('#bRemoteMenu').onclick = () => { $$('.dd').forEach(d => d.classList.remove('open')); openSettings('proj'); };
  if ($('#bRemoteRail')) $('#bRemoteRail').onclick = () => openSettings('proj');
  if ($('#bRemPush')) $('#bRemPush').onclick = remotePush;
  if ($('#bPickSaveDir')) $('#bPickSaveDir').onclick = pickSaveDirFlow;
  if ($('#bExpDirQuick')) $('#bExpDirQuick').onclick = () => { $$('.dd').forEach(d => d.classList.remove('open')); pickSaveDirFlow(); };
  if ($('#bApplySaveDir')) $('#bApplySaveDir').onclick = async () => {
    const val = ($('#inpSaveDir') && $('#inpSaveDir').value || '').trim();
    S.settings.saveDirPath = val;
    saveSettings(); syncSaveDirUI();
    if (window.msDesktop && msDesktop.cmd) {
      const r = await msDesktop.cmd('setSaveDir', val);
      if (r && !r.ok) return toast(r.error || 'آدرس معتبر نیست', 'er');
    }
    toast(val ? 'آدرس درایو/پوشه ثبت شد: ' + val : 'آدرس پیش‌فرض فعال شد', 'ok');
  };
  if ($('#bOpenSaveDir')) $('#bOpenSaveDir').onclick = async () => {
    const val = ($('#inpSaveDir') && $('#inpSaveDir').value || '').trim();
    if (window.msDesktop && msDesktop.cmd) {
      await msDesktop.cmd('openSaveDir', val || null);
    } else {
      toast('باز کردن پوشه در ویندوز اکسپلورر مخصوص نسخهٔ دسکتاپ (.exe) است', 'inf');
    }
  };
  if ($('#bResetSaveDir')) $('#bResetSaveDir').onclick = async () => {
    S.settings.saveDirPath = ''; S._dirHandle = null;
    if ($('#inpSaveDir')) $('#inpSaveDir').value = '';
    saveSettings();
    if (window.msDesktop && msDesktop.cmd) {
      const r = await msDesktop.cmd('setSaveDir', '');
      if (r && r.dir && $('#inpSaveDir')) $('#inpSaveDir').value = r.dir;
    }
    syncSaveDirUI();
    toast('مسیر ذخیره به حالت پیش‌فرض برگشت', 'ok');
  };
  syncSaveDirUI();
  if ($('#bRemPull')) $('#bRemPull').onclick = remotePull;
  if ($('#bRemShare')) $('#bRemShare').onclick = remoteShareMobin;
  if ($('#remCodeBox')) $('#remCodeBox').onclick = async () => {
    const full = $('#remCodeBox').dataset.full || $('#remCodeBox').textContent;
    if (!full || full === '—') return;
    try { await navigator.clipboard.writeText(full); toast('کد انتقال کپی شد', 'ok'); } catch (e) { }
  };
  const txtIn = async e => {
    const f = e.target.files[0]; e.target.value = ''; $$('.dd').forEach(d => d.classList.remove('open'));
    if (!f) return;
    const { text, enc } = await readTextFile(f);
    if (enc !== 'UTF-8') toast(`فایل با رمزگذاری ${enc} خوانده شد`, 'i');
    applyScript(text);
  };
  $('#fTxt').onchange = txtIn; $('#fTxt2').onchange = txtIn; $('#fTxt3').onchange = txtIn;
  $('#fProj').onchange = e => { const f = e.target.files[0]; e.target.value = ''; $$('.dd').forEach(d => d.classList.remove('open')); if (f) openProject(f); };
  $('#bSaveProj').onclick = () => saveMobin(false);
  $('#bSaveAs').onclick = () => saveMobin(true);
  $('#bNewProj').onclick = () => newProject();
  $('#bOpenProj').onclick = () => openProjectDialog();
  $('#ddFile [data-dd]').addEventListener('click', () => setTimeout(fillRecent, 0));
  $('#bSaveProjM').onclick = () => { $('#ovSet').classList.remove('on'); saveMobin(false); };
  $('#bSaveAs2').onclick = () => { $('#ovSet').classList.remove('on'); saveMobin(true); };
  $('#bOpenProj2').onclick = () => { $('#ovSet').classList.remove('on'); openProjectDialog(); };
  $('#bSaveProj2').onclick = saveProject;
  $('#bAutoPage').onclick = () => autoPlacePage();
  $('#pTitle').onchange = () => { S.meta.title = $('#pTitle').value.trim().slice(0, 100); autosave(); syncTitle(); };

  /* restore points */
  $('#bSnapNow').onclick = async () => { const r = await makeSnapshot('دستی'); if (r) toast('نقطهٔ بازگشت ساخته شد', 'ok'); };

  /* bubble cleanup */
  $('#tClean').onclick = () => setTool(S.tool === 'clean' ? 'text' : 'clean');
  $('#bCleanDone').onclick = () => setTool('text');
  $('#bCleanPage').onclick = async () => {
    const n = (S.pages[S.cur] && S.pages[S.cur].cleans || []).length;
    if (!n) return toast('این صفحه لکهٔ پاک‌شده ندارد');
    if (!await ask('پاک‌کردن لکه‌ها', `${faNum(n)} وصلهٔ این صفحه برداشته شود؟`, 'بردار')) return;
    pushHist(); clearCleans(S.cur); render(S.cur); syncCleanUI(); syncPagesPanel(); autosave();
  };
  $('#bCleanAll').onclick = async () => {
    const n = cleanCount();
    if (!n) return toast('لکه‌ای نیست');
    if (!await ask('پاک‌کردن همهٔ لکه‌ها', `${faNum(n)} وصله از همهٔ صفحه‌ها برداشته شود؟`, 'بردار')) return;
    pushHist(); S.pages.forEach((p, i) => clearCleans(i)); renderAll(); syncCleanUI(); syncPagesPanel(); autosave();
  };
  const onTol = v => { S.settings.cleanTol = clamp(+v || 58, 10, 160); saveSettings(); syncCleanUI(); };
  ['#ckTol', '#setCleanTol'].forEach(s => { const n = $(s); if (n) n.oninput = () => onTol(n.value); });
  ['#ckGrow', '#setCleanGrow'].forEach(s => { const n = $(s); if (n) n.onchange = () => { S.settings.cleanGrow = clamp(Math.round(+n.value || 0), -5, 5); saveSettings(); syncCleanUI(); }; });
  ['#ckColor', '#setCleanColor'].forEach(s => { const n = $(s); if (n) n.oninput = () => { S.settings.cleanColor = n.value; saveSettings(); syncCleanUI(); }; });
  ['#ckAuto', '#optCleanAuto'].forEach(s => { const n = $(s); if (n) n.onchange = () => { S.settings.cleanAuto = n.checked; saveSettings(); syncCleanUI(); }; });

  /* paste */
  const openPaste = () => { $$('.dd').forEach(d => d.classList.remove('open')); $('#pasteText').value = S.raw; $('#pasteReport').textContent = ''; $('#ovPaste').classList.add('on'); setTimeout(() => $('#pasteText').focus(), 40); };
  $('#bPaste').onclick = openPaste; $('#bPaste2').onclick = openPaste;
  $('#bPasteGo').onclick = () => { if (applyScript($('#pasteText').value)) $('#ovPaste').classList.remove('on'); };

  /* settings modal */
  $('#bSettings').onclick = () => { buildFontList(); readSettingsToUI(); updateLsInfo(); $('#ovSet').classList.add('on'); };
  $$('#setTabs button').forEach(b => b.onclick = () => {
    $$('#setTabs button').forEach(x => x.setAttribute('aria-selected', x === b));
    $$('.mb .tp').forEach(p => p.classList.remove('on'));
    $('#tp' + b.dataset.t[0].toUpperCase() + b.dataset.t.slice(1)).classList.add('on');
  });
  $('#fontSearch').oninput = buildFontList;
  $('#bLocalFonts').onclick = async () => {
    if (!window.queryLocalFonts) return toast('این قابلیت فقط در Chrome و Edge هست', 'wn');
    try {
      const fs = await queryLocalFonts();
      const names = [...new Set(fs.map(f => f.family))].sort();
      const dl = $('#dlLocal'); dl.textContent = '';
      for (const n of names) dl.append(el('option', { value: n }));
      toast(`${faNum(names.length)} فونت سیستمی پیدا شد`, 'ok');
    } catch (e) { toast('اجازهٔ خواندن فونت‌ها داده نشد', 'wn'); }
  };
  $('#bParse').onclick = () => { if (applyScript($('#rawText').value)) { } };
  $('#bReparse').onclick = () => { if (S.raw) applyScript(S.raw); else toast('متنی ذخیره نشده', 'wn'); };
  $('#bClearRaw').onclick = () => { $('#rawText').value = ''; };
  $('#bReplace').onclick = doReplace;
  $('#bWipe').onclick = async () => {
    if (!await ask('پاک کردن داده‌ها', 'همهٔ کار ذخیره‌شده، استایل تگ‌ها و تنظیمات از این مرورگر پاک می‌شود. فونت‌های آپلودی هم حذف می‌شوند. ادامه؟', 'پاک کن')) return;
    ['ms6.auto', 'ms6.styles', 'ms6.settings'].forEach(LS.del);
    for (const n of Object.keys(S.uploads)) await idb('del', 'font:' + n);
    toast('پاک شد — صفحه را تازه کنید', 'ok', 5000); updateLsInfo();
  };
  for (const id in OPT_MAP) { if (id === 'optCleanAuto') continue; const n = $('#' + id); if (n) n.onchange = () => { S.settings[OPT_MAP[id]] = n.checked; saveSettings(); syncSinglePageMode(); if (S.pages.length) { BALCACHE.clear(); renderAll(); } }; }

  /* export format */
  $$('#segFmt button').forEach(b => b.onclick = () => {
    S.settings.fmt = b.dataset.f; saveSettings();
    $$('#segFmt button').forEach(x => x.setAttribute('aria-selected', x === b));
    $('#qWrap').style.display = S.settings.fmt === 'png' ? 'none' : '';
  });
  $('#qRange').oninput = () => { S.settings.quality = +$('#qRange').value; $('#qVal').textContent = faNum(S.settings.quality); saveSettings(); };
  /* export size */
  $$('#segScale button').forEach(b => b.onclick = () => { S.settings.scale = +b.dataset.k; saveSettings(); syncScaleUI(); });
  $('#ddExp [data-dd]').addEventListener('click', syncScaleUI);
  $('#bExpOne').onclick = () => { $$('.dd').forEach(d => d.classList.remove('open')); exportPage(); };
  $('#bExpAll').onclick = () => { $$('.dd').forEach(d => d.classList.remove('open')); exportAll(); };

  /* zoom */
  $('#zIn').onclick = () => setZoom(S.zoom * 1.15, stageMid());
  $('#zOut').onclick = () => setZoom(S.zoom / 1.15, stageMid());
  $('#zVal').onclick = () => setZoom(1);
  $('#bFit').onclick = fitZoom;
  $('#bFit2').onclick = fitZoom;
  $('#bPgPrev').onclick = () => gotoPage(S.cur - 1);
  $('#bPgNext').onclick = () => gotoPage(S.cur + 1);
  $('#bUndo').onclick = undo; $('#bRedo').onclick = redo;
  $('#tScript').onclick = () => togglePanel('script');
  $('#tInspect').onclick = () => togglePanel('inspect');
  $$('[data-closepanel]').forEach(b => b.onclick = () => togglePanel(b.dataset.closepanel, false));
  $('#scrim').onclick = closePanels;
  /* ---------- alignment dialog ---------- */
  const alVal = () => clamp(Math.round(+$('#alStart').value || 1), 1, Math.max(1, S.pages.length || 1));
  function alDraw() {
    const start = alVal(), k = start - 1, pg = S.pages.length, doc = S.rawDoc.length;
    $('#alStart').value = start;
    $('#alInfoT').textContent = doc
      ? `${faNum(pg)} عکس و ${faNum(doc)} صفحهٔ متن. با این تنظیم ${faNum(Math.min(doc, Math.max(0, pg - k)))} صفحه روی هم می‌افتد.`
      : 'هنوز متنی بارگذاری نشده.';
    const t = $('#alThumbs'); t.textContent = '';
    S.pages.slice(0, 40).forEach((p, i) => {
      const txt = i >= k && (i - k) < doc ? i - k + 1 : 0;
      const c = el('div', { class: 'alTh' + (i === k ? ' hit' : '') + (txt ? '' : ' off'), role: 'button', tabindex: '0', 'data-i': i, title: `عکس ${faNum(i + 1)}` });
      const im = el('img', { alt: '', loading: 'lazy' }); if (p.thumb) im.src = p.thumb;
      c.append(im, el('b', { text: faNum(i + 1) }), el('i', { text: txt ? 'متن ' + faNum(txt) : '—' }));
      c.onclick = () => { $('#alStart').value = i + 1; alDraw(); };
      c.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); c.click(); } };
      t.append(c);
    });
    if (S.pages.length > 40) t.append(el('div', { class: 'hint', style: 'align-self:center;padding:0 8px', text: '…' }));
    const extra = doc - Math.max(0, pg - k);
    $('#alMap').textContent = '';
    if (!pg) $('#alMap').append(el('span', { class: 'hint', text: 'اول عکس‌ها را بارگذاری کنید.' }));
    else if (extra > 0) $('#alMap').append(el('span', { class: 'bad', text: `${faNum(extra)} صفحهٔ متن بیرون از عکس‌ها می‌ماند.` }));
    else if (extra < 0) $('#alMap').append(el('span', { class: 'hint', text: `${faNum(-extra)} عکس آخر بدون متن می‌ماند.` }));
    else $('#alMap').append(el('span', { class: 'good', text: 'دقیقاً روی هم می‌افتند.' }));
  }
  function openAlign() {
    if (!S.rawDoc.length && S.doc.length) S.rawDoc = S.doc;
    $('#alStart').value = S.shift + 1;
    alDraw(); $('#ovAlign').classList.add('on');
  }
  $('#bAlign').onclick = openAlign;
  $('#alMinus').onclick = () => { $('#alStart').value = Math.max(1, alVal() - 1); alDraw(); };
  $('#alPlus').onclick = () => { $('#alStart').value = alVal() + 1; alDraw(); };
  $('#alStart').oninput = alDraw;
  $('#alReset').onclick = () => { $('#alStart').value = 1; alDraw(); };
  $('#alAuto').onclick = () => {
    const d = S.rawDoc.length, p = S.pages.length;
    $('#alStart').value = d && p > d ? p - d + 1 : 1; alDraw();
    toast(p > d ? 'حدس زده شد: عکس‌های اضافی اولِ فصل بنر هستند' : 'چیزی برای حدس زدن نبود', p > d ? 'ok' : 'wn');
  };
  $('#alApply').onclick = async () => {
    const k = alVal() - 1;
    if (k !== S.shift && S.pages.some(p => p.layers && p.layers.length)) {
      if (!await ask('جابه‌جایی متن', 'بالن‌هایی که گذاشته‌اید سر جای خودشان روی همان صفحه می‌مانند، ولی متنشان عوض می‌شود. ادامه بدهم؟', 'ادامه بده')) return;
    }
    $('#ovAlign').classList.remove('on');
    setShift(k);
  };

  $('#bFilter').onclick = () => { S.filterLeft = !S.filterLeft; $('#bFilter').setAttribute('aria-pressed', S.filterLeft); $('#bFilter').classList.toggle('on', S.filterLeft); syncCards(); };

  /* inspector panel tabs */
  $$('#segInsp button').forEach(b => b.onclick = () => setPanel(b.dataset.p));

  /* lists */
  $('#cards').addEventListener('click', e => {
    const sk = e.target.closest('[data-skip]'), us = e.target.closest('[data-unskip]'), ss = e.target.closest('[data-showskip]');
    if (sk || us) { e.stopPropagation(); return skipLine(sk ? sk.dataset.skip : us.dataset.unskip, !!sk); }
    if (ss) { S.showSkipped = !S.showSkipped; return syncCards(); }
    const c = e.target.closest('.card'); if (!c || c.classList.contains('skipped')) return;
    S.selB = c.dataset.id;
    const L = S.pages[S.cur] && S.pages[S.cur].layers.find(l => l.bid === S.selB);
    if (L) { selectLayer(L, true); focusLayer(L, S.cur); }
    else {
      S.sel = null; syncInspector();
      const b = currentBubble();
      /* the next line goes into the next empty balloon by itself */
      if (!(b && S.settings.autoPlace && placeAuto(b, true))) { render(S.cur); goTarget(true); }
    }
    syncCards();
  });
  $('#cards').addEventListener('dblclick', e => { const c = e.target.closest('.card'); if (c) startCardEdit(c); });
  $('#cards').addEventListener('keydown', e => {
    const c = e.target.closest('.card'); if (!c) return;
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); c.click(); }
  });
  $('#strip').addEventListener('click', e => { const c = e.target.closest('.pchip'); if (c) gotoPage(+c.dataset.pg); });
  $('#pgrid').addEventListener('click', e => { const c = e.target.closest('.pcard'); if (c) gotoPage(+c.dataset.pg); });

  /* inspector inputs */
  const bind = (id, rid, get, set, lo, hi) => {
    const n = $(id), r = rid ? $(rid) : null;
    const apply = v => { if (!S.sel) return; pushHistSoon(); set(S.sel, clamp(v, lo, hi)); afterEdit(true); };
    n.addEventListener('input', () => { const v = parseFloat(n.value); if (isFinite(v)) { apply(v); if (r) r.value = clamp(v, +r.min, +r.max); } });
    if (r) r.addEventListener('input', () => { apply(get(r)); n.value = get(r); });
  };
  bind('#iSize', '#iSizeR', r => +r.value, (L, v) => L.size = v, 4, 600);
  bind('#iWidth', '#iWidthR', r => +r.value, (L, v) => L.w = v, 20, 20000);
  bind('#iLh', '#iLhR', r => +r.value / 100, (L, v) => L.lh = v, .5, 4);
  bind('#iRot', '#iRotR', r => +r.value, (L, v) => L.rot = v, -360, 360);
  bind('#iStroke', '#iStrokeR', r => +r.value, (L, v) => L.stroke = v, 0, 60);
  if ($('#iShadow')) bind('#iShadow', '#iShadowR', r => +r.value, (L, v) => L.shadow = v, 0, 60);
  if ($('#iShadowC')) $('#iShadowC').addEventListener('input', () => { if (!S.sel) return; pushHistSoon(); S.sel.shadowColor = $('#iShadowC').value; if (!S.sel.shadow) S.sel.shadow = 6; afterEdit(true); });
  /* mobile floating quick bar actions */
  if ($('#mqSm')) $('#mqSm').onclick = () => { if (!S.sel) return; pushHistSoon(); S.sel.size = clamp(Math.round(S.sel.size - 2), 6, 400); afterEdit(true); };
  if ($('#mqBg')) $('#mqBg').onclick = () => { if (!S.sel) return; pushHistSoon(); S.sel.size = clamp(Math.round(S.sel.size + 2), 6, 400); afterEdit(true); };
  if ($('#mqInv')) $('#mqInv').onclick = () => {
    if (!S.sel) return; pushHist();
    const dark = S.sel.color.toLowerCase() === '#ffffff';
    S.sel.color = dark ? '#111111' : '#FFFFFF';
    S.sel.strokeColor = dark ? '#FFFFFF' : '#000000';
    if (!S.sel.stroke) S.sel.stroke = 3.5;
    S.sel.autoInvert = false; afterEdit(true);
  };
  if ($('#mqShd')) $('#mqShd').onclick = () => {
    if (!S.sel) return; pushHist();
    S.sel.shadow = S.sel.shadow > 0 ? 0 : 8;
    S.sel.shadowColor = S.sel.color.toLowerCase() === '#ffffff' ? '#000000' : '#FFFFFF';
    afterEdit(true);
  };
  if ($('#mqFit')) $('#mqFit').onclick = () => { if (!S.sel) return; pushHist(); if (refit(S.sel)) afterEdit(); };
  if ($('#mqDel')) $('#mqDel').onclick = deleteLayer;
  $('#iText').addEventListener('input', () => {
    if (!S.sel) return; pushHistSoon();
    S.sel.t = $('#iText').value;
    const b = bubbles(S.cur).find(x => x.id === S.sel.bid); if (b) b.text = S.sel.t;
    render(S.cur); syncCards(); autosave();
  });
  $('#iFont').addEventListener('change', () => { if (!S.sel) return; pushHist(); S.sel.font = $('#iFont').value; afterEdit(true); });
  $('#iBold').addEventListener('change', () => { if (!S.sel) return; pushHist(); S.sel.bold = $('#iBold').checked; afterEdit(true); });
  $('#iItalic').addEventListener('change', () => { if (!S.sel) return; pushHist(); S.sel.italic = $('#iItalic').checked; afterEdit(true); });
  $('#iColor').addEventListener('input', () => { if (!S.sel) return; pushHistSoon(); S.sel.color = $('#iColor').value; S.sel.autoInvert = false; afterEdit(true); });
  $('#iColorT').addEventListener('change', () => { if (!S.sel) return; const v = $('#iColorT').value.trim(); if (!/^#[0-9a-fA-F]{6}$/.test(v)) { syncInspector(); return toast('رنگ باید مثل #FFFFFF باشد', 'wn'); } pushHist(); S.sel.color = v; S.sel.autoInvert = false; afterEdit(true); });
  $('#iStrokeC').addEventListener('input', () => { if (!S.sel) return; pushHistSoon(); S.sel.strokeColor = $('#iStrokeC').value; afterEdit(true); });
  $('#bDel').onclick = deleteLayer;
  $('#bDup').onclick = duplicateLayer;
  $('#bRefit').onclick = () => { if (!S.sel) return; pushHist(); if (refit(S.sel)) afterEdit(); };
  $('#bTagApply').onclick = () => {
    const L = S.sel; if (!L) return;
    const st = style(L.tag);
    Object.assign(st, { font: L.font, size: Math.round(L.size), stroke: L.stroke, lh: L.lh, bold: L.bold, italic: L.italic, fontAuto: false });
    if (!L.autoInvert) { st.color = L.color; st.strokeColor = L.strokeColor; }
    saveStyles();
    toast(`استایل تگ «${L.tag}» ذخیره شد` + (L.autoInvert ? ' (رنگ خودکار ذخیره نشد)' : ''), 'ok', 4200);
  };

  /* drag & drop */
  let dragDepth = 0;
  addEventListener('dragenter', e => { if (![...e.dataTransfer.types].includes('Files')) return; dragDepth++; document.body.classList.add('dragging'); });
  addEventListener('dragleave', () => { if (--dragDepth <= 0) { dragDepth = 0; document.body.classList.remove('dragging'); } });
  addEventListener('dragover', e => { if ([...e.dataTransfer.types].includes('Files')) e.preventDefault(); });
  addEventListener('drop', async e => {
    e.preventDefault(); dragDepth = 0; document.body.classList.remove('dragging');
    const files = [...e.dataTransfer.files];
    const imgs = files.filter(f => /^image\//.test(f.type) || /\.zip$/i.test(f.name) || /zip/i.test(f.type || ''));
    const txt = files.find(f => /\.txt$/i.test(f.name));
    const proj = files.find(f => /\.mobin$/i.test(f.name)) || files.find(f => /\.json$/i.test(f.name));
    if (proj) await openProject(proj);
    if (txt) { const { text, enc } = await readTextFile(txt); if (enc !== 'UTF-8') toast(`فایل با رمزگذاری ${enc} خوانده شد`); applyScript(text); }
    if (imgs.length) await loadImages(imgs);
    if (!imgs.length && !txt && !proj) toast('فقط عکس، ZIP، TXT یا فایل پروژه (.mobin)', 'wn');
  });

  S.narrow = NARROW();
  addEventListener('resize', () => {
    if (NARROW() !== S.narrow) { S.narrow = NARROW(); if (S.narrow || S.wasBlank) closePanels(); else { $('#script').classList.remove('hide'); $('#inspect').classList.remove('hide'); syncPanelMode(); } }
    clearTimeout(S.rz); S.rz = setTimeout(() => { if (S.pages.length && Math.abs(S.zoom - S.fitZoom) < .02) fitZoom(); sharpenSoon(60); }, 180);
  });
  /* unsaved-work guard.
     In the desktop app the native window asks instead — a web beforeunload
     would silently block the close button there. */
  window.__msDirty = () => editSeq !== savedSeq && (S.file ? S.pages.length > 0 || S.doc.length > 0 :
    S.doc.length > 0 || S.pages.some(p => p.layers.length || (p.cleans && p.cleans.length)));
  /* "save and exit" keeps everything: pictures, text, layers and fonts in the .mobin */
  window.__msSave = async () => { try { return !!(await saveMobin(false)); } catch (e) { return false; } };
  if (!window.MOBIN_DESKTOP) {
    addEventListener('beforeunload', e => { if (window.__msDirty()) { e.preventDefault(); e.returnValue = ''; } });
  }
}

/* ---------- card inline edit ---------- */
function startCardEdit(card) {
  const id = card.dataset.id, b = bubbles(S.cur).find(x => x.id === id);
  if (!b) return;
  const ta = el('textarea', { class: 'cedit', spellcheck: 'false' });
  ta.value = b.text;
  card.querySelector('.ctx').replaceWith(ta);
  ta.focus(); ta.setSelectionRange(ta.value.length, ta.value.length);
  const done = commit => {
    if (commit && ta.value !== b.text) {
      pushHist(); b.text = ta.value;
      for (const p of S.pages) for (const L of p.layers) if (L.bid === id) L.t = b.text;
      autosave(); renderAll();
    }
    syncCards(); syncInspector();
  };
  ta.addEventListener('blur', () => done(true));
  ta.addEventListener('keydown', e => {
    e.stopPropagation();
    if (e.key === 'Escape') { ta.value = b.text; ta.blur(); }
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) ta.blur();
  });
}

/* ---------- layer ops ---------- */
function deleteLayer() {
  const L = S.sel; if (!L) return;
  pushHist();
  const p = S.pages[S.cur];
  p.layers = p.layers.filter(x => x !== L);
  if (L.bid) S.selB = L.bid;
  S.sel = null;
  syncAll(); autosave();
}
function duplicateLayer() {
  const L = S.sel; if (!L) return;
  pushHist();
  const c = { ...L, bid: null, x: L.x + 24, y: L.y + 24 };
  S.pages[S.cur].layers.push(c);
  selectLayer(c, false); afterEdit();
}
function doReplace() {
  const a = $('#repA').value, b = $('#repB').value;
  if (!a) return toast('عبارت جست‌وجو خالی است', 'wn');
  pushHist();
  let n = 0;
  const esc = a.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp($('#repWord').checked ? `(?<![\\wآ-ی\\u200c])${esc}(?![\\wآ-ی\\u200c])` : esc, 'g');
  const run = s => s.replace(re, () => { n++; return b; });
  for (const g of S.doc) for (const x of g) { x.text = run(x.text); if (x.raw) x.raw = x.raw.replace(re, b); }
  for (const p of S.pages) for (const L of p.layers) L.t = run(L.t);
  if (S.raw) { S.raw = S.raw.replace(re, b); if ($('#rawText')) $('#rawText').value = S.raw; }
  syncAll(); autosave();
  toast(n ? `${faNum(n)} مورد جایگزین شد` : 'موردی پیدا نشد', n ? 'ok' : 'wn');
}
function updateLsInfo() {
  let n = 0; try { for (const k in localStorage) if (k.startsWith('ms6.')) n += (localStorage[k] || '').length; } catch (e) { }
  $('#lsInfo').textContent = n ? `حدود ${faNum(Math.round(n / 1024))} کیلوبایت ذخیره شده` : 'چیزی ذخیره نشده';
}

/* ---------- app menu in the title bar ---------- */
const dcmd = (n, a) => (window.msDesktop && msDesktop.cmd) ? msDesktop.cmd(n, a).catch(() => null) : Promise.resolve(null);
function closeMenus() { $$('.dd').forEach(d => d.classList.remove('open')); }
function showMenuState(st) {
  if (!st) return;
  const g = $('#safeGpuChk'); if (g) g.classList.toggle('on', !!st.safeGpu);
  const z = $('#ddApp [data-cmd=uiZoom0]'); if (z && st.zoom) z.textContent = faNum(Math.round(st.zoom * 100)) + '٪';
}
async function appCmd(c) {
  switch (c) {
    case 'saveProj': closeMenus(); return saveMobin(false);
    case 'saveAs': closeMenus(); return saveMobin(true);
    case 'newProj': closeMenus(); return newProject();
    case 'openProj': closeMenus(); return openProjectDialog();
    case 'saveJson': closeMenus(); return saveProject();
    case 'saveBundle': closeMenus(); return saveBundle();
    case 'showLast': closeMenus(); if (!(await dcmd('showLast'))) toast('هنوز در این اجرا فایلی ذخیره نشده'); return;
    case 'uiZoomIn': return showMenuState(await dcmd('uizoom', 1));
    case 'uiZoomOut': return showMenuState(await dcmd('uizoom', -1));
    case 'uiZoom0': return showMenuState(await dcmd('uizoom', 0));
    case 'theme': return toggleTheme();
    case 'ai': closeMenus(); return aiOpen();
    case 'proof': closeMenus(); return openProof('issues');
    case 'typeMode': closeMenus(); return typeOpen(!S.typeMode);
    case 'fullscreen': closeMenus();
      if (!window.msDesktop) { try { if (document.fullscreenElement) await document.exitFullscreen(); else await document.documentElement.requestFullscreen(); } catch (e) { toast('تمام‌صفحه در این مرورگر در دسترس نیست', 'wn'); } return; }
      return dcmd('fullscreen');
    case 'settings': closeMenus(); return $('#bSettings').click();
    case 'help': closeMenus(); return $('#bHelp').click();
    case 'safeGpu': return showMenuState(await dcmd('safeGpu'));
    case 'userData': closeMenus(); return dcmd('userData');
    case 'reload': closeMenus(); return dcmd('reload');
    case 'about': closeMenus(); return dcmd('about');
    case 'quit': closeMenus(); return dcmd('quit');
  }
}
function wireAppMenu() {
  $$('#ddApp [data-cmd]').forEach(b => b.addEventListener('click', e => { e.stopPropagation(); appCmd(b.dataset.cmd); }));
  const ab = $('#ddApp [data-dd]');
  if (ab) ab.addEventListener('click', () => { dcmd('state').then(showMenuState); });
  if (!window.msDesktop) $$('#ddApp [data-cmd=quit],#ddApp [data-cmd=reload],#ddApp [data-cmd=safeGpu],#ddApp [data-cmd=userData],#ddApp [data-cmd=showLast],#ddApp .mrow').forEach(n => n.style.display = 'none');
  else if (window.MOBIN_ANDROID) $$('#ddApp [data-cmd=reload],#ddApp [data-cmd=safeGpu],#ddApp [data-cmd=userData],#ddApp [data-cmd=showLast],#ddApp .mrow').forEach(n => n.style.display = 'none');
}

/* ============================================================
   KEYBOARD  — layout independent (e.code)
   ============================================================ */
/* e.code is the layout-independent identifier every shortcut below keys on, but
   not every engine fills it in: the Android WebView reports code === '' for
   hardware keys (key is ' ', keyCode 32). Without a fallback no shortcut works
   there — including Space, which then falls through to the native scroll. Derive
   the same names from e.key / e.keyCode so both platforms behave alike. */
function codeOf(e) {
  if (e.code) return e.code;
  const k = e.key || '', loc = e.location;
  if (/^[a-zA-Z]$/.test(k)) return 'Key' + k.toUpperCase();
  if (/^[0-9]$/.test(k)) return (loc === 3 ? 'Numpad' : 'Digit') + k;
  if (k === ' ' || k === 'Spacebar') return 'Space';
  if (k === '+' || k === '=') return loc === 3 ? 'NumpadAdd' : 'Equal';
  if (k === '-' || k === '_') return loc === 3 ? 'NumpadSubtract' : 'Minus';
  if (k === '[' || k === ']') return k === '[' ? 'BracketLeft' : 'BracketRight';
  if (/^(Escape|Esc|Enter|Tab|Backspace|Delete|ArrowUp|ArrowDown|ArrowLeft|ArrowRight|F\d{1,2})$/.test(k)) return k === 'Esc' ? 'Escape' : k;
  const c = e.keyCode || e.which || 0;
  if (c === 32) return 'Space';
  if (c === 13) return 'Enter';
  if (c === 27) return 'Escape';
  if (c === 9) return 'Tab';
  if (c === 8) return 'Backspace';
  if (c === 46) return 'Delete';
  if (c === 187 || c === 107) return 'Equal';
  if (c === 189 || c === 109) return 'Minus';
  if (c === 219) return 'BracketLeft';
  if (c === 221) return 'BracketRight';
  if (c >= 65 && c <= 90) return 'Key' + String.fromCharCode(c);
  if (c >= 48 && c <= 57) return 'Digit' + String.fromCharCode(c);
  if (c >= 37 && c <= 40) return ['ArrowLeft', 'ArrowUp', 'ArrowRight', 'ArrowDown'][c - 37];
  if (c >= 112 && c <= 123) return 'F' + (c - 111);
  return '';
}

addEventListener('keydown', e => {
  if (typeof tOn !== 'undefined' && tOn) return;
  const t = e.target;
  const typing = t && (/^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName) || t.isContentEditable);
  const mod = e.ctrlKey || e.metaKey;
  const code = codeOf(e);

  if (e.key === 'Escape') {
    if ($$('.dd.open').length) { closeMenus(); return; }
    if ($('#ovAsk').classList.contains('on')) return askEnd(false);
    const open = $$('.ov.on')[0]; if (open) { open.classList.remove('on'); return; }
    if (typing) { t.blur(); return; }
    if (S.sel) { S.sel = null; selectLayer(null); render(S.cur); }
    return;
  }
  if (mod && code === 'KeyS') { e.preventDefault(); return saveMobin(e.shiftKey); }
  if (mod && !e.shiftKey && code === 'KeyO') { e.preventDefault(); return openProjectDialog(); }
  if (mod && !e.shiftKey && code === 'KeyN') { e.preventDefault(); return newProject(); }
  if (mod && code === 'KeyE') { e.preventDefault(); return e.shiftKey ? exportAll() : exportPage(); }
  /* Ctrl+Shift + / - / 0 belong to the window menu (size of the app's own text) */
  if (mod && !e.shiftKey && (code === 'Digit0' || code === 'Numpad0')) { e.preventDefault(); return fitZoom(); }
  if (mod && !e.shiftKey && (code === 'Equal' || code === 'NumpadAdd')) { e.preventDefault(); return setZoom(S.zoom * 1.15, stageMid()); }
  if (mod && !e.shiftKey && (code === 'Minus' || code === 'NumpadSubtract')) { e.preventDefault(); return setZoom(S.zoom / 1.15, stageMid()); }
  if (mod && code === 'KeyB') { e.preventDefault(); makeSnapshot('دستی').then(r => r && toast('نقطهٔ بازگشت ساخته شد', 'ok')); return; }
  if (!typing && !mod && code === 'KeyE') { e.preventDefault(); return setTool(S.tool === 'clean' ? 'text' : 'clean'); }
  if (!typing && !mod && code === 'KeyG') { e.preventDefault(); return toggleGhost(); }
  /* Space never scrolls the stage: it is the hold-to-peek hotkey. Focused controls
     keep native Space activation (they carry their own handlers). */
  if (!typing && !mod && code === 'Space') {
    const onCtl = t && t.closest && t.closest('button,a,label,summary,[role=button],[role=tab],.dd,.card');
    if (onCtl) return;
    e.preventDefault();
    if (!e.repeat && S.pages.some(p => p.rawImg || (p.rawBoxes && p.rawBoxes.length))) { S._spaceGhost = true; toggleGhost(true); }
    return;
  }
  if (code === 'F1') { e.preventDefault(); closeMenus(); return $('#bHelp').click(); }
  if (code === 'F9') { e.preventDefault(); return togglePanel('script'); }
  if (code === 'F10') { e.preventDefault(); return togglePanel('inspect'); }
  if (typing) return;
  if (mod && code === 'KeyZ' && !e.shiftKey) { e.preventDefault(); return undo(); }
  if (mod && (code === 'KeyY' || (code === 'KeyZ' && e.shiftKey))) { e.preventDefault(); return redo(); }

  const L = S.sel;
  if (mod && code === 'KeyD' && L) { e.preventDefault(); return duplicateLayer(); }
  if ((code === 'Enter' || code === 'NumpadEnter') && !mod && !e.altKey && !e.defaultPrevented && !(t && t.closest && t.closest('button,[role=button],a,label,.dd'))) {
    e.preventDefault();
    const b = currentBubble();
    if (!b || b.skip) return toast('متنی برای گذاشتن نمانده', 'i');
    if (placedSet(S.cur).has(b.id)) { const ly = S.pages[S.cur].layers.find(l => l.bid === b.id); if (ly) { selectLayer(ly, true); focusLayer(ly, S.cur); } return; }
    if (!placeAuto(b)) toast('بالن خالی بعدی پیدا نشد — روی بالن کلیک کنید', 'wn', 3500);
    return;
  }
  if (mod && e.shiftKey && code === 'KeyA') { e.preventDefault(); return autoPlacePage(); }
  if (code === 'Tab') {
    e.preventDefault();
    const bs = live(S.cur); if (!bs.length) return;
    const i = bs.findIndex(b => b.id === S.selB);
    const next = bs[(i + (e.shiftKey ? -1 + bs.length : 1)) % bs.length];
    S.selB = next.id;
    const lay = S.pages[S.cur] && S.pages[S.cur].layers.find(l => l.bid === next.id);
    if (lay) selectLayer(lay, false); else { S.sel = null; syncInspector(); render(S.cur); }
    syncCards();
    const card = $(`#cards .card[data-id="${CSS.escape(next.id)}"]`);
    if (card) revealIn(card);
    return;
  }
  if (!L) return;
  if (code === 'F2') { e.preventDefault(); setPanel('layer'); $('#iText').focus(); $('#iText').select(); return; }
  if (code === 'Delete' || code === 'Backspace') { e.preventDefault(); return deleteLayer(); }
  const step = e.shiftKey ? 12 : 2;
  if (code === 'ArrowUp' || code === 'ArrowDown' || code === 'ArrowLeft' || code === 'ArrowRight') {
    e.preventDefault(); pushHistSoon();
    if (code === 'ArrowUp') L.y -= step; else if (code === 'ArrowDown') L.y += step;
    else if (code === 'ArrowLeft') L.x -= step; else L.x += step;
    return afterEdit(true), autosave();
  }
  if (code === 'BracketRight' || code === 'BracketLeft') {
    e.preventDefault(); pushHistSoon();
    L.size = clamp(L.size + (code === 'BracketRight' ? 1 : -1), 6, 400);
    return afterEdit(true), autosave();
  }
});

addEventListener('keyup', e => {
  if (codeOf(e) === 'Space' && S._spaceGhost) { S._spaceGhost = false; toggleGhost(false); }
});

/* ============================================================
   INIT
   ============================================================ */
(async function init() {
  wire(); initMobile(); buildSwatches(); readSettingsToUI(); updateHistBtns();
  if (NARROW()) closePanels(); else syncPanelMode();
  try { const s = JSON.parse(LS.get('ms6.settings') || 'null'); if (s) for (const k in DEFAULTS) if (typeof s[k] === typeof DEFAULTS[k]) S.settings[k] = s[k]; } catch (e) { }
  try { const st = JSON.parse(LS.get('ms6.styles') || 'null'); if (st) S.styles = cleanStyles(st); } catch (e) { }
  readSettingsToUI();

  await loadBuiltins();
  try { await document.fonts.ready; } catch (e) { }
  await loadUploads();
  remapTagFonts();
  $('#iFont').dataset.sig = '';
  probeAA();
  addEventListener('focus', () => probeAA());
  try { document.fonts.addEventListener('loadingdone', () => { fontEpoch++; renderAll(); }); } catch (e) { }

  /* restore previous session — quietly, without any question (see optAutoResume) */
  let auto = null;
  try { auto = JSON.parse(LS.get('ms6.auto') || 'null'); } catch (e) { }
  /* started by double-clicking a .mobin in Explorer: open that one instead */
  const pend = await dcmd('pendingOpen');
  if (pend) auto = null;
  const autoFile = !!(auto && auto.file && auto.file.path && window.msDesktop && msDesktop.openProject);
  if (auto && (auto.v === 6 || auto.v === 7) && Array.isArray(auto.doc) && (auto.doc.flat().length || autoFile)) {
    /* خاموش‌بودن بازگشایی خودکار: کاربر نمی‌خواهد کار قبلی برگردد، پس هیچ سؤالی هم پرسیده نمی‌شود */
    if (S.settings.autoResume === false) {
      /* deliberately kept in localStorage: turning the option back on brings it home */
    } else if (!(autoFile && await reopenAuto(auto))) {
      S.raw = str(auto.raw, '', 2e6);
      S.doc = cleanDoc(auto.doc);
      if (auto.styles) S.styles = Object.assign(cleanStyles(auto.styles), S.styles);
      S.pending = Array.isArray(auto.L) ? auto.L : [];
      S.pendingCleans = Array.isArray(auto.C) ? auto.C : [];
      S.imgNames = Array.isArray(auto.names) ? auto.names : [];
      pickNextBubble();
      toast('متن کار قبلی باز شد — حالا عکس‌ها را بارگذاری کنید', 'ok', 5500);
    }
  }
  readSettingsToUI();
  syncAll();
  await snapLoad(); buildSnapList(); startSnapTimer(); S.lastSnapSig = snapSig();
  wireTour();
  document.body.classList.add('ready');
  if (pend) window.__msOpenPath(pend); else maybeFirstRun();
})();

