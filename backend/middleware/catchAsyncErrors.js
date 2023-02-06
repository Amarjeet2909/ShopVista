/**
 * 1. This file is for handling async errors since we should use try and catch block with async but I'm not writing it in productController.js
 * file because there I will have to write try and catch in each fun where I used async. So I'm writing the logic here
 * and will call this in each fun in productController.js for handling async errors.
 * 
 * 2. Promise is an Inbuilt class of JS and resolve is an fun of that class
 */
module.exports = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next)).catch(next);
  };