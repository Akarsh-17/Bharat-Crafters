import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const token=useSelector((state)=>state.auth.currentUser)

    if(token!==null && token?.accountType === "seller")
    {
        console.log("hello")
        return children
    }
    else{
        console.log("not acc")
        return <Navigate to='/login'/>
    }
    
}

export default PrivateRoute