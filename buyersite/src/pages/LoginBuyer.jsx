// import React, { useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { Link, useNavigate } from 'react-router-dom'
// import {AiFillEye} from 'react-icons/ai'
// import {AiFillEyeInvisible} from 'react-icons/ai'
// import { loginSeller } from '../services/operations/authApis'

// const LoginBuyer = () => {
//   const {loading}=useSelector((state)=>state.auth)
//   const navigate=useNavigate();
//   const dispatch=useDispatch();
//   const [formData,setFormData]=useState({
//     email:"",
//     password:""
//   })

//   const [showPassword,setShowPassword]=useState(false)
//   const changeHandler=(e)=>{
//     setFormData((prevData)=>(
//       {
//         ...prevData,
//         [e.target.name]:e.target.value
//       }
//     ))
//   }

//   const submitHandler=(e)=>{
//     e.preventDefault()
//     loginSeller(formData.email,formData.password,navigate,dispatch)
//   }

//   return (
//     <div className='grid min-h-[calc(100vh-6rem)] place-items-center '>
//       {
//         loading?(
//           <div>Loading...</div>
//         ):(
//           <div className='border-2 border-orange-500 rounded-lg p-10'>
//              <h1 className='text-4xl font-style: italic'>Welcome Back</h1>
//               <form onSubmit={submitHandler}
//                  className='w-full mt-7 flex flex-col gap-y-6'
//               >
//                 <label htmlFor='email'>
//                   <p className='text-orange-500'>
//                     Email Address<sup className='text-pink-200'>*</sup>
//                   </p>
//                   <input
//                    type='email'
//                    name='email'
//                    id='email'
//                    value={formData.email}
//                    required
//                    onChange={changeHandler}
//                    placeholder='Enter email here'
//                    style={{
//                     boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                    }}
//                    className='w-full rounded-[0.5rem] bg-orange-100 p-[12px] border-2 border-orange-500 pr-12 text-orange-900'
//                   />
//                 </label>

//                 <label htmlFor='password' className='relative'>
//                   <p className=' text-orange-500'>
//                     Password<sup className='text-pink-200'>*</sup>
//                   </p>
//                   <input
//                    type={showPassword?"text":"password"}
//                    name='password'
//                    id='password'
//                    value={formData.password}
//                    required
//                    onChange={changeHandler}
//                    placeholder='Enter password here'
//                    style={{
//                     boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//                    }}
//                    className='w-full rounded-[0.5rem] bg-orange-100 p-[12px] border-2 border-orange-500 pr-12 text-orange-900'
//                   />
//                   <span onClick={()=>setShowPassword((prev)=>!prev)}
//                   className='absolute cursor-pointer right-3 z-[10] top-[38px]'>
//                     {showPassword ?(
//                                      <AiFillEyeInvisible fontSize={24} fill="#AFB2BF"/>
//                                     ):(
//                                        <AiFillEye fontSize={24} />
//                                     )
//                     }
//                   </span>
//                   <Link to="/forgot-password">
//                       <p className="mt-1 ml-auto max-w-max text-xs text-orange-500">
//                         Forgot Password
//                       </p>
//                   </Link>
//                   </label>

//                   <button type='submit'
//                   className="mt-6 rounded-[8px] bg-orange-500 py-[8px] px-[12px] font-medium text-richblack-900" >
//                      Log In
//                   </button>
//               </form>
//           </div>
//         )
//       }
      
//     </div>
//   )
// }

// export default LoginBuyer


import React, { useState } from 'react';
import './Login.css'
import {useNavigate} from 'react-router-dom'
import { useDispatch} from 'react-redux'

import { loginSeller } from '../services/operations/authApis'


function Login() {

    const [loading, setLoading] = useState(false);

   

    const navigate= useNavigate();
    const dispatch=useDispatch();

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
      // e.preventDefault()
      loginSeller(formData.email,formData.password,navigate,dispatch)
    };


    return (
        <div class="outer-container-login">
            {/* <header className="header-login">
                <img src={logo} alt="Company Logo" class="header-logo" />
            </header> */}
            <div className="form-container-login">
                <div className="form" >
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
                    <button type="submit" className="button-login"
                    onClick={()=>{handleSubmit()}}
                    >Login</button>
                    <button className="paragraph-login" onClick={()=>{navigate('/signup')}}>or Signup if not a user</button>

                </div>
            </div>
        </div>
    );

}

export default Login;

