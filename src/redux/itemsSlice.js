import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    list: [],
    loading: false,
    filter: {},
  },
  reducers: {
    setItems: (state, action) => {
      state.list = action.payload;
    },
    addItem: (state, action) => {
      state.list.push(action.payload);
    },
    updateItem: (state, action) => {
      const index = state.list.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
    deleteItem: (state, action) => {
      state.list = state.list.filter((i) => i.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setItems, addItem, updateItem, deleteItem, setFilter } =
  itemsSlice.actions;

export default itemsSlice.reducer;
