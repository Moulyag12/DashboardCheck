import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwaFE_EI4wmFvLwlEaY3t5cJWNSx4XNN4",
  authDomain: "login-auth-ea0d8.firebaseapp.com",
  projectId: "login-auth-ea0d8",
  storageBucket: "login-auth-ea0d8.firebasestorage.app",
  messagingSenderId: "207587792416",
  appId: "1:207587792416:web:0e58cc8e2c8cfc93a14e45"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const db=getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
export default app; 