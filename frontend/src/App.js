import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home.jsx';
import Login from './Components/Login/Login.jsx';
import SignUp from './Components/Signup/Signup.jsx';
import { Provider } from 'react-redux';
import store from './Components/store/store.js';
import ProductCategory from './Components/ProductCategory/ProductCategory.jsx';
import ProductDescriptionPage from './Components/ProductDescriptionPage/ProductDescriptionPage.jsx';

function App() {
  return (
    <Provider store={store}>

    <Router>
      
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/category" element={<ProductCategory />} />
          <Route exact path="/products" element={<ProductDescriptionPage />} />


        </Routes>
      
    </Router>
  </Provider>
);
}

export default App;



