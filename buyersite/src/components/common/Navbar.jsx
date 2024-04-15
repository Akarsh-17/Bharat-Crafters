import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ProfileDropDown from '../core/Auth/ProfileDropDown'

const Navbar = () => {
  const {user}=useSelector((state)=>state.auth)
  const {token}=useSelector((state)=>state.auth)
  return (
    <div className='flex h-20 justify-center border-b-[1px] items-center bg-site-5'>
      <div className='flex w-11/12 justify-between items-center max-w-maxContent'>
        <h1 className="text-4xl font-bold">Bharat Crafter</h1>

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



