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
    6) prompt user to delete single numbers

process
    1) addition = number1 + number2;
    2) subtract = number1 - number2;
    3) multiply = number1 * number2;
    4) division = number1 / number2;
    5) clear => number1 && number2 = "";
    6) equals = calls add, sub, mult, div functions
    7) delete button => remove last number inputted

output
    1) print result of the users first number to the display
    2) print result of the users chosen operand to display
    3) print result of the users second number, with their chosen operand in front
    4) print result of the calculations
    



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
            if (currentNumber.includes(".")) {
                if (number === ".") {
                    return;
                }
            }
            if (currentNumber === "" && previousNumber === "") {
                if (number === "0") {
                    return;
                }
            }
            else if (currentNumber === "" && previousNumber !== "" && operator !== "/") {
                if (number === "0") {
                    return;
                }
            }
            if (currentNumber === "Error: 0 not divisible") {
                clear();
            }
            appendNumber(number);
        })
    }
}

let appendNumber = (number) => {
    if (currentNumber.length === 18) {
        return;
    }
    currentNumber = currentNumber + number;
    console.log(currentNumber);
    populateDisplay(currentNumber)
}


let useOperatorButtons = () => {
    for (let i = 0; i < operatorButtons.length; i++) {
        operatorButtons[i].addEventListener("click", () => {
            if (currentNumber === "Error: 0 not divisible") return;
            if (currentNumber === "") return;
            if (previousNumber !== "") {
                operate();
                populateDisplay(currentNumber);
            }
            previousNumber = currentNumber;
            currentNumber = "";
            operator = operator + operatorButtons[i].innerText;
        })
    }
}


let operate = () => {
    let result;
    let prev = Number(previousNumber);
    let cur = Number(currentNumber);
    if (prev === NaN || cur === NaN) return;
    else if (operator === "+") {
        result = prev + cur;
    }
    else if (operator === "-") {
        result = prev - cur;
    }
    else if (operator === "*") {
        result = prev * cur;
    }
    else if (operator === "/") {
        if (cur === 0) {
            currentNumber = "Error: 0 not divisible";
            populateDisplay(currentNumber);
            return;
        }
        result =  prev / cur;
    }
    else {
        return;
    }
    currentNumber = result;
    operator = "";
    populateDisplay(currentNumber);
}



let useMiscButtons = () => {
    for (let i = 0; i < miscButtons.length; i++) {
        miscButtons[i].addEventListener("click", () => {
            misc = miscButtons[i].innerText;
            if (misc === "AC") {
                clear();
            }
            if (currentNumber === "Error: 0 not divisible") {
                return;
            }
            if (misc === "=") {
                equals();
            }
            if (misc === "DEL") {
                backspace();
            }
        })
    }
}

let clear = () => {
        currentNumber = "";
        previousNumber = "";
        operator = "";
        console.clear();
        populateDisplay(currentNumber);
}

let equals = () => {
    operate()
    populateDisplay(currentNumber);
}

let backspace = () => {
    currentNumber = currentNumber.slice(0, currentNumber.length - 1);
    populateDisplay(currentNumber);
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

