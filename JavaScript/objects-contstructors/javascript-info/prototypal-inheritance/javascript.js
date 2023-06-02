// https://javascript.info/prototype-inheritance

// Working with prototype
// Here’s the code that creates a pair of objects, then modifies them.
// Which values are shown in the process?

let animal = {
    jumps: null
};

let rabbit = {
    __proto__: animal,
    jumps: true
};

console.log(rabbit.jumps); // ? (1) true

delete rabbit.jumps;

console.log(rabbit.jumps); // ? (2) null

delete animal.jumps;

console.log(rabbit.jumps); // ? (3) undefined

/////////////////////////////////////////////////////////////////////

//Searching algorithm
// The task has two parts.
// Given the following objects:

let head = {
    glasses: 1
};

let table = {
    pen: 3
};

let bed = {
    sheet: 1,
    pillow: 2
};

let pockets = {
    money: 2000
};

Object.setPrototypeOf(pockets, bed);
Object.setPrototypeOf(bed, table);
Object.setPrototypeOf(table, head);

console.log(`pockets.pen: ${pockets.pen}`);
console.time(pockets.glasses);
console.timeEnd(pockets.glasses);
console.log(`bed.glasses: ${bed.glasses}`);

console.log(`head.glasses: ${head.glasses}`);
console.time(head.glasses);
console.timeEnd(head.glasses);

// 1. Use __proto__ to assign prototypes in a way that any property lookup will follow the path: pockets → bed → table → head. For instance, pockets.pen should be 3 (found in table), and bed.glasses should be 1 (found in head).
// 2. Answer the question: is it faster to get glasses as pockets.glasses or head.glasses? Benchmark if needed.

/////////////////////////////////////////////////////////////////////

// Where does it write?
// If we call rabbit.eat(), which object receives the full property: animal or rabbit?
// ANSWER: Rabbit

// let animal = {
//     eat() {
//         this.full = true;
//     }
// };

// let rabbit = {
//     __proto__: animal
// };

// rabbit.eat();

/////////////////////////////////////////////////////////////////////

// Why are both hamsters full?
// We have two hamsters: speedy and lazy inheriting from the general hamster object.
// When we feed one of them, the other one is also full. Why? How can we fix it?

let hamster = {
    stomach: [],

    eat(food) {
        //this.stomach.push(food)does NOT work
        this.stomach = [food];
    }
};

let speedy = {
    __proto__: hamster
    // optional
    // stomach: [];
};

let lazy = {
    __proto__: hamster
    // optional
    // stomach: [];
};

// This one found the food
speedy.eat("apple");
console.log(speedy.stomach); // apple

// This one also has it, why? fix please.
// lazy.eat("carrot");
console.log(lazy.stomach); // apple