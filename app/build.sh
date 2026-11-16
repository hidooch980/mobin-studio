#!/bin/bash
# builds the single-file web app: app/build/index.html (used by the Windows and Android apps)
set -e
cd "$(dirname "$0")"
# public fonts/icons are stored as *.b64 in git -> decode them first
[ -f ../tools/restore-binaries.sh ] && BASH_ENV= bash --norc ../tools/restore-binaries.sh
cat css/00-fonts.css css/01-base.css css/02-shell.css css/03-stage.css css/04-panels.css css/05-mobile.css > app.css
for f in main.js preload.js android-bridge.js app.js mobile.js update.js; do node --check "$f"; done
mkdir -p build
python3 assemble.py
