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

// Primatives 

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

// Functions

function add(a: number, b: number): number { // Any type by default // But made explicit with : number
    return a + b; // Strings? Numbers? Both? // Return type also any by default // But made implicit number // Can be explicit using : number
}

// Now the function is clearly meant to accept and return numbers only
const result = add(3, 4); // Must both be numbers

// Objects

// Standard object literal
let probablyACar = {
    make: "Ford",
    model: "Focus",
    year: 2007
}

// define a literal type
let defCar: {
    make: string,
    model: string,
    year: number,
    voltage?: number
}

// And it's value - we can be sure it conforms
defCar = {
    make: "Ford",
    model: "Focus",
    year: 2007
}

// A function which takes a car object with typed properties
function printCar(car: { 
    make: string,
    model: string,
    year: number,
    voltage?: number // Dfferent from : number | undefined as this will have to be expilcitly declared
    // Checks for exess properties also :) shape must be this and only this
    // Onky when param arg is an object literal in call
    }):void {
        let output: string = `Car: ${car.make} ${car.model}, ${car.year}`

        if(typeof car.voltage !== "undefined") {
            output += ` ${car.voltage}v`;
        }
        console.log(output);
    }

printCar(defCar); // Now only cars with the right shape can be used