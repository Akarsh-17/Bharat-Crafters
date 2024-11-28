import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function OpenRoute({children})
{
    const user = useSelector((state) => state.CurrentUser.CurrentUser);

    if(user===null)
    {return children}
    else{
        console.log("token ", token)
        return <Navigate to='/'/>
    }
}

export default OpenRoute