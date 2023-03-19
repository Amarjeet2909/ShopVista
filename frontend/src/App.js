import './App.css';
import Header from "./component/layout/Header.js";
import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";

function App() {

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
