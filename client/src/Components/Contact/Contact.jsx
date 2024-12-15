import React from 'react'
import './contact.css'

function Contact() {
    return (
        <div className="container my-5">
            <div className="row">
                {/* Left Side */}
                <div className="col-md-6  bg-image text-white p-4">
                    <h3 className=' font-extrabold'>Contact us</h3>
                    <div className="my-4">
                        <div className="d-flex forBorder align-items-center mb-3">
                            <div className="for_icon">
                                <i class="ri-map-pin-line fs-4 text-success"></i>
                            </div>
                             <div className=' d-flex p-2 gap-2 flex-column justify-center h-100'>
                                <h5 className=' m-0'>Address</h5>
                                <p className=' m-0'>379-B Badarpur, New Delhi, 110044</p>
                            </div>
                        </div>
                        <div className="d-flex forBorder align-items-center mb-3">
                            <div className="for_icon">
                                <i class="ri-mail-line fs-4 text-success"></i>
                            </div>
                             <div className=' d-flex p-2 gap-2 flex-column justify-center h-100'>
                                <h5 className=' m-0'>Email Address</h5>
                                <p className=' m-0'>info@omsrissalesolutions.com</p>
                            </div>
                        </div>
                        <div className="d-flex forBorder align-items-center">
                            <div className="for_icon">
                                <i class="ri-phone-fill fs-4 text-success"></i>
                            </div>
                             <div className=' d-flex p-2 gap-2 flex-column justify-center h-100'>
                                <h5 className=' m-0'>Contact Number</h5>
                                <p className=' m-0'>+91 82520 74655</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                <div className="col-md-6 bg-success p-4 text-white">
                    <h3 className='font-extrabold'>Contact us</h3>
                    <form className=' my-4'>
                        <div className="row mb-3">
                            <div className="col-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Name"
                                    required
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Phone"
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-6">
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Email"
                                    required
                                />
                            </div>
                            <div className="col-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Subject"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <textarea
                                className="form-control"
                                rows="4"
                                placeholder="Message"
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="btn btn-dark w-100">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact
