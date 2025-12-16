// ============================================
// ERROR HANDLING IN NODE.JS
// ============================================

console.log("=== 1. TYPES OF ERRORS ===");

// 1. Syntax Errors - Code mistakes
// 2. Runtime Errors - Errors during execution
// 3. Logic Errors - Incorrect program logic
// 4. System Errors - OS-level errors
// 5. User Errors - Invalid input

console.log(`
Error Types:
- Syntax Errors: Code syntax mistakes
- Runtime Errors: Execution-time errors
- Logic Errors: Incorrect program logic
- System Errors: OS/System level errors
- User Errors: Invalid user input
`);

// ============================================
console.log("\n=== 2. ERROR OBJECTS ===");

// JavaScript Error object
const error = new Error("Something went wrong");
console.log("Error message:", error.message);
console.log("Error name:", error.name);
console.log("Error stack:", error.stack);

// Built-in error types
try {
  throw new TypeError("Invalid type");
} catch (err) {
  console.log("TypeError:", err.name, err.message);
}

try {
  throw new ReferenceError("Variable not defined");
} catch (err) {
  console.log("ReferenceError:", err.name, err.message);
}

try {
  throw new RangeError("Value out of range");
} catch (err) {
  console.log("RangeError:", err.name, err.message);
}

console.log(`
Error Object Properties:
- message: Error message
- name: Error type name
- stack: Stack trace

Built-in Error Types:
- Error: Generic error
- TypeError: Wrong type
- ReferenceError: Undefined variable
- RangeError: Value out of range
- SyntaxError: Syntax mistake
- EvalError: eval() error
`);

// ============================================
console.log("\n=== 3. TRY-CATCH BLOCKS ===");

// Basic try-catch
function divide(a, b) {
  try {
    if (b === 0) {
      throw new Error("Cannot divide by zero");
    }
    return a / b;
  } catch (error) {
    console.error("Error in divide:", error.message);
    throw error; // Re-throw if needed
  }
}

try {
  const result = divide(10, 2);
  console.log("Result:", result);
} catch (error) {
  console.error("Caught error:", error.message);
}

try {
  divide(10, 0);
} catch (error) {
  console.error("Caught division error:", error.message);
}

// Try-catch-finally
function riskyOperation() {
  try {
    console.log("Attempting risky operation...");
    // Simulate error
    throw new Error("Operation failed");
  } catch (error) {
    console.error("Error caught:", error.message);
  } finally {
    console.log("Finally block always executes");
  }
}

riskyOperation();

console.log(`
Try-Catch:
- try: Code that might throw error
- catch: Handle the error
- finally: Always executes
- Can nest try-catch blocks
- Can re-throw errors
`);

// ============================================
console.log("\n=== 4. ERROR-FIRST CALLBACKS ===");

// Node.js convention: callback(error, result)

function readFile(filename, callback) {
  // Simulate async operation
  setTimeout(() => {
    if (filename === "error.txt") {
      callback(new Error("File not found"), null);
    } else {
      callback(null, `Content of ${filename}`);
    }
  }, 100);
}

// Using error-first callback
readFile("data.txt", (error, data) => {
  if (error) {
    console.error("Error reading file:", error.message);
    return;
  }
  console.log("File content:", data);
});

readFile("error.txt", (error, data) => {
  if (error) {
    console.error("Error reading file:", error.message);
    return;
  }
  console.log("File content:", data);
});

console.log(`
Error-First Callback Pattern:
- First parameter is error (null if success)
- Second parameter is result (null if error)
- Always check error first
- Node.js standard convention
`);

// ============================================
console.log("\n=== 5. ERROR HANDLING WITH PROMISES ===");

// Promises use .catch() for error handling

function readFilePromise(filename) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (filename === "error.txt") {
        reject(new Error("File not found"));
      } else {
        resolve(`Content of ${filename}`);
      }
    }, 100);
  });
}

// Using .catch()
readFilePromise("data.txt")
  .then((data) => {
    console.log("File content:", data);
  })
  .catch((error) => {
    console.error("Error:", error.message);
  });

// Chaining with error handling
readFilePromise("data.txt")
  .then((data) => {
    console.log("Step 1:", data);
    return readFilePromise("data2.txt");
  })
  .then((data) => {
    console.log("Step 2:", data);
  })
  .catch((error) => {
    console.error("Error in chain:", error.message);
  });

console.log(`
Promise Error Handling:
- .catch() handles errors
- Catches errors in entire chain
- Can have multiple .catch() blocks
- Errors propagate to nearest .catch()
`);

// ============================================
console.log("\n=== 6. ERROR HANDLING WITH ASYNC/AWAIT ===");

// Async/await uses try-catch

async function readFileAsync(filename) {
  try {
    const data = await readFilePromise(filename);
    console.log("File content:", data);
    return data;
  } catch (error) {
    console.error("Error reading file:", error.message);
    throw error; // Re-throw if needed
  }
}

readFileAsync("data.txt").catch((err) => {
  console.error("Unhandled error:", err.message);
});

readFileAsync("error.txt").catch((err) => {
  console.error("Unhandled error:", err.message);
});

// Multiple async operations
async function processMultipleFiles() {
  try {
    const file1 = await readFilePromise("file1.txt");
    const file2 = await readFilePromise("file2.txt");
    console.log("Both files read:", file1, file2);
  } catch (error) {
    console.error("Error processing files:", error.message);
  }
}

processMultipleFiles();

console.log(`
Async/Await Error Handling:
- Use try-catch blocks
- Errors thrown are caught by catch
- Can re-throw errors
- Unhandled errors become rejected promises
`);

// ============================================
console.log("\n=== 7. UNCAUGHT EXCEPTIONS ===");

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error.message);
  console.error("Stack:", error.stack);
  // Should exit process after logging
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
  console.error("Promise:", promise);
  // Should exit process after logging
  process.exit(1);
});

// Example of uncaught exception (commented to prevent exit)
// setTimeout(() => {
//   throw new Error("Uncaught exception");
// }, 1000);

// Example of unhandled rejection (commented to prevent exit)
// Promise.reject(new Error("Unhandled rejection"));

console.log(`
Process Error Handlers:
- uncaughtException: Synchronous errors not caught
- unhandledRejection: Promise rejections not handled
- Should log error and exit process
- Don't try to continue execution
`);

// ============================================
console.log("\n=== 8. CUSTOM ERROR CLASSES ===");

// Create custom error classes
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = "ValidationError";
    this.field = field;
  }
}

class DatabaseError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "DatabaseError";
    this.code = code;
  }
}

// Using custom errors
function validateUser(user) {
  if (!user.name) {
    throw new ValidationError("Name is required", "name");
  }
  if (!user.email) {
    throw new ValidationError("Email is required", "email");
  }
  return true;
}

try {
  validateUser({});
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`Validation error in field '${error.field}':`, error.message);
  } else {
    console.error("Unknown error:", error.message);
  }
}

try {
  validateUser({ name: "Ahmed" });
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`Validation error in field '${error.field}':`, error.message);
  } else {
    console.error("Unknown error:", error.message);
  }
}

console.log(`
Custom Error Classes:
- Extend Error class
- Add custom properties
- Use instanceof to check type
- Better error categorization
`);

// ============================================
console.log("\n=== 9. ERROR HANDLING PATTERNS ===");

// Pattern 1: Error wrapper
function asyncOperation() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        // Some operation that might throw
        const result = JSON.parse('{"valid": "json"}');
        resolve(result);
      } catch (error) {
        reject(new Error(`Operation failed: ${error.message}`));
      }
    }, 100);
  });
}

// Pattern 2: Error handler utility
function handleError(error, context = "") {
  const errorInfo = {
    message: error.message,
    stack: error.stack,
    context: context,
    timestamp: new Date().toISOString(),
  };
  console.error("Error:", errorInfo);
  // Could also log to file, send to monitoring service, etc.
}

asyncOperation().catch((error) => {
  handleError(error, "asyncOperation");
});

// Pattern 3: Retry with error handling
async function retryOperation(operation, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      if (i === maxRetries - 1) {
        throw error;
      }
      console.log(`Retry ${i + 1} failed, retrying...`);
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
}

// Pattern 4: Error boundary
function errorBoundary(fn) {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error("Error in boundary:", error.message);
      return null; // or default value
    }
  };
}

console.log(`
Error Handling Patterns:
- Error wrapper functions
- Error handler utilities
- Retry mechanisms
- Error boundaries
- Centralized error logging
`);

// ============================================
console.log("\n=== 10. FILE SYSTEM ERROR HANDLING ===");

const fs = require("fs");

// Proper error handling for file operations
function readFileSafe(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (error, data) => {
      if (error) {
        // Handle specific error types
        if (error.code === "ENOENT") {
          reject(new Error(`File not found: ${filename}`));
        } else if (error.code === "EACCES") {
          reject(new Error(`Permission denied: ${filename}`));
        } else {
          reject(error);
        }
        return;
      }
      resolve(data);
    });
  });
}

readFileSafe("nonexistent.txt").catch((error) => {
  console.error("File error:", error.message);
});

// Error handling with fs.promises
const fsPromises = require("fs").promises;

async function readFileAsyncSafe(filename) {
  try {
    const data = await fsPromises.readFile(filename, "utf8");
    return data;
  } catch (error) {
    if (error.code === "ENOENT") {
      throw new Error(`File not found: ${filename}`);
    }
    throw error;
  }
}

readFileAsyncSafe("nonexistent.txt").catch((error) => {
  console.error("Async file error:", error.message);
});

console.log(`
File System Error Handling:
- Check error.code for specific errors
- ENOENT: File/directory doesn't exist
- EACCES: Permission denied
- EISDIR: Is a directory
- ENOTDIR: Not a directory
- Handle errors appropriately
`);

// ============================================
console.log("\n=== 11. BEST PRACTICES ===");

console.log(`
1. Always handle errors explicitly
2. Use error-first callbacks in Node.js
3. Handle promise rejections
4. Use try-catch with async/await
5. Create custom error classes for better categorization
6. Log errors with context (where, when, what)
7. Don't ignore errors silently
8. Handle process-level errors (uncaughtException, unhandledRejection)
9. Provide meaningful error messages
10. Don't expose sensitive information in errors
11. Use error codes for programmatic error handling
12. Clean up resources in finally blocks
13. Re-throw errors when appropriate
14. Use error boundaries for critical sections
15. Monitor and log errors in production
`);

// ============================================
console.log("\n=== 12. ERROR HANDLING EXAMPLES ===");

// Example 1: API error handling
async function fetchUserData(userId) {
  try {
    // Simulate API call
    if (userId < 0) {
      throw new Error("Invalid user ID");
    }
    return { id: userId, name: "Ahmed" };
  } catch (error) {
    console.error(`Failed to fetch user ${userId}:`, error.message);
    throw error;
  }
}

// Example 2: Validation with detailed errors
function validateData(data) {
  const errors = [];

  if (!data.name || data.name.trim() === "") {
    errors.push(new ValidationError("Name is required", "name"));
  }

  if (!data.email || !data.email.includes("@")) {
    errors.push(new ValidationError("Valid email is required", "email"));
  }

  if (errors.length > 0) {
    throw errors; // Throw array of errors
  }

  return true;
}

try {
  validateData({ name: "", email: "invalid" });
} catch (errors) {
  if (Array.isArray(errors)) {
    errors.forEach((error) => {
      console.error(`Validation error: ${error.field} - ${error.message}`);
    });
  } else {
    console.error("Error:", errors.message);
  }
}

// Example 3: Graceful degradation
async function getDataWithFallback() {
  try {
    return await readFilePromise("primary.txt");
  } catch (error) {
    console.warn("Primary source failed, using fallback");
    try {
      return await readFilePromise("fallback.txt");
    } catch (fallbackError) {
      throw new Error("All data sources failed");
    }
  }
}

// ============================================
console.log("\n=== 13. SUMMARY ===");
console.log(`
Error Handling:
- Essential for robust applications
- Multiple approaches: try-catch, callbacks, promises, async/await
- Handle errors at appropriate levels

Error Types:
- Syntax, Runtime, Logic, System, User errors
- Custom error classes for categorization

Patterns:
- Error-first callbacks (Node.js convention)
- Promise .catch() handlers
- Try-catch with async/await
- Process-level error handlers
- Custom error classes

Best Practices:
- Always handle errors explicitly
- Provide meaningful error messages
- Log errors with context
- Handle process-level errors
- Don't ignore errors
- Clean up resources
- Use error boundaries
`);


