const mongoose=require('mongoose')

const ratingAndReviewSchema=new mongoose.Schema({
    buyer:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Buyer"
    },

    rating:{
        type:Number,
        required:true
    },

    review:{
        type:String,
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Product",
        index:true,
    }
})

module.exports= mongoose.model("ratingAndReview",ratingAndReviewSchema);