// src/redux/itemGroupsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const itemGroupsSlice = createSlice({
  name: "itemGroups",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {
    setGroups: (state, action) => {
      state.list = action.payload;
    },
    addGroup: (state, action) => {
      state.list.push(action.payload);
    },
    updateGroup: (state, action) => {
      const index = state.list.findIndex((g) => g.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
    deleteGroup: (state, action) => {
      state.list = state.list.filter((g) => g.id !== action.payload);
    },
  },
});

export const { setGroups, addGroup, updateGroup, deleteGroup } =
  itemGroupsSlice.actions;
export default itemGroupsSlice.reducer;
