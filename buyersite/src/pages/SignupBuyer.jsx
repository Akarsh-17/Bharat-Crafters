// import React from 'react'
// import { useState } from "react"
// import { toast } from "react-hot-toast"
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
// import { useDispatch, useSelector } from "react-redux"
// import { useNavigate } from "react-router-dom"
// import Select from 'react-select';

// import { setSignupData } from '../slices/authSlice'
// import { sendOTP } from '../services/operations/authApis'


// function SignupBuyer() {
//   const {loading}=useSelector((state)=>state.auth)
//   const navigate = useNavigate()
//   const dispatch = useDispatch()

//   // student or instructor
//   // const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phoneCode: "",
//     phoneNumber: "",
//   })

//   const countryOptions = [
//     { value: '+1', label: '+1 (US)' },
//     { value: '+91', label: '+91 (IN)' },
//     { value: '+44', label: '+44 (UK)' },
//     { value: '+61', label: '+61 (AU)' },
//     { value: '+86', label: '+86 (CN)' },
//     { value: '+81', label: '+81 (JP)' },
//     { value: '+49', label: '+49 (DE)' },
//     { value: '+33', label: '+33 (FR)' },
//     { value: '+39', label: '+39 (IT)' },
//     { value: '+7', label: '+7 (RU)' },
//     { value: '+55', label: '+55 (BR)' },
//     { value: '+27', label: '+27 (ZA)' },
// ];

//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)

//   const { firstName, lastName, email, password, confirmPassword,phoneNumber, phoneCode } = formData

//   // Handle input fields, when some value changes
//   const handleOnChange = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }))
//   }
  
//   const handlePhoneChange = (selectedOption) => {
//     setFormData({
//         ...formData,
//         phoneCode: selectedOption.value,
//     });
//   };
  
//   const customStyles = {
//     control: (provided) => ({
//         ...provided,
//         appearance: 'none',
//         fontSize: '0.75rem',
//         fontWeight: 500,
//         borderRadius: '5px 0px 0px 5px',
//         border: 'none',
//         backgroundColor: 'white',
//         cursor: 'pointer',
//         height: '2.6rem',
//         width: '5.2rem',
//         outline: 'none',
//         backgroundColor: 'gainsboro',
//     }),
//     option: (provided) => ({
//         ...provided,
//         fontSize: '0.7rem',
//     }),
// };

//   // Handle Form Submission
//   const handleOnSubmit = (e) => {
//     e.preventDefault()

//     if (password !== confirmPassword) {
//       toast.error("Passwords Do Not Match")
//       return
//     }
//     const signupData = {
//       ...formData,
//     }

//     // Setting signup data to state
//     // To be used after otp verification
//     dispatch(setSignupData(signupData))
//     // Send OTP to user for verification
//     dispatch(sendOTP(formData.email, navigate))

//     // Reset
//     setFormData({
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       phoneCode: "",
//       phoneNumber: "",
//     })
//   }



//   return (
//     <div className='grid min-h-[calc(100vh-6rem)] place-items-center'>
//       {
//         loading?(
//           <div>Loading...</div>
//         ):(
//           <div className='border-2 border-orange-500 rounded-lg p-10'>
//                 <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
//                 <div className="flex gap-x-4">
//                   <label htmlFor='firstName'>
//                     <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-orange-500">
//                       First Name <sup className="text-pink-200">*</sup>
//                     </p>
//                     <input
//                       required
//                       type="text"
//                       name="firstName"
//                       id='firstName'
//                       value={firstName}
//                       onChange={handleOnChange}
//                       placeholder="Enter first name"
//                       style={{
//                         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                        }}
//                        className='w-full rounded-[0.5rem] bg-orange-100 p-[12px] border-2 border-orange-500 pr-12 text-orange-900'
//                     />
//                   </label>
//                   <label htmlFor='lastName'>
//                     <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-orange-500">
//                       Last Name <sup className="text-pink-200">*</sup>
//                     </p>
//                     <input
//                       required
//                       type="text"
//                       name="lastName"
//                       id='lastName'
//                       value={lastName}
//                       onChange={handleOnChange}
//                       placeholder="Enter last name"
//                       style={{
//                         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                        }}
//                        className='w-full rounded-[0.5rem] bg-orange-100 p-[12px] border-2 border-orange-500 pr-12 text-orange-900'
//                     />
//                   </label>
//                 </div>

//                 <div className="flex gap-x-4">
//                   {/* <label htmlFor='phoneNumber' className='relative'>
//                     <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-orange-500">
//                       Phone Number <sup className="text-pink-200">*</sup>
//                     </p>

//                     <div className='flex '>
//                     <Select
//                             name="phoneCode"
//                             className="select absolute  z-[10] top-[4px]"
//                             value={{ value: formData.phoneCode, label: formData.phoneCode }}
//                             onChange={handlePhoneChange}
//                             options={countryOptions}
//                             styles={customStyles}
//                     />

//                     <input
//                       required
//                       type="tel"
//                       name="phoneNumber"
//                       id='phoneNumber'
//                       value={phoneNumber}
//                       onChange={handleOnChange}
//                       placeholder="Enter email address"
//                       maxLength={10}
//                       style={{
//                         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                        }}
//                        className='w-full rounded-[0.5rem] bg-orange-100 p-[12px] border-2 border-orange-500 pr-12 text-orange-900'
//                     />
//                     </div>
//                   </label> */}

//                   <label htmlFor='email'>
//                     <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-orange-500">
//                       Email Address <sup className="text-pink-200">*</sup>
//                     </p>
//                     <input
//                       required
//                       type="text"
//                       name="email"
//                       id='email'
//                       value={email}
//                       onChange={handleOnChange}
//                       placeholder="Enter email address"
//                       style={{
//                         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                        }}
//                        className='w-full rounded-[0.5rem] bg-orange-100 p-[12px] border-2 border-orange-500 pr-12 text-orange-900'
//                     />
//                   </label>

//                   <div className="flex">

//                         <Select
//                             name="phoneCode"
//                             className="select"
//                             value={{ value: formData.phoneCode, label: formData.phoneCode }}
//                             onChange={handlePhoneChange}
//                             options={countryOptions}
//                             styles={customStyles}
//                         />

//                         <input
//                             type="tel"
//                             name="phoneNumber"
//                             placeholder="Phone number"
//                             value={formData.phoneNumber}
//                             onChange={handleOnChange}
//                             maxLength={10}
//                             style={{
//                               boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                              }}
//                              className='w-full rounded-[0.5rem] bg-orange-100 p-[12px] border-2 border-orange-500 pr-12 text-orange-900'

//                         />
//                     </div>

//                 </div>
                
//                 <div className="flex gap-x-4">
//                   <label className="relative" htmlFor='password'>
//                     <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-orange-500">
//                       Create Password <sup className="text-pink-200">*</sup>
//                     </p>
//                     <input
//                       required
//                       type={showPassword ? "text" : "password"}
//                       name="password"
//                       id='password'
//                       value={password}
//                       onChange={handleOnChange}
//                       placeholder="Enter Password"
//                       style={{
//                         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                        }}
//                        className='w-full rounded-[0.5rem] bg-orange-100 p-[12px] border-2 border-orange-500 pr-12 text-orange-900'
//                     />
//                     <span
//                       onClick={() => setShowPassword((prev) => !prev)}
//                       className="absolute right-3 top-[38px] z-[10] cursor-pointer"
//                     >
//                       {showPassword ? (
//                         <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
//                       ) : (
//                         <AiOutlineEye fontSize={24} fill="#AFB2BF" />
//                       )}
//                     </span>
//                   </label>
//                   <label className="relative" htmlFor='confirmPassword'>
//                     <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-orange-500">
//                       Confirm Password <sup className="text-pink-200">*</sup>
//                     </p>
//                     <input
//                       required
//                       type={showConfirmPassword ? "text" : "password"}
//                       name="confirmPassword"
//                       id='confirmPassword'
//                       value={confirmPassword}
//                       onChange={handleOnChange}
//                       placeholder="Confirm Password"
//                       style={{
//                         boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                        }}
//                        className='w-full rounded-[0.5rem] bg-orange-100 p-[12px] border-2 border-orange-500 pr-12 text-orange-900'
//                     />
//                     <span
//                       onClick={() => setShowConfirmPassword((prev) => !prev)}
//                       className="absolute right-3 top-[38px] z-[10] cursor-pointer"
//                     >
//                       {showConfirmPassword ? (
//                         <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
//                       ) : (
//                         <AiOutlineEye fontSize={24} fill="#AFB2BF" />
//                       )}
//                     </span>
//                   </label>
//                 </div>
//                 <button
//                   type="submit"
//                   className="mt-6 rounded-[8px] bg-orange-500 py-[8px] px-[12px] font-medium text-richblack-900"
//                 >
//                   Create Account
//                 </button>
//               </ form>
//           </div>
          

//         )
//       }
//     </div>
//   )
// }

// export default SignupBuyer




import React, { useState } from 'react';
import logo from '../images/logo9.png';
import axios from 'axios';
import './Signup.css'
import Select from 'react-select';

function SignupBuyer() {
    //API ROUTES

    const sendFormData = async (formData) => {
        try {
            const sendOtpResponse = await axios.post(`http://localhost:4000/api/v1/auth/sendOTP`, 
            { email: formData.email });
            toggleOverlay(true);

        } catch (error) {
            console.log(error);
            alert('Error sending OTP. Please try again later.');
        }
    };

    const verifyOTP =()=>{
        const otp = sessionStorage.getItem('otp');

            
                axios.post(`http://localhost:4000/api/v1/auth/verifyOTP`, { enteredOTP: formData.otp , otp: otp})
                    .then(response => {
                        console.log(response.data);
                        alert('verification successful!');
                    })
                    .catch(error => {
                        console.log(error);
                        alert('Error in verification!');
                    });                    

                    console.log("otp verified")
                    console.log(formData)
                    axios.post(`http://localhost:4000/api/v1/auth/signupSeller`, formData)
                    .then(response => {
                        console.log(response.data);
                        alert('registeration successful!');
                    })
                    .catch(error => {
                        console.log(error);
                        alert('Error in registeration!');
                    });
                    sessionStorage.removeItem('otp');

        
    }
    

    //RETRIEVING DATA FROM INPUT FIELDS

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneCode:'',
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        sendFormData(formData);
        
    };

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
            {/* <header className="header">
                <img src={logo} alt="Company Logo" className="company-logo" />
            </header> */}
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

                    <p className="paragraph">By signing in, you are agreeing to our user policies and cookie policies.</p>
                    <button type="submit" className="submit-signup-button">Sign Up</button>
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
                        <button onClick={handleOtpSubmit} className='otp-submit-button'>Submit</button>
                        </div>
                        
                    </div>
                </div>
            )}
        </div>
    );

}

export default SignupBuyer;