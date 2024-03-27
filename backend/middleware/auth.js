const jwt=require('jsonwebtoken')
// const Buyer = require('../models/Buyer')
// const Seller=require('../models/Seller')
require('dotenv').config();

exports.auth= (req,res,next)=>{
    try{
        console.log("cookie" , req.cookies.token);
        // console.log("body" , req.body.token);
        console.log("header", req.header("Authorization"));
        const token=req.cookies.token || req.header("Authorization").replace("Bearer ", "");
    
        if(!token|| token==undefined)
        {
            return res.status(401).json({
                success:false,
                message:'Token Missing',
            });
        }
    
        try{
            const payload=jwt.verify(token,process.env.JWT_SECRET);
            console.log('printing payload in middleware ',payload);
            if(payload.accountType==='seller')
            {
                console.log("inside seller")
                req.user=payload
            }
            else if(payload.accountType==='buyer')
            {
                console.log("inside buyer")
                req.user=payload
            }
    
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error)
    {
        return res.status(401).json({
            success:false,
            message:'Something went wrong, while verifying the token',
            error:error.message,
        });
    }
    
}

exports.isBuyer= async(req,res,next)=>{
    try{
        console.log("is Buyer verrifying")
        console.log(req.user.accountType)
        if(req.user.accountType!=='buyer')
       {
        return res.status(401).json({
            success:false,
            message:'This is protected for buyer only'
        })
       }
       next();
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"User role can not be verified. Please try again"
          })
        }
}


exports.isSeller= async(req,res,next)=>{
    try{
        console.log("is seller verrifying")
        console.log(req.user.accountType)
        if(req.user.accountType!=='seller')
       {
        return res.status(401).json({
            success:false,
            message:'This is protected for seller only'
        })
       }
       next();
    }
    catch(error)
    {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"User role can not be verified. Please try again"
          })
        }
}
