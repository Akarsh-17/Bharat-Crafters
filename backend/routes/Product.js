const express=require('express');
const router=express.Router();


const {
    createProduct,
    editProduct,
    getSellerProducts,
    getFullProductDetails,
    deleteProduct,
    searchBar,
    tribalArtAndCraft,
    khadiProducts,
    villageIndustryProducts,
    newWomensArrivals,
    newMensArrivals,
    newArrivals
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




// search bar
router.get('/searchBar',searchBar)
router.get('/tribalArtAndCraft',tribalArtAndCraft)
router.get('/khadiProducts',khadiProducts)
router.get('/villageIndustryProducts',villageIndustryProducts)
router.get('/newWomensArrivals',newWomensArrivals)
router.get('/newMensArrivals',newMensArrivals)
router.get('/newArrivals',newArrivals)




module.exports= router