const mongoose=require("mongoose");

const cartSchema=new mongoose.Schema({
    productList:[
       {
        productInfo:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product",
            required:true
        },
        selectedQuantity:{
            type:Number,
            required:true
        },
        selectedOption:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
       }
    ]
});

module.exports = mongoose.model("Cart", cartSchema);

