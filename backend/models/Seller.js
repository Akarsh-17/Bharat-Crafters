const mongoose=require('mongoose')

const sellerSchema=new mongoose.Schema({
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
        ref:'SellerProfile'
    },

    product:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    }],

    category:[{
     type:mongoose.Schema.Types.ObjectId,
     ref:'Category'
    }],

    phoneCode:{
        type:String,
        required:true
    },

    phoneNumber:{
        type:Number,
        required:true
    },

    token:{
        type:String
    },
   
    resetPasswordExpires:{
     type:Date
    },

    accountType:{
        type:String,
        default:'seller'
    }
},
 {timestamps:true}
)

module.exports=mongoose.model('Seller',sellerSchema);