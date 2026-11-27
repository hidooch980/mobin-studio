package com.nerdcity.mobin_studio

import android.content.Intent
import android.net.Uri
import android.os.Build
import android.provider.Settings
import androidx.core.content.FileProvider
import io.flutter.embedding.android.FlutterActivity
import io.flutter.embedding.engine.FlutterEngine
import io.flutter.plugin.common.MethodChannel
import java.io.File

// Native half of lib/updater.dart (channel "mobin/app"):
//   version()          -> versionName of the installed app
//   installApk({path}) -> hands a downloaded APK (inside cacheDir/updates/)
//                         to the system installer through FileProvider.
class MainActivity : FlutterActivity() {
    override fun configureFlutterEngine(flutterEngine: FlutterEngine) {
        super.configureFlutterEngine(flutterEngine)
        MethodChannel(flutterEngine.dartExecutor.binaryMessenger, "mobin/app")
            .setMethodCallHandler { call, result ->
                when (call.method) {
                    "version" -> result.success(versionName())
                    "installApk" -> {
                        val path = call.argument<String>("path")
                        if (path == null) {
                            result.error("ARG", "مسیر فایل داده نشده", null)
                        } else {
                            installApk(path, result)
                        }
                    }
                    else -> result.notImplemented()
                }
            }
    }

    private fun versionName(): String = try {
        @Suppress("DEPRECATION")
        packageManager.getPackageInfo(packageName, 0).versionName ?: "0.0.0"
    } catch (e: Exception) {
        "0.0.0"
    }

    private fun installApk(path: String, result: MethodChannel.Result) {
        val updates = File(cacheDir, "updates").canonicalFile
        val file = File(path).canonicalFile
        // Only install what the updater itself downloaded.
        if (file.parentFile != updates || !file.isFile || !file.name.endsWith(".apk")) {
            result.error("PATH", "فایل نصب نامعتبر است", null)
            return
        }
        // Android 8+: the user must allow this app to install updates once.
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O &&
            !packageManager.canRequestPackageInstalls()
        ) {
            startActivity(
                Intent(
                    Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES,
                    Uri.parse("package:$packageName")
                )
            )
            result.error(
                "PERMISSION",
                "اجازهٔ نصب را برای مبین استودیو روشن کنید و دوباره «بهروزرسانی» را بزنید",
                null
            )
            return
        }
        try {
            val uri = FileProvider.getUriForFile(this, "$packageName.updates", file)
            val intent = Intent(Intent.ACTION_VIEW)
                .setDataAndType(uri, "application/vnd.android.package-archive")
                .addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION or Intent.FLAG_ACTIVITY_NEW_TASK)
            startActivity(intent)
            result.success(null)
        } catch (e: Exception) {
            result.error("INSTALL", e.message ?: "باز کردن نصبکننده ناموفق بود", null)
        }
    }
}
