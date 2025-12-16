// ============================================
// NODE.JS CORE MODULES
// ============================================

console.log("=== 1. WHAT ARE CORE MODULES? ===");

// Core modules are built-in Node.js modules
// They come with Node.js installation
// No need to install via npm
// Examples: fs, path, events, process, buffer, http, etc.

console.log(`
Core Modules:
- Built into Node.js
- No installation required
- High performance
- Well-tested and stable
- Part of Node.js standard library
`);

// ============================================
console.log("\n=== 2. FS MODULE (FILE SYSTEM) ===");

const fs = require("fs");
const path = require("path");

// Reading files (asynchronous)
console.log("--- Reading File (Async) ---");
fs.readFile(__filename, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
  } else {
    console.log("File read successfully (first 100 chars):", data.substring(0, 100));
  }
});

// Reading files (synchronous) - blocks event loop
console.log("\n--- Reading File (Sync) ---");
try {
  const data = fs.readFileSync(__filename, "utf8");
  console.log("File read synchronously (first 100 chars):", data.substring(0, 100));
} catch (err) {
  console.error("Error:", err);
}

// Writing files (asynchronous)
console.log("\n--- Writing File (Async) ---");
const content = "Hello, Node.js!";
fs.writeFile("temp.txt", content, "utf8", (err) => {
  if (err) {
    console.error("Error writing file:", err);
  } else {
    console.log("File written successfully");
    // Clean up
    fs.unlink("temp.txt", (err) => {
      if (err) console.error("Error deleting file:", err);
    });
  }
});

// Checking if file exists
fs.access(__filename, fs.constants.F_OK, (err) => {
  if (err) {
    console.log("File does not exist");
  } else {
    console.log("File exists");
  }
});

// Getting file stats
fs.stat(__filename, (err, stats) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("\n--- File Stats ---");
    console.log("Size:", stats.size, "bytes");
    console.log("Is file:", stats.isFile());
    console.log("Is directory:", stats.isDirectory());
    console.log("Created:", stats.birthtime);
    console.log("Modified:", stats.mtime);
  }
});

console.log(`
FS Module Methods:
- fs.readFile() / fs.readFileSync() - Read file
- fs.writeFile() / fs.writeFileSync() - Write file
- fs.appendFile() - Append to file
- fs.unlink() - Delete file
- fs.mkdir() - Create directory
- fs.rmdir() - Remove directory
- fs.readdir() - Read directory
- fs.stat() - Get file stats
- fs.access() - Check file access
- fs.rename() - Rename file
`);

// ============================================
console.log("\n=== 3. PATH MODULE ===");

// Path module provides utilities for working with file paths
// Works across different operating systems

const filePath = "/Users/ahmedelraei/Documents/file.txt";
const relativePath = "./folder/file.txt";

console.log("--- Path Operations ---");
console.log("Original path:", filePath);
console.log("Directory name:", path.dirname(filePath));
console.log("File name:", path.basename(filePath));
console.log("File extension:", path.extname(filePath));
console.log("File name without extension:", path.basename(filePath, path.extname(filePath)));

// Joining paths (handles slashes correctly)
const joinedPath = path.join("/Users", "ahmedelraei", "Documents", "file.txt");
console.log("Joined path:", joinedPath);

// Resolving paths (absolute)
const resolvedPath = path.resolve("folder", "file.txt");
console.log("Resolved path:", resolvedPath);

// Normalizing paths (removes redundant separators)
const normalizedPath = path.normalize("/Users//ahmedelraei/../Documents/file.txt");
console.log("Normalized path:", normalizedPath);

// Parsing paths
const parsed = path.parse(filePath);
console.log("\n--- Parsed Path ---");
console.log("Root:", parsed.root);
console.log("Dir:", parsed.dir);
console.log("Base:", parsed.base);
console.log("Name:", parsed.name);
console.log("Ext:", parsed.ext);

// Formatting paths
const formatted = path.format({
  dir: "/Users/ahmedelraei/Documents",
  base: "file.txt",
});
console.log("Formatted path:", formatted);

console.log(`
Path Module Methods:
- path.join() - Join path segments
- path.resolve() - Resolve absolute path
- path.dirname() - Get directory name
- path.basename() - Get file name
- path.extname() - Get file extension
- path.parse() - Parse path into object
- path.format() - Format object into path
- path.normalize() - Normalize path
- path.isAbsolute() - Check if absolute
- path.relative() - Get relative path
`);

// ============================================
console.log("\n=== 4. EVENTS MODULE ===");

const EventEmitter = require("events");

// Create custom event emitter
class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// Listening to events
myEmitter.on("greet", (name) => {
  console.log(`Hello, ${name}!`);
});

myEmitter.on("greet", (name) => {
  console.log(`Welcome, ${name}!`);
});

// Emitting events
console.log("--- Event Emitter ---");
myEmitter.emit("greet", "Ahmed");

// Once listener (fires only once)
myEmitter.once("once-event", () => {
  console.log("This fires only once");
});

myEmitter.emit("once-event");
myEmitter.emit("once-event"); // Won't fire again

// Event with multiple arguments
myEmitter.on("data", (data1, data2, data3) => {
  console.log(`Data received: ${data1}, ${data2}, ${data3}`);
});

myEmitter.emit("data", "value1", "value2", "value3");

// Error handling
myEmitter.on("error", (err) => {
  console.error("Error event:", err.message);
});

// myEmitter.emit("error", new Error("Something went wrong"));

// Getting listeners count
console.log("\nListeners for 'greet':", myEmitter.listenerCount("greet"));

// Removing listeners
const callback = () => console.log("This will be removed");
myEmitter.on("test", callback);
myEmitter.removeListener("test", callback);
myEmitter.emit("test"); // Won't fire

console.log(`
Events Module:
- EventEmitter class for event-driven programming
- .on() - Listen to events
- .once() - Listen once
- .emit() - Emit events
- .removeListener() - Remove listener
- .removeAllListeners() - Remove all listeners
- .listenerCount() - Count listeners
- Built-in 'error' event for error handling
`);

// ============================================
console.log("\n=== 5. PROCESS MODULE ===");

// Process module provides information about Node.js process
// No need to require, it's global

console.log("--- Process Information ---");
console.log("Process ID:", process.pid);
console.log("Node version:", process.version);
console.log("Platform:", process.platform);
console.log("Architecture:", process.arch);
console.log("Current working directory:", process.cwd());
console.log("Node executable path:", process.execPath);

// Environment variables
console.log("\n--- Environment Variables ---");
console.log("NODE_ENV:", process.env.NODE_ENV || "not set");
console.log("HOME:", process.env.HOME || process.env.USERPROFILE);

// Command line arguments
console.log("\n--- Command Line Arguments ---");
console.log("Arguments:", process.argv);

// Process events
process.on("exit", (code) => {
  console.log(`Process exiting with code: ${code}`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception:", err);
  process.exit(1);
});

// Changing directory
// process.chdir('/path/to/directory');

// Memory usage
const usage = process.memoryUsage();
console.log("\n--- Memory Usage ---");
console.log("RSS:", Math.round(usage.rss / 1024 / 1024), "MB");
console.log("Heap Total:", Math.round(usage.heapTotal / 1024 / 1024), "MB");
console.log("Heap Used:", Math.round(usage.heapUsed / 1024 / 1024), "MB");
console.log("External:", Math.round(usage.external / 1024 / 1024), "MB");

// Exiting process
// process.exit(0); // Success
// process.exit(1); // Error

console.log(`
Process Module Properties:
- process.pid - Process ID
- process.version - Node.js version
- process.platform - Operating system
- process.arch - Architecture
- process.cwd() - Current directory
- process.env - Environment variables
- process.argv - Command line arguments
- process.memoryUsage() - Memory usage
- process.exit() - Exit process
- process.on() - Process events
`);

// ============================================
console.log("\n=== 6. BUFFER MODULE ===");

// Buffer is a global class for handling binary data
// Used for working with files, network protocols, etc.

// Creating buffers
console.log("--- Buffer Creation ---");
const buf1 = Buffer.from("Hello");
console.log("Buffer from string:", buf1);
console.log("Buffer as string:", buf1.toString());
console.log("Buffer length:", buf1.length);

const buf2 = Buffer.from([72, 101, 108, 108, 111]);
console.log("Buffer from array:", buf2.toString());

const buf3 = Buffer.alloc(10); // Creates buffer of 10 bytes (filled with zeros)
console.log("Allocated buffer:", buf3);
buf3.write("Hello");
console.log("After writing:", buf3.toString());

const buf4 = Buffer.allocUnsafe(10); // Faster but may contain old data
buf4.fill(0); // Fill with zeros for safety
buf4.write("Hello");
console.log("Unsafe allocated:", buf4.toString());

// Buffer operations
console.log("\n--- Buffer Operations ---");
const buf5 = Buffer.from("Hello");
const buf6 = Buffer.from(" World");
const combined = Buffer.concat([buf5, buf6]);
console.log("Combined:", combined.toString());

// Comparing buffers
const buf7 = Buffer.from("Hello");
const buf8 = Buffer.from("Hello");
const buf9 = Buffer.from("World");
console.log("Equal buffers:", buf7.equals(buf8));
console.log("Different buffers:", buf7.equals(buf9));

// Buffer comparison
console.log("Compare result:", buf7.compare(buf9)); // -1, 0, or 1

// Copying buffers
const source = Buffer.from("Hello");
const target = Buffer.alloc(10);
source.copy(target);
console.log("Copied buffer:", target.toString());

// Slicing buffers
const original = Buffer.from("Hello World");
const slice = original.slice(0, 5);
console.log("Original:", original.toString());
console.log("Slice:", slice.toString());

// Buffer encoding
console.log("\n--- Buffer Encoding ---");
const text = "Hello, 世界";
const utf8Buf = Buffer.from(text, "utf8");
console.log("UTF-8 length:", utf8Buf.length);
console.log("String length:", text.length);

console.log(`
Buffer Module:
- Buffer.from() - Create from string/array
- Buffer.alloc() - Allocate new buffer
- Buffer.allocUnsafe() - Fast allocation
- Buffer.concat() - Concatenate buffers
- buffer.toString() - Convert to string
- buffer.equals() - Compare buffers
- buffer.copy() - Copy buffer
- buffer.slice() - Slice buffer
- buffer.length - Buffer size
- buffer.write() - Write to buffer
`);

// ============================================
console.log("\n=== 7. OTHER CORE MODULES ===");

console.log(`
Other Important Core Modules:

http / https:
- Create HTTP/HTTPS servers and clients
- const http = require('http');

url:
- Parse and format URLs
- const url = require('url');

querystring:
- Parse and stringify query strings
- const querystring = require('querystring');

util:
- Utility functions
- const util = require('util');

stream:
- Handle streaming data
- const stream = require('stream');

crypto:
- Cryptographic functionality
- const crypto = require('crypto');

os:
- Operating system utilities
- const os = require('os');

zlib:
- Compression/decompression
- const zlib = require('zlib');
`);

// ============================================
console.log("\n=== 8. PRACTICAL EXAMPLES ===");

// Example 1: Reading and processing a file
console.log("--- File Processing Example ---");
const fileContent = "Line 1\nLine 2\nLine 3";
fs.writeFileSync("example.txt", fileContent);

const lines = fs.readFileSync("example.txt", "utf8").split("\n");
console.log("File lines:", lines);

fs.unlinkSync("example.txt");

// Example 2: Path manipulation
console.log("\n--- Path Manipulation Example ---");
const projectPath = path.join(process.cwd(), "src", "index.js");
console.log("Project path:", projectPath);
console.log("File name:", path.basename(projectPath));
console.log("Directory:", path.dirname(projectPath));

// Example 3: Event-driven counter
console.log("\n--- Event-Driven Counter Example ---");
class Counter extends EventEmitter {
  constructor() {
    super();
    this.count = 0;
  }

  increment() {
    this.count++;
    this.emit("increment", this.count);
    if (this.count === 5) {
      this.emit("limit", this.count);
    }
  }
}

const counter = new Counter();
counter.on("increment", (count) => {
  console.log(`Count: ${count}`);
});
counter.on("limit", () => {
  console.log("Limit reached!");
});

for (let i = 0; i < 5; i++) {
  counter.increment();
}

// ============================================
console.log("\n=== 9. BEST PRACTICES ===");

console.log(`
1. Use async methods (non-blocking) when possible
2. Handle errors properly in callbacks
3. Use path.join() instead of string concatenation
4. Clean up temporary files
5. Use Buffer.alloc() instead of allocUnsafe() unless needed
6. Handle process events (exit, uncaughtException)
7. Use environment variables for configuration
8. Be careful with synchronous methods (block event loop)
9. Use streams for large files
10. Understand buffer encoding (utf8, ascii, etc.)
`);

// ============================================
console.log("\n=== 10. SUMMARY ===");
console.log(`
Core Modules:
- Built into Node.js
- No installation required
- High performance

Key Modules:
- fs: File system operations
- path: Path manipulation
- events: Event-driven programming
- process: Process information
- buffer: Binary data handling

FS Module:
- readFile, writeFile, readdir, stat, etc.
- Async (non-blocking) and sync versions
- Handle errors in callbacks

Path Module:
- Cross-platform path handling
- join, resolve, dirname, basename, etc.

Events Module:
- EventEmitter for custom events
- on, emit, once, removeListener

Process Module:
- Process information and control
- Environment variables, arguments, memory

Buffer Module:
- Binary data handling
- from, alloc, concat, toString, etc.
`);


