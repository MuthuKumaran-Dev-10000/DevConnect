const express = require("express");
const url = require("url");

const app = express();
const PORT = 3000;

app.get("/parse", (req, res) => {
    const sampleUrl = "https://example.com:8080/product?id=123&name=laptop#reviews";
    const parsedUrl = url.parse(sampleUrl, true); 

    res.json({
        href: parsedUrl.href,              // Full URL
        protocol: parsedUrl.protocol,      // Protocol (http, https)
        slashes: parsedUrl.slashes,        // Slashes after protocol (true/false)
        auth: parsedUrl.auth,              // Authentication credentials (if any)
        host: parsedUrl.host,              // Host (hostname + port)
        hostname: parsedUrl.hostname,      // Hostname (without port)
        port: parsedUrl.port,              // Port number
        pathname: parsedUrl.pathname,      // Path (e.g., "/product")
        search: parsedUrl.search,          // Query string (e.g., "?id=123&name=laptop")
        query: parsedUrl.query,            // Query object { id: '123', name: 'laptop' }
        hash: parsedUrl.hash,              // Fragment/hash (e.g., "#reviews")
        path: parsedUrl.path,              // Path + search (e.g., "/product?id=123&name=laptop")
        searchParams: parsedUrl.query,     // Alternative for handling query parameters
        method: req.method,                // Request method (GET, POST, etc.)
        headers: req.headers,              // Request headers
        url: req.url,                      // Requested URL
        baseUrl: req.baseUrl,              // Base URL (if any middleware is used)
        originalUrl: req.originalUrl,      // Full original request URL
        ip: req.ip                         // Client's IP address
    });

    console.log("Parsed URL details sent to client.");
});

app.listen(PORT, () => {
    console.log(`URL Module running at http://localhost:${PORT}`);
});
