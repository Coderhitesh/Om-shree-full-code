import React from 'react'
import './about.css'
import tablet from './teblet.webp'

function AboutTablet() {
    return (
        <div className='about-tablet-section'>
            <div className="about-tablet-container">
                <div className="heading">
                    <p>Immunity Power Booster</p>
                    <h2>VEDA VITA MULTI - VITAMINS TABLET</h2>
                </div>
                <div className="row g-5 forRow">
                    <div className=' col-xl-4 col-lg-4 col-md-12 col-sm-12'>
                        <div className="inner-box">
                            <div className='box col-xl-12 mb-5 col-lg-12 col-md-12 col-sm-12 g-3'>
                                <div className="tablet-box">
                                    <div className="text">
                                        <h4>Immune System Support</h4>
                                        <p className='text-end'>The tablet contains essential vitamins like Vitamin C, Vitamin D, and Zinc, known for their role in boosting the immune system.</p>
                                    </div>
                                    <div className='img'>
                                        <i class="ri-capsule-fill"></i>
                                    </div>
                                </div>
                            </div>
                            <div className='box col-xl-12 col-lg-12 col-md-12 col-sm-12 g-3'>
                                <div className="tablet-box">
                                    <div className="text">
                                        <h4>Immune System Support</h4>
                                        <p className='text-end'>The tablet contains essential vitamins like Vitamin C, Vitamin D, and Zinc, known for their role in boosting the immune system.</p>
                                    </div>
                                    <div className='img'>
                                        <i class="ri-capsule-fill"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='tablet-img-box col-xl-4 col-lg-4 col-md-12 col-sm-12'>
                        <div className="img">
                            <img src={tablet} alt="" />
                        </div>
                    </div>
                    <div className=' col-xl-4 col-lg-4 col-md-12 col-sm-12'>
                        <div className="inner-box">
                            <div className='box col-xl-12 mb-5 col-lg-12 col-md-12 col-sm-12 g-3'>
                                <div className="tablet-box reverce-box">
                                    <div className='img'>
                                        <i class="ri-capsule-fill"></i>
                                    </div>
                                    <div className="text right-text">
                                        <h4>Immune System Support</h4>
                                        <p>The tablet contains essential vitamins like Vitamin C, Vitamin D, and Zinc, known for their role in boosting the immune system.</p>
                                    </div>
                                </div>
                            </div>
                            <div className='box col-xl-12 col-lg-12 col-md-12 col-sm-12 g-3'>
                                <div className="tablet-box reverce-box">
                                    <div className='img'>
                                        <i class="ri-capsule-fill"></i>
                                    </div>
                                    <div className="text right-text">
                                        <h4>Immune System Support</h4>
                                        <p>The tablet contains essential vitamins like Vitamin C, Vitamin D, and Zinc, known for their role in boosting the immune system.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutTablet
