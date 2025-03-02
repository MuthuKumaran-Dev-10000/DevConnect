require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: { type: String, enum: ["student", "teacher"] }
});
const User = mongoose.model("User", userSchema);

app.post("/register", async (req, res) => {
    try {
      console.log("Received data:", req.body); // Log request data
  
      const { name, email, password, role } = req.body;
  
      if (!name || !email || !password || !role) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ name, email, password: hashedPassword, role });
      
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
  
    } catch (error) {
      console.error("Error in /register:", error); // Log error to the backend console
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  

// Login
app.post("/login", async (req, res) => {
    try {
      console.log("Login attempt:", req.body); // Log incoming request
  
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const user = await User.findOne({ email });
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
      console.log(process.env.JWT_SECRET);
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
      res.json({ token, role: user.role });
  
    } catch (error) {
      console.error("Error in /login:", error); // Log error to backend
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  
app.listen(5000, () => console.log(`https://127.0.0.1:5000`));
