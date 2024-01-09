// ([-11, 9, 5, 3, -2, 4, 6, 0, 7, 8, -5])
// returns [-11, -5, -2, 0, 3, 4, 5, 6, 7, 8, 9]
export default (arr) => {
  const sortedArr = arr;
  for (let i = 0; i < sortedArr.length; i += 1) {
    const startValue = sortedArr[i];
    let minValue = startValue;
    let swapIndex;
    for (let j = i; j < sortedArr.length; j += 1) {
      if (sortedArr[j] < minValue) {
        minValue = sortedArr[j];
        swapIndex = j;
      }
    }

    sortedArr[i] = minValue;
    sortedArr[!swapIndex ? i : swapIndex] = startValue;
  }
  return sortedArr;
};
