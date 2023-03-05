const express = require("express");
const { newOrder } = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// making new route for new order
router.route("/order/new").post(isAuthenticatedUser, newOrder);

module.exports = router;