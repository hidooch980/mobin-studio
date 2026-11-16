/* ============================================================
   Android app bridge
   The Android app (android/src/.../MainActivity.java) adds a JavaScript
   interface called MSA. Here it is wrapped into the same window.msDesktop
   API the Windows app offers, so the rest of the code does not care which
   one it runs in. Answers come back through window.__msaDone(id, json).
   ============================================================ */
(function androidBridge() {
  const A = window.MSA;
  if (!A || window.msDesktop) return;
  window.MOBIN_ANDROID = true;
  let seq = 0;
  const wait = new Map();
  window.__msaDone = (id, json) => {
    const f = wait.get(id); if (!f) return;
    wait.delete(id);
    let v = null;
    try { v = json ? JSON.parse(json) : null; } catch (e) { v = null; }
    f(v);
  };
  const call = fn => new Promise(res => {
    const id = ++seq; wait.set(id, res);
    try { fn(id); } catch (e) { wait.delete(id); res({ ok: false, error: String((e && e.message) || e) }); }
  });
  /* bytes go to Java as base64 text, a few hundred KB per call */
  const CH = 3 * 131072;
  async function send(u8) {
    const tok = A.begin();
    if (!tok) throw new Error('حافظهٔ موقت در دسترس نیست');
    try {
      for (let o = 0, n = 0; o < u8.length; o += CH, n++) {
        const part = u8.subarray(o, Math.min(u8.length, o + CH));
        let s = '';
        for (let i = 0; i < part.length; i += 0x8000) s += String.fromCharCode.apply(null, part.subarray(i, i + 0x8000));
        if (!A.chunk(tok, btoa(s))) throw new Error('نوشتن در حافظهٔ موقت ناموفق بود');
        if (n % 6 === 5) await new Promise(r => setTimeout(r, 0));
      }
      return tok;
    } catch (e) {
      try { A.abort(tok); } catch (_) {}
      throw e;
    }
  }
  const bytes = b => b instanceof Uint8Array ? b : new Uint8Array(b);
  const fail = e => ({ ok: false, error: String((e && e.message) || e) });
  /* a file Java opened for us is streamed back over the app's own address */
  async function pull(r) {
    if (!r || !r.ok || !r.token) return r;
    const res = await fetch('/__msa/' + encodeURIComponent(r.token));
    if (!res.ok) return { ok: false, error: 'خواندن فایل ناموفق بود' };
    return { ok: true, data: new Uint8Array(await res.arrayBuffer()), path: r.path || '', name: r.name || '' };
  }
  window.msDesktop = {
    android: true,
    save: async (name, buf) => {
      let tok;
      try {
        tok = await send(bytes(buf));
        const r = await call(id => A.save(id, tok, String(name || 'file')));
        if (!r || !r.ok) { try { A.abort(tok); } catch (_) {} }
        return r;
      } catch (e) { if (tok) try { A.abort(tok); } catch (_) {} return fail(e); }
    },
    saveProject: async (p, name, u8, asNew) => {
      let tok;
      try {
        tok = await send(bytes(u8));
        const r = await call(id => A.saveProject(id, tok, String(p || ''), String(name || 'project.mobin'), !!asNew));
        if (!r || !r.ok) { try { A.abort(tok); } catch (_) {} }
        return r;
      } catch (e) { if (tok) try { A.abort(tok); } catch (_) {} return fail(e); }
    },
    openProject: async p => {
      try { return await pull(await call(id => A.openProject(id, String(p || '')))); }
      catch (e) { return fail(e); }
    },
    pathOf: () => '',
    cmd: (n, a) => call(id => A.cmd(id, String(n), a === undefined || a === null ? '' : JSON.stringify(a)))
  };
})();
