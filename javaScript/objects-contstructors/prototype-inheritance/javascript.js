class Dogs extends Cats {
    constructor(breed, age, name) {
        // super(breed, age, name)
        super()
        Cats.call(this, breed, age, name);
    }
    
    bark(length) {
        let bark = 'bark';
        // when using an arrow function, 'this' will reference the window object
        for (let i = 0; i < length; i++) {
            for(let j = 0; j < (Math.random() * 10);j++) {
                bark += ' bark'
            }
            console.log(`${bark}`);
        }
    }
}

function Cats(breed, age, name) {
    this.breed = breed
    this.age = age
    this.name = name
}

// Cats.prototype.sleep
// Cats.prototype.eat
// Cats.prototype.meow
// are prototypal instantiation
Cats.prototype.sleep = function() {
    return `${this.name} is sleeping right now.`
}

Cats.prototype.eat = function() {
    if(this.constructor.name === 'Dogs') {
        return `${this.name}, a ${this.breed}, demands food.`
    } else {
        return `${this.name}, a ${this.breed}, is ready to eat right meow.`
    }
}

Cats.prototype.meow = (length) => {
    let meow = 'me';
    // when using an arrow function, 'this' will reference the window object
    for (let i = 0; i < length; i++) {
        for(let j = 0; j < (Math.random() * 10);j++) {
            meow += 'eee'
        }
        console.log(`${meow}EEEOW`);
    }
}

// Object.setPrototypeOf(Dogs.prototype, Cats.prototype)

const catOne = new Cats('scottish fold', 3, 'Hank');
console.log(catOne.sleep());
console.log(catOne.eat());
catOne.meow(4);

const dogOne = new Dogs('husky', 10, 'Bill');
console.log(dogOne.sleep());
console.log(dogOne.eat());
dogOne.bark(3);

console.log('Object.getPrototypeOf(dogOne) === Dogs.prototype: ' + (Object.getPrototypeOf(dogOne) === Dogs.prototype).toString());
console.log('Object.getPrototypeOf(Dogs.prototype) === Cats.prototype: ' + (Object.getPrototypeOf(Dogs.prototype) === Cats.prototype).toString());
console.log('Object.getPrototypeOf(dogOne) === Dogs.prototype: ' + (Object.getPrototypeOf(catOne) === Cats.prototype).toString());

for (let key in dogOne) {
    if (dogOne.hasOwnProperty(key)) {
        console.log(`Key: ${key} || Value: ${dogOne[key]} `);
    }
}