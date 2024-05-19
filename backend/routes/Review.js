const express=require('express');
const router=express.Router();

const {
    getReviewById,
    addReview,
    deleteReview,
    updateReview
}=require('../controllers/Review')

const {
    auth,
    isBuyer
}=require('../middleware/auth')

router.get('/getReviewById/:productId',getReviewById)  //only productId in params
router.get('/addReview',auth,isBuyer,addReview)   //send data in body like product id and rest accordin to model
router.get('/deleteReview',auth,isBuyer,deleteReview)  // only product Id in body
router.get('/updateReview',auth,isBuyer,updateReview)   //send data in body like product id and rest accordin to model

module.exports= router