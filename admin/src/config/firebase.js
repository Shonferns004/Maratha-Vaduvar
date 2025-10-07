import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBXg-iDVPnk-jMHUbR1ZWowBhZBBOBj6kk",
  authDomain: "client-project-9df2f.firebaseapp.com",
  projectId: "client-project-9df2f",
  storageBucket: "client-project-9df2f.firebasestorage.app",
  messagingSenderId: "191356335693",
  appId: "1:191356335693:web:6424ccd0567a3a35188e04"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {
    db,
    auth
}

