import React, { useState } from 'react';

const AddressModal = ({ show, onClose, onSubmit }) => {
  const [address, setAddress] = useState({
    City: '',
    PinCode: '',
    HouseNo: '',
    Street: '',
    NearByLandMark: '',
    paymentMode: ''
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(address);
  };

  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Delivery Address</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="City"
                  value={address.City}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Pin Code</label>
                <input
                  type="text"
                  className="form-control"
                  name="PinCode"
                  value={address.PinCode}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">House No.</label>
                <input
                  type="text"
                  className="form-control"
                  name="HouseNo"
                  value={address.HouseNo}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Street</label>
                <input
                  type="text"
                  className="form-control"
                  name="Street"
                  value={address.Street}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Nearby Landmark</label>
                <input
                  type="text"
                  className="form-control"
                  name="NearByLandMark"
                  value={address.NearByLandMark}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Payment Mode</label>
                <select
                  className="form-select"
                  name="paymentMode"
                  value={address.paymentMode}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Select Payment Method</option>
                  <option value="COD">Cash on Delivery (COD)</option>
                  <option value="Online">Online Payment</option>
                </select>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn addtocartbg">
                  Confirm Address & Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
