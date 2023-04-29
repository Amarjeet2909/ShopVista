import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction.js";
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

const ProductDetails = ({match}) => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );

    useEffect(() => {
        dispatch(getProductDetails(id));
    }, [dispatch, id]);

    const options = {
        edit: false,
        color: "rgba(20,20,20,0.1)",
        activeColor: "tomato",
        size: window.innerWidth < 600 ? 20 : 25 ,
        value: product.ratings,
        isHalf: true,
    };

    return (
        <Fragment>
            <div className="ProductDetails">
                <div>
                    <Carousel>
                        {product.images &&
                        product.images.map((item,i) => (
                            <img
                              className="CarouselImage"
                              key = {item.url}
                              src = {item.url}
                              alt = {`${i} Slide`}
                            />
                        ))}      
                    </Carousel>
                </div>

                <div>
                    <div className="detailsBlock-1">
                        <h2>{product.name}</h2>
                        <p>Product # {product._id}</p>
                    </div>
                    <div className="detailsBlock-2">
                        <ReactStars {...options}/>{" "}
                        <span className="detailsBlock-2-span">
                        {" "}
                        ({product.numOfReviews} Reviews)
                    </span>
                    </div>
                    <div classname="detailsBlock-3">
                        <h1 className="price">{`₹${product.price}`}</h1>
                        <div classname="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <button className="addsub">-</button>
                                <input value="1" type="number" />
                                <button className="addsub">+</button>
                                <button className="Addtocart">Add to Cart</button>
                            </div>
                        </div>

                        <p className="stockstatus">
                            Status:
                            <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                                {product.Stock < 1 ? " Out Of Stock" : " In Stock"}
                            </b>
                        </p>
                    </div>
                    
                    <div className="detailsBlock-4">
                        Description: <p>{product.description}</p>
                    </div>
                    <button className="submitReview">Submit Review</button>

                </div>

            </div>
        </Fragment>
    );
};

export default ProductDetails;