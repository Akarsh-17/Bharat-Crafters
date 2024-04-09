import React, { useState } from 'react';
import logo from '../../Images/logo9.png';
import axios from 'axios';
import './Login.css'

function Login() {

    //API ROUTE

    const sendFormData = async (formData) => {
        console.log(formData)
        axios.post(`http://localhost:4000/api/v1/auth/loginBuyer`, formData)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    };

    //USESTATE FOR INPUT FIELDS

    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
        sendFormData(formData);

    };


    return (
        <div class="outer-container-login">
            <header className="header-login">
                <img src={logo} alt="Company Logo" class="company-logo" />
            </header>
            <div className="form-container-login">
                <form className="form" onSubmit={handleSubmit}>
                    <div class="heading-login">Login as a Seller</div>
                

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

                    <p className="paragraph-login">or login as a seller</p>
                    <button type="submit" className="button-login">Login</button>
                </form>
            </div>
        </div>
    );

}

export default Login;

