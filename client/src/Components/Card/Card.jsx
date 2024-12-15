import React from 'react';
import './card.css';
import icon1 from './icon-1.webp'
import icon2 from './iocn-2.webp'
import icon3 from './iocn-3.webp'
import icon4 from './icon-4.webp'

function Card() {
    return (
        <div className='card-section'>
            <div className="card-container">
                <div className="row g-3"> {/* g-3 applies the gap */}
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 card-box">
                        <div className="inner-card">
                            <div className="img">
                                <img src={icon1} alt="" />
                            </div>
                            <h3>100% Payment Secured</h3>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 card-box">
                        <div className="inner-card">
                            <div className="img">
                                <img src={icon2} alt="" />
                            </div>
                            <h3>24 hours / 7 days Support</h3>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 card-box">
                        <div className="inner-card">
                            <div className="img">
                                <img src={icon3} alt="" />
                            </div>
                            <h3>Free Delivery within 2,000 INR</h3>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 card-box">
                        <div className="inner-card">
                            <div className="img">
                                <img src={icon4} alt="" />
                            </div>
                            <h3>Best Price With Guaranteed</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
