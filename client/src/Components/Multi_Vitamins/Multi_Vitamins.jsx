import React from 'react'
import './style.css'
import img from './img.webp'

function Multi_Vitamins() {
  return (
    <div className='multi-section'>
      <div className="multi-container">
        <div className="row">
            <div className=' col-xl-7 col-lg-7 col-md-12 col-sm-12'>
                <div className="inner-box">
                    <h2>VEDA VITA Multi-Vitamins Tablet</h2>
                    <p><span className=' font-bold'>Usage:</span> Typically, it’s recommended to take one tablet daily with a meal, but it’s important to follow the dosage instructions on the packaging or as advised by a healthcare professional.</p>
                    <p><span className=' font-bold'>Conclusion:</span>  Veda Vita Multi-Vitamins Tablet is a comprehensive supplement aimed at supporting immune health, energy levels, and overall wellness. By providing a balanced mix of essential nutrients, it can be a beneficial addition to the daily routine for those looking to enhance their immunity and maintain general health.</p>
                </div>
            </div>
            <div className=' col-xl-5 col-lg-5 col-md-12 col-sm-12'>
                <div className="img">
                    <img src={img} alt="" />
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Multi_Vitamins
