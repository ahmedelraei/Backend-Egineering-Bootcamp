const http = require("http");
const url = require("url");

const users = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Doe" },
  { id: 3, name: "John Smith" },
  { id: 4, name: "Jane Smith" },
];

async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      resolve(body);
    });
    req.on("error", (error) => {
      reject(error);
    });
  });
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  if (pathname === "/api/users" && method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(users));
  } else if (pathname.startsWith("/api/users/") && method === "GET") {
    const id = Number(pathname.split("/")[3]);
    const user = users.find((user) => user.id === id);
    if (!user) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "User not found" }));
      return;
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  } else if (pathname === "/api/users" && method === "POST") {
    const body = JSON.parse(await parseBody(req));
    const newUser = { id: users.length + 1, name: body.name };
    users.push(newUser);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newUser));
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
