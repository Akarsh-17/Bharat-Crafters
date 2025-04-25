import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Columns.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProductId } from '../../store/slices/ProductIdSlice';

const Columns = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [Box1Data, setBox1Data] = useState([]);
  const [Box2Data, setBox2Data] = useState([]);
  const [Box3Data, setBox3Data] = useState([]);
  const [Box4Data, setBox4Data] = useState([]);
  const [Box5Data, setBox5Data] = useState([]);
  const BASE_URL = process.env.REACT_APP_API_URL
  const getKhadiProducts = async () => {
    try {
      const Data = await axios.get(`${BASE_URL}/product/khadiProduct`, { withCredentials: true });
      setBox2Data(Data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getWoodworkProducts = async () => {
    try {
      const Data = await axios.get(`${BASE_URL}/product/woodworkProduct`, { withCredentials: true });
      setBox1Data(Data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getBambooProducts = async () => {
    try {
      const Data = await axios.get(`${BASE_URL}/product/bambooCraftProduct`, { withCredentials: true });
      setBox3Data(Data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getKurtaPyjamas = async () => {
    try {
      const Data = await axios.get(`${BASE_URL}/product/kurtaPyjamas`, { withCredentials: true });
      setBox4Data(Data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const getDresses = async () => {
    try {
      const Data = await axios.get(`${BASE_URL}/product/Dresses`, { withCredentials: true });
      setBox5Data(Data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getKhadiProducts();
    getWoodworkProducts();
    getBambooProducts();
    getKurtaPyjamas();
    getDresses();
  }, []);

  const handleImageClick = (productId) => {
    dispatch(setProductId(productId)); // Dispatch product ID to Redux store
    navigate(`/products/${productId}`); // Navigate to the product route
  };

  return (
    <>
      <div className="asymetrical-columns">
        <div className="section1">
          <div className="box1">
            <span>New in {Box1Data?.subCategory?.name}</span>
            {Box1Data.products && Box1Data.products.length > 0 && (
              <div className="product-box" onClick={() => handleImageClick(Box1Data.products[0]._id)}>
                <img src={Box1Data.products[0].images[0]} alt="Ceramics" className="box-image" />
              </div>
            )}
          </div>

          <div className="box2">
            <span>{Box2Data?.subCategory?.name}</span>
            {Box2Data.products && Box2Data.products.length > 0 && (
              <div className="box2-grid">
                {Box2Data.products.map((product, index) => (
                  <div
                    key={index}
                    className="box2-item"
                    onClick={() => handleImageClick(product._id)}
                  >
                    <img src={product.images[0]} alt={`Product ${index}`} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="box3">
            <span>{Box3Data?.subCategory?.name}</span>
            {Box3Data.products && Box3Data.products.length > 0 && (
              <div className="product-box" onClick={() => handleImageClick(Box3Data.products[0]._id)}>
                <img src={Box3Data.products[0].images[0]} alt="Bamboo Crafts" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Columns;
