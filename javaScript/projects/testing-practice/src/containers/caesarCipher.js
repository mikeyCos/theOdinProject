const ALPHABET_ENG_STANDARD = 'abcdefghijklmnopqrstuvwxyz';
const ALPHABET_ENG_BASIC_PUNCTUATION = ' .,?!abcdefghijklmnopqrstuvwxyz';

const generateCipherbet = (key, alphabet) => {
  // Create the ciphertext alphabet
  // By 'shifting' the alphabet to the left by the number of places given by the key.
  let cipherbet = '';
  let length = alphabet.length;
  // a right shift of 1 is the same as a left shift of -1, which is just a shift of 25.
  // if key < 0, then 26 + key
  const shiftKey = key < 0 ? (length + key) % length : key % length;
  let i = shiftKey;
  while (i < length) {
    cipherbet += alphabet[i];
    i += 1;
  }

  return (cipherbet += alphabet.substring(0, shiftKey)).toUpperCase();
};

export default (string, key) => {
  // https://crypto.interactive-maths.com/caesar-shift-cipher.html#intro
  // Takes a string and a shift factor and returns it with each character “shifted”.
  // ABCDEFGHIJKLMNOPQRSTUVWXYZ
  // abcdefghijklmnopqrstuvwxyz
  const text = string.toLowerCase();
  let ciphertext = '';
  // Need a way to decide which alphabet to use
  // if string includes .,?!, then set alphabet to the punctuation version
  const alphabet =
    string.search(/[?.!]+/) !== -1 ? ALPHABET_ENG_BASIC_PUNCTUATION : ALPHABET_ENG_STANDARD;
  const cipherbet = generateCipherbet(key, alphabet);
  for (let j = 0; j < text.length; j += 1) {
    ciphertext += alphabet.indexOf(text[j]) !== -1 ? cipherbet[alphabet.indexOf(text[j])] : text[j];
  }

  return ciphertext;
};
