// Get display and key container
const display = document.querySelector(".calculator-display");
const keys = document.querySelector(".calculator-keys");

//Back button 

document.querySelector('.back').addEventListener('click', function () {
  window.location.href = 'index.html';
});


// Calculator state
let firstNumber = "";
let secondNumber = "";
let operator = null;

// Symbols for screen display
const operatorSymbols = {
  add: "+",
  subtract: "-",
  multiply: "x",
  divide: "÷",
};

// Basic operation functions
const add = (a, b) => a + b;           // addition
const subtract = (a, b) => a - b;      // subtraction
const multiply = (a, b) => a * b;      // multiplication
const divide = (a, b) => (b === 0 ? Infinity : a / b); // division with zero check

// Round result to avoid long floating-point decimals (2 decimals)
const roundResult = (num) => parseFloat(num.toFixed(2));

// Choose correct operation
const calculate = (a, b, op) => {
  switch (op) {
    case "add": return add(a, b);
    case "subtract": return subtract(a, b);
    case "multiply": return multiply(a, b);
    case "divide": return divide(a, b);
    default: return b;
  }
};

// Update calculator screen
const updateDisplay = () => {
  let text = "";
  if (firstNumber !== "") text += firstNumber;

  if (operator) {
    if (operator === "subtract" && secondNumber.startsWith("-")) {
      text += operatorSymbols.add;
      text += secondNumber.substring(1); 
    } else {
      text += operatorSymbols[operator];
      if (secondNumber !== "") text += secondNumber;
    }
  }
  
  display.textContent = text || "0";
};

// Reset calculator
const clearCalculator = () => {
  firstNumber = "";
  secondNumber = "";
  operator = null;
  display.textContent = "0";
};

// Handle number input
const inputDigit = (digit) => {
  if (!operator) firstNumber += digit;
  else secondNumber += digit;
  updateDisplay();
};

// Handle decimal input
const inputDecimal = () => {
  if (!operator && !firstNumber.includes(".")) {
    firstNumber = firstNumber === "" ? "0." : firstNumber + ".";
  } else if (operator && !secondNumber.includes(".")) {
    secondNumber = secondNumber === "" ? "0." : secondNumber + ".";
  }
  updateDisplay();
};

// Set the operator
const setOperator = (opName) => {
  if (firstNumber === "") return;
  if (!secondNumber) {
    operator = opName;
    updateDisplay();
    return;
  }
  doEquals(); // 
  operator = opName;
  updateDisplay();
};

// Toggle negative/positive
const toggleSign = () => {
  if (operator) {
    if (secondNumber !== "") {
      secondNumber = String(parseFloat(secondNumber) * -1);
    }
  } else if (firstNumber !== "") {
    firstNumber = String(parseFloat(firstNumber) * -1);
  }
  updateDisplay();
};

// Convert to percent (with rounding)
const applyPercent = () => {
  if (operator && secondNumber !== "") {
    const value = parseFloat(secondNumber) / 100;
    secondNumber = String(roundResult(value));
  } else if (!operator && firstNumber !== "") {
    const value = parseFloat(firstNumber) / 100;
    firstNumber = String(roundResult(value));
  }
  updateDisplay();
};

// Perform calculation on equals
const doEquals = () => {
  if (!operator || secondNumber === "") return;

  const a = parseFloat(firstNumber);
  const b = parseFloat(secondNumber);
  const result = calculate(a, b, operator);

  if (!isFinite(result)) {
    display.textContent = "Error";
    firstNumber = "";
    secondNumber = "";
    operator = null;
    return;
  }

  const rounded = roundResult(result);
  firstNumber = String(rounded);
  secondNumber = "";
  operator = null;
  updateDisplay();
};

// Handle button clicks
keys.addEventListener("click", (event) => {
  if (!event.target.matches("button")) return;

  const key = event.target;
  const action = key.dataset.action;
  const keyValue = key.textContent;

  if (!action) {
    inputDigit(keyValue);
    return;
  }

  switch (action) {
    case "decimal": inputDecimal(); break;
    case "clear": clearCalculator(); break;
    case "sign": toggleSign(); break;
    case "percent": applyPercent(); break;
    case "equals": doEquals(); break;
    case "add":
    case "subtract":
    case "multiply":
    case "divide":
      setOperator(action);
      break;
  }
});

// Keyboard support
const handleKeyDown = (event) => {
  const key = event.key;

  if (key >= "0" && key <= "9") { inputDigit(key); return; }
  if (key === ".") { inputDecimal(); return; }

  if (key === "+" || key === "-" || key === "*" || key === "/") {
    const opName =
      key === "+" ? "add" :
      key === "-" ? "subtract" :
      key === "*" ? "multiply" : "divide";
    setOperator(opName);
    return;
  }

  if (key === "Enter" || key === "=") {
    event.preventDefault();
    doEquals();
    return;
  }
};

document.addEventListener("keydown", handleKeyDown);

// Start at 0
updateDisplay();