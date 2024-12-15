import React from 'react'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import './UserDetail.css'

function UserDetail() {
  return (
    <>
     <Breadcrumb title={'User Details'} /> 
     <div className="container my-5">
      <div className="form-container p-4">
        <h3 className="text-center mb-4">Contact us</h3>
        <form>
          <div className="row g-3">
            {/* Customer Name */}
            <div className="col-md-6">
              <label htmlFor="customerName" className="form-label">
                Customer Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="customerName"
                placeholder="Customer Name"
              />
            </div>

            {/* Contact Number */}
            <div className="col-md-6">
              <label htmlFor="contactNumber" className="form-label">
                Contact Number <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="contactNumber"
                placeholder="Contact Number"
              />
            </div>

            {/* Address */}
            <div className="col-md-6">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="Address"
              />
            </div>

            {/* Refer By (Name) */}
            <div className="col-md-6">
              <label htmlFor="referByName" className="form-label">
                Refer By (Name) <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="referByName"
                placeholder="Refer By (Name)"
              />
            </div>

            {/* Refer By (Contact Number) */}
            <div className="col-md-12">
              <label htmlFor="referByContact" className="form-label">
                Refer By (Contact Number) <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                className="form-control"
                id="referByContact"
                placeholder="Refer By (Contact Number)"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-4">
            <button type="submit" className="btn btn-dark">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  )
}

export default UserDetail
