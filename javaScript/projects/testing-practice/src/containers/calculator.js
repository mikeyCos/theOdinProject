const parseNum = (num) => {
  // Converts number-strings to into number
  // If parsedNum is not a number, throw error
  let parsedNum = num === 'e' ? 2.718 : parseFloat(num);
  if (isNaN(parsedNum)) throw new Error('Not a number');
  return parsedNum;
};

export default {
  // Contains functions for the basic operations: add, subtract, divide, and multiply
  // Each of these functions should take two numbers and return the correct calculation
  // Optional, to round decimals
  add(num1, num2) {
    const x = parseNum(num1);
    const y = parseNum(num2);
    return x + y;
  },
  subtract(num1, num2) {
    const x = parseNum(num1);
    const y = parseNum(num2);
    return x - y;
  },
  divide(num1, num2) {
    const x = parseNum(num1);
    const y = parseNum(num2);
    if (y === 0) throw new Error('Division by zero is undefined');
    return x / y;
  },
  multiply(num1, num2) {
    const x = parseNum(num1);
    const y = parseNum(num2);
    return x * y;
  },
};
