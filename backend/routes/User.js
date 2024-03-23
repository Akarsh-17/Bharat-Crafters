const express=require('express');
const router=express.Router();

const{
    sendOTP,
    signupSeller,
    loginSeller,
    signupBuyer,
    loginBuyer,
    buyerChangePassword,
    sellerChangePassword

}=require('../controllers/Auth')

const{
    auth,
    isSeller,
    isBuyer

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

// send otp route
router.post('/sendOTP',sendOTP)

router.post('/buyerChangePassword',auth,isBuyer,buyerChangePassword)


router.post('/sellerChangePassword',auth,isSeller,sellerChangePassword)




module.exports= router