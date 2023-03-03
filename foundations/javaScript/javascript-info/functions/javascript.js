// 03 MAR 2023
// https://javascript.info/function-basics

// Is "else" required?
// The following function returns true if the parameter age is greater than 18.
// Otherwise it asks for a confirmation and returns its result:
// function checkAge(age) {
//     if (age > 18) {
//       return true;
//     } else {
//     // ...
//       return confirm('Did parents allow you?');
//     }
//   }
// ANSWER
// no "else" is not required in this case
// ANSWER
// Will the function work differently if else is removed?
// function checkAge(age) {
//     if (age > 18) {
//       return true;
//     }
//     // ...
//     return confirm('Did parents allow you?');
//   }
// Is there any difference in the behavior of these two variants?
// ANSWER
// no difference between the two variants
// ANSWER

//Rewrite the function using '?' or '||'
// The following function returns true if the parameter age is greater than 18.
// Otherwise it asks for a confirmation and returns its result.
// function checkAge(age) {
//     if (age > 18) {
//       return true;
//     } else {
//       return confirm('Did parents allow you?');
//     }
//   }
// Rewrite it, to perform the same, but without if, in a single line.
// Make two variants of checkAge:
// Using a question mark operator ?
// Using OR ||

// ANSWER
// function checkAge(age) { return (age > 18) ? true : confirm('Did parents allow you?'); } 
// function checkAge(age) { return (age > 18) || confirm('Did parents allow you?'); }
// ANSWER

// Function min(a, b)
// Write a function min(a,b) which returns the least of two numbers a and b.
// For instance:
// min(2, 5) == 2
// min(3, -1) == -1
// min(1, 1) == 1

// ANSWER
function min (num1, num2) {
    if (num1 < num2) {
        return num1;
    } 
    return num2;
}
// OR
function min(num1, num2) { return (num1 < num2) ? num1 : num2; }
// ANSWER

// Function pow(x,n)
// Write a function pow(x,n) that returns x in power n. Or, in other words, multiplies x by itself n times and returns the result.
// pow(3, 2) = 3 * 3 = 9
// pow(3, 3) = 3 * 3 * 3 = 27
// pow(1, 100) = 1 * 1 * ...* 1 = 1
// Create a web-page that prompts for x and n, and then shows the result of pow(x,n).
// P.S. In this task the function should support only natural values of n: integers up from 1.

// ANSWER
// function pow(x, n) {
//     let result = x;
//     for (let i = 1; i < n; i++) {
//         result *= x;
//     }
//     return result;
// }

// let x = prompt('x?');
// let n = prompt ('n?');

// if (n < 1) {
//     alert(`Power ${n} is not supported, use a positive integer.`);
// } else {
//     alert(pow(x,n));
// }

// OR
function pow(x, n) {
    let result = x;
    if (n < 1) {
        alert(`Power ${n} is not supported, use a positive integer.`);
    } else {
        for (let i = 1; i < n; i++) {
            result *= x;
        }
        alert(result);
    }
}

let x = prompt('x?');
let n = prompt ('n?');
pow(x,n);
// ANSWER