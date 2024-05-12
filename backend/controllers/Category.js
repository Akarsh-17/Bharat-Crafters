const Category=require("../models/Category")

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

        
        // console.log("printing all categories ",allCategories)
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
        match: { status: "Published" },
        populate:{
            path:"product"
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
    // Handle the case when there are no courses
    if (selectedCategory.subCategory.length === 0) {
      console.log("No Data found for the selected category.")
      return res.status(404).json({
        success: false,
        message: "No Data found for the selected category.",
      })
    }

    // Get courses for other categories
    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    })
    let differentCategory = await Category.findOne(
      categoriesExceptSelected[getRandomInt(categoriesExceptSelected.length)]
        ._id
    )
    .populate({
      path:"subCategory",
      match: { status: "Published" },
      populate:{
          path:"product"
      }
    })
    .exec()
    console.log(differentCategory)
    
    // Get top-selling Products across all categories
    const allCategories = await Category.find()
    .populate({
      path:"subCategory",
      match: { status: "Published" },
      populate:{
          path:"product"
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