import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction.js";
import Loader from "../layout/Loader/Loader.js";
import ProductCard from "../Home/productCard.js";
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";

// Function to show all products available
const Products = ({match}) => {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);

    const { keyword } = useParams();

    const {products, loading, error, productsCount, resultPerPage} = useSelector(
        (state) => state.products
    );

    const setCurrentPageNo = (e)=> {
        setCurrentPage(e);
    };

    useEffect(() => {
        dispatch(getProduct(keyword, currentPage));
    }, [dispatch,keyword,currentPage]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
                ) : (
                <Fragment>

                    <h2 className="productsHeading">Products</h2>

                    <div className="products">
                        {products && 
                            products.map((product) => (
                                <ProductCard key={product._id} product={product} />
                            ))}
                    </div>

                <div className="paginationBox">
                <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
                />
                </div>
                                
                </Fragment>
            )}
        </Fragment>
    );
};

export default Products;