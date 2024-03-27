import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-links">
            <ul className="footer-columns">
              <li className="column-title">Products and services</li>
              <li><a href="#" className="footer-hover-links">Home & Living</a></li>
              <li><a href="#" className="footer-hover-links">Handicrafts</a></li>
              <li><a href="#" className="footer-hover-links">Beauty</a></li>
              <li><a href="#" className="footer-hover-links">Men lifestyle and clothing</a></li>
              <li><a href="#" className="footer-hover-links">Women lifestyle and clothing</a></li>
              <li><a href="#" className="footer-hover-links">Kids lifestyle and clothing</a></li>
            </ul>
            <ul className="footer-columns">
              <li className="column-title">Help</li>
              <li><a href="#" className="footer-hover-links">Payments</a></li>
              <li><a href="#" className="footer-hover-links">Shipping</a></li>
              <li><a href="#" className="footer-hover-links">Cancellations and Returns</a></li>
              <li><a href="#" className="footer-hover-links">FAQ</a></li>
              <li><a href="#" className="footer-hover-links">Report Infringement</a></li>
            </ul>
            <ul className="footer-columns">
              <li className="column-title">Contact</li>
              <li><a href="#" className="footer-hover-links">(123) 456-7890</a></li>
              <li><a href="#" className="footer-hover-links">bharatcrafters@gmail.com</a></li>
              <li><a href="#" className="footer-hover-links">Twitter</a></li>
              <li><a href="#" className="footer-hover-links">Instagram</a></li>
            </ul>
          </div>
          <div className="signup">
            <a href="/createuser"><p>Sign Up to get 10% off your first order</p></a>
            <div className="signup-input">
              <input placeholder='Your Email Address'></input>
              <button>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="copyright">&copy; 2024 Bharat Crafters. All Rights Reserved.</p>
        <div className="terms">
          <p><a href="#" className="footer-hover-links">Terms and Conditions</a></p>
          <p><a href="#" className="footer-hover-links">Privacy Policy</a></p>
          <p><a href="#" className="footer-hover-links">Do not sell my Information</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
