const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 3001;

app.get("/try", async (req, res) => {
    try {
        const { url } = req.query; 
        if (!url) {
            return res.status(400).json({ error: "URL parameter is required" });
        }

        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Error fetching data", details: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/try?url=https://jsonplaceholder.typicode.com/posts/1`);
});

// http://localhost:3001/try?url=https://jsonplaceholder.typicode.com/posts/1
