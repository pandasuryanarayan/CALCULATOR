package com.suryanarayan.calculator.kotlin

import android.webkit.JavascriptInterface
import org.json.JSONObject

/**
 * The only door between the HTML/CSS/JS UI and Kotlin.
 *
 * `window.AndroidCalc.evaluate("2+3")` returns JSON:
 *   {"ok":true,"value":"5"}  or  {"ok":false,"error":"Cannot divide by zero"}
 */
class CalculatorBridge {

    @JavascriptInterface
    fun evaluate(expression: String): String {
        return try {
            JSONObject()
                .put("ok", true)
                .put("value", CalculatorEngine.evaluateToDisplay(expression))
                .toString()
        } catch (error: Exception) {
            JSONObject()
                .put("ok", false)
                .put("error", error.message ?: "Calculation failed")
                .toString()
        }
    }
}
