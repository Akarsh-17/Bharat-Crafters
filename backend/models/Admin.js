const mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({
    
    email:{
        type:String,
        required:true,
        trim:true
    },
    password:{
        type:String,
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
        default:'admin'
    }
},
 {timestamps:true}
)

module.exports=mongoose.model('Admin',adminSchema);