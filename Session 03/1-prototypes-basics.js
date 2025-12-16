// ============================================
// PROTOTYPES BASICS
// ============================================

console.log("=== 1. WHAT IS A PROTOTYPE? ===");

// In JavaScript, every object has a prototype
// A prototype is an object from which other objects inherit properties and methods
// When you access a property on an object, JavaScript first checks the object itself,
// then looks up the prototype chain until it finds the property or reaches null

// Every object in JavaScript has a hidden property called [[Prototype]]
// This can be accessed via __proto__ (deprecated) or Object.getPrototypeOf()

const person = {
  name: "Ahmed",
  age: 25,
};

console.log(person);
console.log("Prototype of person:", Object.getPrototypeOf(person));
console.log(
  "Is person's prototype Object.prototype?",
  Object.getPrototypeOf(person) === Object.prototype
);

// ============================================
console.log("\n=== 2. PROTOTYPE PROPERTY VS [[PROTOTYPE]] ===");

// Important distinction:
// - [[Prototype]] (or __proto__): The actual prototype object that an instance uses
// - .prototype: A property on constructor functions that becomes the [[Prototype]] of instances

function Person(name) {
  this.name = name;
}

// .prototype is a property on the constructor function
console.log("Person.prototype:", Person.prototype);

// When we create an instance, its [[Prototype]] points to Person.prototype
const person1 = new Person("Ahmed");
console.log("person1's [[Prototype]]:", Object.getPrototypeOf(person1));
console.log(
  "Are they the same?",
  Object.getPrototypeOf(person1) === Person.prototype
);

// ============================================
console.log("\n=== 3. ACCESSING PROTOTYPE PROPERTIES ===");

// You can add methods to the prototype
Person.prototype.greet = function () {
  return `Hello, I'm ${this.name}`;
};

// Now all instances can access this method
const person2 = new Person("Sarah");
console.log(person1.greet()); // "Hello, I'm Ahmed"
console.log(person2.greet()); // "Hello, I'm Sarah"

// The method is not on the instance itself, but on its prototype
console.log(
  "person1 has own property 'greet'?",
  person1.hasOwnProperty("greet")
); // false
console.log("person1 has own property 'name'?", person1.hasOwnProperty("name")); // true

// ============================================
console.log("\n=== 4. PROTOTYPE INHERITANCE ===");

// When you access a property, JavaScript looks:
// 1. On the object itself
// 2. On its prototype
// 3. On the prototype's prototype (prototype chain)
// 4. Continues until it finds the property or reaches null

Person.prototype.species = "Homo sapiens";

const person3 = new Person("Ali");
console.log(person3.name); // Own property: "Ali"
console.log(person3.species); // Inherited from prototype: "Homo sapiens"
console.log(person3.greet()); // Inherited method: "Hello, I'm Ali"

// ============================================
console.log("\n=== 5. BUILT-IN OBJECT PROTOTYPES ===");

// All built-in objects have prototypes
const arr = [1, 2, 3];
console.log(
  "Array prototype methods:",
  Object.getOwnPropertyNames(Array.prototype).slice(0, 5)
);

const str = "hello";
console.log(
  "String prototype methods:",
  Object.getOwnPropertyNames(String.prototype).slice(0, 5)
);

// Methods like .map(), .filter(), .toUpperCase() are all on prototypes
console.log(arr.map((x) => x * 2)); // [2, 4, 6] - from Array.prototype.map
console.log(str.toUpperCase()); // "HELLO" - from String.prototype.toUpperCase

// ============================================
console.log("\n=== 6. PROTOTYPE CHAIN EXAMPLE ===");

// person3 -> Person.prototype -> Object.prototype -> null

console.log("person3's prototype:", Object.getPrototypeOf(person3));
console.log(
  "Person.prototype's prototype:",
  Object.getPrototypeOf(Person.prototype)
);
console.log(
  "Object.prototype's prototype:",
  Object.getPrototypeOf(Object.prototype)
); // null

// Accessing toString from Object.prototype
console.log(person3.toString()); // "[object Object]" - inherited from Object.prototype

// ============================================
console.log("\n=== 7. CHECKING PROTOTYPE RELATIONSHIPS ===");

// instanceof operator checks if an object is an instance of a constructor
console.log("person3 instanceof Person?", person3 instanceof Person); // true
console.log("person3 instanceof Object?", person3 instanceof Object); // true

// isPrototypeOf() checks if an object exists in another object's prototype chain
console.log(
  "Person.prototype.isPrototypeOf(person3)?",
  Person.prototype.isPrototypeOf(person3)
); // true
console.log(
  "Object.prototype.isPrototypeOf(person3)?",
  Object.prototype.isPrototypeOf(person3)
); // true

// ============================================
console.log("\n=== 8. SHARED PROTOTYPE PROPERTIES ===");

// Properties on the prototype are shared among all instances
// This is memory efficient - methods are stored once, not copied to each instance

Person.prototype.sharedValue = 100;

const p1 = new Person("One");
const p2 = new Person("Two");

console.log("p1.sharedValue:", p1.sharedValue); // 100
console.log("p2.sharedValue:", p2.sharedValue); // 100

// Modifying through one instance affects all (if it's a reference type)
Person.prototype.sharedArray = [];
p1.sharedArray.push("item1");
console.log("p2.sharedArray:", p2.sharedArray); // ["item1"] - same array!

// But modifying a primitive through an instance creates a new property on the instance
p1.sharedValue = 200;
console.log("p1.sharedValue:", p1.sharedValue); // 200 (own property)
console.log("p2.sharedValue:", p2.sharedValue); // 100 (still from prototype)
console.log("Person.prototype.sharedValue:", Person.prototype.sharedValue); // 100 (unchanged)
