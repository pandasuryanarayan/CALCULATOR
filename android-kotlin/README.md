# Calculator — Kotlin + HTML/CSS/JS for Android

The same calculator as the `Android-tauri-rust` branch, rebuilt without Tauri:
a single **Kotlin** `Activity` hosting a `WebView` that loads bundled
**HTML/CSS/JS** assets, with the arithmetic implemented in **Kotlin**.

```
app/src/main/java/com/suryanarayan/calculator/kotlin/
    CalculatorEngine.kt     tokenizer + recursive-descent parser (pure Kotlin)
    UnitConverter.kt         the 34 unit conversions, grouped by category
    CalculatorBridge.kt     the @JavascriptInterface the UI talks to
    MainActivity.kt         WebView host, loads file:///android_asset/index.html
app/src/main/assets/
    index.html styles.css main.js     the UI, unchanged from the Tauri build
app/src/test/java/.../CalculatorEngineTest.kt
```

## How the two halves talk

The UI is identical to the Tauri version; only the transport changed. Instead of
`invoke("calculate", ...)` the JS calls a synchronous Kotlin bridge:

```js
const result = JSON.parse(window.AndroidCalc.evaluate("2+3"));
// { ok: true, value: "5" }   or   { ok: false, error: "Cannot divide by zero" }
```

```kotlin
@JavascriptInterface
fun evaluate(expression: String): String = /* JSON via CalculatorEngine */
```

No `INTERNET` permission is declared, so the WebView can only ever load the
assets inside the APK.

## Two screens

The app opens on **Calculator**. The **Converter** tab offers the 34 unit
conversions ported from `CALCULATOR.py`, grouped as Length (6), Time (4),
Data (8), Area (2), Volume (4), Mass (4) and Temperature (6):

| category | conversions |
|---|---|
| Length | cm→m, m→cm, cm→km, m→km, mm→cm, cm→mm |
| Time | hr→sec, sec→hr, hr→min, min→hr |
| Data | bytes→bits, bits→bytes, KB→bytes, MB→KB, GB→MB, bytes→KB, KB→MB, MB→GB |
| Area | m²→cm², cm²→m² |
| Volume | litres→ml, ml→litres, m³→cm³, cm³→m³ |
| Mass | kg→g, g→kg, tons→kg, kg→tons |
| Temperature | °C→K, K→°C, °C→°F, °F→°C, °F→K, K→°F |

Pick a category, pick a conversion, type a value — the result updates as you
type. Every conversion is either `x * factor` or `x * factor + offset`, and the
factors are the ones from the Python file (including the 1024-based data units).
`AndroidCalc.catalog()` hands the whole catalogue to the UI as JSON, so the list
is never duplicated in JavaScript.

## Engine

`CalculatorEngine` is a direct port of the Rust engine, so both builds accept the
same expressions and return the same error strings: `+ − × ÷ ^ %`, brackets,
unary minus, implicit multiplication (`2(3+4)`, `3sqrt(9)`), `sqrt/cbrt/abs/sin/
cos/tan/ln/log/exp`, `pi`/`e`, and `%` as a postfix divide-by-100.

## Build

```bash
gradle test            # JVM unit tests for the engine
gradle assembleRelease # app/build/outputs/apk/release/app-release-unsigned.apk
```

Or open the folder in Android Studio and press Run. Requires JDK 17, Android SDK
34 and Gradle 8.7+ (the CI workflow uses `gradle/actions/setup-gradle`).

CI (`.github/workflows/android-kotlin.yml`) runs the tests, builds the release
APK and signs it with the same keystore as the Tauri build — so both apps share
one signing identity but have distinct package ids
(`com.suryanarayan.calculator.kotlin` vs `com.suryanarayan.calculator`), which
means they can be installed side by side.
