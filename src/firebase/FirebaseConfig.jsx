// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBB6u66XQCO680Uu-K7JyDFN52edW4Tg_A",
  authDomain: "firstapp-e1be9.firebaseapp.com",
  projectId: "firstapp-e1be9",
  storageBucket: "firstapp-e1be9.firebasestorage.app",
  messagingSenderId: "739549475583",
  appId: "1:739549475583:web:e40e21316b543e828ed2ca"
};

const app = initializeApp(firebaseConfig);

// Export Firebase services
const auth = getAuth(app);
const fireDB = getFirestore(app);

export { auth, fireDB };