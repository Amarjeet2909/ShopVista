const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// It's a function for Authentication of the user for accessing a particular resourse in which this method will invoked
exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next) => {
    const { token } = req.cookies;

    if(! token)
    {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData.id);

    next();
});