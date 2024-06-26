import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function OpenRoute({children})
{
    const token=useSelector((state)=>state.auth.currentUser)

    if(token===null)
    {return children}
    else{
        console.log("token ", token)
        return <Navigate to='/dashboard/my-profile'/>
    }
}

export default OpenRoute