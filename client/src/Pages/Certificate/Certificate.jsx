import React from 'react'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import c1 from './c1.webp'
import c2 from './c2.webp'
import c3 from './c3.webp'
import './certification.css'

function Certificate() {
  return (
    <>
     <Breadcrumb title={'Our Certification'} /> 
     <div className="container my-5 certificate-section">
        <div className="title">
            <h2>Our Certification</h2>
        </div>
        <div className="row g-3">
            <div className=' col-md-4'>
                <div className="img">
                    <img src={c1} alt="" />
                </div>
            </div>
            <div className=' col-md-4'>
                <div className="img">
                    <img src={c2} alt="" />
                </div>
            </div>
            <div className=' col-md-4'>
                <div className="img">
                    <img src={c3} alt="" />
                </div>
            </div>
        </div>
     </div>
    </>
  )
}

export default Certificate
