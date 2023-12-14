function pow(x, n) {
  let result = 1;

  for (let i = 0; i < n; i += 1) {
    result *= x;
  }

  return result;
}

function powRecursive(x, n) {
  // if (n === 1) {
  //   return x;
  // } else {
  //   return x * powRecursive(x, n - 1);
  // }
  return n === 1 ? x : x * powRecursive(x, n - 1);
}

console.log(pow(2, 8));
console.log(powRecursive(2, 8));

let company = {
  // the same object, compressed for brevity
  sales: [
    { name: 'John', salary: 1000 },
    { name: 'Alice', salary: 1600 },
  ],
  development: {
    sites: [
      { name: 'Peter', salary: 2000 },
      { name: 'Alex', salary: 1800 },
    ],
    pr: {
      prA: [{ name: 'Carl', salary: 1100 }],
      prB: [{ name: 'Jessica', salary: 1400 }],
    },
    internals: [{ name: 'Jack', salary: 1300 }],
  },
};

function sumSalaries(department) {
  if (Array.isArray(department)) {
    // case (1)
    return department.reduce((prev, current) => prev + current.salary, 0); // sum the array
  } else {
    // case (2)
    let sum = 0;
    for (let subdep of Object.values(department)) {
      sum += sumSalaries(subdep); // recursively call for subdepartments, sum the results
    }
    return sum;
  }
}

console.log(sumSalaries(company));

let list = { value: 1 };
list.next = { value: 2 };
list.next.next = { value: 3 };
list.next.next.next = { value: 4 };
list.next.next.next.next = null;

// prepend the new value to the list
list = { value: 'new item', next: list };

console.log(list);

// https://javascript.info/recursion
// Tasks

// ---------------------------------------------------
// Sum all numbers till the given one
// Write a function sumTo(n) that calculates the sum of numbers 1 + 2 + ... + n.
// For instance:
// sumTo(1) = 1
// sumTo(2) = 2 + 1 = 3
// sumTo(3) = 3 + 2 + 1 = 6
// sumTo(4) = 4 + 3 + 2 + 1 = 10
// ...
// sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050

// Make 3 solution variants:

// Using a for loop.
// Using a recursion, cause sumTo(n) = n + sumTo(n-1) for n > 1.
// Using the arithmetic progression formula.
// An example of the result:

// --------------------MY SOLUTION--------------------
// Using a for loop.
let start = Date.now();
function sumTo_a(x) {
  let sum = 0;
  for (let i = x; i > 0; i -= 1) {
    sum += i;
  }

  return sum;
}

console.log(sumTo_a(8));
console.log(Date.now() - start);

// Using a recursion, cause sumTo(n) = n + sumTo(n-1) for n > 1.
function sumTo_b(x) {
  // if (x > 1) {
  //   return x + sumTo(_bx - 1);
  // } else {
  //   return x;
  // }

  return x > 1 ? x + sumTo_b(x - 1) : x;
}

start = Date.now();
console.log(sumTo_b(8));
console.log(Date.now() - start);

// Using the arithmetic progression formula.
function sumTo_c(x) {
  return (x * (1 + x)) / 2;
}

start = Date.now();
console.log(sumTo_c(8));
console.log(Date.now() - start);

// ---------------------------------------------------
// Calculate factorial
// The factorial of a natural number is a number multiplied by "number minus one", then by "number minus two", and so on till 1. The factorial of n is denoted as n!
// We can write a definition of factorial like this:
// n! = n * (n - 1) * (n - 2) * ...*1

// --------------------MY SOLUTION--------------------
function factorial(n) {
  // let answer = 1;

  // for (let i = n; i > 0; i -= 1) {
  //   answer *= i;
  // }

  // return answer;

  if (n) {
    return n * factorial(n - 1);
  } else {
    return 1;
  }
  // return n ? n * factorial(n - 1) : 1;
}

console.log(factorial(5));
// top of execution context stack
// Context: {n: 0 at line 148}
// 1
// Context: {n: 1 at line 148}
// 1 * 1
// Context: {n: 2 at line 148}
// 2 * 1
// Context: {n: 3 at line 148}
// 3 * 2
// Context: {n: 4 at line 148}
// 4 * 6
// Context: {n: 5 at line 148}
// 5 * 24
// ---------------------------------------------------
// Fibonacci numbers
// The sequence of Fibonacci numbers has the formula Fn = Fn-1 + Fn-2. In other words, the next number is a sum of the two preceding ones.

// First two numbers are 1, then 2(1+1), then 3(1+2), 5(2+3) and so on: 1, 1, 2, 3, 5, 8, 13, 21....

// Fibonacci numbers are related to the Golden ratio and many natural phenomena around us.

// Write a function fib(n) that returns the n-th Fibonacci number.

// An example of work:
// function fib(n) { /* your code */ }

// alert(fib(3)); // 2
// alert(fib(7)); // 13
// alert(fib(77)); // 5527939700884757
// P.S. The function should be fast. The call to fib(77) should take no more than a fraction of a second.

// --------------------MY SOLUTION--------------------
function fib(n) {
  // return n <= 1 ? n : fib(n - 1) + fib(n - 2);
  return n >= 2 ? fib(n - 1) + fib(n - 2) : n;
  // const sequence = [0, 1];
  // if (n === 0) return n;
  // for (i = 0, j = 1; i <= n, j <= n; i++, j++) {
  //   if (j === n) return sequence[j];
  //   sequence.push(sequence[i] + sequence[j]);
  // }
}

start = Date.now();
console.log(fib(1));
console.log(Date.now() - start);

// ---------------------------------------------------
// Output a single-linked list
// Let’s say we have a single-linked list (as described in the chapter Recursion and stack):
let foo = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};

// Write a function printList(list) that outputs list items one-by-one.
// Make two variants of the solution: using a loop and using recursion.
// What’s better: with recursion or without it?

// --------------------MY SOLUTION--------------------
function printList(list) {
  // let tmp = list;
  // while (tmp) {
  //   console.log(tmp.value);
  //   tmp = tmp.next;
  // }

  console.log(list.value);
  if (list.next) {
    printList(list.next);
    // works with or without a return statement
  }
}

printList(foo);

// ---------------------------------------------------
// Output a single-linked list in the reverse order
// Output a single-linked list from the previous task Output a single-linked list in the reverse order.
// Make two solutions: using a loop and using a recursion.

// --------------------MY SOLUTION--------------------
function printListReversed(list) {
  // let tmp = list;
  // let values = [];
  // while (tmp) {
  //   values.push(tmp.value);
  //   tmp = tmp.next;
  // }

  // for (i = values.length - 1; i >= 0; i--) {
  //   console.log(values[i]);
  // }

  if (list.next) {
    printListReversed(list.next);
  }
  console.log(list.value);
}

printListReversed(foo);
// ---------------------------------------------------
