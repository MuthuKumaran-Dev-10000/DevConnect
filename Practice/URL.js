const express = require("express");
const url = require("url");

const app = express();
const PORT = 3000;

app.get("/parse", (req, res) => {
    const sampleUrl = "https://example.com/product?id=123&name=laptop";
    const parsedUrl = url.parse(sampleUrl, true); 

    res.json({
        protocol: parsedUrl.protocol,
        host: parsedUrl.host,
        pathname: parsedUrl.pathname,
        queryParams: parsedUrl.query
    });
    console.log(res);
});

app.listen(PORT, () => {
    console.log(`URL Module running at http://localhost:${PORT}`);
});
