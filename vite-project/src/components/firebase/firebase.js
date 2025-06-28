
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from 'firebase/auth'
import { getDatabase } from "firebase/database";



const firebaseConfig = {
  apiKey: "AIzaSyBEmvYRE_T9bKJlNQUp0-gFkpBUM8EIjgU",
  authDomain: "ravelling-app.firebaseapp.com",
  databaseURL: "https://ravelling-app-default-rtdb.firebaseio.com",
  projectId: "ravelling-app",
  storageBucket: "ravelling-app.firebasestorage.app",
  messagingSenderId: "722012785454",
  appId: "1:722012785454:web:61a32aa9939824283bc8bf",
  measurementId: "G-0YDPR2QJFT"
};
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
export const realtimedatabase=getDatabase(app)



























