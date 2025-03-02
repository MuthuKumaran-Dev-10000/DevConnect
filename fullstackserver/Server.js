const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/mernDB/students")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

const studentSchema = new mongoose.Schema({
  name: String,
  regno: String,
  department: String,
});

const Student = mongoose.model("Student", studentSchema);

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    console.log("📜 All Students Fetched:", students);
    res.json(students);
  } catch (error) {
    console.error("❌ Error Fetching Students:", error);
    res.status(500).json({ error: "Error Fetching Students" });
  }
});

app.post("/students", async (req, res) => {
  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    console.log("✅ Student Added:", newStudent);
    res.json({ message: "Student Added", student: newStudent });
  } catch (error) {
    console.error("❌ Error Adding Student:", error);
    res.status(500).json({ error: "Error Adding Student" });
  }
});

app.put("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) {
      console.error("⚠ Student Not Found for Update:", req.params.id);
      return res.status(404).json({ error: "Student Not Found" });
    }
    console.log("🔄 Student Updated:", student);
    res.json({ message: "Student Updated", student });
  } catch (error) {
    console.error("❌ Error Updating Student:", error);
    res.status(500).json({ error: "Error Updating Student" });
  }
});

app.delete("/students/:id", async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      console.error("⚠ Student Not Found for Deletion:", req.params.id);
      return res.status(404).json({ error: "Student Not Found" });
    }
    console.log("🗑 Student Deleted:", student);
    res.json({ message: "Student Deleted" });
  } catch (error) {
    console.error("❌ Error Deleting Student:", error);
    res.status(500).json({ error: "Error Deleting Student" });
  }
});

const logStudents = async () => {
  try {
    const students = await Student.find();
    console.log("📜 Current Student List:", students);
  } catch (error) {
    console.error("❌ Error Fetching Students for Logging:", error);
  }
};

setInterval(logStudents, 10000);

app.listen(5000, () => console.log("🚀 Server running on port 5000"));