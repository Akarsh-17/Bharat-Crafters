const SubCategory=require('../models/Subcategory');
const Category=require('../models/Category');


exports.createSubCategory= async(req,res)=>{
    try{
        const{name,categoryId}=req.body

        if(!name || !categoryId)
        {
            return res.status(400).json({
                success:false,
                message:'All fields are required',
            })
        }

        const categoryDetails = await Category.findById(categoryId);
        if(!categoryDetails) {
            return res.status(404).json({
                success:false,
                message:'Category not found',
            });
        }

        const newSubCategory=await SubCategory.create({name})

        const updatedCategory=await Category.findByIdAndUpdate(categoryId,
                                          {
                                            $push:{
                                                subCategory:newSubCategory._id  
                                            }
                                          },
                                          {new:true}
                                        )
                                        .populate({
                                            path: "subCategory",
                                        })
                                        .exec();
        // console.log(categoryId);
        // console.log(newSubCategory);

        return res.status(200).json({
            success:true,
            message:"sub category Created Successfully",
            data:updatedCategory,
        });
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}


exports.updateSubCategory = async (req, res) => {
	try {
		const { name, subCategoryId,categoryId } = req.body;

        const categoryDetails = await Category.findById(categoryId);
        if(!categoryDetails) {
            return res.status(404).json({
                success:false,
                message:'Category not found',
            });
        }

        const subCategoryDetails = await SubCategory.findById(categoryId);
        if(!subCategoryDetails) {
            return res.status(404).json({
                success:false,
                message:'sub-Category not found',
            });
        }
		const subCategory = await SubCategory.findByIdAndUpdate(
			subCategoryId,
			{ name },
			{ new: true }
		);

		const category=await Category.findById(categoryId)
		.populate({
			path: "subCategory"
		})
		.exec()
        
		res.status(200).json({
			success: true,
			message: "SubCategory updated successfully",
			data:category
		});
	} catch (error) {
		console.error("Error updating section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
};


exports.showSubCategories= async(req,res)=>{
    try{
        const categoryId=req.params.id;
        const selectedCategory=await Category.find({_id:categoryId})
                                             .populate(
                                               {path: "subCategory"}
                                             )
                                             .exec();


        if(!selectedCategory)
        {
            console.log("Category not found.")
            return res.status(404).json({
                success:false,
                message:'no such category found'
            })
        }
         
         
        res.status(200).json({
        success:true,
        message:"All categories returned successfully",
        selectedCategory,
        })
    }
    catch(error) {
        console.log(error.message);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}