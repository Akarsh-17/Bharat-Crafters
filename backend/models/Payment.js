const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buyer',
        required: true
    },
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },
    paymentId: {
        type: String,
        required: true
    }, // razorpay
    orderId: {
        type: String,
        required: true
    }, // razorpay
    signature: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['success', 'failure'],
        default: 'success'
    }
}, { timestamps: true });
module.exports = mongoose.model("Payment", paymentSchema);