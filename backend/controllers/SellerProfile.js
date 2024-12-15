const SellerProfile = require("../models/SellerProfile");
const Seller = require("../models/Seller");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Payment = require("../models/Payment");
const mongoose = require("mongoose");

exports.getSellerOrders = async (req, res) => {
  try {
    //   const id = req.user.id;
    //   console.log(id);

    //   const successPayment = await Payment.find({
    //     sellerIds: { $in: [id] }
    //   })
    //   console.log(successPayment);

    //   let result;
    //   for(let order of successPayment)
    //   {
    //     const orderId=order?.order
    //     const orderDetails = await Order.findOne({ _id: orderId }).populate({
    //         path: 'productList.productInfo',
    //         model:'Product'
    //     })
    //     console.log(orderDetails);
    //     // console.log(orderDetails.productList);
    //     const selectedProduct=[];
    //     for (let list of orderDetails.productList) {
    //         // console.log("true or false ",list.seller.toString() === id.toString() )
    //         if (list.seller.toString() === id.toString() ) {
    //             selectedProduct.push(list);
    //         }
    //     }
    //     console.log(" slected ",selectedProduct)
    //     orderDetails[dataProduct] = {...selectedProduct}
    //     result={...result,...orderDetails}
    //   }
    //   console.log(result);

    const id = req.user.id;
    console.log("Seller ID:", id);

    const successPayment = await Payment.find({
      sellerIds: { $in: [id] },
      status: "success",
    });
    console.log("Success Payments:", successPayment);

    const result = [];

    for (let order of successPayment) 
    {
      const orderId = order?.order;

      const orderDetails = await Order.findOne({ _id: orderId }).populate({
        path:"buyer",
        model:"Buyer"
      }).populate({
        path: "productList.productInfo",
        model: "Product",
      }).lean();

      //   if (!orderDetails) continue; // Skip if order not found
      console.log("Order Details:", orderDetails);

      
      const selectedProduct = orderDetails.productList.filter(list =>
        list?.seller?.toString() === id?.toString()
      );
      console.log("Selected Products for Seller:", selectedProduct);
    
      orderDetails["selectedPro"] = [...selectedProduct];
      console.log(" Updated Order Details:", orderDetails);
      // Push the modified order to the result array
      result.push(orderDetails);
    }
    
    console.log("Final Result:", result);
    return res.status(200).json({
      success: true,
      data:result
    });
  } catch (error) {
    console.error("Error fetching purchased products:", error.message);
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// const modifiedOrder = {
  //   ...orderDetails.toObject(), // Convert Mongoose document to plain object
  //   selectedProducts: { ...selectedProduct }, // Add the filtered products
  // };
  // Filter the productList for items belonging to the current seller
  //   const selectedProduct = orderDetails.productList.filter(list =>
  //     list.seller.toString() === id.toString()
  //   );
  // const selectedProduct = [];
  // for (let list of orderDetails.productList) {
  //   // console.log("true or false ",list.seller.toString() === id.toString() )
  //   if (list.seller.toString() === id.toString()) {
  //     selectedProduct.push(list);
  //   }
  // }