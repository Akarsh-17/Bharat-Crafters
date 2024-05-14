import { configureStore } from '@reduxjs/toolkit';
import { CategoryIdReducer, ProductIdReducer } from './reducers.js'; 

const store = configureStore({
  reducer: {
    CategoryId: CategoryIdReducer,
    ProductId: ProductIdReducer
  },
});

export default store;
