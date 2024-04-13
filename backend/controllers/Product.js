const Product=require('../models/Product')
const Joi = require('joi');
const Seller = require('../models/Seller');
const SubCategory = require('../models/Subcategory');
const { uploadImageToCloudinary } = require('../utilis/imageUploader');

require("dotenv").config();



function validateProduct(product) 
{
    console.log('product ',product)
    console.log("name1",product.name);
    
    const schema = Joi.object({
        // seller: Joi.string().required(),
        subCategory: Joi.string().required(),
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
    console.log('type ', req.files.images)
    console.log('options ', req.body.options)

    if (typeof  req.body.components=== 'string'){
        req.body.components=JSON.parse(req.body.components);
    }

    if (typeof  req.body.specialFeatures=== 'string') {
        req.body.specialFeatures = JSON.parse(req.body.specialFeatures);
    }

    // if (typeof  req.body.images=== 'string') {
    //     req.body.images = JSON.parse(req.body.images);
    // }
    
    if (typeof  req.body.options=== 'string') {
        req.body.options = JSON.parse(req.body.options);
    }

    // if (typeof  req.body.options.color=== 'string') {
    //     req.body.options.color = JSON.parse(req.body.options.color);
    // }
    
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
            subCategory
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

        // if (typeof  specialFeatures=== 'string') {
        //     specialFeatures = JSON.parse(specialFeatures);
        // }

        if (typeof  options=== 'string') {
            options = JSON.parse(options);
        }

        // if (typeof  components=== 'string') {
        //     components = JSON.parse(components);
        // }

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









