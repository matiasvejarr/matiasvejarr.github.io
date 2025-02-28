// firebase-config.js
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, GoogleAuthProvider } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDZD4cQ-m1cwKPxAnCeMtURZDFRpqBZ56w",
    authDomain: "tasknovadevproject.firebaseapp.com",
    projectId: "tasknovadevproject",
    storageBucket: "tasknovadevproject.firebasestorage.app",
    messagingSenderId: "1009698468318",
    appId: "1:1009698468318:web:f4b509895eb5082f19ad4f",
    measurementId: "G-0Q7NVETN3E"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);  // Esto es necesario para inicializar la app

// Exportar los servicios de Firebase para usarlos en otros archivos
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
