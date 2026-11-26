#!/usr/bin/env bash
# Mobin Studio — build the web app and copy it into the Flutter assets.
# Usage (from anywhere):  bash flutter/tool/sync_web.sh
# Result: flutter/assets/web/index.html (+ any sibling assets from app/build).
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$(cd "$HERE/../.." && pwd)"
APP="$ROOT/app"
OUT="$ROOT/flutter/assets/web"

if [ ! -f "$APP/build.sh" ]; then
  echo "error: $APP/build.sh not found" >&2
  exit 1
fi

echo "==> building web app"
(cd "$APP" && bash ./build.sh)

SRC="$APP/build"
if [ ! -f "$SRC/index.html" ]; then
  echo "error: build did not produce $SRC/index.html" >&2
  exit 1
fi

echo "==> copying to $OUT"
rm -rf "$OUT"
mkdir -p "$OUT"
cp -R "$SRC/." "$OUT/"

# never ship desktop-only or signing material inside the app bundle
find "$OUT" \( -name '*.keystore' -o -name '*.jks' -o -name 'key.properties' \) -delete

size=$(du -sh "$OUT" | cut -f1)
echo "==> done ($size)"
