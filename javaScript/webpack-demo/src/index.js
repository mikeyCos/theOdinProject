import _ from 'lodash';
//asset management
// import './style.css';
// import Icon from './bxl-git.svg';
// import Data from './data.xml';
// import Notes from './data.csv';
// import toml from './data.toml';
// import yaml from './data.yaml';
// import json from './data.json5';

// console.log(toml.title);
// console.log(toml.owner.name);
// console.log(yaml.title);
// console.log(yaml.owner.name);
// console.log(json.title);
// console.log(json.owner.name);
//asset management

import printMe from './print.js';
import myName from './myName.js';

function component() {
    const element = document.createElement('div');
    
    const paragraph = document.createElement('p');

    const btn = document.createElement('button');

    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    // element.classList.add('hello');

    // const myIcon = new Image();
    // myIcon.src = Icon;

    // element.appendChild(myIcon);
    // console.log(Data);

    // for (let i = 0; i < Notes.length; i++) {
    //     console.log(Notes[i])
    //     Notes[i].forEach(element => {
    //         console.log(element)
    //     });
    // }

    paragraph.textContent = myName('Bill');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);
    element.appendChild(paragraph);

    return element;
}

document.body.appendChild(component())