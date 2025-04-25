import React, { useState } from "react";
import logo from "../../Images/logo9.png";
import axios from "axios";
import "./Signup.css";
import Select from "react-select";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setCurrentUser } from '../store/slices/AuthSlice.js';
import { useDispatch } from "react-redux";

function SignUp() {
  const BASE_URL = process.env.REACT_APP_API_URL
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch=useDispatch();
  //API ROUTES

  const sendFormData = async (formData) => {
    setLoading(true);
    toast.loading("Loading...");
    try {
      const sendOtpResponse = await axios.post(
        `${BASE_URL}/auth/sendOTP`,
        { email: formData.email },
        {
          withCredentials: true,
        }
      );
      console.log(sendOtpResponse);
      if (sendOtpResponse?.data?.success) {
        sessionStorage.setItem("otp", sendOtpResponse?.data?.otp);
        toggleOverlay(true);
      }
    } catch (error) {
      console.log(error);
      alert("Error sending OTP. Please try again later.");
    }
  };

  const verifyOTP = async () => {
    await axios
      .post(
        `${BASE_URL}/auth/verifyOTP`,
        { enteredOTP: formData.otp, email: formData.email },
        {
          withCredentials: true,
        }
      )
      .then(async (response) => {
        console.log(response.data);
        console.log("otp verified");
        console.log(formData);
        await axios
          .post(`${BASE_URL}/auth/signupBuyer`, formData, {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response.data);
            toast.success("Registeration successfull!");
            dispatch(setCurrentUser({...response.data.user}));
            navigate("/");
          })
          .catch((error) => {
            console.log(error);
            toast.error("Registeration error");
          });
      })
      .catch((error) => {
        console.log(error);
        alert("Error in verification!");
      });

    sessionStorage.removeItem("otp");
    setLoading(false);
    toast.dismiss();
  };

  //RETRIEVING DATA FROM INPUT FIELDS

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneCode: "",
    phoneNumber: "",
    otp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    sendFormData(formData);
  };

  const countryOptions = [
    { value: "+1", label: "+1 (US)" },
    { value: "+91", label: "+91 (IN)" },
    { value: "+44", label: "+44 (UK)" },
    { value: "+61", label: "+61 (AU)" },
    { value: "+86", label: "+86 (CN)" },
    { value: "+81", label: "+81 (JP)" },
    { value: "+49", label: "+49 (DE)" },
    { value: "+33", label: "+33 (FR)" },
    { value: "+39", label: "+39 (IT)" },
    { value: "+7", label: "+7 (RU)" },
    { value: "+55", label: "+55 (BR)" },
    { value: "+27", label: "+27 (ZA)" },
  ];

  //CUSTOM STYLES FOR REACT-SELECT COMPONENT USED FOR PHONECODES

  const customStyles = {
    control: (provided) => ({
      ...provided,
      appearance: "none",
      fontSize: "0.75rem",
      fontWeight: 500,
      borderRadius: "5px 0px 0px 5px",
      border: "none",
      backgroundColor: "white",
      cursor: "pointer",
      height: "2.6rem",
      width: "5.2rem",
      outline: "none",
      backgroundColor: "gainsboro",
    }),
    option: (provided) => ({
      ...provided,
      fontSize: "0.7rem",
    }),
  };

  const handlePhoneChange = (selectedOption) => {
    setFormData({
      ...formData,
      phoneCode: selectedOption.value,
    });
  };

  const [showOverlay, toggleOverlay] = useState(false);

  const handleOtpSubmit = () => {
    verifyOTP();
    toggleOverlay(false);
  };

  return (
    <div className="outer-container">
      <header className="header">
        <img src={logo} alt="Company Logo" class="header-logo" />
      </header>
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <div className="heading">Sign Up as a Buyer</div>
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
              className="flex"
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

          <p className="paragraph">
            By signing in, you are agreeing to our user policies and cookie
            policies.
          </p>
          <button type="submit" className="submit-signup-button">
            Sign Up
          </button>
        </form>
      </div>

      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <div class="overlay-heading">Enter OTP</div>
            <div className="overlay-form">
              <input
                type="text"
                name="otp"
                className="otp-input"
                placeholder="6-digit OTP"
                value={formData.otp}
                onChange={handleChange}
              />
              <button onClick={handleOtpSubmit} className="otp-submit-button">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
