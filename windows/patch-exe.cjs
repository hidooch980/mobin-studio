// stamps icon + version info into MobinStudio.exe
const fs = require('fs');
const ResEdit = require('resedit');
const exePath = process.argv[2];
const ver = (process.argv[3] || '8.0.0').split('.').map(Number); while (ver.length < 4) ver.push(0);
const exe = ResEdit.NtExecutable.from(fs.readFileSync(exePath), { ignoreCert: true });
const res = ResEdit.NtExecutableResource.from(exe);
const iconFile = ResEdit.Data.IconFile.from(fs.readFileSync(process.argv[4] || __dirname + '/build/icon.ico'));
const groups = ResEdit.Resource.IconGroupEntry.fromEntries(res.entries);
const gid = groups.length ? groups[0].id : 1, glang = groups.length ? groups[0].lang : 1033;
ResEdit.Resource.IconGroupEntry.replaceIconsForResource(res.entries, gid, glang, iconFile.icons.map(i => i.data));
const vis = ResEdit.Resource.VersionInfo.fromEntries(res.entries);
const vi = vis.length ? vis[0] : ResEdit.Resource.VersionInfo.createEmpty();
vi.setFileVersion(...ver); vi.setProductVersion(...ver);
const langs = vi.getAllLanguagesForStringValues(); const L = langs.length ? langs[0] : { lang: 1033, codepage: 1200 };
vi.setStringValues(L, {
  CompanyName: 'Mobin Studio', FileDescription: 'Mobin Studio', FileVersion: ver.join('.'),
  InternalName: 'MobinStudio', LegalCopyright: 'Copyright (C) 2025 Mobin Studio', OriginalFilename: 'MobinStudio.exe',
  ProductName: 'Mobin Studio', ProductVersion: ver.join('.')
});
vi.outputToResourceEntries(res.entries);
res.outputResource(exe);
fs.writeFileSync(exePath, Buffer.from(exe.generate()));
console.log('patched', exePath, fs.statSync(exePath).size, 'icons', iconFile.icons.length, 'group', gid, glang);
