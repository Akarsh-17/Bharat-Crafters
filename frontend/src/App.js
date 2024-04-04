import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home.jsx';

function App() {
  return (
      
    <Router>
      
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />

        </Routes>
      </div>
      
    </Router>
  
);
}

export default App;



