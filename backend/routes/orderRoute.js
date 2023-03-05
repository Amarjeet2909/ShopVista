const express = require("express");
const { newOrder, getSingleUser, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// making new route for new order
router.route("/order/new").post(isAuthenticatedUser, newOrder);

// making route for accessing single order details
router.route("/order/:id").get(isAuthenticatedUser, getSingleUser);

// making route for accessing myOrders of Logged in users
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

// making route to get all orders --Admin
router.route("/admin/orders").get( isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);

// making route to update the Order status
router.route("/admin/order/:id").put( isAuthenticatedUser, authorizeRoles("admin"), updateOrder);

// making route to delete the order
router.route("/admin/order/:id").delete( isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;