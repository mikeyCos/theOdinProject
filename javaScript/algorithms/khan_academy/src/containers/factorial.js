const aux = {};
// recursive factorial function with memoization
const factorial = (n) => {
  if (n === 0) {
    return 1;
  }

  if (aux[n]) {
    return aux[n];
  }

  const value = n * factorial(n - 1);
  aux[n] = value;
  return value;
};

export default factorial;
