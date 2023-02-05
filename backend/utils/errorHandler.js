/**
 * ErrorHander is a class I have defined and that this class is inheriting a inbuilt class 'Error'
 * super is a constructor of Error class
 * captureStackTrace is a function inside Error Class
 */
class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ErrorHandler