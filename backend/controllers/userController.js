const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const { findByIdAndUpdate } = require("../models/userModel");

// Function for registering a User
exports.registerUser = catchAsyncErrors(async(req,res,next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });

    const {name, email, password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
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

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("Invalid email or password", 401));
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
   // we have to chnage this during deployment
    const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

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


// Reset Password
 exports.resetPassword = catchAsyncErrors( async ( req,res,next ) => {

        // creating token hash of the token received in forgot password link
        const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

        // finding the token in user database also checking that resetPasswordExpire time left or not 
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: {$gt : Date.now() }, // checking resetPasswordExpire time is greater than Dtae.Now()
        });

        // Dealing when user not found
        if(!user)
        {
            return next(new ErrorHandler("Reset password token is Invalid or has been expired", 400));
        }

        // when password doesn't match confirm password field
        if(req.body.password !== req.body.confirmpassword)
        {
            return next(new ErrorHandler("Password doesn't match", 400));
        }

        // Changing the password of user in DB also making resetPasswordToken and resetPasswordExpire again undefined since it was modified when user clicked forgot pass link
        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        // saving the changes in DB
        user.save();

        sendToken(user, 200, res);
 });


 // Get User Details ~ 
 exports.getUserDetails = catchAsyncErrors(async(req,res,next) => {
        // Searching user in DB using id of the user
        const user = await User.findById(req.user.id);

        // responding(res) user details in JSON Format
        res.status(200).json({
            success: true,
            user,
        });
 });


 // Update the User Password
 exports.updatePassword = catchAsyncErrors(async(req,res,next) => {
        // Searching user in DB using id and also using the password
        const user = await User.findById(req.user.id).select("+password");
        // Checking if old password entered is correct or not by comparing it from user password in db
        const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

        if(!isPasswordMatched)
        {
            return next(new ErrorHandler("Old password is Incorrect", 400));
        }

        if(req.body.password !== req.body.confirmpassword)
        {
            return next(new ErrorHandler("Password doesn't match", 400));
        }
        // modifying the password
        user.password = req.body.newPassword;

        await user.save();

        sendToken(user, 200, res);
 });


 // Update User Profile
exports.updateProfile = catchAsyncErrors(async(req,res,next) => {
        // Creating object of data enetered by user 
        const userData = {
            name: req.body.name,
            email: req.body.email,
        };

        // Updating Avtar will be done later when will be dealing with Cloud

        // Finding the user in DB and updating the user profile with information contain in userData
        const user = await User.findByIdAndUpdate(req.user.id, userData, {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        });

        res.status(200).json({
            success: true,
        });
});


// get All User (Admin)
exports.getAllUser = catchAsyncErrors(async(req,res,next) =>{
        const users = await User.find();

        res.status(200).json({
            success: true,
            users,
        });
});

// Get single User (Admin)
exports.getSingleUser = catchAsyncErrors(async(req,res,next) => {
        const user = await User.findById(req.params.id);

        if(!user)
        {
            return next(new ErrorHandler(`User not found with ID ${req.params.id}`));
        }

        res.status(200).json({
            success: true,
            user,
        });
});


// Update User role (Admin)
exports.updateUserRole = catchAsyncErrors(async (req,res,next) => {
        // Updating information of user profile by Admin
        const newUserData = {
            name: req.body.name,
            email: req.body.email,
            role: req.body.role,
        };

        // Finding user in db and updating the information
        const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
           new: true,
           runValidators: true,
           useFindAndModify: false, 
        });

        if(!user)
        {
            return next(new ErrorHandler(`User not found with ID ${req.params.id}`));
        }

        res.status(200).json({
            success: true,
        });
});


// Delete User (Admin)
exports.deleteUser = catchAsyncErrors(async(req,res,next) => {
        const user = await User.findById(req.params.id);

        if(!user)
        {
            return next(new ErrorHandler(`User not found with Id ${req.params.id}`, 400));
        }

        // calling remove() fun of mongoDB for deleting the user
        await user.remove();

        res.status(200).json({
            success: true,
            message: "User deleted Successfully!",
        });
});