import './ProductCategory.css'
import React, { useState } from 'react'
import add_to_wishlist from '../../Images/heart.png'
import added_to_wishlist from '../../Images/heart (1).png'
import close_button from '../../Images/close.png'
import category_search_icon from '../../Images/icons8-search-30.png'
import PriceSlider from '../Sliders/PriceSlider.jsx'
import Header from '../Header/Header.jsx'


const ProductCategory = () => {

    const [Wishlist, setWishlist]= useState([]);

    const handle_add_to_wishlist = (productId) => {
        if (Wishlist.includes(productId)) {
            setWishlist(Wishlist.filter((id)=>id!==productId));
        }
        else {
            setWishlist([...Wishlist, productId]);
        }
    }

    const isWishlisted = (productId) => {
        return Wishlist.includes(productId);
    };

    const [Price, setPrice] = useState(2000);
  

    const handlePrice = (event, newPrice) => {
        setPrice(newPrice);
    };
    

    return (
        <>
        <Header/>
            <div className="page-path-container">Home / Clothing / Women</div>
            <div className='product-category-container'>

                <div className="product-filter-container">
                    <div className="filter-heading-container">
                        <div className="filter-heading">FILTERS</div>
                        <div className="clear-all-filters">CLEAR ALL</div>
                    </div>
                    <hr></hr>
                    <div className="sub-category-container">
                        <div className="sub-category-heading-container">
                            <div className="sub-category-heading">CATEGORIES</div>
                            <img className="sub-category-search-button" src={category_search_icon}></img>

                        </div>
                        <ul className='sub-category-name'>
                            <li>Subcategory name</li>
                            <li>Subcategory name</li>
                            <li>Subcategory name</li>
                            <li>Subcategory name</li>
                            <li>Subcategory name</li>
                            <li>Subcategory name</li>
                        </ul>
                    </div>
<hr></hr>
                    <div className="price-range-container">
                        <div className="price-range-heading">
                            PRICE

                        </div>
                        <PriceSlider value={Price} onChange={handlePrice}/>
                    </div>
<hr></hr>
                    <div className="filter-color-option-container">
                        <div className="color-option-heading">COLORS</div>
                        <div className="color-option-container">
                            <div className="color-box">
                                <div className="color"></div>
                                <div className="color-name">Red</div>
                            </div>
                            <div className="color-box">
                                <div className="color"></div>
                                <div className="color-name">Red</div>
                            </div>
                            <div className="color-box">
                                <div className="color"></div>
                                <div className="color-name">Red</div>
                            </div>
                            <div className="color-box">
                                <div className="color"></div>
                                <div className="color-name">Red</div>
                            </div>
                            <div className="color-box">
                                <div className="color"></div>
                                <div className="color-name">Red</div>
                            </div>
                            <div className="color-box">
                                <div className="color"></div>
                                <div className="color-name">Red</div>
                            </div>
                        </div>
                    </div>
<hr></hr>
                    <div className="filter-size-option-container">
                        <div className="size-option-heading">SIZE</div>
                        <div className="size-option-container">
                            <div className="size-box">XXS</div>
                            <div className="size-box">S</div>
                            <div className="size-box">M</div>
                            <div className="size-box">L</div>
                            <div className="size-box">XL</div>
                            <div className="size-box">XXL</div>

                        </div>
                    </div>
                </div>
                <div className="product-display-container">
                    <div className="product-category-heading">Women Clothing</div>
                    <div className="filter-applied-container">
                        <div className="filter-name">XL</div>
                        <img className="filter-remove-icon" src={close_button}></img>
                    </div>
                    <div className="product-container">
                        <div className="product-card">
                            <div className="product-image">
                                <button className="add-to-wishlist-icon" id='1'
                                    onClick={() => {
                                        handle_add_to_wishlist('1');}}>  
                                <img src={isWishlisted('1') ? added_to_wishlist : add_to_wishlist}></img>                         
                                </button>
                            </div>
                            <div className="product-name-container">
                                <div className="product-name-and-price">
                                    <div className="product-name">Red shirt</div>
                                    <div className="product-price">Rs. 1200</div>
                                </div>
                                <div className="add-to-cart-icon">Add + </div>
                            </div>
                        </div>

                        <div className="product-card">
                            <div className="product-image">
                                <button className="add-to-wishlist-icon" id='2'
                                    onClick={() => {
                                        handle_add_to_wishlist('2');
                                    }}>
                         <img src={isWishlisted('2') ? added_to_wishlist : add_to_wishlist}></img>
                                    </button>
                            </div>
                            <div className="product-name-container">
                                <div className="product-name-and-price">
                                    <div className="product-name">Red shirt</div>
                                    <div className="product-price">Rs. 1200</div>
                                </div>
                                <div className="add-to-cart-icon">Add + </div>
                            </div>
                        </div>


                        <div className="product-card" >
                            <div className="product-image">
                                <button className="add-to-wishlist-icon" id='3'
                                    onClick={() => {
                                        handle_add_to_wishlist('3');
                                    }
                                    }>
                             <img src={isWishlisted('3') ? added_to_wishlist : add_to_wishlist}></img>
                                </button>
                            </div>
                            <div className="product-name-container">
                                <div className="product-name-and-price">
                                    <div className="product-name">Red shirt</div>
                                    <div className="product-price">Rs. 1200</div>
                                </div>
                                <div className="add-to-cart-icon">Add + </div>
                            </div>
                        </div>


                        <div className="product-card">
                            <div className="product-image">
                                <button className="add-to-wishlist-icon" id='4'
                                    onClick={() => {
                                        handle_add_to_wishlist('4');
                                    }
                                    }>
 <img src={isWishlisted('4') ? added_to_wishlist : add_to_wishlist}></img>                                </button>
                            </div>
                            <div className="product-name-container">
                                <div className="product-name-and-price">
                                    <div className="product-name">Red shirt</div>
                                    <div className="product-price">Rs. 1200</div>
                                </div>
                                <div className="add-to-cart-icon">Add + </div>
                            </div>
                        </div>


                        <div className="product-card">
                            <div className="product-image">
                                <button className="add-to-wishlist-icon" id='5'
                                    onClick={() => {
                                        handle_add_to_wishlist('5');
                                    }
                                    }>
 <img src={isWishlisted('5') ? added_to_wishlist : add_to_wishlist}></img>                                </button>
                            </div>
                            <div className="product-name-container">
                                <div className="product-name-and-price">
                                    <div className="product-name">Red shirt</div>
                                    <div className="product-price">Rs. 1200</div>
                                </div>
                                <div className="add-to-cart-icon">Add + </div>
                            </div>
                        </div>


                    </div>

                </div>


            </div>
        </>
    )
}

export default ProductCategory
