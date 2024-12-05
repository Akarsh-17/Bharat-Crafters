
import React, { useEffect, useState } from 'react'
import './Wishlist.css';
import Header from '../Header/Header';
import close_button from '../../Images/close.png'
import removeFromWishlist from '../../Images/dislike.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setProductId } from '../store/slices/ProductIdSlice.js';
import { clearWishlist, removeWishlistProduct, setWishlistProduct } from '../store/slices/WishlistSlice.js'
import { addToCart } from '../store/slices/cartSlice.js';
import toast from 'react-hot-toast'

import {

    ShoppingCartOutlined,

} from "@mui/icons-material";

const Wishlist = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [WishlistData, setWishlistData] = useState(null);
    const [WishlistEmpty, setWishlistEmpty] = useState(false);
    const Wishlist = useSelector((state) => state.Wishlist.Wishlist);
    console.log(Wishlist)
    const loginCart = () => toast("Login to add product to Cart.");
    const buyer = useSelector((state) => state.CurrentUser.CurrentUser)



    useEffect(() => {
        // if (Wishlist && Wishlist.length> 0) {
        //     setWishlistData(Wishlist);
        // }
        // else {
        //     setWishlistEmpty(true);
        // }
        const backendupdate = async () => {
            await axios.post('http://localhost:4000/api/v1/auth/buyerWishList', { buyerWishlist: Wishlist }, { withCredentials: true })
                .then((res) => {
                    console.log("wishilist for user ", res)
                })
                .catch((error) => {
                    console.log("error for buyer wishlist", error)
                })
        }
        backendupdate()
    }, [Wishlist]);


    const handle_remove_from_wishlist = async (product) => {
        dispatch(setWishlistProduct(product));
        // if(Wishlist.length===0){
        //     setWishlistEmpty(true);
        // }
        // await axios.post('http://localhost:4000/api/v1/auth/buyerWishList',{buyerWishlist:Wishlist},{withCredentials:true})
        // .then((res)=>{
        //     console.log("wishilist for user ",res)
        // })
        // .catch((error)=>{
        //     console.log("error for buyer wishlist",error)
        // })
    }

    const updateWishlist = async () => {
        await axios.post('http://localhost:4000/api/v1/auth/buyerWishList',{buyerWishlist:Wishlist},{withCredentials:true})
        .then((res)=>{
            console.log("update wishilist for user ",res)
        })
        .catch((error)=>{
            console.log("error in updating wishlist",error)
        })
    }

    const addProductToCart = (product, selectedOption, selectedColor, selectedPrice, selectedSize) => {
        if (!buyer) {
            loginCart();
            return;
        }
        dispatch(
            addToCart({
                ...product,
                selectedOption: {
                    _id: selectedOption?._id, //selectedOption should have an _id so that there is no problem in controller
                },
                selectedColor: selectedColor[0],
                selectedPrice,
                selectedSize,
                selectedQuantity: 1,
            })
        )
        dispatch(removeWishlistProduct(product._id));

        updateWishlist();
    }

    return (
        <>
            <Header />
            <div className="wishlist-outer-container">
                <div className="wishlist-heading-container">
                    <div className="wishlist-heading">Wishlist</div>
                    <div className="wishlist-filter-container">

                    </div>
                    <button className="add-all-to-bag"
                        onClick={() => {
                            Wishlist?.forEach((product) => {
                                addProductToCart(product, product.options[0]._id, product.options[0].color, product.options[0].price, product.options[0].size);
                            });
                            toast("Added to Cart");
                        }}
                    >Move all to Bag</button>
                </div>
                <div className="wishlist-container">

                    {(Wishlist?.length === 0) ?
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
                                            <button className="add-to-cart-icon" onClick={() =>
                                                addProductToCart(
                                                    product,
                                                    product.options[0], // First option as selectedOption
                                                    product.options[0]?.color[0], // First color of the first option
                                                    product.options[0]?.price, // Price of the first option
                                                    product.options[0]?.size // Size of the first option
                                                )
                                            }
                                            >Add <ShoppingCartOutlined height={"16px"}
                                                width={"16px"}
                                                    className="cart-icon" /> </button>
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
