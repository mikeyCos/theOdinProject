console.log('hello world');

const resultsWindow = document.querySelector('.results-window');
const numbers = [];
// let resultsWindow = document.querySelector('.results-window').textContent;
// check if keydown is a number
// number pressed is show in resultsWindow
window.addEventListener('keydown', verifyKey);

function verifyKey(e) {
    // put entered numbers into an array
    // important keys:
        // 0-9, '/', '-', '=', '*', enter, backspace, delete
        switch (e.key) {
            case 'Enter':
            case '=':
                console.log('entered');
                break;
            case 'Backspace':
                console.log('backspaced');
                break;
            case 'Delete':
                console.log('deleted');
                break;
            case '-':
                console.log('deleted');
                break;
            case '+':
                console.log('deleted');
                break;
            case '/':
                console.log('deleted');
                break;
            case '*':
                console.log('deleted');
                break;
            default:
                if (isFinite(e.key)) {
                    if (resultsWindow.textContent == 0) {
                        resultsWindow.textContent = e.key;
                    } else {
                        resultsWindow.textContent += e.key;
                    }
                }
        }
    console.log(`e.code = ${e.code}`);
    console.log(`e.key = ${e.key}`);
}

function divide() {
    //divide stuff
}

function add() {
    //add stuff
}

function subtract() {
    //subtract stuff
}

function multiply() {
    //multiply stuff
}

function square() {
    // square stuff
}

// clear
// backspace