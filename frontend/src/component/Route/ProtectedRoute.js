// This file is for Insted of every time we check for isAuthenticated for every routes which needs
// login, we will use ProtectedRoute tag instead of Route and the logic for authentication is done from here only
import React, { Fragment } from 'react'
import { useSelector } from "react-redux";
import { Navigate, Route } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  
    return (
    <Fragment>
        {!loading && (
            <Route
            {...rest}
            render={(props) => {
                if(!isAuthenticated) {
                return <Navigate to="login" />
                }

                return <Component {...props} />
            }}
            />
        )}
    </Fragment>
  );
};

export default ProtectedRoute;