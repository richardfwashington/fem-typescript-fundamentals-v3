// Implicit vs explicit

const myNumber = 6; // Implicit literal type
const myNumber2: number = 5; // Implicit literal type

// Types

// Primitve
const myString: string = "hello"; // A string
const isTrue = true; // Boolean

// New
enum Material {
  Wood,
  Metal,
}

// Top
let anything: any; // Could be anything!
let somethingNotSureYet: unknown; // Must be claified later with narrowing

// Bottom
const oooohNo: never = undefined; // Must not be anything but undefined, if so we have a problem

// Nullish
const alwaysNull: null = null; // Absolutley null
const weDontKnowYet: undefined = undefined; // We don't know yet

// Void
function dontDoAnythingIfIReturnSOmething(): void {
  // Only useful in function returns
  // Ignore anything that is returned - to cater to undefined
}

// Object
const mainPerson: object = {
  name: "Emma",
};

// Functions
function myCoolFunction(a: number, b: number): number {
  // Parameter types + return types
  return a + b;
}

// Arrays
const anArrayOfNumbers: number[] = [1, 2, 3, 4]; // Array of numbers
const myTuple: [number, string] = [1, "hello"]; // A tuple of length 2

// Discriminated unions
// Telling TS which of the union types we have
// Only works on union types where there is no intersection
type Fruit = "banna" | "apple";

const myFruit: Fruit = "banna";

function fruitBowl(fruitItem: Fruit): void {
  if (fruitItem === "banna") {
    fruitItem; // TS now knows the type
  } else {
    fruitItem;
  }
}

fruitBowl(myFruit);

// Types

type UserObject = {
  name: string;
  age: number;
};

interface CanSing {
  sing(): void;
}

function makeUserSing(user: CanSing): void {
  user.sing();
}

const singingUser: CanSing = {
  name: "Richard",
  age: 39,
  sing() {
    console.log("Can I sing a question insead?");
  },
};

makeUserSing(singingUser);
