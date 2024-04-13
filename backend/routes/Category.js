const express=require('express');
const router=express.Router();


const {
    createCategory,
    showAllCategories

}=require('../controllers/Category')

const {
    createSubCategory,
    showSubCategories
}=require('../controllers/SubCategory')


const{
    auth,
    isAdmin
}=require('../middleware/auth')



router.post('/createCategory',auth,isAdmin,createCategory)

router.get('/showAllCategories',showAllCategories);

router.post('/createSubCategory',auth,isAdmin,createSubCategory)

router.get('/showSubCategories/:id',showSubCategories);











module.exports= router