/** 
 * Create a promise that resolves after some time
 * @param n number of milliseconds before promise resolves
 */

function timeout(n: number) {
    return new Promise((res) => setTimeout(res, n));
}

/**
 * Add three numbers
 * @param a first number
 * @param b second number
 */

async function addNumbers(a: number, b: number) {
    await timeout(500);
    return a + b;
}

//== Run the program ==//
(async () => {
    console.log(await addNumbers(3, 4));
})()

let age = 6; // A number - the number type is immutable but the value can change
const AGE = 6; // A 6 - is a const so TS can infer a value as a literal type

// Between 500 and 1000
const RANDOM_WAIT_TIME = Math.round(Math.random() * 500) + 500;

let startTime = new Date();
let endTime: Date; // Of type any which is the most flexible type by default
// But using an explicit declaration we can narrow the type to just a date

setTimeout(() => {
    // endTime = 0; // Now we have endTime as a Date we can't assign a number
    endTime = new Date();
}, RANDOM_WAIT_TIME);

function add(a: number, b: number): number { // Any type by default // But made explicit with : number
    return a + b; // Strings? Numbers? Both? // Return type also any by default // But made implicit number // Can be explicit using : number
}

// Now the function is clearly meant to accept and return numbers only
const result = add(3, 4); // Must both be numbers

