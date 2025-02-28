// Importaciones de Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDZD4cQ-m1cwKPxAnCeMtURZDFRpqBZ56w",
    authDomain: "tasknovadevproject.firebaseapp.com",
    projectId: "tasknovadevproject",
    storageBucket: "tasknovadevproject.appspot.com",
    messagingSenderId: "1009698468318",
    appId: "1:1009698468318:web:f4b509895eb5082f19ad4f",
    measurementId: "G-0Q7NVETN3E"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Funciones de inicio de sesión
export function login() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(result => console.log("Sesión iniciada:", result.user))
        .catch(error => alert("Error en inicio de sesión: " + error.message));
}

export function logout() {
    signOut(auth).then(() => console.log("Sesión cerrada."));
}

// Función para cargar tareas
export function loadTasks(userId) {
    const taskList = document.getElementById('taskList');
    const tasksRef = query(collection(db, 'tasks'), where('userId', '==', userId));

    getDocs(tasksRef).then(snapshot => {
        taskList.innerHTML = ""; // Limpiar tareas anteriores
        snapshot.forEach(doc => {
            const task = doc.data();
            const li = document.createElement('li');
            li.innerHTML = `<span>${task.text}</span> <button onclick="deleteTask('${doc.id}')">❌</button>`;
            taskList.appendChild(li);
        });
    });
}

// Función para agregar tareas
export function addTask(taskText) {
    const user = auth.currentUser;
    addDoc(collection(db, 'tasks'), {
        text: taskText,
        completed: false,
        userId: user.uid,
        timestamp: new Date()
    }).then(() => {
        loadTasks(user.uid); // Recargar tareas después de agregar
    });
}

// Función para eliminar tareas
export function deleteTask(taskId) {
    deleteDoc(doc(db, 'tasks', taskId)).then(() => {
        const user = auth.currentUser;
        if (user) {
            loadTasks(user.uid);  // Recargar tareas después de eliminar
        }
    });
}
