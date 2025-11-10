import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage
import itemUnitReducer from "./itemUnitSlice";
import itemsReducer from "./itemsSlice";
import itemGroupReducer from "./itemGroupsSlice";

/* 1️⃣ Combine reducers */
const rootReducer = combineReducers({
  items: itemsReducer,
  itemGroup: itemGroupReducer,
  itemUnit: itemUnitReducer,
 });

/* 2️⃣ Persist config */
const persistConfig = {
  key: "root", // key name in localStorage
  storage,
};

/* 3️⃣ Wrap combined reducer */
const persistedReducer = persistReducer(persistConfig, rootReducer);

/* 4️⃣ Create store */
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

/* 5️⃣ Create persistor */
export const persistor = persistStore(store);
