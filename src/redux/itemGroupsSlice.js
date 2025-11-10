import { createSlice, nanoid } from "@reduxjs/toolkit";

const savedGroups = JSON.parse(localStorage.getItem("itemGroupData")) || [];
const storedFilters = JSON.parse(localStorage.getItem("itemGroupFilters")) || {};

const initialState = {
    data: savedGroups,
    loading: false,
    error: null,
    filters: storedFilters,
};

const itemGroupSlice = createSlice({
    name: "itemGroup",
    initialState,
    reducers: {
        startLoading(state) {
            state.loading = true;
        },

        loadItemGroupSuccess(state, action) {
            state.data = action.payload;
            state.loading = false;
            localStorage.setItem("itemGroupData", JSON.stringify(state.data));
        },

        addGroup(state, action) {
            state.data.push({ id: nanoid(), ...action.payload });
            localStorage.setItem("itemGroupData", JSON.stringify(state.data));
        },

        updateGroup(state, action) {
            const { id, updatedData } = action.payload;
            const index = state.data.findIndex((group) => group.id === id);
            if (index !== -1) {
                state.data[index] = { ...state.data[index], ...updatedData };
                localStorage.setItem("itemGroupData", JSON.stringify(state.data));
            }
        },

        deleteGroup(state, action) {
            state.data = state.data.filter((group) => group.id !== action.payload);
            localStorage.setItem("itemGroupData", JSON.stringify(state.data));
        },

        setFilters(state, action) {
            state.filters = action.payload;
            localStorage.setItem("itemGroupFilters", JSON.stringify(state.filters));
        },

        clearFilters(state) {
            state.filters = {};
            localStorage.removeItem("itemGroupFilters");
        },

        setError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {
    startLoading,
    loadItemGroupSuccess,
    addGroup,
    updateGroup,
    deleteGroup,
    setError,
    setFilters,
    clearFilters,
} = itemGroupSlice.actions;

export default itemGroupSlice.reducer;