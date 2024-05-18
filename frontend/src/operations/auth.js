import {setCurrentUser } from "../Components/store/slices/AuthSlice.js";

export default function logout(dispatch,navigate)

{
//   dispatch(setLoading(true))
  dispatch(setCurrentUser(null))
  // dispatch(setUser(null))
  // localStorage.removeItem("token");
//   toast.success("Logout Successfully")
//   dispatch(setLoading(false))
  navigate('/');
}