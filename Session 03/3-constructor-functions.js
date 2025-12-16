// ============================================
// CONSTRUCTOR FUNCTIONS AND PROTOTYPES
// ============================================

console.log("=== 1. CONSTRUCTOR FUNCTIONS ===");

// Constructor functions are used to create objects
// Convention: Start with capital letter
// Use 'new' keyword to create instances

function Car(brand, model, year) {
  this.brand = brand;
  this.model = model;
  this.year = year;
  // Methods defined here are created for each instance (not efficient)
  // this.start = function() { return `${this.brand} started`; }
}

// Better: Add methods to prototype (shared among all instances)
Car.prototype.start = function () {
  return `${this.brand} ${this.model} started`;
};

Car.prototype.getInfo = function () {
  return `${this.year} ${this.brand} ${this.model}`;
};

const car1 = new Car("Toyota", "Camry", 2020);
const car2 = new Car("Honda", "Civic", 2021);

console.log(car1.getInfo()); // "2020 Toyota Camry"
console.log(car2.getInfo()); // "2021 Honda Civic"
console.log(car1.start()); // "Toyota Camry started"

// ============================================
console.log("\n=== 2. WHAT HAPPENS WITH 'NEW' KEYWORD ===");

// When you use 'new', JavaScript does the following:
// 1. Creates a new empty object
// 2. Sets the object's [[Prototype]] to Constructor.prototype
// 3. Binds 'this' to the new object
// 4. Executes the constructor function
// 5. Returns the new object (unless constructor returns an object)

function Person(name) {
  // 'this' refers to the new object being created
  this.name = name;
  // If you return a primitive, it's ignored
  // If you return an object, that object is returned instead
}

const person1 = new Person("Ahmed");
console.log("person1:", person1);
console.log("person1.name:", person1.name);
console.log("person1 instanceof Person:", person1 instanceof Person);

// ============================================
console.log("\n=== 3. CONSTRUCTOR PROPERTY ===");

// Every function has a .prototype property
// This prototype object has a .constructor property pointing back to the function

function Vehicle(type) {
  this.type = type;
}

console.log(
  "Vehicle.prototype.constructor:",
  Vehicle.prototype.constructor === Vehicle
); // true

const vehicle1 = new Vehicle("car");
console.log("vehicle1.constructor:", vehicle1.constructor === Vehicle); // true (inherited)

// ============================================
console.log("\n=== 4. CONSTRUCTOR PROPERTY ISSUES ===");

// When you replace the prototype, you lose the constructor reference

function Animal(name) {
  this.name = name;
}

Animal.prototype.speak = function () {
  return `${this.name} makes a sound`;
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

// Replacing prototype loses constructor
Dog.prototype = Object.create(Animal.prototype);
console.log("Dog.prototype.constructor:", Dog.prototype.constructor); // Points to Animal!

// Fix: Restore constructor reference
Dog.prototype.constructor = Dog;
console.log(
  "After fix - Dog.prototype.constructor:",
  Dog.prototype.constructor === Dog
); // true

const dog1 = new Dog("Buddy", "Golden");
console.log("dog1.constructor:", dog1.constructor === Dog); // true

// ============================================
console.log("\n=== 5. METHODS VS PROPERTIES ON PROTOTYPE ===");

function Book(title, author) {
  this.title = title;
  this.author = author;
}

// Methods on prototype (shared, memory efficient)
Book.prototype.getInfo = function () {
  return `${this.title} by ${this.author}`;
};

// Properties on prototype (shared, can cause issues)
Book.prototype.ratings = []; // BAD: Shared array!

const book1 = new Book("1984", "George Orwell");
const book2 = new Book("Brave New World", "Aldous Huxley");

book1.ratings.push(5);
console.log("book1.ratings:", book1.ratings); // [5]
console.log("book2.ratings:", book2.ratings); // [5] - Same array! Problem!

// Better: Initialize in constructor
function BetterBook(title, author) {
  this.title = title;
  this.author = author;
  this.ratings = []; // Each instance gets its own array
}

BetterBook.prototype.addRating = function (rating) {
  this.ratings.push(rating);
};

const betterBook1 = new BetterBook("1984", "George Orwell");
const betterBook2 = new BetterBook("Brave New World", "Aldous Huxley");

betterBook1.addRating(5);
console.log("betterBook1.ratings:", betterBook1.ratings); // [5]
console.log("betterBook2.ratings:", betterBook2.ratings); // [] - Different arrays!

// ============================================
console.log("\n=== 6. STATIC METHODS ===");

// Static methods are attached to the constructor function itself
// They're not available on instances, but on the constructor

function Calculator() {
  this.value = 0;
}

Calculator.prototype.add = function (num) {
  this.value += num;
  return this;
};

Calculator.prototype.subtract = function (num) {
  this.value -= num;
  return this;
};

// Static method - called on Calculator, not on instances
Calculator.add = function (a, b) {
  return a + b;
};

Calculator.multiply = function (a, b) {
  return a * b;
};

const calc = new Calculator();
calc.add(5).subtract(2);
console.log("calc.value:", calc.value); // 3

// Static methods called on constructor
console.log("Calculator.add(10, 20):", Calculator.add(10, 20)); // 30
console.log("Calculator.multiply(5, 6):", Calculator.multiply(5, 6)); // 30

// calc.add(10, 20); // Error: calc.add is not a function (it's an instance method, not static)

// ============================================
console.log("\n=== 7. CALLING CONSTRUCTOR WITHOUT 'NEW' ===");

// If you forget 'new', 'this' refers to the global object (or undefined in strict mode)
// This can cause bugs

function User(name) {
  this.name = name;
}

// Without 'new' - 'this' is undefined in strict mode, or global object
const user1 = User("Ahmed"); // Oops, forgot 'new'
console.log("user1:", user1); // undefined
console.log(
  "global.name:",
  typeof global !== "undefined" ? global.name : "N/A"
); // Might pollute global

// Safety pattern: Check if 'new' was used
function SafeUser(name) {
  if (!(this instanceof SafeUser)) {
    return new SafeUser(name); // Auto-correct
  }
  this.name = name;
}

const safeUser1 = SafeUser("Ahmed"); // Works without 'new'
const safeUser2 = new SafeUser("Sarah"); // Also works with 'new'
console.log("safeUser1:", safeUser1);
console.log("safeUser2:", safeUser2);

// Modern ES6+ approach: Use classes (which require 'new')

// ============================================
console.log("\n=== 8. PROTOTYPE METHODS VS INSTANCE METHODS ===");

function Product(name, price) {
  this.name = name;
  this.price = price;
  // Instance method - created for each object (wastes memory)
  this.getPriceWithTax = function () {
    return this.price * 1.1;
  };
}

// Prototype method - shared among all instances (memory efficient)
Product.prototype.getDiscountPrice = function (discount) {
  return this.price * (1 - discount);
};

const product1 = new Product("Laptop", 1000);
const product2 = new Product("Phone", 500);

// Both methods work the same way
console.log("product1.getPriceWithTax():", product1.getPriceWithTax());
console.log("product1.getDiscountPrice(0.1):", product1.getDiscountPrice(0.1));

// But getPriceWithTax is duplicated in each instance
console.log(
  "Same function?",
  product1.getPriceWithTax === product2.getPriceWithTax
); // false

// getDiscountPrice is shared
console.log(
  "Same function?",
  product1.getDiscountPrice === product2.getDiscountPrice
); // true

// ============================================
console.log("\n=== 9. COMPLETE CONSTRUCTOR PATTERN EXAMPLE ===");

function Student(name, id, courses = []) {
  // Instance properties
  this.name = name;
  this.id = id;
  this.courses = courses;
  this.grades = {};
}

// Prototype methods
Student.prototype.enroll = function (course) {
  if (!this.courses.includes(course)) {
    this.courses.push(course);
    this.grades[course] = [];
  }
};

Student.prototype.addGrade = function (course, grade) {
  if (this.grades[course]) {
    this.grades[course].push(grade);
  }
};

Student.prototype.getGPA = function () {
  const allGrades = Object.values(this.grades).flat();
  if (allGrades.length === 0) return 0;
  const sum = allGrades.reduce((acc, grade) => acc + grade, 0);
  return (sum / allGrades.length).toFixed(2);
};

Student.prototype.getInfo = function () {
  return `Student: ${this.name} (ID: ${this.id}) - GPA: ${this.getGPA()}`;
};

// Static method
Student.compareGPA = function (student1, student2) {
  return parseFloat(student1.getGPA()) - parseFloat(student2.getGPA());
};

const student1 = new Student("Ahmed", "S001");
const student2 = new Student("Sarah", "S002");

student1.enroll("Math");
student1.enroll("Science");
student1.addGrade("Math", 85);
student1.addGrade("Math", 90);
student1.addGrade("Science", 88);

student2.enroll("Math");
student2.addGrade("Math", 95);

console.log(student1.getInfo());
console.log(student2.getInfo());
console.log("GPA Difference:", Student.compareGPA(student1, student2));
