const express=require('express');
const router=express.Router();


const {
    createCategory,
    showAllCategories,
    categoryPageDetails,
    getMaxRangeProductsFromCategory

}=require('../controllers/Category')

const {
    createSubCategory,
    showSubCategories,
    subCategoryPageDetails,
    getMaxRangeProductsFromSubCategory
}=require('../controllers/SubCategory')


const{
    auth,
    isAdmin
}=require('../middleware/auth')



router.post('/createCategory',auth,isAdmin,createCategory)

router.get('/showAllCategories',showAllCategories);

router.post('/createSubCategory',auth,isAdmin,createSubCategory)

router.get('/showSubCategories/:id',showSubCategories);

router.get('/categoryPageDetails/:id',categoryPageDetails);


router.get('/subCategoryPageDetails/:id',subCategoryPageDetails);

// price filter for category
router.get('/filterPriceCategory/:id',getMaxRangeProductsFromCategory)


// price filter for subCategory
router.get('/filterPriceSubCategory/:id',getMaxRangeProductsFromSubCategory)















module.exports= router