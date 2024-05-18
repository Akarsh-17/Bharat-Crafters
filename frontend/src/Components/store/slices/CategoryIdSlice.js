import { createSlice } from '@reduxjs/toolkit';

const initialCategoryIdState = {
  CategoryId: 0,
};

const CategoryIdSlice = createSlice({
  name: 'CategoryId',
  initialState: initialCategoryIdState,
  reducers: {
    setCategoryId(state, action) {
      console.log('setCategoryId reducer called with payload:', action.payload);
      state.CategoryId = action.payload;
    },
  },
});

export const { setCategoryId } = CategoryIdSlice.actions;
export const CategoryIdReducer = CategoryIdSlice.reducer;
