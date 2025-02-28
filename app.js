// Importar los módulos necesarios de Firebase (v9 modular)
import { getFirestore, collection, addDoc, getDocs, query, where, doc, deleteDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';
import { getAuth, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

// Inicializar Firebase (esto debería estar en tu archivo firebase-config.js)
const db = getFirestore();
const auth = getAuth();

// Verificar el estado de autenticación
onAuthStateChanged(auth, user => {
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
    signOut(auth)
        .then(() => console.log("Sesión cerrada."))
        .catch(error => alert("Error al cerrar sesión: " + error.message));
});

// Agregar tarea
document.getElementById('addTaskBtn').addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const user = auth.currentUser;

    if (taskText && user) {
        addDoc(collection(db, 'tasks'), {
            text: taskText,
            completed: false,
            userId: user.uid,
            timestamp: serverTimestamp()  // Usar serverTimestamp de la v9
        }).then(() => {
            taskInput.value = "";
            loadTasks(user.uid);
        }).catch(error => console.error("Error al agregar tarea: ", error));
    }
});

// Cargar tareas desde Firestore
function loadTasks(userId) {
    const tasksQuery = query(collection(db, 'tasks'), where('userId', '==', userId), orderBy('timestamp', 'desc'));
    
    getDocs(tasksQuery)
    .then(snapshot => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = "";
        snapshot.forEach(doc => {
            const task = doc.data();
            const li = document.createElement('li');
            li.innerHTML = `<span>${task.text}</span> <button onclick="deleteTask('${doc.id}')">❌</button>`;
            taskList.appendChild(li);
        });
    }).catch(error => console.error("Error al cargar tareas: ", error));
}

// Eliminar tarea
function deleteTask(taskId) {
    deleteDoc(doc(db, 'tasks', taskId))
    .then(() => {
        const user = auth.currentUser;
        if (user) loadTasks(user.uid);  // Volver a cargar las tareas después de eliminar
    }).catch(error => console.error("Error al eliminar tarea: ", error));
}
