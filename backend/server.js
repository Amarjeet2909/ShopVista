const app = require("./app");

const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

// Handling Uncaught Exception
process.on("uncaughtException",(err) =>{
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
});

// Config
dotenv.config({path:"backend/config/config.env"});

// connecting to the database
connectDatabase();

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`)
});

/**
 * Unhandled Promise Rejection: It's an event
 * working of below fun: whenever Unhandled Promise Rejection occur then it will pass error message to console and it
 * will close the server and exit the process
 */
process.on("unhandledRejection", (err) => {
    console.log(`Error:${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(() =>{
        process.exit(1);
    });
});