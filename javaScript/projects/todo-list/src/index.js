import './index.css';
import Icon from './assets/github-mark/github-mark.svg';
import printMe from './print.js';

function component() {
    const element = document.createElement('div');
    const btn = document.createElement('button');

    element.innerHTML = 'hello';
    element.classList.add('hello');

    const myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());

//main
    // 1. view all projects
    // 2. view all todos in each project
    // 3. expand a single todo to see/edit its details
    // 4. delete a todo

    //todo list item
        //delete
        //complete
        //reorder todo list item
    //create new todo list item

    

//todo list OBJECT
    //title
    //description OR checkboxes
        //default is description
        //if check
    //reminder
    //due date

//webpack external library: date-fns
