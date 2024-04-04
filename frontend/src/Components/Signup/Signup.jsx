import React, { useState } from 'react';
import logo from '../../Images/Screenshot 2024-03-23 001520.png';
import axios from 'axios';
import './Signup.css'
import Select from 'react-select';

function SignUp() {

    //API ROUTE

    const sendFormData = async (formData) => {
        axios.post(`http://localhost:4000/api/v1/auth/signupSeller`, formData)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    };

    //USESTATE FRO INPUT FIELDS

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneCode: '',
        phoneNumber: '',
        otp: '',

    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    //SUBMITING INPUT FIELD VALUES

    const handleSubmit = (e) => {
        e.preventDefault();
        sendFormData();
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
            phoneCode: '',
            phoneNumber: '',
            otp: '',
        });
    };

    //PHONE-CODE VALUES

    const countryOptions = [
        { value: '+1', label: '+1 (US)' },
        { value: '+91', label: '+91 (IN)' },
        { value: '+44', label: '+44 (UK)' },
        { value: '+61', label: '+61 (AU)' },
        { value: '+86', label: '+86 (CN)' },
        { value: '+81', label: '+81 (JP)' },
        { value: '+49', label: '+49 (DE)' },
        { value: '+33', label: '+33 (FR)' },
        { value: '+39', label: '+39 (IT)' },
        { value: '+7', label: '+7 (RU)' },
        { value: '+55', label: '+55 (BR)' },
        { value: '+27', label: '+27 (ZA)' },
    ];

    //HANDLING PHONE-CODE SEPARATELY 

    const handlePhoneChange = (selectedOption) => {
        setFormData({
            ...formData,
            phoneCode: selectedOption.value,
        });
    };

    //CUSTOM STYLES FOR REACT-SELECT COMPONENT USED FOR PHONECODES

    const customStyles = {
        control: (provided) => ({
            ...provided,
            appearance: 'none',
            fontSize: '0.75rem',
            fontWeight: 500,
            borderRadius: '5px 0px 0px 5px',
            border: 'none',
            backgroundColor: 'white',
            cursor: 'pointer',
            height: '2.6rem',
            width: '5.2rem',
            outline: 'none',
            backgroundColor: 'gainsboro',
        }),
        option: (provided) => ({
            ...provided,
            fontSize: '0.7rem',
        }),
    };


    return (
        <div class="outer-container">
            <header className="header">
                <img src={logo} alt="Company Logo" class="company-logo" />
            </header>
            <div className="form-container">
                <form className="form" onSubmit={handleSubmit}>
                    <div class="heading">Sign Up as a Seller</div>
                    <div className="name">
                        <input
                            type="text"
                            name="firstName"
                            className="input"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="lastName"
                            className="input"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>

                    <input
                        type="email"
                        name="email"
                        className="input"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        name="password"
                        className="input"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        maxLength={8}
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        className="input"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        maxLength={8}
                    />
                    <div className="phone-number">

                        <Select
                            name="phoneCode"
                            className="select"
                            value={{ value: formData.phoneCode, label: formData.phoneCode }}
                            onChange={handlePhoneChange}
                            options={countryOptions}
                            styles={customStyles}

                        />
                        <input
                            type="tel"
                            name="phoneNumber"
                            className="input"
                            placeholder="Phone number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            maxLength={10}
                        />
                    </div>
                    <input
                        type="text"
                        name="otp"
                        className="input"
                        placeholder="Enter OTP"
                        value={formData.otp}
                        onChange={handleChange}
                    />

                    <p className="paragraph">By signing in, you are agreeing to our user policies and cookie policies.</p>
                    <button type="submit" className="button">Sign Up</button>
                </form>
            </div>
        </div>
    );

}

export default SignUp;

