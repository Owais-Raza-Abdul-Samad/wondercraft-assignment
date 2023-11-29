import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDFBfWzw7Um4rDhqFGgsRaH7kA0VAQuhfo",
  authDomain: "wondercraft-assignment.firebaseapp.com",
  projectId: "wondercraft-assignment",
  storageBucket: "wondercraft-assignment.appspot.com",
  messagingSenderId: "1032653976140",
  appId: "1:1032653976140:web:a381b1c3da66b1408b3ae9",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);


export {
  db,
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  storage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
};
