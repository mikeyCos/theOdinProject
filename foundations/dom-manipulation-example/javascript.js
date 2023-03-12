const para1 = document.createElement('p');
para1.textContent = "Hey I'm red!";
para1.style.cssText = 'color: red';
document.body.appendChild(para1);

const h3 = document.createElement(`h3`);
h3.textContent = `I'm a blue h3!`;
h3.style.cssText = `color: blue`;
document.body.appendChild(h3);

const divStuff = document.createElement(`div`);
divStuff.style.cssText = `border-color: black; background-color: pink`;
document.body.appendChild(divStuff);

const h1 = document.createElement(`h1`);
h1.textContent = 'I\'m in a div';
divStuff.appendChild(h1);

const para2 = document.createElement('p');
para2.textContent = 'ME TOO!'
divStuff.appendChild(para2);

// method 2
// const button = document.querySelector('#btn');
// button.onclick = () => alert(`Hello World!`);

// method 3
const button = document.querySelector('#btn');
// button.addEventListener(`click`, () => {
//     alert(`Hello World!`);
// });

// OR using named functions
let alertFunction = () => alert(`YAY! YOU DID IT!`);
// button.addEventListener(`click`, alertFunction);
button.addEventListener(`click`, function (e) {
    e.target.style.background = `blue`;
})