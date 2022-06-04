// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { doc, setDoc, collection, getDocs, getFirestore} from 'firebase/firestore'
 

import database from '@react-native-firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlDOpB1M6B-BVe4XmCfEPX2fSWVNu26ug",
  authDomain: "evets-app-auth.firebaseapp.com",
  projectId: "evets-app-auth",
  storageBucket: "evets-app-auth.appspot.com",
  messagingSenderId: "547229195603",
  appId: "1:547229195603:web:ffc5f0322511ebbeb1d5a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()

// Reference to db 



export const addUserToDB = (userId) => {
  // User News array initialize
  if (!(doc(db, 'usersData', userId))){
    setDoc(doc(db, "usersData", userId), {
      savedNews: []
    });
  }
  
} 

export const authentication = getAuth(app);

