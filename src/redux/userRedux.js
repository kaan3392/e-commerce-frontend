import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    logout: (state)=> {
      state.currentUser= null;
      state.isFetching = false;
    },
    updateUserSuccess:(state,action) => {
      state.isFetching = false;
      state.currentUser= action.payload;
      state.error= false
    }
  },
});

export const {loginStart, loginSuccess, loginFailure, logout, updateUserSuccess} = userSlice.actions;
export default userSlice.reducer;
