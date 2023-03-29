// 29 MAR 2023
const palindromes = function (x) {
        let oldString = x.replaceAll(/[.,!\s]/g,'').toLowerCase();
        let reverseString = '';
        for (i = oldString.length - 1; i >= 0; i--) {
            reverseString += oldString[i];
        }
        
        outside: for (i = 0; i < oldString.length; i++) {
            if (oldString[i] === reverseString[i]) {
                continue outside;
            } else {
                return false;
            }
        }
        return true;

        // OR
        // const processString = x.toLowerCase().replace(/[^a-z]/g,'');
        // console.log(`x.toLowerCase().replace(/[^a-z]/g,'') = ${x}`);
        // console.log(`processString = ${processString}`);
        // console.log(`processString.split('') = ${processString.split('')}`);
        // console.log(`processString.split('').reverse() = ${processString.split('').reverse()}`);
        // console.log(`processString.split('').reverse().join('') = ${processString.split('').reverse().join('')}`);
        // return processString.split('').reverse().join('') == processString;
    };
// Do not edit below this line
module.exports = palindromes;
