import './App.css';
import Header from "./component/layout/Header/Header.js";
import React from "react";
import { BrowserRouter as Router , Routes ,Route, Navigate } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store.js";
import { loadUser } from './actions/userAction.js';
import UserOptions from "./component/layout/Header/UserOptions.js";
import {useSelector} from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from './component/Route/ProtectedRoute.js';
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // Loading the Web fonts of webfontloader
  React.useEffect(() => {
    WebFont.load({
      google: {
          families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());
  }, []);

  // Returning Header and Footer file and Home Page imported above
  // <Route> should be child of <Routes>
  return (
    <Router>
      <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='product/:id' element={<ProductDetails/>} />
            <Route path='/products' element={<Products />} />
            <Route path='/products/:keyword' Component={Products} />
            <Route path='/search' element={<Search />} />
            <Route path="/login" element={<LoginSignUp/>} />
            <Route path="/password/forgot" element={<ForgotPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            
            {isAuthenticated ? (
            <>
                <Route path="/account" element={<Profile />} />
                <Route path="/me/update" element={<UpdateProfile />} />
                <Route path="/password/update" element={<UpdatePassword />} />
            </>
            ) : (
            <>
                <Route path="/account" element={<Navigate to="/login" />} />
                <Route path="/me/update" element={<Navigate to="/login" />} />
                <Route path="/password/update" element={<Navigate to="/login" />} />
            </>
            )}

        </Routes>       
      <Footer />
    </Router>
  );
}

export default App;