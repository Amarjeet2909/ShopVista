// This file is for Insted of every time we check for isAuthenticated for every routes which needs
// login, we will use ProtectedRoute tag instead of Route and the logic for authentication is done from here only
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ path, element: Component, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Route
      {...rest}
      path={path}
      element={isAuthenticated ? <Component /> : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;
