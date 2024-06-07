import React, { useState, useEffect } from 'react'
import './Sections.css'
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setProductId } from '../../store/slices/ProductIdSlice';


const Sections = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sectionData, setsectionData] = useState({});
  const [loading, setLoading] = useState(true);



  const getnewArrivalsData = async () => {
    try {
      const Data = await axios.get(`https://bharat-crafters-backend.onrender.com/api/v1/product/newArrivals`,
        { withCredentials: true });
      console.log(Data);

      setsectionData(prevSectionData => ({
        ...prevSectionData,
        "New Arrivals": Data.data
      }));

    } catch (error) {
      console.log(error.message);
    }
  };

  const getMenData = async () => {
    try {
      const Data = await axios.get(`https://bharat-crafters-backend.onrender.com/api/v1/product/newMensArrivals`,
        { withCredentials: true });
      console.log("mens",Data);

      setsectionData(prevSectionData => ({
        ...prevSectionData,
        "New In Mens": Data.data
      }));


    } catch (error) {
      console.log(error.message);
    }
  };

  const getWomenData = async () => {
    try {
      const Data = await axios.get(`https://bharat-crafters-backend.onrender.com/api/v1/product/newWomensArrivals`,
        { withCredentials: true });
      console.log("womens",Data);

      setsectionData(prevSectionData => ({
        ...prevSectionData,
        "New In Womens": Data.data
      }));


    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    Promise.all([getnewArrivalsData(), getMenData(), getWomenData()]).then(() => {
      setLoading(false);
    }).catch((error) => {
      setLoading(false);
      console.log("Error fetching data:", error);
    });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }



  return (
    <div className="all-sections-container">
      {sectionData && Object.entries(sectionData).map(([sectionName, sectionProducts]) => (
      <div className="section-containers">
      <div className="section-header">{sectionName}</div>

      <div className="section-container">

        {sectionProducts && sectionProducts.length > 0 && sectionProducts.map((product, index) => {
          return (<div className="product-cards" key={product._id} onClick={() => {
            dispatch(setProductId(product._id));
            navigate(`/products/${product._id}`);
          }}>
            <div className="card-image-container">
              <img className="card-image" src={product.images[0]}></img>
            </div>
            <div className="card-name-and-price-container">
              <div className="card-header">{product.name}</div>
              <div className="card-description"><span>Starts at </span>Rs. {product.options[0].price}</div>
            </div>


          </div>)
        })}


      </div>

    </div>
    )
      
    )}
    
  
    </div>

  )
}

export default Sections
