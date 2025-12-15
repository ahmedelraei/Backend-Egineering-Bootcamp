// ============================================
// ES6+ FEATURES: let/const, spread, rest, destructuring
// ============================================

console.log("=== 1. LET vs CONST ===");

// LET - Block scoped, can be reassigned
let count = 0;
count = 10; // OK
console.log(count); // 10

if (true) {
  let blockScoped = "I'm in block";
  console.log(blockScoped); // Accessible
}
// console.log(blockScoped); // Error: not defined

// CONST - Block scoped, cannot be reassigned
const PI = 3.14159;
// PI = 3.14; // Error: Assignment to constant variable

// But const objects/arrays can be modified
const person = { name: "Alice", age: 25 };
person.age = 26; // OK - modifying property
person.city = "NYC"; // OK - adding property
// person = {}; // Error - cannot reassign

const numbers = [1, 2, 3];
numbers.push(4); // OK - modifying array
numbers[0] = 10; // OK - modifying element
// numbers = []; // Error - cannot reassign

console.log(person);
console.log(numbers);

// ============================================
console.log("\n=== 2. SPREAD OPERATOR (...) ===");
// Spreads elements of iterable (array, object, string)

// Arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log(combined); // [1, 2, 3, 4, 5, 6]

// Copy array
const original = [1, 2, 3];
const copy = [...original];
copy.push(4);
console.log(original); // [1, 2, 3] (unchanged)
console.log(copy); // [1, 2, 3, 4]

// Add elements
const withNew = [...arr1, 4, 5];
console.log(withNew); // [1, 2, 3, 4, 5]

// Objects
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };
console.log(merged); // { a: 1, b: 2, c: 3, d: 4 }

// Copy object
const person1 = { name: "Alice", age: 25 };
const person2 = { ...person1 };
person2.age = 26;
console.log(person1); // { name: "Alice", age: 25 }
console.log(person2); // { name: "Alice", age: 26 }

// Override properties
const updated = { ...person1, age: 30, city: "NYC" };
console.log(updated); // { name: "Alice", age: 30, city: "NYC" }

// Function arguments
function sum(a, b, c) {
  return a + b + c;
}

const nums = [1, 2, 3];
console.log(sum(...nums)); // 6

// String to array
const str = "hello";
const chars = [...str];
console.log(chars); // ['h', 'e', 'l', 'l', 'o']

// ============================================
console.log("\n=== 3. REST PARAMETERS ===");
// Collects remaining arguments into array

// Function with rest parameter
function sumAll(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}

console.log(sumAll(1, 2, 3)); // 6
console.log(sumAll(1, 2, 3, 4, 5)); // 15

// Rest with other parameters
function greet(greeting, ...names) {
  return names.map((name) => `${greeting}, ${name}!`).join(" ");
}

console.log(greet("Hello", "Alice", "Bob", "Charlie"));
// "Hello, Alice! Hello, Bob! Hello, Charlie!"

// Destructuring with rest
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first); // 1
console.log(second); // 2
console.log(rest); // [3, 4, 5]

const { name, age, ...otherProps } = {
  name: "Alice",
  age: 25,
  city: "NYC",
  country: "USA",
};
console.log(name); // "Alice"
console.log(age); // 25
console.log(otherProps); // { city: "NYC", country: "USA" }

// ============================================
console.log("\n=== 4. DESTRUCTURING ===");

// Array Destructuring
const colors = ["red", "green", "blue"];

// Basic
const [firstColor, secondColor, thirdColor] = colors;
console.log(firstColor); // "red"
console.log(secondColor); // "green"

// Skip elements
const [first2, , third2] = colors;
console.log(first2); // "red"
console.log(third2); // "blue"

// Default values
const [a, b, c, d = "yellow"] = colors;
console.log(d); // "yellow"

// Rest in destructuring
const [first3, ...restColors] = colors;
console.log(first3); // "red"
console.log(restColors); // ["green", "blue"]

// Swap variables
let x = 10;
let y = 20;
[x, y] = [y, x];
console.log(x); // 20
console.log(y); // 10

// Nested arrays
const nested = [1, [2, 3], 4];
const [first4, [second4, third4], fourth] = nested;
console.log(second4); // 2

// ============================================
console.log("\n=== 5. OBJECT DESTRUCTURING ===");

const person2 = {
  name: "Alice",
  age: 25,
  city: "NYC",
  job: "Developer",
};

// Basic
const { name: personName, age: personAge } = person2;
console.log(personName); // "Alice"
console.log(personAge); // 25

// Shorthand (same name)
const { name, age } = person2;
console.log(name); // "Alice"
console.log(age); // 25

// Default values
const { name: name2, city: city2, country = "USA" } = person2;
console.log(country); // "USA"

// Rename and default
const { name: fullName, email = "no-email@example.com" } = person2;
console.log(fullName); // "Alice"
console.log(email); // "no-email@example.com"

// Nested objects
const user = {
  id: 1,
  profile: {
    firstName: "John",
    lastName: "Doe",
    address: {
      street: "123 Main St",
      city: "NYC",
    },
  },
};

const {
  id,
  profile: {
    firstName,
    lastName,
    address: { street, city: userCity },
  },
} = user;

console.log(id); // 1
console.log(firstName); // "John"
console.log(street); // "123 Main St"

// Rest in object destructuring
const { name: name3, ...restProps } = person2;
console.log(restProps); // { age: 25, city: "NYC", job: "Developer" }

// ============================================
console.log("\n=== 6. DESTRUCTURING IN FUNCTION PARAMETERS ===");

// Array parameter
function processArray([first, second, ...rest]) {
  console.log(`First: ${first}, Second: ${second}, Rest: ${rest}`);
}

processArray([1, 2, 3, 4, 5]); // First: 1, Second: 2, Rest: [3, 4, 5]

// Object parameter
function greetUser({ name, age, city = "Unknown" }) {
  console.log(`${name}, age ${age}, from ${city}`);
}

greetUser({ name: "Alice", age: 25, city: "NYC" });
greetUser({ name: "Bob", age: 30 }); // city defaults to "Unknown"

// With default object
function createUser({ name = "Anonymous", age = 0, role = "user" } = {}) {
  return { name, age, role };
}

console.log(createUser()); // { name: "Anonymous", age: 0, role: "user" }
console.log(createUser({ name: "Alice" })); // { name: "Alice", age: 0, role: "user" }

// ============================================
console.log("\n=== 7. PRACTICAL EXAMPLES ===");

// React-like props destructuring
function UserCard({ name, email, avatar, isOnline = false }) {
  return {
    name,
    email,
    avatar,
    status: isOnline ? "online" : "offline",
  };
}

const userCard = UserCard({
  name: "Alice",
  email: "alice@example.com",
  avatar: "avatar.jpg",
  isOnline: true,
});
console.log(userCard);

// API response handling
const apiResponse = {
  status: "success",
  data: {
    users: [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ],
    total: 2,
  },
};

const {
  status,
  data: { users, total },
} = apiResponse;
console.log(status, users, total);

// Array methods with destructuring
const users2 = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
];

const names = users2.map(({ name }) => name);
console.log(names); // ["Alice", "Bob"]

const adults = users2.filter(({ age }) => age >= 18);
console.log(adults);

// Swap multiple values
let a2 = 1,
  b2 = 2,
  c2 = 3;
[a2, b2, c2] = [c2, a2, b2];
console.log(a2, b2, c2); // 3, 1, 2
