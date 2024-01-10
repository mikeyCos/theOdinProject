const pow = (base, n) => {
  if (n === 0) return 1;

  if (n < 0) return 1 / pow(base, -n);

  if (n % 2 === 0) {
    const tmp = pow(base, n / 2);
    return tmp * tmp;
  }

  return base * pow(base, n - 1);
};

export default pow;
