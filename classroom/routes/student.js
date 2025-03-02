const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");


router.get("/attendance", auth, async (req, res) => {
  res.json({ message: "Attendance records for student" });
});

router.get("/assignments", auth, async (req, res) => {
  res.json({ message: "Student assignments" });
});

module.exports = router;
