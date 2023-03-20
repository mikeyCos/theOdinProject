let container;
let outsideContainer = document.querySelector('.squares');
let promptButton = document.querySelector('#prompt-btn');

promptButton.addEventListener('click', getCanvasSize);

function getCanvasSize() {
    let rows;
    let cols;
    do {
        rows = parseInt(prompt("Enter width", "Enter a number between 1 and 100"));
        console.log(rows);
    } while (rows > 100 || rows < 0 || isNaN(rows));
    
    do {
        cols = parseInt(prompt("Enter height", "Enter a number between 1 and 100"));
        console.log(cols);
    } while (cols > 100 || cols < 0 || isNaN(cols));
    makeGrid(rows, cols);
}

function makeGrid (rows, cols) {
    if (container != undefined) {
        container.remove();
    }
    container = document.createElement('div');
    container.setAttribute('id', 'container');
    outsideContainer.appendChild(container);
    for (i = 0; i < rows; i++) {
        let row = document.createElement('div');
        container.appendChild(row);
        row.classList.add('row');
        for (j = 0; j < cols; j++) {
            let col = document.createElement('div');
            col.classList.add('square');
            row.appendChild(col);
        }
    }
    addListeners(getElement);
}

function addListeners(getElement) {
    let squares = document.querySelectorAll('.square');

    squares.forEach(square => {
        square.addEventListener('mouseenter', getElement);
    });
}

function getElement(e) {
    let currentElement = document.elementFromPoint(e.clientX, e.clientY)
    if (currentElement.className == 'square') {
        currentElement.style.backgroundColor = 'coral';
    }
}