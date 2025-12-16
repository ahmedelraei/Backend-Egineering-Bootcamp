// ============================================
// NPM & PACKAGE.JSON BASICS
// ============================================

console.log("=== 1. WHAT IS NPM? ===");

// NPM (Node Package Manager) is:
// - The default package manager for Node.js
// - A registry of reusable JavaScript packages
// - A command-line tool to install and manage packages
// - Comes bundled with Node.js installation

console.log(`
NPM provides:
- Package installation (npm install)
- Package management (npm update, npm uninstall)
- Script running (npm run)
- Package publishing (npm publish)
- Dependency management
`);

// ============================================
console.log("\n=== 2. PACKAGE.JSON OVERVIEW ===");

// package.json is a manifest file that contains:
// - Project metadata (name, version, description)
// - Dependencies (packages your project needs)
// - Scripts (commands you can run)
// - Configuration settings

console.log(`
Example package.json structure:
{
  "name": "my-project",
  "version": "1.0.0",
  "description": "My awesome project",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "test": "echo 'No tests'"
  },
  "dependencies": {
    "express": "^4.18.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.0"
  }
}
`);

// ============================================
console.log("\n=== 3. CREATING PACKAGE.JSON ===");

// Method 1: Manual creation
// Create a file named package.json in your project root

// Method 2: Using npm init (interactive)
// Run: npm init
// This will ask you questions and create package.json

// Method 3: Using npm init -y (quick start)
// Run: npm init -y
// Creates package.json with default values

console.log(`
To create package.json:
1. npm init          - Interactive mode
2. npm init -y       - Quick mode (defaults)
3. Manual creation   - Create file yourself
`);

// ============================================
console.log("\n=== 4. PACKAGE.JSON FIELDS EXPLAINED ===");

// name: Package name (required)
// - Must be lowercase
// - Can contain hyphens and underscores
// - Must be unique on npm registry

// version: Semantic versioning (required)
// - Format: MAJOR.MINOR.PATCH (e.g., 1.0.0)
// - MAJOR: Breaking changes
// - MINOR: New features (backward compatible)
// - PATCH: Bug fixes

// description: Brief description of your package

// main: Entry point of your package
// - Default: index.js
// - Used when someone requires your package

// scripts: Custom commands you can run with npm run
// - "start": "node index.js"
// - "test": "jest"
// - "dev": "nodemon index.js"

// dependencies: Packages needed in production
// - Installed with: npm install <package>
// - Saved automatically to dependencies

// devDependencies: Packages needed only for development
// - Installed with: npm install <package> --save-dev
// - Not included in production builds

// keywords: Array of keywords for npm search

// author: Package author information

// license: License type (MIT, ISC, etc.)

console.log(`
Key Fields:
- name: Package identifier
- version: Semantic version (1.0.0)
- main: Entry point file
- scripts: Custom npm commands
- dependencies: Production packages
- devDependencies: Development packages
`);

// ============================================
console.log("\n=== 5. INSTALLING PACKAGES ===");

// Install a package (saves to dependencies)
// npm install express
// npm install express --save (same as above)

// Install a dev dependency
// npm install nodemon --save-dev
// npm install nodemon -D (shortcut)

// Install a specific version
// npm install express@4.18.0

// Install latest version
// npm install express@latest

// Install from GitHub
// npm install username/repo

// Install globally
// npm install -g nodemon
// npm install -g typescript

console.log(`
Common npm install commands:
- npm install <package>        - Install and save to dependencies
- npm install <package> -D     - Install as dev dependency
- npm install <package>@version - Install specific version
- npm install -g <package>     - Install globally
- npm install                  - Install all dependencies from package.json
`);

// ============================================
console.log("\n=== 6. PACKAGE VERSIONING ===");

// Semantic Versioning (SemVer): MAJOR.MINOR.PATCH

// Version ranges in package.json:
// "express": "^4.18.0"  - Caret: Allows MINOR and PATCH updates
// "express": "~4.18.0"  - Tilde: Allows only PATCH updates
// "express": "4.18.0"   - Exact: Only this version
// "express": "*"         - Any version (not recommended)
// "express": ">=4.18.0" - Greater than or equal

console.log(`
Version Ranges:
- ^4.18.0  → Allows 4.18.0 to <5.0.0 (MINOR & PATCH updates)
- ~4.18.0  → Allows 4.18.0 to <4.19.0 (PATCH updates only)
- 4.18.0   → Exact version only
- *        → Any version (dangerous!)
- >=4.18.0 → Greater than or equal
`);

// ============================================
console.log("\n=== 7. NPM SCRIPTS ===");

// Scripts are custom commands defined in package.json
// Run with: npm run <script-name>
// Some scripts can be run without "run": npm start, npm test

console.log(`
Example scripts in package.json:
{
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "build": "webpack --mode production",
    "lint": "eslint ."
  }
}

Run scripts:
- npm start      - Runs "start" script
- npm test       - Runs "test" script
- npm run dev    - Runs "dev" script
- npm run build  - Runs "build" script
`);

// ============================================
console.log("\n=== 8. NPM COMMANDS REFERENCE ===");

console.log(`
Package Management:
- npm install <package>        - Install package
- npm install                  - Install all dependencies
- npm uninstall <package>      - Remove package
- npm update <package>         - Update package
- npm update                   - Update all packages
- npm list                     - List installed packages
- npm list --depth=0           - List top-level packages only

Package Information:
- npm view <package>           - View package info
- npm view <package> versions  - View all versions
- npm search <keyword>         - Search packages
- npm info <package>           - Detailed package info

Scripts:
- npm run <script>             - Run a script
- npm start                    - Run start script
- npm test                     - Run test script

Other:
- npm init                     - Create package.json
- npm init -y                  - Create package.json with defaults
- npm cache clean              - Clear npm cache
- npm outdated                 - Check for outdated packages
- npm audit                    - Security audit
- npm audit fix                - Fix security vulnerabilities
`);

// ============================================
console.log("\n=== 9. NODE_MODULES & PACKAGE-LOCK.JSON ===");

// node_modules/: Directory containing installed packages
// - Created automatically when you run npm install
// - Contains all dependencies and their dependencies
// - Should be added to .gitignore (don't commit this folder)

// package-lock.json: Lock file for exact dependency versions
// - Created automatically by npm
// - Ensures consistent installs across environments
// - Should be committed to version control
// - Locks exact versions of all dependencies

console.log(`
Important Files/Directories:

node_modules/:
- Contains all installed packages
- Created by npm install
- Should be in .gitignore
- Can be regenerated with npm install

package-lock.json:
- Locks exact dependency versions
- Ensures consistent installs
- Should be committed to git
- Automatically updated by npm
`);

// ============================================
console.log("\n=== 10. PRACTICAL EXAMPLE ===");

// Example: Setting up a Node.js project

console.log(`
Step-by-step project setup:

1. Create project directory:
   mkdir my-project
   cd my-project

2. Initialize package.json:
   npm init -y

3. Install dependencies:
   npm install express
   npm install nodemon --save-dev

4. Create .gitignore:
   node_modules/
   .env
   *.log

5. Create index.js:
   const express = require('express');
   const app = express();
   // ... your code

6. Add scripts to package.json:
   "scripts": {
     "start": "node index.js",
     "dev": "nodemon index.js"
   }

7. Run your project:
   npm run dev
`);

// ============================================
console.log("\n=== 11. BEST PRACTICES ===");

console.log(`
1. Always initialize package.json before installing packages
2. Use semantic versioning (SemVer)
3. Use ^ for dependencies (allows minor updates)
4. Use exact versions for critical packages if needed
5. Separate devDependencies from dependencies
6. Commit package-lock.json to version control
7. Add node_modules/ to .gitignore
8. Use meaningful script names
9. Keep package.json clean and organized
10. Regularly update dependencies (npm outdated)
11. Run security audits (npm audit)
12. Document your project in README.md
`);

// ============================================
console.log("\n=== 12. SUMMARY ===");
console.log(`
NPM & Package.json:
- NPM is Node Package Manager
- package.json is project manifest file
- Manages dependencies and scripts
- Uses semantic versioning

Key Commands:
- npm init              - Create package.json
- npm install <pkg>     - Install package
- npm install <pkg> -D  - Install dev dependency
- npm run <script>      - Run script
- npm list              - List packages

Important Files:
- package.json          - Project configuration
- package-lock.json     - Dependency lock file
- node_modules/         - Installed packages (gitignore)

Best Practices:
- Use semantic versioning
- Separate dev dependencies
- Commit package-lock.json
- Ignore node_modules/
- Regular security audits
`);


