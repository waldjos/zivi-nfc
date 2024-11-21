// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrfYA-7FcbEU9Gua5NPY5QgTvesS-dQfA",
  authDomain: "zivi-code.firebaseapp.com",
  projectId: "zivi-code",
  storageBucket: "zivi-code.appspot.com",
  messagingSenderId: "606026084136",
  appId: "1:606026084136:web:d20e72583a760cfe736a1d",
  measurementId: "G-S04NPQ42BN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

