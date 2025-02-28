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
const db = firebase.firestore();
const auth = firebase.auth();

const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');

auth.onAuthStateChanged(user => {
    if (user) {
        loginBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
        loadTasks(user.uid);
    } else {
        loginBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
        document.getElementById("tasksContainer").innerHTML = "";
    }
});

loginBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
});

logoutBtn.addEventListener('click', () => auth.signOut());

// Agregar Tarea
document.getElementById('addTask').addEventListener('click', async () => {
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    const taskPriority = document.getElementById('taskPriority');

    if (taskInput.value.trim() === "" || !auth.currentUser) return;

    await db.collection("tasks").add({
        userId: auth.currentUser.uid,
        name: taskInput.value,
        date: taskDate.value,
        priority: taskPriority.value,
        completed: false
    });

    taskInput.value = "";
    taskDate.value = "";
});

// Cargar tareas en tiempo real
function loadTasks(userId) {
    db.collection("tasks").where("userId", "==", userId)
        .orderBy("date", "asc")
        .onSnapshot(snapshot => {
            const tasksContainer = document.getElementById('tasksContainer');
            tasksContainer.innerHTML = "";

            snapshot.forEach(doc => {
                const task = doc.data();
                const taskDiv = document.createElement('div');
                taskDiv.classList.add("p-2", "rounded", "shadow-md", "flex", "justify-between", "items-center", "dark:bg-gray-700");

                let colorClass = "bg-green-200";
                if (task.priority === "alta") colorClass = "bg-red-200";
                else if (task.priority === "media") colorClass = "bg-yellow-200";

                taskDiv.innerHTML = `
                    <span class="${colorClass} p-2 rounded">${task.name} - ${task.date}</span>
                    <button class="deleteTask bg-red-500 text-white px-2 py-1 rounded" data-id="${doc.id}">X</button>
                `;

                tasksContainer.appendChild(taskDiv);
            });

            document.querySelectorAll('.deleteTask').forEach(btn => {
                btn.addEventListener('click', async () => {
                    await db.collection("tasks").doc(btn.dataset.id).delete();
                });
            });

            new Sortable(tasksContainer, { animation: 150 });
        });
}
