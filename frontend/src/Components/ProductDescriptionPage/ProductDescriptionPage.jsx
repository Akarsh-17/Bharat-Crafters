import React, { useEffect, useState } from 'react'
import './ProductDescriptionPage.css'
import Header from '../Header/Header'
import add_to_wishlist from '../../Images/heart.png'
import added_to_wishlist from '../../Images/heart (1).png'
import axios from 'axios';
import { useSelector } from 'react-redux';
import zoomIconImg from '../../Images/zoom-in.png'
import { useHref, useParams } from "react-router-dom"
import { setProductId } from '../store/slices/ProductIdSlice.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import sendMessageIcon from '../../Images/paper-plane (1).png'
import toast from 'react-hot-toast'



const ProductDescriptionPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [ProductIdForAPI, setProductIdForAPI] = useState(0);
    const [ProductDetails, setProductDetails] = useState({});
    const [MainImage, setMainImage] = useState('');
    const [Wishlist, setWishlist] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState(null);
    const [SelectedPrice, setSelectedPrice] = useState(null);
    const [SelectedSize, setSelectedSize] = useState(null);
    const [SelectedColor, setSelectedColor] = useState(null);



    const { productId } = useParams()
    const ProductId = useSelector((state) => state.ProductId.ProductId);
    const buyer=useSelector((state)=>state.CurrentUser.CurrentUser)

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

    // changes
    useEffect(() => {
        dispatch(setProductId(productId))
    }, [])

    const getProductData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/product/getFullProductDetails/${ProductIdForAPI}`, {
                withCredentials: true
            });
            console.log(response)
            // changes
            const productData = response?.data?.data?.productDetails;
            setProductDetails(productData);
            console.log(productData);
            setisLoading(false);


        } catch (error) {
            console.error(error);
        }
    };



    const handleImageChange = (e) => {
        const target = e.target;
        if (target.src) {
            setMainImage(target.src);
        }
    }



    useEffect(() => {
        if (ProductId !== undefined) {
            setProductIdForAPI(ProductId);
        }
    }, [ProductId]);

    useEffect(() => {
        getProductData();
    }, [ProductIdForAPI]);

    useEffect(() => {
        if (ProductDetails && ProductDetails.options && ProductDetails.options.length > 0) {
            window.scrollTo(0, 0);
            setSelectedPrice(ProductDetails.options[0].price);
            setSelectedSize(ProductDetails.options[0].size);
            setSelectedColor(ProductDetails.options[0].color);
        }

    }, [ProductDetails]);

    const [zoomStyle, setZoomStyle] = useState(null);
    const [overlayZoomStyle, setoverlayZoomStyle] = useState(null);
    const [ZoomIcon, setZoomIcon] = useState(false);
    const [zoomedImage, setZoomedImage] = useState(null);
    const [isZoomOverlayOpen, setIsZoomOverlayOpen] = useState(false);

    const handleZoomClick = (zoomedimage) => {

        setZoomedImage(zoomedimage);

        setIsZoomOverlayOpen(true);
    };

    const handleCloseZoomOverlay = () => {
        setIsZoomOverlayOpen(false);
    };


    const handleMouseMove = (e) => {
        const container = e.currentTarget;
        const containerRect = container.getBoundingClientRect();

        // Calculate the cursor position relative to the container
        const x = (e.clientX - containerRect.left) / containerRect.width;
        const y = (e.clientY - containerRect.top) / containerRect.height;

        const zoom = 1.4;
        const offsetX = ((containerRect.width * zoom) - containerRect.width) / 2;
        const offsetY = ((containerRect.height * zoom) - containerRect.height) / 2;


        setZoomStyle({
            transform: `scale(${zoom})`,
            marginLeft: `${-offsetX + (containerRect.width * zoom - containerRect.width) * x}px`,
            marginTop: `${-offsetY + (containerRect.height * zoom - containerRect.height) * y}px`,
        });

    };

    const handleOverlayMouseMove = (e) => {
        const container = e.currentTarget;
        const containerRect = container.getBoundingClientRect();

        // Calculate the cursor position relative to the container
        const y = (e.clientY - containerRect.top) / containerRect.height;

        const zoom = 1.2;
        const offsetY = ((containerRect.height * zoom) - containerRect.height) / 2;


        setoverlayZoomStyle({
            transform: `scale(${zoom})`,
            marginTop: `${-offsetY + (containerRect.height * zoom - containerRect.height) * y}px`,
        });

    };


    const handleMouseLeave = () => {
        setZoomStyle(null);
    };

    const handleSelectedPrice = (option) => {
        setSelectedOption(option);
        setSelectedSize(option.size);
        setSelectedPrice(option.price);
        setSelectedColor(option.color);
    };

    function renderSkeletons(count) {
        const skeletons = [];
        for (let i = 0; i < count; i++) {
            skeletons.push(<div key={i} className="product-photo-options-images loadingEffects"></div>);
        }

        return skeletons;
    }
    
    const handleMessageSubmit=async(product)=>{
        console.log(product)
        if(buyer)
        {
            const groupTitle=product._id + buyer._id
            const sellerId=product.seller._id
            axios.post(`http://localhost:4000/api/v1/conversation/create-new-conversation`,{groupTitle,sellerId},
            {
                withCredentials: true
            })
            .then((res) => {
                toast.success("room generated");
                navigate(`/messages?${res.data.conversation._id}`);
              })
              .catch((error) => {
                toast.error(error.response.data.message);
            });
        }
        else{
            toast.error("Please login for conversation")
        }
    }
   
    return (
        <>
            <Header />
            <div className="product-details-outer-container" id="product-detail-page">
                <div className="product-photo-container">

                    <div className="product-photo-options">
                        {isLoading ?
                            renderSkeletons(4)
                            : <>
                                {ProductDetails.images && ProductDetails.images.map((image, key) => (
                                    <img src={image} alt="Product" className='product-photo-options-images' key={key}
                                        onClick={(e) => { handleImageChange(e) }} />
                                ))}
                            </>}


                    </div>
                    <div className={` ${isLoading ? "loadingEffects" : 'product-display-image'}`}>
                        <img className={`zoom-icon-img  ${ZoomIcon ? 'zoomIconImgVisible' : ''}`} src={zoomIconImg}
                            onClick={(e) => {
                                handleZoomClick(MainImage ? MainImage : (ProductDetails.images && ProductDetails.images[0]));
                            }}
                        ></img>
                        {isZoomOverlayOpen && (
                            <div className="zoom-overlay"
                                onClick={() => { handleCloseZoomOverlay() }}

                            >
                                <img className="zoomed-image" src={MainImage ? MainImage : (ProductDetails.images && ProductDetails.images[0])}
                                    onMouseMove={(e) => { handleOverlayMouseMove(e) }}
                                    alt="Zoomed"
                                    style={overlayZoomStyle}
                                    onClick={() => { handleCloseZoomOverlay() }} />
                            </div>
                        )}

                        <img src={(MainImage) ? MainImage : ProductDetails.images && ProductDetails.images[0]} alt="Product" className='product-display-image-photo'
                            onMouseMove={(e) => {
                                handleMouseMove(e)
                            }}
                            onClick={(e) => {
                                handleZoomClick(MainImage ? MainImage : (ProductDetails.images && ProductDetails.images[0]));
                            }}
                            onMouseEnter={() => { setZoomIcon(true) }}

                            onMouseLeave={(e) => {
                                handleMouseLeave(e);
                                setZoomIcon(false);
                            }}
                            style={zoomStyle} />
                    </div>
                </div>
                <div className="product-details-container">
                    <div className="product-name">{ProductDetails.name}</div>
                    <div className='product-brand-details'>{ProductDetails.brand}</div>
                    <div className="starts-at">Starts at</div>
                    <div className="product-price-detail">Rs. {SelectedPrice}</div>
                    <div className="product-size-container">
                        <div className="select-size">Options Available</div>
                        <div className="product-size-list">

                            {ProductDetails?.options && (
                                <>

                                    {ProductDetails.options.map((option) => (

                                        <>

                                            <div key={option}
                                                className={`product-size-detail ${(selectedOption === option) ? 'selected-option-class' : ''}`}
                                                onClick={() => handleSelectedPrice(option)}>
                                                <div className="product-price-option">Rs. {option.price}</div>
                                                {/* <div className="product-custom-grid"> <div className="product-size-option">{option.size.charAt(0).toUpperCase()}</div>
                                                    <div className="product-color-option" style={{ backgroundColor: `${option.color}` }}></div></div> */}
                                                <div className="product-size-option">{option.size.charAt(0).toUpperCase()} - {option.color}</div>





                                            </div>



                                        </>

                                    ))}
                                </>
                            )}
                        </div>
                    </div>

                    <div className="product-main-details">
                        <div className="product-details">
                            <ul>
                                <li className='product-description-detail-list'>This consists of : {ProductDetails.components}</li>
                                <li className='product-description-detail-list'>Color : {SelectedColor}</li>
                                <li className='product-description-detail-list'>Size : {SelectedSize}</li>
                                <li className='product-description-detail-list'>Height : {ProductDetails.height}</li>
                                <li className='product-description-detail-list'>Width : {ProductDetails.width}</li>
                                <li className='product-description-detail-list'>Weight : {ProductDetails.weight}</li>
                                <li className='product-description-detail-list'>Shape : {ProductDetails.shape}</li>

                            </ul>
                        </div>
                    </div>

                    <div className="product-buy-container">
                        <button className="add-product-to-bag">Add to Bag</button>
                        <button className="add-to-wishlist-button">Add to Wishlist</button>
                    </div>
                    <div className="product-seller-container">
                        <div>Seller - <span class="product-seller">{ProductDetails.seller && ProductDetails.seller.firstName} {ProductDetails.seller && ProductDetails.seller.lastName}</span></div>
                        <button className='send-a-message' onClick={()=>handleMessageSubmit(ProductDetails)}><img src={sendMessageIcon} className='send-message-icon'></img>Message</button>
                    </div>
                    <div className="product-reaching-date">Get it by Wed, 15 May</div>
                </div>

            </div>
            <div className="product-description-container">
                <div className='product-detail-heading'>Product Details</div>
                <div className="product-description">{ProductDetails.description}</div>
                <ul className="product-description-list"><li><span className='product-list-heading'>Style : </span>{ProductDetails.style}</li>
                    <li><span className='product-list-heading'>Pattern : </span>{ProductDetails.pattern}</li>
                    <li><span className='product-list-heading'>Material : </span>{ProductDetails.material}</li>
                    <li><span className='product-list-heading'>Additional Details : </span><br></br>{ProductDetails.specialFeatures && ProductDetails.specialFeatures.map((feature, key) => (
                        <li>{feature}</li>

                    ))}</li>

                </ul>
            </div>

            <div className="more-products-like-this-section">
                <div className="more-products-like-this-heading">More Products like this</div>
                <div className="more-products-like-this-container">
                    {ProductDetails.subCategory?.product?.map((product, key) => (
                        <div className="product-card"
                        onClick={() => {
                            dispatch(setProductId(product._id));
                            navigate(`/products/${product._id}`);
                        }}>
                            <div className="product-image-container">
                                {product.images.map((image, key) => (
                                    <img
                                        className={`product-image `}
                                        src={image}
                                    />
                                ))}
                                <button className="add-to-wishlist-icon"
                                    onClick={() => { handle_add_to_wishlist(product._id); }}>
                                    <img src={isWishlisted(product._id) ? added_to_wishlist : add_to_wishlist} alt="wishlist"></img>
                                </button>
                            </div>

                            <div className="product-name-container">
                                <div className="product-name-and-price">
                                    <div className="product-name-detail" key={product._id}>{product.name}</div>

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
                    ))}
                </div>

            </div>


        </>
    );
}

export default ProductDescriptionPage;
