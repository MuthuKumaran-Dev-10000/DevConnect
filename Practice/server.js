const express = require("express");
const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home", { title: "Home Page", message: "Welcome to EJS SSR!" });
});

app.get("/about", (req, res) => {
    res.render("about", { title: "About Us", message: "Learn more about us!" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
