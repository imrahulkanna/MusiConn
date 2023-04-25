

import { initializeApp } from 'firebase/app';
import { getFirestore } from "@firebase/firestore";
import { getAnalytics } from "firebase/analytics";

import { getDatabase } from "@firebase/database";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592

export const firebaseConfig = {
    apiKey: "AIzaSyCCsyVLkkQwxkQh-MsiCj4nEYYNNPmhxIs",
    databaseURL: "https://musiconn-cbe6c-default-rtdb.asia-southeast1.firebasedatabase.app",
    authDomain: "musiconn-cbe6c.firebaseapp.com",
    projectId: "musiconn-cbe6c",
    storageBucket: "musiconn-cbe6c.appspot.com",
    messagingSenderId: "1097109548117",
    appId: "1:1097109548117:web:ef7f80078f91d2ace078dc"
};

// Initialize Firebase
// firebase.initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics and get a reference to the service
const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
export const RealtimeDatabase = getDatabase(app);
