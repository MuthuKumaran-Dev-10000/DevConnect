const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/students", auth, async (req, res) => {
  res.json({ message: "List of students" });
});


router.get("/assignments", auth, async (req, res) => {
  res.json({ message: "Review student assignments" });
});

module.exports = router;
