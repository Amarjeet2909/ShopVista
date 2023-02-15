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

    // calling getJWTToken fun of userModel.js for creating user Token
    const token = user.getJWTToken();

    res.status(201).json({
        success: true,
        token,
    });

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

    // Generating the token for the user since user has been find in DB
    const token = user.getJWTToken();

    res.status(200).json({
        success: true,
        token,
    });
});