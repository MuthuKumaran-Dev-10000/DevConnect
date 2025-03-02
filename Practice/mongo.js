const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3002;

mongoose.connect("mongodb://localhost:27017/mydatabase", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

const UserSchema = new mongoose.Schema({
    name: String,
    email: String
});

const User = mongoose.model("User", UserSchema);

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send(`
        <h2>Register User</h2>
        <form action="/submit" method="POST">
            <input type="text" name="name" placeholder="Enter Name" required />
            <input type="email" name="email" placeholder="Enter Email" required />
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post("/submit", async (req, res) => {
    try {
        const { name, email } = req.body;
        const newUser = new User({ name, email });
        await newUser.save();
        res.send(`<h2>User Registered Successfully</h2> <p>Name: ${name}, Email: ${email}</p>`);
    } catch (error) {
        res.status(500).send("Error saving user");
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
