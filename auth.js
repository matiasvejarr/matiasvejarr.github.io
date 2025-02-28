// Importar los módulos necesarios de Firebase (v9 modular)
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

// Inicializar Firebase (debe estar inicializado antes de usarlo)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';

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
const app = initializeApp(firebaseConfig);

// Obtener la instancia de autenticación
const auth = getAuth(app);

// Escuchar el estado de autenticación
onAuthStateChanged(auth, user => {
    console.log('Estado de la sesión:', user); // Esto ayuda a depurar si la sesión se actualiza correctamente
    if (user) {
        document.getElementById('userInfo').innerText = `Bienvenido, ${user.displayName}`;
        document.getElementById('loginBtn').style.display = 'none';
        document.getElementById('logoutBtn').style.display = 'block';
        document.getElementById('tasksContainer').style.display = 'block';
        loadTasks(user.uid); // Cargar tareas desde Firestore para el usuario
    } else {
        document.getElementById('userInfo').innerText = "";
        document.getElementById('loginBtn').style.display = 'block';
        document.getElementById('logoutBtn').style.display = 'none';
        document.getElementById('tasksContainer').style.display = 'none';
    }
});

// Iniciar sesión con Google
document.getElementById('loginBtn').addEventListener('click', () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(result => console.log("Sesión iniciada:", result.user))
        .catch(error => alert("Error en inicio de sesión: " + error.message));
});

// Cerrar sesión
document.getElementById('logoutBtn').addEventListener('click', () => {
    signOut(auth).then(() => console.log("Sesión cerrada."));
});
