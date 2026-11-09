plugins {
    id("com.android.application")
    id("org.jetbrains.kotlin.android")
}

android {
    namespace = "com.suryanarayan.calculator.kotlin"
    compileSdk = 34

    defaultConfig {
        applicationId = "com.suryanarayan.calculator.kotlin"
        minSdk = 24
        targetSdk = 34
        versionCode = 3
        versionName = "0.3.0"
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            proguardFiles(
                getDefaultProguardFile("proguard-android-optimize.txt"),
                "proguard-rules.pro"
            )
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }

    kotlinOptions {
        jvmTarget = "17"
    }
}

dependencies {
    testImplementation("junit:junit:4.13.2")
    // android.jar only ships stubs for org.json, which throw in JVM unit tests;
    // this gives the tests a real implementation (test classpath only).
    testImplementation("org.json:json:20240303")
}
