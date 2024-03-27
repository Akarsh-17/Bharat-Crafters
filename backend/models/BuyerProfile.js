const mongoose=require('mongoose')

const buyerProfileSchema= new mongoose.Schema({
    gender:{
        type:String
    },

    dateOfBirth:{
        type:String
    },
    
    address:{
        type:String,
        // required:true
    },

    phoneNumber:{
        type:Number,
        // required:true
    },

    // cardNo:{
    //     type:Number
    // },

})

module.exports=mongoose.model('BuyerProfile',buyerProfileSchema);