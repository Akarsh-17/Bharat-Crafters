import React, { Children, useEffect, useState } from 'react';
import './SearchBar.css';
import searchbutton from '../../Images/icons8-search-30.png';
import dropdownbutton from '../../Images/icons8-dropdown-30.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setCategoryId } from '../store/slices/CategoryIdSlice.js';
import { setProductId } from '../store/slices/ProductIdSlice.js';

import { debounce } from 'lodash';



const SearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [CategoryDataArray, setCategoryDataArray] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [IsTyping, setIsTyping] = useState(false);

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

  const debouncedSearch = debounce(async (input) => {
    try {

      const response = await axios.get(`http://localhost:4000/api/v1/product/searchBar?q=${input}`);
      console.log("debounced");
      console.log(response.data.data);
      setSuggestions(response.data.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  }, 300);

  const handleChange = (event) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);
    setIsTyping(true);
    debouncedSearch(inputValue);
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
        <div className="input-container">
          <input
            className="search-input"
            type="text"
            placeholder="Search BharatCrafters"
            value={searchTerm}
            onChange={handleChange}
          />
          <button className="search-button" type="submit"><img src={searchbutton} alt="search icon" className='header-search-icon' /></button>
          <div className={`${(!IsTyping) ? 'display-none-container' : 'suggestion-container'}`} style={{ display: (!IsTyping && searchTerm === '') ? 'none' : '' }}>
            <ul>
              {suggestions && suggestions.length > 0 && suggestions.map((suggestion, index) => (
                <li key={suggestion._id}
                  onClick={() => {
                    dispatch(setProductId(suggestion._id));
                    navigate(`/products/${suggestion._id}`);
                    setIsTyping(false);

                  }}>{suggestion.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>



    </>
  );
};

export default SearchBar;
