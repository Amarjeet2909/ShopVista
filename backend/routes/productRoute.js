// In this file I'm defining all the routes

const express = require("express");
// names inside the const are the names of function
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/product/new").post(createProduct);

router.route("/product/:id").put(updateProduct).delete(deleteProduct);

router.route("/product/:id").get(getProductDetails);

module.exports = router