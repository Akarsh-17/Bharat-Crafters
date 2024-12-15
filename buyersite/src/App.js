import "./App.css";
import Home from "./pages/Home";
import LoginBuyer from "./pages/LoginBuyer";
import SignupBuyer from "./pages/SignupBuyer";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import OpenRoute from "./components/core/Auth/OpenRoute";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import MyProfile from "./components/core/Dashboard/MyProfile";
import { useEffect } from "react";
import logout from "./services/operations/authApis";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setCurrentUser } from "./slices/authSlice";
import Settings from "./components/core/Dashboard/Settings/Settings";
import MyProducts from "./components/core/Dashboard/MyProducts";
import AddProduct from "./components/core/Dashboard/Add Product/Index";
import EditProduct from "./components/core/Dashboard/Edit Product";
import Message from "./components/core/Dashboard/Chat/Message";
import Orders from "./components/core/Dashboard/OrderHistory/Orders";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  useEffect(() => {
    const cookies = document.cookie.split(";");
    let token = "";

    cookies.forEach((cookie) => {
      const [name, value] = cookie.split("=").map((c) => c.trim());
      if (name === "token") {
        token = value;
      }
    });

    if (!token && user) {
      // console.log("hi");
      dispatch(setLoading(true));
      dispatch(setCurrentUser(null));
      // dispatch(setUser(null))
      // localStorage.removeItem("token");
      dispatch(setLoading(false));
      // console.log("h1")
      navigate("/");
    }
    if (token) {
      // console.log("hello");
      const tokenExpiration = new Date(
        JSON.parse(atob(token.split(".")[1])).exp * 1000
      );
      if (tokenExpiration < new Date()) {
        // Token expired, log the user out
        logout(dispatch, navigate);
        navigate("/login"); // Redirect to login page
      }
    }
  }, []);
  return (
    <div
      className="w-screen min-h-screen font-inter flex flex-col "
      style={{ background: "#fceccf" }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <OpenRoute>
              <LoginBuyer />
            </OpenRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <SignupBuyer />
            </OpenRoute>
          }
        />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard/my-profile" element={<MyProfile />} />
          <Route path="/dashboard/settings" element={<Settings />} />

          {/* {user?.accountType === "seller" && (  not ot be include imp */}
            <>
              <Route path="/dashboard/my-products" element={<MyProducts />} />
              {/* enerroled course path to be mentioned here */}
              <Route path="/dashboard/add-product" element={<AddProduct />} />
              <Route
                path="dashboard/edit-product/:productId"
                element={<EditProduct />}
              />
              <Route path="dashboard/messages" element={<Message />} />

              <Route path="dashboard/my-orders" element={<Orders />} />
            </>
          {/* )} */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
