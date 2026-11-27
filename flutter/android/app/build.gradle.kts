plugins {
    id("com.android.application")
    // The Flutter Gradle Plugin must be applied after the Android and Kotlin Gradle plugins.
    id("dev.flutter.flutter-gradle-plugin")
}

android {
    namespace = "com.nerdcity.mobin_studio"
    compileSdk = flutter.compileSdkVersion
    ndkVersion = flutter.ndkVersion

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    defaultConfig {
        // TODO: Specify your own unique Application ID (https://developer.android.com/studio/build/application-id.html).
        applicationId = "com.nerdcity.mobin_studio"
        // You can update the following values to match your application needs.
        // For more information, see: https://flutter.dev/to/review-gradle-config.
        minSdk = flutter.minSdkVersion
        targetSdk = flutter.targetSdkVersion
        // Uses the version code from pubspec.yaml. When using split APKs, 1000 * ABI_VERSION
        // is added automatically by Flutter. (https://developer.android.com/studio/build/configure-apk-splits#configure-APK-versions)
        // You can force using the value of versionCode by specifying the `-P force-version-code-ignoring-abi=true`
        // flag during build.
        versionCode = flutter.versionCode
        versionName = flutter.versionName
    }

    buildTypes {
        release {
            // TODO: Add your own signing config for the release build.
            // Signing with the debug keys for now, so `flutter run --release` works.
            signingConfig = signingConfigs.getByName("debug")
        }
    }
}

kotlin {
    compilerOptions {
        jvmTarget = org.jetbrains.kotlin.gradle.dsl.JvmTarget.JVM_17
    }
}

flutter {
    source = "../.."
}

dependencies {
    // FileProvider for the in-app updater (MainActivity.installApk)
    implementation("androidx.core:core:1.13.1")
}

// mobin-studio: signing+id
// Keystore lives outside this project in ../../android/signing (gitignored).
val mobinSignDir = rootProject.file("../../android/signing")
val mobinKeystore = File(mobinSignDir, "mobin.keystore")
val mobinPass: String? = System.getenv("MOBIN_KS_PASS")
    ?: File(mobinSignDir, "pass.txt").takeIf { it.isFile }
        ?.readLines()?.firstOrNull()?.trim()

android {
    defaultConfig {
        applicationId = "com.nerdcity.mobinstudio"
    }
    if (mobinKeystore.isFile && !mobinPass.isNullOrEmpty()) {
        signingConfigs {
            create("mobin") {
                storeFile = mobinKeystore
                storePassword = mobinPass
                keyAlias = "mobin"
                keyPassword = mobinPass
            }
        }
        buildTypes {
            getByName("release") {
                signingConfig = signingConfigs.getByName("mobin")
            }
        }
    } else {
        logger.warn("mobin-studio: signing files missing; release APK will not be update-compatible")
    }
}
