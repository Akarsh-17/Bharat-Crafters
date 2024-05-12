import { createSlice } from "@reduxjs/toolkit";

// const cookies = document.cookie.split(";");
// const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));
// const token = tokenCookie ? tokenCookie.split("=")[1] : null;
const initialState={
    loading:false,
    signUpData:null,
    // token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
    // token:tokenCookie ? tokenCookie.split("=")[1] : null,
    currentUser:null
  }
  
  // console.log("token in slice ",token)

const authSlice= createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{
        setCurrentUser(state,value){
          state.currentUser=value.payload
        },

        setLoading(state,value){
          state.loading=value.payload
        },
        setSignupData(state,value){
          state.signUpData=value.payload
        },
        updateToken: (state, action) => {
          state.currentUser.token = action.payload.newToken;
          state.currentUser.refreshToken = action.payload.newRefreshToken;
        },

    }
})

export const {setCurrentUser,setLoading,setSignupData,updateToken}=authSlice.actions;
export default authSlice.reducer;



/*
// To set a cookie
document.cookie = "token=myTokenValue";

// To read a cookie
const cookies = document.cookie.split("; ");
const tokenCookie = cookies.find(cookie => cookie.startsWith("token="));
const token = tokenCookie ? tokenCookie.split("=")[1] : null;

// To delete a cookie
document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
*/