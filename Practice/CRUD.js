const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3003;

mongoose.connect("mongodb://localhost:27017/crud_demo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Connection Error:", err));

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: Number,
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
    res.send(`
        <h2>User CRUD Operations</h2>
        <form action="/create" method="POST">
            <input type="text" name="name" placeholder="Enter Name" required />
            <input type="email" name="email" placeholder="Enter Email" required />
            <input type="number" name="age" placeholder="Enter Age" required />
            <button type="submit">Create User</button>
        </form>
        <h3>API Endpoints:</h3>
        <ul>
            <li><a href="/users">View All Users (GET /users)</a></li>
            <li>Update User: PUT /update/:id</li>
            <li>Delete User: DELETE /delete/:id</li>
        </ul>
    `);
});

app.post("/create", async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const newUser = new User({ name, email, age });
        await newUser.save();
        res.send(`<h2>User Created Successfully</h2> <p>Name: ${name}, Email: ${email}, Age: ${age}</p>`);
    } catch (error) {
        res.status(500).send("Error creating user");
    }
});

app.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
    }
});

app.get("/user/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).send("User Not Found");
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Error fetching user" });
    }
});

app.put("/update/:id", async (req, res) => {
    try {
        const { name, email, age } = req.body;
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, email, age }, { new: true });
        if (!updatedUser) return res.status(404).send("User Not Found");
        res.json({ message: "User Updated", updatedUser });
    } catch (error) {
        res.status(500).json({ error: "Error updating user" });
    }
});

app.delete("/delete/:id", async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).send("User Not Found");
        res.json({ message: "User Deleted", deletedUser });
    } catch (error) {
        res.status(500).json({ error: "Error deleting user" });
    }
});

app.get("/users/older-than-25", async (req, res) => {
    try {
        const olderUsers = await User.aggregate([
            { $match: { age: { $gt: 25 } } },
            { $project: { name: 1, email: 1, age: 1 } }
        ]);
        res.json(olderUsers);
    } catch (error) {
        res.status(500).json({ error: "Error fetching older users" });
    }
});


app.listen(PORT, () => {
    console.log(`MongoDB CRUD Server running at http://localhost:${PORT}/`);
});
// Sample Data:
// {
//     "_id": {
//       "$oid": "67c344b437f5cf9dd4406288"
//     },
//     "name": "Muthukumaran S",
//     "email": "muthukumarandeveloper@gmail.com",
//     "age": 19,
//     "createdAt": {
//       "$date": "2025-03-01T17:32:36.073Z"
//     },
//     "__v": 0
//   }