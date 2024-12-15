import React from 'react';
import Slider from 'react-slick';
import './banner.css';
import banner1 from './banner-1.webp';
import banner2 from './banner-2.webp';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
    

function Banner() {
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        waitForAnimate: false,
    };

    const banners = [banner1, banner2];

    return (
        <div className='banner-section'>
            <div className="banner-container">
                <Slider {...settings}>
                    {banners.map((banner, index) => (
                        <div key={index} className="slide">
                            <img src={banner} alt={`Banner ${index + 1}`} />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}

export default Banner;