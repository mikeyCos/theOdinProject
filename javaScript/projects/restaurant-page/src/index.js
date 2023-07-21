import './styles.css';
import AssetImage from './assets/test.jpg';
import printMe from './print.js';

console.log('index.js running')

function imgComponent() {
    const element = document.createElement('div');
    const myImage = new Image();
    myImage.src = AssetImage;
    element.appendChild(myImage);

    element.onclick = printMe;

    return element;
}

document.body.appendChild(imgComponent());