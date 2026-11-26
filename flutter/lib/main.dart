// Mobin Studio — Flutter shell entry point.
// Native (non-WebView) start screen: recent projects, New, Open.
// The heavy editing canvas lives in EditorScreen (WebView + Dart<->JS bridge).
import 'dart:convert';
import 'dart:io';

import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'editor_screen.dart';
import 'updater.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const MobinApp());
}

class MobinApp extends StatelessWidget {
  const MobinApp({super.key});

  ThemeData _theme(Brightness b) => ThemeData(
        useMaterial3: true,
        brightness: b,
        fontFamily: 'Vazirmatn',
        colorSchemeSeed: const Color(0xFF7C4DFF),
      );

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'مبین استودیو',
      debugShowCheckedModeBanner: false,
      locale: const Locale('fa'),
      supportedLocales: const [Locale('fa'), Locale('en')],
      localizationsDelegates: const [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      theme: _theme(Brightness.light),
      darkTheme: _theme(Brightness.dark),
      themeMode: ThemeMode.system,
      builder: (context, child) =>
          Directionality(textDirection: TextDirection.rtl, child: child!),
      home: const HomeScreen(),
    );
  }
}

/// One entry in the recent-projects list.
class RecentProject {
  final String path;
  final String name;
  final int openedAt; // ms since epoch

  const RecentProject(this.path, this.name, this.openedAt);

  Map<String, dynamic> toJson() => {'p': path, 'n': name, 't': openedAt};

  static RecentProject? fromJson(Object? j) {
    if (j is! Map) return null;
    final p = j['p'], n = j['n'], t = j['t'];
    if (p is! String || n is! String || t is! int) return null;
    return RecentProject(p, n, t);
  }
}

/// Recent projects, kept in shared_preferences (paths only, never content).
class RecentStore {
  static const _key = 'recent_projects_v1';
  static const _max = 20;

  static Future<List<RecentProject>> load() async {
    final prefs = await SharedPreferences.getInstance();
    final raw = prefs.getString(_key);
    if (raw == null) return [];
    try {
      final list = jsonDecode(raw);
      if (list is! List) return [];
      return list.map(RecentProject.fromJson).whereType<RecentProject>().toList();
    } catch (_) {
      return [];
    }
  }

  static Future<void> _save(List<RecentProject> items) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(
        _key, jsonEncode(items.take(_max).map((e) => e.toJson()).toList()));
  }

  /// Called by the editor after a successful open or save.
  static Future<void> add(String path) async {
    final items = await load();
    items.removeWhere((e) => e.path == path);
    final name = path.split(RegExp(r'[\\/]')).last;
    items.insert(
        0, RecentProject(path, name, DateTime.now().millisecondsSinceEpoch));
    await _save(items);
  }

  static Future<void> remove(String path) async {
    final items = await load();
    items.removeWhere((e) => e.path == path);
    await _save(items);
  }
}

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<RecentProject> _recent = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _reload();
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (mounted) checkForUpdate(context);
    });
  }

  Future<void> _reload() async {
    final items = await RecentStore.load();
    if (!mounted) return;
    setState(() {
      _recent = items;
      _loading = false;
    });
  }

  Future<void> _openEditor({String? path}) async {
    await Navigator.of(context).push(
      MaterialPageRoute(builder: (_) => EditorScreen(filePath: path)),
    );
    _reload();
  }

  Future<void> _pickAndOpen() async {
    final res = await FilePicker.platform.pickFiles(
      type: FileType.custom,
      allowedExtensions: const ['mobin'],
      dialogTitle: 'باز کردن پروژه',
    );
    final path = res?.files.single.path;
    if (path == null) return;
    await RecentStore.add(path);
    await _openEditor(path: path);
  }

  Future<void> _openRecent(RecentProject p) async {
    if (!await File(p.path).exists()) {
      if (!mounted) return;
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('فایل «${p.name}» پیدا نشد و از فهرست حذف شد.')),
      );
      await RecentStore.remove(p.path);
      _reload();
      return;
    }
    await RecentStore.add(p.path);
    await _openEditor(path: p.path);
  }

  String _ago(int ms) {
    final d = DateTime.now()
        .difference(DateTime.fromMillisecondsSinceEpoch(ms));
    if (d.inMinutes < 1) return 'همین الان';
    if (d.inHours < 1) return '${d.inMinutes} دقیقه پیش';
    if (d.inDays < 1) return '${d.inHours} ساعت پیش';
    return '${d.inDays} روز پیش';
  }

  @override
  Widget build(BuildContext context) {
    final cs = Theme.of(context).colorScheme;
    return Scaffold(
      appBar: AppBar(title: const Text('مبین استودیو')),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Row(children: [
                Expanded(
                  child: FilledButton.icon(
                    onPressed: () => _openEditor(),
                    icon: const Icon(Icons.add),
                    label: const Text('پروژه جدید'),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: _pickAndOpen,
                    icon: const Icon(Icons.folder_open),
                    label: const Text('باز کردن…'),
                  ),
                ),
              ]),
              const SizedBox(height: 24),
              Text('پروژه‌های اخیر',
                  style: Theme.of(context).textTheme.titleMedium),
              const SizedBox(height: 8),
              Expanded(
                child: _loading
                    ? const Center(child: CircularProgressIndicator())
                    : _recent.isEmpty
                        ? Center(
                            child: Text('هنوز پروژه‌ای باز نکرده‌اید.',
                                style: TextStyle(color: cs.outline)))
                        : ListView.separated(
                            itemCount: _recent.length,
                            separatorBuilder: (_, __) =>
                                const Divider(height: 1),
                            itemBuilder: (_, i) {
                              final p = _recent[i];
                              return ListTile(
                                leading: const Icon(Icons.description_outlined),
                                title: Text(p.name),
                                subtitle: Text(_ago(p.openedAt)),
                                onTap: () => _openRecent(p),
                                trailing: IconButton(
                                  tooltip: 'حذف از فهرست',
                                  icon: const Icon(Icons.close),
                                  onPressed: () async {
                                    await RecentStore.remove(p.path);
                                    _reload();
                                  },
                                ),
                              );
                            },
                          ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
