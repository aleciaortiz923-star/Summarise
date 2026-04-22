// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyUnjSnnLplk1iXHXXn4C8npx8YHAvrV0",
  authDomain: "summarise-3419f.firebaseapp.com",
  databaseURL: "https://summarise-3419f-default-rtdb.firebaseio.com",
  projectId: "summarise-3419f",
  storageBucket: "summarise-3419f.appspot.com",
  messagingSenderId: "739852733376",
  appId: "1:739852733376:web:a975966bb8ff8c21db1625",
  measurementId: "G-W1REQLEK4Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { auth, storage, analytics, db };
