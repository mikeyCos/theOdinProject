const auxiliary = {};
const fibonacci = (n) => {
  if (n < 2) return n;
  if (auxiliary[n]) {
    return auxiliary[n];
  }

  const value = fibonacci(n - 1) + fibonacci(n - 2);
  auxiliary[n] = value;
  return value;
};

export default fibonacci;
