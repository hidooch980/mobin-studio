#!/usr/bin/env bash
# One-time Android setup for the Flutter shell. Run from flutter/:
#   bash tool/setup_android.sh
#
# - Generates android/ with `flutter create` if it is missing.
# - Forces applicationId com.nerdcity.mobinstudio (same as the old APK, so
#   updates install over it).
# - Wires release signing to the LOCAL ../android/signing/mobin.keystore.
#   The password is read at build time from $MOBIN_KS_PASS, or from the first
#   line of ../android/signing/pass.txt. It is never copied or printed.
# - Replaces the default Flutter launcher icon with the native app's vector
#   icon from ../android/res (adaptive on Android 8+, plain vector on 7.x).
# - Never creates, regenerates or moves any key material.
set -euo pipefail

cd "$(dirname "$0")/.."
[ -f pubspec.yaml ] || { echo "run from flutter/" >&2; exit 2; }
command -v flutter >/dev/null || { echo "flutter is not on PATH" >&2; exit 2; }

if [ ! -d android/app ]; then
  flutter create --platforms=android --org com.nerdcity --project-name mobin_studio .
fi

SIGN_DIR="$(cd ../android/signing 2>/dev/null && pwd || true)"
if [ -z "$SIGN_DIR" ] || [ ! -f "$SIGN_DIR/mobin.keystore" ]; then
  echo "warning: ../android/signing/mobin.keystore not found; release builds will be unsigned" >&2
fi

GRADLE=android/app/build.gradle.kts
[ -f "$GRADLE" ] || { echo "expected $GRADLE (newer Flutter template)" >&2; exit 1; }
MARK='// mobin-studio: signing+id'
if ! grep -qF "$MARK" "$GRADLE"; then
  cat >> "$GRADLE" <<'EOF'

// mobin-studio: signing+id
// Keystore lives outside this project in ../../android/signing (gitignored).
val mobinSignDir = rootProject.file("../../android/signing")
val mobinKeystore = File(mobinSignDir, "mobin.keystore")
val mobinPass: String? = System.getenv("MOBIN_KS_PASS")
    ?: File(mobinSignDir, "pass.txt").takeIf { it.isFile }
        ?.readLines()?.firstOrNull()?.trim()

android {
    defaultConfig {
        applicationId = "com.nerdcity.mobinstudio"
    }
    if (mobinKeystore.isFile && !mobinPass.isNullOrEmpty()) {
        signingConfigs {
            create("mobin") {
                storeFile = mobinKeystore
                storePassword = mobinPass
                keyAlias = "mobin"
                keyPassword = mobinPass
            }
        }
        buildTypes {
            getByName("release") {
                signingConfig = signingConfigs.getByName("mobin")
            }
        }
    } else {
        logger.warn("mobin-studio: signing files missing; release APK will not be update-compatible")
    }
}
EOF
  echo "patched $GRADLE"
fi

# Internet (updater) + Persian label in the main manifest.
MAN=android/app/src/main/AndroidManifest.xml
if ! grep -q 'android.permission.INTERNET' "$MAN"; then
  sed -i 's|<application|<uses-permission android:name="android.permission.INTERNET"/>\n    <application|' "$MAN"
fi
sed -i 's|android:label="[^"]*"|android:label="مبین استودیو"|' "$MAN"

# Launcher icon: the native app's vector icon from ../android/res instead of the
# Flutter logo. Adaptive icon on Android 8+, plain vector icon on Android 7.x.
SRC_RES=../android/res
RES=android/app/src/main/res
if [ -f "$SRC_RES/mipmap-anydpi-v26/ic_launcher.xml" ]; then
  for f in "$SRC_RES"/drawable/ic_launcher_*.xml "$SRC_RES"/mipmap-anydpi*/ic_launcher*.xml; do
    dst="$RES/${f#"$SRC_RES"/}"
    mkdir -p "$(dirname "$dst")"
    cp "$f" "$dst"
  done
  # anydpi beats density folders, so the template's PNG logos would be dead weight.
  for d in mdpi hdpi xhdpi xxhdpi xxxhdpi; do
    rm -f "$RES/mipmap-$d/ic_launcher.png"
    rmdir "$RES/mipmap-$d" 2>/dev/null || true
  done
  grep -q 'android:roundIcon=' "$MAN" ||
    sed -i 's|android:icon="@mipmap/ic_launcher"|&\n        android:roundIcon="@mipmap/ic_launcher_round"|' "$MAN"
else
  echo "warning: $SRC_RES/mipmap-anydpi-v26/ic_launcher.xml not found; keeping the Flutter icon" >&2
fi

# Keep any signing material out of git even if someone copies it here.
touch .gitignore
for p in '*.keystore' '*.jks' '*.b64' 'key.properties' 'pass.txt' 'android/signing/'; do
  grep -qxF "$p" .gitignore || echo "$p" >> .gitignore
done

echo "android setup done. Build: flutter build apk --release"
