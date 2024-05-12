import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { sidebarLinks } from '../../../data/dashboard-links'
import SidebarLink from './SidebarLink'
import {VscSignOut} from 'react-icons/vsc'
import logout from '../../../services/operations/authApis'
import ConfirmationModal from '../../common/ConfirmationModal'
const Sidebar = () => {
    const [confirmationModal,setConfirmationModal]=useState(false)
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const user=useSelector((state)=>state.auth.currentUser)

  return (
    <>
    <div className='flex  min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10'>
        <div className="flex flex-col px-4">
          {sidebarLinks.map((link) => {
            if (link.acc_type && user?.accountType !== link.acc_type) return null
            return (
              <div key={link.id}>
                <SidebarLink key={link.id} link={link} iconName={link?.icon}/>
              </div>
            )
          })}
        </div>
        <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-700" />
        <div className='flex flex-col'>
            <SidebarLink
              link={{ name: "Settings", path: "/dashboard/settings" }}
              iconName="FiSettings"
            />

            <button onClick={()=>{
              setConfirmationModal({
                text1:"Are you sure?",
                text2:"You will be logged out of your account.",
                btnText1:"LogOut",
                btnText2:"Cancel",
                btn1Handler:()=>logout(dispatch,navigate),
                btn2Handler:()=>setConfirmationModal(null)
              })
            }}
            className="px-4 py-2 text-sm font-medium text-richblack-300"
            >
              <div className="flex items-center gap-x-2">
                <VscSignOut className="text-2xl" />
                <span>Logout</span>
              </div>
            </button>
        </div>
    </div>
    {confirmationModal && <ConfirmationModal modal={confirmationModal}/>}
  </>
  )
}

export default Sidebar