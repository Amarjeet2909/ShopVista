import React, { Fragment, useEffect, useState } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productAction.js";



const ProductDetails = ({match}) => {

    const dispatch = useDispatch();

    const { product, loading, error } = useSelector(
        (state) => state.productDetails
    );

    useEffect(() => {
        dispatch(getProductDetails(this.props.match.params.id));
    }, [dispatch, this.props.match.params.id]);
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
            </div>
        </Fragment>
    );
};

export default ProductDetails;