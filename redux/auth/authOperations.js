import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const userRegistration = createAsyncThunk(
  "authorization/registration",
  async (userData, thunkAPI) => {
    try {
      const { userName, email, password, avatar } = userData;
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      await updateProfile(user, {
        displayName: userName,
        photoURL: avatar,
      });
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "authorization/login",
  async (userData, thunkAPI) => {
    try {
      const { email, password } = userData;
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userLogout = createAsyncThunk(
  "authorization/logout",
  async (_, thunkAPI) => {
    try {
      return await signOut(auth);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
