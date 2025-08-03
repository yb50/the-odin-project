function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

let operand1;
let operator;
let operand2;
let currentInput = "";

function operate(operand1, operator, operand2) {
  const a = parseFloat(operand1);
  const b = parseFloat(operand2);

  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      if (b === 0) return "Nice try!";
      return divide(a, b);
    default:
      return "Error";
  }
}

function display(value) {
  if (value === "." && currentInput.includes("."))
    return;
  
  currentInput += value;
  document.querySelector(".display").textContent = currentInput;
}

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (value !== undefined && (!isNaN(value) || value === ".")) {
      if (resultDisplayed) {
        currentInput = "";
        document.querySelector(".display").textContent = "";
        resultDisplayed = false;
      }
      display(value);
    } else if (["+", "-", "*", "/"].includes(action)) {
      if (
        typeof operand1 === "string" &&
        typeof operand2 === "string" &&
        currentInput !== ""
      ) {
        operand2 = currentInput;
        let result = operate(operand1, operator, operand2);

        if (typeof result === "number" && !Number.isInteger(result)) {
          result = parseFloat(result.toFixed(3));
        }

        document.querySelector(".display").textContent = result;
        resultDisplayed = true;

        
      }
    }
  });
});