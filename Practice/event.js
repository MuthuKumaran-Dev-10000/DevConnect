const express = require("express");
const EventEmitter = require("events");

const app = express();
const PORT = 3001;

const eventEmitter = new EventEmitter();

eventEmitter.on("userRegistered", (username) => {
    console.log(`User Registered: ${username}`);
});

app.post("/register/:username", (req, res) => {
    const { username } = req.params;

    
    eventEmitter.emit("userRegistered", username);

    res.json({ message: `Welcome, ${username}!` });
});


app.listen(PORT, () => {
    console.log(`Events Module running at http://localhost:${PORT}`);
});
