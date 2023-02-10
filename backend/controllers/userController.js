const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");

// Function for registering a User
exports.registerUser = catchAsyncErrors(async(req,res,next) => {
    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is sample id",
            url: "this is sample url",
        },
    });

    res.status(201).json({
        success: true,
        user,
    });

});