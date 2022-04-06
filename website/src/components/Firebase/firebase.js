// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmLLO1e1QgqmKHB_azxV_xyK8hG-Rc6yc",
  authDomain: "taqueria-website.firebaseapp.com",
  projectId: "taqueria-website",
  storageBucket: "taqueria-website.appspot.com",
  messagingSenderId: "702958071184",
  appId: "1:702958071184:web:06aca4c76190ca47255715",
  measurementId: "G-4DY8ZGB3W7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);