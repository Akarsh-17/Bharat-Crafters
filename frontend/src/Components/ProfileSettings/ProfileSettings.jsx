import React, { useState } from 'react';
import './ProfileSettings.css';
import Header from '../Header/Header.jsx'
import editIcon from '../../Images/edit-text.png'
import logout from '../../operations/auth.js';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('Account Settings');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.CurrentUser.CurrentUser);

  const [userInfo, setUserInfo] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    country: '',
    phoneNumber: user.additionalDetail.phoneNumber,
  });
  const [editable, setEditable] = useState([]);
  const [isdisabled, setisdisabled] = useState(true);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const toggleEditable = (fieldName) => {
    if (editable.includes(fieldName)) {
      setEditable(editable.filter((field) => field !== fieldName));
      setisdisabled(true)

    } else {
      setEditable([...editable, fieldName]);
      setisdisabled(false);

    }
  };

  const handleSaveChanges = () => {
    // Implement save logic later after discussion 
  };

  const handleUpload = () => {
    // upload logic 
  };

  const handleDelete = () => {
    // delete logic
  };


  return (
    <>
      <Header />

      <div className="profile-settings-container">
        <h2 className="profile-setting-heading">Profile Settings</h2>
        <div className="profile-content">
          <ul className="profile-setting-lists">
            {['Account Settings', 'Change Password', 'Advanced Settings'].map((tab) => (
              <li
                key={tab}
                className={activeTab === tab ? 'active' : ''}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </li>
            ))}
          </ul>
          <div className="profile-user-information">
            <div className="profile-photo-change-container">
              <div className="profile-photo">
                <img src={user.image} alt="User Profile" />
              </div>
              <div className="photo-buttons">
                <button onClick={() => handleUpload} className='upload-new-photo'>Upload New Photo</button>
                <button onClick={() => handleDelete} className='delete-profile-photo'>Delete</button>
              </div>
            </div>
            <hr></hr>
            <div className="basic-user-info">
              <div className="custom-grid-user-field">
                <div className="user-info-field">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={userInfo.firstName}
                    onChange={() => handleInputChange}
                    disabled={!editable.includes('firstName')}
                    className='info-fields'
                  />
                  <img className="edit-icon" onClick={() => toggleEditable('firstName')} src={editIcon}></img>

                </div>
                <div className="user-info-field">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={userInfo.lastName}
                    onChange={() => handleInputChange}
                    disabled={!editable.includes('lastName')}
                    className='info-fields'

                  />
                  <img className="edit-icon" onClick={() => toggleEditable('lastName')} src={editIcon}></img>

                </div>
              </div>

              <div className="user-info-field">
                <label>Email</label>
                <div className="update-email-container">

                  <input
                    type="email"
                    name="email"
                    value={userInfo.email}
                    onChange={() => handleInputChange}
                    disabled={!editable.includes('email')}
                    className='info-fields'

                  />


                  <button className="update-email-button"
                    onClick={() => toggleEditable('email')}
                  >Update Email</button>
                  <p className='update-email-paragraph'>You will receive a confirmation after you update your email.</p>
                </div>
              </div>

              <div className="custom-grid-user-field">
                <div className="user-info-field">

                  <label>Country</label>
                  <input
                    type="text"
                    name="country"
                    value={userInfo.country}
                    onChange={() => handleInputChange}
                    disabled={!editable.includes('country')}
                    className='info-fields'

                  />
                  <img className="edit-icon" onClick={() => toggleEditable('country')} src={editIcon}></img>

                </div>
                <div className="user-info-field">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={userInfo.phoneNumber}
                    onChange={() => handleInputChange}
                    disabled={!editable.includes('phoneNumber')}
                    className='info-fields'
                  />
                  <img className="edit-icon" onClick={() => toggleEditable('phoneNumber')} src={editIcon}></img>


                </div>
              </div>

              <button onClick={() => handleSaveChanges} disabled={isdisabled} className='save-changes-button'>
                Save Changes
              </button>
            </div>
            <hr></hr>
            <div className="logout-container">
              <div className="logout-user-heading">Logout from your account</div>
              <button className="logout-user-button"
                onClick={()=>logout(dispatch, navigate)}
              >Logout</button>
            </div>

            <hr></hr>
            <div className="delete-account-container">
              <div className="delete-user-heading">Delete your account</div>
              <button className="delete-user-button">Delete</button>
              <p className='delete-user-paragraph'>This is permanent and connot be undone! Once you delete, you will need to create a new account to access Bharat Crafters.</p>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;
