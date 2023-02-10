const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Creating Schema for user 
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Enter your Name"],
        maxlength: [30, "Name Can't exceed 30 characters"],
        minlength: [3, "Name Can't be less than 3 characters"],     
    },
    email:{
        type: String,
        required: [true, "Please Enter your Email"],
        unique: true,
        // validator is a package that is installed using which email is being validated
        validate: [validator.isEmail, "Please Enter a valid Email"],
    },
    password:{
        type: String,
        required: [true, "Please Enter the Password"],
        minlength: [8, "Password Should be greater than 8 characters"],
        // below statement means whenever the user data will be retrieved even by Admin then the password will not be shown
        select: false,
    },
    avatar:{
        public_id:{
            type: String,
            required: true,
        },
        url:{
            type: String,
            required: true,
        },
    },
    role:{
        type: String,
        default: "user",
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

/*
 * Encrypting the password using bcrypt.js package which has been installed in this project
 * here arrow function has not used since in arrow fun 'this' keyword can't be used
 * .pre method here means before "save" hash the password value
*/
userSchema.pre("save", async function (next) {
    /* Applying this condition because when user will update the profile then password should'nt be encrypted again, So below condition
       means if password not mofied then simply process next do'nt encrypt again but when user will go throught change password option 
       then the statement after the 'if' condition will be followed. */
    if(!this.isModified("password")){
        next();
    }

    this.password = await bcrypt.hash(this.password, 10); // 10 used generally but it can be incresed also for doing more complex hashing
});



module.exports = mongoose.model("User", userSchema);