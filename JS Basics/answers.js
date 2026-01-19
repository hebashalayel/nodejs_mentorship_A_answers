// variables
// Q1
let y = 10;
console.log(y);
// ReferenceError:Cannot access y before initialization (let not Hoisted)
// // Q2
let a = 2;
a = 5;
console.log(a);
// 5 (let can be redeclared in block scope)
// // Q3
let b = 100;
{
    let b = 50;
    console.log(b);
}
console.log(b);
//50 100 (b=50 block scop so log 50 outside block can not see it so log 100)
// // Q4
const obj = { name: "NodeJS" };
obj.name = "JavaScript";
console.log(obj.name);
// JavaScript (const can modify the content but not reference)

// // Q5
let x = 42; // Changed to let to avoid global variable
console.log(global.x === x);
//true (when initialize x without declar using va,let,const will be globall variable)
// // Q6
function test() {
    let z = 1;
    return function () {
        z++;
        return z;
    }
}
const fn = test();
console.log(fn(), fn(), fn());
// 2 3 4 (const fn = test(); -> store the inner function z is preserved between calls not reset each time )
// if try  console.log(test()(), test()(), test()()); without const fn = test(); will log 2 2 2 z is reset to 1 each call.

//--------------------------------------------------------------------------------------------------------------------------
// // scopes and functions

// // Q7
foo();           //B
function foo() { console.log('B'); }
let foo = function () { console.log('A'); };
foo();           // A

//function declaration hoisted with body but in function expression hoisted without value (undefined) like this:
//1- function foo() { console.log('B'); }
//2- var foo;
//3- foo();
//4- foo = function () { console.log('A'); }; // will change foo to log A
//5- foo();
//so first call will log B then log A


// // Q8
function run(x) {
    console.log(x);
    let x = 10; // This will still cause a ReferenceError
    console.log(x);
}
run(5);
//will log 5 then 10

// // Q9
{
    function f() { return 1; }
}
console.log(typeof f);
// function (function declaration is hoisted), but in strict mod will get undefined

// // Q10
const inc = (function () {
    let n = 0;
    return () => ++n;
})();
console.log(inc(), inc(), inc());
//1 2 3 each call to the returned inner function increases and remembers the same internal variable because of the closure
// the same idea of Q6


// // Q11
const obj = {
    val: 7,
    a: function() { return this.val; }, // Changed to a regular function to bind 'this'
    b() { return this.val; }
};
console.log(obj.a(), obj.b());
//Undefined  7  arrow functions don't use the object itself as this but in reqular functions use object as this

// // Q12
const model = {
    x: 3,
    getX() { return this.x; }
};
const fn = model.getX;
console.log(fn());
// const fn = model.getX; this line take reference of method not take object itself so will not access object by calling fn()
//can log it using console.log(model.getX());

// // Q13
const user = { id: 42, get() { return this.id; } };
const g = user.get.bind({ id: 99 });
console.log(g());
// 99 g will excute with id in bind

// // Q14
function sum(a = 2, b = a * 3, c = b + a) {
    return a + b + c;
}
console.log(sum());
//16 will sum default parameters

// // Q15
const f = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
};
const g = f;
f = null; // will get error const cannot reassigned
console.log(g(4));
// if edit it instead of const => let will log 24 (f named function experssion so when edit the reference not affect on recursion )


// // Q16
function outer() {
    const inner = (...args) => args.length;
    return inner(1, 2, 3);
}
console.log(outer(10, 20));
//2 (arrow fun. don't have their own arg. inherit from outer)

// // Q17
const out = [];
for (let i = 0; i < 3; i++) {
    out.push(() => i);
}
console.log(out[0](), out[1](), out[2]());
// 0 1 2 (let => create a new variable for each iteration)
// to log 0 1 2  just replace var with let=> create new variable conatin value for each iteration


// // Q18
function h(x) {
    {
        let xValue = x || 5;
        console.log(xValue);
    }
}
h(0);