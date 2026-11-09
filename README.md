# Calculator — Android

A phone calculator for Android, written in **Kotlin** with an
**HTML/CSS/JavaScript** interface running in a `WebView`. It does two things:
evaluates arithmetic expressions, and converts between 34 pairs of units across
seven categories.

**[Download the latest APK →](https://github.com/pandasuryanarayan/CALCULATOR/releases/latest)**
(139 KB, signed, Android 7.0+)

| | |
|---|---|
| Package | `com.suryanarayan.calculator.kotlin` |
| Version | 0.4.0 (versionCode 4) |
| Minimum Android | 7.0 (SDK 24) |
| APK size | ~139 KB (R8 minified, resource-shrunk) |
| Licence | GPL-3.0 |

## Install

1. Download `Calculator-Kotlin-0.4.0-android.apk` from the
   [latest release](https://github.com/pandasuryanarayan/CALCULATOR/releases/latest).
2. Copy it to the phone and open it, or run `adb install Calculator-Kotlin-0.3.0-android.apk`.
3. Allow "install unknown apps" for your browser or file manager when prompted.

It is signed with a real release key, not a debug key, so updates install over
the top of each other.

## The two screens

### Calculator

A 4×6 keypad with a live preview of the running expression.

- `+ − × ÷ ^ %`, brackets, unary minus, `√`, `±`
- implicit multiplication: `2(3+4)`, `3sqrt(9)`
- functions: `sqrt`, `cbrt`, `abs`, `sin`, `cos`, `tan`, `ln`, `log`, `exp`
- constants: `pi`, `e`
- live `= result` preview as you type, and chained evaluation after `=`:
  `2+3=` then `×2=` gives `10`
- **history**: the clock button in the top-right corner opens a sheet with the
  last 20 calculations, newest first. It survives restarts (stored in the
  WebView's local storage), tapping a plain-number result puts it back into the
  expression, and **Clear** needs two taps ("Tap again") so a stray tap cannot
  wipe it. The badge on the button shows how many entries are stored. Each row
  has a **copy button** that puts that result on the clipboard.
- results formatted to at most ten decimals, scientific notation outside
  `1e-9 .. 1e12`

### Converter

34 conversions in seven categories, result updating as you type.

| Category | Conversions |
|---|---|
| Length | cm→m, m→cm, cm→km, m→km, mm→cm, cm→mm |
| Time | hr→sec, sec→hr, hr→min, min→hr |
| Data | bytes→bits, bits→bytes, KB→bytes, MB→KB, GB→MB, bytes→KB, KB→MB, MB→GB |
| Area | m²→cm², cm²→m² |
| Volume | litres→ml, ml→litres, m³→cm³, cm³→m³ |
| Mass | kg→g, g→kg, tons→kg, kg→tons |
| Temperature | °C→K, K→°C, °C→°F, °F→°C, °F→K, K→°F |

## How it works

One Kotlin `Activity` hosts a `WebView` that loads assets bundled inside the
APK — nothing is fetched from the network, and the app declares no `INTERNET`
permission. The UI is plain HTML/CSS/JS; all arithmetic and every conversion
happen in Kotlin, behind a `@JavascriptInterface`:

```js
JSON.parse(window.AndroidCalc.evaluate("2+3"))       // { ok: true, value: "5" }
JSON.parse(window.AndroidCalc.convert("c_f", "100")) // { ok: true, value: "212" }
JSON.parse(window.AndroidCalc.catalog())             // the converter catalogue
```

The catalogue is handed to the UI as JSON, so the conversion list is defined in
exactly one place — `UnitConverter.kt` — and never duplicated in JavaScript.

## Project layout

```
android-kotlin/
    app/src/main/java/com/suryanarayan/calculator/kotlin/
        CalculatorEngine.kt    tokenizer + recursive-descent parser
        UnitConverter.kt       the 34 conversions, grouped by category
        CalculatorBridge.kt    the @JavascriptInterface the UI talks to
        MainActivity.kt        WebView host
    app/src/main/assets/
        index.html styles.css main.js    the UI
    app/src/test/java/...      JVM unit tests
.github/workflows/android-kotlin.yml     CI: test, build, sign, upload
```

## Build

Requires JDK 17, Android SDK 34 and Gradle 8.7+.

```bash
cd android-kotlin
gradle test             # 16 JVM unit tests
gradle assembleRelease  # app/build/outputs/apk/release/app-release-unsigned.apk
```

Or open `android-kotlin/` in Android Studio and press Run.

## Tests

`gradle test` runs 16 JVM tests: eight for the expression engine (precedence,
right-associative `^`, unary minus, unicode operators, percent, functions,
constants, every error path, number formatting) and eight for the converter
(each category, the temperature offsets, the JSON catalogue, unknown ids).

Every conversion factor was also checked against the original Python
implementation at 204 sample points, with no mismatches.

## CI and signing

`.github/workflows/android-kotlin.yml` runs the tests, builds the release APK,
`zipalign`s it, signs it with `apksigner` and uploads the result as an artifact.
Release builds run **R8 with code shrinking, obfuscation and resource
shrinking** (`isMinifyEnabled` + `isShrinkResources`), with keep rules for the
JavaScript bridge — the WebView resolves those methods reflectively, so the
class and its `@JavascriptInterface` methods must survive. That takes the APK
from 715 KB to 139 KB. The signing key lives in repository secrets — `ANDROID_KEYSTORE_BASE64`,
`ANDROID_KEYSTORE_PASSWORD`, `ANDROID_KEY_ALIAS`, `ANDROID_KEY_PASSWORD` — and
is never committed. Every future release must be signed with the same key, or
Android refuses to upgrade in place.

## Branches

- `main` — this Android app.
- `python-calc` — the original command-line Python calculator
  (`CALCULATOR.py`), kept for reference. The unit conversions in this app were
  ported from it.

## Licence

GPL-3.0 — see [LICENSE](LICENSE).
