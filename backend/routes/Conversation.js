const express=require('express');
const router=express.Router();


const{
    auth,
    isSeller,
    isBuyer,
}=require('../middleware/auth')


const {
 createNewConversation,
 getSellerConversation,
 getBuyerConversation,
 updatedLastMessage,
 getBuyerInfo,
 getSellerInfo
}=require('../controllers/Conversation')

const{
    createNewMessage,
    getAllMessages
}=require('../controllers/Message')


router.post('/create-new-conversation',auth,isBuyer,createNewConversation)

router.get('/get-seller-conversation',auth,isSeller,getSellerConversation)
router.get('/get-buyer-conversation',auth,isBuyer,getBuyerConversation)

router.put('/get-buyer-updatedLastMessage/:id',auth,isBuyer,updatedLastMessage)
router.put('/get-seller-updatedLastMessage/:id',auth,isSeller,updatedLastMessage)

router.get('/byerInfo/:id',auth,isSeller,getBuyerInfo)
router.get('/sellerInfo/:id',auth,isBuyer,getSellerInfo)



router.post('/seller-createNewMessage',auth,isSeller,createNewMessage)
router.post('/buyer-createNewMessage',auth,isBuyer,createNewMessage)

router.get('/seller-getAllMessages/:id',auth,isSeller,getAllMessages)
router.get('/buyer-getAllMessages/:id',auth,isBuyer,getAllMessages)
module.exports=router