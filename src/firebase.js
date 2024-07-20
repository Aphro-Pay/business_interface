// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDm-ZV2qAsgeF9kh5sFQw2IJZz3EikR3SI",
  authDomain: "aphro-95dea.firebaseapp.com",
  projectId: "aphro-95dea",
  storageBucket: "aphro-95dea.appspot.com",
  messagingSenderId: "75181753001",
  appId: "1:75181753001:web:87dc289de538319c835fb8",
  measurementId: "G-KE9L1LNMCR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
