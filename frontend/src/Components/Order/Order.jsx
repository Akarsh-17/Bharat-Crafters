import React, { useEffect, useState } from 'react'
import Header from '../Header/Header';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { setProductId } from '../store/slices/ProductIdSlice';
import './Order.css'
import { addToCart } from '../store/slices/cartSlice';
import toast from 'react-hot-toast'



const Order = () => {
  const [PastOrders, setPastOrders] = useState([]);
  const navigate= useNavigate();
  const dispatch= useDispatch();
  const buyer=useSelector((state)=>state.CurrentUser.CurrentUser);
  const loginCart = () => toast("Login to add product to Cart.");

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/v1/auth/getPuchasedProducts', { withCredentials: true })
        console.log(res.data.data);
        setPastOrders(res.data.data);
      }
      catch (error) {
        console.log("error in fetching past orders", error)
      }
    }
    getOrders()
  }, []);


  const addProductToCart=(product,selectedOption,selectedColor,selectedPrice,selectedSize, selectedQuantity)=>{
    if(!buyer)
    {
      loginCart();
      return;
    }
    dispatch(
      addToCart({
          ...product,
          selectedOption: {
            _id: selectedOption
        },          
        selectedColor,
          selectedPrice,
          selectedSize,
          selectedQuantity,
      })
    )
  }

  return (
    <>
      <Header />
      <div className="orders-outer-container">
        <div className="orders-heading-container">
          <div className="orders-heading">Past Orders</div>
        </div>
        <div className="orders-container">
          {(PastOrders?.length === 0) ? (
            <div>No past orders found</div>
          ) : (
            <>
              {PastOrders && 
                PastOrders?.filter(order => order.paymentStatus.toLowerCase() === 'paid').map((order, orderIndex) => (
                  <div className="order-card" key={order.orderId}>
                    <div className="order-details-container">
                      <div className="order-details-section">
                      <div className="order-date">
                        <span>Order Placed: </span>
                        <br></br>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                      <div className="order-price">
                        <span>Total: </span>
                        <br></br>
                        Rs. {order.totalAmount}
                      </div>
                      <div className="payment-status">
                        <span>Payment Status: </span>
                        <br></br>{order.paymentStatus.toUpperCase()}
                      </div>
                      </div>
                      <div className='order-details-section'>
                      <div className="order-id">
                        <span>Order ID: </span>
                        {order.orderId}
                      </div>
                    
                      </div>

                    </div>
                    <div className="order-products-container">
                      {order.productList.map((product, productIndex) => (
                        <div className="order-product" key={product.productInfo._id}>
                          <img
                            className="order-product-image"
                            src={product.productInfo.images[0]} 
                            onClick={() => {
                              dispatch(setProductId(product.productInfo._id));
                              navigate(`/products/${product.productInfo._id}`);
                            }}
                          />
                          <div className='order-product-group'>
                          <div className="order-product-info">
                            <div
                              className="order-product-name"
                              onClick={() => {
                                dispatch(setProductId(product.productInfo._id));
                                navigate(`/products/${product.productInfo._id}`);
                              }}
                            >
                              {product.productInfo.name} <span className='order-product-brand'>  By {product.productInfo.brand}</span>
                            </div>
                            <span className="order-product-price">
                              Rs. {product.selectedPrice}
                            </span>
                            <br></br>

                            <span className="order-product-detail">
                              Quantity - {product.selectedQuantity}
                            </span>
                            
                            <div className='order-product-details'>

                            <span className="order-product-detail">
                              Size - {product.selectedSize}
                            </span>

                            <span className="order-product-detail">
                              Color - {product.selectedColor}
                            </span>
                            </div>

                          </div>
                          <div className="order-product-status">{product.orderStatus}</div>
                        </div>
                        </div>
                      ))}

                    </div>
                    <button
                      className="reorder-button"
                      onClick={() => {
                        order.productList.forEach((product) => {
                          addProductToCart(
                            product.productInfo,
                            product.selectedOption,
                            product.selectedColor,
                            product.selectedPrice,
                            product.selectedSize,
                            product.selectedQuantity

                          );
                        });

                        
                        toast.success('Added to Cart');
                      }}                  
                      >
                      Reorder
                    </button>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
    </>
  );

}

export default Order