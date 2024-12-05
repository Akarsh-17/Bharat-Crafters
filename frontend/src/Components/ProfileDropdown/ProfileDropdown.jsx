import React, { useRef, useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {logout} from '../../operations/auth.js';
import './ProfileDropdown.css';
import '../Header/Header.css'
import toast from 'react-hot-toast';
import logoutIcon from '../../Images/logout.png'
import settingsICons from '../../Images/settings.png'


const ProfileDropdown = () => {
  const user = useSelector((state) => state.CurrentUser.CurrentUser);
  const Wishlist=useSelector((state)=>state.Wishlist)
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart=useSelector((state)=>state.Cart)

  const cartProduct=cart?.products?.map((product)=>{
    const obj={
      productInfo:product?._id,
      selectedOption:product?.selectedOption?._id,
      selectedSize:product?.selectedSize,
      selectedColor:product?.selectedColor,
      selectedPrice:product?.selectedPrice,
      selectedQuantity:product?.selectedQuantity
    }
    return obj;
  })


  return (
    <button className="profile-dropdown right-header-links" onClick={() => (open)?setOpen(false): setOpen(true)}>
      <div className="profile-info">
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="profile-image"
        />
        
      </div>
      {open && (
        <div
          className="dropdown-menu"
          ref={ref}
          onClick={(e) => e.stopPropagation()}
        >
          <Link class="dashboard-header-link" to="/settings/my-profile" onClick={() => setOpen(false)}>
            <div className="dropdown-item">
              <img src={settingsICons} className='profile-dropdown-icons'></img>
              Profile Settings
            </div>
          </Link>
          <div
            className="dropdown-item"
            onClick={() => {
        
              logout(dispatch, navigate,cartProduct,cart?.cartSummary,Wishlist);
              setOpen(false);
              toast.success('User logged out successfully');
              navigate('/login');
            }}
          >
            <img src={logoutIcon} className='profile-dropdown-icons'></img>

            LogOut
          </div>
        </div>
      )}
    </button>
  );
};

export default ProfileDropdown;
