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

console.log(add(6, 3));
console.log(subtract(6, 3));
console.log(multiply(6, 3));
console.log(divide(6, 3));

let operand1;
let operator;
let operand2;

function operate(operand1, operator, operand2) {
  return `${operand1} ${operator} ${operand2}`;
}

let currentInput = "";

function display(value) {
  currentInput += value;
  document.querySelector(".display").textContent = currentInput;
}

const buttons = document.querySelectorAll("button");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (value !== undefined && !isNaN(value) || value === ".") {
      display(value);
    } else if (["+", "-", "*", "/"]) {
      display(action);
    } else if (action === "clear") {
      currentInput = "";
      document.querySelector(".display").textContent = "0";
    }
  })
})