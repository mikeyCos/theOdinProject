// https://en.wikipedia.org/wiki/Fibonacci_sequence
// 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ...
// Using iteration, write a function fibs which takes a number
// Returns an array containing that many numbers from the Fibonacci sequence.
// Using an example input of 8, this function should return the array [0, 1, 1, 2, 3, 5, 8, 13].
export default function fibs(n) {
  // non-recursively
  // using a for loop
  // if (n === 0) return [];
  // if (n === 1) return [0];
  // const sequence = [0, 1];
  // for (let i = 2; i < n; i += 1) {
  //   sequence.push(sequence[i - 1] + sequence[i - 2]);
  // }
  // return sequence;
  // ------------------------------------
  // using a while loop
  // let i = 2;
  // const sequence = [0, 1];
  // while (i < n) {
  //   sequence.push(sequence[i - 1] + sequence[i - 2]);
  //   i += 1;
  // }
  // return sequence;
  // ------------------------------------
  // recursively
  // fibs(4) returns [0, 1, 1, 2]
  // fibs(5) returns [0, 1, 1, 2, 3]
  // fibs(8) returns [0, 1, 1, 2, 3, 5, 8, 13]
  if (n <= 0) return [];
  if (n === 1) return [0];
  if (n === 2) return [0, 1];
  const sequence = fibs(n - 1);
  sequence.push(sequence[sequence.length - 1] + sequence[sequence.length - 2]);
  return sequence;
  /*
  fibs(4)
  n = 4
    fibs(4-1)
    fibs(3)
      n = 3
      fibs(3 - 1)
      fibs(2)
        n = 2
        return [0, 1]

      going back up the tree
      n = 3
      sequence.push(sequence[2 - 1] + sequence[2 - 2])
      sequence.push(sequence[1] + sequence[0])
      sequence.push(0 + 1)
      sequence.push(1)
      sequence = [0, 1, 1]

      n = 4
      sequence.push(sequence[3 - 1] + sequence[3 - 2])
      sequence.push(sequence[2] + sequence[1])
      sequence.push(1 + 1)
      sequence.push(2)
      sequence = [0, 1, 1, 2]
  */
}
