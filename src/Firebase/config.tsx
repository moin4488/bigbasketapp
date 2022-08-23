import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAvyXHYB4LVvKV-a2GUkBTRcIQRPyXFlQE",
  authDomain: "bigbasketclone-7c61d.firebaseapp.com",
  projectId: "bigbasketclone-7c61d",
  storageBucket: "bigbasketclone-7c61d.appspot.com",
  messagingSenderId: "968849016503",
  appId: "1:968849016503:web:f9e7dcc87a35c499dfaf32",
  measurementId: "G-X87T88BV76",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const fs = getFirestore(app);
const storage = getStorage(app);

export { auth, fs, storage };
