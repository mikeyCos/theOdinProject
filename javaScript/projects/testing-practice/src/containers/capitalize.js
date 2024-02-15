export default (string) => {
  // takes a string and returns it with the first character capitalized.
  const fistChar = string.substring(0, 1);
  const restOfString = string.substring(1);
  return fistChar.toUpperCase() + restOfString;

  // return string.substring(0, 1).toUpperCase() + string.substring(1);
};
