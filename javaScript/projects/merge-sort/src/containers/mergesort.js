// [1, 4, 6, 9, 5, 8, 7, 3, 2];
// mergeSort([2,5,8,1,9])
// mergeSort([1, 4, 6, 9, 5, 8, 7, 3, 2])
export default function mergeSort(arr) {
  console.log(arr);
  if (arr.length === 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);

  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);

  const sortedArr = [];
  let i = 0;
  let j = 0;
  let k = 0;
  while (i < sortedLeft.length && j < sortedRight.length) {
    if (sortedLeft[i] < sortedRight[j]) {
      sortedArr[k] = sortedLeft[i];
      i += 1;
    } else {
      sortedArr[k] = sortedRight[j];
      j += 1;
    }
    k += 1;
  }

  for (; i < sortedLeft.length; i += 1) {
    sortedArr[k] = sortedLeft[i];
    k += 1;
  }

  for (; j < sortedRight.length; j += 1) {
    sortedArr[k] = sortedRight[j];
    k += 1;
  }

  console.log(sortedLeft);
  console.log(sortedRight);
  console.log(sortedArr);

  return sortedArr;
}
