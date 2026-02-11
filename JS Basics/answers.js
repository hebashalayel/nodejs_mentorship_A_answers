// variables
// Q1
console.log(y);
let y = 10;
// ReferenceError:Cannot access y before initialization (let not Hoisted)
// // Q2
var a = 2;
var a = 5;
console.log(a);
// 5 (var can be redeclared)
// // Q3
let b = 100;
{
    let b = 50;
    console.log(b);
console.log(b);
//50 100 (b=50 block scop so log 50 outside block can not see it so log 100)
// // Q4
const obj = { name: "NodeJS" };
obj.name = "JavaScript";
console.log(obj.name);
// JavaScript (const can modify the content but not reference)

// // Q5
x = 42;
console.log(global.x === x);
//true (when initialize x without declar using va,let,const will be globall variable)
// // Q6
function test() {
    var z = 1;
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
var foo = function () { console.log('A'); };
function foo() { console.log('B'); }
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
    var x = 10;
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
    a: () => this.val,
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
    const inner = () => Array.from(arguments).length;
    return inner(1, 2, 3);
}
console.log(outer(10, 20));
//2 (arrow fun. don't have their own arg. inherit from outer)

// // Q17
const out = [];
for (var i = 0; i < 3; i++) {
    out.push(() => i);
}
console.log(out[0](), out[1](), out[2]());
// 3 3 3 (var => create a single variable not new variable for each iteration ,
// in each iteration create fun. that return i and push to out, when call fun. will return  single variable i that contain 3 )
// to log 0 1 2  just replace var with let=> create new variable conatin value for each iteration


// // Q18
function h(x) {
    {
        let x = x || 5;
        console.log(x);
    }
}
h(0);
//ReferenceError cannot access x before initialization
//inside block let x= x||5 the right hand side excute first
//x||5 js engine try to get value of x inside block there is let x but still not initialized so get referenceerror
//it is posiible to replace let x with let y to solve problem , compiler will get the value of paramete x.


// // Q19
function applyTwice(fn, n) {
    return fn(fn(n));
}
let base = 2;
function addBase(x) { return x + base; }
base = 3;
console.log(applyTwice(addBase, 4));
//10 => addbase save referenece of base variable not save its value
//when call appplytwice(addbase,4) => addbase(4)=>return 4 + current value of base=3 >7 addbase(7)=>10


// // Q20
const counter = {
    n: 0,
    inc: () => ++this.n
};
console.log(counter.inc(), counter.inc());
//NaN NaN (arrow function not have its own this so undefined++ will get Nan)

// // Q21
const obj = {
    x: 10,
    normal: function () { return this.x; },
    arrow: () => this.x
};
console.log(obj.normal(), obj.arrow());
//10 undefined

// // Q22
function* gen() {
    yield 1;
    yield 2;
    return 3;
}
const g = gen();
console.log(g.next().value, g.next().value, g.next().value);
//1 2 3


// // Q23
async function f() {
    return 5;
}
f().then(v => console.log(v));
//5(async return promise 5 wrapped in resolved promise )

// // Q24
(function (n) {
    console.log(n * n);
})(4);
//16 (Immediately invoked function)

// // Q25
function delay(ms) {
    return new Promise(r => setTimeout(() => r("done"), ms));
}
(async function () {
    const res = await delay(100);
    console.log(res);
})();
// done after waiting 100ms (delay fun. return promis resolve to done after n ms , async fun. wait the peomis to resolve then log the res)

// // Q26
const f = function fact(n) {
    return n <= 1 ? 1 : n * fact(n - 1);
};
console.log(f(4));
// 24

// // Q27
function* seq() {
    yield 'A';
    yield 'B';
}
for (const val of seq()) {
    console.log(val);
}
//A B (for of to iterate through all values until done : true)


// // Q28
const make = () => ({ a: 1 });
console.log(make());
//{a:1} if not use () will not print {a:1} will interpreted as function body not object

// // Q29
function* g1() { yield 1; yield 2; }
function* g2() { yield* g1(); yield 3; }
console.log([...g2()]);
//[1, 2, 3] yield* g1()=> yields all values from g1() [...g2()]=> collect all yielded values into array.


// // Q30
setTimeout(function () {
    console.log(this === global);
}, 0);

setTimeout(() => {
    console.log(this === global);
}, 0);
//false false but if use non strict mode the output will be true false.

// // Q31
async function* ag() {
    yield 1;
    yield 2;
}
(async () => {
    for await (const x of ag()) {
        console.log(x);
    }
})();
// 1 2  (async generator auto. wrap the return values in resolve promise and for await  of unwrap them )



// // strings

// // Q32
console.log("5" + 3 + 2);
//532 (string first then numbers => concatenate numbers as string not excute sum)

// // Q33
let str = "  NodeJS  ";
console.log(str.trim().length);
//6 trim() remove spaces frome start and end

// // Q34
let text = "JavaScript";
console.log(text.slice(4, 10), text.substring(4, 10));
//Script Script both extract text from index 4 to index 9 not include 10

// // Q35
console.log("Line1\nLine2".length);
// 11 Line1=>5 Line2=>5 \n=>1

// // Q36
let s = "foo foo";
console.log(s.replace("foo", "bar"), s.replace(/foo/g, "bar"));
//bar foo bar bar (s.replace("foo", "bar") => s= bar foo , s.replace(/foo/g, "bar")=> s= bar bar)

// // Q37
let str = "a,b,c";
console.log(str.split(",").join("-"));
// a-b-c (split will return array of chars. then join will conctenate chars. and put - between char and char)

// // Q38
console.log(+"42" === Number("42"));
//true (+ unary operation convert string to number, the same for Number so the result will be true)

// // Q39
let str = "Hello";
console.log(str[str.length - 1]);
// o ([str.length - 1] => last char.)

// // Q40
let str = "Hello";
console.log(str.slice(-1));
// o (negative index (start from end) -1 => last char.)

// // Q41
console.log("\u004E\u006F\u0064\u0065");
//Node (\u followed by 4 hexadecimal digits =>  unicode char. in js string)


// // arrays

// // Q42
const arr = [5, 10, 15, 20];
console.log(arr.filter(x => x > 10));
//[15,20] => filter return array contain elements match x > 10 condition

// // Q43
const arr = [1, 2, 3, 4];
const total = arr.reduce((acc, cur) => acc + cur, 0);
console.log(total);
//10 (accumulator start from 0 then iterate through array and sum each element to acc.)

// // Q44
const arr = [1, 2, 3];
const res = arr.reduce((acc, cur) => acc + cur, 10);
console.log(res);
//16 (accumulator start from 10 then iterate through array and sum each element to acc.)

// // Q45
const nums = [1, 2, 3];
const a = nums.map(x => x * 2);
const b = nums.forEach(x => x * 2);
console.log(a, b);
//[2,4,6] undefined (map return new array and store in a but foreach not return anything so b will be undefined)


// // Q46
const arr = [7, 14, 21];
console.log(arr.find(x => x % 7 === 0), arr.filter(x => x % 7 === 0));
//7 [7,14,21] (find return first element match the condition but filtter iterate through array to find all elements match the condition and return array)

// // Q47
const arr = [2, 4, 6];
console.log(arr.some(x => x % 2 === 1), arr.every(x => x % 2 === 0));
//false true (there is no any alement odd in arr so some will return false and all nums in arr are even so every will return true)

// // Q48
const arr = [1, 2, 3];
console.log(arr.flatMap(x => [x, x * 2]));
//[1,2,2,4,3,6] (map each num. to [num, num*2] => [[1,2],[2,4],[3,6]] then flat)

// // Q49
const arr = [1, 2, 3, 4, 5];
const res = arr.map(x => x * 2).filter(x => x > 5);
console.log(res);
//[6,8,10] ( map will return [2,4,6,8,10] then apply filter x>5 will return [6,8,10])

// // Q50
const arr = ['a', 'b', 'a', 'c', 'b'];
const count = arr.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
}, {});
console.log(count);
// {a:2 , b:2 , c:1} (start with empty object then iterate through arr
// if the cher. not exist in acc => acc[cur] this will return undefined
// undefined||0 =>0 then 0+1 =1
// then if the char exist in acc => acc[cur] will return the count of char and then increase it
// so reduce will return object contain char. in arr and it's number of occurence


// Types

// Q51
console.log(Number("10px"))
console.log(parseInt("10px"))
// Nan 10 (10px "px" not a number return Nan parseInt parse string to number until it get non numeric char)

// Q52
console.log(isNaN("foo"), Number.isNaN("foo"));
// true false (isNaN("foo") converts to NaN first, while Number.isNaN("foo") it checks the exact value without conversion.)

// Q53
const a = 2, b = "3";
console.log(`${a + b}`);
// 23 (number string =>string)




// Loops

// Q54
const a = [10];
a.foo = 99;
for (const k in a) console.log("in:", k); //  Iterates over enumerable properties including array indices and custom properties
for (const v of a) console.log("of:", v); //  Iterates over array values ignores custom properties
// in: 0 in: foo of: 10 


// Conditions

// Q55
const obj = { a: { b: 0 } };
const x = obj.a?.b ?? 7;
// x =0 (obj.a?.b => first check if obj.a exist then access b if b exist will get the value if not will store 7 )

// Q56
console.log("A" && "" || "C")
// C ("A" && "" =>  retun "" then ""||"C" will return C)
