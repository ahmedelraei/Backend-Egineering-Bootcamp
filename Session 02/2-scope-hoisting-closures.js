// ============================================
// SCOPE, HOISTING, AND CLOSURES
// ============================================

console.log("=== 1. SCOPE ===");
// Scope determines the accessibility of variables

// Global Scope
const globalVar = "I'm global";

function testScope() {
  // Function/Local Scope
  const localVar = "I'm local";
  console.log(globalVar); // Can access global
  console.log(localVar); // Can access local
  
  if (true) {
    // Block Scope (let/const)
    const blockVar = "I'm in block";
    console.log(blockVar); // Accessible here
    console.log(localVar); // Can access outer scope
  }
  
  // console.log(blockVar); // Error: blockVar is not defined
}

testScope();
// console.log(localVar); // Error: localVar is not defined

// ============================================
console.log("\n=== 2. VAR vs LET vs CONST ===");

// VAR - Function scoped, hoisted, can be redeclared
function varExample() {
  console.log(x); // undefined (hoisted but not initialized)
  var x = 10;
  
  if (true) {
    var y = 20; // Function scoped, not block scoped
  }
  console.log(y); // 20 - accessible outside block
}

varExample();

// LET - Block scoped, not hoisted (temporal dead zone), cannot be redeclared
function letExample() {
  // console.log(z); // Error: Cannot access before initialization
  
  let z = 10;
  
  if (true) {
    let z = 20; // Different variable (block scoped)
    console.log(z); // 20
  }
  console.log(z); // 10
}

letExample();

// CONST - Block scoped, must be initialized, cannot be reassigned
function constExample() {
  const PI = 3.14159;
  // PI = 3.14; // Error: Assignment to constant variable
  
  const obj = { name: "JS" };
  obj.name = "JavaScript"; // OK - can modify object properties
  // obj = {}; // Error: Cannot reassign
  
  if (true) {
    const local = "block";
    console.log(local); // "block"
  }
  // console.log(local); // Error: local is not defined
}

constExample();

// ============================================
console.log("\n=== 3. HOISTING ===");
// Hoisting: JavaScript moves declarations to the top

console.log("Before declaration:", hoistedVar); // undefined (not error!)
var hoistedVar = "I'm hoisted";

// What actually happens:
// var hoistedVar; // Declaration hoisted
// console.log(hoistedVar); // undefined
// hoistedVar = "I'm hoisted"; // Assignment stays in place

// Function declarations are fully hoisted
console.log(hoistedFunc()); // Works! Returns "Hoisted function"

function hoistedFunc() {
  return "Hoisted function";
}

// Function expressions are NOT hoisted
// console.log(notHoistedFunc()); // Error: Cannot access before initialization
const notHoistedFunc = function() {
  return "Not hoisted";
};

// Let and const are hoisted but in "Temporal Dead Zone"
// console.log(tdzVar); // Error: Cannot access before initialization
let tdzVar = "TDZ";

// ============================================
console.log("\n=== 4. CLOSURES ===");
// Closure: Function has access to variables from outer scope even after outer function returns

function outerFunction(outerVar) {
  // Inner function forms a closure
  function innerFunction(innerVar) {
    console.log(`Outer: ${outerVar}, Inner: ${innerVar}`);
  }
  return innerFunction;
}

const closure = outerFunction("outer");
closure("inner"); // "Outer: outer, Inner: inner"

// Practical Example: Counter
function createCounter() {
  let count = 0; // Private variable
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1.increment()); // 1
console.log(counter1.increment()); // 2
console.log(counter2.increment()); // 1 (separate instance)
console.log(counter1.getCount()); // 2

// ============================================
console.log("\n=== 5. CLOSURE WITH LOOPS ===");
// Common pitfall: closures in loops

console.log("Problem with var:");
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Prints 3, 3, 3 (all reference same i)
  }, 100);
}

// Solution 1: Use let (block scoped)
console.log("\nSolution 1 - Using let:");
for (let j = 0; j < 3; j++) {
  setTimeout(function() {
    console.log(j); // Prints 0, 1, 2
  }, 200);
}

// Solution 2: IIFE (Immediately Invoked Function Expression)
console.log("\nSolution 2 - Using IIFE:");
for (var k = 0; k < 3; k++) {
  (function(index) {
    setTimeout(function() {
      console.log(index); // Prints 0, 1, 2
    }, 300);
  })(k);
}

// Solution 3: Arrow function with closure
console.log("\nSolution 3 - Using arrow function:");
for (var m = 0; m < 3; m++) {
  setTimeout(() => console.log(m), 400); // Still 3, 3, 3
}

// Better with let
for (let n = 0; n < 3; n++) {
  setTimeout(() => console.log(n), 500); // 0, 1, 2
}

// ============================================
console.log("\n=== 6. PRACTICAL CLOSURE EXAMPLES ===");

// Module Pattern
const calculator = (function() {
  let result = 0; // Private variable
  
  return {
    add: function(x) {
      result += x;
      return this;
    },
    subtract: function(x) {
      result -= x;
      return this;
    },
    multiply: function(x) {
      result *= x;
      return this;
    },
    getResult: function() {
      return result;
    },
    reset: function() {
      result = 0;
      return this;
    }
  };
})();
calculator.add(10).multiply(2).subtract(5);
console.log(calculator.getResult()); // 15

// Function Factory
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15

// Data Privacy
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private
  
  return {
    deposit: function(amount) {
      balance += amount;
      return balance;
    },
    withdraw: function(amount) {
      if (amount <= balance) {
        balance -= amount;
        return balance;
      }
      return "Insufficient funds";
    },
    getBalance: function() {
      return balance;
    }
  };
}

const account = createBankAccount(100);
console.log(account.deposit(50)); // 150
console.log(account.withdraw(30)); // 120
console.log(account.getBalance()); // 120
// console.log(account.balance); // undefined (private)

