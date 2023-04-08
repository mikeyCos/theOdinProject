const resultsWindow = document.querySelector('.results-window');
const buttons = document.querySelector('.buttons');
buttons.addEventListener('click', verifyButton);
// buttons.addEventListener('click', verifyKey);
resultsWindow.textContent = 0;
window.addEventListener('keydown', verifyKey);

let check = false;
let num1 = 0;
let num2 = 0;
let number = '';
let operator;

function verifyButton(e) {
    console.log(`Class name: ${e.target.className}`);
    console.log(`Typeof e.target.className: ${typeof e.target.className}`);
    console.log(`e.target.textContent: ${e.target.textContent}`);
    console.log(`Typeof textContent: ${typeof e.target.textContent}`);
    switch (e.target.textContent) {
        case 'c':
            num1 = 0;
            num2 = 0;
            number = '';
            operator = '';
            updateDisplay(num1);
            break;
        case 'backspace':
            break;
        case '.':
            break;
        case '+':
        case '-':
        case '*':
        case '/':
            if (number !== '' && num2 !== '') {
                operate(operator, num1, num2);
                number = '';
            }
            check = true;
            number = '';
            operator = e.target.textContent;
            break;
        case '=':
            if (number == '' && check) {
                num2 = num1;
            }
            operate(operator, num1, num2);
            number = '';
            check = false;
            break;
        default:
            if(isFinite(e.target.textContent)) {
                number += e.target.textContent;
                if(!check) {    
                    num1 = number;
                    num2 = '';
                } else if (check) {
                    num2 = number;
                }
                updateDisplay(number);
            }
    }
}

function verifyKey(e) {
    switch (e.key) {
        case 'Delete':
            num1 = 0;
            num2 = 0;
            number = '';
            operator = '';
            updateDisplay(num1);
            break;
        case 'Backspace':
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
            // operator = 'add';
            // if (number !== '' && num2 !== '') {
            //     operate(operator, num1, num2);
            //     number = '';
            // }
            // check = true;
            // number = '';
            // operator = 'add';
            // break;
        case '-':
        case '*':
        case '/':
            console.log(e.key);
            if (number !== '' && num2 !== '') {
                operate(operator, num1, num2);
                number = '';
            }
            check = true;
            number = '';
            operator = e.key;
            break;
        case '=':
        case 'Enter':
            if (number == '' && check) {
                num2 = num1;
            }
            operate(operator, num1, num2);
            number = '';
            check = false;
            console.log(`e.key: ${e.key}`);     //for debugging
            break;
        default:
            if(isFinite(e.key)) {
                console.log(`e.code: ${e.code}`);   //for debugging
                console.log(`e.key: ${e.key}`);     //for debugging
                number += e.key;
                if(!check) {    
                    num1 = number;
                    num2 = '';
                    // updateDisplay(num1);
                } else if (check) {
                    num2 = number;
                    // updateDisplay(num2);
                }
                updateDisplay(number);
            }
    }
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
            num1 = multiply(parseFloat(a), parseFloat(b));
            break;
        case '/':
            num1 = divide(parseFloat(a), parseFloat(b));
            break;
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

function square() {
    // square stuff
}
// backspace

// debugging in console
// console.log(num1);
// console.log(num2);
// console.log(number);
// console.log(check);
// console.log(operator);