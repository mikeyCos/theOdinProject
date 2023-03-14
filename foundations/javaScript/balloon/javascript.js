const sizeMax = 200;
let balloon = document.querySelector('p');

window.addEventListener('keydown', inflateBalloon, false);
window.addEventListener('keydown', deflateBalloon, false);

function inflateBalloon(event) {
    if(event.key == 'ArrowUp') {
        inflate();
    }
}

function deflateBalloon(event) {
    if(event.key === 'ArrowDown') {
        deflate();
    }
}

window.addEventListener("keydown", function(e) {
    if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);

function inflate () {
    currentSize = checkSize();
    balloon.style.fontSize = `${currentSize + (currentSize * 0.10)}px`;
}

function deflate (lastSize) {
    style = checkSize();
    currentSize = parseFloat(style);
    balloon.style.fontSize = `${currentSize - (currentSize * 0.10)}px`;
}

function checkSize () {
    let style = window.getComputedStyle(balloon, null).getPropertyValue('font-size');
    balloonSize = parseFloat(style);
    if (balloonSize > sizeMax) {
        balloon.textContent = '💥';
        window.removeEventListener('keydown', inflateBalloon, false);
        window.removeEventListener('keydown', deflateBalloon, false);
    }
    return balloonSize;
}