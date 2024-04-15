const BASE_URL=process.env.REACT_APP_BASE_URL;

export const authEndPoints={
    SEND_OTP:BASE_URL+'/auth/sendOTP',
    LOGIN_SELLER:BASE_URL+'/auth/loginSeller',
    SIGNUP_SELLER:BASE_URL+'/auth/signupSeller  ',
}