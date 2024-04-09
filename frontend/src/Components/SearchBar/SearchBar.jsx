import React, { useState } from 'react';
import './SearchBar.css';
import searchbutton from '../../Images/icons8-search-30.png';
import dropdownbutton from '../../Images/icons8-dropdown-30.png';

const SearchBar = ({ onSearch }) => {
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

  return (
    <>
    <div className="search-bar-container">
    <div className="dropdown-category">
        <button className="category-select-button" onClick={handleDropdown}>All <img src={dropdownbutton} className="dropdownicon" alt="dropdown icon" /></button>
        {showDropdown && (
          <div className="dropdown-category-content">
            <a href="#" class="content">Men essentials</a>
            <a href="#" class="content">Women essentials</a>
            <a href="#" class="content">Home & Living</a>
            <a href="#" class="content">Handicrafts</a>
            <a href="#" class="content">Beauty</a>
            <a href="#" class="content">Lifestyle and clothing</a>
            <a href="#" class="content">Books</a>
            <a href="#" class="content">Appliances</a>

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

        <button className="search-button" type="submit"><img src={searchbutton} alt="search icon" className='header-search-icon'/></button>
    </div>

    </>
  );
};

export default SearchBar;
