/* 

input
    1) prompt user to choose first number
        a) number needs to be appended until user is satisfied, perhaps up to
            8 digits or so
        b) input needs to come from the user on-screen interface
        c) number needs to be stored in a variable for later use
    2) prompt user to choose an operand
        a) the previous number needs to be stored in a variable 
    3) prompt user to choose second number
        a) the previous number and operand need to be stored and ready to operate
        b) number needs to be appended until user is satisfied, perhaps up to
            8 digits or so
    4) prompt user to allow for the result to appear after an operation, and
        be ready for the next operation
    5) prompt user to either clear what they have or hit equals to get final result

process
    1) addition = number1 + number2;
    2) subtract = number1 - number2;
    3) multiply = number1 * number2;
    4) division = number1 / number2;
    5) clear = number1 && number2 = "";
    6) equals = calls add, sub, mult, div functions

output
    1) print result of the users first number to the display
    2) print result of the users chosen operand to display
    3) print result of the users second number, with their chosen operand in front
    



*/


let screen = document.querySelector(".screen-area")
let numberButtons = document.getElementsByClassName("number")
let operatorButtons = document.getElementsByClassName("operator")
let miscButtons = document.getElementsByClassName("misc")


let currentNumber = "";
let previousNumber = "";
let operator = "";

let useNumberButtons = () => {
    for (let i = 0; i < numberButtons.length; i++) {
        numberButtons[i].addEventListener("click", () => {
            let number = numberButtons[i].innerText;
            appendNumber(number)
        })
    }
}



let appendNumber = (number) => {
    if (currentNumber.length === 10) {
        return;
    }
    currentNumber = currentNumber + number;
    console.log(currentNumber);
    populateDisplay(currentNumber)
}


let useOperatorButtons = () => {
    for (let i = 0; i < operatorButtons.length; i++) {
        operatorButtons[i].addEventListener("click", () => {
            if (currentNumber === "") return;
            if (previousNumber !== "") {
                operate(operator, currentNumber, previousNumber)
            }
            previousNumber = currentNumber;
            currentNumber = "";
            operator = operator + operatorButtons[i].innerText;
            if (operator.length > 1) return;
            populateDisplay()
        })
    }
}


let operate = () => {
    let prev = Number(previousNumber);
    let cur = Number(currentNumber);
    if (prev === NaN || cur === NaN) return;
    if (operator === "+") {
        result = prev + cur;
        currentNumber = result;
        populateDisplay(currentNumber);
    }
    else if (operator === "-") {
        result = prev - cur;
        currentNumber = result;
        populateDisplay(currentNumber);
    }
    else if (operator === "*") {
        result = prev * cur;
        currentNumber = result;
        populateDisplay(currentNumber);
    }
    else if (operator === "/") {
        result =  prev / cur;
        currentNumber = result;
        populateDisplay(currentNumber);
    }
    else {
        return;
    }
}



let useMiscButtons = (operator, currentNumber, previousNumber) => {
    for (let i = 0; i < miscButtons.length; i++) {
        miscButtons[i].addEventListener("click", () => {
            misc = miscButtons[i].innerText;
            if (misc === "AC") {
                clear();
            }
            if (misc === "=") {
                equals(operator, currentNumber, previousNumber);
            }
        })
    }
}

let clear = () => {
        currentNumber = "";
        previousNumber = "";
        operator = "";
        console.clear();
        populateDisplay();
}

let equals = (operator, currentNumber, previousNumber) => {
    console.log(operator, currentNumber, previousNumber);
    operate(operator, currentNumber, previousNumber)
}


let populateDisplay = (currentNumber) => {
    screen.textContent = currentNumber;
}



let calculator = () => {
    useNumberButtons()
    populateDisplay()
    useOperatorButtons()
    operate()
    useMiscButtons()
}

calculator()

