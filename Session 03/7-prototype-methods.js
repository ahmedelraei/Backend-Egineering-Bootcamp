// ============================================
// PROTOTYPE INSPECTION METHODS
// ============================================

console.log("=== 1. HASOWNPROPERTY() ===");

// hasOwnProperty() checks if a property exists on the object itself
// (not inherited from prototype)

function Person(name) {
  this.name = name;
}

Person.prototype.species = "Homo sapiens";

const person = new Person("Ahmed");

console.log("person.name:", person.name); // Own property
console.log("person.species:", person.species); // Inherited property

console.log("person.hasOwnProperty('name'):", person.hasOwnProperty("name")); // true
console.log(
  "person.hasOwnProperty('species'):",
  person.hasOwnProperty("species")
); // false

// ============================================
console.log("\n=== 2. 'IN' OPERATOR ===");

// The 'in' operator checks if a property exists anywhere in the prototype chain

function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function () {
  return `${this.name} is eating`;
};

const animal = new Animal("Dog");

console.log("'name' in animal:", "name" in animal); // true (own property)
console.log("'eat' in animal:", "eat" in animal); // true (inherited property)
console.log("'toString' in animal:", "toString" in animal); // true (from Object.prototype)
console.log("'nonexistent' in animal:", "nonexistent" in animal); // false

// Difference: hasOwnProperty vs 'in'
console.log("animal.hasOwnProperty('eat'):", animal.hasOwnProperty("eat")); // false
console.log("'eat' in animal:", "eat" in animal); // true

// ============================================
console.log("\n=== 3. OBJECT.GETPROTOTYPEOF() ===");

// Object.getPrototypeOf() returns the prototype of an object

function Vehicle(brand) {
  this.brand = brand;
}

const vehicle = new Vehicle("Toyota");

console.log("Object.getPrototypeOf(vehicle):", Object.getPrototypeOf(vehicle));
console.log(
  "Object.getPrototypeOf(vehicle) === Vehicle.prototype:",
  Object.getPrototypeOf(vehicle) === Vehicle.prototype
); // true

// Get prototype chain
let current = vehicle;
let level = 0;
while (current !== null) {
  const protoName = current.constructor ? current.constructor.name : "null";
  console.log(`Level ${level}: ${protoName}`);
  current = Object.getPrototypeOf(current);
  level++;
}

// ============================================
console.log("\n=== 4. OBJECT.SETPROTOTYPEOF() ===");

// Object.setPrototypeOf() changes an object's prototype
// ⚠️ Not recommended for performance reasons, but possible

const obj1 = { a: 1 };
const obj2 = { b: 2 };

console.log("Before: obj1.b =", obj1.b); // undefined

Object.setPrototypeOf(obj1, obj2);

console.log("After: obj1.b =", obj1.b); // 2 (inherited from obj2)
console.log(
  "Object.getPrototypeOf(obj1) === obj2:",
  Object.getPrototypeOf(obj1) === obj2
); // true

// ============================================
console.log("\n=== 5. OBJECT.GETOWNPROPERTYNAMES() ===");

// Object.getOwnPropertyNames() returns all own property names (including non-enumerable)

function Test() {
  this.prop1 = "value1";
  this.prop2 = "value2";
}

Test.prototype.method1 = function () {};
Test.prototype.prop3 = "value3";

const test = new Test();

console.log(
  "Object.getOwnPropertyNames(test):",
  Object.getOwnPropertyNames(test)
); // ["prop1", "prop2"]
console.log(
  "Object.getOwnPropertyNames(Test.prototype):",
  Object.getOwnPropertyNames(Test.prototype)
); // Includes "constructor", "method1", "prop3"

// ============================================
console.log("\n=== 6. OBJECT.KEYS() ===");

// Object.keys() returns enumerable own property names

function Example() {
  this.enumerable1 = "value1";
  this.enumerable2 = "value2";
}

Object.defineProperty(Example.prototype, "nonEnumerable", {
  value: "hidden",
  enumerable: false,
});

Example.prototype.enumerableMethod = function () {};

const example = new Example();

console.log("Object.keys(example):", Object.keys(example)); // ["enumerable1", "enumerable2"]
console.log(
  "Object.getOwnPropertyNames(example):",
  Object.getOwnPropertyNames(example)
); // ["enumerable1", "enumerable2"]

// ============================================
console.log("\n=== 7. OBJECT.VALUES() AND OBJECT.ENTRIES() ===");

// Object.values() returns array of own enumerable property values
// Object.entries() returns array of [key, value] pairs

const personObj = {
  name: "Ahmed",
  age: 25,
  city: "Cairo",
};

console.log("Object.keys(personObj):", Object.keys(personObj));
console.log("Object.values(personObj):", Object.values(personObj));
console.log("Object.entries(personObj):", Object.entries(personObj));

// ============================================
console.log("\n=== 8. INSTANCEOF OPERATOR ===");

// instanceof checks if an object is an instance of a constructor
// It checks the entire prototype chain

function Parent() {}
function Child() {}

Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;

const child = new Child();

console.log("child instanceof Child:", child instanceof Child); // true
console.log("child instanceof Parent:", child instanceof Parent); // true
console.log("child instanceof Object:", child instanceof Object); // true
console.log("child instanceof Array:", child instanceof Array); // false

// ============================================
console.log("\n=== 9. ISPROTOTYPEOF() ===");

// isPrototypeOf() checks if an object exists in another object's prototype chain

function A() {}
function B() {}
function C() {}

B.prototype = Object.create(A.prototype);
C.prototype = Object.create(B.prototype);

const c = new C();

console.log("A.prototype.isPrototypeOf(c):", A.prototype.isPrototypeOf(c)); // true
console.log("B.prototype.isPrototypeOf(c):", B.prototype.isPrototypeOf(c)); // true
console.log("C.prototype.isPrototypeOf(c):", C.prototype.isPrototypeOf(c)); // true
console.log(
  "Object.prototype.isPrototypeOf(c):",
  Object.prototype.isPrototypeOf(c)
); // true

// ============================================
console.log("\n=== 10. OBJECT.CREATE() WITH DESCRIPTORS ===");

// Object.create() can accept property descriptors

const proto = {
  inheritedMethod() {
    return "from prototype";
  },
};

const obj = Object.create(proto, {
  ownProp: {
    value: "own value",
    writable: true,
    enumerable: true,
    configurable: true,
  },
  hiddenProp: {
    value: "hidden",
    enumerable: false, // Won't show in Object.keys()
  },
});

console.log("obj.ownProp:", obj.ownProp);
console.log("obj.inheritedMethod():", obj.inheritedMethod());
console.log("Object.keys(obj):", Object.keys(obj)); // ["ownProp"] - hiddenProp not included
console.log(
  "Object.getOwnPropertyNames(obj):",
  Object.getOwnPropertyNames(obj)
); // Includes hiddenProp

// ============================================
console.log("\n=== 11. OBJECT.DEFINEPROPERTY() ===");

// Object.defineProperty() adds or modifies a property descriptor

const obj2 = {};

Object.defineProperty(obj2, "readOnly", {
  value: "cannot change",
  writable: false,
  enumerable: true,
  configurable: false,
});

Object.defineProperty(obj2, "getterProp", {
  get() {
    return this._value || "default";
  },
  set(value) {
    this._value = value;
  },
  enumerable: true,
  configurable: true,
});

console.log("obj2.readOnly:", obj2.readOnly);
// obj2.readOnly = "new value"; // Error in strict mode (writable: false)

obj2.getterProp = "custom value";
console.log("obj2.getterProp:", obj2.getterProp);

// ============================================
console.log("\n=== 12. COMPLETE PROTOTYPE INSPECTION FUNCTION ===");

function inspectPrototype(obj, name = "Object") {
  console.log(`\n=== Inspecting ${name} ===`);
  console.log("Type:", typeof obj);
  console.log("Constructor:", obj.constructor ? obj.constructor.name : "N/A");

  // Own properties
  const ownProps = Object.getOwnPropertyNames(obj);
  console.log("Own properties:", ownProps);

  // Prototype chain
  let current = obj;
  let level = 0;
  const chain = [];

  while (current !== null && level < 10) {
    const proto = Object.getPrototypeOf(current);
    const protoName = current.constructor ? current.constructor.name : "null";
    chain.push({
      level,
      name: protoName,
      ownProperties: Object.getOwnPropertyNames(current),
    });
    current = proto;
    level++;
  }

  console.log("Prototype chain:");
  chain.forEach((link) => {
    console.log(`  Level ${link.level}: ${link.name}`);
    if (link.ownProperties.length > 0) {
      console.log(
        `    Properties: ${link.ownProperties.slice(0, 5).join(", ")}`
      );
    }
  });

  return {
    ownProperties: ownProps,
    prototypeChain: chain,
  };
}

function TestClass(name) {
  this.name = name;
}

TestClass.prototype.method1 = function () {};
TestClass.prototype.prop1 = "value1";

const testObj = new TestClass("Test");
inspectPrototype(testObj, "testObj");

// ============================================
console.log("\n=== 13. CHECKING PROPERTY DESCRIPTORS ===");

// Object.getOwnPropertyDescriptor() gets property descriptor

const obj3 = {};

Object.defineProperty(obj3, "normal", {
  value: "normal",
  writable: true,
  enumerable: true,
  configurable: true,
});

Object.defineProperty(obj3, "readonly", {
  value: "readonly",
  writable: false,
  enumerable: true,
  configurable: true,
});

const normalDesc = Object.getOwnPropertyDescriptor(obj3, "normal");
const readonlyDesc = Object.getOwnPropertyDescriptor(obj3, "readonly");

console.log("normal property descriptor:", normalDesc);
console.log("readonly property descriptor:", readonlyDesc);

// Get all property descriptors
const allDescriptors = Object.getOwnPropertyDescriptors(obj3);
console.log("All descriptors:", allDescriptors);
