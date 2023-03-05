// https://en.wikipedia.org/wiki/Fizz_buzz
// Write a program that takes a user’s input and prints the numbers from one to the number the user entered. 
// However, for multiples of three print Fizz instead of the number and for the multiples of five print Buzz. 
// For numbers which are multiples of both three and five print FizzBuzz.

// A user enters a number
// Print each number between 1 and the number entered by the user
// If the number is divisible by 3, print "Fizz"
// If the number is divisible by 5, print "Buzz"
// If the number is divisible by 3 AND 5, print "FizzBuzz"
let number = parseInt(prompt(`Please enter a number you would like to Fizzbuzz.`));
const fizzBuzz = [];
fizzBuzz.length = number;
console.log(fizzBuzz.length);

for(let i = 1; i <= number; i++) {
    if((i % 3 === 0) && (i % 5 === 0)) {
        fizzBuzz[i-1] = 'FizzBuzz';
        console.log(`FizzBuzz`);
    } else if (i % 3 === 0) {
        fizzBuzz[i-1] = 'Fizz';
        console.log(`Fizz`);
    } else if (i % 5 === 0) {
        fizzBuzz[i-1] = 'Buzz';
        console.log(`Buzz`);
    } else {
        fizzBuzz[i-1] = i;
        console.log(i);
    }
}

console.log(fizzBuzz);
let listContainer = document.createElement('div');
let listElement = document.createElement('ul');
let listItem = document.createElement('li');

document.body.appendChild(listContainer);
listContainer.appendChild(listElement);
// https://www.w3schools.com/jsref/met_node_appendchild.asp
// https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild

for(let i = 0; i < number; i++) {
    listItem.textContent = fizzBuzz[i];
    listElement.appendChild(listItem);
    listItem = document.createElement('li');
}


