// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAjB0iCdw19tW6o9NtjORFUdcoL3QXS3IU",
  authDomain: "styledecor-1dda1.firebaseapp.com",
  projectId: "styledecor-1dda1",
  storageBucket: "styledecor-1dda1.firebasestorage.app",
  messagingSenderId: "633799044548",
  appId: "1:633799044548:web:e81bb0ef26e73ec6164891",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
