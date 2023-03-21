let container;
let outsideContainer = document.querySelector('.squares');
let promptButton = document.querySelector('#prompt-btn');
let colorChangeCounter = 0; // for debugging


promptButton.addEventListener('click', getCanvasSize);

function getCanvasSize() {
    let rows;
    let cols;
    do {
        rows = parseInt(prompt("Enter width", "Enter a number between 1 and 100"));
        console.log(rows);
    } while (rows > 100 || rows < 1 || isNaN(rows));
    
    do {
        cols = parseInt(prompt("Enter height", "Enter a number between 1 and 100"));
        console.log(cols);
    } while (cols > 100 || cols < 1 || isNaN(cols));
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
    let elementColor = currentElement.style.backgroundColor;
    // console.log(elementColor);   // for debugging
    // console.log(currentElement); // for debugging
    // console.log(currentElement.style.backgroundColor.includes('rgb'));   // for debugging
    if (currentElement.className == 'square') {
        currentElement.style.backgroundColor = getColor(elementColor);
        // console.log(currentElement.style.backgroundColor);   // for debugging
    }
}

// gets random RGB color
function getColor(color) {
    // let color = elementColor;
    let rgb = [];
    if (!(color.includes('rgb'))) {
        for (i = 0; i < 3; i++) {
            rgb.push(Math.floor(Math.random() * 255));
            color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
            colorChangeCounter = 0; // for debugging
        }
    } else {
        // console.log(color);  // for debugging
        colorChangeCounter++;   // for debugging
        console.log(colorChangeCounter);    // for debugging
        color = color.substring(4, color.indexOf(')'));
        rgb = color.split(", ");
        for (i = 0; i < 3; i++) {
            // color = `rgb(${rgb[0] - (Math.floor(rgb[0] * .10))}, ${rgb[1] - (Math.floor(rgb[1] * .10))}, ${rgb[2] - (Math.floor(rgb[2] * .10))})`;   // Math.floor rounds down
            // color = `rgb(${Math.floor(rgb[0] / 10)}, ${Math.floor(rgb[1] / 10)}, ${Math.floor(rgb[2] / 10)})`;   // goes black too quick
            // color = `rgb(${rgb[0] - (rgb[0] * .10)}, ${rgb[1] - (rgb[1] * .10)}, ${rgb[2] - (rgb[2] * .10)})`;   // values do not go below 4.5
            color = `rgb(${Math.floor(rgb[0] - (rgb[0] * .10))}, ${Math.floor(rgb[1] - (rgb[1] * .10))}, ${Math.floor(rgb[2] - (rgb[2] * .10))})`;   // goes black really slow
            // color = `rgb(${rgb[0] - (Math.ceil(rgb[0] * .10))}, ${rgb[1] - (Math.ceil(rgb[1] * .10))}, ${rgb[2] - (Math.ceil(rgb[2] * .10))})`; 
        }
        console.log(color); // for debugging
        // console.table(rgb);  // for debugging
    }
    return color;
}

// for testing
makeGrid(50, 50);