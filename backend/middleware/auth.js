const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// It's a function for Authentication of the user for accessing a particular resourse in which this method will invoked
exports.isAuthenticatedUser = catchAsyncErrors(async (req,res,next) => {
    // Accessing token from cookies
    const { token } = req.cookies;

    // If token can't found that means user is not log in   
    if(! token)
    {
        return next(new ErrorHandler("Please login to access this resource", 401));
    }

    //Decoding data using JSON web token by jwt.verify() method parameters taken is token that we got from cookie and secret jwt key defined in config.js
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // finding user in database using decoded data
    req.user = await User.findById(decodedData.id);

    next();
});

/* Function for authorizing the role of user I.e: user is just a user or an Admin 
   ...roles is an Array
   req.user.role gives user or admin
*/
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(
            new ErrorHandler(
                `Role: ${req.user.role} is not allowed to access this resource`,
                403
                )
            );
        }
        next();
    };
};