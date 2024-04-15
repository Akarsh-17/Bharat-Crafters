import React from 'react'
import { useState } from "react"
import { toast } from "react-hot-toast"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


import { setSignupData } from '../slices/authSlice'
import { sendOTP } from '../services/operations/authApis'


function SignupBuyer() {
  const {loading}=useSelector((state)=>state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  // student or instructor
  // const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneCode: "",
    phoneNumber: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const { firstName, lastName, email, password, confirmPassword } = formData

  // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
    }

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    dispatch(sendOTP(formData.email, navigate))

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneCode: "",
      phoneNumber: "",
    })
  }



  return (
    <div className='grid min-h-[calc(100vh-6rem)] place-items-center'>
      {
        loading?(
          <div>Loading...</div>
        ):(
          <div className='border-2 border-orange-500 rounded-lg p-10'>
                <form onSubmit={handleOnSubmit} className="flex w-full flex-col gap-y-4">
                <div className="flex gap-x-4">
                  <label>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-orange-500">
                      First Name <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                      required
                      type="text"
                      name="firstName"
                      value={firstName}
                      onChange={handleOnChange}
                      placeholder="Enter first name"
                      style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                       }}
                       className='w-full rounded-[0.5rem] bg-orange-100 p-[12px] border-2 border-orange-500 pr-12 text-orange-900'
                    />
                  </label>
                  <label>
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-orange-500">
                      Last Name <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                      required
                      type="text"
                      name="lastName"
                      value={lastName}
                      onChange={handleOnChange}
                      placeholder="Enter last name"
                      style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                       }}
                       className='w-full rounded-[0.5rem] bg-orange-100 p-[12px] border-2 border-orange-500 pr-12 text-orange-900'
                    />
                  </label>
                </div>
                <label className="w-full">
                  <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-orange-500">
                    Email Address <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    required
                    type="text"
                    name="email"
                    value={email}
                    onChange={handleOnChange}
                    placeholder="Enter email address"
                    style={{
                      boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                     }}
                     className='w-full rounded-[0.5rem] bg-orange-100 p-[12px] border-2 border-orange-500 pr-12 text-orange-900'
                  />
                </label>
                <div className="flex gap-x-4">
                  <label className="relative">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-orange-500">
                      Create Password <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={handleOnChange}
                      placeholder="Enter Password"
                      style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                       }}
                       className='w-full rounded-[0.5rem] bg-orange-100 p-[12px] border-2 border-orange-500 pr-12 text-orange-900'
                    />
                    <span
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                      ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                      )}
                    </span>
                  </label>
                  <label className="relative">
                    <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-orange-500">
                      Confirm Password <sup className="text-pink-200">*</sup>
                    </p>
                    <input
                      required
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleOnChange}
                      placeholder="Confirm Password"
                      style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                       }}
                       className='w-full rounded-[0.5rem] bg-orange-100 p-[12px] border-2 border-orange-500 pr-12 text-orange-900'
                    />
                    <span
                      onClick={() => setShowConfirmPassword((prev) => !prev)}
                      className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                    >
                      {showConfirmPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                      ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                      )}
                    </span>
                  </label>
                </div>
                <button
                  type="submit"
                  className="mt-6 rounded-[8px] bg-orange-500 py-[8px] px-[12px] font-medium text-richblack-900"
                >
                  Create Account
                </button>
              </ form>
          </div>
          

        )
      }
          </div>
  )
}

export default SignupBuyer
