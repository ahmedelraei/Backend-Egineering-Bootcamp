# Session 7: HTTP Module - Building a Server from Scratch

## Table of Contents

1. [HTTP Module Fundamentals](#http-module-fundamentals)
2. [Building a Server from Scratch](#building-a-server-from-scratch)
3. [Request/Response Lifecycle](#requestresponse-lifecycle)
4. [Routing Basics](#routing-basics)
5. [Handling Different HTTP Methods](#handling-different-http-methods)
6. [Query Parameters & Request Body Parsing](#query-parameters--request-body-parsing)
7. [Complete Practical Example](#complete-practical-example)

---

## HTTP Module Fundamentals

The `http` module is a **core Node.js module** that provides functionality to create HTTP servers and make HTTP requests. It's built into Node.js, so no installation is required.

### Key Components:

- **`http.createServer()`** - Creates an HTTP server
- **`http.request()`** - Makes HTTP requests (client-side)
- **Request Object** - Represents the incoming HTTP request
- **Response Object** - Represents the outgoing HTTP response

### Basic Server Structure:

```javascript
const http = require("http");

const server = http.createServer((req, res) => {
  // Handle requests here
});

server.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

## Building a Server from Scratch

When building a server from scratch (without frameworks like Express), you manually handle:

1. **Request parsing** - Extract URL, method, headers, body
2. **Route matching** - Determine which handler to use
3. **Response formatting** - Set headers, status codes, send data
4. **Error handling** - Handle invalid requests gracefully

### Server Lifecycle:

```javascript
const http = require("http");

// 1. Create server
const server = http.createServer(handleRequest);

// 2. Start listening
server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});

// 3. Handle errors
server.on("error", (error) => {
  console.error("Server error:", error);
});
```

---

## Request/Response Lifecycle

Every HTTP request follows this lifecycle:

```
1. Request arrives →
2. Parse URL & method →
3. Match route →
4. Process request (parse body if needed) →
5. Send response
```

### Understanding Request Object:

```javascript
function handleRequest(req, res) {
  // Request properties
  req.method; // 'GET', 'POST', 'PUT', 'DELETE', etc.
  req.url; // '/api/tasks?completed=true'
  req.headers; // Object containing all headers
  req.on("data"); // Stream for reading request body
  req.on("end"); // Fired when body is fully received
}
```

### Understanding Response Object:

```javascript
function handleRequest(req, res) {
  // Set status code and headers
  res.writeHead(200, {
    "Content-Type": "application/json",
  });

  // Send response
  res.end(JSON.stringify({ message: "Success" }));
}
```

### Complete Lifecycle Example:

```javascript
async function handleRequest(req, res) {
  // Step 1: Parse the URL
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname; // '/api/tasks'
  const queryParams = parsedUrl.query; // { completed: 'true' }
  const method = req.method; // 'GET'

  // Step 2: Route matching (see Routing section)

  // Step 3: Process request
  // - For GET: Use query params
  // - For POST/PUT: Parse body

  // Step 4: Send response
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ data: "response" }));
}
```

---

## Routing Basics

Routing is the process of matching incoming requests to the appropriate handler based on the URL path and HTTP method.

### Manual Route Matching:

```javascript
const url = require("url");

function handleRequest(req, res) {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // Route: GET /api/tasks
  if (pathname === "/api/tasks" && method === "GET") {
    // Handle get all tasks
    return;
  }

  // Route: GET /api/tasks/:id
  if (pathname.startsWith("/api/tasks/") && method === "GET") {
    const taskId = parseInt(pathname.split("/")[3]);
    // Handle get single task
    return;
  }

  // Route: POST /api/tasks
  if (pathname === "/api/tasks" && method === "POST") {
    // Handle create task
    return;
  }

  // 404 - Route not found
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Route not found" }));
}
```

### Route Parameters:

```javascript
// Extract ID from URL: /api/tasks/123
if (pathname.startsWith("/api/tasks/")) {
  const taskId = parseInt(pathname.split("/")[3]); // 123
  // Use taskId to find the specific resource
}
```

---

## Handling Different HTTP Methods

Each HTTP method has a specific purpose:

### GET - Retrieve Data

```javascript
if (pathname === "/api/tasks" && method === "GET") {
  // Return all tasks
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ data: tasks }));
}
```

### POST - Create New Resource

```javascript
if (pathname === "/api/tasks" && method === "POST") {
  // Parse request body (see next section)
  const body = await parseBody(req);

  // Create new task
  const newTask = {
    id: nextId++,
    title: body.title,
    completed: false,
  };

  tasks.push(newTask);

  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ data: newTask }));
}
```

### PUT - Update Existing Resource

```javascript
if (pathname.startsWith("/api/tasks/") && method === "PUT") {
  const taskId = parseInt(pathname.split("/")[3]);
  const body = await parseBody(req);

  // Find and update task
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex !== -1) {
    tasks[taskIndex] = { ...tasks[taskIndex], ...body };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ data: tasks[taskIndex] }));
  }
}
```

### DELETE - Remove Resource

```javascript
if (pathname.startsWith("/api/tasks/") && method === "DELETE") {
  const taskId = parseInt(pathname.split("/")[3]);

  // Find and remove task
  const taskIndex = tasks.findIndex((t) => t.id === taskId);
  if (taskIndex !== -1) {
    const deletedTask = tasks.splice(taskIndex, 1)[0];

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ data: deletedTask }));
  }
}
```

### HTTP Status Codes:

- **200** - OK (successful GET, PUT, DELETE)
- **201** - Created (successful POST)
- **400** - Bad Request (invalid input)
- **404** - Not Found (resource doesn't exist)
- **500** - Internal Server Error

---

## Query Parameters & Request Body Parsing

### Query Parameters

Query parameters are passed in the URL after `?`:

```
GET /api/tasks?completed=true&priority=high&search=learn
```

**Parsing Query Parameters:**

```javascript
const url = require("url");

const parsedUrl = url.parse(req.url, true);
const queryParams = parsedUrl.query;
// { completed: 'true', priority: 'high', search: 'learn' }

// Use query params for filtering
let filteredTasks = tasks;
if (queryParams.completed === "true") {
  filteredTasks = filteredTasks.filter((t) => t.completed === true);
}
if (queryParams.priority) {
  filteredTasks = filteredTasks.filter(
    (t) => t.priority === queryParams.priority
  );
}
```

### Request Body Parsing

For POST and PUT requests, data is sent in the request body. The body comes as a **stream**, so we need to collect chunks and parse them.

**Parsing JSON Body:**

```javascript
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";

    // Collect data chunks
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // When all data is received
    req.on("end", () => {
      try {
        const parsed = body ? JSON.parse(body) : {};
        resolve(parsed);
      } catch (error) {
        reject(new Error("Invalid JSON"));
      }
    });

    // Handle errors
    req.on("error", (error) => {
      reject(error);
    });
  });
}

// Usage in route handler
if (method === "POST") {
  const body = await parseBody(req);
  // body = { title: 'New Task', priority: 'high' }
}
```

**Why Promises?**

Request body parsing is **asynchronous** because:

- Data arrives in chunks (streaming)
- We need to wait for all chunks before parsing
- Using Promises allows us to use `async/await` for cleaner code

---

## Complete Practical Example

### Task Management API Server

Here's a complete, production-ready example that demonstrates all concepts:

```javascript
const http = require("http");
const url = require("url");

// In-memory data store (simulating database)
let tasks = [
  {
    id: 1,
    title: "Learn Node.js HTTP Module",
    completed: false,
    priority: "high",
  },
  { id: 2, title: "Build REST API", completed: false, priority: "medium" },
  { id: 3, title: "Deploy to production", completed: true, priority: "low" },
];
let nextId = 4;

// Helper: Parse request body
function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        const parsed = body ? JSON.parse(body) : {};
        resolve(parsed);
      } catch (error) {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", (error) => {
      reject(error);
    });
  });
}

// Helper: Send JSON response
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(JSON.stringify(data));
}

// Helper: Send error response
function sendError(res, statusCode, message) {
  sendJSON(res, statusCode, { error: message });
}

// Main request handler
async function handleRequest(req, res) {
  // Parse URL and extract components
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const queryParams = parsedUrl.query;
  const method = req.method;

  console.log(`[${new Date().toISOString()}] ${method} ${pathname}`);

  // ROUTING

  // GET /api/tasks - Get all tasks (with filtering)
  if (pathname === "/api/tasks" && method === "GET") {
    let filteredTasks = [...tasks];

    // Filter by query parameters
    if (queryParams.completed !== undefined) {
      const isCompleted = queryParams.completed === "true";
      filteredTasks = filteredTasks.filter((t) => t.completed === isCompleted);
    }

    if (queryParams.priority) {
      filteredTasks = filteredTasks.filter(
        (t) => t.priority === queryParams.priority
      );
    }

    if (queryParams.search) {
      const searchTerm = queryParams.search.toLowerCase();
      filteredTasks = filteredTasks.filter((t) =>
        t.title.toLowerCase().includes(searchTerm)
      );
    }

    sendJSON(res, 200, {
      success: true,
      count: filteredTasks.length,
      data: filteredTasks,
    });
    return;
  }

  // GET /api/tasks/:id - Get single task
  if (pathname.startsWith("/api/tasks/") && method === "GET") {
    const taskId = parseInt(pathname.split("/")[3]);

    if (isNaN(taskId)) {
      sendError(res, 400, "Invalid task ID");
      return;
    }

    const task = tasks.find((t) => t.id === taskId);

    if (!task) {
      sendError(res, 404, "Task not found");
      return;
    }

    sendJSON(res, 200, { success: true, data: task });
    return;
  }

  // POST /api/tasks - Create new task
  if (pathname === "/api/tasks" && method === "POST") {
    try {
      const body = await parseBody(req);

      if (!body.title || body.title.trim() === "") {
        sendError(res, 400, "Title is required");
        return;
      }

      const newTask = {
        id: nextId++,
        title: body.title.trim(),
        completed: body.completed || false,
        priority: body.priority || "medium",
        createdAt: new Date().toISOString(),
      };

      tasks.push(newTask);

      sendJSON(res, 201, {
        success: true,
        message: "Task created successfully",
        data: newTask,
      });
    } catch (error) {
      sendError(res, 400, error.message || "Invalid request body");
    }
    return;
  }

  // PUT /api/tasks/:id - Update task
  if (pathname.startsWith("/api/tasks/") && method === "PUT") {
    try {
      const taskId = parseInt(pathname.split("/")[3]);

      if (isNaN(taskId)) {
        sendError(res, 400, "Invalid task ID");
        return;
      }

      const taskIndex = tasks.findIndex((t) => t.id === taskId);

      if (taskIndex === -1) {
        sendError(res, 404, "Task not found");
        return;
      }

      const body = await parseBody(req);

      // Update only provided fields
      if (body.title !== undefined) {
        tasks[taskIndex].title = body.title.trim();
      }
      if (body.completed !== undefined) {
        tasks[taskIndex].completed = Boolean(body.completed);
      }
      if (body.priority !== undefined) {
        tasks[taskIndex].priority = body.priority;
      }
      tasks[taskIndex].updatedAt = new Date().toISOString();

      sendJSON(res, 200, {
        success: true,
        message: "Task updated successfully",
        data: tasks[taskIndex],
      });
    } catch (error) {
      sendError(res, 400, error.message || "Invalid request body");
    }
    return;
  }

  // DELETE /api/tasks/:id - Delete task
  if (pathname.startsWith("/api/tasks/") && method === "DELETE") {
    const taskId = parseInt(pathname.split("/")[3]);

    if (isNaN(taskId)) {
      sendError(res, 400, "Invalid task ID");
      return;
    }

    const taskIndex = tasks.findIndex((t) => t.id === taskId);

    if (taskIndex === -1) {
      sendError(res, 404, "Task not found");
      return;
    }

    const deletedTask = tasks.splice(taskIndex, 1)[0];

    sendJSON(res, 200, {
      success: true,
      message: "Task deleted successfully",
      data: deletedTask,
    });
    return;
  }

  // 404 - Route not found
  sendError(res, 404, "Route not found");
}

// Create and start server
const PORT = process.env.PORT || 3000;
const HOST = "localhost";

const server = http.createServer(handleRequest);

server.listen(PORT, HOST, () => {
  console.log(`\n🚀 Server running at: http://${HOST}:${PORT}`);
  console.log("📋 Available endpoints:");
  console.log("   GET    /api/tasks          - Get all tasks");
  console.log("   GET    /api/tasks/:id      - Get single task");
  console.log("   POST   /api/tasks          - Create task");
  console.log("   PUT    /api/tasks/:id      - Update task");
  console.log("   DELETE /api/tasks/:id      - Delete task\n");
});

// Error handling
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(`❌ Port ${PORT} is already in use.`);
  } else {
    console.error("❌ Server error:", error);
  }
  process.exit(1);
});
```

---

## Testing the Server

### 1. Start the Server

```bash
node "Session 07/1-http-server-practical-example.js"
```

### 2. Test with cURL

**Get all tasks:**

```bash
curl http://localhost:3000/api/tasks
```

**Get with query parameters:**

```bash
curl "http://localhost:3000/api/tasks?completed=false&priority=high"
curl "http://localhost:3000/api/tasks?search=learn"
```

**Create a new task:**

```bash
curl -X POST http://localhost:3000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title": "New Task", "priority": "high"}'
```

**Update a task:**

```bash
curl -X PUT http://localhost:3000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'
```

**Delete a task:**

```bash
curl -X DELETE http://localhost:3000/api/tasks/1
```

### 3. Test with Browser

Open: `http://localhost:3000` to see API documentation

---

## Key Takeaways

1. **HTTP Module** - Core Node.js module for building servers
2. **Server Creation** - Use `http.createServer()` with a request handler
3. **Request Lifecycle** - Parse URL → Match route → Process → Respond
4. **Routing** - Manual route matching using pathname and method
5. **HTTP Methods** - GET (read), POST (create), PUT (update), DELETE (remove)
6. **Query Parameters** - Parse with `url.parse(req.url, true)`
7. **Request Body** - Stream-based, collect chunks and parse JSON
8. **Response Formatting** - Set headers, status codes, and send JSON

---

## Next Steps

- Add authentication/authorization
- Connect to a real database
- Add input validation
- Implement pagination
- Add rate limiting
- Use Express.js framework (simplifies routing)

---

## Summary

This session covered building a complete HTTP server from scratch using only Node.js core modules. You learned how to:

- ✅ Create servers with `http.createServer()`
- ✅ Handle the request/response lifecycle
- ✅ Implement routing manually
- ✅ Support multiple HTTP methods
- ✅ Parse query parameters and request bodies
- ✅ Build a complete REST API

The practical example demonstrates all these concepts in a real-world Task Management API that you can extend and customize!
