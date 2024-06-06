export default () => {
  // Returns the first 6 characters from crypto.randomUUID()
  // Pseudo-randomly changes a lowercase letter to uppercase
  const uuid = crypto.randomUUID();
  return [...uuid.substring(0, uuid.indexOf("-"))].reduce(
    (word, currentChar) => {
      const check = Math.floor(Math.random() * 2);
      if (check == false && currentChar.match(/[a-z]/)) {
        return word + currentChar.toUpperCase();
      }
      return word + currentChar;
    }
  );
};
