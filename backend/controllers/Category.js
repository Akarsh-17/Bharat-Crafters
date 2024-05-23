const { match } = require("assert");
const Category=require("../models/Category")
const Product=require('../models/Product')
function getRandomInt(max) {
  return Math.floor(Math.random() * max)
}
exports.createCategory=async(req,res)=>{
    try{
          const {name}=req.body;
          if(!name)
          {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            })
          }

          const categoryDetails= await Category.create({name});

          console.log(categoryDetails);

          return res.status(200).json(
          {
            success:true,
            message:"Category Created Successfully",
          })
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}



exports.showAllCategories= async(req,res)=>{
  try{
        const allCategories= await Category.find({},
                                           {name:true})
                                           .populate({
                                            path: 'subCategory',
                                            select: '_id name'
                                          })

        
        console.log("printing all categories ",allCategories)
        res.status(200).json({
        success:true,
        message:"All categories returned successfully",
        allCategories,
      })
  }
  catch(error) {
      return res.status(500).json({
          success:false,
          message:error.message,
      })
  }
}


exports.categoryPageDetails=async(req,res)=>{
  try {
    const categoryId  = req.params.id

    // Get courses for the specified category
    const selectedCategory = await Category.findById(categoryId)
    .populate({
      path:"subCategory",
      populate:{
        path:"product",
        match: { status: "Published" },
      }
    })
    .exec()

    console.log("SELECTED CATEGORY", selectedCategory)
    // Handle the case when the category is not found
    if (!selectedCategory) {
      console.log("Category not found.")
      return res
        .status(404)
        .json({ success: false, message: "Category not found" })
    }
    // Handle the case when there are no products
    if (selectedCategory.subCategory.length === 0) {
      console.log("No Data found for the selected category.")
      return res.status(404).json({
        success: false,
        message: "No Data found for the selected category.",
      })
    }

    // Get products for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    })
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
    .populate({
      path:"subCategory",
      populate:{
        path:"product",
        match: { status: "Published" },
      }
    })
    .exec()
    console.log(differentCategory)
    
    // Get top-selling Products across all categories
    const allCategories = await Category.find()
    .populate({
      path:"subCategory",
      populate:{
        path:"product",
        match: { status: "Published" },
      }
    })
    .exec()
    const allProducts = allCategories.flatMap((category) => category.subCategory.product)
    const mostSellingProducts = allProducts
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10)

    res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingProducts,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}


exports.getMaxRangeProductsFromCategory=async(req,res)=>{
  try {
    const { categoryId } = req.params;
    const { maxPrice } = req.body;

    if (!categoryId || !maxPrice) {
      return res.status(400).json({ message: 'Category ID and max price are required.' });
    }

    // Validate maxPrice to ensure it is a number
    const maxPriceNumber = parseFloat(maxPrice);
    if (isNaN(maxPriceNumber)) {
      return res.status(400).json({ message: 'Max price must be a number.' });
    }

    // Query the database
    const products = await Product.find({
      category: categoryId,
      'options.price': { $lt: maxPriceNumber }
    });

    res.status(200).json(products);
  }catch(error)
  {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })    
  }
}


// exports.getProductsByCategoryAndPrice = async (req, res) => {
//   try {
//     const  categoryId  = req.params.id;
//     const { maxPrice } = req.body;

//     if (!categoryId || !maxPrice) {
//       return res.status(400).json({ message: 'Category ID and max price are required.' });
//     }

//     // Validate maxPrice to ensure it is a number
//     const maxPriceNumber = parseFloat(maxPrice);
//     if (isNaN(maxPriceNumber)) {
//       return res.status(400).json({ message: 'Max price must be a number.' });
//     }

//     // Use aggregate to filter products based on category and price within options
//     const products = await Product.aggregate([
//       {
//         $match: {
//           category: mongoose.Types.ObjectId(categoryId)
//         }
//       },
//       {
//         $unwind: "$options"
//       },
//       {
//         $match: {
//           "options.price": { $lt: maxPriceNumber }
//         }
//       },
//       {
//         $group: {
//           _id: "$_id",
//           seller: { $first: "$seller" },
//           category: { $first: "$category" },
//           subCategory: { $first: "$subCategory" },
//           buyer: { $first: "$buyer" },
//           name: { $first: "$name" },
//           brand: { $first: "$brand" },
//           description: { $first: "$description" },
//           images: { $first: "$images" },
//           options: { $push: "$options" },
//           weight: { $first: "$weight" },
//           components: { $first: "$components" },
//           material: { $first: "$material" },
//           specialFeatures: { $first: "$specialFeatures" },
//           shape: { $first: "$shape" },
//           style: { $first: "$style" },
//           height: { $first: "$height" },
//           width: { $first: "$width" },
//           length: { $first: "$length" },
//           pattern: { $first: "$pattern" },
//           status: { $first: "$status" },
//           createdAt: { $first: "$createdAt" },
//           rating: { $first: "$rating" },
//           peopleRated: { $first: "$peopleRated" },
//           review: { $first: "$review" },
//         }
//       }
//     ]);

//     res.status(200).json(products);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error });
//   }
// };