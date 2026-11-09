# R8 runs on the release build: code shrinking, obfuscation and resource
# shrinking are all on (see app/build.gradle.kts).

# The WebView calls this class by name through addJavascriptInterface and
# resolves the @JavascriptInterface methods reflectively, so neither the class
# nor its methods may be renamed or removed.
-keep class com.suryanarayan.calculator.kotlin.CalculatorBridge { *; }
-keepclassmembers class com.suryanarayan.calculator.kotlin.CalculatorBridge {
    @android.webkit.JavascriptInterface <methods>;
}

# The activity is referenced from AndroidManifest.xml.
-keep class com.suryanarayan.calculator.kotlin.MainActivity { *; }

# Keep line numbers so any stack trace stays readable.
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile
