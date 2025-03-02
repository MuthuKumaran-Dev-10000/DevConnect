const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.static("public")); //not necessacry to name it as public . foldername can be anything
// public is an most commonly used naming convention

app.get("/", (req, res) => {
    res.send("<h1>Welcome to Static Files Example</h1> <script src='/script.js'></script> <link rel='stylesheet' href='/styles.css'>");
});

app.listen(PORT, () => {
    console.log(`Static Server running at http://localhost:${PORT}`);
});
