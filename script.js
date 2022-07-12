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

  if (!target.matches("button")) return;
  
  if (target.classList.contains("operator")) handleOperator(target.value); // formatting -> less lines
  
  if (target.classList.contains("buttonDot")) inputDecimal(target.value);
  
  if (target.classList.contains("all-clear")) resetCalculator();
  
  if (target.classList.contains("delete")) deletePrevious();
  
  if(!isNaN(Number.parseInt(target.value))) inputDigit(target.value);

  updateDisplay(); // always needs to be called
});

function inputDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;
  // Overwrite 'displayValue' if the current value is "o"
  if(!waitingForSecondOperand) return calculator.displayValue = displayValue === "0" ? digit : displayValue + digit; // same as if(waitingForSecondOperand === false) BUT carefull, will also be true if value is 0, null or undefined
  
  calculator.displayValue = digit;
  calculator.waitingForSecondOperand = false;
}

function inputDecimal(dot) {
  //if the "displayValue" property does not contain a decimal point
  if (calculator.displayValue.includes(dot)) return;

  calculator.displayValue += dot;
}

function handleOperator(nextOperator) {
  //destructure the properties on the calculator object
  const { firstOperand, displayValue, operator } = calculator;
  //"parseFloat" converts the string contents of 'displayValue' to a floating-point number
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) return calculator.operator = nextOperator; //formatting -> less lines

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
}

function calculate(firstOperand, secondOperand, operator) {
  if (operator === "+") return firstOperand + secondOperand; // we can omit the else because of the early return statement + formatting -> less lines
  if (operator === "-") return firstOperand - secondOperand;
  if (operator === "*") return firstOperand * secondOperand;
  if (operator === "/") return firstOperand / secondOperand;
  
  return secondOperand;
}

function deletePrevious() {
  if ("delete") { // not sure about this if check, this will always be true?
    return (calculator.displayValue = calculator.displayValue.slice(0, -1));
  }
}

function resetCalculator() {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  updateDisplay(); // update display value was forgotten
}
