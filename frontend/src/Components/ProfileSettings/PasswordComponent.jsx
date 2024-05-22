
import React, { useState, useEffect } from 'react';
import './ProfileSettings.css';
import Header from '../Header/Header';
import { sidebarLinks } from './link';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import ChangePassword from './ChangePassword';

const PasswordComponent= () => {
  const [activeTab, setActiveTab] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Set the initial active tab based on the current route
    sidebarLinks.forEach((tab) => {
      if (matchPath({ path: tab.path }, location.pathname)) {
        setActiveTab(tab.name);
      }
    });
  }, [location.pathname]);

  const handleTabClick = (tab) => {
    if (matchPath({ path: tab.path }, location.pathname)) {
      setActiveTab(tab.name);
    }
    navigate(tab.path);
  };

  return (
    <>
      <Header />
      <div className="profile-settings-container">
        <h2 className="profile-setting-heading">Profile Settings</h2>
        <div className="profile-content">
          <ul className="profile-setting-lists">
            {sidebarLinks.map((tab) => (
              <li
                key={tab.id}
                className={activeTab === tab.name ? 'active' : ''}
                onClick={() => handleTabClick(tab)}
              >
                {tab.name}
              </li>
            ))}
          </ul>
              <ChangePassword/>
        </div>

      </div>    
    </>
  );
}


export default PasswordComponent