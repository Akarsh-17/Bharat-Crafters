const express = require('express');
const router = express.Router();

require('dotenv').config();

const{
    auth,
    isSeller,
    isBuyer,
}=require('../middleware/auth');

const { creatOrder, getKey, paymentVerification, onPaymentSuccess } = require('../controllers/Payment');

router.get("/paymentKey", auth,isBuyer, getKey);
router.post('/create-order', auth, isBuyer, creatOrder);
router.post('/verify-payment',auth,isBuyer,paymentVerification);
router.post('/on-paymentSuccess',auth, isBuyer,onPaymentSuccess);
router.post('/clearCartOnpaymentSuccess',auth,isBuyer,onPaymentSuccess)

module.exports= router