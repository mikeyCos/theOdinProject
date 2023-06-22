//constructor function
function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.sayName = function() {
    console.log(this.name);
}

const jeff = new Person('Jeff', 33);
jeff.sayName();

//factory function
const personFactory = (name, age) => {
    const sayHello = () => console.log(`Hello! My name is ${name}`);
    return { name, age, sayHello };
};

const quin = personFactory('Quin', 35);
quin.sayHello();


const name = `Maynard`;
const color = `red`;
const number = 21;
const food = `soup`;

console.log(name, color, number, food);
//key value pairs
console.log({name, color, number, food});

const colors = {
    reds: ['B23A48', 'FCB9B2', 'FED0BB'],
    blue: '19297C',
}

for (const key in colors) {
    if (typeof colors[key] === 'object') {
        for (const red of colors[key]) {
            console.log(`Red at ${colors[key].indexOf(red)}: \n ${red}`);
            console.log({red});
        }
    } else {
        console.log(`Blue: ${colors[key]}`);
    }
}


//scope
let a = 17;

const func = x => {
    let a = x;
    return a;
};

func(99);

console.log(a); //logs 17
console.log(func(99));

const FactoryFunction = string => {
    const capitalizeString = () => string.toUpperCase(); //private function
    const printString = () => console.log(`----${capitalizeString()}----`);
    return { printString }; //this is closure
}

const taco = FactoryFunction('taco');
// printString(); //error
// capitalizeString(); //error
// taco.capitalizeString(); //error, printString is being returned
taco.printString(); //TACO

const counterCreator = () => {
    let count = 0;
    return () => {
        console.log(count);
        count++;
    };
};

const counter = counterCreator();

counter();
counter();
counter();
counter();

//more factory functions
const Player = (name, level) => {
    let health = level * 2;
    const getLevel = () => level;
    const getName = () => name;
    const die = () => {

    };
    const damage = x => {
        health -= x;
        if (health <= 0) {
            die();
        }
    };
    const attack = enemy => {
        if (level < enemy.getLevel()) {
            damage(1);
            console.log(`${enemy.getName()} has damaged ${name}`);
        }
        if (level >= enemy.getLevel()) {
            enemy.damage(1);
            console.log(`${name} has damaged ${enemy.getName()}`);
        }
    };
    return {attack, damage, getLevel, getName};
};

const jimmie = Player('jim', 10);
const badGuy = Player('jeff', 5);
jimmie.attack(badGuy);

const PersonPlus = (name) => {
    const sayName = () => console.log(`My name is ${name}`);
    return {sayName};
}

// const Nerd = (name) => {
//     const {sayName} = Person(name);
//     const doSomethingNerdy = () => console.log(`nerd stuff`);
//     return {sayName, doSomethingNerdy};
// }

const Nerd = (name) => {
    const prototype = PersonPlus(name);
    const doSomethingNerdy = () => console.log(`nerd stuff`);
    return Object.assign({}, prototype, {doSomethingNerdy});
}

const rico = Nerd('Rico');

rico.sayName();
rico.doSomethingNerdy();

//module
const calculator = (() => {
    const add = (a, b) => a + b;
    const sub = (a, b) => a - b;
    const mul = (a, b) => a * b;
    const div = (a, b) => a / b;
    return {
        add,
        sub,
        mul,
        div,
    };
})(); //parenthesis at end the function is immediately called
//IIFE - Immediately Invoked Function Expression

calculator.add(3, 5);
calculator.sub(6, 2);
calculator.mul(14, 5534);

console.log(calculator.add(2, 4));

//factory method that returns an object
const Pizza = (toppings, cheese) => {
    const pizzaInfo = `Your pizza will have ${toppings.join(', ')}, and ${cheese} cheese.`;
    const employee = 'Oscar';
    const bakePizza = () => {
        console.log(`Your ${cheese} cheese pizza with ${toppings.join(', ')} was inserted in the oven by ${employee}`);
    }
    return {
        bakePizza,
    }
}

const pizzaOne = Pizza(['pepperoni, spinach, mushrooms'], 'mozzarella');
console.log(pizzaOne.bakePizza());