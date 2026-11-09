package com.suryanarayan.calculator.kotlin

import org.json.JSONArray
import org.json.JSONObject

/**
 * The 34 unit conversions from CALCULATOR.py, grouped by category.
 *
 * Every conversion in that file is either `x * factor` or `x * factor + offset`
 * (the temperature ones), so one affine model covers all of them - and the
 * factors are copied exactly, including the 1024-based data units.
 */
object UnitConverter {

    class Conversion(
        val id: String,
        val category: String,
        val label: String,
        val factor: Double,
        val offset: Double = 0.0,
    ) {
        fun apply(value: Double): Double = value * factor + offset
    }

    val categories = listOf(
        "Length", "Time", "Data", "Area", "Volume", "Mass", "Temperature",
    )

    val conversions: List<Conversion> = listOf(
        // Length
        Conversion("cm_m", "Length", "cm \u2192 m", 1.0 / 100),
        Conversion("m_cm", "Length", "m \u2192 cm", 100.0),
        Conversion("cm_km", "Length", "cm \u2192 km", 1.0 / 100_000),
        Conversion("m_km", "Length", "m \u2192 km", 1.0 / 1000),
        Conversion("mm_cm", "Length", "mm \u2192 cm", 1.0 / 10),
        Conversion("cm_mm", "Length", "cm \u2192 mm", 10.0),

        // Time
        Conversion("hr_sec", "Time", "hr \u2192 sec", 3600.0),
        Conversion("sec_hr", "Time", "sec \u2192 hr", 1.0 / 3600),
        Conversion("hr_min", "Time", "hr \u2192 min", 60.0),
        Conversion("min_hr", "Time", "min \u2192 hr", 1.0 / 60),

        // Data
        Conversion("bytes_bits", "Data", "bytes \u2192 bits", 8.0),
        Conversion("bits_bytes", "Data", "bits \u2192 bytes", 1.0 / 8),
        Conversion("kb_bytes", "Data", "KB \u2192 bytes", 1024.0),
        Conversion("mb_kb", "Data", "MB \u2192 KB", 1024.0),
        Conversion("gb_mb", "Data", "GB \u2192 MB", 1024.0),
        Conversion("bytes_kb", "Data", "bytes \u2192 KB", 1.0 / 1024),
        Conversion("kb_mb", "Data", "KB \u2192 MB", 1.0 / 1024),
        Conversion("mb_gb", "Data", "MB \u2192 GB", 1.0 / 1024),

        // Area
        Conversion("sqm_sqcm", "Area", "m\u00b2 \u2192 cm\u00b2", 10_000.0),
        Conversion("sqcm_sqm", "Area", "cm\u00b2 \u2192 m\u00b2", 1.0 / 10_000),

        // Volume
        Conversion("l_ml", "Volume", "litres \u2192 ml", 1000.0),
        Conversion("ml_l", "Volume", "ml \u2192 litres", 1.0 / 1000),
        Conversion("cum_cucm", "Volume", "m\u00b3 \u2192 cm\u00b3", 1_000_000.0),
        Conversion("cucm_cum", "Volume", "cm\u00b3 \u2192 m\u00b3", 1.0 / 1_000_000),

        // Mass
        Conversion("kg_g", "Mass", "kg \u2192 g", 1000.0),
        Conversion("g_kg", "Mass", "g \u2192 kg", 1.0 / 1000),
        Conversion("ton_kg", "Mass", "tons \u2192 kg", 1000.0),
        Conversion("kg_ton", "Mass", "kg \u2192 tons", 1.0 / 1000),

        // Temperature (the only ones with an offset)
        Conversion("c_k", "Temperature", "\u00b0C \u2192 K", 1.0, 273.15),
        Conversion("k_c", "Temperature", "K \u2192 \u00b0C", 1.0, -273.15),
        Conversion("c_f", "Temperature", "\u00b0C \u2192 \u00b0F", 9.0 / 5.0, 32.0),
        Conversion("f_c", "Temperature", "\u00b0F \u2192 \u00b0C", 5.0 / 9.0, -32.0 * 5.0 / 9.0),
        Conversion("f_k", "Temperature", "\u00b0F \u2192 K", 5.0 / 9.0, 273.15 - 32.0 * 5.0 / 9.0),
        Conversion("k_f", "Temperature", "K \u2192 \u00b0F", 9.0 / 5.0, -273.15 * 9.0 / 5.0 + 32.0),
    )

    fun find(id: String): Conversion? = conversions.firstOrNull { it.id == id }

    fun convert(id: String, value: Double): Double {
        val conversion = find(id) ?: throw CalcException("Unknown conversion '$id'")
        return conversion.apply(value)
    }

    /** The whole catalogue as JSON, so the UI renders it instead of hardcoding. */
    fun catalogJson(): String {
        val root = JSONArray()
        for (category in categories) {
            val items = JSONArray()
            for (conversion in conversions.filter { it.category == category }) {
                items.put(
                    JSONObject()
                        .put("id", conversion.id)
                        .put("label", conversion.label)
                )
            }
            root.put(JSONObject().put("name", category).put("items", items))
        }
        return root.toString()
    }
}
