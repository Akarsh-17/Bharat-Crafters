import { createSlice } from '@reduxjs/toolkit';

const initialProductIdState = {
  ProductId: 0,
};

const ProductIdSlice = createSlice({
  name: 'ProductId',
  initialState: initialProductIdState,
  reducers: {
    setProductId(state, action) {
      console.log('setProductId reducer called with payload:', action.payload);
      state.ProductId = action.payload;
    },
  },
});

export const { setProductId } = ProductIdSlice.actions;
export const ProductIdReducer = ProductIdSlice.reducer;
