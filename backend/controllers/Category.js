const Category=require("../models/Category")


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
                                           {name:true});

        
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
  try{

  }
  catch(error)
  {

  }
}