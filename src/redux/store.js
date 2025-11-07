import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage

import voucherReducer from "./voucherSlice";
import itemsReducer from "./itemsSlice"; // ✅ fixed filename + removed trailing /

/* 1️⃣ Combine reducers (add more slices here later) */
const rootReducer = combineReducers({
  voucher: voucherReducer,
  items: itemsReducer,
});

/* 2️⃣ Persist config */
const persistConfig = {
  key: "root", // key name in localStorage
  storage,     // uses localStorage
};

/* 3️⃣ Wrap your root reducer with persistReducer */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* 4️⃣ Create store */
export const store = configureStore({
  reducer: persistedReducer,
});

/* 5️⃣ Create persistor to control persistence lifecycle */
export const persistor = persistStore(store);
