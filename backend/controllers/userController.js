const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

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

/* Log Out function
   This fun respond to cookie and modify the expires to Date.now() So user Instantly looged out
*/
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

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req,res,next) => {
    // Finding user by email
    const user = await User.findOne({ email: req.body.email });

    if(!user)
    {
        return next(new ErrorHandler("User not Found", 404));
    }

    // get reset password token by calling that fun
    const resetToken = user.getResetPasswordToken();

    // saving it first since in getResetPasswordToken() fun it's changing the attributes only not saving it so here it's done after calling the fun
    await user.save({ validateBeforeSave: false });

    /* creating reset password url 
       req.protocol give http or https
       req.get("host") give localhost incase when hosting in local otherwise the other host name
    */
    const resetPasswordUrl = `${req.protocol}://${req.get(
        "host"     
    )}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email, then
    please ignore it`;

    try {
        // calling sendEmail function defined in sendEmail.js
        await sendEmail({
            email: user.email,
            subject: `Ecommerce password recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message:  `Email successfully sent to ${user.email}`,
        });
        // dealing with catch block
    } catch(error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        // saving the undefined declared variables in db
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }
});