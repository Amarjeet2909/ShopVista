const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
app.use(express.json());

// Importing the routes
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

app.use("/api/v1",product);
app.use("/api/v1",user);

// Accessing Middleware folder for handling error
app.use(errorMiddleware);

// exporting app.js to import it in server.js file
module.exports = app;