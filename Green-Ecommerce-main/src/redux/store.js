import { combineReducers, configureStore } from "@reduxjs/toolkit"; 
import { persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER, } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import wishlistSlice from "./wishlistSlice";

const rootReducer = combineReducers({
    user: userSlice,
    cart: cartSlice,
    product: productSlice,
    wishlist: wishlistSlice
})

const presistConfig = {
    key: 'root',
    storage,
    blacklist: ['wishlist', 'product']
};

export const presistedReducer = persistReducer(presistConfig, rootReducer);

export const store = configureStore({
    reducer: presistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})