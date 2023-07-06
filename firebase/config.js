import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDfJWttN4X51J9iwvd51o-cAL-r2uIl-XY",
  authDomain: "geosights-4c77a.firebaseapp.com",
  projectId: "geosights-4c77a",
  storageBucket: "geosights-4c77a.appspot.com",
  messagingSenderId: "689938471074",
  appId: "1:689938471074:web:4b44319725c3df99701ffb",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
