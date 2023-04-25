import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from "./Product.js"
import MetaData from "../layout/MetaData.js";
import { getProduct } from "../../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";


/**
React Fragment is a feature in React that allows you to return multiple elements from a React component by allowing 
you to group a list of children without adding extra nodes to the DOM
 */
const Home = () => {

        const dispatch = useDispatch();
        const { loading, error, products, productsCount } = useSelector(
            (state) => state.products
        );
        useEffect(() => {
            dispatch(getProduct());
        }, [dispatch]);

        return (
            <Fragment>
                {loading ? (
                    "loading"
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