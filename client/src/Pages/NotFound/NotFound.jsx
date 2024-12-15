import React from "react";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

function NotFound() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <h2 className="mb-3">Page Not Found</h2>
        <p className="text-muted">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link style={{backgroundColor:'#28834C',color:'white'}} to="/" className="btn">
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
