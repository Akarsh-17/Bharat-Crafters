import React, { useRef, useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logout from '../../operations/auth.js';
import './ProfileDropdown.css';
import toast from 'react-hot-toast';
import logoutIcon from '../../Images/logout.png'
import settingsICons from '../../Images/settings.png'


const ProfileDropdown = () => {
  const user = useSelector((state) => state.CurrentUser.CurrentUser);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();



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
              logout(dispatch, navigate);
              setOpen(false);
              toast.success('User logged out successfully');
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