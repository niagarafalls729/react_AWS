import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";


 const firebaseConfig = {
    apiKey: "AIzaSyC1ICeqZWvq-e2OBeo2ogtE1VB2_I35Mq8",
    authDomain: "my-mini-blog-85c88.firebaseapp.com",
    projectId: "my-mini-blog-85c88",
    storageBucket: "my-mini-blog-85c88.appspot.com",
    messagingSenderId: "513522949679",
    appId: "1:513522949679:web:3fc153fc2f124f4a7ff0da",
    measurementId: "G-007982S9NH",
  };
  const app = initializeApp(firebaseConfig);

  export const db = getFirestore(app);