// Coded by Michael Recitis on 8 MAR 2023
// https://javascript.info/while-for#tasks

// ********************************************************************************************
// Last loop value
// What is the last value alerted by this code? Why?
// let i = 3;

// while (i) {
//     alert( i-- );
// }
// ANSWER
// 1, because the expression is falsy when i = 0 and the loop stops
// ANSWER
// ********************************************************************************************

// ********************************************************************************************
// Which values does the while loop show?
// For every loop iteration, write down which value it outputs and then compare it with the solution.
// Both loops alert the same values, or not?

// The prefix form ++i:
// let i = 0;
// while (++i < 5) alert( i );
// ANSWER
//  1, 2, 3, 4
// ANSWER

// The postfix form i++
// let i = 0;
// while (i++ < 5) alert( i );
// ANSWER
// 1, 2, 3, 4, 5
// ANSWER
// ********************************************************************************************

// ********************************************************************************************
// Which values get shown by the "for" loop?
// For each loop write down which values it is going to show. Then compare with the answer.
// Both loops alert same values or not?
// The postfix form:
// for (let i = 0; i < 5; i++) alert( i );
// ANSWER
// 0, 1, 2, 3, 4
// ANSWER

// The prefix form:
// for (let i = 0; i < 5; ++i) alert( i );
// ANSWER
//  0, 1, 2, 3, 4
// ANSWER
// ********************************************************************************************

// ********************************************************************************************
// Output even numbers in the loop
// Use the for loop to output even numbers from 2 to 10.
// ANSWER
// for (i = 0; i <= 10; i++) {
//     if (i % 2 === 0 && i > 0) {
//         console.log(i);
//     }
// }
// ANSWER

// ********************************************************************************************
// Replace "for" with "while"
// Rewrite the code changing the for loop to while without altering its behavior (the output should stay same).
// for (let i = 0; i < 3; i++) {
//     alert( `number ${i}!` );
// }
// ANSWER
// i = 0;
// while (i < 3) {
//     alert(`number ${i}!`);
//     i++;
// }
// ANSWER
// ********************************************************************************************

// ********************************************************************************************
// Repeat until the input is correct
// Write a loop which prompts for a number greater than 100. If the visitor enters another number – ask them to input again.
// The loop must ask for a number until either the visitor enters a number greater than 100 or cancels the input/enters an empty line.
// Here we can assume that the visitor only inputs numbers. There’s no need to implement a special handling for a non-numeric input in this task.
// ANSWER
// let i = parseInt(prompt(`Enter a number`));
// while (i < 100) {
//     if (i < 100) {
//         i = parseInt(prompt(`Enter a number`));
//     } else {
//         break;
//     }
// }

// OR
// let i;
// do {
//     i = prompt(`Enter a number greater than 100`, 0);
// } while (i < 100 && i);
// ANSWER
// ********************************************************************************************

// ********************************************************************************************
// Output prime numbers
// An integer number greater than 1 is called a prime if it cannot be divided without a remainder by anything except 1 and itself.
// In other words, n > 1 is a prime if it can’t be evenly divided by anything except 1 and n.
// For example, 5 is a prime, because it cannot be divided without a remainder by 2, 3 and 4.
// Write the code which outputs prime numbers in the interval from 2 to n.
// For n = 10 the result will be 2,3,5,7.
// P.S. The code should work for any n, not be hard-tuned for any fixed value.

// ANSWER
function returnPrimeNumbers(x) {
    for (a = 2; a <= x; a++) {
        let factorsCounter = 0;
        for (b = 1; b <= x; b++) {
            if(a % b == 0) factorsCounter++;
        }

        if (factorsCounter < 3) {
            console.log(`${a} is a prime number.`);
        }
    }
}

let num = parseInt(prompt(`Enter a number.`));
returnPrimeNumbers(num);

// OR
// let n = 10;

// nextPrime: for (let i = 2; i <= n; i++) {
//     for (let j = 2; j < i; j++) {
//         if (i % j == 0) continue nextPrime; // if i % j == 0, i is NOT a prime number
//     }

//   alert( i ); // a prime
// }

// ANSWER
// ********************************************************************************************