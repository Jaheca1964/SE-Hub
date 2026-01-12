import { Auth } from './modules/auth.js';
import { Todo } from './modules/todo.js';
import { ChartModule } from './modules/chart.js';
import { auth } from './modules/database.js';
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

export const State = {
    user: null,
    tareas: [],
    tema: localStorage.getItem('theme') || 'dark'
};

window.app = {
    login: () => Auth.login(),
    logout: () => Auth.logout(),
    addTodo: () => Todo.agregar(),
    deleteTodo: (id) => Todo.eliminar(id),
    
    // Vínculo para el input de búsqueda
    filterTodos: () => Todo.filterTodos(),
    
    exportJSON: () => Todo.exportJSON(),
    toggleTheme: () => {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        State.user = user;
        document.getElementById('btnLogin').classList.add('hidden');
        document.getElementById('userProfile').classList.remove('hidden');
        document.getElementById('userName').textContent = user.displayName;
        document.getElementById('userPhoto').src = user.photoURL;
        Todo.cargar();
    } else {
        State.user = null;
        document.getElementById('btnLogin').classList.remove('hidden');
        document.getElementById('userProfile').classList.add('hidden');
        Todo.render([]);
    }
});