const resultsWindow = document.querySelector('.results-window');
const buttons = document.querySelector('.buttons');
buttons.addEventListener('click', verifyKey);
resultsWindow.textContent = 0;
window.addEventListener('keydown', verifyKey);

let check = false;
let num1 = 0;
let num2 = 0;
let number = '';
let operator;

function verifyKey(e) {
    let action;
    if (e.key) {
        action = e.key;
    } else if (e.target.textContent) {
        action = e.target.textContent;
    }
    console.log(action);
    switch (action) {
        case 'Delete':
        case 'c':
            num1 = 0;
            num2 = 0;
            number = '';
            operator = '';
            updateDisplay(num1);
            break;
        case 'Backspace':
        case 'backspace':
            number = number.toString().slice(0, -1);
            if (number.length == 0) {
                updateDisplay(0);
            } else {
                updateDisplay(number);
            }
            break;
        case '.':
            if (number.indexOf('.') === -1) {
                //if there is no decimal point
                number += '.';
                updateDisplay(number);
            }
            break;
        case '+':
        case '-':
        case '*':
        case '×':
        case '/':
        case '÷':
            if (number !== '' && num2 !== '') {
                operate(operator, num1, num2);
                number = '';
            }
            check = true;
            number = '';
            operator = action;
            break;
        case '𝑥²':
            if(!check) {    
                num1 = Math.pow(num1, 2);
                updateDisplay(num1);
            } else if (check) {
                num2 = Math.pow(num2, 2);
                updateDisplay(num2);
            }
            check = false;
            break;
        case '=':
        case 'Enter':
            if (number == '' && check) {
                num2 = num1;
            }
            operate(operator, num1, num2);
            number = '';
            check = false;
            break;
        default:
            if(isFinite(action)) {
                number += action;
                if(!check) {    
                    num1 = number;
                    num2 = '';
                } else if (check) {
                    num2 = number;
                }
                updateDisplay(number);
            }
    }
    e.target.blur(); //removes button selection after click
}

function updateDisplay(num) {
    if (num === Infinity) {
    resultsWindow.textContent = 'The answer is and will always be 42';
    } else {
        resultsWindow.textContent = num;
    }
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            num1 = add(parseFloat(a), parseFloat(b));
            break;
        case '-':
            num1 = subtract(parseFloat(a), parseFloat(b));
            break;
        case '*':
        case '×':
            num1 = multiply(parseFloat(a), parseFloat(b));
            break;
        case '/':
        case '÷':
            num1 = divide(parseFloat(a), parseFloat(b));
            break;
        case 'x²':
            return square(parseFloat(a));
        default:
            console.log(`default`);
    }
    updateDisplay(num1);
}

function add(a, b) {
    return a += b;
}

function subtract(a, b) {
    return a -= b;
}

function multiply(a, b) {
    return a *= b;
}

function divide(a, b) {
    return a /= b;
}

// debugging in console
// console.log(num1);
// console.log(num2);
// console.log(number);
// console.log(check);
// console.log(operator);