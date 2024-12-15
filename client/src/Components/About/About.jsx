import React from 'react'
import './about.css'
import about from './about.webp'

function About() {
    return (
        <div className='about-section'>
            <div className="about-container">
                <div className="row g-2">
                    <div className=' col-xl-8 col-lg-8 col-md-12 col-sm-12'>
                        <div className="inner-box">
                            <h2>About Us</h2>
                            <p>Om Sri Sale Solutions Pvt. Ltd is committed to providing high-quality healthcare products, with a primary focus on the production of multivitamin tablets. These tablets are designed to meet the nutritional needs of various demographics, ensuring that individuals receive essential vitamins and minerals to maintain optimal health.</p>
                            <p>Om Sri Sale Solutions Pvt. Ltd prides itself on its state-of-the-art manufacturing facilities. The production processes are compliant with international quality standards, ensuring that all products are safe, effective, and of the highest quality. Key aspects of their manufacturing capabilities include:</p>
                            <p>Veda Vita Multi-Vitamins Tablet is designed to enhance overall health and boost immunity. Formulated with a blend of essential vitamins, minerals, and antioxidants, this supplement aims to fill nutritional gaps and support the body’s immune system.</p>
                            <button className='btn btn-primary font-bold'>Read More</button>
                        </div>

                    </div>
                    <div className=' col-xl-4 col-lg-4 col-md-12 col-sm-12'>
                        <div className="img">
                            <img src={about} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
