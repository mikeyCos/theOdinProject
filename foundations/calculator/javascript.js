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
            number = '';
            break;
        case 'Backspace':
            break;
        case 'Delete':
            number = '';
            numbers.pop();
            updateArray(0);
            console.log('deleted');
            break;
        case '+':
            // operator = e.key;
            // operate(operator, numbers);
            // index = 1;
            // number = '';
            // break;

            operator = e.key;
            if (number !== '') {
                operate(operator, numbers);
            } 
            else if (number == '' && numbers.length !== 2) {
                // numbers[1] = numbers[0];
                // operate(operator, numbers);
            }
            index = 1;
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
}

function updateArray(num) {
    numbers[index] = parseFloat(num);
    updateDisplay(numbers);
    console.log(numbers);
}

function updateDisplay(array) {
    resultsWindow.textContent = array[index];
}

function operate(operator, array) {
    index = 0;
    // debugger
    switch (operator) {
        case 'equal':
            updateDisplay(array);
            break;
        case '+':
            updateArray(add(array));
            break;
        case '-':
            updateArray(subtract(array));
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