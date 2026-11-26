// Mobin Studio — editing canvas: the built web app inside an InAppWebView.
// The page still expects the old bridges (Electron `msDesktop`, Android `MSA`).
// A generic shim forwards every call on either object to Dart, so the page keeps
// working unchanged. Names Dart does not know yet are logged (see [unknownCalls]).
//
// The page never gets free run of the disk: it may only read the projects and
// folders the user picked here (see [_trusted] and [_mayRead]).
import 'dart:collection';
import 'dart:convert';
import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_inappwebview/flutter_inappwebview.dart';
import 'package:path_provider/path_provider.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'main.dart' show RecentStore;

/// Bridge names the page called that Dart has no handler for (debug aid).
final Set<String> unknownCalls = <String>{};

const _shim = r'''
(function(){
  if (window.__msShim) return; window.__msShim = true;
  window.MOBIN_FLUTTER = true;
  var ready = false, q = [];
  /* TypedArrays do not survive the JS->Dart bridge intact, so files go as base64 */
  function b64(u8){
    var s = '', CH = 0x8000;
    for (var i = 0; i < u8.length; i += CH)
      s += String.fromCharCode.apply(null, u8.subarray(i, i + CH));
    return btoa(s);
  }
  function enc(v){
    if (v instanceof Uint8Array || v instanceof ArrayBuffer)
      return b64(v instanceof ArrayBuffer ? new Uint8Array(v) : v);
    if (Array.isArray(v)) return v.map(enc);
    return v;
  }
  function call(name, args){
    return new Promise(function(res, rej){
      var go = function(){
        window.flutter_inappwebview.callHandler('ms', name, enc(args)).then(res, rej);
      };
      ready ? go() : q.push(go);
    });
  }
  window.addEventListener('flutterInAppWebViewPlatformReady', function(){
    ready = true; q.splice(0).forEach(function(f){ f(); });
  });
  function proxy(){
    return new Proxy({}, { get: function(_, k){
      if (typeof k !== 'string' || k === 'then') return undefined;
      /* the page calls pathOf() synchronously and compares the result to a stored
         path, so it must answer a string now — never a Promise */
      if (k === 'pathOf') return function(){ return ''; };
      return function(){ return call(k, Array.prototype.slice.call(arguments)); };
    }});
  }
  window.msDesktop = proxy();
  window.MSA = proxy();
})();
''';

class EditorScreen extends StatefulWidget {
  final String? filePath;
  const EditorScreen({super.key, this.filePath});

  @override
  State<EditorScreen> createState() => _EditorScreenState();
}

class _EditorScreenState extends State<EditorScreen> {
  InAppWebViewController? _web;
  String? _path; // current project file on disk
  bool _dirty = false;

  /// Default folder (app documents) and the user's chosen save folder.
  String _defaultDir = '';
  String? _saveDir;

  /// Absolute paths the user actually chose (opened, saved or exported here).
  /// Everything else is refused by `readFile`.
  final Set<String> _trusted = <String>{};

  static const _prefSaveDir = 'save_dir';

  bool get _mobile => Platform.isAndroid || Platform.isIOS;

  @override
  void initState() {
    super.initState();
    _path = widget.filePath;
    if (_path != null) _trust(_path!);
    _loadPrefs();
  }

  Future<void> _loadPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    final saved = prefs.getString(_prefSaveDir) ?? '';
    String? base;
    try {
      base = (await getApplicationDocumentsDirectory()).path;
    } catch (e) {
      debugPrint('[shell] no documents dir: $e');
    }
    final fallback = saved.isNotEmpty && Directory(saved).existsSync() ? saved : base;
    if (!mounted) {
      _defaultDir = base ?? '';
      _saveDir = fallback;
      return;
    }
    setState(() {
      _defaultDir = base ?? '';
      _saveDir = fallback;
    });
  }

  Future<void> _setPref(String key, String value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(key, value);
  }

  // ---- path safety ----------------------------------------------------------
  String _abs(String p) => File(p).absolute.path;

  static bool _isAbsolute(String p) => Platform.isWindows
      ? RegExp(r'^(?:[A-Za-z]:[\\/]|\\\\)').hasMatch(p)
      : p.startsWith('/');

  /// Remember a path the user chose through a dialog.
  void _trust(String path) {
    if (path.isEmpty) return;
    if (_trusted.length > 200) _trusted.clear();
    _trusted.add(_abs(path));
  }

  /// A path is readable when the user picked it or it lives in the save folder.
  bool _mayRead(String path) {
    if (path.isEmpty) return false;
    final ap = _abs(path);
    if (_trusted.contains(ap)) return true;
    final dir = _saveDir;
    if (dir != null && dir.isNotEmpty) {
      final base = _abs(dir);
      if (ap != base && ap.startsWith(base + Platform.pathSeparator)) return true;
    }
    return false;
  }

  String _safeName(String name) {
    var s = name.trim().replaceAll(RegExp(r'[\\/:*?"<>|]'), '_');
    if (s.isEmpty || s == '.' || s == '..') s = 'file';
    return s;
  }

  String _join(String dir, String name) =>
      dir.endsWith('/') || dir.endsWith('\\') ? '$dir$name' : '$dir${Platform.pathSeparator}$name';

  Uint8List? _decode(dynamic v) {
    try {
      if (v is String) return base64Decode(v);
      if (v is Map && v['b64'] is String) return base64Decode('${v['b64']}');
      if (v is List) return Uint8List.fromList([for (final e in v) if (e is int) e]);
    } catch (e) {
      debugPrint('[bridge] bad file bytes: $e');
    }
    return null;
  }

  // ---- Dart -> JS -----------------------------------------------------------
  Future<dynamic> _js(String code) async =>
      _web?.evaluateJavascript(source: code);

  Future<void> _sendOpen(String path) async {
    final bytes = await File(path).readAsBytes();
    _trust(path);
    final payload = jsonEncode({
      'path': path,
      'name': path.split(RegExp(r'[\\/]')).last,
      'data': base64Encode(bytes),
    });
    await _js('''(function(p){
      if (typeof window.__msOpenPath === 'function') window.__msOpenPath(p.path, p.data, p.name);
      window.dispatchEvent(new CustomEvent('mobin-open', {detail: p}));
    })($payload);''');
  }

  // ---- JS -> Dart registry --------------------------------------------------
  late final Map<String, Future<dynamic> Function(List<dynamic>)> _handlers = {
    'isFlutter': (_) async => true,
    'platform': (_) async => Platform.operatingSystem,
    'setDirty': (a) async {
      _dirty = a.isNotEmpty && a.first == true;
      return null;
    },
    'currentPath': (_) async => _path,
    // the shim answers this synchronously; kept for completeness
    'pathOf': (_) async => '',
    'readFile': (a) async {
      if (a.isEmpty) return null;
      final p = '${a.first}';
      if (!_mayRead(p)) {
        debugPrint('[bridge] readFile refused: $p');
        return null;
      }
      return base64Encode(await File(p).readAsBytes());
    },
    // args: [name, base64Data, direct] -> {ok, name, path} | {canceled} | {error}
    'save': (a) => _saveFile(a),
    // args: [command, argument]
    'cmd': (a) async => _cmd(a),
    'saveProject': (a) => _save(a, askPath: false),
    'saveProjectAs': (a) => _save(a, askPath: true),
    'exportFile': _export,
    'openProject': (_) async {
      final r = await FilePicker.platform.pickFiles(
          type: FileType.custom, allowedExtensions: const ['mobin']);
      final p = r?.files.single.path;
      if (p == null) return null;
      _trust(p);
      _path = p;
      await RecentStore.add(p);
      await _sendOpen(p);
      return p;
    },
    'pickImages': (_) async {
      final r = await FilePicker.platform
          .pickFiles(type: FileType.image, allowMultiple: true, withData: true);
      if (r == null) return null;
      return [
        for (final f in r.files)
          if (f.bytes != null) {'name': f.name, 'data': base64Encode(f.bytes!)}
      ];
    },
    'copyText': (a) async {
      await Clipboard.setData(ClipboardData(text: '${a.first}'));
      return true;
    },
    'log': (a) async {
      debugPrint('[page] ${a.join(' ')}');
      return null;
    },
  };

  /// `msDesktop.cmd`: save-folder handling and the recent list; everything else
  /// (window chrome, updater, …) has no meaning in the Flutter shell and is
  /// answered with null, which the page treats as "not available".
  Future<dynamic> _cmd(List<dynamic> a) async {
    final name = a.isNotEmpty ? '${a.first}' : '';
    final arg = a.length > 1 ? a[1] : null;
    switch (name) {
      case 'getSaveDir':
        final dir = _saveDir ?? _defaultDir;
        final custom = dir.isNotEmpty && dir != _defaultDir ? dir : '';
        return {'dir': dir, 'custom': custom};

      case 'setSaveDir':
        final raw = '${arg ?? ''}'.trim();
        if (raw.isEmpty) {
          await _setPref(_prefSaveDir, '');
          if (mounted) setState(() => _saveDir = _defaultDir.isEmpty ? null : _defaultDir);
          return {'ok': true, 'dir': _defaultDir, 'custom': ''};
        }
        if (raw.contains('\u0000') || !_isAbsolute(raw)) {
          return {'ok': false, 'error': 'مسیر پوشه معتبر نیست'};
        }
        try {
          final d = Directory(raw);
          if (!d.existsSync()) await d.create(recursive: true);
          final p = d.absolute.path;
          await _setPref(_prefSaveDir, p);
          if (mounted) setState(() => _saveDir = p);
          return {'ok': true, 'dir': p, 'custom': p};
        } catch (e) {
          return {'ok': false, 'error': '$e'};
        }

      case 'pickDir':
        final picked =
            await FilePicker.platform.getDirectoryPath(dialogTitle: 'پوشهٔ ذخیره');
        if (picked == null) return {'ok': false, 'canceled': true};
        await _setPref(_prefSaveDir, picked);
        if (mounted) setState(() => _saveDir = picked);
        return {'ok': true, 'dir': picked, 'custom': picked};

      case 'openSaveDir':
        final dir = _saveDir ?? _defaultDir;
        if (dir.isEmpty || _mobile) return false;
        try {
          if (Platform.isWindows) {
            await Process.run('explorer', [dir]);
          } else if (Platform.isMacOS) {
            await Process.run('open', [dir]);
          } else {
            await Process.run('xdg-open', [dir]);
          }
          return true;
        } catch (e) {
          debugPrint('[shell] openSaveDir failed: $e');
          return false;
        }

      case 'recent':
        final items = await RecentStore.load();
        return [
          for (final r in items)
            {
              'path': r.path,
              'name': r.name,
              'dir': File(r.path).parent.path,
              'ok': File(r.path).existsSync(),
            }
        ];

      default:
        return null;
    }
  }

  /// `msDesktop.save(name, bytes, direct)` — exports (PNG/JPG/TXT) and the
  /// fallback save path. Returns the same shape the page expects from Electron.
  Future<Map<String, dynamic>> _saveFile(List<dynamic> a) async {
    if (a.length < 2) return {'ok': false, 'error': 'دادهٔ فایل نامعتبر است'};
    final name = _safeName('${a[0]}');
    final bytes = _decode(a[1]);
    if (bytes == null) return {'ok': false, 'error': 'دادهٔ فایل نامعتبر است'};
    final direct = a.length > 2 && a[2] == true;
    final dir = _saveDir;

    if (direct && dir != null && dir.isNotEmpty) {
      try {
        final p = _join(dir, name);
        await File(p).writeAsBytes(bytes, flush: true);
        _trust(p);
        return {'ok': true, 'name': name, 'path': p};
      } catch (e) {
        return {'ok': false, 'error': '$e'};
      }
    }

    final picked = await FilePicker.platform.saveFile(
      dialogTitle: 'ذخیره',
      fileName: name,
      bytes: _mobile ? bytes : null,
    );
    if (picked == null) return {'ok': false, 'canceled': true};
    if (!_mobile) {
      try {
        await File(picked).writeAsBytes(bytes, flush: true);
      } catch (e) {
        return {'ok': false, 'error': '$e'};
      }
    }
    _trust(picked);
    return {
      'ok': true,
      'name': picked.split(RegExp(r'[\\/]')).last,
      'path': picked,
    };
  }

  /// args: [base64Data, suggestedName?]
  Future<dynamic> _save(List<dynamic> a, {required bool askPath}) async {
    if (a.isEmpty) return null;
    final bytes = _decode(a.first);
    if (bytes == null) return {'ok': false, 'error': 'دادهٔ پروژه نامعتبر است'};
    var path = _path;
    if (askPath || path == null) {
      path = await FilePicker.platform.saveFile(
        dialogTitle: 'ذخیره پروژه',
        fileName: a.length > 1 ? _safeName('${a[1]}') : 'project.mobin',
        type: FileType.custom,
        allowedExtensions: const ['mobin'],
        bytes: bytes, // Android/iOS write it themselves
      );
      if (path == null) return {'ok': false, 'canceled': true};
    }
    final mobile = Platform.isAndroid || Platform.isIOS;
    // desktop: the picker only returns a path; mobile: it already wrote the bytes,
    // except for a plain save to an existing path, which we write ourselves.
    if (!mobile || (!askPath && _path != null)) {
      try {
        await File(path).writeAsBytes(bytes, flush: true);
      } catch (e) {
        return {'ok': false, 'error': '$e'};
      }
    }
    _path = path;
    _trust(path);
    _dirty = false;
    await RecentStore.add(path);
    return {
      'ok': true,
      'name': path.split(RegExp(r'[\\/]')).last,
      'path': path,
    };
  }

  /// args: [base64Data, fileName]
  Future<dynamic> _export(List<dynamic> a) async {
    if (a.length < 2) return null;
    final bytes = _decode(a[0]);
    if (bytes == null) return {'ok': false, 'error': 'دادهٔ فایل نامعتبر است'};
    final path = await FilePicker.platform.saveFile(
        dialogTitle: 'خروجی', fileName: _safeName('${a[1]}'), bytes: bytes);
    if (path == null) return {'ok': false, 'canceled': true};
    if (!Platform.isAndroid && !Platform.isIOS) {
      try {
        await File(path).writeAsBytes(bytes, flush: true);
      } catch (e) {
        return {'ok': false, 'error': '$e'};
      }
    }
    _trust(path);
    return path;
  }

  Future<dynamic> _dispatch(List<dynamic> args) async {
    final name = args.isNotEmpty ? '${args[0]}' : '';
    final rest = args.length > 1 && args[1] is List ? args[1] as List : const [];
    final h = _handlers[name];
    if (h == null) {
      if (unknownCalls.add(name)) debugPrint('[bridge] unknown call: $name');
      return null;
    }
    try {
      return await h(rest);
    } catch (e) {
      debugPrint('[bridge] $name failed: $e');
      return {'ok': false, 'error': '$e'};
    }
  }

  // ---- leaving the editor ---------------------------------------------------
  Future<bool> _confirmLeave() async {
    final pageDirty = await _js('!!window.__msDirty');
    if (!(_dirty || pageDirty == true)) return true;
    if (!mounted) return false;
    final choice = await showDialog<String>(
      context: context,
      builder: (c) => AlertDialog(
        title: const Text('تغییرات ذخیره نشده'),
        content: const Text('قبل از خروج ذخیره شود؟'),
        actions: [
          TextButton(onPressed: () => Navigator.pop(c), child: const Text('انصراف')),
          TextButton(
              onPressed: () => Navigator.pop(c, 'discard'),
              child: const Text('خروج بدون ذخیره')),
          FilledButton(
              onPressed: () => Navigator.pop(c, 'save'), child: const Text('ذخیره')),
        ],
      ),
    );
    if (choice == 'discard') return true;
    if (choice == 'save') {
      // the page serialises the project and calls saveProject back through the bridge
      await _js('typeof window.__msSave === "function" && window.__msSave()');
      // saveProject arrives asynchronously through the bridge; wait up to ~5 s.
      for (var i = 0; i < 50 && _dirty; i++) {
        await Future<void>.delayed(const Duration(milliseconds: 100));
      }
      return !_dirty;
    }
    return false;
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, _) async {
        if (didPop) return;
        if (await _confirmLeave() && context.mounted) Navigator.of(context).pop();
      },
      child: Scaffold(
        body: SafeArea(
          child: InAppWebView(
            initialFile: 'assets/web/index.html',
            initialSettings: InAppWebViewSettings(
              javaScriptEnabled: true,
              allowFileAccessFromFileURLs: true,
              allowUniversalAccessFromFileURLs: true,
              mediaPlaybackRequiresUserGesture: false,
              isInspectable: kDebugMode,
            ),
            initialUserScripts: UnmodifiableListView([
              UserScript(
                  source: _shim,
                  injectionTime: UserScriptInjectionTime.AT_DOCUMENT_START),
            ]),
            onWebViewCreated: (c) {
              _web = c;
              c.addJavaScriptHandler(handlerName: 'ms', callback: _dispatch);
            },
            onLoadStop: (_, __) async {
              final p = _path;
              if (p != null) await _sendOpen(p);
            },
            onConsoleMessage: (_, m) => debugPrint('[console] ${m.message}'),
          ),
        ),
      ),
    );
  }
}
