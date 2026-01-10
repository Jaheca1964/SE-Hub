// 1. Solo importaciones al principio
import { Theme } from './modules/theme.js';
import { Todo } from './modules/todo.js';
import { ChartModule } from './modules/chart.js';
import { Tester } from './modules/testing.js';

// 2. Definición del Estado
export const State = {
    tareas: JSON.parse(localStorage.getItem('mis_tareas')) || [],
    isDarkMode: localStorage.getItem('theme') === 'dark'
};

// 3. Vinculación al objeto global 'window'
window.app = {
    toggleTheme: () => Theme.toggle(),
    addTodo: () => Todo.agregar(),
    deleteTodo: (id) => Todo.eliminar(id),
    runTests: () => Tester.runTodoTests(Todo, State),
    searchGithub: async () => {
        const { apiModule } = await import('./modules/api.js');
        apiModule.buscar();
    }
};

// 4. Inicialización
document.addEventListener('DOMContentLoaded', () => {
    Theme.init();
    Todo.render();
    ChartModule.init();
    console.log("✅ SE-Hub: Sistema listo.");
});