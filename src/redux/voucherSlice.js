import { createSlice } from "@reduxjs/toolkit";

const voucherSlice = createSlice({
  name: "voucher",
  initialState: {
    list: [],
    loading: false,
    filter: {},
  },
  reducers: {
    setVouchers: (state, action) => {
      state.list = action.payload;
    },
    addVoucher: (state, action) => {
      state.list.push(action.payload);
    },
    updateVoucher: (state, action) => {
      const index = state.list.findIndex((v) => v.id === action.payload.id);
      if (index !== -1) state.list[index] = action.payload;
    },
    deleteVoucher: (state, action) => {
      state.list = state.list.filter((v) => v.id !== action.payload);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { setVouchers, addVoucher, updateVoucher, deleteVoucher, setFilter } =
  voucherSlice.actions;
export default voucherSlice.reducer;
