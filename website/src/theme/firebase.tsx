import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCmLLO1e1QgqmKHB_azxV_xyK8hG-Rc6yc",
    authDomain: "taqueria-website.firebaseapp.com",
    projectId: "taqueria-website",
    storageBucket: "taqueria-website.appspot.com",
    messagingSenderId: "702958071184",
    appId: "1:702958071184:web:06aca4c76190ca47255715",
    measurementId: "G-4DY8ZGB3W7"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export {db}
