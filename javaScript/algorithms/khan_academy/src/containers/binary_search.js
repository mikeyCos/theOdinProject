// ([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)
// returns 4
export default (arr, query) => {
  // searches array for query
  // if query is found, it's index is returned
  let start = 0;
  let end = arr.length - 1;
  while (start <= end) {
    const midpoint = Math.floor((start + end) / 2);
    if (arr[midpoint] === query) {
      return midpoint;
    }

    if (arr[midpoint] < query) {
      start = midpoint + 1;
    } else {
      end = midpoint - 1;
    }
  }
  return -1;
};
