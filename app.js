import { loginWithGoogle, logout, onAuthStateChanged } from './auth.js';
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js';

const db = getFirestore();

document.getElementById('loginBtn').addEventListener('click', () => {
    loginWithGoogle()
        .then(result => {
            console.log('Inicio de sesión exitoso:', result.user);
        })
        .catch(error => {
            console.error('Error al iniciar sesión:', error.message);
        });
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    logout()
        .then(() => {
            console.log('Sesión cerrada');
        })
        .catch(error => {
            console.error('Error al cerrar sesión:', error.message);
        });
});

onAuthStateChanged(user => {
    if (user) {
        loadTasks(user.uid);
    } else {
        clearTasks();
    }
});

document.getElementById('addTaskBtn').addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const user = auth.currentUser;

    if (taskText && user) {
        addDoc(collection(db, 'tasks'), {
            text: taskText,
            completed: false,
            userId: user.uid,
            timestamp: new Date()
        }).then(() => {
            taskInput.value = '';
            loadTasks(user.uid);
        });
    }
});

function loadTasks(userId) {
    const taskList = document.getElementById('taskList');
    const tasksRef = query(collection(db, 'tasks'), where('userId', '==', userId));

    getDocs(tasksRef).then(snapshot => {
        taskList.innerHTML = '';
        snapshot.forEach(doc => {
            const task = doc.data();
            const li = document.createElement('li');
            li.innerHTML = `<span>${task.text}</span> <button onclick="deleteTask('${doc.id}')">❌</button>`;
            taskList.appendChild(li);
        });
    });
}

function deleteTask(taskId) {
    deleteDoc(doc(db, 'tasks', taskId))
        .then(() => {
            const user = auth.currentUser;
            if (user) loadTasks(user.uid);
        });
}
