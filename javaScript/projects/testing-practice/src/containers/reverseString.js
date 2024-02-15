export default (string) => {
  // takes a string and returns it reversed
  let reverseString = '';
  for (let i = string.length - 1; i >= 0; i -= 1) {
    reverseString += string.charAt(i);
  }
  return reverseString;
};
