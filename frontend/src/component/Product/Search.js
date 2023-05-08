import React, { useState, Fragment } from "react";
import "./Search.css";
import { Redirect } from 'react-router-dom';

const Search = () => {
    const history = useHistory();
    const [keyword, setKeyword ] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if(keyword.trim()) {
            return <Redirect to={`/products/${keyword}`} />;
        } else {
            return <Redirect to="/products" />;
        }
    };

    return (
        <Fragment>
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input type="text"
                placeholder="Search a Product ..."
                onChange={(e) => setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>
        </Fragment>
    );
};

export default Search;