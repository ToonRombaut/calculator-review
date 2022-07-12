//setting the default for calculator screen
const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function updateDisplay() {
  const display = document.getElementById("calcResult");
  display.value = calculator.displayValue;
}

updateDisplay();

//Setting the key-actions

const keys = document.querySelector(".calculator-buttons");
keys.addEventListener("click", (event) => {
  //access clicked element
  const { target } = event;

  /*const { target } = event; 
is equivalent to 
const target = event.target;*/

  //check if clicked element is a button & if not, exit from function

  if (!target.matches("button")) {
    return;
  }

  if (target.classList.contains("operator")) {
    handleOperator(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("buttonDot")) {
    inputDecimal(target.value);
    updateDisplay();
    return;
  }

  if (target.classList.contains("all-clear")) {
    resetCalculator();
    updateDisplay();
    return;
  }

  if (target.classList.contains("delete")) {
    deletePrevious();
    updateDisplay();
    return;
  }

  inputDigit(target.value);
  updateDisplay();
});

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  // Overwrite 'displayValue' if the current value is "o"
  if (waitingForSecondOperand === true) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
  } else {
    calculator.displayValue =
      displayValue === "0" ? digit : displayValue + digit;
  }
}

function inputDecimal(dot) {
  //if the "displayValue" property does not contain a decimal point
  if (!calculator.displayValue.includes(dot)) {
    //append the decimal point
    calculator.displayValue += dot;
  }
}

function handleOperator(nextOperator) {
  //destructure the properties on the calculator object
  const { firstOperand, displayValue, operator } = calculator;
  //"parseFloat" converts the string contents of 'displayValue' to a floating-point number
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
    calculator.operator = nextOperator;
    console.log(calculator);
    return;
  }

  //verify that 'firstOperand' is null and that the "inputValue" is not a 'nan' value
  if (firstOperand === null && !isNaN(inputValue)) {
    // update the firstOperand property
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = calculate(firstOperand, inputValue, operator);

    calculator.displayValue = String(result);
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
  console.log(calculator);
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    return firstOperand / secondOperand;
  }

  return secondOperand;
}

function deletePrevious() {
  if ("delete") {
    return (calculator.displayValue = calculator.displayValue.slice(0, -1));
  }
}

console.log(deletePrevious);

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  console.log(calculator);
}
