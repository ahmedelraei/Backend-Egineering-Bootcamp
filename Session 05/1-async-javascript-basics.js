// ============================================
// ASYNCHRONOUS JAVASCRIPT BASICS
// ============================================

console.log("=== 1. SYNCHRONOUS vs ASYNCHRONOUS ===");

// Synchronous Code - Executes line by line, blocking
console.log("Step 1: Start");
console.log("Step 2: Middle");
console.log("Step 3: End");

// Synchronous function - blocks execution
function syncTask(taskName) {
  console.log(`${taskName} started`);
  // Simulating a time-consuming task
  const start = Date.now();
  while (Date.now() - start < 1000) {
    // Block for 1 second
  }
  console.log(`${taskName} completed`);
}

console.log("\n--- Synchronous Execution (Blocking) ---");
syncTask("Task A");
syncTask("Task B");
console.log("All tasks done");

// Asynchronous Code - Non-blocking, uses callbacks/events
console.log("\n--- Asynchronous Execution (Non-blocking) ---");
console.log("Step 1: Start");

setTimeout(() => {
  console.log("Step 2: This runs after 1 second");
}, 1000);

console.log("Step 3: This runs immediately (doesn't wait)");

// ============================================
console.log("\n=== 2. THE EVENT LOOP ===");
// JavaScript is single-threaded but uses an event loop for async operations

console.log("1. First synchronous code");
console.log("2. Second synchronous code");

// setTimeout is asynchronous - goes to the callback queue
setTimeout(() => {
  console.log("4. This runs after all synchronous code (even with 0ms delay)");
}, 0);

console.log("3. Third synchronous code");

// The order will be: 1, 2, 3, 4
// Even though setTimeout has 0ms, it waits for the call stack to be empty

// ============================================
console.log("\n=== 3. SETTIMEOUT ===");
// setTimeout executes a function after a specified delay

// Basic setTimeout
setTimeout(() => {
  console.log("This message appears after 2 seconds");
}, 2000);

// setTimeout with parameters
function greet(name, message) {
  console.log(`${message}, ${name}!`);
}

setTimeout(greet, 1000, "Ahmed", "Hello"); // Passes "Ahmed" and "Hello" as arguments

// Storing timeout ID to cancel it
const timeoutId = setTimeout(() => {
  console.log("This won't run");
}, 3000);

// Clear timeout before it executes
clearTimeout(timeoutId);
console.log("Timeout cleared - the message above won't appear");

// Multiple timeouts
console.log("\n--- Multiple Timeouts ---");
setTimeout(() => console.log("Timeout 1: 100ms"), 100);
setTimeout(() => console.log("Timeout 2: 50ms"), 50);
setTimeout(() => console.log("Timeout 3: 200ms"), 200);
// Order: Timeout 2 (50ms), Timeout 1 (100ms), Timeout 3 (200ms)

// ============================================
console.log("\n=== 4. SETINTERVAL ===");
// setInterval repeatedly executes a function at specified intervals

let count = 0;
const intervalId = setInterval(() => {
  count++;
  console.log(`Interval count: ${count}`);

  // Stop after 5 iterations
  if (count >= 5) {
    clearInterval(intervalId);
    console.log("Interval stopped");
  }
}, 500);

// Simulating a clock
console.log("\n--- Simulating a Clock ---");
let seconds = 0;
const clockInterval = setInterval(() => {
  seconds++;
  console.log(`Time: ${seconds}s`);

  if (seconds >= 3) {
    clearInterval(clockInterval);
    console.log("Clock stopped");
  }
}, 1000);

// ============================================
console.log("\n=== 5. WHY ASYNCHRONOUS? ===");

// Problem: Synchronous code blocks the UI
console.log("--- Problem with Synchronous Code ---");
function blockingTask() {
  console.log("Starting blocking task...");
  const start = Date.now();
  while (Date.now() - start < 2000) {
    // Block for 2 seconds
  }
  console.log("Blocking task completed");
}

// If this runs in a browser, the UI would freeze for 2 seconds
// blockingTask();

// Solution: Use asynchronous code
console.log("\n--- Solution: Asynchronous Code ---");
function nonBlockingTask(callback) {
  console.log("Starting non-blocking task...");
  setTimeout(() => {
    console.log("Non-blocking task completed");
    if (callback) callback();
  }, 2000);
}

nonBlockingTask(() => {
  console.log("Callback executed after task completion");
});

console.log("This runs immediately - UI stays responsive");

// ============================================
console.log("\n=== 6. COMMON ASYNC OPERATIONS ===");

// 1. Network Requests (simulated)
console.log("--- Network Request Simulation ---");
function fetchData(url, callback) {
  console.log(`Fetching data from ${url}...`);

  setTimeout(() => {
    const data = { id: 1, name: "Ahmed", email: "ahmed@example.com" };
    console.log("Data received:", data);
    if (callback) callback(data);
  }, 1500);
}

fetchData("https://api.example.com/user", (data) => {
  console.log("Processing data:", data);
});

// 2. File Operations (simulated)
console.log("\n--- File Operation Simulation ---");
function readFile(filename, callback) {
  console.log(`Reading file: ${filename}...`);

  setTimeout(() => {
    const content = "File content here...";
    console.log("File read successfully");
    if (callback) callback(null, content); // Node.js style: (error, data)
  }, 1000);
}

readFile("data.txt", (error, content) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("File content:", content);
  }
});

// 3. Database Queries (simulated)
console.log("\n--- Database Query Simulation ---");
function queryDatabase(query, cb) {
  console.log(`Executing query: ${query}`);

  setTimeout(() => {
    const results = [
      { id: 1, name: "Product A", price: 100 },
      { id: 2, name: "Product B", price: 200 },
    ];
    console.log("Query results:", results);
    if (cb) cb(results);
  }, 1200);
}

queryDatabase("SELECT * FROM products", (results) => {
  console.log("Processing results:", results.length, "items found");
});

// ============================================
console.log("\n=== 7. CALLBACK QUEUE vs MICROTASK QUEUE ===");

// Callback Queue (lower priority)
setTimeout(() => {
  console.log("1. setTimeout callback (Callback Queue)");
}, 0);

// Microtask Queue (higher priority - runs before callback queue)
Promise.resolve().then(() => {
  console.log("2. Promise callback (Microtask Queue)");
});

// Another microtask
Promise.resolve().then(() => {
  console.log("3. Another Promise callback (Microtask Queue)");
});

// Another setTimeout
setTimeout(() => {
  console.log("4. Another setTimeout (Callback Queue)");
}, 0);

console.log("5. Synchronous code");

// Order: 5, 2, 3, 1, 4
// Microtasks run before callbacks, even if callbacks were queued first

// ============================================
console.log("\n=== 8. PRACTICAL EXAMPLE: USER INTERACTION ===");

// Simulating user interactions with async operations
console.log("User clicks button...");

// Simulate API call
setTimeout(() => {
  console.log("API response received");

  // Process data
  setTimeout(() => {
    console.log("Data processed");

    // Update UI
    setTimeout(() => {
      console.log("UI updated");
    }, 100);
  }, 200);
}, 1000);

console.log("Button click handler completed (non-blocking)");

// ============================================
console.log("\n=== 9. ASYNC PATTERNS ===");

// Pattern 1: Callback Pattern (we'll see more in callbacks.js)
function asyncOperation(callback) {
  setTimeout(() => {
    callback("Operation completed");
  }, 1000);
}

asyncOperation((result) => {
  console.log("Callback pattern:", result);
});

// Pattern 2: Event Emitter Pattern (simulated)
class SimpleEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }

  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(data));
    }
  }
}

const emitter = new SimpleEventEmitter();

emitter.on("data", (data) => {
  console.log("Event received:", data);
});

setTimeout(() => {
  emitter.emit("data", { message: "Hello from event!" });
}, 500);

// ============================================
console.log("\n=== 10. SUMMARY ===");
console.log(`
Key Concepts:
1. JavaScript is single-threaded but uses async operations
2. Event Loop manages async operations
3. setTimeout/setInterval are basic async functions
4. Callbacks are functions passed to async operations
5. Microtasks (Promises) run before callbacks (setTimeout)
6. Async code doesn't block the main thread

Common Use Cases:
- Network requests (API calls)
- File operations
- Database queries
- User interactions
- Timers and delays
- Event handling
`);
