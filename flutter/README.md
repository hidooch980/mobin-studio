# مبین استودیو — نسخه Flutter

این پوشه پوسته‌ی Flutter مبین استودیو است و جای اپ دسکتاپ Electron و اپ WebView اندروید را می‌گیرد.

- **پوسته‌ی بومی Flutter:** صفحه‌ی شروع، فهرست پروژه‌های اخیر، «پروژه‌ی جدید» و «باز کردن»، بررسی به‌روزرسانی. همه با Material 3، فونت وزیرمتن و چیدمان راست‌به‌چپ.
- **فقط بوم ویرایشگر وب است:** خروجی ساخته‌شده‌ی `app/` داخل یک InAppWebView اجرا می‌شود. ارتباط JS و Dart از راه پل `msDesktop` / `MSA` انجام می‌شود.

## ساختار

```
flutter/
├── lib/
│   ├── main.dart            صفحه‌ی شروع و پروژه‌های اخیر
│   ├── editor_screen.dart   ویرایشگر (WebView + پل JS↔Dart)
│   └── updater.dart         به‌روزرسانی از GitHub Releases
├── tool/
│   ├── sync_web.sh          ساخت app/ و کپی در assets/web
│   ├── sync_version.dart    همسان‌سازی نسخه و دانلود فونت وزیرمتن
│   └── setup_android.sh     ساخت پوشه‌ی android/ و تنظیم امضا
└── pubspec.yaml
```

## پیش‌نیازها

- Flutter نسخه‌ی 3.22 یا بالاتر (Dart 3.4 به بالا)
- Android SDK، از راه Android Studio یا command-line tools
- JDK 17
- Git Bash روی ویندوز، برای اجرای اسکریپت‌های `.sh`

برای بررسی محیط:

```powershell
flutter doctor
```

## ساخت APK

همه‌ی دستورها را از داخل پوشه‌ی `flutter/` اجرا کنید.

1. ساخت ویرایشگر وب و کپی آن در `assets/web`:

   ```powershell
   bash tool/sync_web.sh
   ```

2. همسان‌سازی نسخه با `app/package.json` و دانلود فونت‌های وزیرمتن (فقط بار اول اینترنت لازم است):

   ```powershell
   dart run tool/sync_version.dart
   ```

3. ساخت پوشه‌ی `android/` و تنظیم شناسه‌ی برنامه و امضا. این کار یک بار لازم است:

   ```powershell
   bash tool/setup_android.sh
   ```

4. دریافت وابستگی‌ها و ساخت نسخه‌ی نهایی:

   ```powershell
   flutter pub get
   ```

   ```powershell
   flutter build apk --release
   ```

خروجی ساخت در این مسیر است: `build/app/outputs/flutter-apk/app-release.apk`

شناسه‌ی برنامه `com.nerdcity.mobinstudio` است، همان شناسه‌ی APK قبلی. پس اگر با همان کلید امضا شود، روی نسخه‌ی قبلی نصب می‌شود و داده‌ها می‌مانند.

## امضای اندروید (مهم)

کلیدها و رمزهای امضا خصوصی هستند و عمداً در این سورس عمومی قرار ندارند.

- فایل‌های امضای اصلی را فقط به‌صورت محلی در `android/signing/` (در ریشه‌ی MobinStudio-Source) نگه دارید:
  - `mobin.keystore` با نام مستعار `mobin`
  - `pass.txt` که خط اولش رمز است (اختیاری)
- به‌جای `pass.txt` می‌توانید رمز را در متغیر محیطی `MOBIN_KS_PASS` بگذارید.
- **هرگز** این فایل‌ها را commit یا منتشر نکنید و **هرگز** کلید تازه نسازید. با کلید دیگر، APK جدید روی نسخه‌ی نصب‌شده‌ی کاربران نصب نمی‌شود.
- `setup_android.sh` الگوهای `*.keystore`، `*.jks`، `key.properties` و `pass.txt` را به `.gitignore` اضافه می‌کند.
- `sync_web.sh` هم این فایل‌ها را از کپی وب حذف می‌کند.

اگر کلید پیدا نشود، اسکریپت هشدار می‌دهد و نسخه‌ی release بدون امضا ساخته می‌شود.

## به‌روزرسانی خودکار

برنامه هنگام باز شدن آخرین Release مخزن GitHub را بررسی می‌کند. مخزن پیش‌فرض در `kGithubRepo` داخل `lib/updater.dart` تعریف شده است.

برای ساخت با مخزن دیگر:

```powershell
flutter build apk --release --dart-define=MOBIN_REPO=OWNER/REPO
```

برای انتشار نسخه‌ی جدید:

1. نسخه را در `app/package.json` بالا ببرید.
2. مراحل ساخت بالا را دوباره اجرا کنید.
3. در GitHub یک Release بسازید:
   - برچسب آن به شکل `v8.9.4` باشد.
   - فایل `.apk` را به‌عنوان asset پیوست کنید.

برنامه برچسب را با نسخه‌ی نصب‌شده مقایسه می‌کند. اگر نسخه‌ی جدیدتر باشد، پنجره‌ای فارسی با دکمه‌ی دانلود نشان می‌دهد.

## اشکال‌زدایی پل JS↔Dart

نام فراخوانی‌هایی که Dart هنوز پیاده‌سازی نکرده، در نسخه‌ی debug در `unknownCalls` ثبت و در لاگ چاپ می‌شود. برای اجرای نسخه‌ی debug:

```powershell
flutter run
```

بعد از اجرا، لاگ را بررسی کنید و هر نام گم‌شده را به هندلر `ms` در `editor_screen.dart` اضافه کنید.
