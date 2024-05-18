import React, { useEffect, useState } from 'react';
import './SearchBar.css';
import searchbutton from '../../Images/icons8-search-30.png';
import dropdownbutton from '../../Images/icons8-dropdown-30.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCategoryId } from '../store/slices/CategoryIdSlice.js';




const SearchBar = ({ onSearch }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [CategoryDataArray, setCategoryDataArray] = useState([]);

  const getCategoriesData = async () => {
    try {
      const CategoryData = await axios.get(`http://localhost:4000/api/v1/category/showAllCategories`,
        { withCredentials: true });
        console.log(CategoryData);

      setCategoryDataArray(CategoryData.data.allCategories);

    } catch (error) {
      console.log(error.message);
    }
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };


  useEffect(() => {
    getCategoriesData();

  }, []);




  return (
    <>
      <div className="search-bar-container">
        <div className="dropdown-category">
          <button className="category-select-button" onClick={handleDropdown}>All <img src={dropdownbutton} className="dropdownicon" alt="dropdown icon" /></button>
          {showDropdown && (
            <div className="dropdown-category-content">
              {CategoryDataArray.map((category, key) => (
                <>
                <button className="content" key={key}
                  onClick={() => {
                    dispatch(setCategoryId(category._id));
                    navigate(`/category/${category._id}`);
                  }}>
                  {category.name}
                </button>
                <hr class="apparel-section-hr"></hr>
                </>
              ))}
            </div>
          )}
        </div>

        <input
          className="search-input"
          type="text"
          placeholder="Search BharatCrafters"
          value={searchTerm}
          onChange={handleChange}
        />

        <button className="search-button" type="submit"><img src={searchbutton} alt="search icon" className='header-search-icon' /></button>
      </div>

    </>
  );
};

export default SearchBar;
