const express=require('express');
const router=express.Router();

const{
    sendOTP,
    signupSeller,
    loginSeller,
    signupBuyer,
    loginBuyer,
    signupAdmin,
    loginAdmin,
    buyerChangePassword,
    sellerChangePassword,
    verifyOTP,

}=require('../controllers/Auth')

const{
    auth,
    isSeller,
    isBuyer,
}=require('../middleware/auth')



// ********************************************************************************************************
//                                      Authentication routes
// ********************************************************************************************************


// route for seller login
router.post('/loginSeller',loginSeller)

// route for seller sign uo
router.post('/signupSeller',signupSeller)


// route for buyer login
router.post('/loginBuyer',loginBuyer)

// route for buyer sign uo
router.post('/signupBuyer',signupBuyer)


// route for admin login
router.post('/loginAdmin',loginAdmin)

// route for buyer sign uo
router.post('/signupAdmin',signupAdmin)


// send otp route
router.post('/sendOTP',sendOTP)

//verify otp
router.post('/verifyOTP',verifyOTP)


router.post('/buyerChangePassword',auth,isBuyer,buyerChangePassword)


router.post('/sellerChangePassword',auth,isSeller,sellerChangePassword)


module.exports= router