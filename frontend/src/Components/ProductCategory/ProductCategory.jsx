import './ProductCategory.css'
import React, { useEffect, useState } from 'react'
import add_to_wishlist from '../../Images/heart.png'
import added_to_wishlist from '../../Images/heart (1).png'
import close_button from '../../Images/close.png'
import category_search_icon from '../../Images/icons8-search-30.png'
import PriceSlider from '../Sliders/PriceSlider.jsx'
import Header from '../Header/Header.jsx'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setProductId } from '../store/slices/ProductIdSlice.js';
import { setWishlistProduct, removeWishlistProduct } from '../store/slices/WishlistSlice.js'
import { useParams } from "react-router-dom"
import { setCategoryId } from '../store/slices/CategoryIdSlice.js';
import toast from 'react-hot-toast'

const ProductCategory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { categoryId } = useParams()
    // const [Wishlist, setWishlist] = useState([]);
    const [CategoryIdForAPI, setCategoryIdForAPI] = useState(0);
    const [CategoryDetailsArray, setCategoryDetailsArray] = useState([]);
    const [SubCategoryDetailsArray, setSubCategoryDetailsArray] = useState([]);
    const [SubCategoryData, setSubCategoryData] = useState([]);
    const [SubCategoryDataExists, setSubCategoryDataExists] = useState(false);
    const [Filter, setFilter] = useState(false);
    const [isLoading, setisLoading] = useState(true);


    const CategoryId = useSelector((state) => state.CategoryId.CategoryId);
    const buyerWishlist=useSelector((state)=>state.Wishlist.Wishlist)
    const CurrentUser=useSelector((state)=>state.CurrentUser.CurrentUser)

    // changes
    useEffect(() => {
        dispatch(setCategoryId(categoryId))
        //   check if required Akarsh has doubt 
        //   dispatch(setProductId(null))
    }, [])

    useEffect(() => {
        console.log("updating redux in effect ", buyerWishlist);
        const backendupdate=async ()=>{
        await axios.post('http://localhost:4000/api/v1/auth/buyerWishList',{buyerWishlist},{withCredentials:true})
        .then((res)=>{
            console.log("wishilist for user ",res)
        })
        .catch((error)=>{
            console.log("error for buyer wishlist",error)
        })
       }
       backendupdate()
    }, [buyerWishlist]);

    const handle_add_Towishlist=async(product)=>{
        if(CurrentUser ===null)
        {
            return toast.error("user not logged in")
        }
        dispatch(setWishlistProduct(product))

        // console.log("upating redux",buyerWishlist)
        

    }


    // const handle_add_to_wishlist = async(product) => {
    //     if(CurrentUser ===null)
    //     {
    //        return toast.error("user not logged in")
    //     }
    //     console.log(product);
    //     console.log("buyerWishlist ",buyerWishlist)
    //     const productId= product._id;
    //     dispatch(setWishlistProduct(product))
    //     // if (Wishlist.includes(productId)) {
    //     //     setWishlist(Wishlist.filter((id) => id !== productId));
    //     //     dispatch(removeWishlistProduct(productId)); 
    //     // }
    //     // else {
    //     //     setWishlist([...Wishlist, productId]);
    //     //     dispatch(setWishlistProduct(product));
    //     //     //saveWishlistedProduct(product);
    //     // }
    //     console.log("updating redux ",buyerWishlist)
    //     await axios.post('http://localhost:4000/api/v1/auth/buyerWishList',{buyerWishlist},{withCredentials:true})
    //     .then((res)=>{
    //         console.log("wishilist for user ",res)
    //     })
    //     .catch((error)=>{
    //         console.log("error for buyer wishlist",error)
    //     })
    // }

    // const isWishlisted = (productId) => {
    //     return buyerWishlist.includes(productId);
    // };

    const isWishlisted = (productId) => {
        return buyerWishlist.some(product => product._id === productId);
    };
    const [Price, setPrice] = useState(2000);


    const handlePrice = (event, newPrice) => {
        console.log("hello")
        setPrice(newPrice);
    };

    const [hoveredImageIndex, setHoveredImageIndex] = useState({});

    const handleMouseEnter = (productIndex, imageIndex) => {

        setHoveredImageIndex((prevIndex) => ({
            ...prevIndex,
            [productIndex]: imageIndex
        }));

    };

    const handleMouseLeave = (productIndex, imageIndex) => {
        setHoveredImageIndex((prevIndex) => ({
            ...prevIndex,
            [productIndex]: imageIndex
        }));
    };

    // const handleMouseUp = async (Price) => {
    //     try {
    //       const response = await axios.get(`http://localhost:4000/api/v1/category/filterPriceCategory/${categoryId}`,{
    //         maxPrice:"600"
    //       },{withCredentials:true});
    
    //       console.log(response.data);
    //     } catch (error) {
    //       console.error(error);
    //     }
    // };


    const getCategoryData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/category/categoryPageDetails/${CategoryIdForAPI}`, {
                withCredentials: true
            });
            const subCategoryDetails = response.data.data.selectedCategory.subCategory;
            setSubCategoryDetailsArray(subCategoryDetails);

            const categoryDetails = response.data.data.selectedCategory;

            console.log(categoryDetails);

            setCategoryDetailsArray(categoryDetails);
            setisLoading(false);

        } catch (error) {
            console.error(error);
        }
    };

    const getSubcategory = async (SubCategoryIdForAPI) => {

        try {
            const response = await axios.get(`http://localhost:4000/api/v1/category/subCategoryPageDetails/${SubCategoryIdForAPI}`, {
                withCredentials: true
            });
            const subCategoryDetails = response.data.data;

            setSubCategoryData(subCategoryDetails);

            console.log(subCategoryDetails);

            setSubCategoryDataExists(true);
            setFilter(true);


        } catch (error) {
            console.error(error);
        }
    }

    // const saveWishlistedProduct= async (product)=>{
    //     try {
    //         const response = await axios.post(`http://localhost:4000/api/v1/auth/buyerWishList`, product, {
    //             withCredentials: true
    //         });
    //         console.log(response);

    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    const handleRemoveFilter = () => {
        setFilter(false);
        setSubCategoryDataExists(false);
    }



    useEffect(() => {
        if (CategoryId !== undefined) {
            setCategoryIdForAPI(CategoryId);
        }
    }, [CategoryId]);

    useEffect(() => {
        getCategoryData();
    }, [CategoryIdForAPI]);


    function renderSkeletons(count) {
        const skeletons = [];
        for (let i = 0; i < count; i++) {
            skeletons.push(<div key={i} className="product-card-empty"></div>);
        }

        return skeletons;
    }


    return (
        <>
            <Header />


            {/* For loading */}
            {(isLoading) ? <>
                <div className='product-category-container'>
                    <div className="product-filter-empty-container">
                    </div>
                    <div className="product-display-container">
                        <div className="product-category-empty-heading"></div>

                        <div className="product-empty-container">
                            {renderSkeletons(8)}

                        </div>
                    </div>

                </div>
            </> :

                <>

                    {/* When loading finishes */}
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
                                    <div className="sub-category-heading">SUBCATEGORIES</div>
                                    <img className="sub-category-search-button" src={category_search_icon}></img>

                                </div>
                                <ul className='sub-category-name'>
                                    {SubCategoryDetailsArray.length > 0 && SubCategoryDetailsArray.map((subcategory, key) => (
                                        <li onClick={() => {
                                            getSubcategory(subcategory._id);
                                        }}>{subcategory.name}</li>
                                    ))}
                                </ul>
                            </div>
                            <hr></hr>
                            <div className="price-range-container">
                                <div className="price-range-heading">
                                    PRICE

                                </div>
                                <PriceSlider value={Price} onChange={handlePrice} />
                                {/* <PriceSlider value={Price} onChange={handlePrice} onMouseUp={handleMouseUp(Price)}/> */}
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

                            {/* if subcategory filter is applied, only then this code will work */}

                            {(SubCategoryDataExists) ? <>
                                <div className="product-category-heading">{SubCategoryData.name}</div>
                                {(Filter) ? <div className="filter-applied-container">
                                    <div className="filter-name">{SubCategoryData.name}</div>
                                    <img className="filter-remove-icon" src={close_button}
                                        onClick={() => { handleRemoveFilter() }}></img>
                                </div> : ''}
                                <div className="product-container">

                                    {
                                        SubCategoryData.product.length > 0 && SubCategoryData.product.map((product, productIndex) => (
                                            <div className="product-card" key={product._id}>
                                                <div className="product-image-container">
                                                    {product.images.map((image, imageIndex) => (
                                                        <img
                                                        onClick={() => {
                                                            dispatch(setProductId(product._id));
                                                            navigate(`/products/${product._id}`);
                                                        }}
                                                            key={imageIndex}
                                                            className={`product-image ${imageIndex === hoveredImageIndex[product._id] ? 'product-image-hidden' : ''}`}
                                                            src={imageIndex === hoveredImageIndex[product._id] ? product.images[(imageIndex + 1) % product.images.length] : image}
                                                            onMouseEnter={() => { handleMouseEnter(product._id, imageIndex) }}
                                                            onMouseLeave={() => { handleMouseLeave(product._id) }}
                                                        />
                                                    ))}
                                                    <button className="add-to-wishlist-icon"
                                                        onClick={() => { handle_add_Towishlist(product); }}>
                                                        <img src={isWishlisted(product._id) ? added_to_wishlist : add_to_wishlist} alt="wishlist"></img>
                                                    </button>
                                                </div>
                                                <div className="product-name-container">
                                                    <div className="product-name-and-price">
                                                        <div className="product-name-detail" key={product._id}
                                                         onClick={() => {
                                                            dispatch(setProductId(product._id));
                                                            navigate(`/products/${product._id}`);
                                                        }}
                                                        >{product.name}</div>


                                                        <div className="product-price">
                                                            <span>Starts at </span> Rs. {product.options[0].price}
                                                        </div>
                                                        {/* <select className="product-price">
                                                            {product.options.map((option, key) => (
                                                                <option key={option._id}>{option.size.charAt(0)} - Rs. {option.price}</option>
                                                            ))}
                                                        </select> */}

                                                    </div>
                                                    <div className="add-to-cart-icon">Add + </div>
                                                </div>
                                            </div>
                                        ))
                                    }



                                </div></> : <>

                                {/* this is the code for category data */}

                                <div className="product-category-heading">{CategoryDetailsArray.name}</div>
                                {/* <div className="filter-applied-container">
                            <div className="filter-name">XL</div>
                            <img className="filter-remove-icon" src={close_button}></img>
                        </div> */}
                                <div className="product-container">

                                    {SubCategoryDetailsArray.length > 0 && SubCategoryDetailsArray.map((subcategory, key) => (
                                        subcategory.product.map((product) => (
                                            <div className="product-card" key={product._id}
                                            >
                                                <div className="product-image-container">
                                                    {product.images.map((image, imageIndex) => (
                                                        <img
                                                        onClick={() => {
                                                            dispatch(setProductId(product._id));
                                                            navigate(`/products/${product._id}`);
                                                        }}
                                                            key={imageIndex}
                                                            className={`product-image ${imageIndex === hoveredImageIndex[product._id] ? 'product-image-hidden' : ''}`}
                                                            src={imageIndex === hoveredImageIndex[product._id] ? product.images[(imageIndex + 1) % product.images.length] : image}
                                                            onMouseEnter={() => { handleMouseEnter(product._id, imageIndex) }}
                                                            onMouseLeave={() => { handleMouseLeave(product._id) }}
                                                        
                                                        />
                                                    ))}
                                                    <button className="add-to-wishlist-icon"
                                                        onClick={() => { handle_add_Towishlist(product); }}>
                                                        <img src={isWishlisted(product._id) ? added_to_wishlist : add_to_wishlist} alt="wishlist"></img>
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

                                                        {/* <select className="product-price">
                                                            {product.options.map((option, key) => (
                                                                <option key={option._id}>{option.size.charAt(0)} - Rs. {option.price}</option>
                                                            ))}
                                                        </select> */}
                                                    </div>
                                                    <div className="add-to-cart-icon">Add + </div>
                                                </div>
                                            </div>
                                        ))
                                    ))}



                                </div></>}


                        </div>


                    </div>

                </>}
        </>
    )
}

export default ProductCategory









{/* <hr></hr>
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
                    </div> */}