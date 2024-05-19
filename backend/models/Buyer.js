const mongoose=require('mongoose')

const buyerSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    
    lastName:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true
    },
    
    image:{
        type:String,
    },

    additionalDetail:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'BuyerProfile'
    },

    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],


    // token:{
    //     type:String
    // },
   
    resetPasswordExpires:{
     type:Date
    },

    accountType:{
        type:String,
        default:'buyer'
    },
    review:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Review'
    }],
    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    }],
},
 {timestamps:true}
)

module.exports=mongoose.model('Buyer',buyerSchema);