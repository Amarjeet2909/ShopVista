import React, { fragment } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from "./Product.js";


const product = {
    name: "Blue TShirt",
    images: [{url: "https://www.cit.ac.in"}],
    price: "3000",
    _id: "Amarjeet",
};

/**
React Fragment is a feature in React that allows you to return multiple elements from a React component by allowing 
you to group a list of children without adding extra nodes to the DOM
 */
const Home = () => {
    return (
        <fragment>
            <div className="banner">
                <p>Welcome to ECOMMERCE</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="container">
                    <button>
                        Scroll <CgMouse/>
                    </button>
                </a>
            </div>
        </fragment>


    );
};

export default Home;