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

age;
AGE;

// Between 500 and 1000
const RANDOM_WAIT_TIME = Math.round(Math.random() * 500) + 500;

const startTime = new Date();
startTime;
let endTime: Date; // Of type any which is the most flexible type by default
endTime;
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
const result2 = add(3, 4); // Must both be numbers

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
const thisCar: any[] = ["Ford", "Mustang"];
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

// Function type alias
type SimpleMathFunction = (a: number, b: number) => number;

// Function expression
const adder: SimpleMathFunction = function (a, b) {
  return a + b;
};

// Function expression (arrow function)
const arrowAdder: SimpleMathFunction = (a, b) => a + b;

// Also possible to use with a function declaration
function minuser(a, b): ReturnType<SimpleMathFunction> {
  return a - b;
}

const result = adder(1, 2);
const result3 = arrowAdder(3, 4);
const result4 = minuser(3, 2);

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

// Interfaces

// Describe object types.  Cannot be used with a union |

interface UserInfo {
  // TitleCase by convention - no = operator
  // Properties
  name: string;
  age: number;

  // Methods
  speak(emotion: string): void;
}

class User implements UserInfo {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  speak(emotion: string): void {
    console.log(`My name is ${this.name} and I am ${emotion}`);
  }

  walk(): void {}
}

const emma = new User("Emma", 40);

function makeUserAngry(user: UserInfo): void {
  // Can use interfaces to enforce objects being able to do certain things ala polymorphism
  user.speak("ANGRY");
}

makeUserAngry(emma);

interface UserInfo {
  // Intefaces can be added to later
  walk(): void;
}

type Primative = number | string | boolean | null;

// JSON exmaple
type JSONObject = { [k: string]: JSONValue };
type JSONArray = JSONValue[];
type JSONValue = Primative | JSONObject | JSONArray;

////// DO NOT EDIT ANY CODE BELOW THIS LINE //////
function isJSON(arg: JSONValue) {}

// POSITIVE test cases (must pass)
isJSON("hello");
isJSON([4, 8, 15, 16, 23, 42]);
isJSON({ greeting: "hello" });
isJSON(false);
isJSON(true);
isJSON(null);
isJSON({ a: { b: [2, 3, "foo"] } });

// NEGATIVE test cases (must fail)
//isJSON(() => "");
//isJSON(class {});
//isJSON(undefined);
//isJSON(BigInt(143));
//isJSON(isJSON);

// Function types

// () signify a callable

// Can be defined with an interface
interface TwoNumberPureFunctionInterface {
  (a: number, b: number): number;
}

// Or type, these two are equivilant
type TwoNumberPureFunctionType = (a: number, b: number) => number;

const adderator: TwoNumberPureFunctionInterface = (a, b) => {
  // No need to type annotate here now as infered from interface
  return a + b;
};

const suberator: TwoNumberPureFunctionType = (a, b) => {
  // No need to type annotate here now as infered from type
  return a - b;
};

adderator(1, 2);
suberator(3, 1);

// Void vs undefined

function justPrints(): void {
  console.log("Hello");
  // Returns undefined by efault but void means explicilty shouldn't be used
}

function justPrintReturnsUndefiend(): undefined {
  console.log("Hello");
  // Returns undefined by efault but void means explicilty shouldn't be used
}

const printed = justPrints();
const printedUndefined = justPrintReturnsUndefiend();

// Construct signatures

interface DateConstructor {
  new (value: number): Date;
}
const myDateConsructor: DateConstructor = Date;
const myDate = new myDateConsructor();
myDate;

// Function overloading

function twoNumbersOrStrings(a: number, b: number): number;
function twoNumbersOrStrings(a: string, b: string): string;
function twoNumbersOrStrings(
  a: number | string,
  b: number | string
): number | string {
  // Narrowing types
  if (typeof a === "number" && typeof b === "number") {
    return a + b;
  } else if (typeof a === "string" && typeof b === "string") {
    return "Concatenated:" + a + " " + b;
  }
}

twoNumbersOrStrings(1, 3);
twoNumbersOrStrings("hello", " goodbye");

// Class properties

// Public - anyone - default
// Private - only this class
// Protected - this class or classes which extend this class

// Only at compile time does not actually restrict access at runtime

class myClassWithSecrets {
  public name: string;
  private serialNumber: number;
  #secretKey: number; // Actually private - must be declared explicitly
  readonly year: number; // Cannot be changed once instantiated

  public constructor(name: string, year: number) {
    this.year = year;
    this.name = name;
    this.serialNumber = Math.random() * 1000;
  }

  public get SRN() {
    return "SRN" + this.serialNumber;
  }
}

const secrets = new myClassWithSecrets("Emma", 2023);
console.log(secrets.name);

class ClassWithParamProperties {
  // No need for declarations
  public constructor(readonly year: number, public name: string) {}
}

const myClassWithParamProperties = new ClassWithParamProperties(1983, "Ric");
console.log(myClassWithParamProperties.year);

// Top types

const anyName: any = null; // Could be anything
anyName;
const banana: unknown = "hello";
if (typeof banana === "string") {
  // unknown must be narrowed later
  // Banana
}

// Narrowing

let couldBeAnything:
  | number
  | string
  | Date
  | "banana"
  | number[]
  | 1
  | null
  | {
      dateRange: [Date, Date];
      name: string;
    };

if (couldBeAnything instanceof Date) {
  // instanceof
  couldBeAnything.getDay; // Definately a Date
}

if (typeof couldBeAnything === "number") {
  // typeof
  console.log(couldBeAnything + 5); // Definately a number - could be 1 or any other number
}

if (couldBeAnything === 1) {
  // Specfic value check - number literal here
}

if (!couldBeAnything) {
  // Truthy aka not null here
  couldBeAnything;
}

if (Array.isArray(couldBeAnything)) {
  // An array - therfore an array of numbers
  couldBeAnything;
}

if (typeof couldBeAnything === "object" && "dateRange" in couldBeAnything) {
  // Is an object, and that has a particlular property
}

// Custom types for narrowing

interface Drivable {
  engine: "string";
  drive(): void;
}

let possiblyDrivable: unknown;

function isDrivable(maybeDrivable: unknown): maybeDrivable is Drivable {
  return (
    maybeDrivable &&
    typeof maybeDrivable === "object" &&
    typeof maybeDrivable["engine"] === "string" &&
    typeof maybeDrivable["drive"] === "function"
  );
}

if (isDrivable(possiblyDrivable)) {
  possiblyDrivable; // OK it does conform to the Interface of Drivable
} else {
  possiblyDrivable; // Still don't know what it is
}

function assertsIsDrivable(
  maybeDrivable: unknown
): asserts maybeDrivable is Drivable {
  if (
    !(
      maybeDrivable &&
      typeof maybeDrivable === "object" &&
      typeof maybeDrivable["engine"] === "string" &&
      typeof maybeDrivable["drive"] === "function"
    )
  )
    throw new Error("Value is not driveable");
}

possiblyDrivable; // We don't know yet if it is driveable

assertsIsDrivable(possiblyDrivable); // Throws an error if not driveable

possiblyDrivable; // Now we know it is in fact driveable

// Nullish values

// Null undefined void

// Null is no value
// Undefined is no value yet but possible later
// Void means ignore any return type
// ? optional param value
// ! non-null ascertion ensures prior value is not null or undefined

type GroceryCart = {
  fruits?: { name: string; qty: number }[];
  vegetables?: { name: string; qty: number }[];
};

const cart: GroceryCart = {};

cart.fruits.push({ name: "kumkuat", qty: 1 }); // Will error at runtime

// So we can guard

const fullCart: GroceryCart = {
  fruits: [{ name: "Banana", qty: 1 }],
  vegetables: [{ name: "Banana", qty: 1 }],
};

function checkFruits(cart: GroceryCart) {
  if (!cart.fruits) {
    throw new Error("No fruits sir!");
  }
}

checkFruits(fullCart);

// Now we KNOW fruits are present
fullCart.fruits.push({ name: "Kiwi", qty: 100 });

// Generics

// Sometimes we want to define a type but without knowing in advance the exacty types of everything
// These can be decided later

function genericFunction<T>(a: T): T {
  // Declare a type T, use it to define the param and return type to tie them all together
  // <T> captures the type for later use
  // Just returns the argument so not overly useful
  return a;
}

genericFunction(1); // T are now all numbers

function genericFunction2<T, K>(a: T, b: K): [T, K] {
  // Declare types T and K, use it to define the params and return types to tie them all together
  // Returns a tuple pair of the inputs which can be different types
  return [a, b];
}

genericFunction2(1, 2); // [1, 2]
genericFunction2("name", 1); // ['name', 1]

// Now we don't need to use any to set the types of the inputs and outputs but can tie them together

// Also possible to call generic functions and explicitly set the type
genericFunction<string>("hello");

// Type queries
// Extracting the type from values

// keyof

type DatePropertyNames = keyof Date; // Not all of the same type // Date interface NOT object
type DateStringPropertyNames = keyof Date & string; // All string types
type DateSymbolPropertyNames = keyof Date & symbol; // All symbol types

interface objectWithKeys {
  banana: boolean;
  apple: boolean;
}

type Fruits = keyof objectWithKeys; // Union of all the keys aka banana | apple

function printFruits(a: Fruits) {
  console.log(a);
}

printFruits("banana"); // Fine
printFruits("cheese"); // Not fine

// typeof

// Extracts a string of a value
const hello = "hello";
type aString = typeof hello; // aString type is string NOT hello NOT the string literal type "string"
const hello2: aString = "banana"; // Fine

// Indexed types

type Car = {
  color: string;
  age: number;
};

const myCar = {
  name: "ford",
};

const kljlk = "lklk";
type jkjh = typeof kljlk;

const carNm = typeof myCar;

const carColor: Car["color"] = "red"; // string
const carAge: Car["age"] = 10; // number
const carSomething: Car["age" | "color"] = 10; // number or string

// Type registry pattern

// In our registry

interface Vehicle {
  // Empty by design
}

// In a use case

function doSomethingWithAVehiclePart(part: Vehicle) {
  // Whatever
}

// In a data file later for particular vehicles

// car.ts

declare module "../lib/registry" {
  export interface Vehicle {
    wheels: 4;
  }
}

// Callables aka call signatures

interface TwoNumberCalculation {
  (x: number, y: number): number;
}

type TwoNumberCalc = (x: number, y: number) => number; // Note => not :

const addificator: TwoNumberCalc = (a, b) => a + b;
const substractificator: TwoNumberCalc = (a, b) => a - b;

function runner(myFunc: TwoNumberCalc, a: number, b: number): number {
  // Used to define the shape of a callback
  return myFunc(a, b);
}

// Void

// Ignore any return

function voiderator(): void {
  // Returns undefined by detault - void means ignroe it and don't do anythig with it
}

function funCallback(myCallback: () => void) {
  myCallback(); // Any return is ignored :)
}

// Constructables
// aka can new up via a constructor

class MyCoolClass {
  constructor(private _name: string) {}

  get name() {
    return this._name;
  }
}

interface CoolConstructor {
  new (name: string): MyCoolClass;
}

const myCoolObject = new MyCoolClass("Emma");
myCoolObject.name;

function coolCallbacker(f: CoolConstructor): void {
  const coolObject = new f("Emma");
  console.log(coolObject.name);
}

coolCallbacker(MyCoolClass);

// This

const myButton: HTMLElement = document.getElementById("myButton");

function clickHandler(this: HTMLButtonElement, e: Event) {
  // This isn't a paramter but looks like one, defines what kind of element this points to
  // It is a fake parameter and needs cto be in the first position
  // It will be compiled away
  this.disabled = true;
}

myButton.addEventListener("click", clickHandler);

// Test comment for merging
