const Buyer = require("../models/Buyer");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const Order = require("../models/Order");
const Payment = require("../models/Payment");
const Razorpay = require("razorpay");
const crypto = require("crypto");

require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// console.log(razorpay);
exports.getKey = (req, res) => {
  return res.status(200).json({ key: process.env.RAZORPAY_KEY_ID });
};
exports.creatOrder = async (req, res) => {
  try {
    const { amount, currency, cartSummary, cartProduct } = req.body;
    console.log("req.body:", req.body);
    const buyerId = req.user.id;

    const user = await Buyer.findByIdAndUpdate(buyerId, {
      $set: { cartSummary },
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Buyer not found" });
    }
    const cart = await Cart.findByIdAndUpdate(user?.cart, {
      $set: { productList: cartProduct },
    });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }

    const options = {
      amount: amount * 100,
      currency,
      receipt: `receipt_${Date.now()}`,
    };
    console.log(options);
    console.log(cartProduct);

    for (let product of cartProduct) {
      const productData = await Product.findById(product.productInfo);
      for (let option of productData.options) {
        if (
          option._id.toString() === product.selectedOption &&
          product.selectedQuantity > option.noOfPieces
        ) {
          console.log(
            `Please reduce the Quantity of ${productData.name} for the selected option`
          );
          return res.status(404).json({
            success: false,
            message: `Please reduce the Quantity of ${productData.name} for the selected option`,
          });
        }
      }
    }

    const order = await razorpay.orders.create(options);
    console.log("order:", order);
    if (!order) {
      return res
        .status(500)
        .json({ success: false, message: "Failed to create Razorpay order" });
    }

    // const formattedProducts = parsedProducts.map(product => ({
    //     quantity: product.quantity,
    //     product: product.productId
    // }));

    const newOrder = new Order({
      buyer: req.user.id,
      productList: cartProduct,
      totalAmount: amount,
      paymentStatus: "pending",
      orderId: order.id,
    });

    console.log("newOreder", newOrder);

    await newOrder.save();

    res.status(201).json({ success: true, orderId: newOrder._id, order });
    // return res.status(201).json({ success: true, message:" till here" });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ success: false, message: "Error creating order" });
  }
};

exports.paymentVerification = async (req, res) => {
  try {
    const { order_id, payment_id, signature } = req.body;
    const buyerId = req.user.id;
    const order = await Order.findById(order_id);
    console.log("order while verifying payment:", order);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    const newPayment = new Payment({
      buyer: order.buyer,
      order: order._id,
      paymentId: payment_id,
      orderId: order.orderId,
      signature,
      amount: order.totalAmount,
    });

    await newPayment.save();

    order.paymentStatus = "paid";

    for (let product of order.productList) {
      product.orderStatus = "processing";
    }

    await order.save();

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      payment: newPayment,
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res
      .status(500)
      .json({ success: false, message: "Error verifying payment" });
  }
};

exports.onPaymentSuccess = async (req, res) => {
  try {
    console.log("checking payment success api entery");
    const buyerId = req.user.id;
    console.log("buyer id", buyerId);
    const cartSummary = 0;

    const user = await Buyer.findByIdAndUpdate(buyerId, {
      $set: { cartSummary: 0 },
    });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Buyer not found" });
    }
    const cart = await Cart.findByIdAndUpdate(user?.cart, {
      $set: { productList: [] },
    });
    if (!cart) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }
    // const user=Buyer.findById(buyerId)
    return res.status(200).json({
      success: true,
      message: "cartcleared successfully",
    });
  } catch {
    console.log(`Error while clearing on payment success: ${error}`);
    return res.status(500).json({
      success: false,
      message: "Server error during logout",
      error: error.message, // Optional: You can decide whether to include this
    });
  }
};
