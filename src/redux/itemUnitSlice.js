import { createSlice, nanoid } from "@reduxjs/toolkit";

const savedUnits = JSON.parse(localStorage.getItem("itemUnitData")) || [];
const storedFilters = JSON.parse(localStorage.getItem("itemUnitFilters")) || {};

const initialState = {
  data: savedUnits,
  loading: false,
  error: null,
  Filters: storedFilters,
};

const itemUnitSlice = createSlice({
  name: "itemUnit",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
    },

    loadItemUnitSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
      localStorage.setItem("itemUnitData", JSON.stringify(state.data));
    },

    addUnit(state, action) {
      state.data.push({ id: nanoid(), ...action.payload });
      localStorage.setItem("itemUnitData", JSON.stringify(state.data));
    },

    updateUnit(state, action) {
      const { id, updatedData } = action.payload;
      const index = state.data.findIndex((unit) => unit.id === id); // ✅ corrected findIndex
      if (index !== -1) {
        state.data[index] = { ...state.data[index], ...updatedData };
        localStorage.setItem("itemUnitData", JSON.stringify(state.data));
      }
    },

    deleteUnit(state, action) {
      state.data = state.data.filter((unit) => unit.id !== action.payload); // ✅ corrected filters → filter
      localStorage.setItem("itemUnitData", JSON.stringify(state.data)); // ✅ corrected state.unit → state.data
    },

    setFilters(state, action) {
      state.Filters = action.payload;
      localStorage.setItem("itemUnitFilters", JSON.stringify(state.Filters));
    },

    clearFilters(state) {
      state.Filters = {};
      localStorage.removeItem("itemUnitFilters"); // ✅ fixed key typo
    },

    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  startLoading,
  loadItemUnitSuccess,
  addUnit,
  updateUnit,
  deleteUnit,
  setFilters,
  clearFilters,
  setError,
} = itemUnitSlice.actions;

export default itemUnitSlice.reducer;
