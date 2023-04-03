// 31 MAR 2023
const findTheOldest = function(arr) {
    return arr.reduce((oldestPerson, nextPerson) => {
        const oldestPersonAge = getAge(oldestPerson.yearOfDeath, oldestPerson.yearOfBirth);
        const nextPersonAge = getAge(nextPerson.yearOfDeath, nextPerson.yearOfBirth);
        if (oldestPersonAge < nextPersonAge) {
            oldestPerson = nextPerson;
        }
        return oldestPerson;
        // OR
        // return (oldestPersonAge < nextPersonAge) ? oldestPerson = nextPerson : oldestPerson;
    });
};

const getAge = function(deathYear, birthYear) {
    if (deathYear === undefined) {
        deathYear = new Date().getFullYear();
    }
    return deathYear - birthYear;
}
// Do not edit below this line
module.exports = findTheOldest;
