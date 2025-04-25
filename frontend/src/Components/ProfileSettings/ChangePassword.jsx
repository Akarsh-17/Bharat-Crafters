import React, { useEffect, useRef, useState } from 'react'
import './message.css'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ChangePassword = () => {

    const BASE_URL = process.env.REACT_APP_API_URL
    const [passwordData, setpasswordData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',

    });

    const setNewPassword =async(passwordData)=>{
        try {
            const response = await axios.post(`${BASE_URL}/auth/buyerChangePassword`, 
             passwordData 
            , {
                withCredentials: true
            });

            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setpasswordData({
            ...passwordData,
            [name]: value
        });
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        console.log(passwordData);
        setNewPassword(passwordData);
        
    };

  return (
    <div className="change-password-container">
            <div className='change-password-header-container'>
        <div className="change-password-header">Change Password</div>
        <div className="password-length-mention">Must be atleast 8 characters</div>
    </div>
    <div className="change-password-body">
        <form onSubmit={handlePasswordSubmit}>
        <input className='input-passwords' 
        name="oldPassword"
        placeholder='Enter old Password'
        value={passwordData.oldPassword}
        onChange={handlePasswordChange}>
        </input>

        <input className='input-passwords' 
                name="newPassword"

        placeholder='Enter new Password'
        value={passwordData.newPassword}
        onChange={handlePasswordChange}>

        </input>

        <input className='input-passwords' 
                name="confirmPassword"

        placeholder='Confirm Password'
        value={passwordData.confirmPassword}
        onChange={handlePasswordChange}>
        </input>
        <button className='change-password-button'>Save Password</button>
        </form>
       


    </div>
    </div>

  )
}

export default ChangePassword
