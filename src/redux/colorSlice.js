import { createSlice, nanoid } from "@reduxjs/toolkit";

const savedColors = JSON.parse(localStorage.getItem("itemColorData")) || [];
const storedFilters = JSON.parse(localStorage.getItem("itemColorFilters")) || {};

const initialState = {
  data: savedColors,
  loading: false,
  error: null,
  Filters: storedFilters,
};

const colorSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },

    loadColorSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
      localStorage.setItem("itemColorData", JSON.stringify(state.data));
    },

    addColor(state, action) {
      state.data.push({ id: nanoid(), ...action.payload });
      localStorage.setItem("itemColorData", JSON.stringify(state.data));
    },

    updateColor(state, action) {
      const { id, updatedData } = action.payload;
      const index = state.data.findIndex((unit) => unit.id === id); // ✅ corrected findIndex
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...updatedData };
        localStorage.setItem("itemColorData", JSON.stringify(state.data));
      }
    },

    deleteColor(state, action) {
      state.data = state.data.filter((unit) => unit.id !== action.payload); // ✅ corrected filters → filter
      localStorage.setItem("itemColorData", JSON.stringify(state.data)); // ✅ corrected state.unit → state.data
    },

    setFilters(state, action) {
      state.Filters = action.payload;
      localStorage.setItem("itemColorFilters", JSON.stringify(state.Filters));
    },

    clearFilters(state) {
      state.Filters = {};
      localStorage.removeItem("itemColorFilters"); // ✅ fixed key typo
    },

    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  startLoading,
  loadColorSuccess,
  addColor,
  updateColor,  
  deleteColor,
  setFilters,
  clearFilters,
  setError,
} = colorSlice.actions;

export default colorSlice.reducer;
