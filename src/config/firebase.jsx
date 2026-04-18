// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBW0gvN6UKhXXYnZGTEtr61Gi8HC5jRRF0",
    authDomain: "react-todo-8ad09.firebaseapp.com",
    projectId: "react-todo-8ad09",
    storageBucket: "react-todo-8ad09.firebasestorage.app",
    messagingSenderId: "108783230669",
    appId: "1:108783230669:web:96c060b99d73cecf451384",
    measurementId: "G-0ZSNC3Z899"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app)


export { analytics, auth, firestore };

