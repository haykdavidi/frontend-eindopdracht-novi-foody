import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBiLVs9rRRPKLsbByMkXm5VXayFpGrPT2s",
  authDomain: "moodyfoody-3a329.firebaseapp.com",
  projectId: "moodyfoody-3a329",
  storageBucket: "moodyfoody-3a329.appspot.com",
  messagingSenderId: "886481322655",
  appId: "1:886481322655:web:6695ee0f70ed6791e7d8aa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    db, auth
}