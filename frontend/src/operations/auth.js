import axios from "axios";
import {clearInfo } from "../Components/store/slices/AuthSlice.js";
import { clearCart } from "../Components/store/slices/cartSlice.js";
import { clearWishlist } from "../Components/store/slices/WishlistSlice.js";


export async function logout(dispatch,navigate, cartProduct, cartSummary) {
  const BASE_URL=process.env.REACT_APP_API_URL;
  try {
    await axios.post(`${BASE_URL}/auth/buyerLogout`, {
      cartProduct,
      cartSummary,
    },{withCredentials:true});
    
    dispatch(clearInfo());
    dispatch(clearCart());
    dispatch(clearWishlist());
    navigate("/");
  } catch (Error) {
    console.log(`Logout Failure Error: ${Error}`);
  }
};

