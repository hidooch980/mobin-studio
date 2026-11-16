#!/usr/bin/env bash
# Builds dist/MobinStudio-<version>.apk without Gradle:
#   app/build.sh -> index.html -> assets, aapt2 -> resources, javac + d8 -> dex,
#   zipalign + apksigner (signing/mobin.keystore).
# Needs: JDK 17 (JAVA_HOME or PATH), an Android SDK (ANDROID_HOME / ANDROID_SDK_ROOT).
# Works on Linux/macOS (ELF tools) and Windows (Git Bash + .exe/.bat tools).
set -euo pipefail
cd "$(dirname "$0")"
ROOT="$(cd .. && pwd)"

# ---- locate a JDK -----------------------------------------------------------
if [ -z "${JAVA_HOME:-}" ]; then
  for c in /usr/lib/jvm/*/bin/javac "/c/Program Files/Microsoft/jdk-"*/bin/javac.exe \
           "/c/Program Files/Java/jdk-"*/bin/javac.exe /data/pack/*/bin/javac; do
    [ -x "$c" ] && { JAVA_HOME="$(cd "$(dirname "$c")/.." && pwd)"; break; }
  done
fi
[ -n "${JAVA_HOME:-}" ] && export PATH="$JAVA_HOME/bin:$PATH"

# ---- locate the Android SDK -------------------------------------------------
ANDROID_HOME="${ANDROID_HOME:-${ANDROID_SDK_ROOT:-}}"
if [ -z "$ANDROID_HOME" ]; then
  for c in "${LOCALAPPDATA:-}/Android/Sdk" "$HOME/Android/Sdk" /data/pack/sdk \
           "/d/Android/Sdk" "/c/Android/Sdk" "$HOME/Library/Android/sdk"; do
    [ -d "$c" ] && { ANDROID_HOME="$c"; break; }
  done
fi
[ -n "${ANDROID_HOME:-}" ] || { echo "no Android SDK: set ANDROID_HOME" >&2; exit 1; }

# ---- pick the newest installed build-tools + platform -----------------------
# Windows tool sets end in .exe/.bat; Linux/macOS ones do not.
findtool() { # $1 = path without extension -> prints the real path
  for e in '' .exe .bat; do [ -e "$1$e" ] && { printf '%s' "$1$e"; return 0; }; done
  return 1
}
newest() { ls -1 "$1" 2>/dev/null | grep -E '^[0-9]+(\.[0-9]+)*$' | sort -V | tail -1; }

BT_DIR="${ANDROID_BT:-$ANDROID_HOME/build-tools/$(newest "$ANDROID_HOME/build-tools")}"
PLATFORM="${ANDROID_PLATFORM:-android-$(ls -1 "$ANDROID_HOME/platforms" 2>/dev/null \
  | sed -n 's/^android-\([0-9][0-9]*\)$/\1/p' | sort -n | tail -1)}"
JAR="$ANDROID_HOME/platforms/$PLATFORM/android.jar"

AAPT2="$(findtool "$BT_DIR/aapt2")"
D8="$(findtool "$BT_DIR/d8")"
ZIPALIGN="$(findtool "$BT_DIR/zipalign")"
APKSIGNER="$(findtool "$BT_DIR/apksigner")"

for t in "$AAPT2" "$D8" "$ZIPALIGN" "$APKSIGNER" "$JAR" "${JAVA_HOME:-.}/bin/javac"; do
  [ -e "$t" ] || [ -e "$t.exe" ] || { echo "missing: $t" >&2; exit 1; }
done
echo "toolchain: $(basename "$BT_DIR") / $PLATFORM"

# ---- version: one for every platform: app/package.json ---------------------
VER="$(sed -n 's/.*"version"[[:space:]]*:[[:space:]]*"\([0-9.]*\)".*/\1/p' "$ROOT/app/package.json" | head -1)"
IFS=. read -r MA MI PA <<<"$VER"
CODE=$(( MA * 10000 + MI * 100 + ${PA:-0} ))
echo "Mobin Studio $VER (versionCode $CODE)"

# ---- 1. the web app ---------------------------------------------------------
bash "$ROOT/app/build.sh"

# Android's aapt2 (and some JDK tools) mis-handle non-ASCII paths: compiling a
# res/ dir that lives under a Farsi-named folder fails with "bad resource path"
# and silently emits an empty archive. So stage everything into an ASCII-only
# work dir and build there; only the final signed APK is written back to dist/.
B="${MOBIN_APK_WORK:-/tmp/mobinapk.$$}"
case "$(uname -s 2>/dev/null)" in
  MINGW*|MSYS*|CYGWIN*) B="${MOBIN_APK_WORK:-/c/Temp/mobinapk.$$}" ;;
esac
rm -rf "$B"
mkdir -p "$B"
trap 'rm -rf "$B"' EXIT
cp -r res src AndroidManifest.xml signing "$B"/
mkdir -p "$B/assets" "$B/gen" "$B/classes" "$B/dex"
cp "$ROOT/app/build/index.html" "$B/assets/index.html"
( cd "$B" && pwd >/dev/null )

# ---- 2. resources + manifest ------------------------------------------------
# Every step below runs with cwd=$B and only relative paths: the Windows JDK
# cannot resolve MSYS-style paths like /c/Temp/x, and aapt2/javac are happy with
# plain relative names on every platform.
cd "$B"
"$AAPT2" compile --dir res -o res.zip
[ -s res.zip ] || { echo "aapt2 produced no resources" >&2; exit 1; }
"$AAPT2" link -o base.apk -I "$JAR" --manifest AndroidManifest.xml \
  --java gen -A assets \
  --min-sdk-version 24 --target-sdk-version 34 \
  --version-code "$CODE" --version-name "$VER" \
  res.zip

# ---- 3. code ----------------------------------------------------------------
find src gen -name '*.java' > sources.txt
javac -nowarn -Xlint:-options -encoding UTF-8 -source 8 -target 8 -bootclasspath "$JAR" \
  -d classes @sources.txt
"$D8" --release --min-api 24 --lib "$JAR" --output dex $(find classes -name '*.class')
[ -f dex/classes.dex ] || { echo "d8 produced no classes.dex" >&2; exit 1; }

# ---- 4. apk: add dex, align, sign ------------------------------------------
# `zip` is not installed everywhere (e.g. plain Windows box), so fall back to
# Python's zipfile. zipalign fixes the alignment afterwards either way.
cp base.apk unsigned.apk
if command -v zip >/dev/null 2>&1; then
  ( cd dex && zip -q -X ../unsigned.apk classes.dex )
elif command -v python3 >/dev/null 2>&1 || command -v python >/dev/null 2>&1; then
  PY="$(command -v python3 || command -v python)"
  "$PY" -c 'import sys,zipfile; zipfile.ZipFile(sys.argv[1],"a",zipfile.ZIP_DEFLATED).write(sys.argv[2],"classes.dex")' \
    unsigned.apk dex/classes.dex
else
  echo "need one of: zip, python3" >&2; exit 1
fi
"$ZIPALIGN" -p -f 4 unsigned.apk aligned.apk

KS=signing/mobin.keystore
PASS=signing/pass.txt
if [ ! -f "$KS" ] || [ ! -f "$PASS" ]; then
  echo "missing Android signing material: restore the original keystore and password in android/signing/; refusing to generate a new key" >&2
  exit 1
fi
# Sign inside the ASCII work dir: apksigner is a JVM tool and dies with
# "Bad pathname" if --out points at a path with non-ASCII characters.
NAME="MobinStudio-$VER.apk"
"$APKSIGNER" sign --ks "$KS" --ks-key-alias mobin \
  --ks-pass "file:$PASS" \
  --v4-signing-enabled false --out "$NAME" aligned.apk
"$APKSIGNER" verify "$NAME"
mkdir -p "$ROOT/dist"
cp -f "$NAME" "$ROOT/dist/$NAME"
ls -la "$ROOT/dist/$NAME"
