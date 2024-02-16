export default (arr) => {
  // Takes an array of numbers
  // Returns an object with the following properties: average, min, max, and length.
  const setAverage = (arr) => {
    return arr.reduce((sum, current) => sum + current, 0) / arr.length;
  };

  const setMin = (arr) => {
    return arr.reduce((min, current) => (min < current ? min : current));
  };

  const setMax = (arr) => {
    return arr.reduce((max, current) => (max > current ? max : current));
  };

  const verifyArray = (arr) => {
    // checks if all elements in array are numbers
    // parses number strings into numbers
    // returns an array of numbers
    return arr.map((element) => {
      let num = element;
      if (typeof num !== 'number') {
        num = parseFloat(num);
        if (isNaN(num)) throw new Error('Element(s) in array must be number type.');
      }
      return num;
    });
  };

  const validatedArr = verifyArray(arr);
  const average = setAverage(validatedArr);
  const min = setMin(validatedArr);
  const max = setMax(validatedArr);
  const length = validatedArr.length;
  return { average, min, max, length };
};
