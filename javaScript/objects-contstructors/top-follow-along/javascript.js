const myObject = {
    property: 'Value!',
    otherProperty: 77,
    "obnoxious property": function() {
        //do stuff
    }
}

console.log(myObject.otherProperty);
console.log(myObject['obnoxious property']);

const playerOne = {
    name: 'tim',
    marker: 'X'
}

const playerTwo = {
    name: 'jenn',
    marker: 'O'
}

function printName(player) {
    console.log(player.name);
}

printName(playerOne);
printName(playerTwo);

function Player(name, marker) {
    this.name = name;
    this.marker = marker;
    this.sayName = function() {
        console.log(`Hi my name is ${name}`);
    }
}

const playerThree = new Player('steve', 'X');
const playerFour = new Player('quin', 'O');

playerThree.sayName();
playerFour.sayName();

function Student(name, grade) {
    this.name = name;
    this.grade = grade;
}

Student.prototype.sayName = function() {
    console.log(this.name);
}

Student.prototype.goToProm = function() {
    console.log(`My name is ${this.name}, would you like to... eh.. go to prom together?`);
}

const studentOne = new Student('Susan', 9);
studentOne.sayName();

const studentTwo = new Student('George', 12);
studentTwo.goToProm();

function Student() {

}

Student.prototype.sayName = function() {
    console.log(this.name);
}

EighthGrader.prototype = Object.create(Student.prototype);
NinthGrader.prototype = Object.create(Student.prototype);

function EighthGrader (name) {
    this.name = name;
    this.grade = 8;
}

function NinthGrader (name) {
    this.name = name;
    this.grade = 9;
}

NinthGrader.prototype.sayName = function() {
    console.log('HAHHAHAHAHAHAHA');
}

const studentThree = new NinthGrader('Josh');
studentThree.sayName();

const studentFour = new EighthGrader('Mary');
studentFour.sayName();

function Book(title, author, pages, read) {
    this.title,
    this.author,
    this.pages,
    this.read,
    this.info = function() {
        return(`${title} by ${author}, ${pages} pages, ${read}`)
    };
}

const book1 = new Book('Nineteen Eighty-Four', 'George Orwell', 328, 'not read yet');
console.log(book1.info());