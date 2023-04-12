const resultsWindow = document.querySelector('.results-window');
const buttons = document.querySelector('.buttons');
buttons.addEventListener('mouseup', verifyKey);
resultsWindow.textContent = 0;
window.addEventListener('keydown', verifyKey);

let check = false;
let num1 = 0;
let num2 = 0;
let number = '';
let operator;

// valid keys:
    // delete, backspace, ., +, -, *, /, +, Enter, =, 0-9
function verifyKey(e) {
    let action;
    console.log(`e.key: ${e.key}`);
    console.log(`e.code: ${e.code}`);
    if (e.key) {
        action = e.key;
        // findButton(action);
    } else if (e.target.textContent) {
        action = e.target.textContent;
    }
    switch (action) {
        case 'Delete':
        case 'AC':
            findButton(action);
            num1 = 0;
            num2 = 0;
            number = '';
            operator = '';
            updateDisplay(num1);
            break;
        case 'Backspace':
        case 'backspace':
            findButton(action);
            number = number.toString().slice(0, -1);
            if (number.length == 0) {
                updateDisplay(0);
            } else {
                updateDisplay(number);
            }
            break;
        case '.':
            findButton(action);
            if (number.toString().indexOf('.') === -1) {
                number === '' ? number = '0.' : number += '.';
                updateDisplay(number);
            }
            break;
        case '⁺/₋':
            debugger
            if (number !== '') {
                if (number.toString().indexOf('-') === -1) {
                    number = -number;
                } else {
                    number = Math.abs(number);
                }

                if(!check) {    
                    num1 = number;
                } else if (check) {
                    num2 = number;
                }
            updateDisplay(number);
            } else {
                if (num1.toString().indexOf('-') === -1) {
                    num1 = -num1;
                } else {
                    num1 = Math.abs(num1);
                }
            updateDisplay(num1);
            }
            break;
        case '+':
        case '-':
        case '−':
        case '*':
        case '×':
        case '/':
        case '÷':
            findButton(action);
            if (number !== '' && num2 !== '') {
                operate(operator, num1, num2);
                // number = '';
            }
            check = true;
            number = '';
            operator = action;
            break;
        case '𝑥²':
            if(!check) {    
                num1 = Math.pow(num1, 2);
                updateDisplay(num1);
            } else if (check && number === '') {
                num2 = num1;
                num2 = Math.pow(num1, 2);
                updateDisplay(num2);
            } else {
                num2 = Math.pow(num2, 2);
                updateDisplay(num2);
            }
            number = num2;
            break;
        case '=':
        case 'Enter':
            findButton(action);
            if (number === '' && check) {
                num2 = num1;
            }
            operate(operator, num1, num2);
            number = '';
            check = false;
            break;
        default:
            if(isFinite(action)) {
                findButton(action);
                number += action;
                if (number.indexOf('.') === -1) {
                    number = parseInt(number);
                }

                if(!check) {
                    num1 = number;
                    num2 = '';  // why was this 0?
                } else if (check) {
                    num2 = number;
                }
                updateDisplay(number);
                }
    }
    e.target.blur(); //removes button selection after click
}

function findButton(key) {
    const buttonsArray = Array.from(buttons.children);
    buttonsArray.find(function(child) {
        if (child.textContent.includes(key.toLowerCase()) || child.className.includes(key.toLowerCase())) {
            let className;
            var test;
            if (child.className.includes(' ')) {
                className = child.className.replace(/ /g, '.');
                test = document.querySelector(`.${className}`);
            } else {
                test = document.querySelector(`.${child.className}`);
            }
            test.classList.add('active');
            
            setTimeout(() => test.classList.remove('active') , 2);
        }
    });
}

function updateDisplay(num) {
    // console.log(`length of num: ${num.length}`); //for debugging
    if (num === Infinity) {
    resultsWindow.textContent = 'You what mate?';
    } else if (num.toString().length > 15) {
        debugger;
        resultsWindow.textContent = +num.toPrecision(10);
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
        case '−':
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