// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZD4cQ-m1cwKPxAnCeMtURZDFRpqBZ56w",
  authDomain: "tasknovadevproject.firebaseapp.com",
  projectId: "tasknovadevproject",
  storageBucket: "tasknovadevproject.firebasestorage.app",
  messagingSenderId: "1009698468318",
  appId: "1:1009698468318:web:f4b509895eb5082f19ad4f",
  measurementId: "G-0Q7NVETN3E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Inicializa Firestore
const db = firebase.firestore();
});
// Selecciona el formulario y el input
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskContainer = document.getElementById('task-container');

// Función para mostrar una tarea en la página
function renderTask(doc) {
  // Crea un elemento para mostrar la tarea
  let taskDiv = document.createElement('div');
  taskDiv.textContent = doc.data().name;
  taskDiv.setAttribute('data-id', doc.id);
  taskContainer.appendChild(taskDiv);
}

// Captura el evento submit del formulario
taskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  // Agrega la tarea a Firestore en una colección llamada 'tasks'
  db.collection('tasks').add({
    name: taskInput.value,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  taskInput.value = ""; // Limpia el campo de entrada
});
// Escucha en tiempo real los cambios en la colección 'tasks'
db.collection('tasks').orderBy('createdAt').onSnapshot(snapshot => {
  // Limpia el contenedor de tareas
  taskContainer.innerHTML = "";
  snapshot.forEach(doc => {
    renderTask(doc);
  });
});


