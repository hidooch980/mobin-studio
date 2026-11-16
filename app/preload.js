/* keeps the renderer sandboxed; exposes only "this is the desktop app", "save these bytes" and a few window commands */
const { contextBridge, ipcRenderer, webUtils } = require('electron');
contextBridge.exposeInMainWorld('MOBIN_DESKTOP', true);
contextBridge.exposeInMainWorld('msDesktop', {
  save: (name, buf, direct) => ipcRenderer.invoke('ms:save', String(name || ''), new Uint8Array(buf), !!direct),
  /* .mobin project files: Ctrl+S writes into the open file, Ctrl+O / Explorer open one */
  saveProject: (p, name, buf, asNew) => ipcRenderer.invoke('ms:saveProject', p ? String(p) : null, String(name || ''), new Uint8Array(buf), !!asNew),
  openProject: p => ipcRenderer.invoke('ms:openProject', p ? String(p) : null),
  pathOf: f => { try { return (webUtils && webUtils.getPathForFile(f)) || ''; } catch (e) { return ''; } },
  cmd: (name, arg) => ipcRenderer.invoke('ms:cmd', String(name || ''), arg === undefined ? null : arg)
});
