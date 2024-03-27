import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import logo from '../../Images/Screenshot 2024-03-23 001520.png'
import account from '../../Images/icons8-customer-50.png'
import cart from '../../Images/icons8-cart-50 (1).png'
import myorders from '../../Images/icons8-order-50 (1).png'
import wishlist from '../../Images/icons8-heart-50 (1).png'
import dropdownbutton from '../../Images/icons8-dropdown-30.png';
import SearchBar from '../SearchBar/SearchBar.jsx';


const showRightHeader = () => {

    const rightSlide = document.querySelector('.right-slide');
    rightSlide.style.visibility = "visible";
}


const Header = () => {

    return (
        <>
            <nav className="custom-nav-class" id="home" >

                <img src={logo} class="children logo" href="#home"></img>
                <SearchBar />

                <button class="navbar-toggler children" type="button" onClick={showRightHeader} >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="right-header">
                    <div className=" d-flex user-section">
                        <div class="dropdown">
                            <button class="dropdown-button-header">En
                                <img src={dropdownbutton} class="dropdownicon"></img></button>
                            <div class="dropdown-content">
                                <a href="#" class="current-language">English - EN</a>
                                <hr class="language-section"></hr>
                                <a href="#" class="content">Hindi - HN</a>
                                <a href="#" class="content">Marathi - MR</a>
                                <a href="#" class="content">Bengali - BN</a>
                            </div>
                        </div>
                        <Link className=" custom-title custom-small-font children" to="/user-account">Account<img src={account} class="small-logos"></img></Link>
                        <Link className=" custom-title custom-small-font children" to="/wishlist">Wishlist<img src={wishlist} class="small-logos"></img></Link>
                        <Link className=" custom-title custom-small-font children" to="/past-orders">Orders<img src={myorders} class="small-logos"></img></Link>
                        <Link className=" custom-title custom-small-font children" to="/cart">Cart<img src={cart} class="small-logo"></img></Link>
                    </div>
                </div>
                <div class="right-slide">
                    <ul class="right-nav-items">
                        <li type="none"><Link className="slide-in-text custom-small-font" to="/user-account">Account</Link></li>
                        <li type="none"><Link className="slide-in-text custom-small-font" to="/wishlist">Wishlist</Link></li>
                        <li type="none"><Link className="slide-in-text custom-small-font" to="/past-orders">Orders</Link></li>
                        <li type="none"><Link className="slide-in-text custom-small-font" to="/returns">Returns</Link></li>
                        <li type="none"><Link className="slide-in-text custom-small-font" to="/cart">Cart</Link></li>
                    </ul>

                </div>
            </nav>


        </>
    );

}

export default Header;
