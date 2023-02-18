// In this file I'm defining all the functions related to product

const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");


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
    const resultPerPage = 5;
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