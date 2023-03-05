const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Creating new order
exports.newOrder = catchAsyncErrors(async(req,res,next) => {

    // Creating some const which we need when user make a new order, these info's will be taken from body of frontend
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    // Creating a object of Schema defined in orderModel.js by .create() method and passing required data for the Schema
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });

    res.status(201).json({
        success: true,
        order,
    });
});


// Get Single Order
exports.getSingleUser = catchAsyncErrors(async (req,res,next) => {

    /**
     * Population is the process of replacing the specified path in the document of one collection with the actual
     * document from the other collection.
     * Here, after finding the order by order id it will search in user DB with id of user and will give name and email of the user.
     */
    const order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if(!order) {
        return next(new ErrorHandler("Order not found with this Id",404));
    }

    res.status(200).json({
        success: true,
        order,
    });
});

// Get all orders of logged in users
exports.myOrders = catchAsyncErrors(async (req,res,next) => {
    const orders = await Order.find({user: req.user._id});

    res.status(200).json({
        success: true,
        orders,
    });
});