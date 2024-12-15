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
    buyerWishList,
    buyerLogout

}=require('../controllers/Auth')

const{
    auth,
    isSeller,
    isBuyer,
}=require('../middleware/auth')

const {
    updateBuyerProfile,
    deleteBuyerAccount,
    getPuchasedProducts
}=require('../controllers/BuyerProfile');

const { getSellerOrders } = require('../controllers/SellerProfile');



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




// wishlist
router.post('/buyerWishList',auth,isBuyer,buyerWishList)



// BUYER PROFILE
router.post("/updateBuyerProfile",auth,isBuyer,updateBuyerProfile)
router.delete("/deleteBuyerAccount",auth,isBuyer,deleteBuyerAccount)
router.get("/getPuchasedProducts",auth,isBuyer,getPuchasedProducts)


//seller profile
router.get("/getSellerOrders",auth,isSeller,getSellerOrders)

//buyer lgout
router.post("/buyerLogout",auth,isBuyer,buyerLogout)

module.exports= router