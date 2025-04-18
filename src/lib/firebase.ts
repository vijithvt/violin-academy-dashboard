
// Firebase configuration for the Violin Class Management Dashboard
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJRChCFL8TVxBHVrc7uBLKp-I6nGruvX0",
  authDomain: "violin-class.firebaseapp.com",
  projectId: "violin-class",
  storageBucket: "violin-class.appspot.com", // Fixed storage bucket format
  messagingSenderId: "546473550186",
  appId: "1:546473550186:web:fc691a6d22dc3b09cc8513"
};

// Initialize Firebase services
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };

