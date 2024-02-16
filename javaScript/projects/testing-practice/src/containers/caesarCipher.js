const ALPHABET_ENG_STANDARD = 'abcdefghijklmnopqrstuvwxyz';
const PUNCTUATION = ' .,?!';
const NUMBERS = '0123456789';
// This module currently only works for encrypting
// To decrypt a casear cipher,
//  If there are no lowercase letters and a key is given
//    Use the inverse of the key, -5 => 5 or 2 => -2
//    *WARNING, The given key could be the correct key

const generateCipherbet = (key, alphabet) => {
  // Create the ciphertext alphabet
  // By 'shifting' the alphabet to the left by the number of places given by the key.
  let cipherbet = '';
  const length = alphabet.length;
  const shiftKey = key < 0 ? (length + key) % length : key % length;
  let i = shiftKey;

  while (i < length) {
    cipherbet += alphabet[i];
    i += 1;
  }

  return (cipherbet += alphabet.substring(0, shiftKey)).toUpperCase();
};

const generateAlphabet = (string) => {
  let alphabet =
    string.search(/[?.!]+/) !== -1 ? PUNCTUATION + ALPHABET_ENG_STANDARD : ALPHABET_ENG_STANDARD;
  if (string.search(/[0-9]+/) !== -1) alphabet += NUMBERS;
  return alphabet;
};

export default (string, key) => {
  // https://crypto.interactive-maths.com/caesar-shift-cipher.html#intro
  // Takes a string and a shift factor and returns it with each character “shifted”.
  const text = string.toLowerCase();
  let ciphertext = '';
  const alphabet = generateAlphabet(string);
  const cipherbet = generateCipherbet(key, alphabet);

  for (let j = 0; j < text.length; j += 1) {
    ciphertext += alphabet.indexOf(text[j]) !== -1 ? cipherbet[alphabet.indexOf(text[j])] : text[j];
  }

  return ciphertext;
};
