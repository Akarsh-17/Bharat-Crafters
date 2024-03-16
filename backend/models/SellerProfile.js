const mongoose=require('mongoose')

const sellerProfileSchema= new mongoose.Schema({
    gender:{
        type:String
    },

    dateOfBirth:{
        type:String
    },
    
    address:{
        type:String,
        required:true
    },

    // cardNo:{
    //     type:Number
    // },

})

module.exports=mongoose.module('SellerProfile',sellerProfileSchema);