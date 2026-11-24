# Mobin Studio · موبین استودیو

استودیوی تایپ‌ست مانهوا و وبتون فارسی — یک وب‌اپ مشترک که هم نسخه‌ی ویندوز (Electron) و هم نسخه‌ی اندروید (WebView) از روی آن ساخته می‌شود.
Persian manhwa / webtoon typesetting studio — one web app, packaged for Windows (Electron) and Android (WebView).

> 🔐 کلید امضای اندروید و رمز آن محرمانه‌اند و عمداً داخل مخزن عمومی نیستند. برای ساخت APK قابل نصب روی نسخه‌های قبلی، سازنده باید فایل‌های امضای اصلی را جداگانه در `android/signing/` نگه دارد؛ هرگز کلید جدید تولید یا منتشر نکنید.
> Android signing keys/passwords are private and intentionally excluded from this public source. Builders must keep the original signing files locally in `android/signing/` to produce compatible APK updates; never regenerate or publish them.

## شبکه و حریم خصوصی · Network & privacy

ذخیره، ویرایش و خروجی گرفتن کاملاً آفلاین است. برنامه فقط در سه جا به اینترنت وصل می‌شود و هر سه در کنترل کاربر است:

| کجا | چه چیزی می‌رود | چطور خاموش می‌شود |
|---|---|---|
| بررسی به‌روزرسانی (`app/update.js`) | یک `GET` به `api.github.com` برای گرفتن شمارهٔ آخرین نسخه؛ هیچ داده‌ای از پروژه نمی‌رود | تنظیمات ← عمومی ← «اینترنت و حریم خصوصی» (`autoUpdate: false`). دکمهٔ «بررسی به‌روزرسانی» در منو همیشه کار می‌کند |
| دستیار (`app/ai.js`, `app/ai2.js`) | متن‌ها و (در صورت روشن بودن) تصویر صفحه به آدرس/مدل/کلیدی که خودِ کاربر وارد کرده | دستیار بسته بماند؛ فقط با باز کردن پنل دستیار درخواستی فرستاده می‌شود |
| همگام‌سازی ابری (`app/app.js` → `remotePush`) | فقط با تأیید صریح کاربر، پروژهٔ فشرده **با AES-GCM روی همین دستگاه رمز می‌شود** و نسخهٔ رمزشده روی `bytebin.lucko.me` (سرویس عمومی ثالث) می‌رود؛ کلید داخل خود کد است | در پنجرهٔ تأیید «کد مستقیم بده» را بزنید؛ آن‌وقت فقط یک بستهٔ متنی می‌گیرید و چیزی آپلود نمی‌شود |

کلید API دستیار فقط در `localStorage` همان دستگاه می‌ماند و هرگز داخل فایل پروژه (`.mobin`) یا مخزن نوشته نمی‌شود.

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
cd windows && npm ci && cd ..           # نسخه‌ها در windows/package.json + package-lock.json قفل شده‌اند
# electron-v45.2.1-win32-x64.zip را از github.com/electron/electron/releases بگیرید
EL_ZIP=/path/electron-v45.2.1-win32-x64.zip MAKENSIS=$(command -v makensis) bash windows/mkwin.sh
# -> dist/MobinStudio-Setup-<ver>.exe
```

اگر `EL_ZIP` را ندهید، اسکریپت خودش `electron-v*-win32-x64.zip` را در `windows/`، ریشهٔ مخزن و پوشهٔ بالاتر می‌گردد؛ پیدا نشد، پیام روشن می‌دهد. متغیرهای اختیاری: `ASAR` (مسیر `asar.mjs`)، `NSISDIR`، `WORK` (پوشه‌ی موقت، پیش‌فرض `/tmp/winbuild`). نسخه از `app/package.json` خوانده می‌شود، مستقل از این‌که اسکریپت را از کجا اجرا کنید.

### امضای Authenticode · Code signing (اختیاری ولی توصیه‌شده)

بدون امضا، SmartScreen ویندوز هنگام نصب هشدار «Windows protected your PC» می‌دهد. با یک گواهی کد (pfx) هر دو فایل امضا و تأیید می‌شوند:

```bash
SIGN_PFX=/path/cert.pfx SIGN_PASS=secret bash windows/mkwin.sh
# اختیاری: SIGNTOOL (مسیر signtool)، SIGN_TS (سرور timestamp، پیش‌فرض timestamp.digicert.com)
```

اگر `SIGN_PFX` بدهید و signtool پیدا نشود، بیلد عمداً متوقف می‌شود تا سهواً نسخهٔ امضانشده منتشر نشود.

### خروجی بیلد ویندوز

| فایل در `dist/` | کاربرد |
|---|---|
| `MobinStudio-Setup-<ver>.exe` | نصب‌کنندهٔ کامل (NSIS) — مسیر اصلی و fallback |
| `MobinStudio-<ver>-app.asar` | فقط بخش برنامه (حدود ۲ مگابایت) برای **به‌روزرسانی سریع** |
| `MobinStudio-<ver>-update.json` | نسخه + اندازه + sha256 همان asar؛ برنامه قبل از جایگزینی آن را بررسی می‌کند |


## تغییر آیکون یا فونت · Replacing a binary

فایل اصلی را جایگزین کنید (مثلاً `windows/build/icon.ico`) و بعد:

```bash
bash tools/restore-binaries.sh --encode   # updates the matching *.b64
```

## انتشار نسخه · Releasing

نسخه یک‌جا در `app/package.json` عوض می‌شود؛ بقیهٔ جاها خودکار یا ثابت‌اند:

1. `"version"` را در `app/package.json` بالا ببرید و یک سطر در `CHANGELOG.md` اضافه کنید.
2. `APPVER` و `VIProductVersion` در `windows/nsis/setup.nsi` را با همان شماره هم‌تراز کنید (اسکریپت build هم بازنویسی‌شان می‌کند، ولی مخزن باید خودش درست باشد).
3. بیلدها: `bash app/build.sh` → `bash android/build.sh` → `bash windows/mkwin.sh` (`dist/`).
4. `git commit` و `git push`.
5. ریلیز GitHub با تگ `v<version>` و چهار فایل با **دقیقاً** این نام‌ها (آپدیتر درون‌برنامه‌ای روی همین الگوها تکیه دارد):
   - `MobinStudio-<version>.apk` — اندروید، با کلید `android/signing/` امضا شده
   - `MobinStudio-Setup-<version>.exe` — ویندوز (نصب‌کننده، fallback)
   - `MobinStudio-<version>-app.asar` و `MobinStudio-<version>-update.json` — برای به‌روزرسانی ۲ مگابایتی؛ اگر نباشند، برنامه خودکار سراغ نصب‌کنندهٔ کامل می‌رود
6. بدون `<version>` درست، یا با نام دیگر، «دانلود و نصب» درون برنامه کار نمی‌کند.

متن ریلیز را می‌توانید مستقیم از `CHANGELOG.md` بردارید.
