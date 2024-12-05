import axios from "axios";
import { clearCart } from "../Components/store/slices/cartSlice";
import toast from "react-hot-toast";
export const handlePayment = async (
  user,
  cart,
  dispatch,
  navigate,
  loginPayment,
  orderSuccessful
) => {
  if (!user) {
    loginPayment();
    return;
  }

  try {
    const key = await axios.get(
      `http://localhost:4000/api/v1/payment/paymentKey`,
      {
        withCredentials: true,
      }
    );

    console.log(key);

    const cartProduct = cart?.products?.map((product) => {
      const obj = {
        productInfo: product?._id,
        selectedOption: product?.selectedOption?._id,
        selectedSize: product?.selectedSize,
        selectedColor: product?.selectedColor,
        selectedPrice: product?.selectedPrice,
        selectedQuantity: product?.selectedQuantity,
      };
      console.log(obj);

      return obj;
    });
    let totalAmount = cart?.cartSummary + 99;
    const response = await axios.post(
      "http://localhost:4000/api/v1/payment/create-order",
      {
        amount: totalAmount,
        currency: "INR",
        cartSummary: cart?.cartSummary,
        cartProduct,
      },
      { withCredentials: true }
    );

    console.log("Response data:", response);
    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    const { orderId, order } = response.data;

    const options = {
      key: key?.data?.key,
      amount: order.amount,
      currency: order.currency,
      name: "BHARAT-CRAFTERS",
      // image:
      // "https://res.cloudinary.com/additya/image/upload/v1692425970/urban%20shoes/ygzxubdafzwwoqytm3hv.png",
      description: "Payment for cart items",
      order_id: order.id,
      handler: async (response) => {
        try {
          // const verifyUrl =;
          const verifyResponse = await axios.post(
            `http://localhost:4000/api/v1/payment/verify-payment`,
            {
              order_id: orderId,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
            },
            { withCredentials: true }
          );

          console.log("payment verification ", verifyResponse);
          if (verifyResponse.data.success) {
            orderSuccessful();
            const res = await axios.post(
              `http://localhost:4000/api/v1/payment/clearCartOnpaymentSuccess`,
              {}, // empty object as data if no data is being sent
              { withCredentials: true } // config object with withCredentials
            );
            console.log(res);
            if (res.data.success) {
              dispatch(clearCart());
              if (res.status === 200) {
                //decrease the quantity of the product in the inventory in backend
                navigate("/orders");
              } else {
                toast.error("cart not cleared");
              }
            }
          } else {
            toast.error("Payment verification failed");
          }
        } catch (error) {
          toast.error("Error verifying payment");
        }
      },
      prefill: {
        name: user?.firstName,
        email: user?.email,
        // contact: "8950225338",
      },
      theme: {
        color: "#528FF0",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();
  } catch (error) {
    toast.error(error?.response?.data?.message);
    toast.error("Error occured in login. Try again");
    console.log(error);
  }

  // const options = {
  //   key: key?.data?.key,
  //   amount: cartSummary,
  //   currency: "INR",
  //   name: "BHARAT CRAFTERS",
  //   image:
  //     "https://res.cloudinary.com/additya/image/upload/v1692425970/urban%20shoes/ygzxubdafzwwoqytm3hv.png",
  //   order_id: order?.data?.id,
  //   handler: async function (response) {
  //     await axiosInstance.post("/payment/verify", {
  //       orderDetail: orderDetail /* Required -> Colour, Size, Quantity, _id */,
  //       userId: user?._id,
  //       razorpay_order_id: response.razorpay_order_id,
  //       razorpay_payment_id: response.razorpay_payment_id,
  //       razorpay_signature: response.razorpay_signature,
  //     });

  //     /* Clear Cart, handle Success Message and Navigate to ORDERS page: */
  //     orderSuccessful();
  //     dispatch(clearCart());
  //     navigate("/order");
  //   },
  //   prefill: {
  //     name: user?.name,
  //     email: user?.email,
  //   },
  //   theme: {
  //     color: "#000000",
  //   },
  // };

  // const razor = new window.Razorpay(options);
  // razor.open();
};
