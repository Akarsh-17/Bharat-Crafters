import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cartSummary: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const Exist = state.products.filter(
        (product) =>(
          product._id === action.payload._id &&
          product.selectedOption?._id===action.payload.selectedOption?._id &&
          product.selectedSize === action.payload.selectedSize &&
          product.selectedColor === action.payload.selectedColor&&
          product.selectedPrice === action.payload.selectedPrice
      ));

      if (Exist?.length === 1) {
        state.products = state.products.map((product) => {
          return product._id === action.payload._id &&
          product.selectedOption?._id===action.payload.selectedOption?._id &&
          product.selectedSize === action.payload.selectedSize &&
          product.selectedColor === action.payload.selectedColor&&
          product.selectedPrice === action.payload.selectedPrice
            ? {
                ...product,
                selectedQuantity: product?.selectedQuantity + 1,
              }
            : { ...product };
        });

        state.cartSummary += action?.payload?.selectedPrice;
      } else {
        state.products = [...state.products, action?.payload];
        state.cartSummary +=
          action?.payload?.selectedQuantity * action?.payload?.selectedPrice;
      }
    },
    increaseQuantity: (state, action) => {
      if (action.payload.selectedQuantity === 10) {
        return state;
      }
      state.products = state.products.map((product) => {
        return product._id === action.payload._id &&
        product.selectedOption?._id===action.payload.selectedOption?._id &&
        product.selectedSize === action.payload.selectedSize &&
        product.selectedColor === action.payload.selectedColor&&
        product.selectedPrice === action.payload.selectedPrice
          ? {
            ...product,
            selectedQuantity: product?.selectedQuantity + 1,
            }
          : { ...product };
      });

      state.cartSummary += action?.payload?.selectedPrice;
    },
    decreaseQuantity: (state, action) => {
      if (action.payload.selectedQuantity === 1) {
        return state;
      }

      state.products = state.products.map((product) => {
        return product._id === action.payload._id &&
        product.selectedOption?._id===action.payload.selectedOption?._id &&
        product.selectedSize === action.payload.selectedSize &&
        product.selectedColor === action.payload.selectedColor&&
        product.selectedPrice === action.payload.selectedPrice
          ? {
              ...product,
              selectedQuantity: product?.selectedQuantity - 1,
            }
          : { ...product };
      });

      state.cartSummary -= action?.payload?.selectedPrice;
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) =>
          !(
            product._id === action.payload._id &&
            product.selectedOption?._id===action.payload.selectedOption?._id &&
            product.selectedSize === action.payload.selectedSize &&
            product.selectedColor === action.payload.selectedColor&&
            product.selectedPrice === action.payload.selectedPrice
          )
      );

      state.cartSummary -= action?.payload?.selectedQuantity * action?.payload?.selectedPrice;
    },
    clearCart: (state) => {
      state.products = [];
      state.cartSummary = 0;
    },
    storeCart: (state, action) => {
      state.products = action?.payload?.cartInfo;
      state.cartSummary = action?.payload?.cartSummary;
    },
  },
});

export const {
  addToCart,
  clearCart,
  storeCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export const CartReducer= cartSlice.reducer;
