package com.suryanarayan.calculator.kotlin

import java.util.Locale
import kotlin.math.abs
import kotlin.math.cbrt
import kotlin.math.cos
import kotlin.math.exp
import kotlin.math.ln
import kotlin.math.log10
import kotlin.math.pow
import kotlin.math.sin
import kotlin.math.sqrt
import kotlin.math.tan

/**
 * The arithmetic engine: a tokenizer plus a recursive descent parser.
 *
 * This is a direct port of the Rust engine in the `Android-tauri-rust` branch,
 * so both apps accept exactly the same expressions and report the same errors.
 *
 * Grammar, lowest precedence first:
 *
 *     expr    := term (('+' | '-') term)*
 *     term    := unary (('*' | '/') unary)*        also implicit: 2(3+4)
 *     unary   := ('-' | '+') unary | power
 *     power   := postfix ('^' unary)?              right associative
 *     postfix := primary '%'*                      50% -> 0.5
 *     primary := NUMBER | CONSTANT | FUNC '(' expr ')' | FUNC unary | '(' expr ')'
 */
class CalcException(message: String) : Exception(message)

sealed class Token {
    data class Num(val value: Double) : Token()
    data class Name(val name: String) : Token()
    object Plus : Token()
    object Minus : Token()
    object Star : Token()
    object Slash : Token()
    object Caret : Token()
    object Percent : Token()
    object LParen : Token()
    object RParen : Token()

    fun label(): String = when (this) {
        is Num -> value.toString()
        is Name -> name
        Plus -> "+"
        Minus -> "-"
        Star -> "*"
        Slash -> "/"
        Caret -> "^"
        Percent -> "%"
        LParen -> "("
        RParen -> ")"
    }
}

private val FUNCTIONS = setOf("sqrt", "cbrt", "abs", "sin", "cos", "tan", "ln", "log", "exp")

private fun constantValue(name: String): Double? = when (name) {
    "pi" -> Math.PI
    "e" -> Math.E
    "tau" -> Math.PI * 2.0
    else -> null
}

private fun applyFunction(name: String, argument: Double): Double = when (name) {
    "sqrt" -> {
        if (argument < 0.0) throw CalcException("Cannot take the square root of a negative number")
        sqrt(argument)
    }
    "cbrt" -> cbrt(argument)
    "abs" -> abs(argument)
    "sin" -> sin(argument)
    "cos" -> cos(argument)
    "tan" -> tan(argument)
    "ln" -> {
        if (argument <= 0.0) throw CalcException("ln needs a number greater than zero")
        ln(argument)
    }
    "log" -> {
        if (argument <= 0.0) throw CalcException("log needs a number greater than zero")
        log10(argument)
    }
    "exp" -> exp(argument)
    else -> throw CalcException("Unknown function '$name'")
}

private class Parser(private val tokens: List<Token>) {

    private var position = 0

    fun peek(): Token? = tokens.getOrNull(position)

    private fun advance(): Token? {
        val token = tokens.getOrNull(position) ?: return null
        position += 1
        return token
    }

    fun parseExpression(): Double {
        var value = parseTerm()
        while (true) {
            when (peek()) {
                Token.Plus -> {
                    position += 1
                    value += parseTerm()
                }
                Token.Minus -> {
                    position += 1
                    value -= parseTerm()
                }
                else -> return value
            }
        }
    }

    private fun parseTerm(): Double {
        var value = parseUnary()
        while (true) {
            when (peek()) {
                Token.Star -> {
                    position += 1
                    value *= parseUnary()
                }
                Token.Slash -> {
                    position += 1
                    val divisor = parseUnary()
                    if (divisor == 0.0) throw CalcException("Cannot divide by zero")
                    value /= divisor
                }
                // Implicit multiplication: 2(3+4), 3sqrt(9)
                Token.LParen, is Token.Name -> value *= parseUnary()
                else -> return value
            }
        }
    }

    private fun parseUnary(): Double = when (peek()) {
        Token.Minus -> {
            position += 1
            -parseUnary()
        }
        Token.Plus -> {
            position += 1
            parseUnary()
        }
        else -> parsePower()
    }

    private fun parsePower(): Double {
        val base = parsePostfix()
        if (peek() == Token.Caret) {
            position += 1
            return base.pow(parseUnary())
        }
        return base
    }

    private fun parsePostfix(): Double {
        var value = parsePrimary()
        while (peek() == Token.Percent) {
            position += 1
            value /= 100.0
        }
        return value
    }

    private fun parsePrimary(): Double {
        val token = advance() ?: throw CalcException("Expression is incomplete")
        return when (token) {
            is Token.Num -> token.value
            Token.LParen -> {
                val value = parseExpression()
                if (advance() != Token.RParen) throw CalcException("Unbalanced parentheses")
                value
            }
            is Token.Name -> parseName(token.name)
            else -> throw CalcException("Unexpected '${token.label()}'")
        }
    }

    private fun parseName(name: String): Double {
        val constant = constantValue(name)
        if (constant != null) return constant

        if (name !in FUNCTIONS) throw CalcException("Unknown function '$name'")

        // Both sqrt(9) and the shorthand sqrt 9 / sqrt9 are accepted.
        if (peek() == Token.LParen) {
            position += 1
            val argument = parseExpression()
            if (advance() != Token.RParen) throw CalcException("Unbalanced parentheses")
            return applyFunction(name, argument)
        }
        return applyFunction(name, parseUnary())
    }
}

object CalculatorEngine {

    /** Evaluate an expression such as "2*(3+4)" or "sqrt(9)/2". */
    fun evaluate(input: String): Double {
        val tokens = tokenize(input)
        if (tokens.isEmpty()) throw CalcException("Enter a number")

        val parser = Parser(tokens)
        val value = parser.parseExpression()

        val trailing = parser.peek()
        if (trailing != null) throw CalcException("Unexpected '${trailing.label()}'")
        if (!value.isFinite()) throw CalcException("Result is too large")
        return value
    }

    /** Evaluate and render for the display, throwing [CalcException] on bad input. */
    fun evaluateToDisplay(input: String): String = format(evaluate(input))

    /**
     * At most ten decimals, trailing zeros removed, scientific notation outside
     * 1e-9 .. 1e12 - the same rules as the Rust build.
     */
    fun format(value: Double): String {
        if (!value.isFinite()) return "Error"
        if (value == 0.0) return "0"

        val magnitude = abs(value)
        if (magnitude >= 1e12 || magnitude < 1e-9) {
            val scientific = String.format(Locale.US, "%.10e", value)
            val parts = scientific.split("e")
            val mantissa = parts[0].trimEnd('0').trimEnd('.')
            val exponent = parts[1].toInt()
            return mantissa + "e" + exponent
        }

        val fixed = String.format(Locale.US, "%.10f", value)
        val trimmed = fixed.trimEnd('0').trimEnd('.')
        return if (trimmed.isEmpty() || trimmed == "-") "0" else trimmed
    }

    private fun tokenize(input: String): List<Token> {
        val tokens = ArrayList<Token>(input.length)
        var index = 0

        while (index < input.length) {
            val current = input[index]
            when {
                current.isWhitespace() -> index += 1

                current.isDigit() || current == '.' -> {
                    val start = index
                    var seenPoint = false
                    while (index < input.length) {
                        val ch = input[index]
                        if (ch.isDigit()) {
                            index += 1
                        } else if (ch == '.' && !seenPoint) {
                            seenPoint = true
                            index += 1
                        } else {
                            break
                        }
                    }
                    val text = input.substring(start, index)
                    val parsed = text.toDoubleOrNull()
                        ?: throw CalcException("Unexpected '$text'")
                    tokens.add(Token.Num(parsed))
                }

                current.isLetter() -> {
                    val start = index
                    while (index < input.length && input[index].isLetter()) index += 1
                    tokens.add(Token.Name(input.substring(start, index).lowercase(Locale.US)))
                }

                else -> {
                    val token = when (current) {
                        '+' -> Token.Plus
                        '-', '\u2212' -> Token.Minus
                        '*', '\u00d7', '\u22c5' -> Token.Star
                        '/', '\u00f7' -> Token.Slash
                        '^' -> Token.Caret
                        '%' -> Token.Percent
                        '(', '[' -> Token.LParen
                        ')', ']' -> Token.RParen
                        '\u221a' -> Token.Name("sqrt")
                        else -> throw CalcException("Unexpected character '$current'")
                    }
                    tokens.add(token)
                    index += 1
                }
            }
        }

        return tokens
    }
}
