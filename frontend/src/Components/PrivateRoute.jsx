import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const user = useSelector((state) => state.CurrentUser.CurrentUser);


    if(user!==null)
    {
        return children
    }
    else{
        return <Navigate to='/login'/>
    }
    
}

export default PrivateRoute