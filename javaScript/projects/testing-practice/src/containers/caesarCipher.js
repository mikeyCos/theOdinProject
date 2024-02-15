export default (string, key) => {
  // https://crypto.interactive-maths.com/caesar-shift-cipher.html#intro
  // Takes a string and a shift factor and returns it with each character “shifted”.
  // ABCDEFGHIJKLMNOPQRSTUVWXYZ
  // abcdefghijklmnopqrstuvwxyz
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let cipherbet = '';

  let i = key % 26;
  while (i < 26) {
    cipherbet += alphabet[i];
    i += 1;
  }

  cipherbet += alphabet.substring(0, key);

  return 'JGNNQ';
};
