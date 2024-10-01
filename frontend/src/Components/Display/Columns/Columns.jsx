import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Columns.css'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProductId } from '../../store/slices/ProductIdSlice';

const Columns = () => {

    const dispatch= useDispatch();
    const navigate= useNavigate();

    const [Box1Data, setBox1Data] = useState([]);

    const [Box2Data, setBox2Data] = useState([]);
    const [Box3Data, setBox3Data] = useState([]);
    const [Box4Data, setBox4Data] = useState([]);
    const [Box5Data, setBox5Data] = useState([]);




    // // /api/v1/product/khadiProduct
    // /woodworkProduct

    const getKhadiProducts = async () => {
        try {
            const Data = await axios.get(`http://localhost:4000/api/v1/product/khadiProduct`,
                { withCredentials: true });

            console.log(Data.data)
            setBox2Data(Data.data);


        } catch (error) {
            console.log(error.message);
        }
    };

    const getWoodworkProducts = async () => {
        try {
            const Data = await axios.get(`http://localhost:4000/api/v1/product/woodworkProduct`,
                { withCredentials: true });

            setBox1Data(Data.data);


        } catch (error) {
            console.log(error.message);
        }
    };

    const getBambooProducts = async () => {
        try {
            const Data = await axios.get(`http://localhost:4000/api/v1/product/bambooCraftProduct`,
                { withCredentials: true });

            setBox3Data(Data.data);


        } catch (error) {
            console.log(error.message);
        }
    };

    const getKurtaPyjamas = async () => {
        try {
            const Data = await axios.get(`http://localhost:4000/api/v1/product/kurtaPyjamas`,
                { withCredentials: true });

            setBox4Data(Data.data);


        } catch (error) {
            console.log(error.message);
        }
    };

    const getDresses = async () => {
        try {
            const Data = await axios.get(`http://localhost:4000/api/v1/product/Dresses`,
                { withCredentials: true });

                console.log(Data.data)
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


    


    return (

        

        <>
        <div className="asymetrical-columns">
            <div className="section1">
                <div class="box1"
              >
                <span>See more in {Box1Data?.subCategory?.name}</span>

                    {Box1Data.products && Box1Data.products.length > 0 && (
                    <div className="product-box">
                    <img src={Box1Data.products[0].images[0]} alt="Ceramics" className='box-image'/>
                        </div>
                    )}
                </div>

                <div className="box2">
                <span>New in {Box2Data?.subCategory?.name}</span>

                    {Box2Data.products && Box2Data.products.length > 0 && (
                        <div className="box2-grid">
                            
                            {Box2Data.products.map((product, index) => (
                                <>
                                <div key={index} className="box2-item">
                                    <img src={product.images[0]} alt={`Product ${index}`} />
                                </div>
                                                                    </>

                            ))}
                        </div>
                    )}
                </div>
                <div class="box3"> 
                <span>{Box3Data?.subCategory?.name}</span>
                {Box3Data.products && Box3Data.products.length > 0 && (
                    <>                         
                    <div className="product-box">
                    <img src={Box3Data.products[0].images[0]} alt="Ceramics"/>
                        </div>
                    </>
                    
                    )}</div>
            </div>

            {/* <div className="section2">
            <div className="box4">
                    {Box4Data.products && Box4Data.products.length > 0 && (
                        <div className="box2-grid">
                            {Box4Data.products.map((product, index) => (
                                <div key={index} className="box2-item">
                                    <img src={product.images[0]} alt={`Product ${index}`} />
                                    <span>{product.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            
            </div> */}
        </div>

        </>

    )
}

export default Columns
