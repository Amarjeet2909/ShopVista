const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const router = express.Router();

// calling registerUser fun which is in "userController.js" file when user click on register
router.route("/register").post(registerUser);

// Calling the route for login the user
router.route("/login").post(loginUser);

module.exports = router;