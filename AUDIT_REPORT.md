# MobinStudio-Source — Audit Report

Date: 2026-11-26 · Scope: structure/build/tests, core logic/IPC/storage, UI/config.
No source code was modified during this audit.

Severity scale: **Critical** (exploitable now / data loss) · **High** (likely exploitable or serious failure) · **Medium** (real risk under specific conditions).

---

## Critical

No Critical findings were confirmed.

---

## High

### H1. `openSaveDir` opens an arbitrary renderer-supplied path with `shell.openPath`
- **File:** `app/main.js:706-709`
- **Code:** `const d = (arg && fs.existsSync(String(arg))) ? String(arg) : saveFolder(); shell.openPath(d);`
- **Problem:** The only check is that the path exists. It is not required to be a directory, nor inside the save folder. `shell.openPath` on a file launches it with its default handler, so an `.exe`, `.bat`, `.lnk` or `.hta` path is executed.
- **Impact:** Any script running in the renderer (XSS via a loaded project, a malicious imported file, a compromised dependency in `index.html`) can turn this IPC call into local code execution. The sender check at `app/main.js:662` limits it to the main window but does not stop script injected into that window.
- **Fix direction:** Ignore `arg`, or accept it only if `fs.statSync(arg).isDirectory()` and it resolves inside `saveFolder()` / the custom save dir; otherwise use `shell.showItemInFolder`.

---

## Medium

### M1. `setSaveDir` accepts and creates any path from the renderer
- **File:** `app/main.js:680-691`
- **Problem:** `fs.mkdirSync(p, { recursive: true })` runs on an untrusted string, then the value is persisted as both `customSaveDir` and `saveDir`. No normalisation, no rejection of UNC paths (`\\host\share`), system folders, or relative paths.
- **Impact:** A compromised renderer can create directory trees anywhere the user can write, and redirect all future saves/exports to a network share (data exfiltration) or a system location. `pickDir` (`:692-704`) already gives a safe, dialog-based alternative.
- **Fix direction:** Require `path.isAbsolute`, reject UNC/device paths, or route this through the `pickDir` dialog only.

### M2. Predictable temp work dir + `rm -rf` on an overridable variable
- **File:** `android/build.sh:66-71`
- **Problem:** `B="${MOBIN_APK_WORK:-/tmp/mobinapk.$$}"` then `rm -rf "$B"` and `trap 'rm -rf "$B"' EXIT`. On shared `/tmp` the PID-based name is predictable (symlink/pre-creation race). If `MOBIN_APK_WORK` is mis-set (e.g. to the repo or `$HOME`), the script deletes it twice without any guard.
- **Fix direction:** Use `mktemp -d`; if `MOBIN_APK_WORK` is honoured, refuse empty, `/`, `$HOME`, or a non-empty existing dir.

### M3. Signing keystore and plaintext password copied into the temp dir
- **File:** `android/build.sh:71` (copies `signing/`), `:113-117` (`signing/mobin.keystore`, `signing/pass.txt`)
- **Problem:** The release keystore and its plaintext password are copied into `/tmp` or `C:\Temp`. The `EXIT` trap does not run on `SIGKILL`, crashes of the shell host, or power loss, so the material can be left behind in a world-readable location. The password lives as plaintext in `pass.txt`.
- **Fix direction:** Reference the keystore from its original location (or copy it with `umask 077` into a `mktemp -d` dir); read the password from an env var / secret store; confirm `signing/` is in `.gitignore`.

### M4. Unquoted command substitution for d8 input
- **File:** `android/build.sh:95`
- **Code:** `"$D8" ... --output dex $(find classes -name '*.class')`
- **Problem:** Word-splitting breaks on any class path containing spaces/globs, and a large project can exceed the Windows command-line length limit (~32 K chars), failing the build with an unclear error.
- **Fix direction:** Pass the `classes` directory or use `find ... -print0 | xargs -0`, or an `@argfile` like `sources.txt` at `:92`.

### M5. No check that the web build produced `index.html`
- **File:** `android/build.sh:60`, `:75`
- **Problem:** `app/build.sh` is run and its output is copied without verifying `app/build/index.html` exists and is non-empty. If `set -e` is not active or `app/build.sh` exits 0 on partial failure, an APK with a missing/stale UI is produced and signed. Other steps (`res.zip` `:85`, `classes.dex` `:96`) do have such checks; this one does not.
- **Fix direction:** `[ -s "$ROOT/app/build/index.html" ] || { echo "web build missing" >&2; exit 1; }`.

### M6. Windows code-signing password passed on the command line
- **File:** `windows/mkwin.sh:45`
- **Code:** `"$SIGNTOOL" sign /f "$SIGN_PFX" /p "$SIGN_PASS" ... /tr "${SIGN_TS:-http://timestamp.digicert.com}"`
- **Problem:** `/p "$SIGN_PASS"` exposes the PFX password in the process list and possibly shell/CI logs if tracing (`set -x`) is enabled.
- **Note:** The default timestamp URL is plain HTTP. RFC 3161 responses are signed, so this is low risk, but an HTTPS endpoint (or failing on timestamp error) is preferable.
- **Fix direction:** Import the certificate into the Windows cert store and sign with `/sha1 <thumbprint>`, or use a CSP/KSP; avoid `/p`.

---

## Needs manual verification

1. **Electron `sandbox` not set explicitly** — `app/main.js:296-301` sets `nodeIntegration: false` and `contextIsolation: true` but no `sandbox: true`. Default is sandboxed only on Electron ≥ 20; confirm the pinned Electron version, and set it explicitly either way.
2. **Path handling in file IPC handlers** — `ms:save` (`app/main.js:123`), `ms:saveProject` (`:206`), `ms:openProject` (`:232`) receive names/paths from the renderer. Confirm they reject `..`, absolute paths, and paths outside the save folder / user-chosen dialog results.
3. **Content Security Policy** — confirm the bundled `index.html` ships a restrictive CSP; H1 and M1 are only reachable if renderer script can be injected.
4. **`signing/` excluded from version control** — confirm `.gitignore` covers `android/signing/` and that the keystore/password were never committed to history.

---

## Summary

| Severity | Count |
|---|---|
| Critical | 0 |
| High | 1 |
| Medium | 6 |
| Manual verification | 4 |
