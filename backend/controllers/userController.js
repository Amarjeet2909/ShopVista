const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

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

    // calling sendToken fun of jwtToken.js for token creation and saving in cookie
    sendToken(user, 201, res);

});

// Login function
exports.loginUser = catchAsyncErrors(async (req,res,next) => {
    const { email, password } = req.body;

    // Checking if user has given both password & Email or not
    if(!email || !password)
    {
        return next(new ErrorHandler("Please Enter Email & Password", 400)); // 400: Bad Request
    }

    // Finding user in Database using findOne fun of MongoDB
    const user = await User.findOne({ email }).select("+password");

    if(!user)
    {
        return next("Invalid email or password", 401); // 401: Unauthorized Access
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched)
    {
        return next("Invalid email or password", 401);
    }

    // calling sendToken fun of jwtToken.js for token creation and saving in cookie since user has been find in DB
    sendToken(user, 200, res);
});

// Log Out function
exports.logout = catchAsyncErrors(async (req,res,next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out Successfully!",
    });
});