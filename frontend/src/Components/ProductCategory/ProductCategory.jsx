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
import { useParams } from "react-router-dom"
import { setCategoryId } from '../store/slices/CategoryIdSlice.js';

const ProductCategory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { categoryId } = useParams()
    const [Wishlist, setWishlist] = useState([]);
    const [CategoryIdForAPI, setCategoryIdForAPI] = useState(0);
    const [CategoryDetailsArray, setCategoryDetailsArray] = useState([]);
    const [SubCategoryDetailsArray, setSubCategoryDetailsArray] = useState([]);
    const [SubCategoryData, setSubCategoryData] = useState([]);
    const [SubCategoryDataExists, setSubCategoryDataExists] = useState(false);
    const [Filter, setFilter] = useState(false);
    const [isLoading, setisLoading] = useState(true);


    const CategoryId = useSelector((state) => state.CategoryId.CategoryId);
    // changes
    useEffect(() => {
        dispatch(setCategoryId(categoryId))
        //   check if required Akarsh has doubt 
        //   dispatch(setProductId(null))
    }, [])
    const handle_add_to_wishlist = (productId) => {
        if (Wishlist.includes(productId)) {
            setWishlist(Wishlist.filter((id) => id !== productId));
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
                                                            key={imageIndex}
                                                            className={`product-image ${imageIndex === hoveredImageIndex[product._id] ? 'product-image-hidden' : ''}`}
                                                            src={imageIndex === hoveredImageIndex[product._id] ? product.images[(imageIndex + 1) % product.images.length] : image}
                                                            onMouseEnter={() => { handleMouseEnter(product._id, imageIndex) }}
                                                            onMouseLeave={() => { handleMouseLeave(product._id) }}
                                                            onClick={() => {
                                                                dispatch(setProductId(product._id));
                                                                navigate(`/products/${product._id}`);
                                                            }}
                                                        />
                                                    ))}
                                                    <button className="add-to-wishlist-icon"
                                                        onClick={() => { handle_add_to_wishlist(product._id); }}>
                                                        <img src={isWishlisted(product._id) ? added_to_wishlist : add_to_wishlist} alt="wishlist"></img>
                                                    </button>
                                                </div>
                                                <div className="product-name-container">
                                                    <div className="product-name-and-price">
                                                        <div className="product-name-detail" key={product._id} onClick={() => {
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
                                        subcategory.product.map((product, productIndex) => (
                                            <div className="product-card" key={product._id}>
                                                <div className="product-image-container">
                                                    {product.images.map((image, imageIndex) => (
                                                        <img
                                                            key={imageIndex}
                                                            className={`product-image ${imageIndex === hoveredImageIndex[product._id] ? 'product-image-hidden' : ''}`}
                                                            src={imageIndex === hoveredImageIndex[product._id] ? product.images[(imageIndex + 1) % product.images.length] : image}
                                                            onMouseEnter={() => { handleMouseEnter(product._id, imageIndex) }}
                                                            onMouseLeave={() => { handleMouseLeave(product._id) }}
                                                            onClick={() => {
                                                                dispatch(setProductId(product._id));
                                                                navigate(`/products/${product._id}`);
                                                            }}
                                                        />
                                                    ))}
                                                    <button className="add-to-wishlist-icon"
                                                        onClick={() => { handle_add_to_wishlist(product._id); }}>
                                                        <img src={isWishlisted(product._id) ? added_to_wishlist : add_to_wishlist} alt="wishlist"></img>
                                                    </button>
                                                </div>
                                                <div className="product-name-container">
                                                    <div className="product-name-and-price">
                                                        <div className="product-name-detail" key={product._id} onClick={() => {
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