// 03 MAR 2023
// https://javascript.info/arrow-functions-basics

// Rewrite with arrow functions
// Replace Function Expressions with arrow functions in the code below:
// function ask(question, yes, no) {
//     if (confirm(question)) yes();
//     else no();
//   }

//   ask(
//     "Do you agree?",
//     function() { alert("You agreed."); },
//     function() { alert("You canceled the execution."); }
//   );

// ANSWER
// let question = confirm("Do you agree?");
// let ask = (question) ?
//     () => alert("You agreed.") :
//     () => alert("You canceled the execution.");

// ask();

// OR
let ask = (question, yes, no) => confirm(question) ? yes() : no() ;
ask(
    "Do you agree?",
    () => alert("You agreed."),
    () => alert("You canceled the execution.")
);

// OR
// function ask(question, yes, no) {
//     if (confirm(question)) yes();
//     else no();
//   }

// ask(
//     "Do you agree?",
//     () => alert("You agreed."),
//     () => alert("You canceled the execution.")
// );
// ANSWER

let colours = function() {
    console.log('red');
    console.log('green');
    console.log('blue');
}

let myColours = colours;