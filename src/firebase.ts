import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDSTswY3d-nb54nWXq4mrSJf5dNVpECv8k",
  authDomain: "algota-479b2.firebaseapp.com",
  projectId: "algota-479b2",
  storageBucket: "algota-479b2.firebasestorage.app",
  messagingSenderId: "40194585317",
  appId: "1:40194585317:web:f856c688cc3f08364d9a0c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
