const resultsWindow = document.querySelector('.results-window');
const numbers = [0];
resultsWindow.textContent = numbers[0];
let number = '';

window.addEventListener('keydown', verifyKey);
let operator = '';
let index = 0;

function verifyKey(e) {
        switch (e.key) {
            case 'Enter':
            case '=':
                operate(operator, numbers);
                updateArray(numbers);
                number = '';
                break;
            case 'Backspace':
                console.log('backspaced');
                break;
            case 'Delete':
                index = 0;
                number = '';
                numbers.pop();
                updateArray(0);
                console.log('deleted');
                break;
            case '+':
                index = 1;
                operator = e.key;
                number = '';
                break;
            case '-':
                break;
            case '/':
                break;
            case '*':
                break;
            default:
                if (isFinite(e.key)) {
                    number += e.key;
                    updateArray(number);
                }
        }
    console.log(`e.code = ${e.code}`);
    console.log(`e.key = ${e.key}`);
}

function updateArray(num) {
    numbers[index] = parseFloat(num);
    updateDisplay(numbers);
}

function updateDisplay(array) {
    resultsWindow.textContent = array[index];
}

function operate(operator, array) {
    index = 0;
    switch (operator) {
        case 'equal':
            // updateDisplay(array);
            break;
        case '+':
            array[0] = add(array);
            break;
        default:
            console.log('default');
    }
}

function add(array) {
    return array.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

function subtract(array) {
    return array.reduce((accumulator, currentValue) => accumulator - currentValue);
}

function multiply(array) {
    return array.reduce((accumulator, currentValue) => accumulator * currentValue);
}

function divide(array) {
    
    //divide stuff
}

function square() {
    // square stuff
}

// clear
// backspace