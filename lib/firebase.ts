import { initializeApp, getApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore/lite";
import { getStorage, FirebaseStorage } from "firebase/storage";
import { getAnalytics, Analytics } from "firebase/analytics";

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

const getFirebase = () => {
    const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    const auth = getAuth(app);
    const db = getFirestore(app);
    const storage = getStorage(app);
    const analytics = process.env.NODE_ENV === 'production' && typeof window !== 'undefined' ? getAnalytics(app) : null;
    return { app, auth, db, storage, analytics };
};

export default getFirebase;
