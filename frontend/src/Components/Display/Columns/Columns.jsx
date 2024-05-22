import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Columns.css'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProductId } from '../../store/slices/ProductIdSlice';

const Columns = () => {

    // const [Box2Data, setBox2Data] = useState([]);

    // // /api/v1/product/khadiProducts

    // const getKhadiProducts = async () => {
    //     try {
    //       const Data = await axios.get(`http://localhost:4000/api/v1/product/khadiProducts`,
    //         { withCredentials: true });
    //       console.log("khadi",Data);
    
    //       setBox2Data(Data.data);
    
    
    //     } catch (error) {
    //       console.log(error.message);
    //     }
    //   };

    //   getKhadiProducts();
    //   console.log(Box2Data);

    return (
        <div className="asymetrical-columns">
            <div className="section1">
            <div class="box1">Ceramics starting at price</div>
            <div class="box2">Men Traditional Wear starting at this (2-4 items)</div>
            <div class="box3">Special Woodworks</div>
            </div>
        
            <div className="section2">
            <div class="box4">Seasonal Wear</div>
            <div class="box5">Womens traditional wear discount</div>
            </div>
        </div>

    )
}

export default Columns
