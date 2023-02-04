const Product = require("../models/productModel");


// creating a product --Admin
exports.createProduct = async (req,res,next) =>{
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}

// Get All product
exports.getAllProducts = async(req,res) =>{
    const products = await Product.find();
    res.status(200).json({
        success: true,
        products
    })
}

// Update the Product
exports.updateProduct = async(req,res,next) =>{
    let product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })

}

// Delete a Product
exports.deleteProduct = async(req,res,next) =>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    await product.remove();

    res.status(200).json({
        success:true,
        message: "Product deleted Successfully"
    })
} 

// Get a Product
exports.getProductDetail = async(req,res,next) =>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return res.status(500).json({
            success: false,
            message: "Product not Found"
        })
    }

    res.status(200).json({
        success: true,
        product
    })
}