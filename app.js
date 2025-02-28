const db = firebase.firestore();

document.getElementById('addTaskBtn').addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    const user = firebase.auth().currentUser;

    if (taskText && user) {
        db.collection('tasks').add({
            text: taskText,
            completed: false,
            userId: user.uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            taskInput.value = "";
            loadTasks(user.uid);
        });
    }
});

function loadTasks(userId) {
    db.collection('tasks').where('userId', '==', userId).orderBy('timestamp', 'desc').get()
    .then(snapshot => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = "";
        snapshot.forEach(doc => {
            const task = doc.data();
            const li = document.createElement('li');
            li.innerHTML = `<span>${task.text}</span> <button onclick="deleteTask('${doc.id}')">❌</button>`;
            taskList.appendChild(li);
        });
    });
}

function deleteTask(taskId) {
    db.collection('tasks').doc(taskId).delete().then(() => {
        const user = firebase.auth().currentUser;
        if (user) loadTasks(user.uid);
    });
}
