import React, { useState } from 'react'
import './header.css'
import { IoLocation } from "react-icons/io5";
import logo from './logo.webp'
import { Link } from 'react-router-dom';
import Cart from '../Cart/Cart'
import { useCart } from '../../context/CartContext';
import { LogIn, ShoppingCart, User } from 'lucide-react';

function Header() {
    const [isDropDownActive, setIsDropDown] = useState(false)
    const [isMobDropDownActive, serIsMobDropDown] = useState(false)
    const [isMobActive, setIsMobActive] = useState(false)
    // const user = JSON.parse(sessionStorage.getItem('user'));
    const token = sessionStorage.getItem('authToken');
    const handleDropDownActive = () => {
        setIsDropDown(true)
    }
    const handleDropDownDeActive = () => {
        setIsDropDown(false)
    }

    const handleMobDropDownActive = () => {
        serIsMobDropDown(!isMobDropDownActive)
    }

    const handleMobActive = () => {
        setIsMobActive(!isMobActive)
    }

    const { items } = useCart();
    const [isCartOpen, setIsCartOpen] = useState(false);

    return (
        <div className='header-section'>
            <div className="header-container">
                <div className="top-header">
                    <div className="left">
                        <div className="same">
                            {/* <IoLocation /> */}
                            <i class="ri-map-pin-fill"></i>
                            <a href="">379-B Badarpur, New Delhi ,110044</a>
                        </div>
                        <div className="same">
                            {/* <IoMdMail /> */}
                            <i class="ri-mail-fill"></i>
                            <a href="">info@omsrisalesolutions.com</a>
                        </div>
                        <div className="same">
                            {/* <FaPhoneSquareAlt /> */}
                            <i class="ri-phone-fill"></i>
                            <a href="">+91 82520 74655</a>
                        </div>
                    </div>
                    <div className="right">
                        <div className="same">
                            <i class="ri-facebook-circle-fill"></i>
                        </div>
                        <div className="same">
                            <i class="ri-instagram-fill"></i>
                        </div>
                        <div className="same">
                            <i class="ri-twitter-x-fill"></i>
                        </div>
                        <div className="same">
                            <i class="ri-youtube-fill"></i>
                        </div>
                    </div>
                </div>
                <div className="bottom-header">
                    <Link to={'/'} className="img">
                        <img src={logo} alt="" />
                    </Link>
                    <ul className='navBar'>
                        <li><Link to={'/'} >Home</Link></li>
                        <li onMouseEnter={handleDropDownActive} onMouseLeave={handleDropDownDeActive} className='dorpDownRelated'>
                            <Link to={'/about-us'} >About us <i class="ri-arrow-down-s-fill"></i></Link>
                            <ul className={`dropDown ${isDropDownActive ? 'active-dorp' : ''}`}>
                                <li><Link to={'/about-us'}>About us</Link></li>
                                <li><Link to={'/our-certification'}>Our Certification</Link></li>
                            </ul>
                        </li>
                        <li><Link to={'/veda-vita-multi-vitamins-tablet'} >Our Products</Link></li>
                        <li><Link to={'/our-team'} >Our Team</Link></li>
                        <li><Link to={'/gallery'} >Gallery</Link></li>
                        <li><Link to={'/blog'} >Blog</Link></li>
                        <li><Link to={'/contact'} >Contact us</Link></li>
                    </ul>
                    <ul className={`mob-nav ${isMobActive ? 'mob-active' : ''}`}>
                        <li><Link onClick={handleMobActive} to={'/'}>Home</Link></li>
                        <li onClick={handleMobDropDownActive} className='mobDropRelated'>
                            <Link className='forliheight'>About us <i class="ri-arrow-down-s-fill"></i></Link>
                            <ul className={`mob-dropDown ${isMobDropDownActive ? 'mob-active-dorp' : ''}`}>
                                <li><Link onClick={() => handleMobActive()} to={'/about-us'}>About us</Link></li>
                                <li><Link onClick={() => handleMobActive()} to={'/our-certification'}>Our Certification</Link></li>
                            </ul>
                        </li>
                        <li><Link onClick={handleMobActive} to={'/veda-vita-multi-vitamins-tablet'} >Our Products</Link></li>
                        <li><Link onClick={handleMobActive} to={'/our-team'} >Our Team</Link></li>
                        <li><Link onClick={handleMobActive} to={'/gallery'} >Gallery</Link></li>
                        <li><Link onClick={handleMobActive} to={'/blog'} >Blog</Link></li>
                        <li><Link onClick={handleMobActive} to={'/contact'} >Contact us</Link></li>
                    </ul>
                    <div className='button-icon'>

                        <button
                            className="btn headerbtn position-relative"
                            onClick={() => setIsCartOpen(true)}
                        >
                            <ShoppingCart size={20} color="black" />
                            {items.length > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {items.length}
                                </span>
                            )}
                        </button>
                        {
                            token ? (
                                <Link
                                    to={'/user-profile'}
                                    className="btn headerbtn position-relative"
                                >
                                    <User size={20} color="black" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        to={'/login'}
                                        className="btn headerbtn position-relative"
                                    >
                                        <LogIn size={20} color="black" />
                                    </Link>
                                </>
                            )
                        }

                        <div onClick={handleMobActive} className="menu">
                            <i class="ri-menu-line"></i>
                        </div>
                    </div>

                    <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
                </div>
            </div>
        </div >
    )
}

export default Header
