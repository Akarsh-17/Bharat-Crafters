import React, { useEffect, useState } from 'react'
import './ProductDescriptionPage.css'
import Header from '../Header/Header'
import add_to_wishlist from '../../Images/heart.png'
import added_to_wishlist from '../../Images/heart (1).png'
import axios from 'axios';
import { useSelector } from 'react-redux';
import zoomIconImg from '../../Images/zoom-in.png'
import { useParams } from "react-router-dom"
import { setProductId } from '../store/reducers';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ProductDescriptionPage = () => {
    const dispatch=useDispatch()
    const navigate = useNavigate();
    
    const [ProductIdForAPI, setProductIdForAPI] = useState(0);
    const [ProductDetails, setProductDetails] = useState({});
    const [MainImage, setMainImage] = useState('');
    const [Wishlist, setWishlist] = useState([]);

    
    const { productId } = useParams()
    const ProductId = useSelector((state) => state.ProductId.ProductId);

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
    useEffect(()=>{
     dispatch(setProductId(productId))
    },[])
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
        // if(ProductDetails.images){
        //     setMainImage(ProductDetails.images[0]);
        // } 
        // console.log(MainImage);
    }, [ProductIdForAPI]);

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

    return (
        <>
            <Header />
            <div className="product-details-outer-container">
                <div className="product-photo-container">
                    <div className="product-photo-options">
                        {ProductDetails.images && ProductDetails.images.map((image, key) => (
                            <img src={image} alt="Product" className='product-photo-options-images' key={key}
                                onClick={(e) => { handleImageChange(e) }} />
                        ))}

                    </div>
                    <div className="product-display-image"
                    >
                        <img className={`zoom-icon-img  ${ZoomIcon ? 'zoomIconImgVisible' : ''}`} src={zoomIconImg}
                            onClick={(e) => {
                                handleZoomClick(MainImage ? MainImage : (ProductDetails.images && ProductDetails.images[0]));
                            }}
                        ></img>
                        {isZoomOverlayOpen && (
                            <div className="zoom-overlay"
                            onClick={()=>{handleCloseZoomOverlay()}}

                            >
                                <img className="zoomed-image" src={MainImage ? MainImage : (ProductDetails.images && ProductDetails.images[0])}
                                    onMouseMove={(e) => { handleOverlayMouseMove(e) }}
                                    alt="Zoomed"
                                    style={overlayZoomStyle} 
                                    onClick={()=>{handleCloseZoomOverlay()}}/>
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

                    <div className="product-main-details">
                        <div className="product-details">
                            <ul>
                                <li className='product-description-detail-list'>This consists of : {ProductDetails.components}</li>
                                <li className='product-description-detail-list'>Height : {ProductDetails.height}</li>
                                <li className='product-description-detail-list'>Width : {ProductDetails.width}</li>
                                <li className='product-description-detail-list'>Weight : {ProductDetails.weight}</li>
                                <li className='product-description-detail-list'>Shape : {ProductDetails.shape}</li>






                            </ul>
                        </div>
                    </div>
                    {/* <div className="product-ratings-container">
                    <div className="product-rating">4.5</div>
                    <div className="ratings-number">100 reviews</div>
                </div> */}
                    <div className="product-size-list">


                        {/* {ProductDetails.options && ProductDetails.options.map((option, key) => (
    <div key={key}>
        <div className="product-size-detail" key={option._id}>{option.color}</div>
    </div>
))} */}


                    </div>
                    <div className="product-price-detail">Rs. 200</div>
                    <div className="product-size-container">
                        <div className="select-size">Size Available</div>
                        <div className="product-size-list">


                            {ProductDetails.options && (
                                <>
                                    {Array.from(new Set(ProductDetails.options.map(option => option.size))).map((size, key) => (
                                        <div className="product-size-detail" key={key}>{size.charAt(0)}</div>
                                    ))}
                                </>
                            )}

                        </div>

                    </div>
                    <div className="product-buy-container">
                        <button className="add-product-to-bag">Add to Bag</button>
                        <button className="add-to-wishlist-button">Add to Wishlist</button>
                    </div>
                    <div className="product-reaching-date">Get it by Wed, 15 May</div>
                    <div className="product-seller">{`Seller: ${ProductDetails.seller && ProductDetails.seller.firstName} ${ProductDetails.seller && ProductDetails.seller.lastName}`}</div>
                </div>

            </div>
            <div className="product-description-container">
                <div className='product-detail-heading'>Product Details</div>
                <div className="product-description">{ProductDetails.description}</div>
                <ul className="product-description-list"><li><span className='product-list-heading'>Style : </span>{ProductDetails.style}</li>
                    <li><span className='product-list-heading'>Pattern : </span>{ProductDetails.pattern}</li>
                    <li><span className='product-list-heading'>Material : </span>{ProductDetails.material}</li>
                    <li><span className='product-list-heading'>Additional Deatils : </span><br></br>{ProductDetails.specialFeatures && ProductDetails.specialFeatures.map((feature, key) => (
                        <li>{feature}</li>

                    ))}</li>

                </ul>
            </div>

            <div className="more-products-like-this-section">
                <div className="more-products-like-this-heading">More Products like this</div>
                <div className="more-products-like-this-container">
                {ProductDetails.subCategory?.product?.map((product, key)=>(
                                                    <div className="product-card">
                                                    <div className="product-image-container">
                                                        {product.images.map((image, key) => (
                                                            <img
                                                                className={`product-image `}
                                                                src={image}
                                                               
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

                                            <select className="product-price">
                                                {product.options.map((option, key) => (
                                                    <option key={option._id}>{option.size.charAt(0)} - Rs. {option.price}</option>
                                                ))}
                                            </select>
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
