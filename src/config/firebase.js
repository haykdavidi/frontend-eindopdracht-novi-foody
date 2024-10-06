import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC1-wvCJTM-53sHshsmtwoc4AeNDhYOtjI",
  authDomain: "moodff.firebaseapp.com",
  projectId: "moodff",
  storageBucket: "moodff.appspot.com",
  messagingSenderId: "680029664537",
  appId: "1:680029664537:web:1f8464433da4aca6c74188",
  measurementId: "G-SFXGQB8VB9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    db, auth
}
