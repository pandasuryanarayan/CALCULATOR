// Calculator UI. All arithmetic is done in Kotlin: every evaluation calls
// `window.AndroidCalc.evaluate(expression)`, which returns JSON. This file only
// builds the expression string, renders it and shows the result.

function evaluateExpression(expression) {
  if (!window.AndroidCalc) throw "Calculator bridge unavailable";
  const result = JSON.parse(window.AndroidCalc.evaluate(expression));
  if (!result.ok) throw result.error;
  return result.value;
}

const expressionEl = document.getElementById("expression");
const previewEl = document.getElementById("preview");
const historyEl = document.getElementById("history");
const keysEl = document.getElementById("keys");

const OPERATORS = ["+", "-", "*", "/", "^"];

let expression = "";
let answer = null;
let justEvaluated = false;
let history = [];
let previewSequence = 0;

/* ---------- rendering ---------- */

const PRETTY = [
  [/sqrt\(/g, "√("],
  [/\*/g, "×"],
  [/\//g, "÷"],
  [/-/g, "−"],
];

function pretty(text) {
  let out = text;
  for (const [pattern, replacement] of PRETTY) {
    out = out.replace(pattern, replacement);
  }
  return out;
}

function render() {
  const text =
    justEvaluated && answer !== null
      ? pretty(answer)
      : expression
        ? pretty(expression)
        : "0";
  expressionEl.textContent = text;
  expressionEl.classList.toggle("small", text.length > 12);
}

function renderHistory() {
  historyEl.replaceChildren(
    ...history.map((entry) => {
      const row = document.createElement("div");
      row.className = "row";
      row.textContent = `${pretty(entry.expression)} = ${pretty(entry.result)}`;
      return row;
    }),
  );
}

/* ---------- live preview of the running expression ---------- */

async function updatePreview() {
  const sequence = ++previewSequence;
  const text = expression.trim();

  if (!window.AndroidCalc || !text || justEvaluated) {
    previewEl.textContent = "";
    previewEl.classList.remove("error");
    return;
  }

  try {
    const result = evaluateExpression(text);
    if (sequence !== previewSequence) return;
    previewEl.textContent = result === text ? "" : `= ${pretty(result)}`;
  } catch {
    if (sequence === previewSequence) previewEl.textContent = "";
  }
}

/* ---------- expression building ---------- */

function trailingNumber() {
  const match = expression.match(/(\d+\.?\d*)$/);
  return match ? match[0] : "";
}

function pushNumber(key) {
  if (justEvaluated) {
    expression = "";
    answer = null;
    justEvaluated = false;
  }

  const current = trailingNumber();

  if (key === ".") {
    if (current.includes(".")) return;
    expression += current === "" ? "0." : ".";
    return;
  }

  if (current === "0") {
    expression = expression.slice(0, -1) + key;
    return;
  }

  expression += key;
}

function pushOperator(op) {
  justEvaluated = false;

  if (expression === "") {
    if (op === "-") expression = "-";
    return;
  }

  const last = expression.slice(-1);

  if (OPERATORS.includes(last)) {
    // A lone leading minus is a sign, not something to overwrite.
    if (expression.length === 1) return;
    expression = expression.slice(0, -1) + op;
    return;
  }

  if (last === "(") {
    if (op === "-") expression += "-";
    return;
  }

  expression += op;
}

function pushPercent() {
  if (/[\d)%]/.test(expression.slice(-1))) expression += "%";
}

function pushParenthesis() {
  const opened = (expression.match(/\(/g) || []).length;
  const closed = (expression.match(/\)/g) || []).length;
  const last = expression.slice(-1);
  const canClose = opened > closed && /[\d)%]/.test(last);
  expression += canClose ? ")" : "(";
}

function backspace() {
  if (expression.endsWith("sqrt(")) {
    expression = expression.slice(0, -5);
  } else {
    expression = expression.slice(0, -1);
  }
}

function toggleSign() {
  if (expression === "") {
    expression = "-";
    return;
  }

  const number = trailingNumber();
  if (!number) {
    // Nothing to negate (e.g. the expression ends in an operator).
    return;
  }

  const before = expression.slice(0, expression.length - number.length);
  const charBeforeMinus = before.slice(-2, -1);
  const minusIsSign =
    before.endsWith("-") &&
    (before.length === 1 ||
      OPERATORS.includes(charBeforeMinus) ||
      charBeforeMinus === "(");

  expression = minusIsSign
    ? before.slice(0, -1) + number
    : before + "-" + number;
}

/* ---------- evaluate ---------- */

// Tauri rejects with the plain string we returned from Rust, but a thrown
// Error object also lands here in tests - normalise both.
function errorText(error) {
  if (typeof error === "string") return error;
  if (error && typeof error.message === "string") return error.message;
  return "Something went wrong";
}

async function evaluateNow() {
  const text = expression.trim();
  if (!text) return;

  if (!window.AndroidCalc) {
    previewEl.textContent = "Calculator bridge unavailable";
    previewEl.classList.add("error");
    return;
  }

  try {
    const result = evaluateExpression(text);
    history = [{ expression: text, result }, ...history].slice(0, 20);
    renderHistory();
    expression = "";
    answer = result;
    justEvaluated = true;
    previewEl.textContent = "";
    previewEl.classList.remove("error");
  } catch (error) {
    previewEl.textContent = errorText(error);
    previewEl.classList.add("error");
    expression = "";
    answer = null;
    justEvaluated = false;
    window.setTimeout(() => previewEl.classList.remove("error"), 1400);
  }

  render();
}

/* ---------- key handling ---------- */

function handleKey(key) {
  if (key === "=") {
    evaluateNow();
    return;
  }

  if (key === "AC") {
    expression = "";
    answer = null;
    justEvaluated = false;
    previewEl.textContent = "";
    previewEl.classList.remove("error");
    render();
    return;
  }

  // Any key other than "=" leaves the "just evaluated" state. Operators and
  // percent continue from the answer; digits start a fresh number.
  const continuesFromAnswer =
    justEvaluated && (OPERATORS.includes(key) || key === "%" || key === "±");

  if (continuesFromAnswer) {
    expression = answer ?? "";
    justEvaluated = false;
  }

  switch (key) {
    case "BACK":
      if (justEvaluated) {
        expression = "";
        answer = null;
        justEvaluated = false;
      } else {
        backspace();
      }
      break;
    case "()":
      if (justEvaluated) {
        expression = "";
        justEvaluated = false;
      }
      pushParenthesis();
      break;
    case "%":
      pushPercent();
      break;
    case "±":
      toggleSign();
      break;
    case "sqrt(":
      if (justEvaluated) {
        expression = "";
        justEvaluated = false;
      }
      expression += "sqrt(";
      break;
    default:
      if (OPERATORS.includes(key)) {
        pushOperator(key);
      } else {
        pushNumber(key);
      }
  }

  render();
  updatePreview();
}

function flash(button) {
  if (!button) return;
  button.classList.add("pressed");
  window.setTimeout(() => button.classList.remove("pressed"), 90);
}

keysEl.addEventListener("click", (event) => {
  const button = event.target.closest(".key");
  if (!button) return;
  handleKey(button.dataset.key);
});

// Desktop convenience: a physical keyboard and number pad work too.
window.addEventListener("keydown", (event) => {
  const map = {
    Enter: "=",
    "=": "=",
    Backspace: "BACK",
    Escape: "AC",
    Delete: "AC",
    "+": "+",
    "-": "-",
    "*": "*",
    x: "*",
    X: "*",
    "/": "/",
    "^": "^",
    "%": "%",
    "(": "()",
    ")": "()",
    ".": ".",
  };

  const key = /^\d$/.test(event.key) ? event.key : map[event.key];
  if (!key) return;

  event.preventDefault();
  flash(keysEl.querySelector(`[data-key="${CSS.escape(key)}"]`));
  handleKey(key);
});

render();
renderHistory();
