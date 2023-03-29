const add = function(a, b) {
	return a + b;
};

const subtract = function(a, b) {
	return a - b;
};

const sum = function(arr) {
  return arr.reduce((currentSum, currentValue) => currentSum + currentValue, 0);
};

const multiply = function(arr) {
  const initialValue = 1;
  const product = arr.reduce(
  (currentProduct, currentValue) => currentProduct * currentValue, initialValue
  );
  return product;
  // OR
  // return arr.length
  // ? arr.reduce((currentProduct, currentValue) => currentProduct * currentValue) :
  // 0;
};

const power = function(a, b) {
  let value = 1;
  for (i = 0; i < b; i++) {
    value *= a;
  }
  return value;
};

const factorial = function(a) {
	let value = 1;
  for (i = 1; i < a + 1; i++) {
    value *= i;
  }
  return value;
};

// Do not edit below this line
module.exports = {
  add,
  subtract,
  sum,
  multiply,
  power,
  factorial
};
