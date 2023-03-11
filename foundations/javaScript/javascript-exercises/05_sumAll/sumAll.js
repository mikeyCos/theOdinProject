const sumAll = function(num1, num2) {
    let sum = 0;
    
    if (num1 > 0 && num2 > 0 && typeof num1 == typeof sum && typeof num2 == typeof sum) {
        if (num1 < num2) {
            for (i = num1; i <= num2; i++) {
                sum += i;
            }
        } else {
            for (i = num2; i <= num1; i++) {
                sum += i;
            }
        };
        return sum;
    } else {
        return `ERROR`;
    }
}

sumAll(1, 4);
// Do not edit below this line
module.exports = sumAll;
