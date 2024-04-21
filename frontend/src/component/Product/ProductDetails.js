import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction.js";
import { useParams } from 'react-router-dom';
import { Rating } from '@mui/material';
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const ProductDetails = ({ match }) => {

    const dispatch = useDispatch();
    const { id } = useParams();
    const alert = useAlert();

    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );

    useEffect(() => {
        if (error){
            alert.error(error);
            dispatch(clearErrors);
        }
        dispatch(getProductDetails(id));
    }, [dispatch, id]);

    const options = {
        edit: false,
        size: "medium",
        value: product.rating,
        readOnly: true,
        precision: 0.5,
        isHalf: true, 
    };
    console.log(product.name);
    return (
        <Fragment>
            {loading? (
            <Loader /> 
            ) : (
            <Fragment>
            <MetaData title={`${product.name} -- ECOMMERCE`} />
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
                    <Rating className='detailsBlock-2-span' {...options}/>
                        <span className="detailsBlock-2-span">
                        {" "}
                        ({product.noOfReviews} Reviews)
                    </span>
                    </div>
                    <div className="detailsBlock-3">
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

            <h3 className="reviewsHeading">REVIEWS</h3>

            {product.reviews && product.reviews[0] ? (
                <div className="reviews">
                    {product.reviews && product.reviews.map((review) => <ReviewCard review={review} />)}
                </div>
            ) : (
                <p className="noReviews">No Reviews Yet</p>
            )}

        </Fragment>
        )};
        </Fragment>
    );
};

export default ProductDetails;