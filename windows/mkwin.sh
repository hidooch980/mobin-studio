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
W=${WORK:-/tmp/winbuild}
bash "$ROOT/app/build.sh"
rm -rf "$W"; mkdir -p "$W/app" "$W/win-unpacked" "$ROOT/dist"
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
