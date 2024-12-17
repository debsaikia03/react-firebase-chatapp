// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/*
const firebaseConfig = {
  apiKey: "AIzaSyAB0erzIwAOXaXjFx6WQVB-hNZeDc2ECuc",
  authDomain: "chat-with-me-99.firebaseapp.com",
  projectId: "chat-with-me-99",
  storageBucket: "chat-with-me-99.appspot.com",
  messagingSenderId: "946388881562",
  appId: "1:946388881562:web:43229c452e3652743c4f23",
  measurementId: "G-WNTLRGW0XH"
};*/

const firebaseConfig = {
  apiKey: "AIzaSyA59YpF-JSwHoA64dGKC-A71OTmRJFDO6s",
  authDomain: "reactchatapp-99.firebaseapp.com",
  projectId: "reactchatapp-99",
  storageBucket: "reactchatapp-99.appspot.com",
  messagingSenderId: "970158231835",
  appId: "1:970158231835:web:00648ad184eb390c8b03be",
  measurementId: "G-KKTSKJBPE1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();



