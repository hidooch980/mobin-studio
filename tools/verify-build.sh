#!/usr/bin/env bash
# Reproducibility check: rebuild the single-file web app and compare it with a
# shipped artifact.
#
#   bash tools/verify-build.sh                      rebuild + print size/sha256
#   bash tools/verify-build.sh dist/MobinStudio-8.8.1.apk
#   bash tools/verify-build.sh path/to/index.html
#   bash tools/verify-build.sh dist/MobinStudio-8.8.1-app.asar
#
# Exit 0 = identical bytes, 1 = different (with both hashes printed), 2 = bad input.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
APP="$ROOT/app/build/index.html"
T="${1:-}"

bash "$ROOT/app/build.sh"
[ -f "$APP" ] || { echo "the build produced no index.html" >&2; exit 2; }
SHA=$(sha256sum "$APP" | cut -d' ' -f1)
SIZE=$(wc -c < "$APP" | tr -d ' ')
echo "rebuilt : $SIZE bytes  sha256 $SHA"
[ -n "$T" ] || exit 0
[ -e "$T" ] || { echo "no such file: $T" >&2; exit 2; }
T="$(cd "$(dirname "$T")" && pwd)/$(basename "$T")" 

set +e
case "$T" in
  *.apk)
    python - "$T" "$APP" <<'PY'
import sys, zipfile, hashlib
apk, built = sys.argv[1], sys.argv[2]
data = zipfile.ZipFile(apk).read('assets/index.html')
ref = open(built, 'rb').read()
print('artifact: %d bytes  sha256 %s  (assets/index.html inside %s)'
      % (len(data), hashlib.sha256(data).hexdigest(), apk.split('/')[-1]))
sys.exit(0 if data == ref else 1)
PY
    ;;
  *.asar)
    [ -d "$ROOT/windows/node_modules/@electron/asar" ] || { echo "run: cd windows && npm ci   (needed to read an .asar)" >&2; exit 2; }
    # @electron/asar 4 is ESM and only resolves as a bare specifier, so run from windows/
    ( cd "$ROOT/windows" && node -e '
      const asar = require("@electron/asar");
      const fs = require("fs"), crypto = require("crypto");
      const data = asar.extractFile(process.argv[1], "index.html");
      const ref = fs.readFileSync(process.argv[2]);
      console.log("artifact: %d bytes  sha256 %s  (index.html inside %s)",
        data.length, crypto.createHash("sha256").update(data).digest("hex"),
        process.argv[1].split(/[\/]/).pop());
      process.exit(Buffer.compare(data, ref) === 0 ? 0 : 1);
    ' "$T" "$APP" )
    ;;
  *.exe)
    echo "an NSIS installer cannot be read back; verify the matching -app.asar or -update.json instead:" >&2
    echo "  bash tools/verify-build.sh dist/MobinStudio-<ver>-app.asar" >&2
    exit 2
    ;;
  *)
    cmp -s "$APP" "$T" || { echo "artifact: $(wc -c < "$T" | tr -d ' ') bytes  sha256 $(sha256sum "$T" | cut -d' ' -f1)"; exit 1; }
    echo "artifact: identical to the rebuild"
    ;;
esac
RC=$?
set -e
if [ "$RC" -eq 0 ]; then echo "OK — the shipped file is exactly this source"; else echo "MISMATCH — the shipped file was built from different source" >&2; fi
exit "$RC"
