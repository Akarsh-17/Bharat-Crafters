const mongoose=require("mongoose");

const cartSchema=new mongoose.Schema({
    productList:[
       {
        productInfo:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },
        selectedOption:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        selectedSize:{
            type:String,
            required:true
        },
        selectedColor:{
            type:String,
            required:true,
        },
        selectedPrice:{
            type:Number,
            required:true
        },
        selectedQuantity:{
            type:Number,
            required:true
        },
       }
    ]
});

module.exports = mongoose.model("Cart", cartSchema);

