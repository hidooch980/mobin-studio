#!/bin/bash
# Windows build: app folder + NSIS installer  ->  dist/MobinStudio-Setup-<ver>.exe
# needs: Electron win32-x64 zip (EL_ZIP), @electron/asar (ASAR), resedit (node_modules next to patch-exe.cjs), NSIS makensis (MAKENSIS, NSISDIR)
set -e
HERE="$(cd "$(dirname "$0")" && pwd)"; ROOT="$(dirname "$HERE")"
VER=$(node -p "require('./app/package.json').version")
EL_ZIP=${EL_ZIP:-/data/pack/el-win.zip}   # electron-v45.2.1-win32-x64.zip from github.com/electron/electron/releases
if [ -z "${ASAR:-}" ]; then
  ASAR="$HERE/node_modules/@electron/asar/bin/asar.mjs"; [ -f "$ASAR" ] || ASAR=/tmp/ebt/node_modules/@electron/asar/bin/asar.mjs
fi
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
for t in "$EL_ZIP" "$ASAR" "$MAKENSIS"; do [ -n "$t" ] && [ -e "$t" ] || { echo "missing build tool: '$t' (see README.md)" >&2; exit 1; }; done
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
