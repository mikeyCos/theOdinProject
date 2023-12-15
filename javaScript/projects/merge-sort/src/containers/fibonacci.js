// https://en.wikipedia.org/wiki/Fibonacci_sequence
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...
export default function fibonacci(i) {
  console.log(i);
  if (i >= 2) return fibonacci(i - 1) + fibonacci(i - 2);
  return i;
}
