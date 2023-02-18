//Creating Token and saving in Cookie

const  sendToken = (user, statusCode, res) => {
    //getJWTToken fun of userModel.js for creating user Token
    const token = user.getJWTToken();

    // options for cookie
    const options = {
        expires: new Date(
            Date.now()+process.env.COOKIE_EXPIRE*24*60*60*1000 // Expiry date of cookie will be current date on which it has been created + COOKIE_EXPIRE(defined in confifg.env file) also it has been converted to milisecond
        ),
        httpOnly: true,
    };

    res.status(statusCode).cookie("token", token, options).json({
            success: true,
            user,
            token,
    });
};

module.exports = sendToken;