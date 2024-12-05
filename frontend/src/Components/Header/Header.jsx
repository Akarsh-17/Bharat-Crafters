import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import './Header.css';
import logo from '../../Images/logo9.png'
import dropdownbutton from '../../Images/icons8-dropdown-30.png';
import SearchBar from '../SearchBar/SearchBar.jsx';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown.jsx';
import { Badge } from "@mui/material";
import {

    ShoppingCartOutlined,
    FavoriteBorderOutlined,

} from "@mui/icons-material";

const Header = () => {
    const navigate = useNavigate();
    const userLoggedIn = useSelector((state) => state.CurrentUser.CurrentUser)
    const [scrolled, setScrolled] = useState(false);
    const cart = useSelector((state) => state.Cart);
    const Wishlist = useSelector((state) => state.Wishlist.Wishlist);

    useEffect(() => {
        const Scroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', Scroll);
        return () => {
            window.removeEventListener('scroll', Scroll);
        };
    }, []);

    useEffect(() => {
        if (cart?.length >= 1) {
            console.log(cart?.length)
        }

    }, [cart])
    return (
        <>
            <div className="relative-navbar">

                <nav className={`custom-nav-class ${scrolled ? 'scrolled' : ''}`}>

                    <Link to="/" className='logo-link'><img src={logo} class="logo"></img></Link>
                    <SearchBar />

                    <div className="right-header-container">
                        {/*<div class="dropdown">
                            <button class="dropdown-button-header">En
                                <img src={dropdownbutton} class="dropdownicon"></img></button>
                            <div class="dropdown-content">
                                <a href="#" class="current-language">English - EN</a>
                                <hr class="language-section"></hr>
                                <a href="#" class="content">Hindi - HN</a>
                                <a href="#" class="content">Marathi - MR</a>
                                <a href="#" class="content">Bengali - BN</a>
                            </div>
                        </div>*/}


                        {userLoggedIn ? (<>
                            <div className="right-header-links-container">
                            <Link
                                    to="/orders"
                                    className='right-header-links'>
                                    <div className="right-header-button ">Orders & Returns</div>
                                </Link>

                                <Link to="/wishlist" style={{ textDecoration: 'none' }}
                                className='right-header-links'>
                                    
                                    <Badge badgeContent={Wishlist?.length} color="secondary" className='right-header-icon'>
                                    <FavoriteBorderOutlined/>
                                    </Badge>
                                    <div 
                                    className="right-header-button">Wishlist</div>
                                    </Link>
                               
                                <Link
                                    to="/cart"
                                    className='right-header-links'
                                    style={{ textDecoration: "none", color: "inherit" }}>
                                    <Badge badgeContent={cart?.products?.length} color="secondary"className='right-header-icon'>
                                        <ShoppingCartOutlined />
                                    </Badge>
                                    <div className="right-header-button">Cart</div>
                                </Link>
                            

                                {<ProfileDropdown />}
                            </div>

                        </>) : (<>
                            <Link to="/login" style={{ textDecoration: 'none' }}><div className="header-links header-login-button" >Login</div></Link>
                            <Link to="/signup" style={{ textDecoration: 'none' }}><div className="header-links header-signup-button" >Sign up</div></Link>
                            <Link to="https://bharat-crafters-seller.vercel.app" style={{ textDecoration: 'none' }}><div className="header-links header-signup-button" >Become Seller</div></Link>
                        </>)}
                    </div>
                </nav>
            </div>
        </>
    );

}

export default Header;
