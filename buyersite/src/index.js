import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { configureStore } from '@reduxjs/toolkit';
import rootReduce from './reducer/index';
import { Toaster } from 'react-hot-toast';

import {store} from "./reducer/index"
import {persistor} from './reducer/index'
import { PersistGate } from 'redux-persist/integration/react';
// const store=configureStore({
//     reducer:rootReduce
// })

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
      <App />
      <Toaster/>
    </BrowserRouter>
    </PersistGate>
  </Provider>
);

