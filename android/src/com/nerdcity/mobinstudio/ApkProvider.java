package com.nerdcity.mobinstudio;

import android.content.ContentProvider;
import android.content.ContentValues;
import android.database.Cursor;
import android.net.Uri;
import android.os.ParcelFileDescriptor;

import java.io.File;
import java.io.FileNotFoundException;

/* Serves the downloaded update APK to the system installer.
   The build has no AndroidX, so this replaces FileProvider: it is private
   (exported=false) and only ever opens one .apk from the app's own cache,
   and only after an explicit per-URI read grant. */
public class ApkProvider extends ContentProvider {

  public static final String AUTH = "com.nerdcity.mobinstudio.apk";
  private static final String DIR = "update";

  @Override public boolean onCreate() { return true; }

  @Override public Cursor query(Uri u, String[] p, String s, String[] a, String o) { return null; }
  @Override public String getType(Uri u) { return "application/vnd.android.package-archive"; }
  @Override public Uri insert(Uri u, ContentValues v) { return null; }
  @Override public int delete(Uri u, String s, String[] a) { return 0; }
  @Override public int update(Uri u, ContentValues v, String s, String[] a) { return 0; }

  @Override public ParcelFileDescriptor openFile(Uri u, String mode) throws FileNotFoundException {
    File f = resolve(u);
    if (f == null) throw new FileNotFoundException("no such update");
    return ParcelFileDescriptor.open(f, ParcelFileDescriptor.MODE_READ_ONLY);
  }

  /* only "…/<name>.apk" straight inside cache/update, never a path */
  private File resolve(Uri u) {
    if (getContext() == null) return null;
    String n = u == null ? null : u.getLastPathSegment();
    if (n == null || !n.matches("[A-Za-z0-9._-]+\\.apk")) return null;
    File dir = new File(getContext().getCacheDir(), DIR);
    File f = new File(dir, n);
    try {
      if (!f.isFile() || f.length() == 0) return null;
      String dirPath = dir.getCanonicalPath();
      if (!f.getCanonicalPath().startsWith(dirPath + File.separator)) return null;
    } catch (Exception e) { return null; }
    return f;
  }
}
