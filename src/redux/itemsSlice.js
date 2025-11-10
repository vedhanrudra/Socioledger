import { createSlice, nanoid } from "@reduxjs/toolkit";


const savedItems = JSON.parse(localStorage.getItem("itemsData")) || [];
const savedFilters = JSON.parse(localStorage.getItem("itemsFilters")) || {}; // ✅ Object, not array

const initialState = {
    data: savedItems,
    loading: false,
    error: null,
    filters: savedFilters, 
};

const itemSlice = createSlice({
    name: "items",
    initialState,
    reducers: {

        startLoading(state) {
            state.loading = true;
        },

        
        loadItemSuccess(state, action) {
            state.data = action.payload;
            state.loading = false;
            localStorage.setItem("itemsData", JSON.stringify(state.data));
        },

        
        addItem(state, action) {
            state.data.push({ id: nanoid(), ...action.payload });
            localStorage.setItem("itemsData", JSON.stringify(state.data));
        },

        
        updateItem(state, action) {
            const { id, updatedData } = action.payload;
            const index = state.data.findIndex((item) => item.id === id);
            if (index !== -1) {
                state.data[index] = { ...state.data[index], ...updatedData };
                localStorage.setItem("itemsData", JSON.stringify(state.data));
            }
        },

        
        deleteItem(state, action) {
            state.data = state.data.filter((item) => item.id !== action.payload);
            localStorage.setItem("itemsData", JSON.stringify(state.data));
        },

        
        setFilters(state, action) {
            state.filters = action.payload; 
            localStorage.setItem("itemsFilters", JSON.stringify(state.filters)); 
        },

        
        clearFilters(state) {
            state.filters = {}; 
            localStorage.removeItem("itemsFilters");
        },

        
        setError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    startLoading,
    loadItemSuccess,
    addItem,
    updateItem,
    deleteItem,
    setError,
    setFilters,
    clearFilters,
} = itemSlice.actions;

export default itemSlice.reducer;