# Calculator — Kotlin + HTML/CSS/JS for Android

A phone calculator: a single Kotlin `Activity` hosting a `WebView` that loads
bundled **HTML/CSS/JS** assets, with the arithmetic implemented in **Kotlin**.

```
app/src/main/java/com/suryanarayan/calculator/kotlin/
    CalculatorEngine.kt     tokenizer + recursive-descent parser (pure Kotlin)
    CalculatorBridge.kt     the @JavascriptInterface the UI talks to
    MainActivity.kt         WebView host, loads file:///android_asset/index.html
app/src/main/assets/
    index.html styles.css main.js     the UI
app/src/test/java/.../CalculatorEngineTest.kt
```

## How the two halves talk

The JS calls a synchronous Kotlin bridge:

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

## Engine

`CalculatorEngine` supports `+ − × ÷ ^ %`, brackets, unary minus, implicit
multiplication (`2(3+4)`, `3sqrt(9)`), `sqrt/cbrt/abs/sin/cos/tan/ln/log/exp`,
`pi`/`e`, and `%` as a postfix divide-by-100. Results are formatted to at most
ten decimals with trailing zeros stripped, switching to exponent notation
outside `1e-9 .. 1e12`.

## Build

```bash
gradle test            # JVM unit tests for the engine
gradle assembleRelease # app/build/outputs/apk/release/app-release-unsigned.apk
```

Or open the folder in Android Studio and press Run. Requires JDK 17, Android SDK
34 and Gradle 8.7+ (the CI workflow uses `gradle/actions/setup-gradle`).

`.github/workflows/android-kotlin.yml` runs the tests, builds the release APK
and signs it with the project keystore held in the repository secrets
(`ANDROID_KEYSTORE_BASE64`, `ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`,
`ANDROID_KEY_PASSWORD`). Keep that keystore safe and never commit it: every
future update must be signed with the same key, or Android refuses to upgrade
in place.

Package id: `com.suryanarayan.calculator.kotlin`.
