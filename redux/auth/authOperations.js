import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { updateUserProfile, logOut, authStateChange } from "./authSlice";

export const userRegistration =
  ({ email, password, userName, avatar }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;
      const { displayName, uid, photoURL } = auth.currentUser;

      await updateProfile(user, {
        displayName: userName,
        photoURL: avatar,
      });

      const userProfile = {
        userId: uid,
        userName: displayName,
        userEmail: email,
        avatar: photoURL,
      };

      dispatch(updateUserProfile(userProfile));
      return user;
    } catch (error) {
      return error.message;
    }
  };

export const userLogin =
  ({ email, password }) =>
  async () => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      return error.message;
    }
  };

export const userLogout = () => async (dispatch) => {
  await signOut(auth);
  dispatch(logOut());
};

export const authStateChangeUser = () => async (dispatch) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userProfile = {
        userId: user.uid,
        userName: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };

      dispatch(authStateChange({ isAuth: true }));
      dispatch(updateUserProfile(userProfile));
    }
  });
};
