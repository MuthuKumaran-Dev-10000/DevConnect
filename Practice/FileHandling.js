const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/write/:filename", (req, res) => {
    const { filename } = req.params;
    const { content } = req.body;
    const filePath = path.join(__dirname, filename);

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            return res.status(500).json({ message: "Error writing file", error: err });
        }
        res.json({ message: `File '${filename}' written successfully` });
    });
});

app.get("/read/:filename", (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, filename);

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            return res.status(500).json({ message: "Error reading file", error: err });
        }
        res.json({ message: `Content of '${filename}'`, content: data });
    });
});

app.put("/update/:filename", (req, res) => {
    const { filename } = req.params;
    const { newContent } = req.body;
    console.log(req.body);
    const filePath = path.join(__dirname, filename);

    fs.appendFile(filePath, `\n${newContent}`, (err) => {
        if (err) {
            return res.status(500).json({ message: "Error updating file", error: err });
        }
        res.json({ message: `File '${filename}' updated successfully` });
    });
});

app.delete("/delete/:filename", (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, filename);

    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(500).json({ message: "Error deleting file", error: err });
        }
        res.json({ message: `File '${filename}' deleted successfully` });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Using Postman:
// Write :
// Set the postman url as http://localhost:3000/write and set the method as post and in the body set the raw text as below
// {"content": "Hello, MERN Stack!"}
 
//Similarly others 

                            // or
// Write:
// curl -X POST http://localhost:3000/write -H "Content-Type: application/json" -d '{"content": "Hello, MERN Stack!"}'

//Read:
// curl -X GET http://localhost:3000/read

// Update:
// curl -X PUT http://localhost:3000/update -H "Content-Type: application/json" -d '{"newContent": "Welcome to Express.js!"}'

// delete:
// curl -X DELETE http://localhost:3000/delete
