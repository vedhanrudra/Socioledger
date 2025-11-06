import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Uses localStorage
import voucherReducer from "./voucherSlice";


// 1️⃣ Combine reducers (in case you add more slices later)
const rootReducer = combineReducers({
  voucher: voucherReducer,
});

// 2️⃣ Persist config
const persistConfig = {
  key: "root", // key for localStorage
  storage,     // storage type
};

// 3️⃣ Wrap your root reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4️⃣ Create store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
});

// 5️⃣ Create persistor to control persistence lifecycle
export const persistor = persistStore(store);
