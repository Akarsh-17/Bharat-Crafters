import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileSlice from "../slices/profileSlice";

const rootReduce=combineReducers({
    auth:authReducer,
    profile:profileSlice
})

export default rootReduce