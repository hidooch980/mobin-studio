#!/usr/bin/env bash
# Builds dist/MobinStudio-<version>.apk without Gradle:
#   app/build.sh -> index.html -> assets, aapt2 -> resources, javac + d8 -> dex,
#   zipalign + apksigner (signing/mobin.keystore).
# Needs: JDK 17 (JAVA_HOME or PATH), an Android SDK (ANDROID_HOME / ANDROID_SDK_ROOT).
# Works on Linux/macOS (ELF tools) and Windows (Git Bash + .exe/.bat tools).
set -euo pipefail
cd "$(dirname "$0")"
ROOT="$(cd .. && pwd)"
SIGN="$(pwd)/signing"

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
[ -s "$ROOT/app/build/index.html" ] || { echo "web build missing: app/build/index.html" >&2; exit 1; }

# Android's aapt2 (and some JDK tools) mis-handle non-ASCII paths: compiling a
# res/ dir that lives under a Farsi-named folder fails with "bad resource path"
# and silently emits an empty archive. So stage everything into an ASCII-only
# work dir and build there; only the final signed APK is written back to dist/.
if [ -n "${MOBIN_APK_WORK:-}" ]; then
  B="$MOBIN_APK_WORK"
  case "$B" in
    /|/c|/c/|"$HOME"|"$HOME"/|"$ROOT"|"$ROOT"/) echo "refusing unsafe MOBIN_APK_WORK=$B" >&2; exit 1 ;;
  esac
  if [ -e "$B" ] && [ -n "$(ls -A "$B" 2>/dev/null)" ]; then
    echo "MOBIN_APK_WORK must be absent or empty: $B" >&2; exit 1
  fi
  mkdir -p "$B"
else
  case "$(uname -s 2>/dev/null)" in
    MINGW*|MSYS*|CYGWIN*) mkdir -p /c/Temp; B="$(mktemp -d /c/Temp/mobinapk.XXXXXX)" ;;
    *) B="$(mktemp -d "${TMPDIR:-/tmp}/mobinapk.XXXXXX")" ;;
  esac
fi
[ -n "$B" ] && [ -d "$B" ] || { echo "could not create work dir" >&2; exit 1; }
chmod 700 "$B"
trap 'rm -rf "$B"' EXIT
( umask 077 && cp -r res src AndroidManifest.xml "$B"/ )
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
( cd classes && jar cf ../classes.jar . )
"$D8" --release --min-api 24 --lib "$JAR" --output dex classes.jar
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

KS=$SIGN/mobin.keystore
PASS=$SIGN/pass.txt
if [ ! -f "$KS" ] || { [ -z "${MOBIN_KS_PASS:-}" ] && [ ! -f "$PASS" ]; }; then
  echo "missing Android signing material: restore the original keystore and password in android/signing/; refusing to generate a new key" >&2
  exit 1
fi
# apksigner's JVM cannot open a keystore under a non-ASCII path ("Bad pathname"),
# so stage a private 0700 copy inside the ASCII work dir; the EXIT trap deletes it.
mkdir -p "$B/.ks" && chmod 700 "$B/.ks"
( umask 077 && cp "$KS" "$B/.ks/mobin.keystore" )
# apksigner runs on the JVM, which reads MSYS paths like /c/Temp/... as C:\c\Temp\...:
# hand it native paths (cygpath -m) for anything it has to open itself.
nat() { command -v cygpath >/dev/null 2>&1 && cygpath -m "$1" 2>/dev/null || printf '%s' "$1"; }
KS="$(nat "$B/.ks/mobin.keystore")"
# Prefer the password from the environment (MOBIN_KS_PASS) over pass.txt.
if [ -n "${MOBIN_KS_PASS:-}" ]; then KSPASS="env:MOBIN_KS_PASS"
else ( umask 077 && cp "$PASS" "$B/.ks/pass.txt" ); KSPASS="file:$(nat "$B/.ks/pass.txt")"; fi
# Sign inside the ASCII work dir: apksigner is a JVM tool and dies with
# "Bad pathname" if --out points at a path with non-ASCII characters.
NAME="MobinStudio-$VER.apk"
"$APKSIGNER" sign --ks "$KS" --ks-key-alias mobin \
  --ks-pass "$KSPASS" \
  --v4-signing-enabled false --out "$NAME" aligned.apk
"$APKSIGNER" verify "$NAME"
mkdir -p "$ROOT/dist"
cp -f "$NAME" "$ROOT/dist/$NAME"
ls -la "$ROOT/dist/$NAME"
