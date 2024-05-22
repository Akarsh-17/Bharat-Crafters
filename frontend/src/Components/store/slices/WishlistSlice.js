import { createSlice } from '@reduxjs/toolkit';

const initialWishlistState = {
  Wishlist: [],
};

const WishlistSlice = createSlice({
  name: 'Wishlist',
  initialState: initialWishlistState,
  reducers: {
    setWishlistProduct(state, action) {
      console.log('set Wishlist reducer called with payload:', action.payload);
      state.Wishlist = [...state.Wishlist, action.payload];
  
    },

    removeWishlistProduct(state, action) {
      state.Wishlist = state.Wishlist.filter(item => item._id !== action.payload);
    },
  },
});

export const { setWishlistProduct , removeWishlistProduct} = WishlistSlice.actions;
export const WishlistReducer = WishlistSlice.reducer;
