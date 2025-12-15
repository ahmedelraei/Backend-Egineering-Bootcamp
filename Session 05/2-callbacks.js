// ============================================
// CALLBACKS IN JAVASCRIPT
// ============================================

console.log("=== 1. WHAT ARE CALLBACKS? ===");

// A callback is a function passed as an argument to another function
// It gets executed at a later time (usually after an async operation completes)

// Simple callback example
function greet(name, callback) {
  console.log(`Hello, ${name}!`);
  if (callback) {
    callback();
  }
}
const callback = () => {
  console.log("Callback executed!");
};
greet("Ahmed", callback);

// Callback with data
function processNumber(num, callback) {
  const result = num * 2;
  callback(result);
}

processNumber(5, (result) => {
  console.log("Result:", result); // 10
});

// ============================================
console.log("\n=== 2. SYNCHRONOUS CALLBACKS ===");

// Callbacks can be synchronous (executed immediately)
const numbers = [1, 2, 3, 4, 5];

// Array methods use callbacks
const doubled = numbers.map((num) => num * 2);
console.log("Doubled:", doubled); // [2, 4, 6, 8, 10]

const filtered = numbers.filter((num) => num > 3);
console.log("Filtered:", filtered); // [4, 5]

const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log("Sum:", sum); // 15

// Custom function with callback
function forEachCustom(array, callback) {
  for (let i = 0; i < array.length; i++) {
    callback(array[i], i, array);
  }
}

forEachCustom([1, 2, 3], (item, index) => {
  console.log(`Item ${index}: ${item}`);
});

// ============================================
console.log("\n=== 3. ASYNCHRONOUS CALLBACKS ===");

// Most common use case: handling async operations

// Example 1: setTimeout
setTimeout(() => {
  console.log("This callback runs after 1 second");
}, 1000);

// Example 2: Simulated API call
function fetchUser(userId, callback) {
  console.log(`Fetching user ${userId}...`);

  setTimeout(() => {
    const user = {
      id: userId,
      name: "Ahmed",
      email: "ahmed@example.com",
    };
    callback(user);
  }, 1500);
}

fetchUser(1, (user) => {
  console.log("User received:", user);
});

// Example 3: Error handling with callbacks
function divide(a, b, callback) {
  setTimeout(() => {
    if (b === 0) {
      callback(new Error("Cannot divide by zero"), null);
    } else {
      callback(null, a / b);
    }
  }, 500);
}

// Node.js style: callback(error, result)
divide(10, 2, (error, result) => {
  if (error) {
    console.error("Error:", error.message);
  } else {
    console.log("Result:", result); // 5
  }
});

divide(10, 0, (error, result) => {
  if (error) {
    console.error("Error:", error.message); // "Cannot divide by zero"
  } else {
    console.log("Result:", result);
  }
});

// ============================================
console.log("\n=== 4. CALLBACK PATTERNS ===");

// Pattern 1: Success Callback
function loadData(callback) {
  setTimeout(() => {
    const data = { message: "Data loaded successfully" };
    callback(data);
  }, 1000);
}

loadData((data) => {
  console.log("Success pattern:", data);
});

// Pattern 2: Error-First Callback (Node.js convention)
function readFile(filename, callback) {
  setTimeout(() => {
    if (filename === "error.txt") {
      callback(new Error("File not found"), null);
    } else {
      callback(null, `Content of ${filename}`);
    }
  }, 800);
}

readFile("data.txt", (error, content) => {
  if (error) {
    console.error("Error:", error.message);
  } else {
    console.log("Content:", content);
  }
});

readFile("error.txt", (error, content) => {
  if (error) {
    console.error("Error:", error.message); // "File not found"
  } else {
    console.log("Content:", content);
  }
});

// Pattern 3: Callback with Multiple Arguments
function getUserData(userId, callback) {
  setTimeout(() => {
    const user = { id: userId, name: "Ahmed" };
    const posts = [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
    ];
    callback(null, user, posts);
  }, 1000);
}

getUserData(1, (error, user, posts) => {
  if (error) {
    console.error("Error:", error);
  } else {
    console.log("User:", user);
    console.log("Posts:", posts);
  }
});

// ============================================
console.log("\n=== 5. CALLBACK HELL (PYRAMID OF DOOM) ===");

// Problem: Nested callbacks become hard to read and maintain

// Example: Fetching user, then posts, then comments
function getUser(userId, callback) {
  setTimeout(() => {
    callback(null, { id: userId, name: "Ahmed" });
  }, 500);
}

function getPosts(userId, callback) {
  setTimeout(() => {
    callback(null, [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
    ]);
  }, 500);
}

function getComments(postId, callback) {
  setTimeout(() => {
    callback(null, [{ id: 1, text: "Comment 1" }]);
  }, 500);
}

// Callback Hell - Nested callbacks
console.log("--- Callback Hell Example ---");
getUser(1, (error, user) => {
  if (error) {
    console.error("Error getting user:", error);
  } else {
    console.log("User:", user);
    getPosts(user.id, (error, posts) => {
      if (error) {
        console.error("Error getting posts:", error);
      } else {
        console.log("Posts:", posts);
        getComments(posts[0].id, (error, comments) => {
          if (error) {
            console.error("Error getting comments:", error);
          } else {
            console.log("Comments:", comments);
            // More nesting would make this worse...
          }
        });
      }
    });
  }
});

// ============================================
console.log("\n=== 6. HANDLING MULTIPLE ASYNC OPERATIONS ===");

// Problem: How to handle multiple async operations?

// Sequential (one after another) - Slow
function sequentialOperations() {
  console.log("--- Sequential Operations ---");
  const start = Date.now();

  getUser(1, (error, user) => {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("User:", user);
      getPosts(1, (error, posts) => {
        if (error) {
          console.error("Error:", error);
        } else {
          console.log("Posts:", posts);
          const end = Date.now();
          console.log(`Sequential took: ${end - start}ms`);
        }
      });
    }
  });
}

sequentialOperations();

// Parallel (at the same time) - Faster
function parallelOperations() {
  console.log("\n--- Parallel Operations ---");
  const start = Date.now();
  let completed = 0;
  const results = {};

  getUser(1, (error, user) => {
    if (error) {
      console.error("Error:", error);
    } else {
      results.user = user;
      completed++;
      if (completed === 2) {
        const end = Date.now();
        console.log("All parallel operations completed");
        console.log("Results:", results);
        console.log(`Parallel took: ${end - start}ms`);
      }
    }
  });

  getPosts(1, (error, posts) => {
    if (error) {
      console.error("Error:", error);
    } else {
      results.posts = posts;
      completed++;
      if (completed === 2) {
        const end = Date.now();
        console.log("All parallel operations completed");
        console.log("Results:", results);
        console.log(`Parallel took: ${end - start}ms`);
      }
    }
  });
}

setTimeout(() => {
  parallelOperations();
}, 2000);

// ============================================
console.log("\n=== 7. CALLBACK UTILITIES ===");

// Helper function to handle parallel callbacks
function parallelCallbacks(operations, finalCallback) {
  let completed = 0;
  const results = [];
  const errors = [];

  operations.forEach((operation, index) => {
    operation((error, result) => {
      if (error) {
        errors[index] = error;
      } else {
        results[index] = result;
      }

      completed++;
      if (completed === operations.length) {
        finalCallback(errors.length > 0 ? errors : null, results);
      }
    });
  });
}

// Usage
setTimeout(() => {
  console.log("\n--- Using Parallel Callbacks Helper ---");
  parallelCallbacks(
    [(callback) => getUser(1, callback), (callback) => getPosts(1, callback)],
    (errors, results) => {
      if (errors) {
        console.error("Errors:", errors);
      } else {
        console.log("All results:", results);
      }
    }
  );
}, 4000);

// ============================================
console.log("\n=== 8. REAL-WORLD EXAMPLES ===");

// Example 1: Form Submission
function submitForm(formData, callback) {
  console.log("Submitting form...");

  // Simulate validation
  setTimeout(() => {
    if (!formData.email) {
      callback(new Error("Email is required"), null);
    } else {
      // Simulate API call
      setTimeout(() => {
        callback(null, { success: true, message: "Form submitted" });
      }, 1000);
    }
  }, 500);
}

const formData = { email: "ahmed@example.com", name: "Ahmed" };
submitForm(formData, (error, result) => {
  if (error) {
    console.error("Form error:", error.message);
  } else {
    console.log("Form success:", result);
  }
});

// Example 2: Image Loading
function loadImage(src, callback) {
  console.log(`Loading image: ${src}`);

  setTimeout(() => {
    if (src === "error.jpg") {
      callback(new Error("Image not found"), null);
    } else {
      callback(null, { src, width: 800, height: 600 });
    }
  }, 1000);
}

loadImage("photo.jpg", (error, image) => {
  if (error) {
    console.error("Image error:", error.message);
  } else {
    console.log("Image loaded:", image);
  }
});

// Example 3: Data Processing Pipeline
function step1(data, callback) {
  setTimeout(() => {
    callback(null, data.toUpperCase());
  }, 300);
}

function step2(data, callback) {
  setTimeout(() => {
    callback(null, data.split("").reverse().join(""));
  }, 300);
}

function step3(data, callback) {
  setTimeout(() => {
    callback(null, `Processed: ${data}`);
  }, 300);
}

console.log("\n--- Data Processing Pipeline ---");
step1("hello", (error, result1) => {
  if (error) {
    console.error("Step 1 error:", error);
  } else {
    step2(result1, (error, result2) => {
      if (error) {
        console.error("Step 2 error:", error);
      } else {
        step3(result2, (error, result3) => {
          if (error) {
            console.error("Step 3 error:", error);
          } else {
            console.log("Final result:", result3);
          }
        });
      }
    });
  }
});

// ============================================
console.log("\n=== 9. CALLBACK BEST PRACTICES ===");

// 1. Always handle errors
function goodCallbackExample(data, callback) {
  setTimeout(() => {
    try {
      const result = JSON.parse(data);
      callback(null, result);
    } catch (error) {
      callback(error, null);
    }
  }, 500);
}

// 2. Use named functions for complex callbacks
function handleUserData(error, user) {
  if (error) {
    console.error("Error:", error);
    return;
  }
  console.log("User:", user);
}

getUser(1, handleUserData);

// 3. Avoid deep nesting (use helper functions or Promises)
function processUserData(userId) {
  getUser(userId, (error, user) => {
    if (error) {
      handleError(error);
      return;
    }
    processUser(user);
  });
}

function handleError(error) {
  console.error("Error:", error);
}

function processUser(user) {
  console.log("Processing user:", user);
}

processUserData(1);

// ============================================
console.log("\n=== 10. SUMMARY ===");
console.log(`
Callbacks:
- Functions passed as arguments to other functions
- Executed at a later time (usually after async operations)
- Can be synchronous or asynchronous

Common Patterns:
- Success callbacks
- Error-first callbacks (Node.js convention)
- Callbacks with multiple arguments

Problems with Callbacks:
- Callback Hell (Pyramid of Doom)
- Hard to handle errors
- Difficult to manage parallel operations
- Hard to read and maintain

Solutions:
- Use named functions
- Use helper utilities
- Consider Promises or async/await (next topics)
`);
