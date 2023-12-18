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
})();

// Primatives

const age = 6; // A number - the number type is immutable but the value can change
const AGE = 6; // A 6 - is a const so TS can infer a value as a literal type

// Between 500 and 1000
const RANDOM_WAIT_TIME = Math.round(Math.random() * 500) + 500;

const startTime = new Date();
let endTime: Date; // Of type any which is the most flexible type by default
// But using an explicit declaration we can narrow the type to just a date

setTimeout(() => {
  // endTime = 0; // Now we have endTime as a Date we can't assign a number
  endTime = new Date();
}, RANDOM_WAIT_TIME);

// Functions

function add(a: number, b: number): number {
  // Any type by default // But made explicit with : number
  return a + b; // Strings? Numbers? Both? // Return type also any by default // But made implicit number // Can be explicit using : number
}

// Now the function is clearly meant to accept and return numbers only
const result = add(3, 4); // Must both be numbers

// Objects

// Standard object literal
const probablyACar = {
  make: "Ford",
  model: "Focus",
  year: 2007,
};

// define a literal type
const defCar: {
  make: string;
  model: string;
  year: number;
  voltage?: number;
} =
  // And it's value - we can be sure it conforms
  {
    make: "Ford",
    model: "Focus",
    year: 2007,
  };

// A function which takes a car object with typed properties
function printCar(car: {
  make: string;
  model: string;
  year: number;
  voltage?: number; // Dfferent from : number | undefined as this will have to be expilcitly declared
  // Checks for exess properties also :) shape must be this and only this
  // Onky when param arg is an object literal in call
}): void {
  let output: string = `Car: ${car.make} ${car.model}, ${car.year}`;

  if (typeof car.voltage !== "undefined") {
    output += ` ${car.voltage}v`;
  }
  console.log(output);
}

printCar(defCar); // Now only cars with the right shape can be used

// Index keys for dictionaries

const person: {
  [key: string]: {
    // Each item in the object must have a string key with an object value, each with name, age, dob properties
    name: string;
    age: number;
    dob: Date;
  };
} = {}; // Must be initialised - here with no values

person.bob = { name: "Bob", age: 75, dob: new Date() };

// Arrays

const extensions = ["js", "ts"]; // Simple arries work well with inference - here an array of strings
extensions.push("json"); // Only strings

const myCar = ["Ford", "Focus", 2007]; // Now string OR numbers inferred of any length
const aCar: [string, string, number] = ["Ford", "Focus", 2007]; // Now a tuple with definite length and types of each element in order

// Union types (OR ||)
function flipCoin(): "heads" | "tails" {
  // Literal string with value heads or tails
  return Math.random() > 0.5 ? "heads" : "tails";
}

const outcome = flipCoin();

function maybeGetUserInfo():
  | ["error", Error]
  | [
      "success",
      {
        name: string;
        age: number;
      }
    ] {
  if (flipCoin() === "heads") {
    return [
      "success",
      {
        name: "Emma",
        age: 40,
      },
    ];
  } else {
    return ["error", new Error("Failed to get get info")];
  }
}

const userInfo = maybeGetUserInfo();

const [userStatus, userResult] = userInfo;

if (userStatus === "success") {
  // Narrow the result to success using string value check
  userResult.age; // ...do whatever
} else {
  userResult.message; // ...do whatever
}

if (userResult instanceof Error) {
  // Narrow the result to the error using instance of operator to detect an Error derived object
  userResult.message; // ...do whatever
} else {
  userResult.age; // ...do whatever
}

// This is a discriminated or tagged union type as we have a string label in the 0th position in the tuples
// Error and success in this case are the tags and re used to determine contents in the 1st position

// Intersection types (AND &&)

// Used less often then union types

function makeWeek(): Date & { end: Date } {
  // Returns something which is both a Date and has a property called end which is also a date
  const start = new Date();
  const end = new Date(start.valueOf() + 60 * 60 * 24 * 7);

  return { ...start, end };
}

const thisWeek = makeWeek();
thisWeek.toISOString();

thisWeek.end.toISOString();

// Type aliases

type UserContactInfo = {
  // TitleCase by convention
  // Define the type once here so we can point to it whenever we need it
  name: string;
  email: string;
};

function printContactInfo(info: UserContactInfo): void {
  // Accept UserContactInfo
  console.log(`${info.name} ${info.email}`);
}

const user: UserContactInfo = {
  // Define an object with the shape of UserContactInfo
  name: "Emma",
  email: "@aol.com",
};

printContactInfo(user); // Use the shaped object as an argument to our function

// Example of cleaned up code using a type alias

type UserInfoOutcomeError = ["error", Error];
type UserInfoOutcomeSuccess = [
  "success",
  {
    name: string;
    age: number;
  }
];
type UserIndoOutcomes = UserInfoOutcomeError | UserInfoOutcomeSuccess;

function cleanMaybeGetUserInfo(): UserIndoOutcomes {
  if (flipCoin() === "heads") {
    return [
      "success",
      {
        name: "Emma",
        age: 40,
      },
    ];
  } else {
    return ["error", new Error("Failed to get get info")];
  }
}

const possibleUserDetails = cleanMaybeGetUserInfo();
console.log(possibleUserDetails);
