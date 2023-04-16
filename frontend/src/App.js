import './App.css';
import Header from "./component/layout/Header/Header.js";
import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";
import Home from "./component/Home/Home.js";

function App() {

  // Loading the Web fonts of webfontloader
  React.useEffect(() => {
    WebFont.load({
      google: {
          families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
  }, []);

  // Returning Header and Footer file imported above
  return (
    <Router>
      <Header />


      <Footer />
    </Router>
  );
}

export default App;
