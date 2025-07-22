// src/firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDfxk0qDx4TSOoGSML3h1hdEzDfQuAcl4s",
  authDomain: "talent-traveler.firebaseapp.com",
  projectId: "talent-traveler",
  storageBucket: "talent-traveler.firebasestorage.app", // ❗️ Fixed typo here (was .firebasestorage.app)
  messagingSenderId: "1053835486589",
  appId: "1:1053835486589:web:e4ffcc52e5879de5fd9814",
};

// ✅ Initialize Firebase App
const app = initializeApp(firebaseConfig);

// ✅ Setup Firebase Auth + Google Provider
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };
