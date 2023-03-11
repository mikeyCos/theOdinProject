const removeFromArray = function(array, ...value) {
    for (j = 0; j < array.length; j++) {
        for (i = 0; i < value.length; i++) {
            if (array[j] === value[i]) {
                array.splice(j, 1);
                j--;
            }
        }
    }
    return array;
};
// Do not edit below this line
module.exports = removeFromArray;
