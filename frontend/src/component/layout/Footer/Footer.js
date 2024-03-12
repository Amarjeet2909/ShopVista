import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css"

const Footer = () => {
    return (
        <footer id="footer">
            <div className="leftFooter">
                <h4>DOWNLOAD OUR APP</h4>
                <p>Download App from Andriod and IOS mobile phone</p>
                <img src={playStore} alt="playstore"/>
                <img src={appStore} alt="appstore"/>
            </div>

            <div className="midFooter">
                <h1>ASTROSWARG</h1>
                <p>Customer satisfaction is our motto | One step ahead</p>

                <p>Copyrights 2023 &copy; Amarjeet Singh</p>
            </div>

            <div className="rightFooter">
                <h4>Follow Us</h4>
                <a href="https://www.linkedin.com/in/amarjeet-cse/" target="_blank" rel="noopener noreferrer">Linkedin</a>
                <a href="https://github.com/Amarjeet2909" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href="https://leetcode.com/Amarjeet2909/" target="_blank" rel="noopener noreferrer">LeetCode</a>
            </div>
        </footer>
    );
};

export default Footer;