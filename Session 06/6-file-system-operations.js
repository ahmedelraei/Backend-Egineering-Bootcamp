// ============================================
// WORKING WITH FILE SYSTEM (READ/WRITE)
// ============================================

const fs = require("fs");
const path = require("path");

console.log("=== 1. READING FILES ===");

// Asynchronous read (non-blocking)
console.log("--- Async Read ---");
fs.readFile(__filename, "utf8", (err, data) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log("File read successfully (first 200 chars):");
  console.log(data.substring(0, 200));
});

// Synchronous read (blocking)
console.log("\n--- Sync Read ---");
try {
  const data = fs.readFileSync(__filename, "utf8");
  console.log("File read synchronously (first 200 chars):");
  console.log(data.substring(0, 200));
} catch (err) {
  console.error("Error:", err);
}

// Reading with options
console.log("\n--- Read with Options ---");
fs.readFile(__filename, { encoding: "utf8", flag: "r" }, (err, data) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log("File read with options");
});

// ============================================
console.log("\n=== 2. WRITING FILES ===");

// Asynchronous write
console.log("--- Async Write ---");
const content = "Hello, Node.js!\nThis is a test file.";
fs.writeFile("test.txt", content, "utf8", (err) => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }
  console.log("File written successfully");

  // Read it back
  fs.readFile("test.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading:", err);
      return;
    }
    console.log("Content read back:", data);
  });
});

// Synchronous write
console.log("\n--- Sync Write ---");
try {
  fs.writeFileSync("test-sync.txt", "Synchronous write test", "utf8");
  console.log("File written synchronously");
  const data = fs.readFileSync("test-sync.txt", "utf8");
  console.log("Content:", data);
} catch (err) {
  console.error("Error:", err);
}

// Writing JSON
console.log("\n--- Writing JSON ---");
const jsonData = {
  name: "Ahmed",
  age: 30,
  city: "Cairo",
};

fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), "utf8", (err) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log("JSON file written");

  // Read JSON back
  fs.readFile("data.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error:", err);
      return;
    }
    const parsed = JSON.parse(data);
    console.log("JSON read back:", parsed);
  });
});

// ============================================
console.log("\n=== 3. APPENDING TO FILES ===");

// Append to file (async)
console.log("--- Append File ---");
fs.appendFile("test.txt", "\nAppended line", "utf8", (err) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log("Content appended");

  // Read to verify
  fs.readFile("test.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error:", err);
      return;
    }
    console.log("File after append:", data);
  });
});

// Append synchronously
fs.appendFileSync("test-sync.txt", "\nAppended line sync", "utf8");
console.log("Content appended synchronously");

// ============================================
console.log("\n=== 4. FILE OPERATIONS ===");

// Check if file exists
console.log("--- File Existence Check ---");
fs.access("test.txt", fs.constants.F_OK, (err) => {
  if (err) {
    console.log("File does not exist");
  } else {
    console.log("File exists");
  }
});

// Get file stats
console.log("\n--- File Stats ---");
fs.stat("test.txt", (err, stats) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log("File size:", stats.size, "bytes");
  console.log("Is file:", stats.isFile());
  console.log("Is directory:", stats.isDirectory());
  console.log("Created:", stats.birthtime);
  console.log("Modified:", stats.mtime);
  console.log("Accessed:", stats.atime);
});

// Rename file
console.log("\n--- Rename File ---");
fs.rename("test-sync.txt", "renamed-test.txt", (err) => {
  if (err) {
    console.error("Error renaming:", err);
    return;
  }
  console.log("File renamed successfully");
});

// Copy file
console.log("\n--- Copy File ---");
fs.copyFile("test.txt", "test-copy.txt", (err) => {
  if (err) {
    console.error("Error copying:", err);
    return;
  }
  console.log("File copied successfully");
});

// Delete file
console.log("\n--- Delete File ---");
setTimeout(() => {
  fs.unlink("renamed-test.txt", (err) => {
    if (err) {
      console.error("Error deleting:", err);
      return;
    }
    console.log("File deleted successfully");
  });
}, 1000);

// ============================================
console.log("\n=== 5. DIRECTORY OPERATIONS ===");

// Create directory
console.log("--- Create Directory ---");
fs.mkdir("test-dir", (err) => {
  if (err && err.code !== "EEXIST") {
    console.error("Error creating directory:", err);
    return;
  }
  console.log("Directory created (or already exists)");

  // Create nested directories
  fs.mkdir("test-dir/nested/deep", { recursive: true }, (err) => {
    if (err) {
      console.error("Error:", err);
      return;
    }
    console.log("Nested directories created");
  });
});

// Read directory
console.log("\n--- Read Directory ---");
fs.readdir(".", (err, files) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  console.log("Files in current directory:");
  files.forEach((file) => {
    console.log(`  - ${file}`);
  });
});

// Read directory with file types
console.log("\n--- Read Directory with Stats ---");
fs.readdir(".", { withFileTypes: true }, (err, entries) => {
  if (err) {
    console.error("Error:", err);
    return;
  }
  entries.forEach((entry) => {
    const type = entry.isDirectory() ? "DIR" : "FILE";
    console.log(`  ${type}: ${entry.name}`);
  });
});

// Remove directory
console.log("\n--- Remove Directory ---");
setTimeout(() => {
  fs.rmdir("test-dir", { recursive: true }, (err) => {
    if (err) {
      console.error("Error removing directory:", err);
      return;
    }
    console.log("Directory removed");
  });
}, 2000);

// ============================================
console.log("\n=== 6. STREAMS FOR LARGE FILES ===");

// Reading large files with streams
console.log("--- Read Stream ---");
const readStream = fs.createReadStream(__filename, { encoding: "utf8" });

let streamData = "";
readStream.on("data", (chunk) => {
  streamData += chunk;
  // Process chunk by chunk instead of loading entire file
});

readStream.on("end", () => {
  console.log("Stream read complete");
  console.log("Total characters read:", streamData.length);
});

readStream.on("error", (err) => {
  console.error("Stream error:", err);
});

// Writing with streams
console.log("\n--- Write Stream ---");
const writeStream = fs.createWriteStream("stream-output.txt");

writeStream.write("Line 1\n");
writeStream.write("Line 2\n");
writeStream.write("Line 3\n");
writeStream.end();

writeStream.on("finish", () => {
  console.log("Stream write complete");
});

writeStream.on("error", (err) => {
  console.error("Stream error:", err);
});

// Piping streams
console.log("\n--- Pipe Streams ---");
const sourceStream = fs.createReadStream(__filename);
const destStream = fs.createWriteStream("piped-output.txt");

sourceStream.pipe(destStream);

destStream.on("finish", () => {
  console.log("Piping complete");
  // Clean up
  fs.unlink("piped-output.txt", () => {});
});

// ============================================
console.log("\n=== 7. PROMISE-BASED FILE OPERATIONS ===");

// Using fs.promises for async/await
const fsPromises = require("fs").promises;

async function fileOperations() {
  try {
    // Write file
    await fsPromises.writeFile("promise-test.txt", "Promise-based write", "utf8");
    console.log("File written with promises");

    // Read file
    const data = await fsPromises.readFile("promise-test.txt", "utf8");
    console.log("File read:", data);

    // Append file
    await fsPromises.appendFile("promise-test.txt", "\nAppended with promises", "utf8");
    console.log("File appended");

    // Read again
    const updatedData = await fsPromises.readFile("promise-test.txt", "utf8");
    console.log("Updated content:", updatedData);

    // Get stats
    const stats = await fsPromises.stat("promise-test.txt");
    console.log("File size:", stats.size, "bytes");

    // Clean up
    await fsPromises.unlink("promise-test.txt");
    console.log("File deleted");
  } catch (err) {
    console.error("Error:", err);
  }
}

fileOperations();

// ============================================
console.log("\n=== 8. WORKING WITH PATHS ===");

// Combining path operations with file operations
const filePath = path.join(__dirname, "path-test.txt");
console.log("--- Path Operations ---");
console.log("Current directory:", __dirname);
console.log("File path:", filePath);
console.log("Directory name:", path.dirname(filePath));
console.log("File name:", path.basename(filePath));
console.log("Extension:", path.extname(filePath));

// Write to path
fs.writeFileSync(filePath, "Path test file", "utf8");
console.log("File written to:", filePath);

// Check if path exists
fs.access(filePath, fs.constants.F_OK, (err) => {
  if (err) {
    console.log("Path does not exist");
  } else {
    console.log("Path exists");
    // Clean up
    fs.unlink(filePath, () => {});
  }
});

// ============================================
console.log("\n=== 9. PRACTICAL EXAMPLES ===");

// Example 1: Reading configuration file
function readConfig(filename) {
  try {
    const data = fs.readFileSync(filename, "utf8");
    return JSON.parse(data);
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("Config file not found, using defaults");
      return { port: 3000, host: "localhost" };
    }
    throw err;
  }
}

// Example 2: Logging to file
function logToFile(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  fs.appendFile("app.log", logMessage, "utf8", (err) => {
    if (err) {
      console.error("Error logging:", err);
    }
  });
}

logToFile("Application started");
logToFile("User logged in");

// Example 3: Backup file
function backupFile(sourcePath) {
  const backupPath = `${sourcePath}.backup`;
  fs.copyFile(sourcePath, backupPath, (err) => {
    if (err) {
      console.error("Backup failed:", err);
      return;
    }
    console.log(`Backup created: ${backupPath}`);
  });
}

// Example 4: Read and process file line by line
function processFileLineByLine(filename) {
  const readStream = fs.createReadStream(filename, { encoding: "utf8" });
  let buffer = "";

  readStream.on("data", (chunk) => {
    buffer += chunk;
    const lines = buffer.split("\n");
    buffer = lines.pop(); // Keep incomplete line

    lines.forEach((line) => {
      console.log("Processing line:", line.trim());
    });
  });

  readStream.on("end", () => {
    if (buffer) {
      console.log("Processing last line:", buffer.trim());
    }
  });
}

// ============================================
console.log("\n=== 10. ERROR HANDLING PATTERNS ===");

// Pattern 1: Check file exists before reading
function safeReadFile(filename) {
  return new Promise((resolve, reject) => {
    fs.access(filename, fs.constants.F_OK, (err) => {
      if (err) {
        reject(new Error(`File not found: ${filename}`));
        return;
      }

      fs.readFile(filename, "utf8", (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      });
    });
  });
}

// Pattern 2: Create directory if it doesn't exist
function ensureDirectory(dirPath) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dirPath, { recursive: true }, (err) => {
      if (err && err.code !== "EEXIST") {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

// Pattern 3: Safe file write (write to temp, then rename)
function safeWriteFile(filename, data) {
  const tempFile = `${filename}.tmp`;
  return new Promise((resolve, reject) => {
    fs.writeFile(tempFile, data, "utf8", (err) => {
      if (err) {
        reject(err);
        return;
      }
      fs.rename(tempFile, filename, (err) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  });
}

// ============================================
console.log("\n=== 11. BEST PRACTICES ===");

console.log(`
1. Use async methods (non-blocking) for better performance
2. Always handle errors in callbacks
3. Use streams for large files
4. Use path.join() instead of string concatenation
5. Check file existence before operations when needed
6. Clean up temporary files
7. Use fs.promises for async/await syntax
8. Handle file permissions properly
9. Use recursive option for nested directories
10. Consider using streams for memory efficiency
11. Validate file paths before operations
12. Use appropriate file encodings (utf8 for text)
13. Close streams properly
14. Handle concurrent file operations carefully
15. Use try-catch with sync methods
`);

// ============================================
console.log("\n=== 12. CLEANUP ===");

// Clean up test files
setTimeout(() => {
  const filesToDelete = [
    "test.txt",
    "test-copy.txt",
    "data.json",
    "stream-output.txt",
    "promise-test.txt",
  ];

  filesToDelete.forEach((file) => {
    fs.unlink(file, (err) => {
      if (err && err.code !== "ENOENT") {
        console.error(`Error deleting ${file}:`, err);
      }
    });
  });

  console.log("Cleanup completed");
}, 3000);

// ============================================
console.log("\n=== 13. SUMMARY ===");
console.log(`
File System Operations:
- Reading: readFile, readFileSync, createReadStream
- Writing: writeFile, writeFileSync, createWriteStream
- Appending: appendFile, appendFileSync
- Operations: rename, copyFile, unlink, stat, access

Directory Operations:
- Create: mkdir (with recursive option)
- Read: readdir (with withFileTypes option)
- Remove: rmdir (with recursive option)

Streams:
- Use for large files
- Memory efficient
- Process data in chunks
- Pipe streams together

Best Practices:
- Use async methods when possible
- Handle errors properly
- Use streams for large files
- Use path.join() for paths
- Clean up temporary files
- Use fs.promises for async/await
`);


