let toolChoice;
let isPainting = false;
let canvas = document.querySelector('#canvas');
let sizeButton = document.querySelector('.btn-size');
let buttons = document.querySelector('.buttons-container');
let reset = document.querySelector('.btn-reset');
let canvasColorButton = document.querySelector('.canvas-color');
sizeButton.addEventListener('click', getCanvasSize);
buttons.addEventListener('click', getTool);
canvasColorButton.addEventListener('input', changeCanvasColor);

reset.addEventListener('click', (e) => {
    let nodes = canvas.childNodes;
    for (i = 0; i < nodes.length; i++) {
        nodes[i].style.backgroundColor = null;
        nodes[i].style.filter = null;
    }
    canvas.style.backgroundColor = null;
    
});

function changeCanvasColor(event) {
    canvas.style.backgroundColor = event.target.value;
}

function getCanvasSize() {
    if(canvas != null) {
        while (canvas.hasChildNodes()) {
            canvas.removeChild(canvas.firstChild);
        }
    }

    let size = 0;
    do {
        size = parseInt(prompt('Enter a number between 1-100'));
    } while (isNaN(size) || size < 0 || size > 100);
    makeGrid(size);
}


function makeGrid(size) {
    canvas.setAttribute('style', `grid-template-columns: repeat(${size}, minmax(0, 1fr)`);
    for (i = 1; i < (size * size) + 1; i++) {
        let gridItem = document.createElement('div');
        gridItem.classList.add(`grid-item`, `item-${i}`);
        canvas.appendChild(gridItem);
    }
    addMouseDown();
    addMouseOver();
    addMouseUp();
}

function getTool(e) {
    toolChoice = e.target.className;
}

function getColorful() {
    let color;
    const rgb = [];
    for (i = 0; i < 3; i++) {
        rgb[i] = Math.floor(Math.random() * 255);
    }
    color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    return color;
}

function darkenElement(brightnessProperty) {
    let brightnessValue;
    if (brightnessProperty == '') {
        brightnessProperty = `brightness(1)`;
    } else if (brightnessValue > 0 || brightnessValue == null) {
        brightnessValue = parseFloat(brightnessProperty.slice(11, brightnessProperty.indexOf(')')));
        brightnessValue = brightnessValue - 0.1;
        brightnessProperty = `brightness(${brightnessValue})`;
    }
    return brightnessProperty;
}

function addMouseOver() {
    canvas.addEventListener('mouseover', (e) => {
        if (isPainting) {
            changeColor(e);
        }
    });
}

function addMouseDown() {
    canvas.addEventListener('mousedown', (e) => {
        isPainting = true;
        changeColor(e);
    });
}

function addMouseUp() {
    window.addEventListener('mouseup', (e) => {
        if (isPainting) {
            isPainting = false;
        }
    })
}

function changeColor(e) {
    let currentElement = document.elementFromPoint(e.clientX, e.clientY);
    let color = window.getComputedStyle(currentElement).backgroundColor;
    if (toolChoice == 'btn-multicolor' && currentElement.classList.contains('grid-item')) {
        if (currentElement.style.backgroundColor == '') {
            currentElement.style.backgroundColor = getColorful();
        } else {
            currentElement.style.filter = darkenElement(currentElement.style.filter);
        }
    } else if (toolChoice == 'btn-eraser') {
        currentElement.style.backgroundColor = null;
        currentElement.style.filter = null;
    } else if (toolChoice == 'solid-color') {
        let colorPicker = document.querySelector('.solid-color');
        currentElement.style.backgroundColor = colorPicker.value;
        currentElement.style.filter = null;
    } 
}