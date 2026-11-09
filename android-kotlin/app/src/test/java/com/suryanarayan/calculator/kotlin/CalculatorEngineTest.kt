package com.suryanarayan.calculator.kotlin

import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Assert.fail
import org.junit.Test

/** Mirrors the Rust test suite in the Android-tauri-rust branch. */
class CalculatorEngineTest {

    private fun value(expression: String): Double = CalculatorEngine.evaluate(expression)

    private fun assertEval(expression: String, expected: Double) {
        assertEquals("evaluating $expression", expected, value(expression), 1e-9)
    }

    private fun assertFails(expression: String, fragment: String) {
        try {
            CalculatorEngine.evaluate(expression)
        } catch (error: CalcException) {
            assertTrue(
                "'$expression' gave '${error.message}', expected '$fragment'",
                error.message!!.contains(fragment)
            )
            return
        }
        fail("'$expression' did not throw, expected '$fragment'")
    }

    @Test
    fun arithmetic() {
        assertEval("2+3", 5.0)
        assertEval("7-9", -2.0)
        assertEval("6*7", 42.0)
        assertEval("9/2", 4.5)
        assertEval("1+2*3", 7.0)
        assertEval("(1+2)*3", 9.0)
    }

    @Test
    fun unaryAndPrecedence() {
        assertEval("-5+3", -2.0)
        assertEval("2*-3", -6.0)
        assertEval("--4", 4.0)
        assertEval("-2^2", -4.0)
        assertEval("2^3^2", 512.0)
        assertEval("2^-1", 0.5)
    }

    @Test
    fun unicodeOperators() {
        assertEval("6\u00d77", 42.0)
        assertEval("9\u00f72", 4.5)
        assertEval("7\u22129", -2.0)
        assertEval("\u221a9", 3.0)
    }

    @Test
    fun percentAndImplicitMultiplication() {
        assertEval("50%", 0.5)
        assertEval("200*10%", 20.0)
        assertEval("2(3+4)", 14.0)
    }

    @Test
    fun functionsAndConstants() {
        assertEval("sqrt(9)", 3.0)
        assertEval("sqrt9", 3.0)
        assertEval("3sqrt(9)", 9.0)
        assertEval("sqrt(2)*sqrt(2)", 2.0)
        assertEval("abs(0-7)", 7.0)
        assertEval("pi", Math.PI)
        assertEval("log(1000)", 3.0)
        assertEval("2*pi", 2.0 * Math.PI)
    }

    @Test
    fun errors() {
        assertFails("1/0", "Cannot divide by zero")
        assertFails("sqrt(-4)", "square root of a negative number")
        assertFails("2+", "incomplete")
        assertFails("(2+3", "Unbalanced parentheses")
        assertFails("2+*3", "Unexpected '*'")
        assertFails("", "Enter a number")
        assertFails("foo(2)", "Unknown function")
    }

    @Test
    fun formatting() {
        assertEquals("0.3", CalculatorEngine.format(0.1 + 0.2))
        assertEquals("5", CalculatorEngine.format(5.0))
        assertEquals("0", CalculatorEngine.format(-0.0))
        assertEquals("0.3333333333", CalculatorEngine.format(1.0 / 3.0))
        assertEquals("123456789", CalculatorEngine.format(123456789.0))
        assertEquals("1e13", CalculatorEngine.format(1e13))
        assertEquals("1e-10", CalculatorEngine.format(1e-10))
    }

    @Test
    fun displayValue() {
        assertEquals("17", CalculatorEngine.evaluateToDisplay("sqrt(9)+2*(3+4)"))
    }
}
