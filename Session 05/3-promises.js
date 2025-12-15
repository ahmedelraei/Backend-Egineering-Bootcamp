// ============================================
// PROMISES IN JAVASCRIPT
// ============================================

console.log("=== 1. WHAT ARE PROMISES? ===");

// A Promise is an object representing the eventual completion or failure
// of an asynchronous operation

// Promise States:
// - Pending: Initial state, neither fulfilled nor rejected
// - Fulfilled: Operation completed successfully
// - Rejected: Operation failed

// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
  // Simulate async operation
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve("Operation successful!");
    } else {
      reject("Operation failed!");
    }
  }, 1000);
});

// Using the Promise
myPromise
  .then((result) => {
    console.log("Success:", result);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// ============================================
console.log("\n=== 2. CREATING PROMISES ===");

// Example 1: Simple Promise
const simplePromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("Data loaded");
  }, 1000);
});

simplePromise.then((data) => {
  console.log("Simple promise:", data);
});

// Example 2: Promise with rejection
const promiseWithError = new Promise((resolve, reject) => {
  setTimeout(() => {
    const random = Math.random();
    if (random > 0.5) {
      resolve("Success!");
    } else {
      reject("Failed!");
    }
  }, 500);
});

promiseWithError
  .then((result) => console.log("Promise result:", result))
  .catch((error) => console.error("Promise error:", error));

// Example 3: Wrapping callback-based code in Promise
function fetchUserPromise(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId > 0) {
        resolve({ id: userId, name: "Ahmed", email: "ahmed@example.com" });
      } else {
        reject(new Error("Invalid user ID"));
      }
    }, 1000);
  });
}

fetchUserPromise(1)
  .then((user) => console.log("User:", user))
  .catch((error) => console.error("Error:", error.message));

fetchUserPromise(-1)
  .then((user) => console.log("User:", user))
  .catch((error) => console.error("Error:", error.message));

// ============================================
console.log("\n=== 3. PROMISE METHODS: THEN, CATCH, FINALLY ===");

// .then() - handles fulfilled promises
const promise1 = Promise.resolve("Success");
promise1.then((value) => {
  console.log("Then:", value);
});

// .catch() - handles rejected promises
const promise2 = Promise.reject("Error occurred");
promise2.catch((error) => {
  console.error("Catch:", error);
});

// .finally() - runs regardless of success or failure
const promise3 = new Promise((resolve) => {
  setTimeout(() => resolve("Done"), 500);
});

promise3
  .then((result) => console.log("Result:", result))
  .finally(() => console.log("Finally: Cleanup code here"));

// Chaining then, catch, and finally
Promise.resolve("Step 1")
  .then((value) => {
    console.log(value);
    return "Step 2";
  })
  .then((value) => {
    console.log(value);
    return "Step 3";
  })
  .then((value) => {
    console.log(value);
  })
  .catch((error) => {
    console.error("Error:", error);
  })
  .finally(() => {
    console.log("Finally: Always runs");
  });

// ============================================
console.log("\n=== 4. PROMISE CHAINING ===");

// Promises can be chained - each then returns a new promise

// Example 1: Sequential operations
function getUser(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: "Ahmed" });
    }, 500);
  });
}

function getPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ id: 1, title: "Post 1" }, { id: 2, title: "Post 2" }]);
    }, 500);
  });
}

function getComments(postId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([{ id: 1, text: "Comment 1" }]);
    }, 500);
  });
}

// Chaining promises (much cleaner than callbacks!)
console.log("--- Promise Chaining ---");
getUser(1)
  .then((user) => {
    console.log("User:", user);
    return getPosts(user.id);
  })
  .then((posts) => {
    console.log("Posts:", posts);
    return getComments(posts[0].id);
  })
  .then((comments) => {
    console.log("Comments:", comments);
  })
  .catch((error) => {
    console.error("Error in chain:", error);
  });

// Example 2: Returning values in chain
Promise.resolve(5)
  .then((value) => {
    console.log("Initial value:", value);
    return value * 2;
  })
  .then((value) => {
    console.log("Doubled:", value);
    return value + 10;
  })
  .then((value) => {
    console.log("Added 10:", value);
    return value / 2;
  })
  .then((value) => {
    console.log("Final value:", value);
  });

// ============================================
console.log("\n=== 5. ERROR HANDLING IN PROMISES ===");

// Error handling with catch
function mightFail(shouldFail) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("Something went wrong"));
      } else {
        resolve("Success!");
      }
    }, 500);
  });
}

mightFail(false)
  .then((result) => console.log("Success:", result))
  .catch((error) => console.error("Error:", error.message));

mightFail(true)
  .then((result) => console.log("Success:", result))
  .catch((error) => console.error("Error:", error.message));

// Errors propagate through the chain
Promise.resolve("Start")
  .then((value) => {
    throw new Error("Error in first then");
  })
  .then((value) => {
    console.log("This won't run");
  })
  .catch((error) => {
    console.error("Caught error:", error.message);
  });

// Multiple catch handlers
Promise.reject("First error")
  .catch((error) => {
    console.error("First catch:", error);
    throw "Second error";
  })
  .catch((error) => {
    console.error("Second catch:", error);
  });

// ============================================
console.log("\n=== 6. PROMISE.ALL() ===");

// Promise.all() waits for all promises to resolve
// If any promise rejects, the entire Promise.all() rejects

const promiseA = new Promise((resolve) => setTimeout(() => resolve("A"), 1000));
const promiseB = new Promise((resolve) => setTimeout(() => resolve("B"), 500));
const promiseC = new Promise((resolve) => setTimeout(() => resolve("C"), 800));

console.log("--- Promise.all() - All succeed ---");
Promise.all([promiseA, promiseB, promiseC])
  .then((results) => {
    console.log("All promises resolved:", results); // ["A", "B", "C"]
  })
  .catch((error) => {
    console.error("One promise failed:", error);
  });

// Promise.all() with one failure
const promiseD = Promise.resolve("D");
const promiseE = Promise.reject("E failed");
const promiseF = Promise.resolve("F");

setTimeout(() => {
  console.log("\n--- Promise.all() - One fails ---");
  Promise.all([promiseD, promiseE, promiseF])
    .then((results) => {
      console.log("All promises resolved:", results);
    })
    .catch((error) => {
      console.error("One promise failed:", error); // "E failed"
    });
}, 2000);

// Practical example: Fetching multiple resources
function fetchUser(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ id: userId, name: "User " + userId }), 300);
  });
}

function fetchPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([{ id: 1, title: "Post 1" }]), 400);
  });
}

function fetchComments(userId) {
  return new Promise((resolve) => {
    setTimeout(() => resolve([{ id: 1, text: "Comment 1" }]), 500);
  });
}

setTimeout(() => {
  console.log("\n--- Promise.all() - Practical Example ---");
  Promise.all([fetchUser(1), fetchPosts(1), fetchComments(1)])
    .then(([user, posts, comments]) => {
      console.log("User:", user);
      console.log("Posts:", posts);
      console.log("Comments:", comments);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}, 3000);

// ============================================
console.log("\n=== 7. PROMISE.ALLSETTLED() ===");

// Promise.allSettled() waits for all promises to settle (resolve or reject)
// Returns results for all promises, regardless of success or failure

const settled1 = Promise.resolve("Success 1");
const settled2 = Promise.reject("Error 2");
const settled3 = Promise.resolve("Success 3");

Promise.allSettled([settled1, settled2, settled3])
  .then((results) => {
    console.log("All settled:", results);
    // [
    //   { status: 'fulfilled', value: 'Success 1' },
    //   { status: 'rejected', reason: 'Error 2' },
    //   { status: 'fulfilled', value: 'Success 3' }
    // ]
    results.forEach((result, index) => {
      if (result.status === "fulfilled") {
        console.log(`Promise ${index + 1} succeeded:`, result.value);
      } else {
        console.log(`Promise ${index + 1} failed:`, result.reason);
      }
    });
  });

// ============================================
console.log("\n=== 8. PROMISE.RACE() ===");

// Promise.race() returns the first promise that settles (resolves or rejects)

const race1 = new Promise((resolve) => setTimeout(() => resolve("Fast"), 200));
const race2 = new Promise((resolve) => setTimeout(() => resolve("Medium"), 500));
const race3 = new Promise((resolve) => setTimeout(() => resolve("Slow"), 1000));

Promise.race([race1, race2, race3])
  .then((result) => {
    console.log("Race winner:", result); // "Fast" (first to resolve)
  });

// Race with rejection
const race4 = new Promise((resolve) => setTimeout(() => resolve("Success"), 300));
const race5 = new Promise((_, reject) => setTimeout(() => reject("Error"), 100));

setTimeout(() => {
  Promise.race([race4, race5])
    .then((result) => {
      console.log("Race result:", result);
    })
    .catch((error) => {
      console.error("Race error:", error); // "Error" (first to settle)
    });
}, 1500);

// Practical example: Timeout pattern
function fetchWithTimeout(url, timeout) {
  const fetchPromise = new Promise((resolve) => {
    setTimeout(() => resolve(`Data from ${url}`), 2000);
  });

  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error("Request timeout")), timeout);
  });

  return Promise.race([fetchPromise, timeoutPromise]);
}

setTimeout(() => {
  console.log("\n--- Promise.race() - Timeout Pattern ---");
  fetchWithTimeout("https://api.example.com", 1000)
    .then((data) => console.log("Data:", data))
    .catch((error) => console.error("Error:", error.message)); // "Request timeout"
}, 2000);

// ============================================
console.log("\n=== 9. PROMISE.ANY() ===");

// Promise.any() returns the first promise that fulfills (resolves)
// Only rejects if all promises reject

const any1 = new Promise((_, reject) => setTimeout(() => reject("Error 1"), 200));
const any2 = new Promise((resolve) => setTimeout(() => resolve("Success 2"), 300));
const any3 = new Promise((resolve) => setTimeout(() => resolve("Success 3"), 500));

Promise.any([any1, any2, any3])
  .then((result) => {
    console.log("Any result:", result); // "Success 2" (first to fulfill)
  })
  .catch((error) => {
    console.error("All failed:", error);
  });

// All promises reject
const any4 = Promise.reject("Error 4");
const any5 = Promise.reject("Error 5");

setTimeout(() => {
  Promise.any([any4, any5])
    .then((result) => {
      console.log("Any result:", result);
    })
    .catch((error) => {
      console.error("All promises rejected:", error); // AggregateError
    });
}, 2500);

// ============================================
console.log("\n=== 10. PROMISE UTILITY METHODS ===");

// Promise.resolve() - Creates a resolved promise
const resolved = Promise.resolve("Resolved value");
resolved.then((value) => console.log("Resolved:", value));

// Promise.reject() - Creates a rejected promise
const rejected = Promise.reject("Rejected value");
rejected.catch((error) => console.error("Rejected:", error));

// Converting values to promises
const value = 42;
Promise.resolve(value)
  .then((v) => v * 2)
  .then((v) => console.log("Converted value:", v));

// ============================================
console.log("\n=== 11. CONVERTING CALLBACKS TO PROMISES ===");

// Example 1: Wrapping setTimeout
function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

delay(1000).then(() => {
  console.log("Delayed by 1 second");
});

// Example 2: Wrapping callback-based function
function fetchUserCallback(userId, callback) {
  setTimeout(() => {
    if (userId > 0) {
      callback(null, { id: userId, name: "Ahmed" });
    } else {
      callback(new Error("Invalid ID"), null);
    }
  }, 500);
}

// Convert to Promise
function fetchUserPromise(userId) {
  return new Promise((resolve, reject) => {
    fetchUserCallback(userId, (error, user) => {
      if (error) {
        reject(error);
      } else {
        resolve(user);
      }
    });
  });
}

fetchUserPromise(1)
  .then((user) => console.log("User from promise:", user))
  .catch((error) => console.error("Error:", error.message));

// ============================================
console.log("\n=== 12. ADVANCED PROMISE PATTERNS ===");

// Pattern 1: Retry logic
function retryOperation(operation, maxRetries = 3) {
  return new Promise((resolve, reject) => {
    let attempts = 0;

    function attempt() {
      attempts++;
      operation()
        .then(resolve)
        .catch((error) => {
          if (attempts >= maxRetries) {
            reject(new Error(`Failed after ${maxRetries} attempts`));
          } else {
            console.log(`Attempt ${attempts} failed, retrying...`);
            attempt();
          }
        });
    }

    attempt();
  });
}

// Simulate an operation that might fail
function mightFailOperation() {
  return new Promise((resolve, reject) => {
    const success = Math.random() > 0.7; // 30% success rate
    setTimeout(() => {
      if (success) {
        resolve("Operation succeeded!");
      } else {
        reject("Operation failed");
      }
    }, 500);
  });
}

setTimeout(() => {
  console.log("\n--- Retry Pattern ---");
  retryOperation(mightFailOperation, 3)
    .then((result) => console.log("Success:", result))
    .catch((error) => console.error("Failed:", error.message));
}, 4000);

// Pattern 2: Sequential execution with reduce
function sequentialPromises(promises) {
  return promises.reduce((chain, promise) => {
    return chain.then(() => promise).then((result) => {
      console.log("Sequential result:", result);
      return result;
    });
  }, Promise.resolve());
}

setTimeout(() => {
  console.log("\n--- Sequential Execution Pattern ---");
  const promises = [
    Promise.resolve("Task 1"),
    Promise.resolve("Task 2"),
    Promise.resolve("Task 3"),
  ];
  sequentialPromises(promises).then(() => {
    console.log("All tasks completed sequentially");
  });
}, 6000);

// ============================================
console.log("\n=== 13. REAL-WORLD EXAMPLES ===");

// Example 1: API Request Chain
function apiRequest(url) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ url, data: `Data from ${url}` });
    }, 500);
  });
}

console.log("--- API Request Chain ---");
apiRequest("/api/users")
  .then((response) => {
    console.log("Users:", response);
    return apiRequest(`/api/posts?userId=${response.data}`);
  })
  .then((response) => {
    console.log("Posts:", response);
    return apiRequest(`/api/comments?postId=${response.data}`);
  })
  .then((response) => {
    console.log("Comments:", response);
  })
  .catch((error) => {
    console.error("API Error:", error);
  });

// Example 2: Parallel data fetching
setTimeout(() => {
  console.log("\n--- Parallel Data Fetching ---");
  Promise.all([
    fetchUser(1),
    fetchPosts(1),
    fetchComments(1),
  ])
    .then(([user, posts, comments]) => {
      console.log("All data fetched:");
      console.log("User:", user);
      console.log("Posts:", posts);
      console.log("Comments:", comments);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}, 8000);

// ============================================
console.log("\n=== 14. PROMISES vs CALLBACKS ===");

// Callback version (Callback Hell)
function callbackVersion() {
  getUser(1, (error, user) => {
    if (error) {
      console.error("Error:", error);
    } else {
      getPosts(user.id, (error, posts) => {
        if (error) {
          console.error("Error:", error);
        } else {
          getComments(posts[0].id, (error, comments) => {
            if (error) {
              console.error("Error:", error);
            } else {
              console.log("Callback version - All data:", { user, posts, comments });
            }
          });
        }
      });
    }
  });
}

// Promise version (Clean and readable)
function promiseVersion() {
  getUser(1)
    .then((user) => {
      return getPosts(user.id).then((posts) => ({ user, posts }));
    })
    .then(({ user, posts }) => {
      return getComments(posts[0].id).then((comments) => ({
        user,
        posts,
        comments,
      }));
    })
    .then((data) => {
      console.log("Promise version - All data:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

setTimeout(() => {
  console.log("\n--- Comparison ---");
  promiseVersion();
}, 10000);

// ============================================
console.log("\n=== 15. SUMMARY ===");
console.log(`
Promises:
- Represent the eventual result of an async operation
- States: Pending, Fulfilled, Rejected
- Better than callbacks for handling async code

Key Methods:
- .then() - Handle fulfilled promises
- .catch() - Handle rejected promises
- .finally() - Always runs
- Promise.all() - Wait for all promises
- Promise.allSettled() - Wait for all, get all results
- Promise.race() - First to settle wins
- Promise.any() - First to fulfill wins

Benefits:
- Avoid callback hell
- Better error handling
- Chainable
- Can handle parallel operations easily
- More readable code

Next: async/await (syntactic sugar for Promises)
`);

