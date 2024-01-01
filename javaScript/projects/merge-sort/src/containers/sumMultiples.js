// https://projecteuler.net/problem=1
// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9.
// The sum of these multiples is 23.

export default function sumMultiples(num) {
  // non-recursive
  // let sum = 0;
  // for (let i = num - 1; i > 0; i -= 1) {
  //   if (i % 3 === 0 || i % 5 === 0) {
  //     console.log(i);
  //     sum += i;
  //   }
  // }
  // console.log(sum);
  // recursively INCORRECT
  //   if (num === 0) {
  //     return num;
  //   }
  //   console.log(num - 1);
  //   if (num % 3 === 0 || num % 5 === 0) {
  //     return num + sumMultiples(num - 1);
  //   }
  //   return sumMultiples(num - 1);
  // }

  // recursively CORRECT
  const newNum = num - 1;
  if (newNum === 0) {
    return newNum;
  }

  if (newNum % 3 === 0 || newNum % 5 === 0) {
    return newNum + sumMultiples(newNum);
  }
  return sumMultiples(newNum);
}
