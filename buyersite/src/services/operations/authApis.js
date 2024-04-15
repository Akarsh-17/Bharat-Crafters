import { toast } from "react-hot-toast";
import { authEndPoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setLoading, setToken } from "../../slices/authSlice";
import {setUser} from '../../slices/profileSlice'


const {
  SEND_OTP,
  LOGIN_SELLER,
  SIGNUP_SELLER,
}=authEndPoints


export async function sendOTP(email,navigate,dispatch)
{
  const toastId = toast.loading("Loading...")
  dispatch(setLoading(true))
  try{
    const response=await apiConnector("POST",SEND_OTP,{
      email
    })

    console.log("SENDOTP API RESPONSE............", response)

    console.log(response.data.success)
    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    toast.success("OTP Sent Successfully")
    navigate("/verify-email")
  }
  catch(error)
  {
    toast.error(error?.response?.data?.message)
    console.log("LOGIN API ERROR............", error)
  }
  dispatch(setLoading(false))
  toast.dismiss(toastId)
}

export async function loginSeller(email,password,navigate,dispatch)
{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try{
       const response=await apiConnector("POST",LOGIN_SELLER,{
        email,password
       })
       
      //  console.log(" hello 1",response.data.message)
       if (!response.data.success) {
        // console.log(" hello ",response.data.message)
        throw new Error(response.data.message)
       } 
       toast.success("LogIn Successful") 
       dispatch(setToken(response.data.token))
   
       console.log("response ",response)
       const userImage = response.data?.user?.image
        ? response.data.user.image
        : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName}`
        // console.log("userImage ",userImage);
        dispatch(setUser({ ...response.data.user, image:userImage}))
       
       localStorage.setItem("token",JSON.stringify(response.data.token))
       localStorage.setItem("user", JSON.stringify(response.data.user))
   
     //  console.log("printing token= >",JSON.stringify(response.data.token))
     //  console.log("token = >",localStorage.token)
       navigate("/dashboard/my-profile")
    }
    catch(error)
    {
      toast.error(error?.response?.data?.message)
      console.log("LOGIN API ERROR............", error)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
}


export default function logout(dispatch,navigate)
{
  dispatch(setLoading(true))
  dispatch(setToken(null))
  dispatch(setUser(null))
  localStorage.removeItem("token");
  toast.success("Logout Successfully")
  dispatch(setLoading(false))
  navigate('/');
}