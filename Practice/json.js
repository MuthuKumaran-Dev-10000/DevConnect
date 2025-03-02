const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3002;

app.get("/users", (req, res) => {
    fs.readFile("users.json", "utf8", (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ error: "Failed to read file" });
        }
        res.json(JSON.parse(data));
    });
});

app.listen(PORT, () => {
    console.log(`JSON Server running at http://localhost:${PORT}/users`);
});
