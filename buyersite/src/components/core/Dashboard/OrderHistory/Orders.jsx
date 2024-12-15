import React, { useEffect } from "react";
import { apiConnector } from "../../../../services/apiConnector";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import './Order.css'
import BillGenerator from "./BillGenerator";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Orders = () => {
  const [sellerOrders, setSellerOrders] = useState([]);

  const [PastOrders, setPastOrders] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const seller = useSelector((state) => state.auth.currentUser);
  const loginCart = () => toast.error("Login to add product to Cart.");
  
  const [printModal,setPrintModal]= useState(false)
 

  useEffect(() => {
    const getOrders = async () => {
      try {
        if (!seller) {
          loginCart();
          return <Navigate to="/dashboard/my-profile" />;
        }
        const url = BASE_URL + `/auth/getSellerOrders`;
        const res = await apiConnector("GET", url, {}, {}, {});
        console.log(res.data.data);
        setPastOrders(res.data.data);
      } catch (error) {
        console.log("error in fetching past orders", error);
      }
    };
    getOrders();
  }, []);

  const handlePrint = (order) => {
    setPrintModal({
      name: order.buyer.firstName,
      billNo: order.orderId,
      date: order.createdAt,
      seller: seller.firstName,
      items: order.selectedPro,
      btn2Handler:()=>setPrintModal(null)
      // Add any other necessary information here
    });
  };
  


  return (
    <>
      <div className="orders-outer-container">
        <div className="orders-heading-container">
          <div className="orders-heading"> Orders</div>
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
                      {/* <div className="order-price">
                        <span>Total: </span>
                        <br></br>
                        Rs. {order.totalAmount}
                      </div> */}
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
                      {order?.selectedPro?.map((product, productIndex) => (
                        <div className="order-product" key={product._id}>
                          <img
                            className="order-product-image"
                            src={product.productInfo.images[0]} 
                            onClick={() => {
                              // dispatch(setProductId(product.productInfo._id));
                              // navigate(`/products/${product.productInfo._id}`);
                            }}
                          />
                          <div className='order-product-group'>
                          <div className="order-product-info">
                            <div
                              className="order-product-name"
                              onClick={() => {
                                // dispatch(setProductId(product.productInfo._id));
                                // navigate(`/products/${product.productInfo._id}`);
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
                      onClick={() => handlePrint(order)}               
                      >
                      Get Bill
                    </button>
                  </div>
                ))}
            </>
          )}
        </div>
      </div>
      {printModal && <BillGenerator billData={printModal}/>}
    </>
  );
};

export default Orders;
