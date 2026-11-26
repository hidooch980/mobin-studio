// Prepares the Flutter shell before a build. Run from flutter/:
//   dart run tool/sync_version.dart
//
// 1. Copies the version from ../app/package.json into pubspec.yaml
//    (build number = major*10000 + minor*100 + patch, same as the old APK).
// 2. Copies ../app/build/index.html into assets/web/ (run ../app/build.sh
//    first, or use tool/sync_web.sh which does both build and copy).
// 3. Downloads the Vazirmatn TTF files (OFL) into assets/fonts/ if missing;
//    Flutter cannot load the .woff2 files the web editor uses.
//
// Never touches android/signing/ or any key material.
import 'dart:convert';
import 'dart:io';

const _weights = ['Regular', 'Medium', 'SemiBold', 'Bold'];
const _fontBase =
    'https://raw.githubusercontent.com/rastikerdar/vazirmatn/master/fonts/ttf';

Future<void> main() async {
  final root = Directory.current;
  if (!File('${root.path}/pubspec.yaml').existsSync()) {
    stderr.writeln('run this from the flutter/ folder');
    exit(2);
  }
  _syncVersion();
  _copyIndex();
  await _fetchFonts();
}

void _syncVersion() {
  final pkg = File('../app/package.json');
  if (!pkg.existsSync()) {
    stderr.writeln('missing ../app/package.json');
    exit(1);
  }
  final version = (jsonDecode(pkg.readAsStringSync()) as Map)['version'] as String;
  final m = RegExp(r'^(\d+)\.(\d+)\.(\d+)$').firstMatch(version);
  if (m == null) {
    stderr.writeln('unexpected version "$version" (want x.y.z)');
    exit(1);
  }
  final code = int.parse(m[1]!) * 10000 + int.parse(m[2]!) * 100 + int.parse(m[3]!);
  final pubspec = File('pubspec.yaml');
  final text = pubspec.readAsStringSync();
  final line = RegExp(r'^version:.*$', multiLine: true);
  if (!line.hasMatch(text)) {
    stderr.writeln('pubspec.yaml has no version: line');
    exit(1);
  }
  final updated = text.replaceFirst(line, 'version: $version+$code');
  if (updated != text) pubspec.writeAsStringSync(updated);
  stdout.writeln('version: $version+$code');
}

void _copyIndex() {
  final src = File('../app/build/index.html');
  if (!src.existsSync()) {
    stderr.writeln('missing ../app/build/index.html: run ../app/build.sh first');
    exit(1);
  }
  Directory('assets/web').createSync(recursive: true);
  src.copySync('assets/web/index.html');
  final kb = (src.lengthSync() / 1024).round();
  stdout.writeln('assets/web/index.html ($kb KB)');
}

Future<void> _fetchFonts() async {
  final dir = Directory('assets/fonts')..createSync(recursive: true);
  final client = HttpClient()..userAgent = 'mobin-studio-build';
  try {
    for (final w in _weights) {
      final out = File('${dir.path}/Vazirmatn-$w.ttf');
      if (out.existsSync() && out.lengthSync() > 0) continue;
      final req = await client.getUrl(Uri.parse('$_fontBase/Vazirmatn-$w.ttf'));
      final res = await req.close();
      if (res.statusCode != 200) {
        stderr.writeln('font $w: HTTP ${res.statusCode}; add it to assets/fonts/ by hand');
        exit(1);
      }
      final tmp = File('${out.path}.part');
      await res.pipe(tmp.openWrite());
      tmp.renameSync(out.path);
      stdout.writeln('font: ${out.path}');
    }
  } finally {
    client.close();
  }
}
