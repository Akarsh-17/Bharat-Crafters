const Product=require('../models/Product')
const Joi = require('joi');
const Seller = require('../models/Seller');
const SubCategory = require('../models/Subcategory');
const { uploadImageToCloudinary } = require('../utilis/imageUploader');
const Category = require('../models/Category');


require("dotenv").config();



function validateProduct(product) 
{
    console.log('product ',product)
    console.log("name1",product.name);
    
    const schema = Joi.object({
        // seller: Joi.string().required(),
        subCategory: Joi.string().required(),
        category: Joi.string().required(),
        name: Joi.string().required().trim(),
        brand: Joi.string().required().trim(),
        description: Joi.string().required().trim(),
        // photos: Joi.array().items(Joi.string()).required().min(1),
        options: Joi.array().items(
          Joi.object({
            size: Joi.string().required().trim(),
            price: Joi.number().required().min(0),
            color: Joi.array().items(Joi.string()).required().min(1),
            noOfPieces: Joi.number().required().min(0),
          })
        ),
        weight: Joi.number().required(),
        components:Joi.array().items(Joi.string()).required().min(1),
        material: Joi.string().trim().optional().allow(''),
        specialFeatures: Joi.array().items(Joi.string()).required().min(1),
        shape: Joi.string().trim().optional().allow(''),
        style: Joi.string().trim().optional().allow(''),
        height: Joi.string().trim().optional().allow(''),
        width: Joi.string().trim().optional().allow(''),
        length: Joi.string().trim().optional().allow(''),
        pattern: Joi.string().trim().optional().allow(''),
        // productId: Joi.string().required().trim().unique(),
        status: Joi.string().valid(...['Draft', 'Published']),
    });

    //return Joi.validate(product, schema);
    return schema.validate(product)
}

exports.createProduct= async(req,res)=>{
    // console.log('type ', req.files.images)
    console.log('options ', req.body.options)

    if (typeof  req.body.components=== 'string'){
        req.body.components=JSON.parse(req.body.components);
    }

    if (typeof  req.body.specialFeatures=== 'string') {
        req.body.specialFeatures = JSON.parse(req.body.specialFeatures);
    }

    
    if (typeof  req.body.options=== 'string') {
        req.body.options = JSON.parse(req.body.options);
    }

    
    const newOptions=[]
    req.body.options.map((element)=>{
        let Obj = {
            size: element.size,
            price: element.price,
            color: element.color,
            noOfPieces: element.noOfPieces,
           
        }
        newOptions.push(Obj);
    });
    req.body.options=newOptions;
    const { error } = validateProduct(req.body,{abortEarly:false});
    if (error)
    {
        console.log(error)
        return res.status(400).send(error.details[0].message)
    }

    
    try {
        console.log(req.user.id)
        const sellerId=req.user.id
        let{
            name,
            brand,
            description,
            // images,
            options,
            weight,
            components,
            material,
            specialFeatures,
            shape,
            style,
            height,
            width,
            length,
            pattern,
            status,
            subCategory,
            category
        }=req.body;
        console.log("subCategoryId ",subCategory)
        console.log("printing ",req.files.images)
        const images=req.files.images
        if(!images.length)
        {
            return res.status(400).json({
                success:false,
                message:'Please Select atleast one image',
            });
        }
        if (typeof  images=== 'string') {
            images = JSON.parse(images);
        }

        if (typeof  options=== 'string') {
            options = JSON.parse(options);
        }

        if (typeof  options.color=== 'string') {
            options.color = JSON.parse(options.color);
        }
        
        const sellerDetails=await Seller.findById(sellerId);
        
        if(!sellerDetails) {
            return res.status(404).json({
                success:false,
                message:'seller  not found',
            });
        }

        const subCategoryDetails = await SubCategory.findById(subCategory)
        const categoryDetails = await Category.findById(category)
        if (!categoryDetails) {
            return res.status(404).json({
              success: false,
              message: "Category Details Not Found",
            })
          }
        if (!subCategoryDetails) {
          return res.status(404).json({
            success: false,
            message: "sub Category Details Not Found",
          })
        }
        let imageLink=[];
    
        for(let i=0;i<images.length;i++)
        {
            const result = await uploadImageToCloudinary(images[i], {
                folder:process.env.FOLDER_NAME,
            });
          
            imageLink.push(result.secure_url);
        }
        
        
        if (!status || status === undefined) {
            status = "Draft"
        }

        const newProduct = await Product.create({
          seller:sellerDetails._id,
          subCategory:subCategoryDetails._id,
          category:categoryDetails._id,
          name,
          brand,
          description,
          images:imageLink,
          options,
          weight,
          components,
          material,
          specialFeatures,
          shape,
          style,
          height,
          width,
          length,
          pattern,
          status
        });
        
        await Seller.findByIdAndUpdate(sellerId,
            {$push:{
                product:newProduct._id
            } },
            {new:true})

        const updatedSubCategory=await SubCategory.findByIdAndUpdate(
            subCategory,
            {
                $push:{
                    product:newProduct._id
                }
            },
            {new:true}
        )

        return res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            data:newProduct,
        });
        
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:'Failed to create Product',
            error: error.message,
        }) 
    }
}




// edit product
exports.editProduct=async (req,res)=>{
    try{
        const {productId}=req.body
        console.log(productId)
        // const {seller}=req.body
        const updates=req.body
        console.log(updates)
        const product=await Product.findById(productId)

        if(!product)
        {
            return res.status(404).json({ error: "Product not found" }) 
        }

        const userId=req.user.id

       if(userId!==product.seller.toString())
        {
           return res.status(401).json({
            success: false,
            message: "Unauthorized Access"
           })
        }
        
        if(req.files)
        {
            console.log("inside edit product for files")
            const images=req.files.images 

            if (typeof  images=== 'string') {
                images = JSON.parse(images);
            }

            let imageLink=[];
    
            for(let i=0;i<images.length;i++)
            {
                const result = await uploadImageToCloudinary(images[i], {
                    folder:process.env.FOLDER_NAME,
                });
              
                imageLink.push(result.secure_url);
            }
            product.images=imageLink
        }
        for (const key in updates) {
            console.log(key)
            if (updates.hasOwnProperty(key)) {
              if (key === "options" || key === "components" || key=== "specialFeatures") {
                product[key] = JSON.parse(updates[key])
              } else {
                product[key] = updates[key]
              }
            }
        }

        await product.save()
        
        // rating and reviews left
        const updatedProduct=await Product.findOne({
            _id:productId
        })
        .populate({
            path: "seller",
            populate: {
              path: "additionalDetail",
            },
        })
        .exec()
        
        // .populate("subCtegory")
        // .populate("category")
        
        res.json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        })
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({
          success: false,
          message: "Internal server error",
          error: error.message,
        }) 
    }
}



// get a list of products of given seller
exports.getSellerProducts = async (req,res)=>{
    try{
      const sellerId=req.user.id

      const products=await Product.find({
        seller:sellerId
      }).sort({createdAt:-1})
      res.status(200).json({
        success: true,
        data: products,
      })
    }
    catch(error){
      console.error(error)
      res.status(500).json({
      success: false,
      message: "Failed to retrieve seller Product",
      error: error.message,
    })
    }
}


exports.getFullProductDetails=async(req,res)=>{
    try{
        console.log("hello")
       const productId=req.params.id
    

       const productDetails=await Product.findOne({
        _id:productId,
       })
       .populate({
            path: "seller",
            populate: {
              path: "additionalDetail",
            },
        })
        .populate({
            path: "category",
            populate: {
              path: "subCategory",
              populate: {
                path: "product",
                match: { status: "Published" },
              }
            },
        })
        .populate({
            path:"subCategory",
            populate:{
                path:"product",
                match: { status: "Published" },
            }
        })
        .populate({
            path:"review",
            populate:{
                path:"buyer"
            }
        })
        .exec()
        
        if (!productDetails) {
            return res.status(400).json({
              success: false,
              message: `Could not find product`,
            })
        }
        const subCategoryId=productDetails.subCategory
        const selectedSubCategory = await SubCategory.findById(subCategoryId).populate('product').exec();
        const otherProductsIds = selectedSubCategory.product.filter(product => 
            product._id.toString() !== productId && product.status === 'Published'
        );

    // Fetch full details of the remaining products
        const otherProducts = await Product.find({ _id: { $in: otherProductsIds } }).exec();

        
        
        return res.status(200).json({
            success: true,
            data: {
                productDetails,
                otherProducts
            },
            message:"Product Fetched successfully"
        })
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Failed to retrieve Product details"
        })
    }
}


exports.deleteProduct=async(req,res)=>{
    try{
       const {productId}=req.params.id
       const userId=req.user.id
       const product=await Product.findById(productId)

       if(userId!==product.seller.toString())
        {
           return res.status(401).json({
            success: false,
            message: "Unauthorized Access"
           })
        }
        
        if (!product) {
            return res.status(400).json({
              success: false,
              message: `Could not find product with id: ${productId}`,
            })
        }
        
        const subCategoryId=product.subCategory
        await SubCategory.findByIdAndUpdate(
            {_id:subCategoryId},
            {
                $pull:{
                    product:productId
                }
            }
        )
        
        await Product.findByIdAndDelete(productId)

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        })
    }
    catch(error)
    {
        // console.error(error)
        return res.status(500).json({
          success: false,
          message: "Server error",
          error: error.message,
        })
    }
}



exports.newArrivals=async(req,res)=>{
    try {
        
        const newProducts = await Product.find({ status: 'Published' }) 
                                        .sort({ createdAt: -1 }) 
                                        .limit(15); 
    
        res.json(newProducts); 
      } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error for new products",
            error: error.message,
        })
      }
}

exports.newMensArrivals=async(req,res)=>{
    try {
        // Find the category document with the given name
        const category = await Category.findOne({ name: "Men's Apparels" });
    
        if (!category) {
          return "Category not found";
        }
    
        // Extract the array of subcategory IDs associated with the category
        const subCategoryIds = category.subCategory;
    
        // Query the products collection to find all products that belong to these subcategories
        const products = await Product.find({ subCategory: { $in: subCategoryIds } })
                                           .sort({ createdAt: -1 }) 
                                           .limit(15); ;
    
        if (products.length === 0) {
          return "No products found for the given category";
        }
    
        res.json(products); // Return the products found
      } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error for men's clothing ",
            error: error.message,
        })
      }
}


exports.newWomensArrivals=async(req,res)=>{
    try {
        // Find the category document with the given name
        const category = await Category.findOne({ name: "Women's Apparels" });
    
        if (!category) {
          return "Category not found";
        }
    
        // Extract the array of subcategory IDs associated with the category
        const subCategoryIds = category.subCategory;
    
        // Query the products collection to find all products that belong to these subcategories
        const products = await Product.find({ subCategory: { $in: subCategoryIds } })
                                           .sort({ createdAt: -1 }) 
                                           .limit(15); ;
    
        if (products.length === 0) {
          return "No products found for the given category";
        }
    
        res.json(products); // Return the products found
      } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error for women's clothing ",
            error: error.message,
        })
    }
}

exports.villageIndustryProducts=async(req,res)=>{
    try {
        // Find the category document with the given name
        const category = await Category.findOne({ name: "Village Industry Products" });
    
        if (!category) {
          return "Category not found";
        }
    
        // Extract the array of subcategory IDs associated with the category
        const subCategoryIds = category.subCategory;
    
        // Query the products collection to find all products that belong to these subcategories
        const products = await Product.find({ subCategory: { $in: subCategoryIds } })
                                           .sort({ createdAt: -1 }) 
                                           .limit(15); ;
    
        if (products.length === 0) {
          return "No products found for the given category";
        }
    
        res.json(products); // Return the products found
      } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error for Village Industry Products ",
            error: error.message,
        })
    }
}

exports.tribalArtAndCraft=async(req,res)=>{
    try {
        // Find the category document with the given name
        const category = await Category.findOne({ name: "Tribal Art and Craft" });
    
        if (!category) {
          return "Category not found";
        }
    
        // Extract the array of subcategory IDs associated with the category
        const subCategoryIds = category.subCategory;
    
        // Query the products collection to find all products that belong to these subcategories
        const products = await Product.find({ subCategory: { $in: subCategoryIds } })
                                           .sort({ createdAt: -1 }) 
                                           .limit(15); ;
    
        if (products.length === 0) {
          return "No products found for the given category";
        }
    
        res.json(products); // Return the products found
      } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error for Tribal Art and Craft ",
            error: error.message,
        })
    }
}


exports.searchBar=async(req,res)=>{
    try {
        const query = req.query.q; // Get the search query from request query parameters
        const priceMin = req.query.minPrice; // Get the minimum price from query parameters
        const priceMax = req.query.maxPrice; // Get the maximum price from query parameters

        // Build the query object for Mongoose
        const queryObject = { $text: { $search: query } };
        console.log("queryObject ",queryObject)
        // If price range is provided, add it to the query
        if (priceMin && priceMax) {
            queryObject['options.price'] = { $gte: parseFloat(priceMin), $lte: parseFloat(priceMax) };
        } else if (priceMin) {
            queryObject['options.price'] = { $gte: parseFloat(priceMin) };
        } else if (priceMax) {
            queryObject['options.price'] = { $lte: parseFloat(priceMax) };
        }

        // Perform text search and price range search using Mongoose
        const results = await Product.find(queryObject)
            .select('name brand description options.size options.color options.price')
            .limit(10); // Limit the number of results to 10 for example
        console.log(results)
        res.json({
            success:true,
            data:results
        }); // Return search results as JSON
    } catch (error) {
        console.error('Error searching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}



// from subCategory
exports.khadiProduct=async(req,res)=>{
    try{
       const subCategory=await SubCategory.findOne({name:"Khadi products"})

       if(!SubCategory)
       {
        return "Sub Category not found";
       }

       
       const products = await Product.find({ subCategory: subCategory._id  })
                                           .sort({ createdAt: -1 }) 
                                           .limit(15); ;
    
        if (products.length === 0) {
          return "No products found for the given sub category";
        }
    
        res.json({products,subCategory}); // Return the products found
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Server error for Khadi sub Category clothing ",
            error: error.message,
        })        
    }
}

exports.woodworkProduct=async(req,res)=>{
    try{
       const subCategory=await SubCategory.findOne({name:"Woodworks"})

       if(!SubCategory)
       {
        return "Sub Category not found";
       }

       
       const products = await Product.find({ subCategory: subCategory._id  })
                                           .sort({ createdAt: -1 }) 
                                           .limit(15); ;
    
        if (products.length === 0) {
          return "No products found for the given sub category";
        }
    
        res.json({products,subCategory}); // Return the products found
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Server error for Khadi sub Category clothing ",
            error: error.message,
        })        
    }
}


exports.bambooCraftProduct=async(req,res)=>{
    try{
       const subCategory=await SubCategory.findOne({name:"Bamboo craft"})

       if(!SubCategory)
       {
        return "Sub Category not found";
       }

       
       const products = await Product.find({ subCategory: subCategory._id  })
                                           .sort({ createdAt: -1 }) 
                                           .limit(15); ;
    
        if (products.length === 0) {
          return "No products found for the given sub category";
        }
    
        res.json({products,subCategory}); // Return the products found
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Server error for Khadi sub Category clothing ",
            error: error.message,
        })        
    }
}


exports.dorkaMetalCratProduct=async(req,res)=>{
    try{
       const subCategory=await SubCategory.findOne({name:"Dokra metal craft"})

       if(!SubCategory)
       {
        return "Sub Category not found";
       }

       
       const products = await Product.find({ subCategory: subCategory._id  })
                                           .sort({ createdAt: -1 }) 
                                           .limit(15); ;
    
        if (products.length === 0) {
          return "No products found for the given sub category";
        }
    
        res.json({products,subCategory}); // Return the products found
    }
    catch(error)
    {
        return res.status(500).json({
            success: false,
            message: "Server error for Khadi sub Category clothing ",
            error: error.message,
        })        
    }
}

// Pottery and Ceramics
