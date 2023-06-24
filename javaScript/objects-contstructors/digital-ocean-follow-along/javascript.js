function Hero(name, level) {
    this.name = name;
    this.level = level;
}

Hero.prototype.greet = function() {
    return `${this.name} says hello.`;
}

function Barbarian(name, level, weapon) {
    Hero.call(this, name, level);
    this.weapon = weapon;
}

Barbarian.prototype.attack = function() {
    return `${this.name} spins with the ${this.weapon}.`;
}

function Sorceress(name, level, spell) {
    Hero.call(this, name, level);
    this.spell = spell;
}

Sorceress.prototype.cast = function() {
    return `${this.name} casts ${this.spell}.`;
}

Object.setPrototypeOf(Barbarian.prototype, Hero.prototype);
Object.setPrototypeOf(Sorceress.prototype, Hero.prototype);

const hero1 = new Barbarian('Conan', 1, 'axe');
const hero2 = new Sorceress('Quin', 1, 'firewall');

console.log(hero1.attack());
console.log(hero1.greet());
