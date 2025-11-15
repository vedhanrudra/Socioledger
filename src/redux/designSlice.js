import { createSlice, nanoid } from "@reduxjs/toolkit";

// ✅ Load saved designs & filters from localStorage
const savedDesigns = JSON.parse(localStorage.getItem("designData")) || [];
const storedFilters = JSON.parse(localStorage.getItem("designFilters")) || {};

const initialState = {
  data: savedDesigns,
  loading: false,
  error: null,
  filters: storedFilters,
};

const designSlice = createSlice({
  name: "design",
  initialState,
  reducers: {
    // ---- 🔹 Loader ----
    startLoading(state) {
      state.loading = true;
    },

    // ---- 🔹 Load from localStorage ----
    loadDesignSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
      localStorage.setItem("designData", JSON.stringify(state.data));
    },

    // ---- 🔹 Add a new Design ----
    addDesign(state, action) {
      state.data.push({ id: nanoid(), wishlist: false, ...action.payload });
      localStorage.setItem("designData", JSON.stringify(state.data));
    },

    // ---- 🔹 Update existing Design ----
    updateDesign(state, action) {
      const { id, updatedData } = action.payload;
      const index = state.data.findIndex((design) => design.id === id);

      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...updatedData,
        };

        localStorage.setItem("designData", JSON.stringify(state.data));
      }
    },

    // ---- 🔹 Delete Design ----
    deleteDesign(state, action) {
      state.data = state.data.filter((design) => design.id !== action.payload);
      localStorage.setItem("designData", JSON.stringify(state.data));
    },

    // ---- 🔹 Toggle Wishlist ---- ✅ (THE FIX)
    toggleWishlist(state, action) {
      const id = action.payload;
      const item = state.data.find((d) => d.id === id);

      if (item) {
        item.wishlist = !item.wishlist; // toggle ❤️
        localStorage.setItem("designData", JSON.stringify(state.data));
      }
    },

    // ---- 🔹 Filters ----
    setFilters(state, action) {
      state.filters = action.payload;
      localStorage.setItem("designFilters", JSON.stringify(state.filters));
    },

    clearFilters(state) {
      state.filters = {};
      localStorage.removeItem("designFilters");
    },

    // ---- 🔹 Error Handling ----
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Export Actions
export const {
  startLoading,
  loadDesignSuccess,
  addDesign,
  updateDesign,
  deleteDesign,
  toggleWishlist,
  setFilters,
  clearFilters,
  setError,
} = designSlice.actions;

// Export Reducer
export default designSlice.reducer;
