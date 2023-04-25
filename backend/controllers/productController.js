// In this file I'm defining all the functions related to product

const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const { findByIdAndUpdate } = require("../models/userModel");


// creating a product --Admin
exports.createProduct = catchAsyncErrors(async (req,res,next) =>{

    // giving user id when a product creates to know that who created the product
    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    });
});

// Get All product
exports.getAllProducts = catchAsyncErrors(async(req,res) =>{

    // countDocuments() is an MongoDB fun
    const productCount = await Product.countDocuments();
    const resultPerPage = 8;
    // It's an API feature for searching items by keyword
    const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products,
        productCount
    });
});

// Update the Product
exports.updateProduct = catchAsyncErrors(async(req,res,next) =>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not Found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    });

});

// Delete a Product
exports.deleteProduct = catchAsyncErrors(async(req,res,next) =>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not Found", 404));
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message: "Product deleted Successfully"
    });
}); 

// Get a Product
exports.getProductDetails = catchAsyncErrors(async (req,res,next) =>{
    const product = await Product.findById(req.params.id);

    /* new ErrorHandler is a object of class ErrorHandler which is taking message and error code as a parameter
    & 'next' is a call back function */
    if(!product){
        return next(new ErrorHandler("Product not Found", 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});


// Creating new review or update the review
exports.createProductReview = catchAsyncErrors(async(req,res,next) => {
    // taking details from req.body needed for review
    const { rating, comment, productId } = req.body;

    // craeting an object of review fields
    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating), // Number() will convert string into number
        comment,
    };

    // Finding product using productId got through req.body
    const product = await Product.findById(productId);

    /* Checking if product is already reviewed by user or not 
       reviews is an Array in product Schema so find() can be applied on it
       rev is just a variable | rev.user will give ID of user that has rated the product
       So, In below statement that user Id and current user Id is being compared which is currently going to rate it.
    */
    const isReviewed = product.reviews.find(
        (rev) => rev.user.toString() === req.user._id.toString()
    );

    // If alraedy reviewed then search the review of that user in reviews array and simply update the rating and comment
    if(isReviewed)
    {
        product.reviews.forEach((rev) => {
            if(rev.user.toString() === req.user._id.toString())
            {
                (rev.rating = rating), (rev.comment = comment);
            }
        });
    }
    else
    {
        // If not already reviewed then push review object into reviews array also update noOfReviews field
        product.reviews.push(review);
        product.noOfReviews = product.reviews.length;
    }

    // Average calculation of ratings for the product
    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += Number(rev.rating);
    });

    product.ratings = avg / product.reviews.length;

    // saving the changes happend in product
    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
    });
});

// Get All reviews of a product
exports.getProductReviews = catchAsyncErrors(async(req,res,next) => {
    // finding product in db using id
    const product = await Product.findById(req.query.id);

    if(!product)
    {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({
        success: true,
        // responding with reviews array of the product
        reviews: product.reviews,
    });
});

// Delete Review
exports.deleteReview = catchAsyncErrors(async(req,res,next) => {
    // finding the product using productId for which review has to be deleted
    const product = await Product.findById(req.query.productId);

    if(!product)
    {
        return next(new ErrorHandler("Product not found", 404));
    }

    const reviews = product.reviews.filter(
        (rev) => rev._id.toString() !== req.query.id.toString()
    );

    let avg=0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if(reviews.length === 0){
        ratings=0;
    } else {
        ratings = avg / reviews.length;
    }

    const noOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
        req.query.productId,
        {
            reviews,
            ratings,
            noOfReviews,
        },
        {
            new: true,
            runValidators: true,
            useFindAndModify: false,
        }
    );

    res.status(200).json({
        success: true,
    });
});