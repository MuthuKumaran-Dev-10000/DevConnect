const http = require("http");

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");

    if (req.url === "/") {
        res.writeHead(200);
        res.end(JSON.stringify({ message: "Welcome to Node.js HTTP Server!" }));
    } 
    else if (req.url === "/about") {
        res.writeHead(200);
        res.end(JSON.stringify({ message: "This is a basic HTTP server using Node.js." }));
    } 
    else if (req.url === "/api/data") {
        res.writeHead(200);
        res.end(JSON.stringify({ users: [{ name: "Alice" }, { name: "Bob" }] }));
    } 
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Route not found" }));
    }
});


const PORT = 3000;
server.listen(PORT, () => {
    console.log(`HTTP Server running at http://localhost:${PORT}`);
});
