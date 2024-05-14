import React, { useEffect, useState } from 'react'
import './ProductDescriptionPage.css'
import Header from '../Header/Header'
import axios from 'axios';
import { useSelector } from 'react-redux';

const ProductDescriptionPage = () => {

    const [ProductIdForAPI, setProductIdForAPI] = useState(0);
    const [ProductDetails, setProductDetails] = useState({});
    const [MainImage, setMainImage] = useState('');

    const ProductId = useSelector((state) => state.ProductId.ProductId);


    const getProductData = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/api/v1/product/getFullProductDetails/${ProductIdForAPI}`, {
                withCredentials: true
            });
            

            const productData= response.data.data;
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
        // if(ProductDetails.options){
        //     setselectedSize(ProductDetails.options[0].size);
        //     setselectedPrice(ProductDetails.options[0].price);
        //     setselectedColor(ProductDetails.options[0].color);
        // }
        // console.log(MainImage);
    }, [ProductIdForAPI]);
    
    return (
        <>
        <Header/>
        <div className="product-details-outer-container">
            <div className="product-photo-container">
                <div className="product-photo-options">
                {ProductDetails.images && ProductDetails.images.map((image, key)=>(
    <img src={image} alt="Product" className='product-photo-options-images' key={key} 
    onClick={handleImageChange}/>
))}

                </div>
                <div className="product-display-image">
                    <img src={ProductDetails.images && ProductDetails.images[0]} alt="Product" className='product-display-image-photo'/>
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
                        <li><span className='product-list-heading'>Additional Deatils : </span><br></br>{ProductDetails.specialFeatures && ProductDetails.specialFeatures.map((feature,key)=>(
                        <li>{feature}</li>

                        ))}</li>

                        </ul>
        </div>
       
        </>
    );
}

export default ProductDescriptionPage;
