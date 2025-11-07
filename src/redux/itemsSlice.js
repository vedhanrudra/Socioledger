import { createSlice } from "@reduxjs/toolkit";

const itemsSlice = createSlice({
  name: "items",
  initialState: {
    list: [], // all added items
    loading: false,
    filter: {
      name: "",
      type: "",
      status: "",
    }, // filters for the table
  },
  reducers: {
    // set entire list (useful if you ever fetch from API)
    setItems: (state, action) => {
      state.list = action.payload;
    },

    // add a new item
    addItem: (state, action) => {
      state.list.push(action.payload);
    },

    // update an existing item by id
    updateItem: (state, action) => {
      const index = state.list.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },

    // delete an item by id
    deleteItem: (state, action) => {
      state.list = state.list.filter((i) => i.id !== action.payload);
    },

    // set or update filters
    setFilter: (state, action) => {
      state.filter = { ...state.filter, ...action.payload };
    },
  },
});

export const { setItems, addItem, updateItem, deleteItem, setFilter } =
  itemsSlice.actions;

export default itemsSlice.reducer;
