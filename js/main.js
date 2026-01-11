// 1. Importaciones de módulos (Interfaces claras)
import { Theme } from './modules/theme.js';
import { Todo } from './modules/todo.js';
import { ChartModule } from './modules/chart.js';
import { Tester } from './modules/testing.js';

// 2. Definición del Estado Central (Single Source of Truth)
export const State = {
    tareas: JSON.parse(localStorage.getItem('mis_tareas')) || [],
    get isDarkMode() { 
        return document.body.classList.contains('dark-theme'); 
    }
};

// 3. Objeto Global de la Aplicación (Facade Pattern)
// Usamos Object.freeze para evitar que extensiones o scripts externos lo modifiquen
window.app = Object.freeze({
    toggleTheme: () => Theme.toggle(),
    addTodo: () => Todo.agregar(),
    deleteTodo: (id) => Todo.eliminar(id),
    filterTodos: () => Todo.filterTodos(),
    exportJSON: () => Todo.exportJSON(),
    runTests: () => {
        console.clear();
        Tester.runTodoTests(Todo, State);
    },
    searchGithub: async () => {
        try {
            // Importación dinámica para optimizar la carga inicial (Lazy Loading)
            const { apiModule } = await import('./modules/api.js');
            await apiModule.buscar();
        } catch (error) {
            console.error("Error al cargar el módulo de API:", error);
        }
    }
});

// 4. Ciclo de Vida de Inicio
document.addEventListener('DOMContentLoaded', async () => {
    try {
        Theme.init();
        
        // El sistema espera a Firebase antes de renderizar el resto
        await Todo.cargar(); 
        
        ChartModule.init();
        console.log("✅ SE-Hub: Conexión con Firebase establecida.");
    } catch (error) {
        console.error("Error en la inicialización:", error);
    }
});