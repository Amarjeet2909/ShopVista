import './App.css';
import Header from "./component/layout/Header/Header.js";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store.js";
import { loadUser } from './actions/userAction.js';
import Loader from './component/layout/Loader/Loader.js';
import UserOptions from "./component/layout/Header/UserOptions.js";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from './component/Route/ProtectedRoute.js';
import UpdateProfile from "./component/User/UpdateProfile.js";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./component/Cart/Payment.js";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from "./component/Cart/OrderSuccess.js";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated, user } = useSelector((state) => state.user);

  // Getting Stripe API key from ENV file and set it
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }

  // Loading the Web fonts of webfontloader
  useEffect(() => {
    WebFont.load({
      google: {
          families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser())
      .then(() => setIsLoading(false))
      .catch(error => {
        console.error('Error loading user:', error);
        setIsLoading(false);
      });

    getStripeApiKey();
  }, []);

  if (isLoading) {
    return <Loader />; // Return Loader while data is loading
  }

  // Component to wrap Payment with Stripe
function PaymentWithStripe() {
  const stripePromise = loadStripe(stripeApiKey);
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
}

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='product/:id' element={<ProductDetails />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/:keyword' element={<Products />} />
        <Route path='/search' element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />

        {isAuthenticated ? (
          <>
            <Route path="/account" element={<Profile />} />
            <Route path="/me/update" element={<UpdateProfile />} />
            <Route path="/password/update" element={<UpdatePassword />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/order/confirm" element={<ConfirmOrder />} />
            <Route path="/success" element={<OrderSuccess />} />
          </>
        ) : (
          <>
            <Route path="/account" element={<Navigate to="/login" />} />
            <Route path="/me/update" element={<Navigate to="/login" />} />
            <Route path="/password/update" element={<Navigate to="/login" />} />
            <Route path="/shipping" element={<Navigate to="/login" />} />
            <Route path="/order/confirm" element={<Navigate to="/login" />} />
            <Route path="/success" element={<Navigate to="/login" />} />
          </>
        )}

        {/* Place Elements component conditionally */}
        {isAuthenticated && stripeApiKey && (
          <Route path="/process/payment" element={<PaymentWithStripe />} />
        )}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
