package com.nerdcity.mobinstudio;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.ActivityNotFoundException;
import android.content.ClipData;
import android.content.ContentResolver;
import android.content.ContentUris;
import android.content.ContentValues;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.UriPermission;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.database.Cursor;
import android.graphics.drawable.ColorDrawable;
import android.media.MediaScannerConnection;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.os.ParcelFileDescriptor;
import android.provider.DocumentsContract;
import android.provider.MediaStore;
import android.provider.OpenableColumns;
import android.util.Base64;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.webkit.ConsoleMessage;
import android.webkit.JavascriptInterface;
import android.webkit.RenderProcessGoneDetail;
import android.webkit.ValueCallback;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Mobin Studio for Android.
 *
 * The whole editor is the same single-page app as the Windows version
 * (app/build/index.html, copied to assets/ by build.sh). It is served from
 * https://appassets.androidplatform.net/ so it gets a normal, stable origin
 * (localStorage + IndexedDB keep working between runs).
 *
 * The page talks to this class through the "MSA" JavaScript interface; see
 * app/android-bridge.js for the other half. Long jobs answer later through
 * window.__msaDone(id, json).
 */
public class MainActivity extends Activity {

  static final String HOST = "appassets.androidplatform.net";
  static final String HOME = "https://" + HOST + "/index.html";
  static final String FOLDER = "MobinStudio";
  static final int REQ_PICK = 4101, REQ_CREATE = 4102, REQ_OPEN = 4103, REQ_PERM = 4104, REQ_INSTALL = 4105;
  static final int MAX_RECENT = 12;

  WebView web;
  boolean dead, light, fullscreen, pendingTaken;
  String pendingOpen;
  SharedPreferences prefs;
  final Handler ui = new Handler(Looper.getMainLooper());
  final ExecutorService io = Executors.newSingleThreadExecutor();
  /* bytes the page is sending us (token -> temp file) */
  final Map<String, File> uploads = new ConcurrentHashMap<>();
  /* project addresses the user actually chose (picker, recents, a "view" intent).
     The page may only reopen one of these — same rule as the Windows build, so a
     manipulated page cannot ask this app to read an arbitrary file. */
  final Set<String> known = Collections.synchronizedSet(new LinkedHashSet<String>());
  /* files the page may fetch once from /__msa/<token> */
  final Map<String, Uri> served = new ConcurrentHashMap<>();
  /* file chooser of <input type=file> */
  ValueCallback<Uri[]> pickCb;
  /* "save as" / "open" boxes that wait for the user */
  int createId, openId;
  File createFile;
  /* jobs waiting for the storage permission (Android 9 and older) */
  final ArrayList<Runnable[]> permWait = new ArrayList<>();

  // ------------------------------------------------------------------ life

  @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
  @Override protected void onCreate(Bundle state) {
    super.onCreate(state);
    prefs = getSharedPreferences("msa", MODE_PRIVATE);
    seedKnown();
    light = "light".equals(prefs.getString("theme", "dark"));
    io.execute(new Runnable() { public void run() { cleanTemp(); } });

    web = new WebView(this);
    web.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
    web.setOverScrollMode(View.OVER_SCROLL_NEVER);
    web.setVerticalScrollBarEnabled(false);
    web.setHorizontalScrollBarEnabled(false);
    setContentView(web);
    applyBars();

    WebSettings s = web.getSettings();
    s.setJavaScriptEnabled(true);
    s.setDomStorageEnabled(true);
    s.setDatabaseEnabled(true);
    s.setAllowFileAccess(false);
    s.setAllowContentAccess(false);
    s.setMediaPlaybackRequiresUserGesture(false);
    s.setSupportZoom(false);
    s.setBuiltInZoomControls(false);
    s.setDisplayZoomControls(false);
    s.setUseWideViewPort(true);
    s.setLoadWithOverviewMode(false);
    s.setTextZoom(100);
    s.setSupportMultipleWindows(false);
    s.setJavaScriptCanOpenWindowsAutomatically(false);
    if (Build.VERSION.SDK_INT >= 26) s.setSafeBrowsingEnabled(false);

    web.addJavascriptInterface(new Bridge(), "MSA");
    web.setWebViewClient(new Client());
    web.setWebChromeClient(new Chrome());

    if (state == null) pendingOpen = viewUri(getIntent());
    web.loadUrl(HOME);
    checkWebView();
  }

  @Override protected void onNewIntent(Intent it) {
    super.onNewIntent(it);
    setIntent(it);
    String u = viewUri(it);
    if (u == null || web == null) return;
    if (!pendingTaken) { pendingOpen = u; return; }   // the page has not asked yet: it will
    String nm = "";
    try { nm = nameOf(Uri.parse(u)); } catch (Exception e) { }
    web.evaluateJavascript("window.__msOpenPath&&window.__msOpenPath(" + JSONObject.quote(u) + "," + JSONObject.quote(nm) + ")", null);
  }

  @Override protected void onPause() { super.onPause(); if (web != null) web.onPause(); }
  @Override protected void onResume() { super.onResume(); if (web != null) web.onResume(); }

  @Override public void onWindowFocusChanged(boolean has) {
    super.onWindowFocusChanged(has);
    if (has && fullscreen) setFullscreen(true);
  }

  @Override protected void onDestroy() {
    dead = true;
    if (pickCb != null) { try { pickCb.onReceiveValue(null); } catch (Exception e) { } pickCb = null; }
    if (web != null) {
      try { ((ViewGroup) web.getParent()).removeView(web); } catch (Exception e) { }
      web.destroy();
      web = null;
    }
    io.shutdown();
    super.onDestroy();
  }

  /* Android back button: the page closes its own menus / sheets / dialogs first */
  @Override public void onBackPressed() {
    if (web == null) { super.onBackPressed(); return; }
    web.evaluateJavascript("(function(){try{return window.__msBack?window.__msBack():0}catch(e){return 0}})()",
      new ValueCallback<String>() {
        @Override public void onReceiveValue(String v) {
          if (!"1".equals(v)) moveTaskToBack(true);
        }
      });
  }

  // ------------------------------------------------------------------ WebView

  class Client extends WebViewClient {
    @Override public WebResourceResponse shouldInterceptRequest(WebView v, WebResourceRequest r) {
      Uri u = r.getUrl();
      if (u == null || !HOST.equals(u.getHost())) return null;
      return serve(u.getPath());
    }

    @Override public boolean shouldOverrideUrlLoading(WebView v, WebResourceRequest r) {
      Uri u = r.getUrl();
      if (u != null && HOST.equals(u.getHost())) return false;
      String sc = u == null ? null : u.getScheme();
      if ("https".equals(sc) || "http".equals(sc) || "mailto".equals(sc))
        try { startActivity(new Intent(Intent.ACTION_VIEW, u)); } catch (Exception e) { }
      return true;
    }

    @Override public void onPageStarted(WebView v, String url, android.graphics.Bitmap icon) {
      pendingTaken = false;
    }

    /* the page ran out of memory (huge pictures) and its process was killed:
       start over; the page offers to restore the last autosave */
    @Override public boolean onRenderProcessGone(WebView v, RenderProcessGoneDetail d) {
      if (v != web) return true;
      ViewGroup p = (ViewGroup) v.getParent();
      if (p != null) p.removeView(v);
      v.destroy();
      web = null;
      Toast.makeText(MainActivity.this, "حافظهٔ گوشی کم آمد — برنامه دوباره باز شد", Toast.LENGTH_LONG).show();
      recreate();
      return true;
    }
  }

  class Chrome extends WebChromeClient {
    @Override public boolean onConsoleMessage(ConsoleMessage m) { return true; }

    @Override public boolean onShowFileChooser(WebView v, ValueCallback<Uri[]> cb, FileChooserParams p) {
      if (pickCb != null) { try { pickCb.onReceiveValue(null); } catch (Exception e) { } }
      pickCb = cb;
      String[] mimes = mimesFor(p.getAcceptTypes());
      boolean many = p.getMode() == FileChooserParams.MODE_OPEN_MULTIPLE;
      try {
        startActivityForResult(pickIntent(Intent.ACTION_OPEN_DOCUMENT, mimes, many), REQ_PICK);
        return true;
      } catch (ActivityNotFoundException e) {
        try {
          startActivityForResult(Intent.createChooser(pickIntent(Intent.ACTION_GET_CONTENT, mimes, many), null), REQ_PICK);
          return true;
        } catch (Exception e2) {
          pickCb = null;
          toast("برنامه‌ای برای انتخاب فایل پیدا نشد");
          return false;
        }
      }
    }
  }

  static Intent pickIntent(String action, String[] mimes, boolean many) {
    Intent i = new Intent(action);
    i.addCategory(Intent.CATEGORY_OPENABLE);
    if (mimes.length == 1) i.setType(mimes[0]);
    else { i.setType("*/*"); i.putExtra(Intent.EXTRA_MIME_TYPES, mimes); }
    if (many) i.putExtra(Intent.EXTRA_ALLOW_MULTIPLE, true);
    return i;
  }

  static final Map<String, String> EXT = new HashMap<>();
  static {
    EXT.put(".zip", "application/zip");
    EXT.put(".txt", "text/plain");
    EXT.put(".json", "application/json");
    EXT.put(".png", "image/png");
    EXT.put(".jpg", "image/jpeg");
    EXT.put(".jpeg", "image/jpeg");
    EXT.put(".webp", "image/webp");
  }

  /* accept=".png,image/*,.zip" -> mime types for the picker.
     Anything Android has no type for (.mobin, fonts) means: show every file. */
  static String[] mimesFor(String[] accept) {
    LinkedHashSet<String> out = new LinkedHashSet<>();
    if (accept != null) for (String a0 : accept) {
      if (a0 == null) continue;
      for (String a : a0.split(",")) {
        a = a.trim().toLowerCase(Locale.ROOT);
        if (a.isEmpty()) continue;
        String m = a.contains("/") ? a : EXT.get(a);
        if (m == null || m.equals("*/*")) return new String[]{"*/*"};
        out.add(m);
        if (m.equals("application/zip")) out.add("application/x-zip-compressed");
      }
    }
    if (out.isEmpty()) return new String[]{"*/*"};
    return out.toArray(new String[0]);
  }

  @Override protected void onActivityResult(int req, int res, Intent data) {
    if (req == REQ_PICK) {
      ValueCallback<Uri[]> cb = pickCb;
      pickCb = null;
      if (cb == null) return;
      Uri[] out = null;
      if (res == RESULT_OK && data != null) {
        ClipData c = data.getClipData();
        if (c != null && c.getItemCount() > 0) {
          out = new Uri[c.getItemCount()];
          for (int k = 0; k < out.length; k++) out[k] = c.getItemAt(k).getUri();
        } else if (data.getData() != null) out = new Uri[]{data.getData()};
      }
      cb.onReceiveValue(out);
      return;
    }
    if (req == REQ_CREATE) { onCreated(res == RESULT_OK && data != null ? data.getData() : null); return; }
    if (req == REQ_OPEN) { onOpened(res == RESULT_OK && data != null ? data.getData() : null); return; }
    super.onActivityResult(req, res, data);
  }

  /* the app's own address: index.html from assets, plus files we opened for the page */
  WebResourceResponse serve(String path) {
    Map<String, String> h = new HashMap<>();
    h.put("Cache-Control", "no-store");
    if (path == null || path.isEmpty() || path.equals("/")) path = "/index.html";
    if (path.startsWith("/__msa/")) {
      Uri u = served.remove(Uri.decode(path.substring(7)));
      if (u != null) {
        try { return new WebResourceResponse("application/octet-stream", null, 200, "OK", h, openIn(u)); }
        catch (Exception e) { }
      }
      return notFound(h);
    }
    String a = path.substring(1);
    if (a.contains("..")) return notFound(h);
    try {
      InputStream in = getAssets().open(a);
      String m = mimeOf(a);
      return new WebResourceResponse(m, m.startsWith("text/") || m.endsWith("javascript") ? "utf-8" : null, 200, "OK", h, in);
    } catch (IOException e) {
      return notFound(h);
    }
  }

  static WebResourceResponse notFound(Map<String, String> h) {
    return new WebResourceResponse("text/plain", "utf-8", 404, "Not Found", h, new ByteArrayInputStream(new byte[0]));
  }

  // ------------------------------------------------------------------ bridge

  public class Bridge {
    /* a new upload: returns a token for chunk() */
    @JavascriptInterface public String begin() {
      File f = null;
      try {
        File d = new File(getCacheDir(), "msa");
        if (!d.isDirectory() && !d.mkdirs()) return "";
        String tok = UUID.randomUUID().toString();
        f = new File(d, tok);
        new FileOutputStream(f).close();
        uploads.put(tok, f);
        return tok;
      } catch (Throwable e) { if (f != null) f.delete(); return ""; }
    }

    /* discard an incomplete upload when JavaScript cannot finish sending it */
    @JavascriptInterface public void abort(String tok) {
      discardUpload(tok);
    }

    /* a piece of the upload, as base64 */
    @JavascriptInterface public boolean chunk(String tok, String b64) {
      File f = tok == null ? null : uploads.get(tok);
      if (f == null || b64 == null) { discardUpload(tok); return false; }
      FileOutputStream o = null;
      boolean ok = false;
      try {
        o = new FileOutputStream(f, true);
        o.write(Base64.decode(b64, Base64.DEFAULT));
        ok = true;
      } catch (Throwable e) {
        ok = false;
      } finally {
        if (o != null) try { o.close(); } catch (IOException e) { ok = false; }
      }
      if (!ok) discardUpload(tok);
      return ok;
    }

    /* export: pictures go to Pictures/MobinStudio (gallery), the rest to Download/MobinStudio.
       name may hold a folder: "Project/001_page.png" */
    @JavascriptInterface public void save(final int id, final String tok, final String name) {
      final File f = tok == null ? null : uploads.remove(tok);
      if (f == null) { done(id, err("داده‌ای برای ذخیره نرسید")); return; }
      final Runnable job = new Runnable() { public void run() {
        try { done(id, publish(f, name == null ? "file" : name)); }
        catch (Throwable e) { done(id, err(msg(e))); }
        finally { f.delete(); }
      } };
      if (needStorage()) askStorage(new Runnable() { public void run() { io.execute(job); } },
        new Runnable() { public void run() { f.delete(); done(id, err("اجازهٔ دسترسی به حافظه داده نشد")); } });
      else io.execute(job);
    }

    /* .mobin project: write over the file it came from, or ask where to put it */
    @JavascriptInterface public void saveProject(final int id, final String tok, final String path, final String name, final boolean asNew) {
      final File f = tok == null ? null : uploads.remove(tok);
      if (f == null) { done(id, err("داده‌ای برای ذخیره نرسید")); return; }
      final Uri u = path == null || path.isEmpty() ? null : Uri.parse(path);
      final String nm = name == null || name.isEmpty() ? "project.mobin" : name;
      if (!asNew && u != null && canWrite(u)) {
        io.execute(new Runnable() { public void run() {
          try {
            Uri saved = writeSafTransaction(u, f);
            String shown = nameOf(saved);
            addRecent(saved, shown);
            f.delete();
            done(id, okFile(saved, shown));
          } catch (Throwable e) {
            /* could not write there any more: let the user pick a place */
            ui.post(new Runnable() { public void run() { createBox(id, f, nm); } });
          }
        } });
        return;
      }
      ui.post(new Runnable() { public void run() { createBox(id, f, nm); } });
    }

    /* open a project: from a known address (recent / last session) or with the system file box */
    @JavascriptInterface public void openProject(final int id, final String path) {
      if (path == null || path.isEmpty()) {
        ui.post(new Runnable() { public void run() { openBox(id); } });
        return;
      }
      /* only an address the user chose — the file box, the recent list, or a
         .mobin opened from a file manager / Telegram */
      if (!known.contains(path)) { done(id, err("این مسیر از برنامه انتخاب نشده است")); return; }
      io.execute(new Runnable() { public void run() { openUri(id, Uri.parse(path), true); } });
    }

    @JavascriptInterface public void cmd(final int id, final String name, final String arg) {
      ui.post(new Runnable() { public void run() {
        String n = name == null ? "" : name;
        String a = arg == null ? "" : arg;
        /* downloading an update answers later, from the background thread */
        if ("installUpdate".equals(n)) { startUpdate(id, a); return; }
        String r = null;
        try { r = command(n, a); } catch (Throwable e) { }
        done(id, r);
      } });
    }
  }

  void discardUpload(String tok) {
    if (tok == null) return;
    File f = uploads.remove(tok);
    if (f != null) try { f.delete(); } catch (Exception ignored) { }
  }

  void done(final int id, final String json) {
    ui.post(new Runnable() { public void run() {
      if (dead || web == null) return;
      web.evaluateJavascript("window.__msaDone&&window.__msaDone(" + id + "," + (json == null ? "null" : JSONObject.quote(json)) + ")", null);
    } });
  }

  String command(String name, String arg) {
    switch (name) {
      case "pendingOpen": {
        pendingTaken = true;
        String p = pendingOpen;
        pendingOpen = null;
        return p == null ? null : JSONObject.quote(p);
      }
      case "recent": return recentForPage();
      case "theme": {
        light = arg.contains("light");
        prefs.edit().putString("theme", light ? "light" : "dark").apply();
        applyBars();
        return "true";
      }
      case "fullscreen": setFullscreen(!fullscreen); return fullscreen ? "true" : "false";
      case "about": about(); return "true";
      case "reload": if (web != null) web.reload(); return "true";
      case "quit": finish(); return "true";
      default: return null;
    }
  }

  // ------------------------------------------------------------------ update

  /* Only our own release downloads reach the installer, so a manipulated page
     cannot make the app install an arbitrary APK. The system always asks the
     user to confirm the install; nothing here installs silently. */
  static final java.util.regex.Pattern APK_URL = java.util.regex.Pattern.compile(
      "^https://github\\.com/hidooch980/mobin-studio/releases/download/[A-Za-z0-9._%/-]+$");
  static final java.util.regex.Pattern APK_NAME = java.util.regex.Pattern.compile(
      "^MobinStudio-[0-9]+(\\.[0-9]+)*\\.apk$");
  static final long APK_MAX = 420L * 1024 * 1024;

  File updateDir() {
    File d = new File(getCacheDir(), "update");
    if (!d.isDirectory()) d.mkdirs();
    return d;
  }

  /* runs on the ui thread; answers the page later through done() */
  void startUpdate(final int id, final String url) {
    if (url == null || url.length() > 500 || !APK_URL.matcher(url).matches()) {
      done(id, err("لینک به‌روزرسانی معتبر نیست"));
      return;
    }
    final String name = Uri.decode(url.substring(url.lastIndexOf('/') + 1));
    if (!APK_NAME.matcher(name).matches()) { done(id, err("نام فایل به‌روزرسانی معتبر نیست")); return; }
    if (Build.VERSION.SDK_INT >= 26 && !getPackageManager().canRequestPackageInstalls()) {
      /* the system must allow this app to hand over an APK; ask once, then let
         the user tap "دانلود و نصب" again */
      try {
        Intent s = new Intent(android.provider.Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,
            Uri.parse("package:" + getPackageName()));
        startActivity(s);
        Toast.makeText(this, "اجازهٔ «نصب برنامه‌های ناشناس» را برای Mobin Studio روشن کنید و دوباره بزنید", Toast.LENGTH_LONG).show();
      } catch (Throwable t) {
        Toast.makeText(this, "اجازهٔ نصب برنامه در تنظیمات این برنامه بسته است", Toast.LENGTH_LONG).show();
      }
      done(id, err("اجازهٔ نصب بسته است؛ آن را در تنظیمات روشن کنید و دوباره بزنید"));
      return;
    }
    io.execute(new Runnable() { public void run() {
      String r;
      try { r = fetchApk(id, url, name); }
      catch (Throwable e) { r = err(updateMsg(e)); }
      if ("{\"ok\":true}".equals(r)) {
        final File apk = new File(updateDir(), name);
        ui.post(new Runnable() { public void run() {
          done(id, handToInstaller(apk) ? "{\"ok\":true}" : err("پنجرهٔ نصب باز نشد؛ «نصب برنامه‌های ناشناس» را بررسی کنید"));
        } });
      } else done(id, r);
    } });
  }

  /* background thread: download into cache/update, then ask the system to install */
  String fetchApk(int id, String url, String name) {
    File dir = updateDir();
    File[] old = dir.listFiles();
    if (old != null) for (File f : old) if (f.getName().endsWith(".apk")) f.delete();
    File out = new File(dir, name);
    HttpURLConnection c = null;
    InputStream in = null;
    FileOutputStream o = null;
    try {
      URL next = new URL(url);
      int redirects = 0;
      while (true) {
        if (!"https".equalsIgnoreCase(next.getProtocol()) || !allowedUpdateHost(next.getHost()))
          return err("سرور دانلود امن نیست");
        c = (HttpURLConnection) next.openConnection();
        c.setInstanceFollowRedirects(false);
        c.setConnectTimeout(20000);
        c.setReadTimeout(30000);
        c.setRequestProperty("User-Agent", "MobinStudio/" + versionName());
        c.setRequestProperty("Accept", "application/octet-stream");
        int code = c.getResponseCode();
        if (code == 301 || code == 302 || code == 303 || code == 307 || code == 308) {
          String location = c.getHeaderField("Location");
          c.disconnect(); c = null;
          if (location == null || ++redirects > 5) return err("پیوند دانلود معتبر نیست");
          next = new URL(next, location);
          continue;
        }
        if (code != 200) return err("سرور دانلود پاسخ " + code + " داد");
        break;
      }
      long size = c.getContentLength();
      if (size > APK_MAX) return err("فایل به‌روزرسانی بزرگ‌تر از حد انتظار است");
      in = c.getInputStream();
      o = new FileOutputStream(out);
      byte[] b = new byte[64 * 1024];
      long got = 0;
      int n;
      while ((n = in.read(b)) != -1) {
        if (n == 0) continue;
        got += n;
        if (got > APK_MAX) { out.delete(); return err("فایل به‌روزرسانی بزرگ‌تر از حد انتظار است"); }
        o.write(b, 0, n);
      }
      o.flush();
      o.close(); o = null;
      in.close(); in = null;
      if (got == 0 || (size >= 0 && got != size)) { out.delete(); return err("دانلود کامل نشد؛ دوباره تلاش کنید"); }
      /* an APK is a zip: starts with "PK"; PackageInstaller checks its signature. */
      FileInputStream h = new FileInputStream(out);
      byte[] sig = new byte[2];
      int gotSig = h.read(sig);
      h.close();
      if (gotSig != 2 || sig[0] != 'P' || sig[1] != 'K') { out.delete(); return err("فایل دریافتی یک بستهٔ اندروید نیست"); }
    } catch (Throwable e) {
      try { out.delete(); } catch (Throwable ignored) { }
      return err(updateMsg(e));
    } finally {
      if (o != null) try { o.close(); } catch (IOException ignored) { }
      if (in != null) try { in.close(); } catch (IOException ignored) { }
      if (c != null) c.disconnect();
    }
    return "{\"ok\":true}";
  }

  static boolean allowedUpdateHost(String h) {
    String x = h == null ? "" : h.toLowerCase(Locale.US);
    return "github.com".equals(x) || "githubusercontent.com".equals(x)
        || x.endsWith(".githubusercontent.com");
  }

  /* ui thread: open the system installer for the downloaded file */
  boolean handToInstaller(File apk) {
    try {
      Uri u = new Uri.Builder().scheme("content").authority(ApkProvider.AUTH)
          .appendPath(apk.getName()).build();
      Intent i = new Intent(Intent.ACTION_VIEW);
      i.setDataAndType(u, "application/vnd.android.package-archive");
      i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_ACTIVITY_NEW_TASK);
      startActivity(i);
      Toast.makeText(this, "نصب را در پنجرهٔ اندروید تأیید کنید", Toast.LENGTH_LONG).show();
      return true;
    } catch (Throwable e) {
      Toast.makeText(this, "پنجرهٔ نصب باز نشد؛ «نصب برنامه‌های ناشناس» را بررسی کنید", Toast.LENGTH_LONG).show();
      return false;
    }
  }

  String versionName() {
    try { return getPackageManager().getPackageInfo(getPackageName(), 0).versionName; }
    catch (Throwable e) { return "0"; }
  }

  // ------------------------------------------------------------------ projects

  void createBox(int id, File f, String name) {
    if (createId != 0) { if (createFile != null) createFile.delete(); done(createId, "{\"canceled\":true}"); }
    createId = id;
    createFile = f;
    Intent i = new Intent(Intent.ACTION_CREATE_DOCUMENT);
    i.addCategory(Intent.CATEGORY_OPENABLE);
    i.setType("application/octet-stream");
    i.putExtra(Intent.EXTRA_TITLE, clean(name, "project.mobin"));
    try {
      startActivityForResult(i, REQ_CREATE);
    } catch (Exception e) {
      createId = 0; createFile = null; f.delete();
      done(id, err("پنجرهٔ ذخیرهٔ فایل باز نشد"));
    }
  }

  void onCreated(final Uri u) {
    final int id = createId;
    final File f = createFile;
    createId = 0; createFile = null;
    if (id == 0 || f == null) return;
    if (u == null) { f.delete(); done(id, "{\"canceled\":true}"); return; }
    keep(u);
    io.execute(new Runnable() { public void run() {
      try {
        writeTo(u, f);
        String shown = nameOf(u);
        addRecent(u, shown);
        done(id, okFile(u, shown));
      } catch (Throwable e) {
        done(id, err(msg(e)));
      } finally { f.delete(); }
    } });
  }

  void openBox(int id) {
    if (openId != 0) done(openId, "{\"canceled\":true}");
    openId = id;
    Intent i = new Intent(Intent.ACTION_OPEN_DOCUMENT);
    i.addCategory(Intent.CATEGORY_OPENABLE);
    i.setType("*/*");
    try {
      startActivityForResult(i, REQ_OPEN);
    } catch (Exception e) {
      openId = 0;
      done(id, err("پنجرهٔ باز کردن فایل باز نشد"));
    }
  }

  void onOpened(final Uri u) {
    final int id = openId;
    openId = 0;
    if (id == 0) return;
    if (u == null) { done(id, "{\"canceled\":true}"); return; }
    keep(u);
    io.execute(new Runnable() { public void run() { openUri(id, u, false); } });
  }

  /* check that it can be read, then let the page fetch it once */
  void openUri(int id, Uri u, boolean known) {
    try {
      InputStream in = openIn(u);
      if (in == null) throw new IOException("no stream");
      in.close();
      String nm = nameOf(u);
      boolean kept = canRead(u);
      if (kept) addRecent(u, nm);
      String tok = UUID.randomUUID().toString();
      served.put(tok, u);
      JSONObject o = new JSONObject();
      o.put("ok", true);
      o.put("token", tok);
      o.put("name", nm);
      o.put("path", kept ? u.toString() : "");
      done(id, o.toString());
    } catch (Throwable e) {
      if (known) dropRecent(u.toString());
      done(id, err(e instanceof SecurityException
        ? "اجازهٔ خواندن این فایل دیگر نیست — یک بار از «باز کردن پروژه» انتخابش کنید"
        : "فایل پیدا نشد یا باز نشد"));
    }
  }

  InputStream openIn(Uri u) throws IOException {
    if ("file".equals(u.getScheme())) return new FileInputStream(u.getPath());
    return getContentResolver().openInputStream(u);
  }

  /* write a whole file over a document. "rwt" first: some providers ignore the
     truncate of plain "w" and would leave old bytes at the end */
  void writeTo(Uri u, File f) throws IOException {
    ContentResolver cr = getContentResolver();
    IOException last = null;
    ParcelFileDescriptor pfd = null;
    try {
      pfd = cr.openFileDescriptor(u, "rwt");
      if (pfd == null) throw new IOException("no descriptor");
      FileOutputStream o = new FileOutputStream(pfd.getFileDescriptor());
      try { o.getChannel().truncate(0); } catch (Exception e) { }
      FileInputStream in = new FileInputStream(f);
      try { copy(in, o); o.flush(); } finally { in.close(); }
      try { o.getFD().sync(); } catch (Exception e) { }
      o.close();
      pfd.close();
      pfd = null;
      return;
    } catch (Exception e) {
      last = e instanceof IOException ? (IOException) e : new IOException(e.getMessage(), e);
    } finally {
      if (pfd != null) try { pfd.close(); } catch (IOException e) { }
    }
    for (String mode : new String[]{"wt", "w"}) {
      OutputStream o = null;
      try {
        o = cr.openOutputStream(u, mode);
        if (o == null) throw new IOException("no stream");
        FileInputStream in = new FileInputStream(f);
        try { copy(in, o); } finally { in.close(); }
        o.close();
        o = null;
        return;
      } catch (Exception e) {
        last = e instanceof IOException ? (IOException) e : new IOException(e.getMessage(), e);
      } finally {
        if (o != null) try { o.close(); } catch (IOException e) { }
      }
    }
    throw last;
  }

  /* Replace a SAF document without ever truncating its current contents in place.
     Stage the complete new bytes beside it, then move the old document to a backup
     before installing the staged document. If the provider cannot perform this
     sequence, leave the original alone and let the caller offer Save As instead. */
  Uri writeSafTransaction(Uri target, File src) throws IOException {
    ContentResolver cr = getContentResolver();
    String authority = target.getAuthority();
    String id;
    try { id = DocumentsContract.getDocumentId(target); }
    catch (Exception e) { throw new IOException("Cannot identify SAF document", e); }
    int slash = id.lastIndexOf('/');
    if (authority == null || slash <= 0 || slash == id.length() - 1)
      throw new IOException("This document provider does not support safe replacement");
    String parentId = id.substring(0, slash);
    String oldName = nameOf(target);
    if (oldName == null || oldName.isEmpty())
      throw new IOException("Could not determine existing SAF document name");
    Uri parent = DocumentsContract.buildDocumentUri(authority, parentId);
    Uri staged = null, backup = null;
    String tempName = "." + oldName + ".mobin-tmp-" + UUID.randomUUID();
    String backupName = "." + oldName + ".mobin-backup-" + UUID.randomUUID();
    boolean originalMoved = false;
    try {
      staged = DocumentsContract.createDocument(cr, parent, "application/octet-stream", tempName);
      if (staged == null) throw new IOException("Could not create SAF staging document");
      writeTo(staged, src);
      backup = DocumentsContract.renameDocument(cr, target, backupName);
      if (backup == null) throw new IOException("Could not protect existing SAF document");
      originalMoved = true;
      Uri replacement = DocumentsContract.renameDocument(cr, staged, oldName);
      if (replacement == null) throw new IOException("Could not install staged SAF document");
      staged = null;
      try { DocumentsContract.deleteDocument(cr, backup); } catch (Exception ignored) { }
      return replacement;
    } catch (Exception e) {
      if (originalMoved && backup != null) {
        try { DocumentsContract.renameDocument(cr, backup, oldName); backup = null; }
        catch (Exception rollback) { e.addSuppressed(rollback); }
      }
      if (staged != null) try { DocumentsContract.deleteDocument(cr, staged); } catch (Exception ignored) { }
      if (e instanceof IOException) throw (IOException)e;
      throw new IOException("Safe SAF replacement failed", e);
    }
  }

  /* keep the right to read (and write) a document after a restart */
  void keep(Uri u) {
    if (u == null || !"content".equals(u.getScheme())) return;
    ContentResolver cr = getContentResolver();
    try { cr.takePersistableUriPermission(u, Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_GRANT_WRITE_URI_PERMISSION); return; }
    catch (Exception e) { }
    try { cr.takePersistableUriPermission(u, Intent.FLAG_GRANT_READ_URI_PERMISSION); } catch (Exception e) { }
  }

  boolean canWrite(Uri u) {
    for (UriPermission p : getContentResolver().getPersistedUriPermissions())
      if (p.getUri().equals(u) && p.isWritePermission()) return true;
    return false;
  }

  boolean canRead(Uri u) {
    for (UriPermission p : getContentResolver().getPersistedUriPermissions())
      if (p.getUri().equals(u) && p.isReadPermission()) return true;
    return false;
  }

  String nameOf(Uri u) {
    if ("file".equals(u.getScheme())) return new File(u.getPath()).getName();
    Cursor c = null;
    try {
      c = getContentResolver().query(u, new String[]{OpenableColumns.DISPLAY_NAME}, null, null, null);
      if (c != null && c.moveToFirst()) {
        String s = c.getString(0);
        if (s != null && !s.isEmpty()) return s;
      }
    } catch (Exception e) {
    } finally { if (c != null) c.close(); }
    String s = u.getLastPathSegment();
    if (s != null) {
      int k = Math.max(s.lastIndexOf('/'), s.lastIndexOf(':'));
      if (k >= 0) s = s.substring(k + 1);
    }
    return s == null || s.isEmpty() ? "project.mobin" : s;
  }

  /* a VIEW intent (file manager, Telegram...) -> address of the file */
  String viewUri(Intent it) {
    if (it == null || !Intent.ACTION_VIEW.equals(it.getAction()) || it.getData() == null) return null;
    Uri u = it.getData();
    known.add(u.toString());
    keep(u);
    return u.toString();
  }

  // ------------------------------------------------------------------ recent projects

  JSONArray recentList() {
    try { return new JSONArray(prefs.getString("recent", "[]")); } catch (Exception e) { return new JSONArray(); }
  }

  /* everything in the recent list was picked by the user, so it stays allowed
     across restarts (the page may reopen it without asking again) */
  void seedKnown() {
    try {
      JSONArray a = recentList();
      for (int k = 0; k < a.length(); k++) {
        JSONObject x = a.optJSONObject(k);
        if (x != null) known.add(x.optString("path"));
      }
    } catch (Exception e) { }
  }

  synchronized void addRecent(Uri u, String name) {
    try {
      String p = u.toString();
      known.add(p);
      JSONArray a = recentList(), b = new JSONArray();
      JSONObject o = new JSONObject();
      o.put("path", p);
      o.put("name", name);
      b.put(o);
      for (int k = 0; k < a.length() && b.length() < MAX_RECENT; k++) {
        JSONObject x = a.optJSONObject(k);
        if (x != null && !p.equals(x.optString("path"))) b.put(x);
      }
      prefs.edit().putString("recent", b.toString()).apply();
    } catch (Exception e) { }
  }

  synchronized void dropRecent(String p) {
    try {
      JSONArray a = recentList(), b = new JSONArray();
      for (int k = 0; k < a.length(); k++) {
        JSONObject x = a.optJSONObject(k);
        if (x != null && !p.equals(x.optString("path"))) b.put(x);
      }
      prefs.edit().putString("recent", b.toString()).apply();
    } catch (Exception e) { }
  }

  String recentForPage() {
    Set<String> ok = new HashSet<>();
    for (UriPermission p : getContentResolver().getPersistedUriPermissions())
      if (p.isReadPermission()) ok.add(p.getUri().toString());
    JSONArray a = recentList(), out = new JSONArray();
    for (int k = 0; k < a.length(); k++) {
      JSONObject x = a.optJSONObject(k);
      if (x == null) continue;
      try {
        String p = x.optString("path");
        JSONObject o = new JSONObject();
        o.put("path", p);
        o.put("name", x.optString("name", "project.mobin"));
        o.put("dir", dirOf(Uri.parse(p)));
        o.put("ok", ok.contains(p));
        out.put(o);
      } catch (Exception e) { }
    }
    return out.toString();
  }

  /* a short "where is it" for the recent list */
  String dirOf(Uri u) {
    try {
      String auth = u.getAuthority() == null ? "" : u.getAuthority();
      if ("file".equals(u.getScheme())) return shortPath(new File(u.getPath()).getParent());
      if (DocumentsContract.isDocumentUri(this, u)) {
        String id = DocumentsContract.getDocumentId(u);
        if (auth.equals("com.android.externalstorage.documents")) {
          int c = id.indexOf(':');
          String vol = c > 0 ? id.substring(0, c) : "", p = c >= 0 ? id.substring(c + 1) : id;
          int s = p.lastIndexOf('/');
          String d = s > 0 ? p.substring(0, s) : "";
          if (vol.equalsIgnoreCase("primary")) return d.isEmpty() ? "حافظهٔ گوشی" : d;
          return "کارت حافظه" + (d.isEmpty() ? "" : " / " + d);
        }
        if (auth.startsWith("com.android.providers.downloads")) {
          if (id.startsWith("raw:")) return shortPath(new File(id.substring(4)).getParent());
          return "Download";
        }
        if (auth.startsWith("com.android.providers.media")) return "Media";
      }
      if (auth.contains("google.android.apps.docs")) return "Google Drive";
      if (auth.contains("telegram")) return "Telegram";
      return auth;
    } catch (Exception e) { return ""; }
  }

  static String shortPath(String p) {
    if (p == null) return "";
    for (String root : new String[]{"/storage/emulated/0/", "/sdcard/"})
      if (p.startsWith(root)) return p.substring(root.length());
    return p;
  }

  // ------------------------------------------------------------------ exports

  boolean needStorage() {
    return Build.VERSION.SDK_INT < 29 && checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED;
  }

  void askStorage(final Runnable yes, final Runnable no) {
    ui.post(new Runnable() { public void run() {
      permWait.add(new Runnable[]{yes, no});
      if (permWait.size() == 1) requestPermissions(new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, REQ_PERM);
    } });
  }

  @Override public void onRequestPermissionsResult(int req, String[] perms, int[] res) {
    if (req != REQ_PERM) { super.onRequestPermissionsResult(req, perms, res); return; }
    boolean ok = res.length > 0 && res[0] == PackageManager.PERMISSION_GRANTED;
    ArrayList<Runnable[]> w = new ArrayList<>(permWait);
    permWait.clear();
    for (Runnable[] x : w) x[ok ? 0 : 1].run();
  }

  String publish(File src, String name) throws Exception {
    String[] parts = name.replace('\\', '/').split("/");
    StringBuilder sub = new StringBuilder();
    for (int k = 0; k < parts.length - 1; k++) {
      String p = clean(parts[k], "");
      if (!p.isEmpty()) sub.append('/').append(p);
    }
    String file = clean(parts[parts.length - 1], "file");
    String mime = mimeOf(file);
    boolean img = mime.startsWith("image/");
    String top = img ? Environment.DIRECTORY_PICTURES : Environment.DIRECTORY_DOWNLOADS;
    String rel = top + "/" + FOLDER + sub;

    if (Build.VERSION.SDK_INT >= 29) {
      ContentResolver cr = getContentResolver();
      Uri coll = img ? MediaStore.Images.Media.getContentUri(MediaStore.VOLUME_EXTERNAL_PRIMARY)
                     : MediaStore.Downloads.getContentUri(MediaStore.VOLUME_EXTERNAL_PRIMARY);
      /* saved before by this app: write over it instead of making "name (1).png" */
      Uri old = null;
      Cursor c = null;
      try {
        c = cr.query(coll, new String[]{MediaStore.MediaColumns._ID},
          MediaStore.MediaColumns.RELATIVE_PATH + "=? AND " + MediaStore.MediaColumns.DISPLAY_NAME + "=?",
          new String[]{rel + "/", file}, null);
        if (c != null && c.moveToFirst()) old = ContentUris.withAppendedId(coll, c.getLong(0));
      } catch (Exception e) {
      } finally { if (c != null) c.close(); }
      if (old != null) {
        OutputStream o = null;
        try {
          o = cr.openOutputStream(old, "wt");
          if (o != null) {
            FileInputStream in = new FileInputStream(src);
            try { copy(in, o); } finally { in.close(); }
            o.close();
            o = null;
            return okSaved(rel, file);
          }
        } catch (Exception e) {
          /* not ours any more (the app was reinstalled): make a new file */
        } finally { if (o != null) try { o.close(); } catch (IOException e) { } }
      }
      ContentValues cv = new ContentValues();
      cv.put(MediaStore.MediaColumns.DISPLAY_NAME, file);
      cv.put(MediaStore.MediaColumns.MIME_TYPE, mime);
      cv.put(MediaStore.MediaColumns.RELATIVE_PATH, rel);
      cv.put(MediaStore.MediaColumns.IS_PENDING, 1);
      Uri u = cr.insert(coll, cv);
      if (u == null) throw new IOException("ساخت فایل در " + rel + " نشد");
      try {
        OutputStream o = cr.openOutputStream(u);
        if (o == null) throw new IOException("no stream");
        FileInputStream in = new FileInputStream(src);
        try { copy(in, o); } finally { in.close(); o.close(); }
        cv.clear();
        cv.put(MediaStore.MediaColumns.IS_PENDING, 0);
        cr.update(u, cv, null, null);
      } catch (Exception e) {
        try { cr.delete(u, null, null); } catch (Exception e2) { }
        throw e;
      }
      String shown = file;
      c = null;
      try {
        c = cr.query(u, new String[]{MediaStore.MediaColumns.DISPLAY_NAME}, null, null, null);
        if (c != null && c.moveToFirst() && c.getString(0) != null) shown = c.getString(0);
      } catch (Exception e) {
      } finally { if (c != null) c.close(); }
      return okSaved(rel, shown);
    }

    /* Android 9 and older: straight into the public folder */
    File dir = new File(Environment.getExternalStoragePublicDirectory(top), FOLDER + sub);
    if (!dir.isDirectory() && !dir.mkdirs()) throw new IOException("پوشهٔ " + rel + " ساخته نشد");
    File out = new File(dir, file);
    FileInputStream in = new FileInputStream(src);
    FileOutputStream o = new FileOutputStream(out);
    try { copy(in, o); } finally { in.close(); o.close(); }
    MediaScannerConnection.scanFile(this, new String[]{out.getAbsolutePath()}, new String[]{mime}, null);
    return okSaved(rel, file);
  }

  // ------------------------------------------------------------------ window

  void applyBars() {
    Window w = getWindow();
    int bar = light ? 0xFFE9EBEF : 0xFF0D0F13;
    int nav = light ? (Build.VERSION.SDK_INT >= 26 ? 0xFFFFFFFF : 0xFF15181E) : 0xFF15181E;
    w.setStatusBarColor(bar);
    w.setNavigationBarColor(nav);
    w.setBackgroundDrawable(new ColorDrawable(bar));
    View d = w.getDecorView();
    int f = d.getSystemUiVisibility();
    f = light ? (f | View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR) : (f & ~View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
    if (Build.VERSION.SDK_INT >= 26)
      f = light ? (f | View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR) : (f & ~View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR);
    d.setSystemUiVisibility(f);
    if (web != null) web.setBackgroundColor(bar);
  }

  void setFullscreen(boolean on) {
    fullscreen = on;
    View d = getWindow().getDecorView();
    int fs = View.SYSTEM_UI_FLAG_FULLSCREEN | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;
    int f = d.getSystemUiVisibility();
    d.setSystemUiVisibility(on ? (f | fs) : (f & ~fs));
  }

  int dialogTheme() {
    return light ? android.R.style.Theme_DeviceDefault_Light_Dialog_Alert : android.R.style.Theme_DeviceDefault_Dialog_Alert;
  }

  void about() {
    String v = "";
    try { v = getPackageManager().getPackageInfo(getPackageName(), 0).versionName; } catch (Exception e) { }
    new AlertDialog.Builder(this, dialogTheme())
      .setTitle("Mobin Studio " + v)
      .setMessage("حروف‌چینی فارسی مانهوا و وبتون — کاملاً آفلاین\nنسخهٔ اندروید")
      .setPositiveButton("باشه", null)
      .show();
  }

  /* the page needs a fairly new WebView (Chrome 100+); say so once if it is older */
  void checkWebView() {
    if (Build.VERSION.SDK_INT < 26) return;
    try {
      PackageInfo p = WebView.getCurrentWebViewPackage();
      if (p == null || p.versionName == null) return;
      int major = Integer.parseInt(p.versionName.split("\\.")[0]);
      if (major >= 100 || prefs.getInt("oldWebView", 0) == major) return;
      prefs.edit().putInt("oldWebView", major).apply();
      new AlertDialog.Builder(this, dialogTheme())
        .setTitle("WebView گوشی قدیمی است")
        .setMessage("نسخهٔ «Android System WebView» این گوشی " + major + " است و ممکن است بعضی بخش‌های برنامه درست کار نکنند.\n"
          + "از گوگل‌پلی (یا مایکت / بازار) «Android System WebView» یا «Chrome» را به‌روز کنید.")
        .setPositiveButton("باشه", null)
        .show();
    } catch (Exception e) { }
  }

  void toast(final String m) {
    ui.post(new Runnable() { public void run() { Toast.makeText(MainActivity.this, m, Toast.LENGTH_LONG).show(); } });
  }

  // ------------------------------------------------------------------ helpers

  void cleanTemp() {
    File d = new File(getCacheDir(), "msa");
    File[] l = d.listFiles();
    if (l != null) for (File f : l) f.delete();
  }

  static void copy(InputStream in, OutputStream out) throws IOException {
    byte[] b = new byte[256 * 1024];
    int n;
    while ((n = in.read(b)) > 0) out.write(b, 0, n);
    out.flush();
  }

  /* a safe file / folder name, at most ~200 bytes (MediaStore allows 255) */
  static String clean(String n, String fb) {
    if (n == null) return fb;
    String s = n.replaceAll("[\\\\/:*?\"<>|\\x00-\\x1F\\x7F]", "_").trim();
    while (s.startsWith(".")) s = s.substring(1).trim();
    while (s.endsWith(".")) s = s.substring(0, s.length() - 1).trim();
    if (s.getBytes(StandardCharsets.UTF_8).length > 200) {
      int dot = s.lastIndexOf('.');
      String ext = dot > 0 && s.length() - dot <= 8 ? s.substring(dot) : "";
      String base = s.substring(0, s.length() - ext.length());
      while (base.length() > 1 && (base + ext).getBytes(StandardCharsets.UTF_8).length > 200) base = base.substring(0, base.length() - 1);
      s = base.trim() + ext;
    }
    return s.isEmpty() ? fb : s;
  }

  static String mimeOf(String n) {
    String l = n.toLowerCase(Locale.ROOT);
    if (l.endsWith(".png")) return "image/png";
    if (l.endsWith(".jpg") || l.endsWith(".jpeg")) return "image/jpeg";
    if (l.endsWith(".webp")) return "image/webp";
    if (l.endsWith(".zip")) return "application/zip";
    if (l.endsWith(".json")) return "application/json";
    if (l.endsWith(".txt")) return "text/plain";
    if (l.endsWith(".html") || l.endsWith(".htm")) return "text/html";
    if (l.endsWith(".js")) return "application/javascript";
    if (l.endsWith(".css")) return "text/css";
    if (l.endsWith(".svg")) return "image/svg+xml";
    if (l.endsWith(".woff2")) return "font/woff2";
    if (l.endsWith(".woff")) return "font/woff";
    if (l.endsWith(".ttf")) return "font/ttf";
    return "application/octet-stream";
  }

  static String okSaved(String rel, String file) {
    try {
      JSONObject o = new JSONObject();
      o.put("ok", true);
      o.put("name", rel + "/" + file);
      o.put("path", "");
      return o.toString();
    } catch (Exception e) { return "{\"ok\":true}"; }
  }

  static String okFile(Uri u, String name) {
    try {
      JSONObject o = new JSONObject();
      o.put("ok", true);
      o.put("path", u.toString());
      o.put("name", name);
      return o.toString();
    } catch (Exception e) { return "{\"ok\":true}"; }
  }

  static String err(String m) {
    try {
      JSONObject o = new JSONObject();
      o.put("ok", false);
      o.put("error", m);
      return o.toString();
    } catch (Exception e) { return "{\"ok\":false}"; }
  }

  static String msg(Throwable e) {
    if (e instanceof OutOfMemoryError) return "حافظهٔ برنامه کم آمد";
    if (e instanceof SecurityException) return "اجازهٔ نوشتن در آن‌جا نیست";
    String m = e.getMessage();
    if (m != null && m.contains("ENOSPC")) return "حافظهٔ گوشی پر است";
    return m == null || m.isEmpty() ? e.getClass().getSimpleName() : m;
  }

  /* download failures deserve a readable reason, not "UnknownHostException" */
  static String updateMsg(Throwable e) {
    if (e instanceof java.net.UnknownHostException || e instanceof java.net.ConnectException
        || e instanceof java.net.SocketTimeoutException || e instanceof java.net.SocketException)
      return "اتصال به اینترنت برقرار نشد";
    if (e instanceof OutOfMemoryError) return "حافظهٔ برنامه کم آمد";
    String m = e.getMessage();
    if (m != null && m.contains("ENOSPC")) return "حافظهٔ گوشی پر است";
    return msg(e);
  }
}
