// ============================================
// FUNCTIONS: Declaration, Expression, Arrow
// ============================================

console.log("=== 1. FUNCTION DECLARATION ===");
// Function declarations are hoisted - can be called before they're defined
// Named function that can be called before its declaration

function greet(name) {
  return `Hello, ${name}!`;
}

console.log(greet("Ahmed")); // "Hello, Ahmed!"

// Function declarations are hoisted
console.log(hoistedFunction()); // Works! Returns "I'm hoisted!"

function hoistedFunction() {
  return "I'm hoisted!";
}

// ============================================
console.log("\n=== 2. FUNCTION EXPRESSION ===");
// Function expressions are NOT hoisted
// Assigned to a variable

const add = function (a, b) {
  return a + b;
};

console.log(add(5, 3)); // 8

// Named function expression
const multiply = function multiplyNumbers(x, y) {
  return x * y;
};

console.log(multiply(4, 5)); // 20

// Function expressions are NOT hoisted
// console.log(notHoisted()); // Error: Cannot access before initialization
const notHoisted = function () {
  return "I'm not hoisted!";
};

// ============================================
console.log("\n=== 3. ARROW FUNCTIONS ===");
// Arrow functions (ES6+) - shorter syntax, lexical 'this'

// Basic arrow function
const subtract = (a, b) => {
  return a - b;
};

console.log(subtract(10, 4)); // 6

// Single expression - implicit return
const divide = (a, b) => a / b;
console.log(divide(20, 4)); // 5

// Single parameter - parentheses optional
const square = (x) => x * x;
console.log(square(5)); // 25

// No parameters - parentheses required
const getRandom = () => Math.random();
console.log(getRandom());

// Multiple parameters
const fullName = (firstName, lastName) => `${firstName} ${lastName}`;
console.log(fullName("Ahmed", "Elraei")); // "Ahmed Elraei"

// Arrow functions with arrays
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((n) => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// ============================================
console.log("\n=== 4. KEY DIFFERENCES ===");

// 'this' binding
const obj = {
  name: "JavaScript",

  // Regular function - 'this' refers to the object
  regularFunction: function () {
    return `Hello from ${this.name}`;
  },

  // Arrow function - 'this' refers to outer scope (lexical)
  arrowFunction: () => {
    return `Hello from ${this.name}`; // 'this' is undefined or window
  },

  // Arrow function in method - 'this' refers to obj
  methodWithArrow: function () {
    const inner = () => {
      return `Inner: ${this.name}`; // 'this' refers to obj
    };
    return inner();
  },
};

console.log(obj.regularFunction()); // "Hello from JavaScript"
console.log(obj.arrowFunction()); // "Hello from undefined"
console.log(obj.methodWithArrow()); // "Inner: JavaScript"

// ============================================
console.log("\n=== 5. WHEN TO USE EACH ===");

// Function Declaration: Use for main functions, when you need hoisting
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// Function Expression: Use when you need conditional function creation
const operation =
  Math.random() > 0.5
    ? function (a, b) {
        return a + b;
      }
    : function (a, b) {
        return a * b;
      };

console.log(operation(3, 4)); // Either 7 or 12

// Arrow Function: Use for callbacks, short functions, when you need lexical 'this'
const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
];

const names = users.map((user) => user.name);
console.log(names); // ["Alice", "Bob"]

// ============================================
console.log("\n=== 6. PRACTICAL EXAMPLES ===");

// Callback functions
function processData(data, callback) {
  const result = data.map(callback);
  return result;
}

const numbers2 = [1, 2, 3, 4, 5];
const squared = processData(numbers2, (x) => x * x);
console.log(squared); // [1, 4, 9, 16, 25]

// Higher-order functions
function createMultiplier(multiplier) {
  return function (number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// Arrow function version
const createMultiplierArrow = (multiplier) => (number) => number * multiplier;
const quadruple = createMultiplierArrow(4);
console.log(quadruple(5)); // 20

// ============================================
console.log("\n=== 7. FUNCTIONS VS ARROW FUNCTIONS - SIDE BY SIDE ===");

// Example 1: Basic Syntax
console.log("\n--- Example 1: Basic Syntax ---");
// Regular Function
function regularAdd(a, b) {
  return a + b;
}
console.log("Regular function:", regularAdd(2, 3)); // 5

// Arrow Function
const arrowAdd = (a, b) => a + b;
console.log("Arrow function:", arrowAdd(2, 3)); // 5

// Example 2: 'this' Binding - Critical Difference!
console.log("\n--- Example 2: 'this' Binding ---");
const person = {
  name: "Ahmed",
  age: 25,

  // Regular function - 'this' refers to the object
  introduceRegular: function () {
    return `Hi, I'm ${this.name} and I'm ${this.age} years old`;
  },

  // Arrow function - 'this' refers to outer scope (global/window)
  introduceArrow: () => {
    return `Hi, I'm ${this.name} and I'm ${this.age} years old`; // undefined
  },

  // Nested arrow function - 'this' is inherited from outer scope
  introduceNested: function () {
    const inner = () => {
      return `Nested: I'm ${this.name}`; // 'this' refers to person
    };
    return inner();
  },
};

console.log("Regular function:", person.introduceRegular()); // Works correctly
console.log("Arrow function:", person.introduceArrow()); // undefined
console.log("Nested arrow:", person.introduceNested()); // Works correctly

// Example 3: Event Handlers - 'this' binding
console.log("\n--- Example 3: Event Handlers ---");
const button = {
  clicked: false,
  text: "Click me",

  // Regular function - 'this' refers to button
  handleClickRegular: function () {
    this.clicked = true;
    return `Button clicked: ${this.clicked}`;
  },

  // Arrow function - 'this' doesn't refer to button
  handleClickArrow: () => {
    // this.clicked = true; // Error: Cannot set property of undefined
    return "Arrow function can't access 'this'";
  },
};

console.log("Regular:", button.handleClickRegular()); // Works
console.log("Arrow:", button.handleClickArrow()); // Can't access this

// Example 4: Hoisting
console.log("\n--- Example 4: Hoisting ---");
// Regular function - can be called before declaration
console.log("Hoisted function:", hoistedExample()); // Works!

function hoistedExample() {
  return "I'm hoisted!";
}

// Arrow function - cannot be called before declaration
// console.log(arrowHoisted()); // Error: Cannot access before initialization
const arrowHoisted = () => "I'm not hoisted!";
console.log("Arrow function:", arrowHoisted()); // Works after declaration

// Example 5: Arguments Object
console.log("\n--- Example 5: Arguments Object ---");
// Regular function - has 'arguments' object
function regularSum() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}
console.log("Regular (arguments):", regularSum(1, 2, 3, 4)); // 10

// Arrow function - NO 'arguments' object
// const arrowSum = () => {
//   return arguments; // Error: arguments is not defined
// };

// Arrow function - use rest parameters instead
const arrowSum = (...args) => {
  return args.reduce((sum, num) => sum + num, 0);
};
console.log("Arrow (rest params):", arrowSum(1, 2, 3, 4)); // 10

// Example 6: Constructor Functions
console.log("\n--- Example 6: Constructor Functions ---");
// Regular function - can be used as constructor
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const person1 = new Person("Ahmed", 25);
console.log("Regular constructor:", person1); // Person { name: 'Ahmed', age: 25 }

// Arrow function - CANNOT be used as constructor
// const ArrowPerson = (name, age) => {
//   this.name = name;
//   this.age = age;
// };
// const person2 = new ArrowPerson("Ahmed", 25); // Error: ArrowPerson is not a constructor

// Example 7: Methods in Classes
console.log("\n--- Example 7: Methods in Classes ---");
class Calculator {
  constructor(value = 0) {
    this.value = value;
  }

  // Regular method - 'this' refers to instance
  addRegular(num) {
    this.value += num;
    return this;
  }

  // Arrow method - 'this' refers to instance (bound at class definition)
  addArrow = (num) => {
    this.value += num;
    return this;
  };

  getValue() {
    return this.value;
  }
}

const calc = new Calculator(10);
calc.addRegular(5).addArrow(3);
console.log("Calculator value:", calc.getValue()); // 18

// Example 8: Callback Functions
console.log("\n--- Example 8: Callback Functions ---");
const numbers3 = [1, 2, 3, 4, 5];

// Both work similarly for simple callbacks
const doubledRegular = numbers3.map(function (n) {
  return n * 2;
});

const doubledArrow = numbers3.map((n) => n * 2);

console.log("Regular callback:", doubledRegular); // [2, 4, 6, 8, 10]
console.log("Arrow callback:", doubledArrow); // [2, 4, 6, 8, 10]

// Example 9: setTimeout - 'this' binding
console.log("\n--- Example 9: setTimeout - 'this' binding ---");
const timer = {
  message: "Timer completed!",

  // Regular function - 'this' is lost, becomes undefined or window
  startRegular: function () {
    setTimeout(function () {
      console.log("Regular setTimeout:", this.message); // undefined
    }, 100);
  },

  // Arrow function - 'this' is preserved
  startArrow: function () {
    setTimeout(() => {
      console.log("Arrow setTimeout:", this.message); // "Timer completed!"
    }, 100);
  },

  // Regular function with bind - 'this' is preserved
  startRegularBound: function () {
    setTimeout(
      function () {
        console.log("Regular bound:", this.message); // "Timer completed!"
      }.bind(this),
      100
    );
  },
};

timer.startRegular();
timer.startArrow();
timer.startRegularBound();

// ============================================
console.log("\n=== 8. SUMMARY: WHEN TO USE WHICH ===");
console.log(`
Use Regular Functions when:
- You need 'this' to refer to the calling object
- You need to use the 'arguments' object
- You need to create constructor functions
- You need hoisting behavior
- You're defining object methods

Use Arrow Functions when:
- You need lexical 'this' binding (callbacks, event handlers)
- You want shorter, cleaner syntax
- You're working with array methods (map, filter, reduce)
- You need to preserve 'this' in nested functions
- You're writing functional programming code
`);
