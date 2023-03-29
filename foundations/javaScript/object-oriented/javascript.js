// 27-28 MAR 2023
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics
const person = {
    name: {
        first: 'Bob', 
        last: 'Smith',
    },
    age: 32,
    bio() {
        console.log(`${this.name.first} ${this.name.last} is ${this.age} years old.`);
    },
    introduceSelf() {
        console.log(`Hi! I'm ${this.name.first}`);
    },
};

const myDataName = 'height';
const myDataValue = '1.75m';
person[myDataName] = myDataValue;

// function createPerson(name) {
//     const obj = {};
//     obj.name = name;
//     obj.introduceSelf = function() {
//         console.log(`Hi! I'm ${this.name}.`);
//     };
//     return obj;
// }

function Person(name) {
    this.name = name;
    this.introduceSelf = function() {
        console.log(`Hi! I'm ${this.name}.`);
    };
}

const salva = new Person('Salva');
// ***********************************************
// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Test_your_skills:_Object_basics
// Object basics 1
// In this task you are provided with an object literal, and your tasks are to

// Store the value of the name property inside the catName variable, using bracket notation.
// Run the greeting() method using dot notation (it will log the greeting to the browser's console).
// Update the color property value to black.
// Try updating the live code below to recreate the finished example:

// const cat = {
//     name : 'Bertie',
//     breed : 'Cymric',
//     color : 'white',
//     greeting: function() {
//         console.log('Meow!');
//     }
// }

// ANSWER BETWEEN THIS
// let catName = cat['name'];
// cat.greeting();
// ANSWER BETWEEN THIS

// const section = document.querySelector('section');

// let para1 = document.createElement('p');
// let para2 = document.createElement('p');

// para1.textContent = `The cat's name is ${ catName }.`;
// para2.textContent = `The cat's color is ${ cat.color }.`;

// section.appendChild(para1);
// section.appendChild(para2);
// ***********************************************
// In our next task, we want you to have a go at creating your own object literal to represent one of your favorite bands. The required properties are:

// name: A string representing the band name.
// nationality: A string representing the country the band comes from.
// genre: What type of music the band plays.
// members: A number representing the number of members the band has.
// formed: A number representing the year the band formed.
// split: A number representing the year the band split up, or false if they are still together.
// albums: An array representing the albums released by the band. Each array item should be an object containing the following members:
// name: A string representing the name of the album.
// released: A number representing the year the album was released.
// Include at least two albums in the albums array.

// Once you've done this, you should then write a string to the variable bandInfo, which will contain a small biography detailing their name, nationality, years active, and style, and the title and release date of their first album.

// Try updating the live code below to recreate the finished example:
let bandInfo = '';

// ANSWER BETWEEN THIS
const patTheBunny = {
    name: 'Pat The Bunny',
    nationality: 'United States',
    genre: 'Folk Punk',
    members: 'Patrick Schneeweis',
    formed: 2010,
    split: 2016,
    albums: [
        {name: 'Die the Nightmare', released: 2011},
        {name: 'Probably Nothing, Possibly Everything', released: 2014}
    ],
};

// bandInfo = `${patTheBunny.name}
// ${patTheBunny.nationality}
// ${patTheBunny.genre}
// ${patTheBunny.members}
// ${patTheBunny.formed}
// ${patTheBunny.split}
// ${patTheBunny.albums[0].name}
// ${patTheBunny.albums[0].released}
// ${patTheBunny.albums[1].name}
// ${patTheBunny.albums[1].released}`;

// OR
for (let prop in patTheBunny) {
    if (prop != 'albums') {
        bandInfo += prop + ': ' + patTheBunny[prop] + '\n';
    } else {
        for (i = 0; i < patTheBunny[prop].length; i++) {
            for (let key in patTheBunny[prop][i]) {
                bandInfo +=  patTheBunny[prop][i][key] + ' ';
            }
            bandInfo += '\n';
        }
    }
}
// // ANSWER BETWEEN THIS

const section = document.querySelector('section');
let para1 = document.createElement('p');
para1.setAttribute('style', 'white-space: pre;'); // for albums
para1.textContent = bandInfo;
section.appendChild(para1);
// ***********************************************
// In this task, we want you to return to the cat object literal from Task 1. We want you to rewrite the greeting() method so that it logs "Hello, said Bertie the Cymric." to the browser's console, but in a way that will work across any cat object of the same structure, regardless of its name or breed.

// When you are done, write your own object called cat2, which has the same structure, exactly the same greeting() method, but a different name, breed, and color.

// Call both greeting() methods to check that they log appropriate greetings to the console.

// Try updating the live code below to recreate the finished example:
// const cat = {
//     name : 'Bertie',
//     breed : 'Cymric',
//     color : 'white',
//     greeting: function() {
// // ANSWER BETWEEN THIS
//         console.log(`Hello, said ${this.name} the ${this.color} ${this.breed}.`);
//     }
// }

// const cat2 = {
//     name : 'Tom',
//     breed : 'Scottish Fold',
//     color : 'grey',
//     greeting: function() {
//         console.log(`Hello, said ${this.name} the ${this.color} ${this.breed}.`);
//     }
// }
// ANSWER BETWEEN THIS
// ***********************************************
// In the code you wrote for Task 3, the greeting() method is defined twice, once for each cat. This isn't ideal (specifically, it violates a principle in programming sometimes called DRY or "Don't Repeat Yourself").

// In this task we want you to improve the code so greeting() is only defined once, and every cat instance gets its own greeting() method. Hint: you should use a JavaScript constructor to create cat instances.

// Try updating the live code below to recreate the finished example:
function Cat(name, breed, color) {
    this.name = name;
    this.breed = breed;
    this.color = color;
    this.greeting = function () {
        console.log(`Hello, said ${this.name} the ${this.color} ${this.breed}.`);
    }
}

const bertie = new Cat('Bertie', 'Cymric', 'white');
const tom = new Cat('Tom', 'Scottish Fold', 'grey');
