const express = require("express");
const { registerUser } = require("../controllers/userController");
const router = express.Router();

// calling registerUser fun which is in "userController.js" file when user click on register
router.route("/register").post(registerUser);

module.exports = router;