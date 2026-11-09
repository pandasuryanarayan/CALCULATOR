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
const historyListEl = document.getElementById("history-list");
const historyEmptyEl = document.getElementById("history-empty");
const historyCountEl = document.getElementById("history-count");
const historyBtn = document.getElementById("history-btn");
const historySheet = document.getElementById("history-sheet");
const historyBackdrop = document.getElementById("history-backdrop");
const historyClearBtn = document.getElementById("history-clear");
const historyCloseBtn = document.getElementById("history-close");
const keysEl = document.getElementById("keys");

const OPERATORS = ["+", "-", "*", "/", "^"];

let expression = "";
let answer = null;
let justEvaluated = false;
const HISTORY_LIMIT = 20;
const HISTORY_KEY = "calculator.history.v1";

let history = loadHistory();
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

// Exponent results ("1e13") cannot be re-parsed as typed, so expand them
// before feeding a result back into the expression.
function chainable(value) {
  if (!/e/i.test(value)) return value;
  const number = Number(value);
  if (!Number.isFinite(number)) return value;
  return number.toFixed(20).replace(/0+$/, "").replace(/\.$/, "");
}

function loadHistory() {
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (entry) =>
          entry &&
          typeof entry.expression === "string" &&
          typeof entry.result === "string",
      )
      .slice(0, HISTORY_LIMIT);
  } catch {
    return [];
  }
}

function saveHistory() {
  try {
    window.localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(history.slice(0, HISTORY_LIMIT)),
    );
  } catch {
    /* storage unavailable: keep the list in memory */
  }
}

function addHistoryEntry(expressionText, result) {
  history.unshift({ expression: expressionText, result });
  if (history.length > HISTORY_LIMIT) history.length = HISTORY_LIMIT;
  saveHistory();
  renderHistory();
}

const COPY_ICONS = `
  <svg class="icon-copy" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <rect x="9" y="9" width="11" height="11" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.8" />
    <path d="M15 5.5A2.5 2.5 0 0 0 12.5 3h-6A2.5 2.5 0 0 0 4 5.5v6A2.5 2.5 0 0 0 6.5 14"
          fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
  </svg>
  <svg class="icon-check" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
    <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="2.2"
          stroke-linecap="round" stroke-linejoin="round" />
  </svg>`;

function copyResult(value, button) {
  let copied = false;
  try {
    if (window.AndroidCalc && typeof window.AndroidCalc.copy === "function") {
      copied = JSON.parse(window.AndroidCalc.copy(value)).ok === true;
    } else if (window.navigator && window.navigator.clipboard) {
      window.navigator.clipboard.writeText(value);
      copied = true;
    }
  } catch {
    copied = false;
  }

  if (!copied) return;
  button.classList.add("copied");
  window.setTimeout(() => button.classList.remove("copied"), 1200);
}

function renderHistory() {
  historyListEl.replaceChildren(
    ...history.map((entry) => {
      // Only plain decimals can be put back into the expression safely.
      const reusable = /^-?\d+(\.\d+)?$/.test(entry.result);

      const row = document.createElement("div");
      row.className = "history-row";

      const text = document.createElement(reusable ? "button" : "div");
      text.className = reusable ? "history-text" : "history-text static";

      const expressionPart = document.createElement("span");
      expressionPart.className = "history-expr";
      expressionPart.textContent = pretty(entry.expression);

      const resultPart = document.createElement("span");
      resultPart.className = "history-result";
      resultPart.textContent = `= ${pretty(entry.result)}`;

      text.append(expressionPart, resultPart);

      if (reusable) {
        text.addEventListener("click", () => {
          expression = chainable(entry.result);
          answer = null;
          justEvaluated = false;
          closeHistory();
          render();
          updatePreview();
        });
      }

      const copy = document.createElement("button");
      copy.className = "history-copy";
      copy.setAttribute("aria-label", "Copy result");
      copy.innerHTML = COPY_ICONS;
      copy.addEventListener("click", (event) => {
        event.stopPropagation();
        copyResult(entry.result, copy);
      });

      row.append(text, copy);
      return row;
    }),
  );

  historyEmptyEl.hidden = history.length > 0;
  historyCountEl.textContent = String(history.length);
  historyCountEl.hidden = history.length === 0;
  historyClearBtn.disabled = history.length === 0;
}

function nextFrame(callback) {
  if (typeof window.requestAnimationFrame === "function") {
    window.requestAnimationFrame(callback);
  } else {
    window.setTimeout(callback, 16);
  }
}

function openHistory() {
  renderHistory();
  historyBackdrop.hidden = false;
  historySheet.hidden = false;
  nextFrame(() => historySheet.classList.add("open"));
}

function closeHistory() {
  historySheet.classList.remove("open");
  window.setTimeout(() => {
    historySheet.hidden = true;
    historyBackdrop.hidden = true;
  }, 180);
  disarmClear();
}

let clearArmed = false;
let clearTimer = 0;

function disarmClear() {
  clearArmed = false;
  window.clearTimeout(clearTimer);
  historyClearBtn.textContent = "Clear";
  historyClearBtn.classList.remove("armed");
}

// Two taps to wipe the list, so a stray tap does not lose it.
function onClearHistory() {
  if (history.length === 0) return;
  if (!clearArmed) {
    clearArmed = true;
    historyClearBtn.textContent = "Tap again";
    historyClearBtn.classList.add("armed");
    clearTimer = window.setTimeout(disarmClear, 3000);
    return;
  }
  disarmClear();
  history = [];
  saveHistory();
  renderHistory();
}

historyBtn.addEventListener("click", openHistory);
historyCloseBtn.addEventListener("click", closeHistory);
historyBackdrop.addEventListener("click", closeHistory);
historyClearBtn.addEventListener("click", onClearHistory);

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

// The Kotlin bridge reports errors as a plain string message; a thrown Error
// object also lands here in tests - normalise both.
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
    addHistoryEntry(text, result);
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
  if (window.getSelection) {
    const selection = window.getSelection();
    if (selection && selection.removeAllRanges) selection.removeAllRanges();
  }

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
    expression = chainable(answer ?? "");
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
  const target = event.target;
  if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
    return;
  }

  if (!historySheet.hidden) {
    if (event.key === "Escape") closeHistory();
    return;
  }

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

/* ---------- unit converter ---------- */

const viewCalc = document.getElementById("view-calc");
const viewConvert = document.getElementById("view-convert");
const tabCalc = document.getElementById("tab-calc");
const tabConvert = document.getElementById("tab-convert");
const chipsEl = document.getElementById("chips");
const convListEl = document.getElementById("conv-list");
const convLabelEl = document.getElementById("conv-label");
const convInputEl = document.getElementById("conv-input");
const convResultEl = document.getElementById("conv-result");

let catalog = [];
let activeCategory = null;
let activeConversion = null;

function showView(name) {
  const isCalculator = name === "calc";
  viewCalc.classList.toggle("active", isCalculator);
  viewConvert.classList.toggle("active", !isCalculator);
  tabCalc.classList.toggle("active", isCalculator);
  tabConvert.classList.toggle("active", !isCalculator);
}

function renderChips() {
  chipsEl.replaceChildren(
    ...catalog.map((group) => {
      const chip = document.createElement("button");
      chip.className = group.name === activeCategory ? "chip active" : "chip";
      chip.textContent = group.name;
      chip.addEventListener("click", () => selectCategory(group.name));
      return chip;
    }),
  );
}

function renderConversionList() {
  const group = catalog.find((entry) => entry.name === activeCategory);
  if (!group) return;
  convListEl.replaceChildren(
    ...group.items.map((item) => {
      const button = document.createElement("button");
      const selected = activeConversion !== null && activeConversion.id === item.id;
      button.className = selected ? "conv-item active" : "conv-item";
      button.textContent = item.label;
      button.addEventListener("click", () => selectConversion(item));
      return button;
    }),
  );
}

function selectCategory(name) {
  activeCategory = name;
  const group = catalog.find((entry) => entry.name === name);
  activeConversion = group && group.items.length ? group.items[0] : null;
  renderChips();
  renderConversionList();
  updateConversionLabel();
  runConversion();
}

function selectConversion(item) {
  activeConversion = item;
  renderConversionList();
  updateConversionLabel();
  runConversion();
}

function updateConversionLabel() {
  convLabelEl.textContent = activeConversion ? activeConversion.label : "";
}

function runConversion() {
  if (!activeConversion) {
    convResultEl.textContent = "";
    return;
  }

  const raw = convInputEl.value.trim();
  if (raw === "") {
    convResultEl.textContent = "0";
    convResultEl.classList.remove("error");
    return;
  }

  if (!window.AndroidCalc || !window.AndroidCalc.convert) {
    convResultEl.textContent = "\u2014";
    return;
  }

  const result = JSON.parse(window.AndroidCalc.convert(activeConversion.id, raw));
  convResultEl.textContent = result.ok ? pretty(result.value) : result.error;
  convResultEl.classList.toggle("error", !result.ok);
}

function initConverter() {
  if (!window.AndroidCalc || !window.AndroidCalc.catalog) return;
  catalog = JSON.parse(window.AndroidCalc.catalog());
  if (catalog.length) selectCategory(catalog[0].name);
}

tabCalc.addEventListener("click", () => showView("calc"));
tabConvert.addEventListener("click", () => showView("convert"));
convInputEl.addEventListener("input", runConversion);
initConverter();
// Flash the key from script as well as :active, so the inner glow always shows.
document.addEventListener("pointerdown", (event) => {
  const key = event.target && event.target.closest ? event.target.closest(".key") : null;
  if (!key) return;

  key.classList.add("pressed");
  const release = () => {
    key.classList.remove("pressed");
    document.removeEventListener("pointerup", release);
    document.removeEventListener("pointercancel", release);
  };
  document.addEventListener("pointerup", release);
  document.addEventListener("pointercancel", release);
});

/* ---------- long press on the expression: copy / paste ---------- */

const textMenu = document.getElementById("text-menu");
const textMenuCopy = document.getElementById("text-menu-copy");
const textMenuPaste = document.getElementById("text-menu-paste");

let pressTimer = 0;
let pressStart = null;

function shownExpression() {
  if (justEvaluated && answer !== null) return pretty(answer);
  return expression ? pretty(expression) : "0";
}

function showTextMenu(x, y) {
  const margin = 12;
  const width = textMenu.offsetWidth || 180;
  const left = Math.min(Math.max(x, width / 2 + margin), window.innerWidth - width / 2 - margin);
  const top = Math.max(y - 12, 60);

  textMenu.style.left = `${left}px`;
  textMenu.style.top = `${top}px`;
  textMenu.hidden = false;
  textMenuCopy.disabled = shownExpression() === "0" && !selectedText();
}

function hideTextMenu() {
  textMenu.hidden = true;
}

function clearSelection() {
  try {
    if (window.getSelection) {
      const selection = window.getSelection();
      if (selection && selection.removeAllRanges) selection.removeAllRanges();
    }
  } catch {
    /* nothing to clear */
  }
}

function selectedText() {
  try {
    return window.getSelection ? String(window.getSelection()).trim() : "";
  } catch {
    return "";
  }
}

function copyFromDisplay() {
  // Whatever the user selected, or the whole expression if nothing is selected.
  const value = selectedText() || shownExpression();
  if (!value) {
    hideTextMenu();
    return;
  }

  try {
    if (window.AndroidCalc && typeof window.AndroidCalc.copy === "function") {
      window.AndroidCalc.copy(value);
    } else if (window.navigator && window.navigator.clipboard) {
      window.navigator.clipboard.writeText(value);
    }
  } catch {
    /* nothing to do if the clipboard refuses */
  }

  hideTextMenu();
}

// Clipboard text is pasted as an expression, so keep only what the engine
// understands and normalise the symbols the display shows.
function sanitiseInput(text) {
  return String(text)
    .replace(/\u00d7/g, "*")
    .replace(/\u00f7/g, "/")
    .replace(/[\u2212\u2013\u2014]/g, "-")
    .replace(/\u221a/g, "sqrt")
    .replace(/[^0-9a-zA-Z+\-*/().^% ]/g, "")
    .trim();
}

function pasteIntoDisplay() {
  let text = "";

  try {
    if (window.AndroidCalc && typeof window.AndroidCalc.paste === "function") {
      const result = JSON.parse(window.AndroidCalc.paste());
      if (result.ok) text = result.text || "";
    } else if (window.navigator && window.navigator.clipboard && window.navigator.clipboard.readText) {
      text = "";
    }
  } catch {
    text = "";
  }

  const clean = sanitiseInput(text);
  hideTextMenu();
  if (!clean) return;

  if (justEvaluated) {
    expression = "";
    answer = null;
    justEvaluated = false;
  }

  expression += clean;
  render();
  updatePreview();
}

function beginLongPress(event) {
  pressStart = { x: event.clientX || 0, y: event.clientY || 0 };
  window.clearTimeout(pressTimer);
  pressTimer = window.setTimeout(() => {
    showTextMenu(pressStart.x, pressStart.y);
  }, 450);
}

function cancelLongPress() {
  window.clearTimeout(pressTimer);
}

expressionEl.addEventListener("pointerdown", beginLongPress);
expressionEl.addEventListener("pointermove", (event) => {
  if (!pressStart) return;
  const dx = (event.clientX || 0) - pressStart.x;
  const dy = (event.clientY || 0) - pressStart.y;
  if (Math.hypot(dx, dy) > 12) cancelLongPress();
});
expressionEl.addEventListener("pointerup", cancelLongPress);
expressionEl.addEventListener("pointercancel", cancelLongPress);
expressionEl.addEventListener("pointerleave", cancelLongPress);

// Android WebView also fires contextmenu on long press; keep one menu, not two.
expressionEl.addEventListener("contextmenu", (event) => {
  event.preventDefault();
  cancelLongPress();
  showTextMenu(event.clientX || window.innerWidth / 2, event.clientY || 120);
});

textMenuCopy.addEventListener("click", copyFromDisplay);
textMenuPaste.addEventListener("click", pasteIntoDisplay);

// Dismiss like Android does: any tap outside the menu, a scroll, a rotation,
// Escape, or a key press. Capture phase so it runs before the tapped element.
document.addEventListener(
  "pointerdown",
  (event) => {
    if (textMenu.hidden) return;
    if (textMenu.contains(event.target)) return;
    clearSelection();
    hideTextMenu();
  },
  true,
);

window.addEventListener("scroll", hideTextMenu, true);
window.addEventListener("resize", hideTextMenu);
window.addEventListener("orientationchange", hideTextMenu);

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideTextMenu();
});


render();
renderHistory();
