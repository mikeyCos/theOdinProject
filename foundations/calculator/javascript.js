const resultsWindow = document.querySelector('.results-window');
resultsWindow.textContent = 0;
window.addEventListener('keydown', verifyKey);
let check = false;
let num1 = 0;
let num2 = '';
let number = '';
let operator;

function verifyKey(e) {
    switch (e.key) {
        case 'Delete':
            num1 = 0;
            num2 = '';
            number = '';
            operator = '';
            updateDisplay(num1);
            break;
        case 'Backspace':
            //should not delete last answer
            number = Number(number.toString().slice(0, -1));
            if (!check) {
                num1 = number;
            } else {
                num2 = number;
            }
            updateDisplay(number);
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
                    updateDisplay(num1);
                } else if (check) {
                    num2 = number;
                    updateDisplay(num2);
                }
            }
    }
}

function updateDisplay(num) {
    resultsWindow.textContent = num;
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

// clear
// backspace