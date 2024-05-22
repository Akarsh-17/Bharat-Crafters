import { combineReducers,configureStore } from "@reduxjs/toolkit";
import { CategoryIdReducer } from './slices/CategoryIdSlice';
import { ProductIdReducer } from './slices/ProductIdSlice';
import { CurrentUserReducer } from './slices/AuthSlice';
import { WishlistReducer } from "./slices/WishlistSlice";


import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";


const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const rootReducer=combineReducers({
    CategoryId: CategoryIdReducer,
    ProductId: ProductIdReducer,
    CurrentUser: CurrentUserReducer,
    Wishlist: WishlistReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
  
  export let persistor = persistStore(store);