import { createSlice } from '@reduxjs/toolkit';

const initialWishlistState = {
  Wishlist: [],
};

const WishlistSlice = createSlice({
  name: 'Wishlist',
  initialState: initialWishlistState,
  reducers: {
    setWishlistProduct(state, action) {
      // console.log('set Wishlist reducer called with payload:', action.payload);
      // state.Wishlist = [...state.Wishlist, action.payload];
      const products = state.Wishlist.filter(
        (prd) => prd._id === action.payload._id
      );

      state.Wishlist =
        products.length === 0
          ? [...state.Wishlist, action.payload]
          : state.Wishlist.filter((wish) => wish._id !== action.payload._id);
  
    },

    removeWishlistProduct(state, action) {
      state.Wishlist = state.Wishlist.filter(item => item._id !== action.payload);
    },
    setWishlist: (state, action) => {
      state.Wishlist = action.payload;
    },

    clearWishlist:(state)=>
    {
      state.Wishlist=[]
      console.log(state.Wishlist)
    }
  },
});

export const { 
  setWishlistProduct , 
  removeWishlistProduct,
  setWishlist,
  clearWishlist
} = WishlistSlice.actions;
export const WishlistReducer = WishlistSlice.reducer;
