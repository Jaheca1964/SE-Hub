import { Theme } from './modules/theme.js';
import { Todo } from './modules/todo.js';
import { ChartModule } from './modules/chart.js';

// Estado global de la aplicación
export const State = {
    tareas: JSON.parse(localStorage.getItem('mis_tareas')) || [],
    isDarkMode: localStorage.getItem('theme') === 'dark'
};

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    Theme.init();
    Todo.render();
    ChartModule.init();
});

// Exponemos funciones al HTML (necesario cuando usas type="module")
window.app = {
    toggleTheme: () => Theme.toggle(),
    addTodo: () => Todo.agregar(),
    deleteTodo: (id) => Todo.eliminar(id),
    searchGithub: () => import('./modules/api.js').then(m => m.buscar()) 
};