// src/firebase.ts
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJFNKM8-50E-deQ5Fat4DHt0Co6JzKsdM",
  authDomain: "expense-tracker-5d6ab.firebaseapp.com",
  projectId: "expense-tracker-5d6ab",
  storageBucket: "expense-tracker-5d6ab.firebasestorage.app",
  messagingSenderId: "822067369540",
  appId: "1:822067369540:web:00b3742b78dc58df018e11",
  measurementId: "G-WGNKG7K0BL"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
