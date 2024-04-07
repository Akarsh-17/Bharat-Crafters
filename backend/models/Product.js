const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
   name:{
    type:String,
    required:true,
   },

   brand: {
    type: String,
    required: true,
   },

   description: {
    type: String,
    required: true,
  },

  photo: {
    type: [String],
    required: true,
  },

  option:[
    {
        size:{
            type: String,
            required: true,
        },

        prize:{
            type: String,
            required: true,
        },
        color:{
            type: String,
            required: true,
        },

        noOfPiece:{
            type: Number,
            required: true,
        }
    }
  ],

  weight:{
    type:Number,
    required:true
  },

  components:{
    type: [String],
    required: true,
  },

  material:{
    type:String
  },

  special_features:{
    type: [String],
    required:true
  },

  shape:{
    type:String
  },

  style:{
    type:String
  },

  height:{
    type:String
  },

  width:{
    type:String
  },

  length:{
    type:String
  },

  pattern:{
    type:String
  },
  
//   productId:{
//   }

})

productSchema.index({
    name: "text", // [String]
    brand: "text", // String
    description: "text", // String
    
  });

module.exports=mongoose.model('Product',productSchema)