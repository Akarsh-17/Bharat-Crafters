import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { PersistGate } from "redux-persist/integration/react";
import Home from "./Components/Home/Home.jsx";
import Login from "./Components/Login/Login.jsx";
import SignUp from "./Components/Signup/Signup.jsx";
import { Provider } from "react-redux";
import { persistor, store } from "./Components/store/index.js";
import ProductCategory from "./Components/ProductCategory/ProductCategory.jsx";
import ProductDescriptionPage from "./Components/ProductDescriptionPage/ProductDescriptionPage.jsx";
import AuthProvider from "./Components/AuthProvider.jsx";
import { Toaster } from "react-hot-toast";
import ProfileSettings from "./Components/ProfileSettings/ProfileSettings.jsx";
import Wishlist from "./Components/Wishlist/Wishlist.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import MessageComponent from "./Components/ProfileSettings/MessageComponent.jsx";
import PasswordComponent from "./Components/ProfileSettings/PasswordComponent.jsx";
import PrivateRoute from "./Components/PrivateRoute.jsx";
import Order from "./Components/Order/Order.jsx";

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
              <Route
                exact
                path="/category/:categoryId"
                element={<ProductCategory />}
              />
              <Route
                exact
                path="/products/:productId"
                element={<ProductDescriptionPage />}
              />

              <Route
                exact
                path="/settings/my-profile"
                element={
                  <PrivateRoute>
                    <ProfileSettings />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/settings/messages"
                element={
                  <PrivateRoute>
                    <MessageComponent />
                  </PrivateRoute>
                }
              />
              <Route
                exact
                path="/settings/change-password"
                element={
                  <PrivateRoute>
                    <PasswordComponent />
                  </PrivateRoute>
                }
              />

              {/* /settings/change-password */}
              <Route
                exact
                path="/wishlist"
                element={
                  <PrivateRoute>
                    <Wishlist />
                  </PrivateRoute>
                }
                />

              <Route
                exact
                path="/cart"
                element={
                  <PrivateRoute>
                    <Cart />
                  </PrivateRoute>
                }
                />

              <Route
                exact
                path="/orders"
                element={
                  <PrivateRoute>
                    <Order />
                  </PrivateRoute>
                }
                />
            </Routes>
            {/* <Toaster /> */}
          </AuthProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
