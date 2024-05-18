import React, { useRef, useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import logout from '../../operations/auth.js';
import './ProfileDropdown.css';
import toast from 'react-hot-toast';


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
        {/* <svg className="icon-caret-down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 16L6 8h12l-6 8z" />
        </svg> */}
      </div>
      {open && (
        <div
          className="dropdown-menu"
          ref={ref}
          onClick={(e) => e.stopPropagation()}
        >
          <Link class="dashboard-header-link" to="/settings/my-profile" onClick={() => setOpen(false)}>
            <div className="dropdown-item">
              {/* <svg className="icon-dashboard" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z" />
              </svg> */}
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
            {/* <svg className="icon-logout" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 13v-2H7V8l-5 4 5 4v-3h9zM20 2H4c-1.1 0-2 .9-2 2v4h2V4h16v16H4v-4H2v4c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg> */}
            LogOut
          </div>
        </div>
      )}
    </button>
  );
};

export default ProfileDropdown;
