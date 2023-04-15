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

function verifyKey(e) {
    let action;
    if (e.key) {
        action = e.key;
        findButton(action);
    } else if (e.target.textContent) {
        action = e.target.textContent;
    }
    switch (action) {
        case 'Delete':
        case 'AC':
            num1 = 0;
            num2 = 0;
            number = '';
            operator = '';
            updateDisplay(num1);
            break;
        case 'Backspace':
        case 'backspace':
            number = number.toString().slice(0, -1);
            number.length == 0 ? updateDisplay(0) : updateDisplay(number);
            break;
        case '.':
            if (number.toString().indexOf('.') === -1) {
                number === '' ? number = '0.' : number += '.';
                updateDisplay(number);
            }
            break;
        case '⁺∕₋':
            let numberString = number.toString();
            if(numberString.length != 0 && number !== 0) {
                if (!numberString.includes('-')) {
                    numberString = '-' + numberString;
                    if (numberString.includes('.')) {
                        number = numberString;
                    } else {
                        number = +numberString;
                    }
                } else {
                    number = numberString.substring(1,numberString.length);
                }
                !check ? num1 = number : num2 = number;
            } else if (number !== 0) {
                num2 = -num1;
                number = num2;
            } else {
                number = num1;
            }

            if (number !== -0) {
                updateDisplay(number);
            }
            break;
        case '+':
        case '-':
        case '−':
        case '*':
        case '×':
        case '/':
        case '÷':
            if (number !== '' && num2 !== '' && check) {
                operate(operator, num1, num2);
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
            if (number === '' && check) {
                num2 = num1;
            }

            if (Math.abs(num1) === 0) {
                num1 = Math.abs(num1);
            }
            operate(operator, num1, num2);
            number = '';
            check = false;
            break;
        default:
            if(isFinite(action)) {
                if (number.toString().length < 12) {
                    number += action;
                    if (!number.toString().includes('.')) {
                        number = parseInt(number);
                    } else if (number.toString().includes('.') && action == 0) {
                        number = number.toString();
                    } else {
                        number = +number;
                    }
    
                    if(!check) {
                        num1 = number;
                        if (operator === '') {
                            num2 = 0;
                        }
                    } else if (check) {
                        num2 = number;
                    }
                    updateDisplay(number);
                    }
                }
    }
    e.target.blur(); //removes button selection after click
}

function findButton(key) {
    const buttonsArray = Array.from(buttons.children);
    buttonsArray.find(function(child) {
        if (child.dataset.key === key.toLowerCase() || child.className === key.toLowerCase()) {
            let className;
            var element;
            if (child.className.includes(' ')) {
                className = child.className.replace(/ /g, '.');
                element = document.querySelector(`.${className}`);
            } else {
                element = document.querySelector(`.${child.className}`);
            }
            element.classList.add('active');
            setTimeout(() => element.classList.remove('active'), 125);
        }
    });
}

function updateDisplay(num) {
    let displayText = num.toString();
    if (num === Infinity) {
        displayText = 'You what mate?';
    } else if (num.toString().length > 13) {
        if(displayText.includes('e')) {
            let exponent;
            exponent = displayText.substring(displayText.indexOf('e'), displayText.length);
            displayText = displayText.substring(0, 10) + exponent;
        } else if (!displayText.includes('.')) {
            displayText = num.toExponential(6);
        } else {
            displayText = displayText.substring(0, 10);
        }
    } else if (displayText.includes('e')) {
        displayText = num;
    } else {
        displayText = num.toLocaleString();
    }
    resultsWindow.textContent = displayText;
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

//for debugging in console
// console.log(`number: ${number}`);
// console.log(`num1: ${num1}`);
// console.log(`num2: ${num2}`);
// console.log(`operator: ${operator}`);
// console.log(`check: ${check}`);