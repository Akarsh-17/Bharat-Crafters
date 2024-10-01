import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import './Header.css';
import logo from '../../Images/logo9.png'
import account from '../../Images/icons8-customer-50.png'
import cart from '../../Images/icons8-cart-50 (1).png'
import myorders from '../../Images/icons8-order-50 (1).png'
import wishlist from '../../Images/icons8-heart-50 (1).png'
import dropdownbutton from '../../Images/icons8-dropdown-30.png';
import SearchBar from '../SearchBar/SearchBar.jsx';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown.jsx';
import { Badge } from "@mui/material";
import {
    // FavoriteBorder,
    // Search,
    // ShoppingBagOutlined,
    ShoppingCartOutlined,
  } from "@mui/icons-material";


// const showRightHeader = () => {

//     const rightSlide = document.querySelector('.right-slide');
//     rightSlide.style.visibility = "visible";
// }


const Header = () => {
    const navigate = useNavigate();
    const userLoggedIn = useSelector((state) => state.CurrentUser.CurrentUser)
    const [scrolled, setScrolled] = useState(false);
    const cart = useSelector((state) => state.Cart);
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

   useEffect(()=>{
    if(cart?.length>=1)
        {
         console.log(cart?.length)
        }     

   },[cart])
    return (
        <>
        <div className="relative-navbar">

        <nav className={`custom-nav-class ${scrolled ? 'scrolled' : ''}`}>

<Link to="/" className='logo-link'><img src={logo} class="logo"></img></Link>
<SearchBar/>

{/* <button class="navbar-toggler" type="button" onClick={showRightHeader} >
    <span className="navbar-toggler-icon"></span>
</button> */}

<div className="right-header-container">
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


    {userLoggedIn ? (<>
        <div className="right-header-links-container">

            <Link to="/wishlist" style={{ textDecoration: 'none' }}><div className="right-header-links" ><img className="right-header-icon" src={wishlist}></img><div className="right-header-button">Wishlist</div></div></Link>
            {/* <Link to="/cart" style={{ textDecoration: 'none' }}>
               <Badge badgeContent={Cart?.length} color="secondary">
                <div className="right-header-links " >
                    <img className="right-header-icon" src={cart}></img>
                    <div className="right-header-button"></div>
                    Cart
                </div>
                </Badge>
            </Link> */}
            <Link
                to="/cart"
                style={{ textDecoration: "none", color: "inherit" }}>
                <Badge badgeContent={cart?.products?.length} color="secondary">
                  <ShoppingCartOutlined />
                </Badge>
              </Link>
            {<ProfileDropdown />}
        </div>

    </>) : (<>
        <Link to="/login" style={{ textDecoration: 'none' }}><div className="right-header-links header-login-button" >Login</div></Link>
        <Link to="/signup" style={{ textDecoration: 'none' }}><div className="right-header-links header-signup-button" >Sign up</div></Link>
        <Link to="https://bharat-crafters-seller.vercel.app" style={{ textDecoration: 'none' }}><div className="right-header-links header-signup-button" >Become Seller</div></Link>
    </>)}



</div>
{/* <div class="right-slide">
    <ul class="right-nav-items">
        <li type="none"><Link className="slide-in-text custom-small-font" to="/user-account">Account</Link></li>
        <li type="none"><Link className="slide-in-text custom-small-font" to="/wishlist">Wishlist</Link></li>
        <li type="none"><Link className="slide-in-text custom-small-font" to="/past-orders">Orders</Link></li>
        <li type="none"><Link className="slide-in-text custom-small-font" to="/returns">Returns</Link></li>
        <li type="none"><Link className="slide-in-text custom-small-font" to="/cart">Cart</Link></li>
    </ul>

</div> */}
</nav>


        </div>
            


        </>
    );

}

export default Header;
