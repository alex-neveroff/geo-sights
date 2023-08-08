import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userName: null,
  email: null,
  avatar: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      userName: payload.userName,
      email: payload.email,
      avatar: payload.avatar,
    }),

    authStateChange: (state, { payload }) => ({
      ...state,
      isAuth: payload.isAuth,
    }),
    logOut: () => initialState,
  },
});

export const { updateUserProfile, authStateChange, logOut } = authSlice.actions;

export const authReducer = authSlice.reducer;
