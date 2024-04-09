import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './BottomHeader.css';
import dropdownbutton from '../../Images/icons8-dropdown-30.png'

const BottomHeader = () => {
  return (
    <div className="container">
      <div className="container-content">
        <Link className="subsection">New Arrivals</Link>
        <Link className="subsection">Best Sellers</Link>
        <Link className="subsection">Best Prices</Link>
        <Link className="subsection">Avail Coupons</Link>
        <Link className="subsection">Gift Ideas</Link>
        <Link className="subsection">Frequently visited</Link>
        <Link className="subsection">Customer Service</Link>
        <Link className="subsection">Become a Seller</Link>

      </div>
    </div>
  )
}

export default BottomHeader
