// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "ticaret-57862.firebaseapp.com",
  projectId: "ticaret-57862",
  storageBucket: "ticaret-57862.appspot.com",
  messagingSenderId: "337147394959",
  appId: "1:337147394959:web:eccde8f181c53aa58029fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;