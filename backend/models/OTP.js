const mongoose=require('mongoose');
const mailSender=require('../utilis/mailSender')
const otpTemplate=require("../mail_template/otpVerification")

const otpSchema= new mongoose.Schema({
    email:{
        type:String,
        reqired:true
    },

    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60,
    }
})
 
async function sendVerificationMail(email,otp)
{
    try{
        const mailResponse=await mailSender(email, 
                                            'Account Verification from Bharat Crafters',
                                            otpTemplate(otp)
                                        )
        console.log("email send successfully", mailResponse)
    }
    catch(error){
        console.log("error occured while sending mail",error)
        throw error;
    }
}
// You can leverage this.isNew in Mongoose middleware functions (like pre('save')) to perform 
// different actions based on whether the document is new or being updated. 
otpSchema.pre('save',async function(next){
    if(this.isNew)
    {
        await sendVerificationMail(this.email,this.otp)
    }
    next()
})

module.exports=mongoose.model("OTP",otpSchema);