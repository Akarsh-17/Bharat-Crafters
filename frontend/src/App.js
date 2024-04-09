import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home.jsx';
import Login from './Components/Login/Login.jsx';
import SignUp from './Components/Signup/Signup.jsx';

function App() {
  return (
      
    <Router>
      
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />

        </Routes>
      </div>
      
    </Router>
  
);
}

export default App;



