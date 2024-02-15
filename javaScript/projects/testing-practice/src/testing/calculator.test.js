import calculator from '../containers/calculator';

describe(`Testing calculator object`, () => {
  test(`Calculator has an add method`, () => {
    expect(calculator.add).toBeDefined();
  });

  test(`Calculator has an subtract method`, () => {
    expect(calculator.subtract).toBeDefined();
  });

  test(`Calculator has an divide method`, () => {
    expect(calculator.divide).toBeDefined();
  });

  test(`Calculator has an multiply method`, () => {
    expect(calculator.multiply).toBeDefined();
  });
});

describe(`Testing calculator.add()`, () => {
  test(`calculator.add(2, 2) = 4`, () => {
    expect(calculator.add(2, 2)).toBe(4);
  });

  test(`calculator.add(-8, 7) = -1`, () => {
    expect(calculator.add(-8, 7)).toBe(-1);
  });

  test(`calculator.add(8, -70) = -62`, () => {
    expect(calculator.add(8, -70)).toBe(-62);
  });

  test(`const e = 2.718, calculator.add(e, 5) = 7.718`, () => {
    const e = 2.718;
    expect(calculator.add(e, 5)).toBe(7.718);
  });

  test(`calculator.add('e', 1) = 3.718`, () => {
    expect(calculator.add('e', 1)).toBe(3.718);
  });

  test(`calculator.add('10', 5) = 15`, () => {
    expect(calculator.add('10', 5)).toBe(15);
  });

  test(`calculator.add(1.0, 5) = 15`, () => {
    expect(calculator.add(1.0, 5)).toBe(6);
  });

  test(`calculator.add('a', 20) = Not a number`, () => {
    expect(() => calculator.add('a', 20)).toThrow(Error);
  });

  test(`calculator.add('$', 9) = Not a number`, () => {
    expect(() => calculator.add('$', 20)).toThrow(Error);
  });

  test(`calculator.add('$', 9) = Not a number`, () => {
    expect(() => calculator.add('$', 20)).toThrow(Error);
  });
});

describe('Testing calculator.subtract()', () => {
  test(`calculator.subtract(2, 1) = 1`, () => {
    expect(calculator.subtract(2, 1)).toBe(1);
  });

  test(`calculator.subtract(3, 1) = 2`, () => {
    expect(calculator.subtract(3, 1)).toBe(2);
  });

  test(`calculator.subtract(-9, 5) = -14`, () => {
    expect(calculator.subtract(-9, 5)).toBe(-14);
  });

  test(`calculator.subtract(59, -5) = 64`, () => {
    expect(calculator.subtract(59, -5)).toBe(64);
  });

  test(`calculator.subtract('20', -3) = 23`, () => {
    expect(calculator.subtract('20', -3)).toBe(23);
  });

  test(`calculator.subtract('y', -11) = Not a number`, () => {
    expect(() => calculator.subtract('y', -11)).toThrow(Error);
  });
});

describe('Testing calculator.divide()', () => {
  test(`calculator.divide(6, 2) = 3`, () => {
    expect(calculator.divide(6, 2)).toBe(3);
  });

  test(`calculator.divide(48, 12) = 4`, () => {
    expect(calculator.divide(48, 12)).toBe(4);
  });

  test(`calculator.divide(1, 2) = .5`, () => {
    expect(calculator.divide(1, 2)).toBe(0.5);
  });

  test(`calculator.divide(2, 3) = 0.6666666666666666`, () => {
    expect(calculator.divide(2, 3)).toBe(0.6666666666666666);
  });

  test(`calculator.divide('a', 0) = Not a number`, () => {
    expect(() => calculator.divide('a', 0)).toThrow(Error);
  });

  test(`calculator.divide(9, 0) = Division by zero is undefined`, () => {
    expect(() => calculator.divide(9, 0)).toThrow(Error);
  });
});

describe('Testing calculator.multiply()', () => {
  test(`calculator.multiply(2, 0) = 0`, () => {
    expect(calculator.multiply(2, 0)).toBe(0);
  });

  test(`calculator.multiply(3, 3) = 9`, () => {
    expect(calculator.multiply(3, 3)).toBe(9);
  });

  test(`calculator.multiply(2.5, 3) = 7.5`, () => {
    expect(calculator.multiply(2.5, 3)).toBe(7.5);
  });

  test(`calculator.multiply('q', 9.7)`, () => {
    expect(() => calculator.multiply('q', 9.7)).toThrow(Error);
  });
});
