// scope === variable access
// context === this

var a = 1;
console.log(`window.a === a: ${window.a === a}`)

function foo() {
    var b = 2;
    var a = 5; //naming conflict
    // a = 4; //changes root variable
    console.log(a)
}

function bar() {
    a = 3;
    console.log(a);
}

console.log(a);
foo();
console.log(a);
bar();
console.log(a);
// console.group(b); error, because b's scope is inside foo()