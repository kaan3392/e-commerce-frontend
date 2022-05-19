import { createSlice } from "@reduxjs/toolkit";

const clientSlice = createSlice({
  name: "client",
  initialState: {
    clients: [],
    isFetching: false,
    error: false,
  },
  reducers: {
    fetchingStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    errorWarning: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    getClientSuccess: (state, action) => {
      state.isFetching = false;
      state.clients = action.payload;
    },
    deleteClientSuccess: (state, action) => {
      state.isFetching = false;
      state.clients.splice(
        state.clients.findIndex((item) => item._id === action.payload),
        1
      );
    }
  },
});

export const {
  fetchingStart,
  errorWarning,
  getClientSuccess,
  deleteClientSuccess,
} = clientSlice.actions;

export default clientSlice.reducer;
