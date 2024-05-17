import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { PersistGate } from 'redux-persist/integration/react';
import Home from './Components/Home/Home.jsx';
import Login from './Components/Login/Login.jsx';
import SignUp from './Components/Signup/Signup.jsx';
import { Provider } from 'react-redux';
import {persistor, store} from './Components/store/index.js';
import ProductCategory from './Components/ProductCategory/ProductCategory.jsx';
import ProductDescriptionPage from './Components/ProductDescriptionPage/ProductDescriptionPage.jsx';
import AuthProvider from './Components/AuthProvider.jsx';


function App() {

  return (
    <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>


    <Router>
      <AuthProvider>
      
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/category/:categoryId" element={<ProductCategory />} />
          <Route exact path="/products/:productId" element={<ProductDescriptionPage />} />


        </Routes>
      
        </AuthProvider>
    </Router>
    </PersistGate>
  </Provider>
);
}

export default App;



