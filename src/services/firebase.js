// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC9mCJMtz3wgqlI7zSV_reoVYMBjgYcObc",
    authDomain: "studio-3pdzg.firebaseapp.com",
    databaseURL: "https://studio-3pdzg-default-rtdb.firebaseio.com",
    projectId: "studio-3pdzg",
    storageBucket: "studio-3pdzg.firebasestorage.app",
    messagingSenderId: "15068590098",
    appId: "1:15068590098:web:e78538f33769e2067ae8cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { app, db };
