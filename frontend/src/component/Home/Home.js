import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from "./productCard.js"
import MetaData from "../layout/MetaData.js";
import { clearErrors, getProduct } from "../../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

/**
React Fragment is a feature in React that allows you to return multiple elements from a React component by allowing 
you to group a list of children without adding extra nodes to the DOM
 */
const Home = () => {

        const alert = useAlert();
        const dispatch = useDispatch();
        const { loading, error, products } = useSelector(
            (state) => state.products
        );
        useEffect(() => {
            if (error) {
                alert.error(error);
                dispatch(clearErrors);
            }
            dispatch(getProduct());
        }, [dispatch, error, alert]);

        return (
            <Fragment>
                {loading ? (
                    <Loader />
                ) : (        <Fragment>
            <MetaData title="ECOMMERCE" />

            <div className="banner">
                <p>Welcome to ECOMMERCE</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>
                        Scroll <CgMouse/>
                    </button>
                </a>
            </div>

            <h2 className="homeHeading">Featured Products</h2>

            <div className="container" id="container">
                {products && products.map((product) => <Product product={product} />)}
            </div>

        </Fragment> 
        )}
            </Fragment>
        );
};

export default Home;