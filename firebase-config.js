// Importar los módulos necesarios de Firebase (v9 modular)
import { getFirestore, collection, addDoc, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

// Inicializar Firebase (esto debería estar en tu archivo firebase-config.js)
const db = getFirestore();
const auth = getAuth();

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDZD4cQ-m1cwKPxAnCeMtURZDFRpqBZ56w",
    authDomain: "tasknovadevproject.firebaseapp.com",
    projectId: "tasknovadevproject",
    storageBucket: "tasknovadevproject.firebasestorage.app",
    messagingSenderId: "1009698468318",
    appId: "1:1009698468318:web:f4b509895eb5082f19ad4f",
    measurementId: "G-0Q7NVETN3E"
};

firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
