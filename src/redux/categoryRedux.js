import { createSlice } from "@reduxjs/toolkit";

const cayegorySlice = createSlice({
  name: "category",
  initialState: {
    catProducts: [],
  },
  reducers: {
    filterProduct: (state, action) => {
      state.catProducts = action.payload;
    },
  },
});

export const { filterProduct } = cayegorySlice.actions;

export default cayegorySlice.reducer;
