import analyzeArray from '../containers/analyzeArray';

const object_foo = analyzeArray([1, 8, 3, 4, 2, 6]);
// object_foo.average = 4
// object_foo.min = 1
// object_foo.max = 8
// object_foo.length = 6
const object_bar = analyzeArray([7, 4, 14, 7, 3, 15, 11, 4]);
// object_bar.average = 8.125
// object_bar.min = 3
// object_bar.max = 15
// object_bar.length = 8
const object_gar = analyzeArray([20, 73, '2', 9]);
// object_gar.average = 26
// object_gar.min = 2
// object_gar.max = 73
// object_gar.length = 4
const object_yar = analyzeArray([256]);
// object_gar.average = 256
// object_gar.min = 256
// object_gar.max = 256
// object_gar.length = 1

describe(`Check if analyzeArray object has average, min, max, length properties`, () => {
  test(`analyzeArray.average exists`, () => {
    expect(object_foo.average).toBeDefined();
  });

  test(`analyzeArray.min exists`, () => {
    expect(object_foo.min).toBeDefined();
  });

  test(`analyzeArray.max exists`, () => {
    expect(object_foo.max).toBeDefined();
  });

  test(`analyzeArray.length exists`, () => {
    expect(object_foo.length).toBeDefined();
  });

  test(`analyzeArray([0, 3, 'a', 23])`, () => {
    expect(() => analyzeArray([0, 3, 'a', 23])).toThrow(Error);
    // Depends on handling non-integers
    //  1. Throw an error
    //  2. Create a new array without non-integers
  });
});

describe(`Testing analyzeArray.average`, () => {
  test(`object_foo.average = 4`, () => {
    expect(object_foo.average).toBe(4);
  });

  test(`object_bar.average = 8.125`, () => {
    expect(object_bar.average).toBe(8.125);
  });

  test(`object_gar.average = 26`, () => {
    expect(object_gar.average).toBe(26);
  });

  test(`object_yar.average = 256`, () => {
    expect(object_yar.average).toBe(256);
  });
});

describe(`Testing analyzeArray.min`, () => {
  test(`object_foo.min = 1`, () => {
    expect(object_foo.min).toBe(1);
  });

  test(`object_bar.min = 3`, () => {
    expect(object_bar.min).toBe(3);
  });

  // test(`object_qar.min =`, () => {
  //   expect(object_qar.min).toBe();
  // });

  test(`object_gar.min = 2`, () => {
    expect(object_gar.min).toBe(2);
  });

  test(`object_yar.min = 256`, () => {
    expect(object_yar.min).toBe(256);
  });
});

describe(`Testing analyzeArray.max`, () => {
  test(`object_foo.max = 8`, () => {
    expect(object_foo.max).toBe(8);
  });

  test(`object_bar.max = 15`, () => {
    expect(object_bar.max).toBe(15);
  });

  // test(`object_qar.max =`, () => {
  //   expect(object_qar.max).toBe();
  // });

  test(`object_gar.max = 73`, () => {
    expect(object_gar.max).toBe(73);
  });

  test(`object_yar.max = 256`, () => {
    expect(object_yar.max).toBe(256);
  });
});

describe(`Testing analyzeArray.length`, () => {
  test(`object_foo.length = 6`, () => {
    expect(object_foo.length).toBe(6);
  });

  test(`object_bar.length = 8`, () => {
    expect(object_bar.length).toBe(8);
  });

  // test(`object_qar.length =`, () => {
  //   expect(object_qar.length).toBe();
  // });

  test(`object_gar.length = 4`, () => {
    expect(object_gar.length).toBe(4);
  });

  test(`object_yar.length = 1`, () => {
    expect(object_yar.length).toBe(1);
  });
});
