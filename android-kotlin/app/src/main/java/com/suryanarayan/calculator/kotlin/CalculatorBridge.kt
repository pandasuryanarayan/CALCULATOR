package com.suryanarayan.calculator.kotlin

import android.content.ClipData
import android.content.ClipboardManager
import android.content.Context
import android.webkit.JavascriptInterface
import org.json.JSONObject

/**
 * The only door between the HTML/CSS/JS UI and Kotlin.
 *
 * `window.AndroidCalc.evaluate("2+3")` returns JSON:
 *   {"ok":true,"value":"5"}  or  {"ok":false,"error":"Cannot divide by zero"}
 */
class CalculatorBridge(private val context: Context) {

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

    /** Copy a result to the system clipboard (used by the history sheet). */
    @JavascriptInterface
    fun copy(text: String): String {
        return try {
            val clipboard =
                context.getSystemService(Context.CLIPBOARD_SERVICE) as ClipboardManager
            clipboard.setPrimaryClip(ClipData.newPlainText("Calculator", text))
            JSONObject().put("ok", true).toString()
        } catch (error: Exception) {
            JSONObject()
                .put("ok", false)
                .put("error", error.message ?: "Could not copy")
                .toString()
        }
    }

    /** The unit-conversion catalogue, grouped by category. */
    @JavascriptInterface
    fun catalog(): String = UnitConverter.catalogJson()

    /** Convert `value` with the conversion `id`; returns JSON like evaluate(). */
    @JavascriptInterface
    fun convert(id: String, value: String): String {
        return try {
            val parsed = value.trim().toDoubleOrNull()
                ?: throw CalcException("Enter a number")
            JSONObject()
                .put("ok", true)
                .put("value", CalculatorEngine.format(UnitConverter.convert(id, parsed)))
                .toString()
        } catch (error: Exception) {
            JSONObject()
                .put("ok", false)
                .put("error", error.message ?: "Conversion failed")
                .toString()
        }
    }
}
