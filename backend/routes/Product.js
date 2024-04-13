const express=require('express');
const router=express.Router();


const {
    createProduct,

}=require('../controllers/Product')

const{
    auth,
    isSeller,
    isBuyer,
}=require('../middleware/auth')




router.post('/addProduct',auth,isSeller,createProduct)


















module.exports= router