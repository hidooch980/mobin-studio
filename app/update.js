/* Public GitHub Releases update check for the shared web app (Windows + Android). */
(function initUpdates() {
  'use strict';
  const OWNER = 'hidooch980', REPO = 'mobin-studio';
  const API = 'https://api.github.com/repos/' + OWNER + '/' + REPO + '/releases/latest';
  const META = document.querySelector('meta[name="ms-version"]');
  const VERSION = (META && META.content) || '0.0.0';
  const byId = id => document.getElementById(id);
  let latest = null, busy = false;

  const parse = s => String(s || '').replace(/^v/i, '').split('.').map(x => parseInt(x, 10) || 0);
  function newer(a, b) {
    const x = parse(a), y = parse(b);
    for (let i = 0; i < Math.max(x.length, y.length); i++)
      if ((x[i] || 0) !== (y[i] || 0)) return (x[i] || 0) > (y[i] || 0);
    return false;
  }
  const platform = () => window.MOBIN_ANDROID ? 'android' : window.MOBIN_DESKTOP ? 'windows' : 'web';
  function assetFor(release, target) {
    const assets = release && Array.isArray(release.assets) ? release.assets : [];
    const want = target === 'android' ? /^MobinStudio-.*\.apk$/i : /^MobinStudio-Setup-.*\.exe$/i;
    return assets.find(a => a && typeof a.name === 'string' && want.test(a.name) && typeof a.browser_download_url === 'string') || null;
  }
  /* the menu row keeps its icon, so only the label is swapped */
  function label(text) {
    const b = byId('bCheckUpdate'); if (!b) return;
    const s = b.querySelector('span');
    if (s) s.textContent = text; else b.textContent = text;
  }
  function say(text, canInstall) {
    const note = byId('updateNote'), t = byId('updateText'), go = byId('bInstallUpdate');
    if (t && text) t.textContent = text;
    if (go) go.disabled = !canInstall;
    if (note && text) note.hidden = false;
  }
  async function check(manual) {
    if (busy) return;
    busy = true;
    label('در حال بررسی…');
    try {
      const r = await fetch(API, { headers: { Accept: 'application/vnd.github+json' }, cache: 'no-store' });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const release = await r.json();
      if (!release || release.draft || release.prerelease) throw new Error('no stable release');
      const v = String(release.tag_name || '').replace(/^v/i, '');
      if (!/^\d+\.\d+\.\d+$/.test(v)) throw new Error('invalid version');
      if (!newer(v, VERSION)) {
        latest = null;
        if (manual) alert('نسخهٔ شما به‌روز است (' + VERSION + ')');
        return;
      }
      latest = { version: v, asset: assetFor(release, platform()) };
      say('نسخهٔ ' + v + ' آماده است.' + (latest.asset
        ? ' با زدن «دانلود و نصب» فایل روی همین دستگاه دریافت می‌شود؛ خودِ سیستم‌عامل هم تأیید نصب را می‌پرسد.'
        : ' فایل نصب این دستگاه در انتشار عمومی نیست.'), !!latest.asset);
    } catch (e) {
      if (manual) alert('بررسی به‌روزرسانی انجام نشد؛ اتصال اینترنت و انتشار عمومی را بررسی کنید.');
      console.warn('Update check failed', e);
    } finally {
      busy = false;
      label('بررسی به‌روزرسانی');
    }
  }
  async function install() {
    if (!latest || !latest.asset) return;
    const url = latest.asset.browser_download_url;
    if (!/^https:\/\/github\.com\/[^/]+\/[^/]+\/releases\/download\//.test(url)) return;
    const go = byId('bInstallUpdate');
    if (go) { go.disabled = true; go.textContent = 'در حال دانلود…'; }
    try {
      if (window.msDesktop) {
        const res = await window.msDesktop.cmd('installUpdate', url);
        if (!res || !res.ok) {
          const why = (res && res.error) || 'خطای نامشخص';
          say('دانلود یا اجرای نصب انجام نشد: ' + why, true);
          alert('دانلود یا اجرای نصب انجام نشد: ' + why);
          return;
        }
        if (window.MOBIN_ANDROID) {
          say('فایل نصب (APK) دریافت شد. برای تکمیل، نصب را در پنجرهٔ اندروید تأیید کنید.', false);
          alert('فایل APK آماده شد. در پنجره‌ای که باز می‌شود نصب را تأیید کنید. اگر پرسید، اجازهٔ «نصب برنامه‌های ناشناس» را برای این برنامه بدهید.');
        } else {
          say('فایل نصب ویندوز دریافت شد و برنامه بسته می‌شود تا نصب انجام شود. پروژه‌ها و تنظیمات شما دست‌نخورده می‌مانند.', false);
        }
        return;
      }
      window.open(url, '_blank', 'noopener');
    } catch (e) {
      say('دانلود یا اجرای نصب انجام نشد: ' + String((e && e.message) || e), true);
    } finally {
      if (go) { go.disabled = !latest || !latest.asset; go.textContent = 'دانلود و نصب'; }
    }
  }
  function wire() {
    const checkBtn = byId('bCheckUpdate'), installBtn = byId('bInstallUpdate'), dismiss = byId('bDismissUpdate');
    if (checkBtn) checkBtn.addEventListener('click', () => check(true));
    if (installBtn) installBtn.addEventListener('click', install);
    if (dismiss) dismiss.addEventListener('click', () => { const n = byId('updateNote'); if (n) n.hidden = true; });
    setTimeout(() => check(false), 4500);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', wire, { once: true }); else wire();
})();
