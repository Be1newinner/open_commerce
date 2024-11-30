import { createSlice } from "@reduxjs/toolkit";
import { get } from "http";

const initialState = {
  data: null, // User data
  token: null, // User token
  userId: null, // User ID
  loading: false,
  error: null,
  authRedirectPath: "/",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.data = action.payload;
      state.authRedirectPath = "/";
    },
    loginFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    authLogout: (state) => {
      state.token = null;
      state.userId = null;
      state.data = null;
      state.error = null;
    },
    setAuthRedirectPath: (state, action) => {
      state.authRedirectPath = action.payload;
    },

    getUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },

    getUserSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },

    getUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  authLogout,
  setAuthRedirectPath,
  getUserRequest,
  getUserSuccess,
  getUserFailure,
} = authSlice.actions;

export default authSlice.reducer;
