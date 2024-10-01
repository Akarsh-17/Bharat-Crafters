
import React, { useEffect, useState } from 'react'
import './Wishlist.css';
import Header from '../Header/Header';
import close_button from '../../Images/close.png'
import removeFromWishlist from '../../Images/dislike.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch , useSelector} from 'react-redux';
import { setProductId } from '../store/slices/ProductIdSlice.js';
import {removeWishlistProduct, setWishlistProduct} from '../store/slices/WishlistSlice.js'


const Wishlist = () => {
    const navigate= useNavigate()
    const dispatch= useDispatch()
    const [WishlistData, setWishlistData] = useState(null);
    const [WishlistEmpty, setWishlistEmpty] = useState(false);
    const Wishlist = useSelector((state) => state.Wishlist.Wishlist);



    useEffect(() => {
        console.log("hell")
        // if (Wishlist && Wishlist.length> 0) {
        //     setWishlistData(Wishlist);
        // }
        console.log("hel)")
        // else {
        //     setWishlistEmpty(true);
        // }
        const backendupdate=async ()=>{
            await axios.post('http://localhost:4000/api/v1/auth/buyerWishList',{buyerWishlist:Wishlist},{withCredentials:true})
            .then((res)=>{
                console.log("wishilist for user ",res)
            })
            .catch((error)=>{
                console.log("error for buyer wishlist",error)
            })
           }
        backendupdate()
    }, [Wishlist]);


    const handle_remove_from_wishlist = async (product)=>{
        console.log("red 1",Wishlist)
        dispatch(setWishlistProduct(product));
        console.log("red 2",Wishlist)
        // if(Wishlist.length===0){
        //     setWishlistEmpty(true);
        // }
        console.log("updating redux ",Wishlist)
        // await axios.post('http://localhost:4000/api/v1/auth/buyerWishList',{buyerWishlist:Wishlist},{withCredentials:true})
        // .then((res)=>{
        //     console.log("wishilist for user ",res)
        // })
        // .catch((error)=>{
        //     console.log("error for buyer wishlist",error)
        // })
    }

    return (
        <>
            <Header />
            <div className="wishlist-outer-container">
                <div className="wishlist-heading-container">
                    <div className="wishlist-heading">Wishlist</div>
                    <div className="wishlist-filter-container">
                        {/* <div className="filter-applied-container">
                            <div className="filter-name">XL</div>
                            <img className="filter-remove-icon" src={close_button}></img>
                        </div> */}

                    </div>
                    <button className="add-all-to-bag">Move all to Bag</button>
                </div>
                <div className="wishlist-container">
                    
                    {(Wishlist?.length===0) ?
                        <div>No products in wishlist</div>
                        :
                        <>
                            {
                                Wishlist && Wishlist.map((product, productIndex) => (
                                    <div className="wishlist-product-card" key={product._id}>
                                        <div className="product-image-container">
                                            <img
                                                                        onClick={() => {
                                            dispatch(setProductId(product._id));
                                            navigate(`/products/${product._id}`);
                                        }}
                                                    className='product-image'
                                                    src={product?.images[0]}
                                                 
                                                />
                                            <button className="remove-from-wishlist-icon"
                                                onClick={() => { handle_remove_from_wishlist(product); }}
                                                >
                                                <img src={removeFromWishlist}></img>
                                            </button>
                                        </div>
                                        <div className="product-name-container">
                                            <div className="product-name-and-price">
                                                <div className="product-name-detail" key={product._id}
                                onClick={() => {
                                                dispatch(setProductId(product._id));
                                                navigate(`/products/${product._id}`);
                                            }}>{product.name}</div>


                                                <div className="product-price">
                                                    <span>Starts at </span> Rs. {product.options[0].price}
                                                </div>
                                             

                                            </div>
                                            <div className="add-to-cart-icon">Add + </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                    }

                </div>
            </div>

        </>
    );
};

export default Wishlist;
