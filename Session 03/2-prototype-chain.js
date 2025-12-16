// ============================================
// PROTOTYPE CHAIN
// ============================================

console.log("=== 1. UNDERSTANDING THE PROTOTYPE CHAIN ===");

// The prototype chain is how JavaScript implements inheritance
// When you access a property, JavaScript traverses up the chain until it finds it

function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function () {
  return `${this.name} is eating`;
};

function Dog(name, breed) {
  Animal.call(this, name); // Call parent constructor
  this.breed = breed;
}

// Set Dog's prototype to Animal's prototype
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Fix constructor reference

Dog.prototype.bark = function () {
  return `${this.name} is barking`;
};

const myDog = new Dog("Buddy", "Golden Retriever");

// Prototype chain: myDog -> Dog.prototype -> Animal.prototype -> Object.prototype -> null
console.log("myDog's prototype:", Object.getPrototypeOf(myDog));
console.log("Dog.prototype:", Dog.prototype);
console.log("Animal.prototype:", Animal.prototype);
console.log("Object.prototype:", Object.prototype);

// ============================================
console.log("\n=== 2. PROPERTY LOOKUP IN PROTOTYPE CHAIN ===");

// When accessing a property, JavaScript searches up the chain:
// 1. myDog.name - found on myDog itself
// 2. myDog.breed - found on myDog itself
// 3. myDog.bark() - found on Dog.prototype
// 4. myDog.eat() - found on Animal.prototype
// 5. myDog.toString() - found on Object.prototype

console.log("myDog.name:", myDog.name); // Own property
console.log("myDog.breed:", myDog.breed); // Own property
console.log("myDog.bark():", myDog.bark()); // From Dog.prototype
console.log("myDog.eat():", myDog.eat()); // From Animal.prototype
console.log("myDog.toString():", myDog.toString()); // From Object.prototype

// ============================================
console.log("\n=== 3. PROPERTY SHADOWING ===");

// If a property exists on both the object and its prototype,
// the object's own property takes precedence (shadows the prototype property)

Animal.prototype.sound = "Generic sound";

const animal1 = new Animal("Generic Animal");
console.log("animal1.sound:", animal1.sound); // "Generic sound" (from prototype)

// Create own property with same name
animal1.sound = "Custom sound";
console.log("animal1.sound:", animal1.sound); // "Custom sound" (own property shadows prototype)
console.log("Animal.prototype.sound:", Animal.prototype.sound); // Still "Generic sound"

// To access prototype property when shadowed, use Object.getPrototypeOf()
console.log("Prototype sound:", Object.getPrototypeOf(animal1).sound);

// ============================================
console.log("\n=== 4. TRAVERSING THE PROTOTYPE CHAIN ===");

function traversePrototypeChain(obj, name = "Object") {
  let current = obj;
  let level = 0;
  const chain = [];

  while (current !== null) {
    const protoName = current.constructor ? current.constructor.name : "null";
    chain.push({
      level,
      name: protoName,
      prototype: current,
      ownProperties: Object.getOwnPropertyNames(current),
    });
    current = Object.getPrototypeOf(current);
    level++;
  }

  return chain;
}

const chain = traversePrototypeChain(myDog);
console.log("\nPrototype chain for myDog:");
chain.forEach((link) => {
  console.log(`Level ${link.level}: ${link.name}`);
  console.log(`  Own properties: ${link.ownProperties.slice(0, 5).join(", ")}`);
});

// ============================================
console.log("\n=== 5. PROTOTYPE CHAIN WITH ARRAYS ===");

const arr = [1, 2, 3];

// Array prototype chain: arr -> Array.prototype -> Object.prototype -> null
console.log("arr's prototype:", Object.getPrototypeOf(arr) === Array.prototype); // true
console.log(
  "Array.prototype's prototype:",
  Object.getPrototypeOf(Array.prototype) === Object.prototype
); // true

// Methods come from different levels
console.log("arr.length:", arr.length); // Own property
console.log("arr.push:", typeof arr.push); // From Array.prototype
console.log("arr.toString:", typeof arr.toString); // From Array.prototype (overrides Object.prototype.toString)
console.log("arr.valueOf:", typeof arr.valueOf); // From Object.prototype

// ============================================
console.log("\n=== 6. PROTOTYPE CHAIN WITH STRINGS ===");

const str = "hello";

// String prototype chain: str -> String.prototype -> Object.prototype -> null
// Note: Primitives are wrapped in objects when accessing methods

console.log(
  "str's prototype (when accessed as object):",
  Object.getPrototypeOf(str) === String.prototype
);
console.log("str.toUpperCase():", str.toUpperCase()); // From String.prototype
console.log("str.length:", str.length); // Own property of string object

// ============================================
console.log("\n=== 7. MODIFYING PROTOTYPE CHAIN ===");

// You can change an object's prototype using Object.setPrototypeOf()
// (Note: This is generally not recommended for performance reasons)

const obj1 = { a: 1 };
const obj2 = { b: 2 };

console.log("Before: obj1.b =", obj1.b); // undefined

Object.setPrototypeOf(obj1, obj2);
console.log("After setPrototypeOf: obj1.b =", obj1.b); // 2 (from obj2)

// Now obj1's prototype chain: obj1 -> obj2 -> Object.prototype -> null

// ============================================
console.log("\n=== 8. BREAKING THE PROTOTYPE CHAIN ===");

// You can create an object with no prototype using Object.create(null)
const objWithoutPrototype = Object.create(null);

console.log(
  "objWithoutPrototype's prototype:",
  Object.getPrototypeOf(objWithoutPrototype)
); // null
console.log("objWithoutPrototype.toString:", objWithoutPrototype.toString); // undefined (no Object.prototype)

// This object has no built-in methods
// objWithoutPrototype.toString(); // Error: objWithoutPrototype.toString is not a function

// Useful for creating pure dictionaries/maps without prototype pollution
objWithoutPrototype.name = "Pure Object";
objWithoutPrototype.value = 42;
console.log("Pure object:", objWithoutPrototype);

// ============================================
console.log("\n=== 9. PERFORMANCE CONSIDERATIONS ===");

// Deep prototype chains can impact performance
// JavaScript engines optimize property access, but shorter chains are faster

function createDeepChain(depth) {
  let current = {};
  for (let i = 0; i < depth; i++) {
    const next = Object.create(current);
    next[`level${i}`] = i;
    current = next;
  }
  return current;
}

const deepObj = createDeepChain(5);
console.log("Deep chain object:", deepObj);
console.log("Accessing property from deep chain:", deepObj.level0); // Has to traverse 5 levels

// Shallow chains are more performant
const shallowObj = { level0: 0, level1: 1, level2: 2 };
console.log("Shallow object:", shallowObj);
console.log("Accessing property from shallow chain:", shallowObj.level0); // Direct access
