// 14 DEC 2023
// https://www.codingame.com/playgrounds/5422/js-interview-prep-recursion
// Question 1: Sum all numbers
// Write a function called sumRange. It will take a number and return the sum of all numbers from 1 up to the number passed in.
// Sample: sumRange(3) returns 6, since 1 + 2 + 3 = 6.
function sumRange(n) {
  if (n === 0) {
    return n;
  } else {
    return n + sumRange(n - 1);
  }
}

// ---------------------------------------------
// Question 2: Power function
// Write a function called power which takes in a base and an exponent. If the exponent is 0, return 1.
// Sample:
// console.log(power(2, 4)); // 16
// console.log(power(2, 3)); // 8
// console.log(power(2, 2)); // 4
// console.log(power(2, 1)); // 2
// console.log(power(2, 0)); // 1
function power(base, exp) {
  if (exp === 0) {
    return 1;
  } else {
    return base * power(2, exp - 1);
  }
}

// ---------------------------------------------
// Question 3: Calculate factorial
// Write a function that returns the factorial of a number. As a quick refresher, a factorial of a number is the result of that number multiplied by the number before it, and the number before that number, and so on, until you reach 1. The factorial of 1 is just 1.
// Sample:
// factorial(5); // 5 * 4 * 3 * 2 * 1 === 120
function factorial(n) {
  if (n === 1 || n === 0) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
}

// ---------------------------------------------
// Question 4: Check all values in an array
// Write a function called all which accepts an array and a callback and returns true if every value in the array returns true when passed as parameter to the callback function
// Sample:
// var allAreLessThanSeven = all([1,2,9], function(num){
// 	return num < 7;
// });

// console.log(allAreLessThanSeven); // false
function all(arr, callback) {
  if (arr.length === 0) {
    return true;
  } else {
    let tmp = arr.slice(1);
    return callback(arr[0]) ? all(tmp, callback) : false;
  }
}

// ---------------------------------------------
// Question 5: Product of an array
// Write a function called productOfArray which takes in an array of numbers and returns the product of them all
// Sample:
// var six = productOfArray([1,2,3]) // 6
// var sixty = productOfArray([1,2,3,10]) // 60
function productOfArray(arr) {
  if (arr.length === 0) {
    return 1;
  } else {
    let tmp = arr.slice(1);
    return arr[0] * productOfArray(tmp);
  }
}

// ---------------------------------------------
// Question 6: Search JS object
// Write a function called contains that searches for a value in a nested object. It returns true if the object contains that value.
// Sample:
var nestedObject = {
  data: {
    info: {
      stuff: {
        thing: {
          moreStuff: {
            magicNumber: 44,
            something: 'foo2',
          },
          cheese: {
            type: 'cheddar',
          },
        },
        eggs: {
          foo: 'hi',
        },
      },
      data: {
        age: 27,
      },
    },
  },
};

// console.log(contains(nestedObject, 44)); // true
// console.log(contains(nestedObject, "foo")); // false
function contains(obj, query) {
  console.log(obj);

  // for one-dimensional nested object
  // for (let key in obj) {
  //   console.log(key);
  //   if (obj[key] === query) {
  //     return true;
  //   }

  //   if (obj[key] instanceof Object) {
  //     return contains(obj[key], query);
  //   }
  // }
  // return false;

  // for multi nested objects
  // ------------option_1------------
  // let boolean = false;
  // Object.values(obj).forEach((value) => {
  //   if (value === query) boolean = true;

  //   if (value instanceof Object && contains(value, query)) {
  //     boolean = true;
  //   }
  // });
  // return boolean;

  // ------------option_2------------
  return Object.values(obj).some((value) => {
    if (value === query) return true;
    if (value instanceof Object) return contains(value, query);

    // if (value instanceof Object && contains(value, query)) {
    //   return true;
    // }
  });

  // ------------option_3------------
  // for (let key in obj) {
  //   if (obj[key] === query) return true;

  //   if (obj[key] instanceof Object && contains(obj[key], query)) {
  //     console.log(contains(obj[key], query));
  //     return true;
  //   }
  // }
  // return false;
}

// ---------------------------------------------
// Question 7: Parse a multi-dimensional array
// Given a multi-dimensional integer array, return the total number of integers stored inside this array
// Sample:
// var seven = totalIntegers([[[5], 3], 0, 2, [[42], 99], ['foo'], [], [4, [5, 6]]]); // 7
function totalIntegers(arr) {
  let sum = 0;
  if (typeof arr === 'number') return 1;
  if (Array.isArray(arr)) {
    arr.forEach((item) => {
      sum += totalIntegers(item);
    });
  }
  return sum;
}

// ---------------------------------------------
// Question 8:
// Write a function that sums squares of numbers in list that may contain more lists
// Sample:
// var l = [1,2,3];
// console.log(SumSquares(l)); // 1 + 4 + 9 = 14

// l = [[1,2],3];
// console.log(SumSquares(l)); // 1 + 4 + 9 = 14

// l = [[[[[[[[[1]]]]]]]]]
// console.log(SumSquares(l)); // 1 = 1

// l = [10,[[10],10],[10]]
// console.log(SumSquares(l)); // 100 + 100 + 100 + 100 = 400
function sumSquares(arr) {
  if (typeof arr === 'number') {
    return arr * arr;
  }
  let sum = 0;
  arr.forEach((item) => {
    sum += sumSquares(item);
  });
  return sum;
}

// ---------------------------------------------
// Question 9:
// The function should return an array containing repetitions of the number argument. For instance, replicate(3, 5) should return [5,5,5]. If the times argument is negative, return an empty array.
// Sample:
// console.log(replicate(3, 5)) // [5, 5, 5]
// console.log(replicate(1, 69)) // [69]
// console.log(replicate(-2, 6)) // []
function replicate(i, n) {
  if (i <= 0) return [];
  let arr = [n];
  return arr.concat(replicate(i - 1, n));
}
