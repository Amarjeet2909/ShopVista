import './App.css';
import Header from "./component/layout/Header/Header.js";
import React from "react";
import { BrowserRouter as Router , Routes ,Route } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";

function App() {

  // Loading the Web fonts of webfontloader
  React.useEffect(() => {
    WebFont.load({
      google: {
          families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  // Returning Header and Footer file and Home Page imported above
  // <Route> should be child of <Routes>
  return (
    <Router>
      <Header />
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='product/:id' element={<ProductDetails/>} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
