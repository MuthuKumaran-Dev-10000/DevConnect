const express = require("express");
const multer = require("multer");
const router = express.Router();
const ocrSpaceApi = require("ocr-space-api");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const result = await ocrSpaceApi.parseImageFromLocalFile(req.file.path, { apiKey: process.env.OCR_API_KEY });
    res.json({ text: result.parsedText });
  } catch (error) {
    res.status(500).send("OCR failed");
  }
});

module.exports = router;
