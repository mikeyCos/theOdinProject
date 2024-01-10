const palindromeCheck = (string) => {
  if (string.length === 0) return true;

  if (string[0] === string[string.length - 1]) {
    return palindromeCheck(string.slice(1, -1));
  }
  return false;
};

const palindrome = (string) => {
  return palindromeCheck(string) ? `${string} is a palindrome` : `${string} is NOT a palindrome`;
};

export default palindrome;
