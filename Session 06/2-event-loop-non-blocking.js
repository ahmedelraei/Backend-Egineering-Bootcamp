// ============================================
// NON-BLOCKING I/O & EVENT LOOP EXPLAINED
// ============================================

console.log("=== 1. WHAT IS NON-BLOCKING I/O? ===");

// Blocking I/O: Operations that wait/block until completion
// Non-Blocking I/O: Operations that don't block, continue execution

// Example: Blocking (Synchronous)
console.log("--- Blocking Example ---");
function blockingRead() {
  console.log("Reading file (blocking)...");
  // Simulating blocking operation
  const start = Date.now();
  while (Date.now() - start < 2000) {
    // Block for 2 seconds
  }
  console.log("File read complete");
}

console.log("Before blocking read");
blockingRead();
console.log("After blocking read"); // Waits 2 seconds before this runs

// Example: Non-Blocking (Asynchronous)
console.log("\n--- Non-Blocking Example ---");
function nonBlockingRead(callback) {
  console.log("Reading file (non-blocking)...");
  setTimeout(() => {
    console.log("File read complete");
    if (callback) callback();
  }, 2000);
}

console.log("Before non-blocking read");
nonBlockingRead(() => {
  console.log("Callback executed");
});
console.log("After non-blocking read"); // Runs immediately!

// ============================================
console.log("\n=== 2. WHY NON-BLOCKING I/O IN NODE.JS? ===");

// Node.js is single-threaded
// Non-blocking I/O allows handling many operations concurrently
// Without blocking the main thread

console.log(`
Benefits of Non-Blocking I/O:
1. Single-threaded efficiency
2. Handles many concurrent operations
3. Better resource utilization
4. Scalable for I/O-heavy applications
5. Responsive applications

Use Cases:
- Web servers handling many requests
- File system operations
- Database queries
- Network requests
- Real-time applications
`);

// ============================================
console.log("\n=== 3. THE EVENT LOOP ===");

// Event Loop is Node.js's mechanism for handling async operations
// It continuously checks for completed async operations
// And executes their callbacks

console.log(`
Event Loop Phases:
1. Timers: setTimeout, setInterval callbacks
2. Pending Callbacks: Deferred I/O callbacks
3. Idle, Prepare: Internal use
4. Poll: Fetch new I/O events
5. Check: setImmediate callbacks
6. Close Callbacks: Close event callbacks

The loop continues until no more callbacks to process
`);

// ============================================
console.log("\n=== 4. EVENT LOOP DEMONSTRATION ===");

console.log("1. Synchronous code starts");

// setTimeout goes to Timers phase
setTimeout(() => {
  console.log("4. setTimeout callback (Timers phase)");
}, 0);

// setImmediate goes to Check phase
setImmediate(() => {
  console.log("5. setImmediate callback (Check phase)");
});

// Promise goes to Microtask Queue (higher priority)
Promise.resolve().then(() => {
  console.log("3. Promise callback (Microtask Queue)");
});

// process.nextTick goes to nextTick Queue (highest priority)
process.nextTick(() => {
  console.log("2. process.nextTick callback (NextTick Queue)");
});

console.log("Synchronous code ends");

// Order: 1, "Synchronous code ends", 2, 3, 4, 5
// Microtasks (Promise, nextTick) run before macrotasks (setTimeout, setImmediate)

// ============================================
console.log("\n=== 5. CALLBACK QUEUES PRIORITY ===");

// Priority order (highest to lowest):
// 1. process.nextTick Queue
// 2. Microtask Queue (Promises)
// 3. Macrotask Queue (setTimeout, setImmediate, I/O callbacks)

console.log("--- Queue Priority Demo ---");

setTimeout(() => console.log("Macrotask: setTimeout"), 0);
setImmediate(() => console.log("Macrotask: setImmediate"), 0);

Promise.resolve().then(() => console.log("Microtask: Promise 1"));
Promise.resolve().then(() => console.log("Microtask: Promise 2"));

process.nextTick(() => console.log("NextTick: process.nextTick 1"));
process.nextTick(() => console.log("NextTick: process.nextTick 2"));

console.log("Synchronous code");

// Expected order:
// 1. Synchronous code
// 2. NextTick: process.nextTick 1
// 3. NextTick: process.nextTick 2
// 4. Microtask: Promise 1
// 5. Microtask: Promise 2
// 6. Macrotask: setTimeout
// 7. Macrotask: setImmediate

// ============================================
console.log("\n=== 6. NON-BLOCKING FILE OPERATIONS ===");

// Node.js fs module provides non-blocking file operations

const fs = require("fs");

console.log("--- Non-Blocking File Read ---");
console.log("1. Starting file read...");

// Non-blocking read (asynchronous)
fs.readFile(__filename, "utf8", (err, data) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("3. File read complete (callback executed)");
  }
});

console.log("2. This runs immediately (doesn't wait for file read)");

// ============================================
console.log("\n=== 7. CONCURRENT OPERATIONS ===");

// Non-blocking I/O allows handling multiple operations concurrently

console.log("--- Concurrent Operations Demo ---");
const startTime = Date.now();

// Simulate multiple async operations
function asyncOperation(name, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const elapsed = Date.now() - startTime;
      console.log(`${name} completed in ${elapsed}ms`);
      resolve();
    }, delay);
  });
}

// These run concurrently, not sequentially
Promise.all([
  asyncOperation("Operation 1", 1000),
  asyncOperation("Operation 2", 1500),
  asyncOperation("Operation 3", 800),
]).then(() => {
  const totalTime = Date.now() - startTime;
  console.log(`All operations completed in ${totalTime}ms (not 3300ms!)`);
});

// ============================================
console.log("\n=== 8. BLOCKING vs NON-BLOCKING COMPARISON ===");

// Simulating blocking vs non-blocking server

console.log("--- Blocking Server Simulation ---");
function blockingServer() {
  console.log("Request 1 received");
  // Blocking operation
  const start = Date.now();
  while (Date.now() - start < 1000) {}
  console.log("Request 1 processed");

  console.log("Request 2 received");
  const start2 = Date.now();
  while (Date.now() - start2 < 1000) {}
  console.log("Request 2 processed");
}

// blockingServer(); // Total time: ~2000ms

console.log("\n--- Non-Blocking Server Simulation ---");
function nonBlockingServer() {
  console.log("Request 1 received");
  setTimeout(() => {
    console.log("Request 1 processed");
  }, 1000);

  console.log("Request 2 received");
  setTimeout(() => {
    console.log("Request 2 processed");
  }, 1000);
}

nonBlockingServer(); // Both requests handled concurrently

// ============================================
console.log("\n=== 9. EVENT LOOP IN PRACTICE ===");

// Real-world example: Web server handling requests

class SimpleServer {
  constructor() {
    this.requestQueue = [];
  }

  // Simulate incoming request
  handleRequest(requestId) {
    console.log(`Request ${requestId} received`);

    // Non-blocking operation (simulated)
    setTimeout(() => {
      console.log(`Request ${requestId} processed`);
    }, Math.random() * 1000);
  }
}

const server = new SimpleServer();

console.log("--- Handling Multiple Requests ---");
server.handleRequest(1);
server.handleRequest(2);
server.handleRequest(3);
server.handleRequest(4);
server.handleRequest(5);

console.log("All requests queued (non-blocking)");

// ============================================
console.log("\n=== 10. COMMON PATTERNS ===");

// Pattern 1: Callback Pattern
function readData(callback) {
  setTimeout(() => {
    callback(null, "Data read");
  }, 1000);
}

readData((err, data) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Callback pattern:", data);
  }
});

// Pattern 2: Promise Pattern
function readDataPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data read");
    }, 1000);
  });
}

readDataPromise()
  .then((data) => console.log("Promise pattern:", data))
  .catch((err) => console.error("Error:", err));

// Pattern 3: Async/Await Pattern
async function readDataAsync() {
  try {
    const data = await readDataPromise();
    console.log("Async/await pattern:", data);
  } catch (err) {
    console.error("Error:", err);
  }
}

readDataAsync();

// ============================================
console.log("\n=== 11. EVENT LOOP BLOCKING WARNING ===");

// Warning: CPU-intensive tasks can block the event loop!

console.log("--- Blocking the Event Loop (BAD) ---");
function blockingTask() {
  console.log("Starting CPU-intensive task...");
  const start = Date.now();
  // This blocks the event loop!
  while (Date.now() - start < 2000) {
    // Heavy computation
  }
  console.log("Task complete");
}

// blockingTask(); // This blocks everything for 2 seconds!

console.log("\n--- Non-Blocking Alternative (GOOD) ---");
function nonBlockingTask() {
  console.log("Starting CPU-intensive task...");
  // Break work into chunks
  let progress = 0;
  const chunkSize = 100;

  function processChunk() {
    for (let i = 0; i < chunkSize; i++) {
      progress++;
    }

    if (progress < 1000) {
      // Use setImmediate to yield to event loop
      setImmediate(processChunk);
    } else {
      console.log("Task complete");
    }
  }

  processChunk();
}

// nonBlockingTask(); // Doesn't block the event loop

// ============================================
console.log("\n=== 12. BEST PRACTICES ===");

console.log(`
1. Use non-blocking I/O operations
2. Avoid blocking the event loop with CPU-intensive tasks
3. Break heavy computations into chunks
4. Use process.nextTick sparingly (can starve I/O)
5. Prefer Promises over callbacks for better error handling
6. Use async/await for cleaner code
7. Be aware of callback queue priority
8. Monitor event loop lag
9. Use worker threads for CPU-intensive tasks
10. Understand the difference between setTimeout and setImmediate
`);

// ============================================
console.log("\n=== 13. SUMMARY ===");
console.log(`
Non-Blocking I/O:
- Operations that don't block execution
- Allows concurrent handling of multiple operations
- Essential for Node.js's single-threaded model
- Better resource utilization

Event Loop:
- Manages async operations in Node.js
- Has multiple phases (Timers, Poll, Check, etc.)
- Processes callbacks from different queues
- Continues until no more callbacks

Queue Priority:
1. process.nextTick Queue (highest)
2. Microtask Queue (Promises)
3. Macrotask Queue (setTimeout, setImmediate, I/O)

Key Points:
- Node.js is single-threaded but handles concurrency
- Non-blocking I/O enables scalability
- Event loop processes async callbacks
- Don't block the event loop with CPU-intensive tasks
- Use appropriate async patterns (callbacks, Promises, async/await)
`);


