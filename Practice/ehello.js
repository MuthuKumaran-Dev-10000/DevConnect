const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, World from Express!');
});

app.listen(3000, () => console.log(`http://localhost:3000`));
