const express = require("express");

// create an express instance
const app = express();

// start listening for clients
app.listen(3000, () => console.log("listening at port 3000"));

// point to a folder containing html, css and js
app.use(express.static("public"));
