// 27 FEB 2023
// https://javascript.info/operators

// The postfix and prefix forms
// 1. What are the final values of all variables a, b, c, and d after the code below?

let a = 1, b = 1;

let c = ++a;
let d = b++;
// ANSWER
// a = 2, c = 2, b = 2, d = 1

// Assignment result
// 1. What are the values of a and x after the code below?
// let a = 2;

// let x = 1 + (a *= 2);
// ANSWER
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