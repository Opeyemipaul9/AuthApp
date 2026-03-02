// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoSaY_ceEzenMDHMGq37uDZ2Z7aagGW54",
  authDomain: "authapp-f2478.firebaseapp.com",
  projectId: "authapp-f2478",
  storageBucket: "authapp-f2478.firebasestorage.app",
  messagingSenderId: "86259154836",
  appId: "1:86259154836:web:a8b8c2b4ccd38587599981",
  measurementId: "G-81E4LZK784"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app)