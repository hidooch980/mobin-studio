#!/bin/bash
# Windows build: app folder + NSIS installer  ->  dist/MobinStudio-Setup-<ver>.exe
# needs: Electron win32-x64 zip (EL_ZIP), @electron/asar (ASAR), resedit (node_modules next to patch-exe.cjs), NSIS makensis (MAKENSIS, NSISDIR)
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"; ROOT="$(dirname "$HERE")"
# the version always comes from app/package.json, no matter which folder this is started from
VER=$(node -p "require(process.argv[1]).version" "$ROOT/app/package.json")
# electron-v<ver>-win32-x64.zip: set EL_ZIP, or keep the zip next to the repo / in windows/
if [ -z "${EL_ZIP:-}" ]; then
  for c in "$HERE"/electron-v*-win32-x64.zip "$ROOT"/electron-v*-win32-x64.zip "$ROOT"/../electron-v*-win32-x64.zip; do
    [ -f "$c" ] && { EL_ZIP="$c"; break; }
  done
fi
EL_ZIP=${EL_ZIP:-}
if [ -z "${ASAR:-}" ]; then ASAR="$HERE/node_modules/@electron/asar/bin/asar.mjs"; fi
if [ -z "${MAKENSIS:-}" ]; then
  if [ -x /tmp/nsisdl/nsis/linux/makensis ]; then MAKENSIS=/tmp/nsisdl/nsis/linux/makensis; export NSISDIR=${NSISDIR:-/tmp/nsisdl/nsis}
  else MAKENSIS=$(command -v makensis || true); fi
fi
# Windows: the native NSIS install is not on PATH for bash; probe the usual spots.
if [ -z "${MAKENSIS:-}" ]; then
  for m in "/c/Program Files (x86)/NSIS/makensis.exe" "/c/Program Files/NSIS/makensis.exe"; do
    if [ -x "$m" ]; then MAKENSIS="$m"; export NSISDIR=${NSISDIR:-$(dirname "$m")}; break; fi
  done
fi
[ -n "$EL_ZIP" ] && [ -e "$EL_ZIP" ] || { echo "missing the Electron zip — set EL_ZIP=/path/electron-v<ver>-win32-x64.zip (github.com/electron/electron/releases)" >&2; exit 1; }
[ -e "$ASAR" ] || { echo "missing @electron/asar — run: cd \"$HERE\" && npm ci" >&2; exit 1; }
[ -n "$MAKENSIS" ] && [ -e "$MAKENSIS" ] || { echo "missing makensis — install NSIS 3 or set MAKENSIS=/path/to/makensis" >&2; exit 1; }

# ---- optional Authenticode signing ---------------------------------------------
# SIGN_PFX=/path/cert.pfx SIGN_PASS=secret  -> both executables get signed and verified.
# Without it the build still works, but Windows SmartScreen will warn on the installer.
set +x  # never trace: the signing password is passed to signtool
SIGNTOOL=${SIGNTOOL:-}
if [ -n "${SIGN_PFX:-}" ]; then
  [ -n "${SIGN_PASS:-}" ] || { echo "SIGN_PFX is set but SIGN_PASS is empty" >&2; exit 1; }
  if [ -z "$SIGNTOOL" ]; then SIGNTOOL=$(command -v signtool 2>/dev/null || true); fi
  if [ -z "$SIGNTOOL" ]; then
    for c in "/c/Program Files (x86)/Windows Kits/10/bin"/*/x64/signtool.exe \
             "/c/Program Files/Windows Kits/10/bin"/*/x64/signtool.exe; do
      if [ -e "$c" ]; then SIGNTOOL="$c"; break; fi
    done
  fi
  [ -n "$SIGNTOOL" ] && [ -e "$SIGNTOOL" ] || { echo "SIGN_PFX is set but signtool was not found (install the Windows SDK or set SIGNTOOL)" >&2; exit 1; }
  sign() {
    "$SIGNTOOL" sign /f "$SIGN_PFX" /p "$SIGN_PASS" /fd SHA256 /td SHA256 /tr "${SIGN_TS:-https://timestamp.digicert.com}" "$1"
    "$SIGNTOOL" verify /pa "$1"
    echo "signed $1"
  }
else
  sign() { :; }
fi

W=$(mktemp -d "${TMPDIR:-/tmp}/winbuild.XXXXXX")
bash "$ROOT/app/build.sh"
[ -s "$ROOT/app/build/index.html" ] || { echo "web build missing: app/build/index.html" >&2; exit 1; }
mkdir -p "$W/app" "$W/win-unpacked" "$ROOT/dist"
cp "$ROOT/app/build/index.html" "$ROOT/app/main.js" "$ROOT/app/preload.js" "$ROOT/app/package.json" "$W/app/"
cd "$W/win-unpacked"
unzip -q "$EL_ZIP"
mv electron.exe MobinStudio.exe
rm -f LICENSES.chromium.html resources/default_app.asar
for f in locales/*.pak; do case "$(basename "$f")" in en-US.pak|fa.pak) ;; *) rm -f "$f";; esac; done
node "$ASAR" pack "$W/app" resources/app.asar
cp "$ROOT/app/assets/FONT-LICENSES.txt" .
cp "$HERE/build/mobin-doc.ico" .
(cd "$HERE" && node --max-old-space-size=3000 "$HERE/patch-exe.cjs" "$W/win-unpacked/MobinStudio.exe" "$VER" "$HERE/build/icon.ico")
# sign after the icon/version are stamped in, so the signature covers the final exe
sign "$W/win-unpacked/MobinStudio.exe"

# ---- fast-update assets: resources/app.asar alone (~2 MB) + a manifest with its hash
# the in-app updater downloads just these when the release has them
ASAR_NAME="MobinStudio-$VER-app.asar"
ASAR_SIZE=$(wc -c < resources/app.asar | tr -d ' ')
ASAR_SHA=$(sha256sum resources/app.asar | cut -d' ' -f1)
rm -f "$ROOT/dist/$ASAR_NAME" "$ROOT/dist/MobinStudio-$VER-update.json"
cp resources/app.asar "$ROOT/dist/$ASAR_NAME"
printf '{"version":"%s","asar":{"name":"%s","size":%s,"sha256":"%s"}}\n' \
  "$VER" "$ASAR_NAME" "$ASAR_SIZE" "$ASAR_SHA" > "$ROOT/dist/MobinStudio-$VER-update.json"
echo "fast update: $ASAR_NAME ($ASAR_SIZE bytes, sha256 $ASAR_SHA)"
cd "$HERE/nsis"
sed -i "s/^!define APPVER .*/!define APPVER        \"$VER\"/; s/^VIProductVersion .*/VIProductVersion \"$VER.0\"/" setup.nsi
OUT="$ROOT/dist/MobinStudio-Setup-$VER.exe"
rm -f "$OUT"
# makensis mangles non-ASCII path bytes to "????" (it cannot compile a setup.nsi
# or write an OutFile under a Farsi-named folder). When the project lives in
# such a path, build from an ASCII-only staging copy and copy the EXE back.
N="$(pwd)"
case "$N" in
  *[!\ -~]*)
    STAGE="${NSIS_STAGE:-/tmp/nsisb}"
    case "$(uname -s 2>/dev/null)" in MINGW*|MSYS*|CYGWIN*) STAGE="${NSIS_STAGE:-/c/Temp/nsisb}";; esac
    rm -rf "$STAGE"; mkdir -p "$STAGE"
    cp "$N/setup.nsi" "$STAGE/setup.nsi"
    cp -r "$HERE/build" "$STAGE/build"
    cp -r "$W/win-unpacked" "$STAGE/payload"
    # rewrite the three relative path groups for the flat staging layout
    sed -i 's#^OutFile .*#OutFile "MobinStudio-Setup-APPVER.exe"#; s#\.\.\\build\\#build\\#g' "$STAGE/setup.nsi"
    sed -i "s#^OutFile \"MobinStudio-Setup-APPVER.exe\"#OutFile \"MobinStudio-Setup-$VER.exe\"#" "$STAGE/setup.nsi"
    ( cd "$STAGE" && "$MAKENSIS" -NOCD -V2 setup.nsi )
    cp -f "$STAGE/MobinStudio-Setup-$VER.exe" "$OUT"
    ;;
  *)
    rm -rf payload
    ln -sfn "$W/win-unpacked" payload
    "$MAKENSIS" -NOCD -V2 setup.nsi
    rm -f payload
    ;;
esac
ls -la "$OUT"
sign "$OUT"
echo "setup sha256: $(sha256sum "$OUT" | cut -d' ' -f1)"
