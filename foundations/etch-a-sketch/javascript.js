let canvas = document.querySelector('#canvas');
let gridContainer = document.querySelector('.grid-container');
let isPainting = false;
let toolChoice;

let sizeButton = document.querySelector('.btn-size');
sizeButton.addEventListener('click', getCanvasSize);

let buttons = document.querySelector('.buttons-container');
buttons.addEventListener('click', getTool);

let reset = document.querySelector('.btn-reset');

let changeCanvasColor = document.querySelector('.canvas-color');
changeCanvasColor.addEventListener('input', changeCanvas);

reset.addEventListener('click', (e) => {
    let nodes = gridContainer.childNodes;
    for (i = 0; i < nodes.length; i++) {
        nodes[i].style.backgroundColor = null;
    }
    gridContainer.style.backgroundColor = null;
});

function changeCanvas(event) {
    gridContainer.style.backgroundColor = event.target.value;
}

function getCanvasSize() {
    if(gridContainer != null) {
        gridContainer.remove();
    }
    let size = 0;
    do {
        size = parseInt(prompt('Enter a number between 1-100'));
    } while (isNaN(size) || size < 0 || size > 100);
    makeGrid(size);
}

// make grid
function makeGrid(size) {
    gridContainer = document.createElement('div');
    gridContainer.className = 'grid-container';
    gridContainer.setAttribute('style', `grid-template-columns: repeat(${size}, minmax(0.25em, 1em));`);
    canvas.appendChild(gridContainer);
    for (i = 1; i < (size * size) + 1; i++) {
        let gridItem = document.createElement('div');
        gridItem.classList.add(`grid-item`, `item-${i}`);
        gridContainer.appendChild(gridItem);
    }
    addMouseDown();
    addMouseMove();
    addMouseUp();
}

// figure out which tool was selected by user
function getTool(e) {
    toolChoice = e.target.className;
    console.log(toolChoice);
}

// randomizes rgb values and puts them into an array
function getColorful() {
    let color;
    const rgb = [];
    for (i = 0; i < 3; i++) {
        rgb[i] = Math.floor(Math.random() * 255);
    }
    color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    return color;
}

function addMouseMove() {
    gridContainer.addEventListener('mousemove', (e) => {
        if (isPainting) {
            console.log(e.type);
            changeColor(e);
        }
    });
}

function addMouseDown() {
    gridContainer.addEventListener('mousedown', (e) => {
        isPainting = true;
        changeColor(e);
        console.log(e.type);
    });
}

function addMouseUp() {
    window.addEventListener('mouseup', (e) => {
        if (isPainting) {
            isPainting = false;
        }
    })
}

// get the current element's color where the mouse is down on
function changeColor(e) {
    let currentElement = document.elementFromPoint(e.clientX, e.clientY);
    let color = window.getComputedStyle(currentElement).backgroundColor;
    console.log(color);
    // change color based on tool selection
    if (toolChoice == 'btn-multicolor') {
        currentElement.style.backgroundColor = getColorful();
    } else if (toolChoice == 'btn-eraser') {
        currentElement.style.backgroundColor = null;
    } else if (toolChoice == 'solid-color') {
        let colorPicker = document.querySelector('.solid-color');
        currentElement.style.backgroundColor = colorPicker.value;
    }
}