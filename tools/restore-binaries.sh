#!/usr/bin/env bash
# Public binary assets (fonts and icons) are kept in git as base64 text: <file>.b64
#   bash tools/restore-binaries.sh            -> decode every tracked *.b64 whose file is missing or older
#   bash tools/restore-binaries.sh --encode   -> re-encode public assets after replacing a binary
# Android signing material is never stored here; keep the original key/password outside git.
# app/build.sh runs this automatically, so android/build.sh and windows/mkwin.sh get it too.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
if [ "${1:-}" = "--encode" ]; then
  find . -name '*.b64' -not -path '*/node_modules/*' -print0 | while IFS= read -r -d '' b; do
    f="${b%.b64}"
    if [ -f "$f" ]; then base64 "$f" | tr -d '\r' | fold -w 76 > "$b"; echo "encoded $f"; fi
  done
  exit 0
fi
n=0
while IFS= read -r -d '' b; do
  f="${b%.b64}"
  if [ ! -f "$f" ] || [ "$b" -nt "$f" ]; then
    mkdir -p "$(dirname "$f")"
    tr -d ' \r\n' < "$b" | base64 -d > "$f.tmp" && mv "$f.tmp" "$f"
    n=$((n + 1))
  fi
done < <(find . -name '*.b64' -not -path '*/node_modules/*' -print0)
if [ "$n" -gt 0 ]; then echo "restored $n binary file(s) from *.b64"; fi
