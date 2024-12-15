import React from 'react';
// import './Successfull.css'; // Custom CSS for additional styling

function Successfull() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-gradient">
      <div className="card text-center p-5 shadow-lg success-card">
        <div>
          <i className="bi bi-check-circle-fill success-icon"></i>
        </div>
        <h1 className="my-4">Payment Successful!</h1>
        <p className="mb-4">
          Thank you for your purchase. Your payment has been successfully processed, and we appreciate your trust in our service!
        </p>
        {/* <p className="mb-4">
          Order ID: <span className="fw-bold">#12345678</span>
        </p> */}
        <div className="d-flex justify-content-center gap-3">
          <a href="/" className="btn btn-success px-4 py-2">
            Go to Home
          </a>
          <a href="/user-profile" className="btn btn-light px-4 py-2">
            View Order History
          </a>
        </div>
      </div>
    </div>
  );
}

export default Successfull;
