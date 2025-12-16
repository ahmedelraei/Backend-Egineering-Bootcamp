// ============================================
// MODULES: COMMONJS & ES MODULES
// ============================================

console.log("=== 1. WHAT ARE MODULES? ===");

// Modules allow you to:
// - Organize code into separate files
// - Reuse code across different files
// - Encapsulate functionality
// - Avoid global namespace pollution

console.log(`
Benefits of Modules:
- Code organization
- Reusability
- Encapsulation
- Dependency management
- Easier testing
- Better maintainability
`);

// ============================================
console.log("\n=== 2. COMMONJS MODULES ===");

// CommonJS is the default module system in Node.js
// Uses require() and module.exports

// Example: Exporting from a module
// In math.js:
// module.exports = {
//   add: (a, b) => a + b,
//   subtract: (a, b) => a - b
// };

// Example: Importing a module
// const math = require('./math');
// console.log(math.add(2, 3));

console.log(`
CommonJS Syntax:
- Export: module.exports = { ... }
- Import: const module = require('./module')
- Default: module.exports = value
- Named: module.exports = { name1, name2 }
`);

// ============================================
console.log("\n=== 3. COMMONJS EXPORT PATTERNS ===");

// Pattern 1: Exporting an object
const mathUtils = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => a / b,
};

// In a real file, you would do:
// module.exports = mathUtils;

// Pattern 2: Exporting individual functions
function greet(name) {
  return `Hello, ${name}!`;
}

function farewell(name) {
  return `Goodbye, ${name}!`;
}

// In a real file:
// module.exports = { greet, farewell };

// Pattern 3: Exporting a single function
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price, 0);
}

// In a real file:
// module.exports = calculateTotal;

// Pattern 4: Exporting a class
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getInfo() {
    return `${this.name} (${this.email})`;
  }
}

// In a real file:
// module.exports = User;

// Pattern 5: Multiple exports
const PI = 3.14159;
const E = 2.71828;

// In a real file:
// module.exports = { PI, E };

console.log(`
CommonJS Export Patterns:
1. Object export: module.exports = { ... }
2. Named exports: module.exports = { func1, func2 }
3. Single export: module.exports = function
4. Class export: module.exports = Class
5. Multiple exports: module.exports = { var1, var2 }
`);

// ============================================
console.log("\n=== 4. COMMONJS IMPORT PATTERNS ===");

// Pattern 1: Import entire module
// const math = require('./math');
// math.add(2, 3);

// Pattern 2: Destructuring imports
// const { add, subtract } = require('./math');
// add(2, 3);

// Pattern 3: Import with different name
// const mathOperations = require('./math');
// mathOperations.add(2, 3);

// Pattern 4: Import Node.js built-in module
// const fs = require('fs');
// const path = require('path');

// Pattern 5: Import npm package
// const express = require('express');
// const axios = require('axios');

console.log(`
CommonJS Import Patterns:
1. Full import: const module = require('./module')
2. Destructuring: const { func1, func2 } = require('./module')
3. Rename: const alias = require('./module')
4. Built-in: const fs = require('fs')
5. Package: const express = require('express')
`);

// ============================================
console.log("\n=== 5. ES MODULES (ESM) ===");

// ES Modules is the standard JavaScript module system
// Uses import and export keywords
// Available in Node.js 12+ (with .mjs extension or "type": "module" in package.json)

// Example: Exporting from a module
// In math.mjs:
// export function add(a, b) { return a + b; }
// export function subtract(a, b) { return a - b; }
// export default function multiply(a, b) { return a * b; }

// Example: Importing a module
// import multiply, { add, subtract } from './math.mjs';
// console.log(add(2, 3));

console.log(`
ES Modules Syntax:
- Named export: export function name() { ... }
- Default export: export default value
- Named import: import { name1, name2 } from './module'
- Default import: import name from './module'
- Mixed: import default, { named } from './module'
`);

// ============================================
console.log("\n=== 6. ES MODULES EXPORT PATTERNS ===");

// Pattern 1: Named exports
// export function add(a, b) { return a + b; }
// export function subtract(a, b) { return a - b; }

// Pattern 2: Export after declaration
// function multiply(a, b) { return a * b; }
// function divide(a, b) { return a / b; }
// export { multiply, divide };

// Pattern 3: Default export
// export default function calculateTotal(items) {
//   return items.reduce((sum, item) => sum + item.price, 0);
// }

// Pattern 4: Export class
// export class User {
//   constructor(name, email) {
//     this.name = name;
//     this.email = email;
//   }
// }

// Pattern 5: Export constants
// export const PI = 3.14159;
// export const E = 2.71828;

// Pattern 6: Mixed exports
// export function add(a, b) { return a + b; }
// export default function multiply(a, b) { return a * b; }

console.log(`
ES Modules Export Patterns:
1. Named: export function name() { ... }
2. Export list: export { name1, name2 }
3. Default: export default value
4. Class: export class Name { ... }
5. Constants: export const NAME = value
6. Mixed: export default + export named
`);

// ============================================
console.log("\n=== 7. ES MODULES IMPORT PATTERNS ===");

// Pattern 1: Named imports
// import { add, subtract } from './math.mjs';

// Pattern 2: Default import
// import multiply from './math.mjs';

// Pattern 3: Mixed imports
// import multiply, { add, subtract } from './math.mjs';

// Pattern 4: Import with alias
// import { add as sum, subtract as diff } from './math.mjs';

// Pattern 5: Import all
// import * as math from './math.mjs';
// math.add(2, 3);

// Pattern 6: Import with rename default
// import { default as multiply } from './math.mjs';

console.log(`
ES Modules Import Patterns:
1. Named: import { name1, name2 } from './module'
2. Default: import name from './module'
3. Mixed: import default, { named } from './module'
4. Alias: import { name as alias } from './module'
5. Namespace: import * as namespace from './module'
6. Rename default: import { default as name } from './module'
`);

// ============================================
console.log("\n=== 8. ENABLING ES MODULES IN NODE.JS ===");

// Method 1: Use .mjs extension
// File: math.mjs
// export function add(a, b) { return a + b; }
// File: app.mjs
// import { add } from './math.mjs';

// Method 2: Add "type": "module" to package.json
// {
//   "type": "module",
//   ...
// }
// Then use .js files with import/export

// Method 3: Use --input-type=module flag
// node --input-type=module app.js

console.log(`
Enabling ES Modules:
1. Use .mjs extension for files
2. Add "type": "module" to package.json
3. Use --input-type=module flag

Note: Once ES modules enabled, require() won't work
`);

// ============================================
console.log("\n=== 9. COMMONJS vs ES MODULES ===");

console.log(`
CommonJS:
- Default in Node.js
- Synchronous loading
- Dynamic imports (require can be conditional)
- module.exports / require()
- Works everywhere in Node.js
- File extension: .js

ES Modules:
- Standard JavaScript
- Asynchronous loading
- Static imports (must be top-level)
- export / import
- Requires configuration (.mjs or "type": "module")
- Better tree-shaking
- Better for bundlers
`);

// ============================================
console.log("\n=== 10. MIXING COMMONJS AND ES MODULES ===");

// Generally, avoid mixing, but sometimes necessary

// CommonJS importing ES Module (using dynamic import)
// const math = await import('./math.mjs');
// console.log(math.add(2, 3));

// ES Module importing CommonJS
// import math from './math.js'; // if math.js uses module.exports
// console.log(math.add(2, 3));

console.log(`
Mixing Modules:
- CommonJS → ES Module: Use dynamic import()
- ES Module → CommonJS: Use default import
- Generally avoid mixing when possible
- Prefer one module system per project
`);

// ============================================
console.log("\n=== 11. PRACTICAL EXAMPLES ===");

// Example 1: Utility module (CommonJS)
// File: utils.js
// function capitalize(str) {
//   return str.charAt(0).toUpperCase() + str.slice(1);
// }
// function reverse(str) {
//   return str.split('').reverse().join('');
// }
// module.exports = { capitalize, reverse };

// Usage:
// const { capitalize, reverse } = require('./utils');
// console.log(capitalize('hello')); // Hello
// console.log(reverse('hello')); // olleh

// Example 2: Configuration module (CommonJS)
// File: config.js
// const config = {
//   port: process.env.PORT || 3000,
//   dbUrl: process.env.DB_URL || 'mongodb://localhost:27017',
//   apiKey: process.env.API_KEY || 'default-key'
// };
// module.exports = config;

// Usage:
// const config = require('./config');
// console.log(config.port);

// Example 3: Class module (ES Modules)
// File: User.mjs
// export class User {
//   constructor(name, email) {
//     this.name = name;
//     this.email = email;
//   }
//   getInfo() {
//     return `${this.name} (${this.email})`;
//   }
// }

// Usage:
// import User from './User.mjs';
// const user = new User('Ahmed', 'ahmed@example.com');
// console.log(user.getInfo());

console.log(`
Practical Examples:
- Utility functions module
- Configuration module
- Class/Model modules
- Service modules
- Route modules
`);

// ============================================
console.log("\n=== 12. MODULE RESOLUTION ===");

// Node.js resolves modules in this order:
// 1. Core modules (fs, path, etc.)
// 2. node_modules/ (npm packages)
// 3. Local files (./ or ../)

console.log(`
Module Resolution Order:
1. Core modules: require('fs')
2. node_modules: require('express')
3. Local files: require('./module') or require('../module')

File Extensions:
- .js (CommonJS or ES Module based on package.json)
- .mjs (ES Module)
- .cjs (CommonJS)
- .json (JSON file)
- .node (Native addon)
`);

// ============================================
console.log("\n=== 13. BEST PRACTICES ===");

console.log(`
1. Use consistent module system (CommonJS or ES Modules)
2. Organize modules by functionality
3. Export only what's needed
4. Use descriptive module names
5. Keep modules focused (single responsibility)
6. Document exported functions/classes
7. Use index.js for re-exports
8. Avoid circular dependencies
9. Use relative paths for local modules
10. Prefer ES Modules for new projects (if possible)
`);

// ============================================
console.log("\n=== 14. SUMMARY ===");
console.log(`
Modules:
- Organize code into separate files
- Enable code reuse and encapsulation
- Two main systems: CommonJS and ES Modules

CommonJS:
- Default in Node.js
- module.exports / require()
- Synchronous loading
- Dynamic imports

ES Modules:
- Standard JavaScript
- export / import
- Asynchronous loading
- Static imports
- Requires .mjs or "type": "module"

Key Differences:
- CommonJS: require() / module.exports
- ES Modules: import / export
- CommonJS: Synchronous
- ES Modules: Asynchronous
- CommonJS: Dynamic
- ES Modules: Static

Best Practice:
- Choose one module system per project
- Use ES Modules for new projects when possible
- Use CommonJS for Node.js-specific code
`);
