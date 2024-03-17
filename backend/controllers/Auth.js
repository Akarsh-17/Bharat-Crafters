const Buyer=require('../models/Buyer');
const Seller=require('../models/Seller');
const OTP=require('../models/OTP');
const SellerProfile=require('../models/SellerProfile')
const BuyerProfile=require('../models/BuyerProfile')
const otpGenerator=require('otp-generator')


exports.sendOTP= async(req,res)=>{
    try{
        const {email}=req.body;
        const  existingSeller= await Seller.findOne({email});
        const  existingBuyer= await Buyer.findOne({email});
        if(existingBuyer || existingSeller)
        {
           return res.status(400).json({
               success:false,
               message: "UserAlready exists"
           })
        }

        var otp= otpGenerator.generate(6,{
            upperCaseAlphabets:false,
            lowweCaseAlphabets:false,
            specialChars:false
        })

        

        const otpPayload={email,otp};
        const otpBody=OTP.create(otpPayload);

        res.status(200).json({
            success:true,
            message:"otp generated successfully",
            otp
        })
    }
    catch(error)
    {
        console.log("error in sendOTP controller",error)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}