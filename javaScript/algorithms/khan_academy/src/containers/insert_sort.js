// ([-0.5, 4, 52, 35, -21, 49, 61, 10, 17, 22, -2])
// returns [-21, -2, -0.5, 4, 10, 17, 22, 35, 49, 52, 61]
export default (array) => {
  const sortedArr = array;
  for (let i = 1; i < sortedArr.length; i += 1) {
    const value = sortedArr[i];
    let j = i - 1;
    for (j; j >= 0 && value < sortedArr[j]; j -= 1) {
      sortedArr[j + 1] = sortedArr[j];
    }
    sortedArr[j + 1] = value;
  }

  return sortedArr;
};
