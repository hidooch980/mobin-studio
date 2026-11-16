# Mobin Studio · موبین استودیو

استودیوی تایپ‌ست مانهوا و وبتون فارسی — یک وب‌اپ مشترک که هم نسخه‌ی ویندوز (Electron) و هم نسخه‌ی اندروید (WebView) از روی آن ساخته می‌شود.
Persian manhwa / webtoon typesetting studio — one web app, packaged for Windows (Electron) and Android (WebView).

> 🔐 کلید امضای اندروید و رمز آن محرمانه‌اند و عمداً داخل مخزن عمومی نیستند. برای ساخت APK قابل نصب روی نسخه‌های قبلی، سازنده باید فایل‌های امضای اصلی را جداگانه در `android/signing/` نگه دارد؛ هرگز کلید جدید تولید یا منتشر نکنید.
> Android signing keys/passwords are private and intentionally excluded from this public source. Builders must keep the original signing files locally in `android/signing/` to produce compatible APK updates; never regenerate or publish them.

## ساختار · Layout

| مسیر | توضیح |
|---|---|
| `app/` | سورس وب‌اپ (HTML/CSS/JS). `app/build.sh` ⟵ `app/build/index.html` (یک فایل واحد برای هر دو پلتفرم). `main.js` و `preload.js` پوسته‌ی Electron هستند. |
| `android/` | پوسته‌ی اندروید بدون Gradle. `android/build.sh` ⟵ `dist/MobinStudio-<ver>.apk` |
| `windows/` | بسته‌بندی Electron + نصب‌کننده‌ی NSIS. `windows/mkwin.sh` ⟵ `dist/MobinStudio-Setup-<ver>.exe` |
| `tools/restore-binaries.sh` | فونت‌ها و آیکون‌ها به‌صورت `*.b64` ذخیره شده‌اند؛ اسکریپت‌های build خودشان برمی‌گردانندشان. فایل‌های امضای Android در مخزن نیستند. |

**نسخه · Version:** فقط در `app/package.json` (`"version"`). versionCode اندروید = `major*10000 + minor*100 + patch` (مثلاً 8.1.1 ⟵ 80101).

## ساخت وب‌اپ · Web app

نیاز: `bash`، `python3`، `node` 18+

```bash
bash app/build.sh          # -> app/build/index.html
```

برای تست کافی است `app/build/index.html` را در کروم باز کنید.

## ساخت اندروید · Android

نیاز: JDK 17 و Android SDK با `build-tools;34.0.0` و `platforms;android-34`

```bash
JAVA_HOME=/path/to/jdk17 ANDROID_HOME=/path/to/android-sdk bash android/build.sh
# -> dist/MobinStudio-<ver>.apk   (signed with android/signing/mobin.keystore, alias "mobin", password in pass.txt)
```

## ساخت ویندوز · Windows (روی لینوکس/WSL/Git-Bash)

نیاز: `node`، فایل zip الکترون **v45.2.1 win32-x64**، `@electron/asar`، `resedit` و `makensis` (NSIS 3)

```bash
cd windows && npm i resedit@3 @electron/asar@4 && cd ..
# download https://github.com/electron/electron/releases/download/v45.2.1/electron-v45.2.1-win32-x64.zip
EL_ZIP=/path/electron-v45.2.1-win32-x64.zip MAKENSIS=$(command -v makensis) bash windows/mkwin.sh
# -> dist/MobinStudio-Setup-<ver>.exe
```

متغیرهای اختیاری: `ASAR` (مسیر `asar.mjs`)، `NSISDIR`، `WORK` (پوشه‌ی موقت، پیش‌فرض `/tmp/winbuild`).

## تغییر آیکون یا فونت · Replacing a binary

فایل اصلی را جایگزین کنید (مثلاً `windows/build/icon.ico`) و بعد:

```bash
bash tools/restore-binaries.sh --encode   # updates the matching *.b64
```
