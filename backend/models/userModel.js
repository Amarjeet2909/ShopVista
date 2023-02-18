const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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


/**
 * JSON Web Token(JWT Token): Below function creates a Token which kept user log in with a assigned _id of user
 * process.env.JWT_SECRET: it's a key which should'nt revealed otherwise anyone can make many fake admin accounts
 * getJWTToken is also a Inbult fun
 * expiresIn is a attribute which takes care of log in session time one can't be log in forever
 * JWT_SECRET & JWT_EXPIRE is variable declared in config.env
 */
userSchema.methods.getJWTToken = function() {
    return jwt.sign({ id: this._id },process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};


/**
 * Compare Password Function
 * Since enteredPassword is in hash format so it has to be compared using bcrypt.compare method which will compare hash
 * values by converting them. this.password is password save in DB for that user
 */
userSchema.methods.comparePassword = async function (enteredPassword) 
{
    return await bcrypt.compare(enteredPassword, this.password);
}

// Generating Token for Reset Password
userSchema.methods.getResetPasswordToken = function() {

    // Generating Token | randomBytes() is a fun which will create random bytes of mentioned size | toString converts that into string and paramater "hex" simplifies that string
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hashing and adding resetPasswordToken defined in userSchema
    this.resetPasswordToken = crypto
                              .createHash("sha256") // sha256 is an cryptographic algo
                              .update(resetToken)
                              .digest("hex");

    // resetPasswordExpire is defined in userSchema | Here it is being defined that after how much time after generating reset pass token it will expire
    this.resetPasswordExpire = Date.now() + 15 * 60 * 60 * 1000;

    return resetToken;
};

module.exports = mongoose.model("User", userSchema);