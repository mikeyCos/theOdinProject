// ([9, 7, 5, 11, 12, 2, 14, 3, 10, 6])
// returns [2, 3, 5, 6, 7, 9, 10, 11, 12, 14]
const swap = (arr) => {};

const partition = (arr, p, r) => {
  let q = p;
  for (let j = p; j < r; j += 1) {
    if (arr[j] <= arr[r]) {
      q += 1;
    }
  }
  return q;
};

const quickSortCheck = (arr, p, r) => {
  if (p < r) {
    const pivotIndex = partition(arr, p, r);
    quickSortCheck(arr, p, pivotIndex - 1);
    quickSortCheck(arr, pivotIndex + 1, r);
  }
};

const quickSort = (arr) => {
  const sortedArray = arr;
  quickSort(sortedArray, 0, arr.length - 1);
  return sortedArray;
};

export default quickSort;
