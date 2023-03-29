// 27 MAR 2023
// https://javascript.info/object

// ***************************************************************
// Hello, object

// Write the code, one line for each action:
// Create an empty object user.
// Add the property name with the value John.
// Add the property surname with the value Smith.
// Change the value of the name to Pete.
// Remove the property name from the object.

// ANSWER BETWEEN THIS
let user = {};
user.name = 'John';
user.surname = 'Smith';
console.log('before change');
for (let key in user) {
    console.log(key + ': ' + user[key]);
}
user.name = 'Pete';
console.log('after changes')
for (let key in user) {
    console.log(key + ': ' + user[key]);
}
delete user.name;
console.log('after delete')
for (let key in user) {
    console.log(key + ': ' + user[key]);
}
// ANSWER BETWEEN THIS

// ***************************************************************
// Check for emptiness

// Write the function isEmpty(obj) which returns true if the object has no properties, false otherwise.
// Should work like that:
let schedule = {};

// ANSWER BETWEEN THIS
function isEmpty(obj) {
    for (let prop in obj) {
        return false;
    }
    return true;
}
// ANSWER BETWEEN THIS

alert( isEmpty(schedule) ); // true

schedule["8:30"] = "get up";

alert( isEmpty(schedule) ); // false

// ***************************************************************
// Sum object properties

// We have an object storing salaries of our team:
let salaries = {
    John: 100,
    Ann: 160,
    Pete: 130
}
// Write the code to sum all salaries and store in the variable sum. Should be 390 in the example above.
// If salaries is empty, then the result must be 0.

// ANSWER BETWEEN THIS
let sum = 0;
for (person in salaries) {
    console.log(sum);
    sum += salaries[person];
}
console.log(sum);
// ANSWER BETWEEN THIS

// ***************************************************************
// Multiply numeric property values by 2

// Create a function multiplyNumeric(obj) that multiplies all numeric property values of obj by 2.

// For instance:
// before the call
let menu = {
    width: 200,
    height: 300,
    title: "My menu"
};

// ANSWER BETWEEN THIS
function multiplyNumeric(obj) {
    for (let key in obj) {
        console.log('typeof ' + key + ': ' + typeof obj[key]);
        if(typeof obj[key] == 'number') {
            obj[key] = obj[key] * 2;
        }
    }
}
// ANSWER BETWEEN THIS

multiplyNumeric(menu);

  // after the call
// menu = {
//     width: 400,
//     height: 600,
//     title: "My menu"
// };
// Please note that multiplyNumeric does not need to return anything. It should modify the object in-place.

// P.S. Use typeof to check for a number here.