const express = require("express");
const app = express();

app.use(express.json())

// Importing the routes
const product = require("./routes/productRoute");

app.use("/api/v1",product);

// exporting app.js to import it in server.js file
module.exports = app;