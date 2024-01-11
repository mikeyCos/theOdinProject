// ([9, 7, 5, 11, 12, 2, 14, 3, 10, 6])
// returns [2, 3, 5, 6, 7, 9, 10, 11, 12, 14]
const swap = (arr, i, j) => {
  const tmpArr = arr;
  const tmp = tmpArr[i];
  tmpArr[i] = arr[j];
  tmpArr[j] = tmp;
  return tmpArr;
};

const partition = (arr, p, r) => {
  let q = p;
  let tmp;
  for (let j = p; j < r; j += 1) {
    if (arr[j] <= arr[r]) {
      swap(arr, j, q);
      // tmp = arr[j];
      // arr[j] = arr[q];
      // arr[q] = tmp;
      q += 1;
    }
  }
  swap(arr, r, q);
  // tmp = arr[r];
  // arr[r] = arr[q];
  // arr[q] = tmp;
  return q;
};

const quickSortCheck = (arr, p = 0, r = arr.length - 1) => {
  let sortedArr = arr;
  // console.log(`p: ${p}`);
  // console.log(`r: ${r}`);
  // console.log(sortedArr);
  if (p < r) {
    // const pivotIndex = partition(arr, p, r);
    let q = p;
    for (let j = p; j < r; j += 1) {
      if (sortedArr[j] <= sortedArr[r]) {
        sortedArr = swap(arr, j, q);
        q += 1;
      }
    }
    sortedArr = swap(arr, r, q);
    const pivotIndex = q;
    quickSortCheck(sortedArr, p, pivotIndex - 1);
    quickSortCheck(sortedArr, pivotIndex + 1, r);
  }
  return sortedArr;
};

const quickSort = (arr) => {
  return quickSortCheck(arr);
};

export default quickSort;
