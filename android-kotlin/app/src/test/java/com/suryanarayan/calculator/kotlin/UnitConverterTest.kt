package com.suryanarayan.calculator.kotlin

import org.json.JSONArray
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertTrue
import org.junit.Test

/** The 34 conversions, checked against the values the Python file produces. */
class UnitConverterTest {

    private fun convert(id: String, value: Double): Double = UnitConverter.convert(id, value)

    @Test
    fun catalogueIsComplete() {
        assertEquals(34, UnitConverter.conversions.size)
        assertEquals(7, UnitConverter.categories.size)
        UnitConverter.categories.forEach { category ->
            assertTrue(
                "$category has no conversions",
                UnitConverter.conversions.any { it.category == category },
            )
        }
    }

    @Test
    fun length() {
        assertEquals(1.5, convert("cm_m", 150.0), 1e-12)
        assertEquals(150.0, convert("m_cm", 1.5), 1e-12)
        assertEquals(0.02, convert("cm_km", 2000.0), 1e-12)
        assertEquals(2.0, convert("m_km", 2000.0), 1e-12)
        assertEquals(2.5, convert("mm_cm", 25.0), 1e-12)
        assertEquals(250.0, convert("cm_mm", 25.0), 1e-12)
    }

    @Test
    fun time() {
        assertEquals(7200.0, convert("hr_sec", 2.0), 1e-12)
        assertEquals(2.0, convert("sec_hr", 7200.0), 1e-12)
        assertEquals(120.0, convert("hr_min", 2.0), 1e-12)
        assertEquals(2.0, convert("min_hr", 120.0), 1e-12)
    }

    @Test
    fun data() {
        assertEquals(64.0, convert("bytes_bits", 8.0), 1e-12)
        assertEquals(8.0, convert("bits_bytes", 64.0), 1e-12)
        assertEquals(2048.0, convert("kb_bytes", 2.0), 1e-12)
        assertEquals(2048.0, convert("mb_kb", 2.0), 1e-12)
        assertEquals(2048.0, convert("gb_mb", 2.0), 1e-12)
        assertEquals(2.0, convert("bytes_kb", 2048.0), 1e-12)
        assertEquals(2.0, convert("kb_mb", 2048.0), 1e-12)
        assertEquals(2.0, convert("mb_gb", 2048.0), 1e-12)
    }

    @Test
    fun areaVolumeMass() {
        assertEquals(20000.0, convert("sqm_sqcm", 2.0), 1e-9)
        assertEquals(2.0, convert("sqcm_sqm", 20000.0), 1e-9)
        assertEquals(3000.0, convert("l_ml", 3.0), 1e-12)
        assertEquals(3.0, convert("ml_l", 3000.0), 1e-12)
        assertEquals(2_000_000.0, convert("cum_cucm", 2.0), 1e-6)
        assertEquals(2.0, convert("cucm_cum", 2_000_000.0), 1e-9)
        assertEquals(3000.0, convert("kg_g", 3.0), 1e-12)
        assertEquals(3.0, convert("g_kg", 3000.0), 1e-12)
        assertEquals(5000.0, convert("ton_kg", 5.0), 1e-12)
        assertEquals(5.0, convert("kg_ton", 5000.0), 1e-12)
    }

    @Test
    fun temperature() {
        assertEquals(273.15, convert("c_k", 0.0), 1e-12)
        assertEquals(0.0, convert("k_c", 273.15), 1e-12)
        assertEquals(212.0, convert("c_f", 100.0), 1e-12)
        assertEquals(100.0, convert("f_c", 212.0), 1e-12)
        assertEquals(373.15, convert("f_k", 212.0), 1e-12)
        assertEquals(212.0, convert("k_f", 373.15), 1e-12)
        assertEquals(-40.0, convert("c_f", -40.0), 1e-12)
    }

    @Test
    fun unknownConversionIsReported() {
        val error = runCatching { UnitConverter.convert("nope", 1.0) }.exceptionOrNull()
        assertNotNull(error)
        assertTrue(error is CalcException)
    }

    @Test
    fun catalogueJsonIsGrouped() {
        val root = JSONArray(UnitConverter.catalogJson())
        assertEquals(7, root.length())
        var total = 0
        for (index in 0 until root.length()) {
            val group = root.getJSONObject(index)
            assertNotNull(group.getString("name"))
            total += group.getJSONArray("items").length()
        }
        assertEquals(34, total)
    }
}
