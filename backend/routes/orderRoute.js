const express = require("express");
const { newOrder, getSingleUser, myOrders } = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// making new route for new order
router.route("/order/new").post(isAuthenticatedUser, newOrder);

// making route for accessing single order details
router.route("/order/:id").get(isAuthenticatedUser, getSingleUser);

// making route for accessing myOrders of Logged in users
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

module.exports = router;