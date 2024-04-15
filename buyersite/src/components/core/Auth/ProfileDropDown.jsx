import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineCaretDown } from "react-icons/ai"
import {Link, useNavigate} from 'react-router-dom'
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import useOnClickOutside from '../../../hooks/useOnClickOutside'
import logout from '../../../services/operations/authApis'

const ProfileDropDown = () => {
  const {user}=useSelector((state)=>state.profile)
  const [open,setOpen]=useState(false);
  const ref=useRef(null);
  const dispatch=useDispatch();
  const navigate=useNavigate();


  useOnClickOutside(ref,()=>setOpen(false))

  return (
    <button className='relative' onClick={()=>setOpen(true)}>
      <div className='flex items-center gap-x-1'>
        {console.log("user ",user?.image)}
        <img
          src={user?.image}
          alt={`profile-${user?.firstName}`}
          className="aspect-square w-[50px] rounded-full object-cover border-2"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>
      {
        open && (
          <div className='absolute top-[118%] right-0 z-[1000] flex flex-col  rounded-md border-[1px] border-richblack-700 bg-richblack-800'
          ref={ref}
          onClick={(e) => e.stopPropagation()}
          >
            <Link to='/dashboard/my-profile' onClick={()=>setOpen(false)}>
              <div className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25'>
                <VscDashboard className="text-lg" />
                dashboard
              </div>
            </Link>

            <div className='flex w-full items-center gap-x-1 py-[10px] px-[12px] text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25' 
            onClick={()=>{logout(dispatch,navigate)
                            setOpen(false)}}>
              <VscSignOut className="text-lg" />
              LogOut
            </div>
          </div>
        )
      }
    </button>
  )
}

export default ProfileDropDown