const express = require("express");
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateUserRole, deleteUser } = require("../controllers/userController");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
// calling registerUser fun which is in "userController.js" file when user click on register
router.route("/register").post(registerUser);

// Calling the route for login the user
router.route("/login").post(loginUser);

// Calling the route for logging out 
router.route("/logout").get(logout);

// Calling the route for forgot password
router.route("/password/forgot").post(forgotPassword);

// Calling reset Password route
router.route("/password/reset/:token").put(resetPassword); 

// Calling route for getting user details
router.route("/me").get(isAuthenticatedUser, getUserDetails);

// Route for updating user password
router.route("/password/update").put( isAuthenticatedUser, updatePassword );

// Route for updating user Profile
router.route("/me/update").put( isAuthenticatedUser, updateProfile );

// Route for getting all user Information (Admin)
router.route("/admin/users").get( isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

// Route for getting single user Information (Admin)
router.route("/admin/user/:id").get( isAuthenticatedUser, authorizeRoles("admin"), getSingleUser);

// Route for Updating user role (Admin)
router.route("/admin/user/:id").put( isAuthenticatedUser, authorizeRoles("admin"), updateUserRole);

// Route for deleting the user (Admin)
router.route("/admin/user/:id").delete( isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

module.exports = router;