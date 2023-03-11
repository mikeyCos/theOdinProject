const reverseString = function(word) {
    let reverseWord = '';
    for(i = word.length; i >= 0; i--) {
        reverseWord += word.charAt(i);
    }
    return reverseWord;
};

// Do not edit below this line
module.exports = reverseString;
