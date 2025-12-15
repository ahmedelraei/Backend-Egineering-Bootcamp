// ============================================
// DEFAULT PARAMETERS & OPTIONAL CHAINING
// ============================================

console.log("=== 1. DEFAULT PARAMETERS ===");
// Provide default values for function parameters

// Basic default parameters
function greet(name = "Guest") {
  return `Hello, ${name}!`;
}

console.log(greet("Alice")); // "Hello, Alice!"
console.log(greet()); // "Hello, Guest!"

// Multiple default parameters
function createUser(name = "Anonymous", age = 0, role = "user") {
  return { name, age, role };
}

console.log(createUser()); // { name: "Anonymous", age: 0, role: "user" }
console.log(createUser("Alice")); // { name: "Alice", age: 0, role: "user" }
console.log(createUser("Bob", 25)); // { name: "Bob", age: 25, role: "user" }
console.log(createUser("Charlie", 30, "admin")); // { name: "Charlie", age: 30, role: "admin" }

// Default with expressions
function calculateTotal(price, tax = price * 0.1, discount = 0) {
  return price + tax - discount;
}

console.log(calculateTotal(100)); // 110 (100 + 10 - 0)
console.log(calculateTotal(100, 15)); // 115 (100 + 15 - 0)
console.log(calculateTotal(100, 15, 10)); // 105 (100 + 15 - 10)

// Default with function calls
function getCurrentYear() {
  return new Date().getFullYear();
}

function createProfile(name, birthYear = getCurrentYear() - 18) {
  return {
    name,
    birthYear,
    age: getCurrentYear() - birthYear
  };
}

console.log(createProfile("Alice")); // Uses current year - 18

// Default with destructuring
function processUser({ name = "Anonymous", age = 0, email = "no-email" } = {}) {
  return `${name} (${age}) - ${email}`;
}

console.log(processUser()); // "Anonymous (0) - no-email"
console.log(processUser({ name: "Alice" })); // "Alice (0) - no-email"
console.log(processUser({ name: "Bob", age: 25, email: "bob@example.com" }));

// Array default with destructuring
function getFirstAndLast([first = "first", , last = "last"] = []) {
  return { first, last };
}

console.log(getFirstAndLast()); // { first: "first", last: "last" }
console.log(getFirstAndLast(["a", "b", "c"])); // { first: "a", last: "c" }

// ============================================
console.log("\n=== 2. OPTIONAL CHAINING (?.) ===");
// Safely access nested object properties (ES2020)

const user = {
  name: "Alice",
  address: {
    street: "123 Main St",
    city: "NYC"
  }
};

// Without optional chaining (old way)
const city1 = user.address && user.address.city;
console.log(city1); // "NYC"

// With optional chaining
const city2 = user.address?.city;
console.log(city2); // "NYC"

// Safe access to non-existent properties
const country = user.address?.country;
console.log(country); // undefined (no error!)

// Nested optional chaining
const user2 = {
  name: "Bob",
  profile: {
    contact: {
      email: "bob@example.com"
    }
  }
};

const email = user2.profile?.contact?.email;
console.log(email); // "bob@example.com"

const phone = user2.profile?.contact?.phone;
console.log(phone); // undefined (no error)

// ============================================
console.log("\n=== 3. OPTIONAL CHAINING WITH ARRAYS ===");

const users = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 }
];

// Safe array access
const firstUser = users?.[0];
console.log(firstUser); // { name: "Alice", age: 25 }

const thirdUser = users?.[2];
console.log(thirdUser); // undefined (no error)

// Safe method calls
const result = users?.map?.(user => user.name);
console.log(result); // ["Alice", "Bob"]

const empty = null;
const mapped = empty?.map?.(x => x); // undefined (no error)

// ============================================
console.log("\n=== 4. OPTIONAL CHAINING WITH FUNCTIONS ===");

const api = {
  getUser: function(id) {
    return { id, name: "Alice" };
  }
};

// Safe function calls
const user1 = api.getUser?.(1);
console.log(user1); // { id: 1, name: "Alice" }

const user2 = api.getUserById?.(1);
console.log(user2); // undefined (no error - method doesn't exist)

// With callbacks
const data = {
  process: function(callback) {
    return callback("processed");
  }
};

const result1 = data.process?.(value => `Result: ${value}`);
console.log(result1); // "Result: processed"

const result2 = data.processData?.(value => `Result: ${value}`);
console.log(result2); // undefined (no error)

// ============================================
console.log("\n=== 5. NULLISH COALESCING (??) ===");
// Returns right operand when left is null or undefined (ES2020)

// vs || operator
const value1 = null ?? "default";
console.log(value1); // "default"

const value2 = undefined ?? "default";
console.log(value2); // "default"

const value3 = 0 ?? "default";
console.log(value3); // 0 (not "default"!)

const value4 = "" ?? "default";
console.log(value4); // "" (not "default"!)

const value5 = false ?? "default";
console.log(value5); // false (not "default"!)

// || operator behavior
const value6 = 0 || "default";
console.log(value6); // "default" (0 is falsy)

// Practical example
function getUserName(user) {
  return user?.name ?? "Anonymous";
}

console.log(getUserName({ name: "Alice" })); // "Alice"
console.log(getUserName({ name: "" })); // "" (empty string, not "Anonymous")
console.log(getUserName({})); // "Anonymous"
console.log(getUserName(null)); // "Anonymous"

// ============================================
console.log("\n=== 6. COMBINING OPTIONAL CHAINING & NULLISH COALESCING ===");

const config = {
  api: {
    baseUrl: "https://api.example.com",
    timeout: 5000
  }
};

// Safe access with default
const baseUrl = config?.api?.baseUrl ?? "https://default.com";
console.log(baseUrl); // "https://api.example.com"

const retries = config?.api?.retries ?? 3;
console.log(retries); // 3 (default value)

// Real-world example
function fetchUserData(userId) {
  const user = {
    id: 1,
    profile: {
      name: "Alice",
      settings: {
        theme: "dark"
      }
    }
  };
  
  return {
    name: user?.profile?.name ?? "Unknown",
    theme: user?.profile?.settings?.theme ?? "light",
    email: user?.profile?.email ?? "no-email@example.com"
  };
}

console.log(fetchUserData(1));

// ============================================
console.log("\n=== 7. PRACTICAL EXAMPLES ===");

// API response handling
function processApiResponse(response) {
  const data = response?.data ?? {};
  const users = data?.users ?? [];
  const total = data?.total ?? 0;
  
  return {
    users: users.map(user => ({
      name: user?.name ?? "Unknown",
      email: user?.email ?? "no-email",
      age: user?.age ?? 0
    })),
    total
  };
}

const apiResponse1 = {
  data: {
    users: [
      { name: "Alice", email: "alice@example.com", age: 25 },
      { name: "Bob", email: "bob@example.com" }
    ],
    total: 2
  }
};

const apiResponse2 = null;

console.log(processApiResponse(apiResponse1));
console.log(processApiResponse(apiResponse2));

// Form validation
function validateForm(formData) {
  const errors = {};
  
  errors.name = !formData?.name?.trim() ? "Name is required" : null;
  errors.email = !formData?.email?.includes?.("@") ? "Invalid email" : null;
  errors.age = formData?.age < 18 ? "Must be 18 or older" : null;
  
  return {
    isValid: Object.values(errors).every(error => error === null),
    errors
  };
}

console.log(validateForm({ name: "Alice", email: "alice@example.com", age: 25 }));
console.log(validateForm({ name: "", email: "invalid", age: 15 }));

// Nested object updates
function updateUserSettings(user, settings) {
  return {
    ...user,
    settings: {
      ...user?.settings,
      ...settings,
      theme: settings?.theme ?? user?.settings?.theme ?? "light",
      notifications: settings?.notifications ?? user?.settings?.notifications ?? true
    }
  };
}

const user3 = {
  name: "Alice",
  settings: {
    theme: "dark"
  }
};

console.log(updateUserSettings(user3, { notifications: false }));

