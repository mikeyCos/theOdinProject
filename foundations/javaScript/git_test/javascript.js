
// between this comment line is from TOP Fundamentals Part 1 JavaScript Assignment
// 27 FEB 2023
console.log("23 + 97 = " + (23 + 97));
console.log("1 + 4 + 9 + +\"10\" + 2 + 200 = " + (1 + 4 + 9 + +"10" + 2 + 200));
console.log("((4 + 6 + 9)/ 77).toFixed(5) = " + ((4 + 6 + 9)/ 77).toFixed(5));

let a = 10;
console.log("a = " + a);

console.log("9 * a in console returns: " + (9 * a));

console.log("let b = 7 * a in console returns: undefined");

const max = 57;
console.log("const max = " + max);
let actual = max - 13;
console.log("let actual = max - 13, " + "\n" + "actual = " + max + " - " + 13 + "\n" + "actual = " + (max - 13));
let percentage = (actual / max).toFixed(4);
console.log("let percentage = (actual / max).toFixed(4), " + "\n" + "percentage = " + "(" + actual + " / " + max + ").toFixed(4)" + "\n" + "percentage = " + percentage);
// between this comment line is from TOP Fundamentals Part 1 JavaScript Assignment

console.log ("Hello world!")

let greeting;
greeting = 'Hello'; // storing a single variable
// alert(greeting); // if needed, uncomment

let num3 = 500;
num3 = 250 % num3;
console.log("This is 250 % 500: " + num3);

// Do NOT do
// let user = 'John', age = 25, message = "Hi"; storing multiple variables.

// Do
let user = 'John';
let age = 25;
let message = 'Hi';

// OR

// let user = 'John',
//     age = 25,
//     message = 'Hi';

const myBrithday = '18.04.1982';

const COLOR_RED = "#F00";
const COLOR_GREEN = "#0F0";
const COLOR_BLUE= "#00F";
const COLOR_ORANGE = "#FF7F00";

let color = COLOR_ORANGE;
// alert(color); // if needed, uncomment


// Tasks below this line
// 27 FEB 2023
// https://javascript.info/operators

// The postfix and prefix forms
// 1. What are the final values of all variables a, b, c, and d after the code below?

// let a = 1, b = 1;

// let c = ++a;
// let d = b++;
// a = 2, c = 2, b = 2, d = 1

// Assignment result
// 1. What are the values of a and x after the code below?
// let a = 2;

// let x = 1 + (a *= 2);
// a = 4, x = 5

// Type conversions
// 1. What are results of these expressions?
// "" + 1 + 0       "10" string
// "" - 1 + 0       -1 number
// true + false     1 number
// 6 / "3"          2 number
// "2" * "3"        6 number
// 4 + 5 + "px"     "9px" string
// "$" + 4 + 5      "$45" string
// "4" - 2          2 number
// "4px" - 2        NaN number
// "  -9  " + 5     "-9 5" string
// "  -9  " - 5     -14 number
// null + 1         1 number
// undefined + 1    NaN number
// " \t \n" - 2     -2 number

// Fix the addition
// 1. Here’s a code that asks the user for two numbers and shows their sum.
// It works incorrectly. The output in the example below is 12 (for default prompt values).
// Why? Fix it. The result should be 3.

// let a = prompt("First number?", 1);
// let b = prompt("Second number?", 2);

// alert(a + b); // 12, These variables are strings; the prompt returns user input as a string.
// alert(+a + +a) // This converts the strings to numbers.

// Tasks below this line
// 27 FEB 2023
// https://javascript.info/variables

// Working with variables
// 1. Declare two variables: admin and name.
// 2. Assign the value "John" to name.
// 3. Copy the value from name to admin.
// 4. Show the value of admin using alert (must output “John”).
let admin;
let name = "John";
admin = name;
// alert(admin);

// Giving the right name
// 1. Create a variable with the name of our planet. How would you name such a variable?
// 2. Create a variable to store the name of a current visitor to a website. How would you name that variable?
let ourPlanetName;
let currentUser;

// Uppercase const?
// const BIRTHDAY = '18.04.1982'; make birthday uppercase?
// uppercase, hardcoded value

// const AGE = someCode(BIRTHDAY); make age uppercase?
// uppercase, lowercase since it can change

// https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Math
const myInt = 5;
const myFloat = 6.667;
myInt;
myFloat;

// alert(typeof myInt); // if needed, uncomment
// alert(typeof myFloat); // if needed, uncomment

const num1 = 10;
const num2 = 50;
multiply = 9 * num1;
console.log("This is multiply after 9 * num1: " + multiply);
exponent = num1 ** 3;
console.log("This is exponent after num1 ** 3: " + exponent);
division = num2 / num1;
console.log("This is division after num2 / num1: " + division);