import { createSlice } from "@reduxjs/toolkit";
import { userRegistration, userLogin, userLogout } from "./authOperations";

const initialState = {
  userId: null,
  userName: null,
  email: null,
  avatar: null,
  isAuth: false,
  error: null,
};

const authSlice = createSlice({
  name: "authorization",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userRegistration.pending, (state) => {
        state.error = null;
      })
      .addCase(userRegistration.fulfilled, (state, { payload }) => {
        const { uid, email, displayName, photoURL } = payload;
        state.userId = uid;
        state.userName = displayName;
        state.email = email;
        state.avatar = photoURL;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(userRegistration.rejected, (state, { payload }) => {
        state.error = payload;
        state.isAuth = false;
      })
      .addCase(userLogin.pending, (state) => {
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        const { email, displayName, storedId, photoURL } = payload;
        state.userId = storedId;
        state.userName = displayName;
        state.email = email;
        state.avatar = photoURL;
        state.error = null;
        state.isAuth = true;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.error = payload;
        state.isAuth = false;
      })
      .addCase(userLogout.pending, (state) => {
        state.error = null;
      })
      .addCase(userLogout.fulfilled, (state) => {
        state.userId = null;
        state.userName = null;
        state.email = null;
        state.avatar = null;
        state.error = null;
        state.isAuth = false;
      })
      .addCase(userLogout.rejected, (state, { payload }) => {
        state.error = payload;
        state.isAuth = true;
      });
  },
});

export default authSlice.reducer;
