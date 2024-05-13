const express=require('express');
const router=express.Router();


const {
    createProduct,
    editProduct,
    getSellerProducts,
    getFullProductDetails,
    deleteProduct
}=require('../controllers/Product')

const{
    auth,
    isSeller,
    isBuyer,
}=require('../middleware/auth')




router.post('/addProduct',auth,isSeller,createProduct)
router.post('/editProduct',auth,isSeller,editProduct)
router.get('/getSellerProducts',auth,isSeller,getSellerProducts)
router.delete('/deleteProduct/:id',auth,isSeller,deleteProduct)
router.get('/getFullProductDetails/:id',getFullProductDetails)



















module.exports= router