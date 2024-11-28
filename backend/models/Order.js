const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Buyer",
      required: true,
    },
    productList: [
      {
        productInfo: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        selectedOption: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        selectedSize: {
          type: String,
          required: true,
        },
        selectedColor: {
          type: String,
          required: true,
        },
        selectedPrice: {
          type: Number,
          required: true,
        },
        selectedQuantity: {
          type: Number,
          required: true,
        },
        orderStatus: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered'],
            default: 'pending'
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    orderId: {
      type: String,
      required: true,
    }, //razorpay
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
