// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtKayQZZFiHLKLpfjLmjnNB9g5NANECqw",
  authDomain: "task-manager-f8f79.firebaseapp.com",
  projectId: "task-manager-f8f79",
  storageBucket: "task-manager-f8f79.appspot.com",
  messagingSenderId: "786012512807",
  appId: "1:786012512807:web:8a21a218338c6030576402",
  measurementId: "G-ZHYJ0DS4N1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export authentication and Google provider
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();