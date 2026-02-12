// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB39JXYYSVkOq_81DF4pfRtsGWEvMaAB30",
  authDomain: "rs-bricks-ecommerce-3126e.firebaseapp.com",
  projectId: "rs-bricks-ecommerce-3126e",
  storageBucket: "rs-bricks-ecommerce-3126e.firebasestorage.app",
  messagingSenderId: "707407397345",
  appId: "1:707407397345:web:c95180bba7805626ac12a0",
  measurementId: "G-F0M56M6J00"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); // 🔥 ADD THIS


export default app;