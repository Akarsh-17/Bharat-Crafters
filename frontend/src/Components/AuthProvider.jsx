import React from 'react';
import useAuth from '../Hooks/useAuth.jsx';

const AuthProvider = ({ children }) => {
  useAuth(); 
  return <>{children}</>; 
};

export default AuthProvider;