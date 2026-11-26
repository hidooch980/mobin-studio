'use strict';
const { app, BrowserWindow, Menu, shell, dialog, nativeTheme, ipcMain, screen } = require('electron');
const path = require('path');
const fs = require('fs');

const APP_ID = 'com.mobinstudio.app';
const VERSION = app.getVersion();

/* ---------- single instance ---------- */
if (!app.requestSingleInstanceLock()) { app.quit(); process.exit(0); }

app.setAppUserModelId(APP_ID);
app.commandLine.appendSwitch('lang', 'fa');
/* single-file app on file:// — needed so localStorage / IndexedDB persist */
app.commandLine.appendSwitch('allow-file-access-from-files');

/* optional safe mode: a flag file disables GPU when a driver misbehaves */
const SAFE_FLAG = path.join(app.getPath('userData'), 'no-gpu');
try { if (fs.existsSync(SAFE_FLAG)) app.disableHardwareAcceleration(); } catch (e) { }

/* never show Electron's English crash box for a main-process error; log it instead */
const LOG = path.join(app.getPath('userData'), 'error.log');
const log = (msg) => { try { fs.appendFileSync(LOG, new Date().toISOString() + ' ' + msg + '\n'); } catch (e) { } };
process.on('uncaughtException', (err) => { log((err && err.stack) || err); });

/* answers native message boxes during automated tests (never set for users) */
function askBox(opts) {
  if (process.env.MS_TEST_ANSWER != null) return Number(process.env.MS_TEST_ANSWER);
  return dialog.showMessageBoxSync(win, opts);
}

/* ---------- window bounds memory ---------- */
const STATE = path.join(app.getPath('userData'), 'window.json');
function readState() {
  try {
    const s = JSON.parse(fs.readFileSync(STATE, 'utf8'));
    if (s && Number.isFinite(s.width) && Number.isFinite(s.height)) return s;
  } catch (e) { }
  return null;
}
function writeState(w) {
  if (!w || w.isDestroyed()) return;
  try {
    const b = w.getNormalBounds();
    fs.writeFileSync(STATE, JSON.stringify({ ...b, max: w.isMaximized(), zoom: w.webContents.getZoomLevel() }));
  } catch (e) { }
}
/* a remembered position is used only if it is still on a connected monitor */
function onScreen(b) {
  if (!b || !Number.isFinite(b.x) || !Number.isFinite(b.y)) return false;
  try {
    return screen.getAllDisplays().some(d => {
      const a = d.workArea;
      return b.x < a.x + a.width - 120 && b.x + b.width > a.x + 120 &&
        b.y >= a.y - 8 && b.y < a.y + a.height - 80;
    });
  } catch (e) { return false; }
}

/* ---------- tiny preference store ---------- */
const PREFS = path.join(app.getPath('userData'), 'prefs.json');
function readPref(k) {
  try { return JSON.parse(fs.readFileSync(PREFS, 'utf8'))[k]; } catch (e) { return undefined; }
}
function writePref(k, v) {
  let o = {};
  try { o = JSON.parse(fs.readFileSync(PREFS, 'utf8')) || {}; } catch (e) { }
  o[k] = v;
  try { fs.writeFileSync(PREFS, JSON.stringify(o)); } catch (e) { }
}

/* ---------- window frame: our own title bar, system buttons drawn by Windows ---------- */
const FRAME = { dark: { color: '#14171D', symbolColor: '#B2BAC6' }, light: { color: '#E9EEF5', symbolColor: '#475569' } };
const TITLE_H = 40;
const themeName = () => (readPref('theme') === 'light' ? 'light' : 'dark');
const overlayFor = (zf) => ({ ...FRAME[themeName()], height: Math.max(28, Math.round(TITLE_H * (zf || 1))) });
function syncOverlay() {
  if (!win || win.isDestroyed() || typeof win.setTitleBarOverlay !== 'function') return;
  try { win.setTitleBarOverlay(overlayFor(win.webContents.getZoomFactor())); } catch (e) { }
}

let win = null;
let forceClose = false;
let closePending = false;
let lastSaved = null;

/* ---------- saving files ---------- */
const TYPES = {
  png: ['تصویر PNG', 'png'], jpg: ['تصویر JPEG', 'jpg'], jpeg: ['تصویر JPEG', 'jpeg'],
  webp: ['تصویر WebP', 'webp'], zip: ['بستهٔ ZIP', 'zip'],
  json: ['پروژهٔ Mobin Studio (JSON)', 'json'], txt: ['متن ساده', 'txt'],
  mobin: ['پروژهٔ Mobin Studio', 'mobin']
};
/* Windows does not allow \ / : * ? " < > | in names, nor CON, PRN, … */
function cleanName(n) {
  let s = String(n || '').replace(/[\\/:*?"<>|\u0000-\u001f]+/g, '_').replace(/[. ]+$/, '').trim();
  if (!s || s.startsWith('.')) s = 'export' + s;
  if (/^(con|prn|aux|nul|com\d|lpt\d)(\.|$)/i.test(s)) s = '_' + s;
  if (s.length > 150) { const ext = path.extname(s).slice(0, 12); s = s.slice(0, 150 - ext.length) + ext; }
  return s;
}
function saveFolder() {
  let custom = readPref('customSaveDir');
  try { if (custom && fs.existsSync(custom)) return custom; } catch (e) { }
  let dir = readPref('saveDir');
  try { if (!dir || !fs.existsSync(dir)) dir = app.getPath('downloads'); } catch (e) { dir = app.getPath('documents'); }
  return dir;
}
function dialogFilters(name) {
  const F = TYPES[path.extname(name).slice(1).toLowerCase()];
  return (F ? [{ name: F[0], extensions: [F[1]] }] : []).concat([{ name: 'همهٔ فایل‌ها', extensions: ['*'] }]);
}
function noteSaved(p) { lastSaved = p; writePref('saveDir', path.dirname(p)); }
function writeError(err) {
  const c = err && err.code;
  if (c === 'EACCES' || c === 'EPERM') return 'اجازهٔ نوشتن در این پوشه نیست. پوشهٔ دیگری انتخاب کنید.';
  if (c === 'ENOSPC') return 'فضای دیسک پر است.';
  if (c === 'EBUSY') return 'این فایل در برنامهٔ دیگری باز است.';
  return String((err && err.message) || err);
}

/* the renderer hands over the finished bytes; we ask where and write them */
ipcMain.handle('ms:save', async (e, name, data, direct) => {
  if (!win || win.isDestroyed() || e.sender !== win.webContents) return { ok: false, error: 'پنجره پیدا نشد' };
  if (typeof name !== 'string' || (typeof data !== 'string' && !Buffer.isBuffer(data) && !(data instanceof Uint8Array))) return { ok: false, error: 'دادهٔ فایل نامعتبر است' };
  if ((typeof data === 'string' ? Buffer.byteLength(data) : data.byteLength) > OPEN_LIMIT) return { ok: false, error: 'فایل بیش از حد بزرگ است' };
  name = cleanName(name);
  let target;
  const customDir = readPref('customSaveDir');
  if (process.env.MS_TEST_SAVE_DIR) target = path.join(process.env.MS_TEST_SAVE_DIR, name);
  else if (direct && customDir && fs.existsSync(customDir)) {
    target = path.join(customDir, name);
  } else {
    const r = await dialog.showSaveDialog(win, {
      title: 'ذخیرهٔ فایل',
      defaultPath: path.join(saveFolder(), name),
      buttonLabel: 'ذخیره',
      filters: dialogFilters(name),
      properties: ['showOverwriteConfirmation', 'createDirectory']
    });
    if (r.canceled || !r.filePath) return { ok: false, canceled: true };
    target = r.filePath;
  }
  try {
    if (!Buffer.isBuffer(data) && !(data instanceof Uint8Array)) return { ok: false, error: 'دادهٔ فایل نامعتبر است' };
    if (data.byteLength > OPEN_LIMIT) return { ok: false, error: 'فایل بیش از حد بزرگ است' };
    target = path.resolve(target);
    await writeAtomic(target, Buffer.from(data));
  } catch (err) {
    return { ok: false, error: writeError(err) };
  }
  noteSaved(target);
  return { ok: true, name: path.basename(target), path: target };
});

/* ---------- .mobin project files (one file, like .psd) ---------- */
const PROJ_EXT = /\.(mobin|json|zip)$/i;
const known = new Set();            // paths the user picked/opened: Ctrl+S may write there without asking
const OPEN_LIMIT = 512 * 1024 * 1024;
function resolveKnownPath(p) {
  if (typeof p !== 'string' || !p || p.length > 32768) return null;
  let resolved;
  try { resolved = path.resolve(p); } catch (e) { return null; }
  return known.has(resolved) ? resolved : null;
}
function recentList() {
  const r = readPref('recent');
  if (!Array.isArray(r)) return [];
  return r.filter(p => {
    if (typeof p !== 'string' || !p || p.length > 32768) return false;
    try { known.add(path.resolve(p)); return true; } catch (e) { return false; }
  }).slice(0, 10);
}
function addRecent(p) {
  known.add(p);
  const l = recentList().filter(x => x.toLowerCase() !== p.toLowerCase());
  l.unshift(p);
  writePref('recent', l.slice(0, 10));
  try { app.addRecentDocument(p); } catch (e) { }
}
/* a .mobin given on the command line (double-click in Explorer) */
function argFile(argv, cwd) {
  for (const a of (argv || []).slice(1)) {
    if (!a || a.startsWith('-') || !/\.mobin$/i.test(a)) continue;
    try { const p = path.resolve(cwd || process.cwd(), a); if (fs.statSync(p).isFile()) return p; } catch (e) { }
  }
  return null;
}
let pendingOpen = argFile(process.argv);
if (pendingOpen) { pendingOpen = path.resolve(pendingOpen); known.add(pendingOpen); }
/* never leave a half-written project: write next to it, then swap */
async function writeAtomic(target, buf) {
  const tmp = target + '.' + process.pid + '.' + require('crypto').randomBytes(6).toString('hex') + '.tmp';
  try {
    const h = await fs.promises.open(tmp, 'wx');
    try {
      await h.writeFile(buf);
      await h.sync();
    } finally { await h.close(); }
    await fs.promises.rename(tmp, target);
  } catch (err) {
    await fs.promises.unlink(tmp).catch(() => { });
    throw err;
  }
}
ipcMain.handle('ms:saveProject', async (e, p, name, data, asNew) => {
  if (!win || win.isDestroyed() || e.sender !== win.webContents) return { ok: false, error: 'پنجره پیدا نشد' };
  if (typeof name !== 'string' || (typeof data !== 'string' && !Buffer.isBuffer(data) && !(data instanceof Uint8Array))) return { ok: false, error: 'دادهٔ پروژه نامعتبر است' };
  if ((typeof data === 'string' ? Buffer.byteLength(data) : data.byteLength) > OPEN_LIMIT) return { ok: false, error: 'فایل بیش از حد بزرگ است' };
  name = cleanName(/\.mobin$/i.test(name) ? name : (name || 'پروژه') + '.mobin');
  let target = null;
  const authorizedPath = resolveKnownPath(p);
  if (authorizedPath && !asNew) target = authorizedPath;
  else if (process.env.MS_TEST_SAVE_DIR) target = path.join(process.env.MS_TEST_SAVE_DIR, name);
  else {
    const dir = authorizedPath ? path.dirname(authorizedPath) : saveFolder();
    const r = await dialog.showSaveDialog(win, {
      title: asNew && p ? 'ذخیره با نام' : 'ذخیرهٔ پروژه',
      defaultPath: path.join(dir, name),
      buttonLabel: 'ذخیره',
      filters: [{ name: 'پروژهٔ Mobin Studio', extensions: ['mobin'] }],
      properties: ['showOverwriteConfirmation', 'createDirectory']
    });
    if (r.canceled || !r.filePath) return { ok: false, canceled: true };
    target = /\.mobin$/i.test(r.filePath) ? r.filePath : r.filePath + '.mobin';
  }
  try { await writeAtomic(target, Buffer.from(data)); }
  catch (err) { return { ok: false, error: writeError(err) }; }
  noteSaved(target); addRecent(target);
  return { ok: true, name: path.basename(target), path: target };
});
ipcMain.handle('ms:openProject', async (e, p) => {
  if (!win || win.isDestroyed() || e.sender !== win.webContents) return { ok: false, error: 'پنجره پیدا نشد' };
  let target = null;
  if (p) {
    /* Paths are only accepted from a user-authorized source: recent entries or Explorer. */
    if (typeof p !== 'string' || p.length > 32768 || !PROJ_EXT.test(p)) return { ok: false, error: 'این فایل پروژه نیست' };
    try { target = path.resolve(p); } catch (err) { return { ok: false, error: 'مسیر فایل نامعتبر است' }; }
    if (!known.has(target)) return { ok: false, error: 'این مسیر از برنامه انتخاب نشده است' };
  } else if (process.env.MS_TEST_OPEN) target = process.env.MS_TEST_OPEN;
  else {
    const last = recentList()[0];
    const r = await dialog.showOpenDialog(win, {
      title: 'باز کردن پروژه',
      defaultPath: last ? path.dirname(last) : saveFolder(),
      buttonLabel: 'باز کن',
      filters: [{ name: 'پروژهٔ Mobin Studio', extensions: ['mobin'] }, { name: 'پروژه‌های قدیمی (JSON / ZIP)', extensions: ['json', 'zip'] }, { name: 'همهٔ فایل‌ها', extensions: ['*'] }],
      properties: ['openFile']
    });
    if (r.canceled || !r.filePaths || !r.filePaths[0]) return { ok: false, canceled: true };
    target = r.filePaths[0];
  }
  let data;
  try {
    const st = await fs.promises.stat(target);
    if (!st.isFile()) throw Object.assign(new Error('not a file'), { code: 'ENOENT' });
    if (st.size > OPEN_LIMIT) return { ok: false, error: 'فایل بیش از حد بزرگ است' };
    data = await fs.promises.readFile(target);
  } catch (err) {
    if (err && err.code === 'ENOENT') return { ok: false, error: 'فایل پیدا نشد: ' + path.basename(target) };
    return { ok: false, error: writeError(err) };
  }
  target = path.resolve(target);
  if (/\.mobin$/i.test(target)) addRecent(target);
  else known.add(target);
  return { ok: true, path: target, name: path.basename(target), data: new Uint8Array(data.buffer, data.byteOffset, data.byteLength) };
});

/* run code in the page; never wait forever if the page is busy */
function evalJS(code, fallback, ms) {
  if (!win || win.isDestroyed()) return Promise.resolve(fallback);
  const p = win.webContents.executeJavaScript(code, true).catch(() => fallback);
  if (!ms) return p;
  return Promise.race([p, new Promise(r => setTimeout(() => r(fallback), ms))]);
}

function createWindow() {
  const st = readState();
  const area = screen.getPrimaryDisplay().workAreaSize;
  const width = Math.min(st ? st.width : 1440, area.width);
  const height = Math.min(st ? st.height : 920, area.height);
  const placed = st && onScreen(st);
  win = new BrowserWindow({
    width: Math.max(width, Math.min(1120, area.width)),
    height: Math.max(height, Math.min(680, area.height)),
    x: placed ? st.x : undefined,
    y: placed ? st.y : undefined,
    minWidth: Math.min(1120, area.width), minHeight: Math.min(680, area.height),
    backgroundColor: FRAME[themeName()].color,
    titleBarStyle: 'hidden',
    titleBarOverlay: overlayFor(st && Number.isFinite(st.zoom) ? Math.pow(1.2, st.zoom) : 1),
    show: false,
    autoHideMenuBar: true,
    icon: path.join(__dirname, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
      spellcheck: false,
      backgroundThrottling: false
    }
  });
  /* first start on a laptop-size screen: open maximized */
  if ((st && st.max) || (!st && (area.width < 1500 || area.height < 960))) win.maximize();

  win.once('ready-to-show', () => {
    win.show();
    if (st && Number.isFinite(st.zoom)) win.webContents.setZoomLevel(st.zoom);
    syncOverlay();
  });

  win.loadFile(path.join(__dirname, 'index.html'));
  /* touchpad pinch must zoom the picture, not the whole program */
  win.webContents.setVisualZoomLevelLimits(1, 1).catch(() => { });

  /* never let the app navigate away or open a second window */
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (e, url) => {
    if (url !== win.webContents.getURL()) e.preventDefault();
  });

  /* fallback for any plain browser-style download: same "Save as" box */
  win.webContents.session.on('will-download', (e, item) => {
    const name = cleanName(item.getFilename() || 'export');
    if (process.env.MS_TEST_SAVE_DIR) item.setSavePath(path.join(process.env.MS_TEST_SAVE_DIR, name));
    else item.setSaveDialogOptions({
      title: 'ذخیرهٔ فایل',
      defaultPath: path.join(saveFolder(), name),
      buttonLabel: 'ذخیره',
      filters: dialogFilters(name)
    });
    item.once('done', (_e, state) => {
      if (state !== 'completed' || !win || win.isDestroyed()) return;
      const p = item.getSavePath();
      noteSaved(p);
      win.webContents.executeJavaScript(
        'window.toast && toast(' + JSON.stringify('ذخیره شد — ' + path.basename(p)) + ",'ok')"
      ).catch(() => { });
    });
  });

  /* if the renderer dies, offer a restart instead of a dead white window */
  win.webContents.on('render-process-gone', (e, d) => {
    if (d.reason === 'clean-exit' || forceClose) return;
    const r = askBox({
      type: 'error', title: 'Mobin Studio',
      message: 'برنامه با مشکل روبه‌رو شد.',
      detail: 'می‌توانید دوباره بارگذاری کنید. متن و بالن‌ها از ذخیرهٔ خودکار برمی‌گردند.',
      buttons: ['بارگذاری دوباره', 'خروج'], defaultId: 0, cancelId: 1, noLink: true
    });
    if (r === 0) win.reload(); else { forceClose = true; app.quit(); }
  });

  /* shortcuts that belong to the window (they work in any keyboard layout) */
  win.webContents.on('before-input-event', (e, k) => {
    if (k.type !== 'keyDown' || k.isAutoRepeat && k.code !== 'Equal' && k.code !== 'Minus') return;
    const c = k.control || k.meta, cd = k.code;
    if (c && !k.shift && !k.alt && cd === 'KeyQ') { e.preventDefault(); win.close(); }
    else if (c && !k.shift && !k.alt && cd === 'KeyR') { e.preventDefault(); safeReload(); }
    else if (c && k.shift && !k.alt && (cd === 'Equal' || cd === 'NumpadAdd')) { e.preventDefault(); stepUiZoom(+0.5); }
    else if (c && k.shift && !k.alt && (cd === 'Minus' || cd === 'NumpadSubtract')) { e.preventDefault(); stepUiZoom(-0.5); }
    else if (c && k.shift && !k.alt && (cd === 'Digit0' || cd === 'Numpad0')) { e.preventDefault(); stepUiZoom(0); }
    else if (!c && !k.alt && !k.shift && cd === 'F11') { e.preventDefault(); win.setFullScreen(!win.isFullScreen()); }
  });

  ['resize', 'move'].forEach(ev => win.on(ev, () => { clearTimeout(win._t); win._t = setTimeout(() => writeState(win), 400); }));
  win.on('maximize', () => writeState(win));
  win.on('unmaximize', () => writeState(win));

  /* ---------- clean close with a real Persian dialog ---------- */
  win.on('close', (e) => {
    if (forceClose) { writeState(win); return; }
    e.preventDefault();
    if (closePending) return;
    closePending = true;
    const finish = () => { forceClose = true; writeState(win); win.close(); };
    evalJS('(window.__msDirty && window.__msDirty()) || false', true, 2500).then(dirty => {
      if (!dirty) return finish();
      const r = askBox({
        type: 'warning', title: 'Mobin Studio',
        message: 'کار ذخیره‌نشده دارید.',
        detail: 'اگر الان ببندید، تغییرات آخر از بین می‌رود.\n«ذخیره و خروج» همه‌چیز (عکس‌ها، متن‌ها، لایه‌ها و فونت‌ها) را در فایل پروژهٔ ‎.mobin‎ ذخیره می‌کند.',
        buttons: ['ذخیره و خروج', 'خروج بدون ذخیره', 'برگشت'],
        defaultId: 0, cancelId: 2, noLink: true
      });
      if (r === 1) return finish();
      if (r !== 0) { closePending = false; return; }
      /* close only after the file is really saved; cancel = stay open */
      return evalJS('window.__msSave ? window.__msSave() : false', false, 0).then(ok => {
        if (ok) finish(); else closePending = false;
      });
    });
  });
}

function stepUiZoom(d) {
  if (!win || win.isDestroyed()) return;
  const wc = win.webContents;
  const z = d === 0 ? 0 : Math.max(-2, Math.min(3, wc.getZoomLevel() + d));
  wc.setZoomLevel(z);
  syncOverlay();
  writeState(win);
}

function safeReload() {
  if (!win || win.isDestroyed()) return;
  evalJS('(window.__msDirty && window.__msDirty()) || false', true, 2500).then(dirty => {
    if (!dirty) return win.reload();
    const r = askBox({
      type: 'question', title: 'Mobin Studio',
      message: 'کارهای ذخیره‌نشده دارید.',
      detail: 'با بارگذاری دوباره، عکس‌ها از برنامه بیرون می‌روند (متن و بالن‌ها از ذخیرهٔ خودکار برمی‌گردند).',
      buttons: ['بارگذاری دوباره', 'برگشت'], defaultId: 1, cancelId: 1, noLink: true
    });
    if (r === 0) win.reload();
  });
}

/* ---------- in-place update: fetch the new installer and hand over ---------- */
/* Only our own release downloads may reach this code, so a tampered menu
   cannot make the app run an arbitrary file. */
const UPDATE_URL = /^https:\/\/github\.com\/hidooch980\/mobin-studio\/releases\/download\/[A-Za-z0-9._%\-/]+$/;
const UPDATE_EXE = /^MobinStudio-Setup-\d+\.\d+\.\d+\.exe$/;
const UPDATE_MAX = 420 * 1024 * 1024;
/* a fast update ships only resources/app.asar (~2 MB) plus a manifest with its
   sha256, instead of the whole 105 MB installer. The install folder lives in
   %LOCALAPPDATA%\Programs, so replacing one file needs no elevation. */
const UPDATE_ASAR = /^MobinStudio-\d+\.\d+\.\d+-app\.asar$/;
const UPDATE_JSON = /^MobinStudio-\d+\.\d+\.\d+-update\.json$/;
const ASAR_MAX = 40 * 1024 * 1024;

function download(url, dest, max, hop) {
  return new Promise((resolve, reject) => {
    const https = require('https');
    const req = https.get(url, {
      headers: { 'User-Agent': 'MobinStudio/' + VERSION, 'Accept': 'application/octet-stream' },
      timeout: 30000
    }, res => {
      const code = res.statusCode || 0;
      /* GitHub sends the asset to a signed CDN address first */
      if (code >= 300 && code < 400 && res.headers.location) {
        res.resume();
        if ((hop || 0) >= 5) return reject(new Error('لینک دانلود بیش از حد تغییر مسیر داد'));
        let next;
        try { next = new URL(res.headers.location, url).toString(); } catch (err) { return reject(new Error('لینک دانلود نامعتبر است')); }
        if (!/^https:\/\//i.test(next)) return reject(new Error('لینک دانلود امن نیست'));
        return resolve(download(next, dest, max, (hop || 0) + 1));
      }
      if (code !== 200) { res.resume(); return reject(new Error('سرور دانلود پاسخ ' + code + ' داد')); }
      const size = Number(res.headers['content-length'] || 0);
      if (size && size > max) { res.resume(); return reject(new Error('فایل به‌روزرسانی بزرگ‌تر از حد انتظار است')); }
      let got = 0;
      const out = fs.createWriteStream(dest, { flags: 'wx' });
      const fail = err => { try { out.destroy(); } catch (e) { } try { fs.unlinkSync(dest); } catch (e) { } reject(err); };
      res.on('data', c => { got += c.length; if (got > max) { res.destroy(); fail(new Error('فایل به‌روزرسانی بزرگ‌تر از حد انتظار است')); } });
      res.on('error', fail);
      out.on('error', fail);
      out.on('finish', () => {
        if (size && got !== size) return fail(new Error('دانلود کامل نشد'));
        resolve(got);
      });
      res.pipe(out);
    });
    req.on('timeout', () => { req.destroy(new Error('زمان دانلود به پایان رسید')); });
    req.on('error', err => reject(new Error(/ENOTFOUND|EAI_AGAIN|ECONNREFUSED/.test(String(err && err.code)) ? 'اتصال به اینترنت برقرار نشد' : 'دانلود فایل به‌روزرسانی ناموفق بود')));
  });
}

/* a real Windows program starts with "MZ"; anything else is not our setup */
function looksLikeExe(file) {
  try {
    const fd = fs.openSync(file, 'r');
    const b = Buffer.alloc(2);
    const n = fs.readSync(fd, b, 0, 2, 0);
    fs.closeSync(fd);
    return n === 2 && b[0] === 0x4d && b[1] === 0x5a;
  } catch (e) { return false; }
}

/* the resources folder next to the running executable (…\resources) */
function resourcesDir() {
  try { if (process.resourcesPath) return process.resourcesPath; } catch (e) { }
  return path.join(path.dirname(process.execPath), 'resources');
}
function newerVersion(a, b) {
  const p = v => String(v || '0').split('.').map(x => parseInt(x, 10) || 0);
  const x = p(a), y = p(b);
  for (let i = 0; i < Math.max(x.length, y.length); i++) if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) > (y[i] || 0);
  return false;
}
const sha256Of = buf => require('crypto').createHash('sha256').update(buf).digest('hex');
/* leftovers of an interrupted swap never pile up and never break the next start */
function cleanUpdateLeftovers() {
  const dir = resourcesDir();
  for (const f of ['app.asar.new', 'app.asar.old', 'app.asar.update.cmd']) {
    try { fs.unlinkSync(path.join(dir, f)); } catch (e) { }
  }
}

/* Replace only resources/app.asar. Everything is verified first (release URL,
   file name, manifest version, size and sha256) and the swap happens in a tiny
   cmd script after the app has exited; a failed move restores the old file. */
async function installAsarUpdate(asarUrl, manifestUrl) {
  if (typeof asarUrl !== 'string' || asarUrl.length > 500 || !UPDATE_URL.test(asarUrl)) return { ok: false, error: 'لینک به‌روزرسانی معتبر نیست' };
  if (typeof manifestUrl !== 'string' || manifestUrl.length > 500 || !UPDATE_URL.test(manifestUrl)) return { ok: false, error: 'لینک به‌روزرسانی معتبر نیست' };
  const asarName = decodeURIComponent(asarUrl.slice(asarUrl.lastIndexOf('/') + 1));
  const jsonName = decodeURIComponent(manifestUrl.slice(manifestUrl.lastIndexOf('/') + 1));
  if (!UPDATE_ASAR.test(asarName) || !UPDATE_JSON.test(jsonName)) return { ok: false, error: 'نام فایل به‌روزرسانی معتبر نیست' };

  const dir = resourcesDir();
  const target = path.join(dir, 'app.asar');
  /* Electron's fs is asar-aware: fs.accessSync() on app.asar itself throws
     ENOENT ("not found in ...app.asar"), so test the resources folder that
     will hold app.asar.new; that is the permission the swap actually needs. */
  try { fs.accessSync(dir, fs.constants.W_OK); } catch (e) { return { ok: false, error: 'پوشهٔ نصب قابل نوشتن نیست' }; }

  const tmpDir = path.join(app.getPath('temp'), 'MobinStudioUpdate');
  const manFile = path.join(tmpDir, 'update.json');
  try {
    fs.mkdirSync(tmpDir, { recursive: true });
    try { fs.unlinkSync(manFile); } catch (e) { }
  } catch (e) { return { ok: false, error: 'پوشهٔ موقت در دسترس نیست' }; }

  try { await download(manifestUrl, manFile, 256 * 1024, 0); }
  catch (err) { return { ok: false, error: String((err && err.message) || err) }; }
  let man;
  try { man = JSON.parse(fs.readFileSync(manFile, 'utf8')); } catch (e) { return { ok: false, error: 'اطلاعات به‌روزرسانی خوانده نشد' }; }
  const ver = man && typeof man.version === 'string' ? man.version : '';
  const a = man && man.asar;
  if (!/^\d+\.\d+\.\d+$/.test(ver) || !newerVersion(ver, VERSION)) return { ok: false, error: 'این بسته برای نسخهٔ تازه‌تر از برنامهٔ فعلی نیست' };
  if (!a || a.name !== asarName || !/^[a-f0-9]{64}$/.test(String(a.sha256 || '').toLowerCase())) return { ok: false, error: 'اطلاعات فایل به‌روزرسانی ناقص است' };
  const size = Number(a.size) || 0;
  if (!size || size > ASAR_MAX) return { ok: false, error: 'اندازهٔ فایل به‌روزرسانی معتبر نیست' };

  /* download next to the file it will replace: no long path has to survive in
     the swap script, and the folder is known to be writable */
  const part = path.join(dir, 'app.asar.new');
  try { fs.unlinkSync(part); } catch (e) { }
  let bytes;
  try { bytes = await download(asarUrl, part, ASAR_MAX, 0); }
  catch (err) { try { fs.unlinkSync(part); } catch (e) { } return { ok: false, error: String((err && err.message) || err) }; }
  if (bytes !== size) { try { fs.unlinkSync(part); } catch (e) { } return { ok: false, error: 'دانلود کامل نشد' }; }
  let sum = '';
  try { sum = sha256Of(fs.readFileSync(part)); } catch (e) { try { fs.unlinkSync(part); } catch (e2) { } return { ok: false, error: 'فایل دریافتی خوانده نشد' }; }
  if (sum !== String(a.sha256).toLowerCase()) {
    try { fs.unlinkSync(part); } catch (e) { }
    return { ok: false, error: 'فایل دریافتی سالم نیست (هش نخواند)' };
  }

  const cmdFile = path.join(dir, 'app.asar.update.cmd');
  const script = [
    '@echo off',
    'cd /d "%~dp0"',
    'ping -n 3 127.0.0.1 >nul',
    'if exist app.asar.old del /f /q app.asar.old >nul 2>&1',
    'set tries=0',
    ':retry',
    'move /y app.asar app.asar.old >nul 2>&1',
    'if not exist app.asar goto swapin',
    'set /a tries+=1',
    'if %tries% GEQ 5 goto done',
    'ping -n 2 127.0.0.1 >nul',
    'goto retry',
    ':swapin',
    'move /y app.asar.new app.asar >nul 2>&1',
    'if exist app.asar goto done',
    'if exist app.asar.old move /y app.asar.old app.asar >nul 2>&1',
    ':done',
    'if exist app.asar.old del /f /q app.asar.old >nul 2>&1',
    'cd /d "%~dp0.."',
    'if exist "MobinStudio.exe" start "" "MobinStudio.exe"',
    ''
  ].join('\r\n');
  try { fs.writeFileSync(cmdFile, script, { encoding: 'latin1' }); }
  catch (e) { try { fs.unlinkSync(part); } catch (e2) { } return { ok: false, error: 'نوشتن فایل به‌روزرسانی ممکن نشد' }; }

  try {
    const child = require('child_process').spawn(process.env.COMSPEC || 'cmd.exe', ['/d', '/s', '/c', '""' + cmdFile + '""'], {
      detached: true, stdio: 'ignore', windowsHide: true, windowsVerbatimArguments: true
    });
    child.on('error', err => { log('asar swap spawn: ' + ((err && err.message) || err)); });
    child.unref();
  } catch (err) {
    try { fs.unlinkSync(part); } catch (e) { }
    try { fs.unlinkSync(cmdFile); } catch (e) { }
    return { ok: false, error: 'اجرای جایگزینی ممکن نشد' };
  }

  forceClose = true;
  setTimeout(() => { try { writeState(win); } catch (err) { } app.quit(); }, 900);
  return { ok: true, fast: true, version: ver };
}

/* one entry point: prefer the small asar update, keep the installer as fallback */
async function installUpdate(payload) {
  const req = (payload && typeof payload === 'object') ? payload : { setup: payload };
  if (req.asar && req.manifest) {
    const r = await installAsarUpdate(req.asar, req.manifest).catch(e => ({ ok: false, error: String((e && e.message) || e) }));
    if (r && r.ok) return r;
    log('asar update skipped: ' + ((r && r.error) || 'unknown'));
    if (!req.setup) return r;              /* nothing to fall back to */
  }
  return installSetup(req.setup);
}

async function installSetup(url) {
  if (typeof url !== 'string' || url.length > 500 || !UPDATE_URL.test(url)) return { ok: false, error: 'لینک به‌روزرسانی معتبر نیست' };
  const name = decodeURIComponent(url.slice(url.lastIndexOf('/') + 1));
  if (!UPDATE_EXE.test(name)) return { ok: false, error: 'نام فایل به‌روزرسانی معتبر نیست' };
  let dir;
  try {
    dir = path.join(app.getPath('temp'), 'MobinStudioUpdate');
    fs.mkdirSync(dir, { recursive: true });
    /* leftovers of an interrupted attempt never pile up */
    for (const f of fs.readdirSync(dir)) {
      if (!/^MobinStudio-Setup-.*\.exe$/.test(f)) continue;
      try { fs.unlinkSync(path.join(dir, f)); } catch (err) { }
    }
  } catch (err) { return { ok: false, error: 'پوشهٔ موقت در دسترس نیست' }; }
  const file = path.join(dir, name);
  let bytes;
  try { bytes = await download(url, file, UPDATE_MAX, 0); }
  catch (err) { return { ok: false, error: String((err && err.message) || err) }; }
  if (!bytes || !looksLikeExe(file)) {
    try { fs.unlinkSync(file); } catch (err) { }
    return { ok: false, error: 'فایل دریافتی یک برنامهٔ ویندوز نیست' };
  }
  /* the app must be closed before setup runs, so the installer is started with a
     short delay and this copy steps aside; NSIS then finds the folder free and
     updates it in place (projects and settings live outside the install dir).
     /S installs without any wizard so an update is a single click, and the app
     is opened again as soon as setup finishes. */
  try {
    const cmd = 'ping -n 3 127.0.0.1 >nul & start "" /wait "' + file + '" /S & start "" "' + process.execPath + '"';
    /* windowsVerbatimArguments keeps cmd.exe from receiving the command line
       double-quoted by Node; with the default quoting cmd /s strips the inner
       quotes and the setup file is never started. */
    const child = require('child_process').spawn(process.env.COMSPEC || 'cmd.exe', ['/d', '/s', '/c', cmd], {
      detached: true, stdio: 'ignore', windowsHide: true, cwd: dir, windowsVerbatimArguments: true
    });
    child.on('error', err => { log('update spawn: ' + ((err && err.message) || err)); });
    child.unref();
  } catch (err) {
    return { ok: false, error: 'اجرای نصب‌کننده ممکن نشد' };
  }
  forceClose = true;
  /* give the page a moment to show the "restarting" note, then step aside */
  setTimeout(() => { try { writeState(win); } catch (err) { } app.quit(); }, 900);
  return { ok: true };
}

/* ---------- commands from the app menu in the page ---------- */
function clickIn(sel) {
  evalJS('(function(){var e=document.querySelector(' + JSON.stringify(sel) + ');if(e)e.click();})()', null, 0);
}
const safeGpuOn = () => { try { return fs.existsSync(SAFE_FLAG); } catch (e) { return false; } };
const menuState = () => ({ safeGpu: safeGpuOn(), zoom: win && !win.isDestroyed() ? win.webContents.getZoomFactor() : 1, full: !!(win && win.isFullScreen()) });
ipcMain.handle('ms:cmd', async (e, name, arg) => {
  if (!win || win.isDestroyed() || e.sender !== win.webContents) return null;
  switch (name) {
    case 'theme': {
      const t = arg === 'light' ? 'light' : 'dark';
      if (readPref('theme') !== t) writePref('theme', t);
      try { win.setBackgroundColor(FRAME[t].color); } catch (err) { }
      syncOverlay();
      return t;
    }
    case 'state': return menuState();
    case 'uizoom': stepUiZoom(arg > 0 ? +0.5 : arg < 0 ? -0.5 : 0); return menuState();
    case 'fullscreen': win.setFullScreen(!win.isFullScreen()); return true;
    case 'quit': setTimeout(() => { if (win && !win.isDestroyed()) win.close(); }, 0); return true;
    case 'reload': safeReload(); return true;
    case 'showLast':
      try { if (lastSaved && fs.existsSync(lastSaved)) { shell.showItemInFolder(lastSaved); return true; } } catch (err) { }
      return false;
    case 'getSaveDir': return { dir: saveFolder(), custom: readPref('customSaveDir') || '' };
    case 'setSaveDir': {
      const rawDir = String(arg || '').trim();
      if (!rawDir) { writePref('customSaveDir', ''); return { ok: true, dir: saveFolder(), custom: '' }; }
      // reject relative paths, UNC/device paths (two leading slashes or backslashes) and NUL bytes
      if (!path.isAbsolute(rawDir) || /^[\\/]{2}/.test(rawDir) || rawDir.includes('\0')) return { ok: false, error: 'مسیر پوشه معتبر نیست' };
      const p = path.resolve(rawDir);
      try {
        fs.mkdirSync(p, { recursive: true });
        if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
          writePref('customSaveDir', p);
          writePref('saveDir', p);
          return { ok: true, dir: p, custom: p };
        }
      } catch (err) { return { ok: false, error: 'آدرس درایو یا پوشه معتبر نیست یا دسترسی وجود ندارد' }; }
      return { ok: false, error: 'پوشه پیدا نشد' };
    }
    case 'pickDir': {
      const r = await dialog.showOpenDialog(win, {
        title: 'انتخاب درایو و پوشهٔ پیش‌فرض خروجی و ذخیره',
        defaultPath: saveFolder(),
        buttonLabel: 'انتخاب این پوشه',
        properties: ['openDirectory', 'createDirectory']
      });
      if (r.canceled || !r.filePaths || !r.filePaths[0]) return { ok: false, canceled: true };
      const chosen = r.filePaths[0];
      writePref('customSaveDir', chosen);
      writePref('saveDir', chosen);
      return { ok: true, dir: chosen, custom: chosen };
    }
    case 'openSaveDir': {
      // only ever open a directory inside the save folder; never launch a file
      const base = path.resolve(saveFolder());
      let d = base;
      try {
        if (arg) {
          const c = path.resolve(String(arg));
          const rel = path.relative(base, c);
          if (!rel.startsWith('..') && !path.isAbsolute(rel) && fs.statSync(c).isDirectory()) d = c;
        }
      } catch (err) { }
      shell.openPath(d);
      return true;
    }
    case 'userData': shell.openPath(app.getPath('userData')); return true;
    case 'recent':
      return recentList().map(p => { let ok = false; try { ok = fs.statSync(p).isFile(); } catch (err) { } return { path: p, name: path.basename(p), dir: path.dirname(p), ok }; });
    case 'recentClear': writePref('recent', []); return true;
    case 'pendingOpen': { const p = pendingOpen; pendingOpen = null; return p; }
    case 'safeGpu': {
      const on = !safeGpuOn();
      try { on ? fs.writeFileSync(SAFE_FLAG, '1') : fs.unlinkSync(SAFE_FLAG); } catch (err) { }
      if (process.env.MS_TEST_ANSWER == null) dialog.showMessageBox(win, {
        type: 'info', title: 'Mobin Studio',
        message: on ? 'حالت امن گرافیک روشن شد.' : 'حالت امن گرافیک خاموش شد.',
        detail: 'بعد از بستن و باز کردن دوبارهٔ برنامه اعمال می‌شود.', buttons: ['باشه'], noLink: true
      });
      return menuState();
    }
    case 'installUpdate': return installUpdate(arg);
    case 'about':
      dialog.showMessageBox(win, {
        type: 'info', title: 'Mobin Studio', message: 'Mobin Studio  ' + VERSION,
        detail: 'ابزار حروف‌چینی فارسی مانهوا و وبتون.\nذخیره، ویرایش و خروجی همه روی همین کامپیوتر است.\n\nفقط سه جا به اینترنت وصل می‌شود: بررسی به‌روزرسانی (قابل خاموش کردن در تنظیمات ← عمومی)، دستیار (فقط وقتی خودت بازش کنی) و همگام‌سازی ابری (فقط با تأیید خودت).\n\nفونت‌ها: وزیرمتن، ساحل، شبنم، استعداد، لاله‌زار (SIL Open Font License).',
        buttons: ['باشه'], noLink: true
      });
      return true;
  }
  return null;
});

/* right-click menu inside text fields */
function wireContextMenu(wc) {
  wc.on('context-menu', (e, p) => {
    if (!p.isEditable && !p.selectionText) return;
    Menu.buildFromTemplate([
      { label: 'برش', role: 'cut', enabled: p.editFlags.canCut },
      { label: 'کپی', role: 'copy', enabled: p.editFlags.canCopy },
      { label: 'چسباندن', role: 'paste', enabled: p.editFlags.canPaste },
      { type: 'separator' },
      { label: 'انتخاب همه', role: 'selectAll' }
    ]).popup({ window: win });
  });
}

app.on('second-instance', (e, argv, cwd) => {
  if (!win) return;
  if (win.isMinimized()) win.restore();
  win.focus();
  /* double-click on a .mobin while the app is already open */
  const p = argFile(argv, cwd);
  if (p) { known.add(path.resolve(p)); evalJS('window.__msOpenPath && window.__msOpenPath(' + JSON.stringify(p) + ')', null, 0); }
});

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  try { cleanUpdateLeftovers(); } catch (e) { }
  createWindow();
  wireContextMenu(win.webContents);
});

app.on('window-all-closed', () => app.quit());
