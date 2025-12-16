// ============================================
// MODIFYING PROTOTYPES
// ============================================

console.log("=== 1. ADDING METHODS TO PROTOTYPES ===");

// You can add methods to existing prototypes
// This affects all instances (past, present, and future)

function Person(name) {
  this.name = name;
}

const person1 = new Person("Ahmed");
const person2 = new Person("Sarah");

// Add method to prototype after instances are created
Person.prototype.greet = function () {
  return `Hello, I'm ${this.name}`;
};

// Both existing instances can now use the new method
console.log("person1.greet():", person1.greet()); // Works!
console.log("person2.greet():", person2.greet()); // Works!

const person3 = new Person("Ali");
console.log("person3.greet():", person3.greet()); // Also works!

// ============================================
console.log("\n=== 2. MODIFYING BUILT-IN PROTOTYPES ===");

// ⚠️ WARNING: Modifying built-in prototypes is generally NOT recommended!
// It can cause conflicts with libraries and future JavaScript updates
// However, it's possible and sometimes used for polyfills

// Example: Adding a method to Array.prototype (NOT RECOMMENDED)
Array.prototype.last = function () {
  return this[this.length - 1];
};

const arr = [1, 2, 3, 4, 5];
console.log("arr.last():", arr.last()); // 5

// This affects ALL arrays everywhere in your code
const anotherArr = [10, 20, 30];
console.log("anotherArr.last():", anotherArr.last()); // 30

// ============================================
console.log("\n=== 3. POLYFILLS (ACCEPTABLE USE) ===");

// Polyfills are acceptable - they add missing functionality

// Example: Array.includes() polyfill (if not available)
if (!Array.prototype.includes) {
  Array.prototype.includes = function (searchElement) {
    return this.indexOf(searchElement) !== -1;
  };
}

const numbers = [1, 2, 3, 4, 5];
console.log("numbers.includes(3):", numbers.includes(3)); // true
console.log("numbers.includes(6):", numbers.includes(6)); // false

// ============================================
console.log("\n=== 4. REPLACING PROTOTYPE METHODS ===");

// You can replace existing prototype methods

function Calculator() {
  this.value = 0;
}

Calculator.prototype.add = function (num) {
  this.value += num;
  return this;
};

Calculator.prototype.getResult = function () {
  return this.value;
};

const calc1 = new Calculator();
calc1.add(5).add(3);
console.log("calc1.getResult():", calc1.getResult()); // 8

// Replace the add method
Calculator.prototype.add = function (num) {
  this.value += num * 2; // New behavior: double the number
  return this;
};

const calc2 = new Calculator();
calc2.add(5).add(3);
console.log("calc2.getResult():", calc2.getResult()); // 16 (5*2 + 3*2)

// Existing instances are also affected!
calc1.add(2);
console.log("calc1.getResult() after replacement:", calc1.getResult()); // 12 (8 + 2*2)

// ============================================
console.log("\n=== 5. OVERRIDING PROTOTYPE METHODS ===");

// Child prototypes can override parent prototype methods

function Animal(name) {
  this.name = name;
}

Animal.prototype.makeSound = function () {
  return `${this.name} makes a generic sound`;
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Override makeSound
Dog.prototype.makeSound = function () {
  return `${this.name} barks: Woof! Woof!`;
};

const dog = new Dog("Buddy", "Golden");
console.log("dog.makeSound():", dog.makeSound()); // Uses Dog's version

// ============================================
console.log("\n=== 6. CALLING PARENT METHOD FROM OVERRIDDEN METHOD ===");

function Shape(color) {
  this.color = color;
}

Shape.prototype.getInfo = function () {
  return `Shape with color ${this.color}`;
};

function Circle(color, radius) {
  Shape.call(this, color);
  this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

// Override but call parent method
Circle.prototype.getInfo = function () {
  // Call parent's getInfo
  const parentInfo = Shape.prototype.getInfo.call(this);
  return `${parentInfo}, radius: ${this.radius}`;
};

const circle = new Circle("red", 5);
console.log("circle.getInfo():", circle.getInfo());

// ============================================
console.log("\n=== 7. ADDING PROPERTIES TO PROTOTYPES ===");

// Adding properties (not methods) to prototypes can cause issues

function Product(name) {
  this.name = name;
}

// Adding a shared property (can cause problems)
Product.prototype.category = "General";

const product1 = new Product("Laptop");
const product2 = new Product("Phone");

console.log("product1.category:", product1.category); // "General"
console.log("product2.category:", product2.category); // "General"

// If it's a primitive, modifying through instance creates own property
product1.category = "Electronics";
console.log("product1.category:", product1.category); // "Electronics" (own property)
console.log("product2.category:", product2.category); // "General" (still from prototype)
console.log("Product.prototype.category:", Product.prototype.category); // "General"

// If it's an object/array, all instances share the same reference!
Product.prototype.tags = [];

product1.tags.push("expensive");
product2.tags.push("portable");

console.log("product1.tags:", product1.tags); // ["expensive", "portable"]
console.log("product2.tags:", product2.tags); // ["expensive", "portable"] - Same array!

// Better: Initialize in constructor
function BetterProduct(name) {
  this.name = name;
  this.tags = []; // Each instance gets its own array
}

// ============================================
console.log("\n=== 8. REMOVING PROTOTYPE PROPERTIES ===");

function Test() {
  this.prop1 = "value1";
}

Test.prototype.method1 = function () {
  return "method1";
};

Test.prototype.prop2 = "value2";

const test = new Test();

console.log("test.method1:", typeof test.method1); // "function"
console.log("test.prop2:", test.prop2); // "value2"

// Delete from prototype
delete Test.prototype.method1;
delete Test.prototype.prop2;

console.log("test.method1:", typeof test.method1); // "undefined"
console.log("test.prop2:", test.prop2); // "undefined"

// Own properties are not affected
console.log("test.prop1:", test.prop1); // "value1"

// ============================================
console.log("\n=== 9. PROTOTYPE POLLUTION (SECURITY CONCERN) ===");

// ⚠️ Be careful with user input modifying prototypes!

// Dangerous example (don't do this in production!)
function processUserInput(input) {
  // If input is something like "__proto__.isAdmin = true"
  // This could modify Object.prototype!
  const obj = {};
  // Never do: obj[input.key] = input.value without validation
}

// Safe approach: Use Object.create(null) for user data
function safeProcessUserInput(input) {
  const obj = Object.create(null); // No prototype, safer
  obj[input.key] = input.value;
  return obj;
}

// ============================================
console.log("\n=== 10. BEST PRACTICES ===");

// 1. Prefer adding methods, not properties, to prototypes
function GoodExample(name) {
  this.name = name;
  this.items = []; // Initialize arrays/objects in constructor
}

GoodExample.prototype.addItem = function (item) {
  // Methods are fine on prototype
  this.items.push(item);
};

// 2. Don't modify built-in prototypes (except for polyfills)
// 3. Use Object.defineProperty() for non-enumerable properties
Object.defineProperty(GoodExample.prototype, "hiddenMethod", {
  value: function () {
    return "This won't show up in for...in loops";
  },
  enumerable: false,
});

const good = new GoodExample("Test");
console.log("Own properties:", Object.keys(good)); // ["name", "items"]
console.log("Has hiddenMethod:", typeof good.hiddenMethod); // "function"

// 4. Document prototype modifications
// 5. Consider using classes (ES6+) for cleaner syntax

