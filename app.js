// Importa los módulos de Firebase que necesitas
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDZD4cQ-m1cwKPxAnCeMtURZDFRpqBZ56w",
  authDomain: "tasknovadevproject.firebaseapp.com",
  projectId: "tasknovadevproject",
  storageBucket: "tasknovadevproject.firebasestorage.app",
  messagingSenderId: "1009698468318",
  appId: "1:1009698468318:web:f4b509895eb5082f19ad4f",
  measurementId: "G-0Q7NVETN3E"
};
// Inicializa Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Referencia a la colección de tareas en Firestore
const tasksCollection = collection(db, "tasks");

// Referencias a elementos del DOM
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskContainer = document.getElementById('task-container');

// Función para mostrar tareas
const displayTasks = async () => {
  taskContainer.innerHTML = ''; // Limpiar el contenedor antes de mostrar las tareas
  const querySnapshot = await getDocs(tasksCollection);
  querySnapshot.forEach((doc) => {
    const task = doc.data();
    const taskElement = document.createElement('div');
    taskElement.classList.add('task-item');
    taskElement.textContent = task.name;
    taskContainer.appendChild(taskElement);
  });
};

// Llamar a displayTasks para cargar las tareas al cargar la página
displayTasks();

// Agregar tarea
taskForm.addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevenir el envío del formulario
  const taskName = taskInput.value.trim();
  if (taskName) {
    try {
      // Agregar nueva tarea a Firestore
      await addDoc(tasksCollection, {
        name: taskName,
      });
      // Limpiar el campo de entrada
      taskInput.value = '';
      // Actualizar la lista de tareas
      displayTasks();
    } catch (e) {
      console.error("Error agregando tarea: ", e);
    }
  }
});
