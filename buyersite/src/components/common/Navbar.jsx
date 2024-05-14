import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import logo from '../../images/logo9.png'
import './Navbar.css'
const Navbar = () => {
  // const {user}=useSelector((state)=>state.auth)
  const token=useSelector((state)=>state.auth.currentUser)
  return (
    <div className='flex h-20 justify-center border-b-[1px] items-center bg-white'>
      <div className='flex w-11/12 justify-between items-center max-w-maxContent'>
      <header className="header">
                <img src={logo} alt="Company Logo" className="company-logo" />
            </header>

        <div className='flex gap-x-6'>
          {
            token===null && (
              <Link to='/login'>
                <button className=' bg-site-2 px-[12px] py-[8px] text-orange-500 rounded-md'>
                  Login
                </button>
              </Link>
            )
          }
          {
            token===null && (
              <Link to='/signup'>
                <button className='border bg-site-2 px-[12px] py-[8px] text-orange-500 rounded-md'>
                  Signup
                </button>
              </Link>
            )
          }
          {
            token !== null && <ProfileDropDown/>
          } 
          {console.log(token)}
        </div>
      </div>
      
       
    </div>
  )
}

export default Navbar



