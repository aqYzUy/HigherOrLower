import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyBI9x6e5lDNbqocytCsVColjdV1dmSr23Y",
  authDomain: "higherorlower-19bc4.firebaseapp.com",
  projectId: "higherorlower-19bc4",
  storageBucket: "higherorlower-19bc4.firebasestorage.app",
  messagingSenderId: "684642091454",
  appId: "1:684642091454:web:39d5dca2e3ef523c3839ef",
  measurementId: "G-7L08WN69VP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const functions = getFunctions(app);

export { db, functions };
