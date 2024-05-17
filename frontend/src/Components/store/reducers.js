import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  CategoryId: 0,
  ProductId: 0,
  CurrentUser: '',
};

const CategoryIdSlice = createSlice({
  name: 'CategoryId',
  initialState,
  reducers: {
    setCategoryId(state, action) {
        console.log('setCategoryId reducer called with payload:', action.payload);
      state.CategoryId = action.payload;
    },
  },
});

const ProductIdSlice = createSlice({
    name: 'ProductId',
    initialState,
    reducers: {
      setProductId(state, action) {
          console.log('setProductId reducer called with payload:', action.payload);
        state.ProductId = action.payload;
      },
    },
  });

  const AuthSlice = createSlice({
    name: 'CurrentUser',
    initialState,
    reducers: {
      setCurrentUser(state, action) {
          console.log('setCurrentUser reducer called with payload:', action.payload);
          state.CurrentUser=action.payload;
      },
    },
  });


export const { setCategoryId } = CategoryIdSlice.actions;
export const { setProductId } = ProductIdSlice.actions;
export const {setCurrentUser} = AuthSlice.actions;

export const CategoryIdReducer = CategoryIdSlice.reducer;
export const ProductIdReducer = ProductIdSlice.reducer;
export const CurrentUserReducer = AuthSlice.reducer;
