import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css"; // Add custom CSS for additional styles if needed
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-success text-white">
      <div className="container">
        <div style={{ padding: '60px 0px 10px 0px' }} className="row ">
          {/* About us */}
          <div className="col-md-3 mb-3">
            <h5 className=" mb-3">About us</h5>
            <p>
              Om Sri Sale Solutions Pvt. Ltd is committed to providing
              high-quality healthcare products, with a primary focus on the
              production of multivitamin tablets.
            </p>
          </div>

          {/* Useful links */}
          <div className="col-md-3 mb-3">
            <h5 className=" mb-3">Useful link</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/">
                  <i className="fas fa-check-circle me-2"></i>Home
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <i className="fas fa-check-circle me-2"></i>About us
                </Link>
              </li>
              <li>
                <Link to="/gallery">
                  <i className="fas fa-check-circle me-2"></i>Gallery
                </Link>
              </li>
              <li>
                <Link to="/blog">
                  <i className="fas fa-check-circle me-2"></i>Blog
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <i className="fas fa-check-circle me-2"></i>Contact us
                </Link>
              </li>
            </ul>
          </div>

          {/* Important links */}
          <div className="col-md-3 mb-3">
            <h5 className=" mb-3">Important link</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/privacy-policy">
                <i className="fas fa-check-circle me-2"></i>Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/refund-and-cancellation-policy">
                <i className="fas fa-check-circle me-2"></i>Refund and Cancellation Policy
                </Link>
              </li>
              <li>
                <Link to={'/return'} >
                <i className="fas fa-check-circle me-2"></i>Return Policy
                </Link>
              </li>
              <li>
              <Link to="/shipping-policy">
                <i className="fas fa-check-circle me-2"></i>Shipping Policy
              </Link>
              </li>
              <li>
                <Link to={'/terms-conditions'}>
                <i className="fas fa-check-circle me-2"></i>Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-3">
            <h5 className=" mb-3">Contact Info</h5>
            <ul className="list-unstyled">
              <li>
                <a href="">
                <i className="fas fa-map-marker-alt me-2"></i>379-B Badarpur, New Delhi, 110044
                </a>
              </li>
              <li>
                <a href="mailto:info@omsrissalesolutions.com">
                <i className="fas fa-envelope me-2"></i>info@omsrissalesolutions.com
                </a>
              </li>
              <li>
                <a href="tel:+91 82520 74655">
                <i className="fas fa-phone-alt me-2"></i>+91 82520 74655
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: '#A7CF44' }} className=" text-light text-center py-2">
        Om Sri Sale Solutions Pvt. Ltd Copyright – 2024 | Develop By IT
        Solution Services
      </div>
    </footer>
  );
};

export default Footer;
