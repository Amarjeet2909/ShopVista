import React, { Fragment , useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";

/**
React Fragment is a feature in React that allows you to return multiple elements from a React component by allowing 
you to group a list of children without adding extra nodes to the DOM
 */
const Home = () => {
        return (
        <Fragment>
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
            

        </Fragment>
        );
};

export default Home;