import React, { Fragment } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from "./Product.js"
import MetaData from "../layout/MetaData.js";

const product = {
    name: "White Pant",
    images: [{ url: "https://i.ibb.co/DRST11n/1.webp" }],
    price: "3000",
    _id: "Amarjeet",
};

/**
React Fragment is a feature in React that allows you to return multiple elements from a React component by allowing 
you to group a list of children without adding extra nodes to the DOM
 */
const Home = () => {
        return (
        <Fragment>
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
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
            </div>

        </Fragment>
        );
};

export default Home;