// Importar los módulos necesarios de Firebase (v9 modular)
import { getFirestore, collection, addDoc, getDocs, query, where } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

// Inicializar Firebase (esto debería estar en tu archivo firebase-config.js)
const db = getFirestore();
const auth = getAuth();

firebase.auth().onAuthStateChanged(user => {
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

document.getElementById('loginBtn').addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => console.log("Sesión iniciada:", result.user))
        .catch(error => alert("Error en inicio de sesión: " + error.message));
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    firebase.auth().signOut().then(() => console.log("Sesión cerrada."));
});
