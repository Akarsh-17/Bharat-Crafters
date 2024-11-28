import { combineReducers,configureStore } from "@reduxjs/toolkit";
import { CategoryIdReducer } from './slices/CategoryIdSlice';
import { ProductIdReducer } from './slices/ProductIdSlice';
import { CurrentUserReducer } from './slices/AuthSlice';
import { WishlistReducer } from "./slices/WishlistSlice";
import { CartReducer } from "./slices/cartSlice";

import {
    persistStore,
    persistReducer,
    FLUSH, //is a Redux-persist action that forces the store to save the current
    REHYDRATE, //dispatched by persistStore when the store is restored from storage after reloading the application.
    PAUSE, //temporarily disables persistence for the store.
    PERSIST, //PERSIST is dispatched automatically by persistStore to initialize the persistence logic.
    PURGE,  //clears the persisted data from storage without affecting the current state in memory.
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
    Cart:CartReducer,
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