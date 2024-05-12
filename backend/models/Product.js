const mongoose=require('mongoose')
// rating and review left
const productSchema=new mongoose.Schema({

  seller:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Seller",
    required: true
  },

  category:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Category",
    required: true
  },

  subCategory:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"SubCategory",
    required: true
  },
  
  buyer:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Buyer",
        required:true,
    }
  ],

  name:{
   type:String,
   required:true,
   trim:true,
  },

  brand: {
   type: String,
   required: true,
   trim:true
  },

  description: {
   type: String,
    required: true,
    trim:true
  },
  
  images:{
    type:[String],
    required:true,
    
  },
  

  options:[
    {
        size:{
            type: String,
            required: true,
            trim:true
        },

        price:{
            type: Number,
            required: true,
            min:0
        },
        color:{
            type: [String],
            required: true,
            trim:true,
            validate: { // Validate tags (optional but recommended)
              validator: (color) => color.length >= 1,
              message: 'Please provide at least one color.'
            }
        },

        noOfPieces:{
            type: Number,
            required: true,
            min:0,
        }
    }
  ],

  weight:{
    type:Number,
    required:true,

  },

  components:{
    type: [String],
    required: true,
    trim:true,
    validate: { // Validate tags (optional but recommended)
      validator: (components) => components.length >= 1,
      message: 'Please provide at least one component.'
    }
  },
  

  material:{
    type:String,
    trim:true,
  },

  specialFeatures:{
    type: [String],
    required:true,
    trim:true,
    validate: { // Validate tags (optional but recommended)
      validator: (specialFeatures) => specialFeatures.length >= 1,
      message: 'Please provide at least one special feature.'
    }
  },

  shape:{
    type:String,
    trim:true
  },

  style:{
    type:String,
    trim:true
  },

  height:{
    type:String,
    trim:true
  },

  width:{
    type:String,
    trim:true
  },

  length:{
    type:String,
    trim:true
  },

  pattern:{
    type:String,
    trim:true
  },

  status: {
    type: String,
    enum: ["Draft", "Published"],
  },
  createdAt: { type: Date, default: Date.now },
});

productSchema.index(
  {
    name: 'text',
    brand: 'text',
    description: 'text',
    "options.size": 'text',
    "options.color": 'text',
  },
  {
    weights: {
      name: 3, // Give more weight to name for better matching
      brand: 2,
      description: 1,
      "options.size": 1,
      "options.color": 1,
    },
  }
);

productSchema.index({"options.price": 1});
// productSchema.ensureIndexes();y

module.exports=mongoose.model('Product',productSchema)


// productSchema.index({ category: 1 }); // Add an index on category if applicable




// const filterProducts = (products, searchQuery) => {
//   if (!searchQuery) return products; // Return all products if no query

//   const keywords = searchQuery.toLowerCase().split(/\s+/); // Split into keywords (lowercase for case-insensitive search)
//   const regex = new RegExp(keywords.join('|'), 'i'); // Case-insensitive OR search

//   // Improved handling for price range searches:
//   const priceRange = searchQuery.match(/(\$\d+)-(\$\d+)/); // Regex for price range format (optional)
  
//   if (priceRange) {
//     const minPrice = parseFloat(priceRange[1].slice(1)); // Extract min price from matched range
//     const maxPrice = parseFloat(priceRange[2].slice(1)); // Extract max price from matched range
//     return products.filter((product) => {
//       // Filter products within price range
//       return (
//         regex.test(product.name.toLowerCase()) ||
//         regex.test(product.description.toLowerCase()) ||
//         regex.test(product.brand.toLowerCase()) ||
//         product.option.some((option) =>
//           regex.test(option.size.toLowerCase()) ||
//           regex.test(option.color.toLowerCase()) ||
//           regex.test(option.style.toLowerCase())
//         ) ||
//         (priceRange && product.option.some((option) => {
//           const optionPrice = parseFloat(option.price.slice(1)); // Extract price as a number
//           return optionPrice >= minPrice && optionPrice <= maxPrice;
//         }))
//       );
//     });
//   }

//   return products.filter((product) => {
//     return (
//       regex.test(product.name.toLowerCase()) ||
//       regex.test(product.description.toLowerCase()) ||
//       regex.test(product.brand.toLowerCase()) ||
//       product.option.some((option) =>
//         regex.test(option.size.toLowerCase()) ||
//         regex.test(option.color.toLowerCase()) ||
//         regex.test(option.style.toLowerCase())
//       )
//     );
//   });
// };


// images: [
  //   {
  //     public_id: {
  //       type: String,
  //       required: true,
  //     },
  //     url: {
  //       type: String,
  //       required: true,
  //     },
  //     // validate: { // Validate tags (optional but recommended)
  //     //       validator: (images) => images.length >= 1,
  //     //       message: 'Please provide at least one photo.'
  //     //   }
  //   },
  // ],
  //productSchema.path('images').validate(images => images.length >= 1, 'Please provide at least one photo.');