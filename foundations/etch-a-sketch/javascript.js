let canvas = document.querySelector('#canvas');
let gridContainer = document.querySelector('.grid-container');
let isColoring = false;


let sizeButton = document.querySelector('.size-btn');
sizeButton.addEventListener('click', getCanvasSize);

let multicolor = document.querySelector('.multicolor-btn');
multicolor.addEventListener('click', getColorful);

let solidcolor = document.querySelector('.solid-btn');
let eraser = document.querySelector('.eraser');

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
        gridItem.className = `grid-item item-${i}`;
        gridContainer.appendChild(gridItem);
    }
    addMouseDown();
    addMouseMove();
    addMouseUp();
}

// randomizes rgb values and puts them into an array
function getColorful() {
    let color;
    const rgb = [];
    for (i = 0; i < 3; i++) {
        rgb[i] = Math.floor(Math.random() * 255);
    }
    color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
    console.table(rgb); // for debugging
    console.log(color); // for debugging
    console.log(typeof color);  // for debugging
}

function paint() {
    if () {
        // call function that allows us to mouse down
    }
}

function addMouseMove() {
    gridContainer.addEventListener('mousemove', (e) => {
        if (isColoring) {
            console.log('hi');
        }
    });
}

function addMouseDown() {
    gridContainer.addEventListener('mousedown', (e) => {
        isColoring = true;
        console.log('bye');
    });
}

function addMouseUp() {
    window.addEventListener('mouseup', (e) => {
        if(isColoring) {
            isColoring = false;
        }
    })
}

// get color
function getColor() {

}