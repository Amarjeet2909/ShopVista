import './App.css';
import Header from "./component/layout/Header/Header.js";
import React from "react";
import { BrowserRouter as Router , Routes ,Route } from "react-router-dom";
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
            <ProtectedRoute path='/account' element={<Profile />} />

        </Routes>       
      <Footer />
    </Router>
  );
}

export default App;