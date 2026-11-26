allprojects {
    repositories {
        google()
        mavenCentral()
    }
}

val newBuildDir: Directory =
    rootProject.layout.buildDirectory
        .dir("../../build")
        .get()
rootProject.layout.buildDirectory.value(newBuildDir)

subprojects {
    val newSubprojectBuildDir: Directory = newBuildDir.dir(project.name)
    project.layout.buildDirectory.value(newSubprojectBuildDir)
}

// Force every Android plugin module (e.g. file_picker) to compile against API 36,
// required by flutter_plugin_android_lifecycle. Registered before
// evaluationDependsOn so afterEvaluate is attached before any module evaluates.
subprojects {
    afterEvaluate {
        val android = extensions.findByName("android") ?: return@afterEvaluate
        if (project.name == "app") return@afterEvaluate
        try {
            android.javaClass
                .getMethod("compileSdkVersion", Int::class.javaPrimitiveType)
                .invoke(android, 36)
        } catch (e: Exception) {
            logger.warn("Could not set compileSdk for ${project.name}: ${e.message}")
        }
    }
}

subprojects {
    project.evaluationDependsOn(":app")
}

tasks.register<Delete>("clean") {
    delete(rootProject.layout.buildDirectory)
}
