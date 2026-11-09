# The calculator logic is plain Kotlin with no reflection; nothing to keep.
# If R8 minification is enabled later, keep the JavaScript bridge:
-keepclassmembers class com.suryanarayan.calculator.kotlin.CalculatorBridge {
    @android.webkit.JavascriptInterface <methods>;
}
