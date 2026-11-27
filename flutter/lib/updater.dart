// In-app updater backed by GitHub releases (api.github.com only).
//
// Repo defaults to kGithubRepo (the project origin remote). Override per build:
//   flutter build apk --release --dart-define=MOBIN_REPO=owner/name
// Pass --dart-define=MOBIN_REPO= (empty) to disable the updater.
//
// Release layout expected: tag "vX.Y.Z" (or "X.Y.Z"), one *.apk asset and,
// optionally, "<same>.apk.sha256" holding the hex digest. The APK must be
// signed with the same local key (android/signing/), or Android refuses it.
//
// Native side (MainActivity, channel "mobin/app"):
//   version()            -> String versionName
//   installApk({path})   -> opens the system installer via FileProvider
import 'dart:convert';
import 'dart:io';

import 'package:crypto/crypto.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:http/http.dart' as http;
import 'package:path_provider/path_provider.dart';

const kGithubRepo = 'hidooch980/mobin-studio';
const _repo = String.fromEnvironment('MOBIN_REPO', defaultValue: kGithubRepo);
const _channel = MethodChannel('mobin/app');
const _headers = {
  'Accept': 'application/vnd.github+json',
  'User-Agent': 'mobin-studio-updater',
};

class Release {
  Release(this.version, this.notes, this.apkUrl, this.size, this.shaUrl);
  final String version;
  final String notes;
  final Uri apkUrl;
  final int size;
  final Uri? shaUrl;
}

class Updater {
  static bool get enabled =>
      Platform.isAndroid && RegExp(r'^[\w.-]+/[\w.-]+$').hasMatch(_repo);

  static Future<String> currentVersion() async =>
      (await _channel.invokeMethod<String>('version')) ?? '0.0.0';

  /// Returns a newer release, or null if up to date / disabled / offline.
  static Future<Release?> check() async {
    if (!enabled) return null;
    final res = await http
        .get(Uri.https('api.github.com', '/repos/$_repo/releases/latest'),
            headers: _headers)
        .timeout(const Duration(seconds: 15));
    if (res.statusCode != 200) return null;
    final j = jsonDecode(res.body) as Map<String, dynamic>;
    if (j['draft'] == true || j['prerelease'] == true) return null;
    final tag = (j['tag_name'] as String? ?? '').replaceFirst(RegExp('^v'), '');
    if (_cmp(tag, await currentVersion()) <= 0) return null;

    Map<String, dynamic>? apk;
    Uri? sha;
    for (final a in (j['assets'] as List? ?? []).cast<Map<String, dynamic>>()) {
      final name = a['name'] as String? ?? '';
      final url = Uri.tryParse(a['browser_download_url'] as String? ?? '');
      if (url == null || !_trusted(url)) continue;
      if (name.endsWith('.apk')) apk ??= a;
      if (name.endsWith('.apk.sha256')) sha = url;
    }
    if (apk == null) return null;
    return Release(tag, j['body'] as String? ?? '',
        Uri.parse(apk['browser_download_url'] as String),
        apk['size'] as int? ?? 0, sha);
  }

  /// Downloads, verifies size and sha256 (when published), then installs.
  static Future<void> install(Release r, void Function(double) onProgress) async {
    final client = http.Client();
    try {
      String? want;
      if (r.shaUrl != null) {
        final s = await client.get(r.shaUrl!, headers: _headers);
        if (s.statusCode == 200) {
          want = s.body.trim().split(RegExp(r'\s+')).first.toLowerCase();
        }
        if (want == null || !RegExp(r'^[0-9a-f]{64}$').hasMatch(want)) {
          throw 'فایل sha256 نامعتبر است';
        }
      }
      final res = await client.send(http.Request('GET', r.apkUrl)..headers.addAll(_headers));
      if (res.statusCode != 200) throw 'دانلود ناموفق (HTTP ${res.statusCode})';
      final dir = Directory('${(await getTemporaryDirectory()).path}/updates')
        ..createSync(recursive: true);
      final out = File('${dir.path}/mobin-studio-${r.version}.apk');
      final sink = out.openWrite();
      // Hash while streaming; never hold the whole APK in memory.
      final digest = _DigestSink();
      final hasher = want != null ? sha256.startChunkedConversion(digest) : null;
      var got = 0;
      final total = res.contentLength ?? r.size;
      await for (final chunk in res.stream) {
        sink.add(chunk);
        hasher?.add(chunk);
        got += chunk.length;
        if (total > 0) onProgress(got / total);
      }
      await sink.close();
      hasher?.close();
      if (r.size > 0 && got != r.size) {
        out.deleteSync();
        throw 'حجم فایل دانلودشده درست نیست';
      }
      if (want != null && digest.value.toString() != want) {
        out.deleteSync();
        throw 'امضای فایل (sha256) مطابقت ندارد';
      }
      await _channel.invokeMethod('installApk', {'path': out.path});
    } finally {
      client.close();
    }
  }

  static bool _trusted(Uri u) =>
      u.scheme == 'https' &&
      u.host == 'github.com' &&
      u.path.startsWith('/$_repo/releases/download/');

  static int _cmp(String a, String b) {
    List<int> p(String s) =>
        s.split('.').map((e) => int.tryParse(e) ?? 0).toList()..addAll([0, 0, 0]);
    final x = p(a), y = p(b);
    for (var i = 0; i < 3; i++) {
      if (x[i] != y[i]) return x[i].compareTo(y[i]);
    }
    return 0;
  }
}

/// Checks quietly; shows a Persian dialog only when an update exists
/// (or, with [silent] false, also reports "up to date" and errors).
Future<void> checkForUpdate(BuildContext context, {bool silent = true}) async {
  final messenger = ScaffoldMessenger.maybeOf(context);
  Release? r;
  try {
    r = await Updater.check();
  } catch (_) {
    if (!silent) messenger?.showSnackBar(const SnackBar(content: Text('بررسی به‌روزرسانی ناموفق بود')));
    return;
  }
  if (r == null) {
    if (!silent) messenger?.showSnackBar(const SnackBar(content: Text('نسخهٔ شما به‌روز است')));
    return;
  }
  if (!context.mounted) return;
  final release = r;
  final progress = ValueNotifier<double?>(null);
  await showDialog<void>(
    context: context,
    barrierDismissible: false,
    builder: (ctx) => ValueListenableBuilder<double?>(
      valueListenable: progress,
      builder: (ctx, p, _) => AlertDialog(
        title: Text('نسخهٔ ${release.version} آماده است'),
        content: p == null
            ? SingleChildScrollView(child: Text(release.notes.isEmpty ? 'بدون توضیحات' : release.notes))
            : LinearProgressIndicator(value: p),
        actions: p != null
            ? const []
            : [
                TextButton(onPressed: () => Navigator.pop(ctx), child: const Text('بعداً')),
                FilledButton(
                  onPressed: () async {
                    progress.value = 0;
                    try {
                      await Updater.install(release, (v) => progress.value = v);
                    } on PlatformException catch (e) {
                      messenger?.showSnackBar(SnackBar(
                          duration: const Duration(seconds: 6),
                          content: Text(e.message ?? 'نصب ناموفق بود')));
                    } catch (e) {
                      messenger?.showSnackBar(SnackBar(content: Text('خطا: $e')));
                    }
                    if (ctx.mounted) Navigator.pop(ctx);
                  },
                  child: const Text('به‌روزرسانی'),
                ),
              ],
      ),
    ),
  );
  progress.dispose();
}

class _DigestSink implements Sink<Digest> {
  Digest? value;
  @override
  void add(Digest data) => value = data;
  @override
  void close() {}
}
