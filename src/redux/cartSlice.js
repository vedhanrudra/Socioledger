import { createSlice } from "@reduxjs/toolkit";

const savedCart = JSON.parse(localStorage.getItem("cartData")) || [];

const saveToStorage = (data) =>
  localStorage.setItem("cartData", JSON.stringify(data));

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: savedCart,
  },

  reducers: {
    // ⭐ Add Item to Cart
    addToCart: (state, action) => {
      const design = action.payload; // full design object

      const exist = state.items.find((i) => i.id === design.id);

      if (exist) {
        exist.qty += 1;
      } else {
        state.items.push({ ...design, qty: 1 });
      }

      saveToStorage(state.items);
    },

    // ⭐ Remove one design from cart
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      saveToStorage(state.items);
    },

    // ⭐ Increase quantity
    increaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.qty++;
      saveToStorage(state.items);
    },

    // ⭐ Decrease quantity
    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.qty > 1) item.qty--;
      saveToStorage(state.items);
    },

    // ⭐ Clear everything
    clearCart: (state) => {
      state.items = [];
      saveToStorage([]);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
