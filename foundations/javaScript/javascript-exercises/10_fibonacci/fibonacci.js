// 30 MAR 2023
const fibonacci = function(num) {
    const sequence = [0, 1];
    let index = parseInt(num);
    if (num < 0 || isNaN(num)) return 'OOPS';

    for (i = 0, j = 1; i <= index, j <= index; i++, j++) {
        if (j === index) {
            return sequence[j];
        }
        sequence.push(sequence[i] + sequence[j]);
    }
};
// Do not edit below this line
module.exports = fibonacci;
