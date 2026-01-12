import { Theme } from './modules/theme.js';
import { Todo } from './modules/todo.js';
import { ChartModule } from './modules/chart.js';
import { Auth } from './modules/auth.js';

/**
 * ESTADO GLOBAL DE LA APLICACIÓN
 */
export const State = {
    tareas: [],
    user: null // Almacenará el objeto user de Firebase
};

/**
 * INTERFAZ DE USUARIO - CONTROL DE AUTENTICACIÓN
 */
export const updateAuthUI = (user) => {
    const btnLogin = document.getElementById('btnLogin');
    const userProfile = document.getElementById('userProfile');
    const taskInputSection = document.querySelector('.input-section');

    if (user) {
        // Usuario logueado
        if (btnLogin) btnLogin.classList.add('hidden');
        if (userProfile) {
            userProfile.classList.remove('hidden');
            document.getElementById('userPhoto').src = user.photoURL || 'https://via.placeholder.com/35';
            document.getElementById('userName').textContent = user.displayName.split(' ')[0];
        }
        if (taskInputSection) taskInputSection.style.display = 'flex';
    } else {
        // Usuario desconectado
        if (btnLogin) btnLogin.classList.remove('hidden');
        if (userProfile) userProfile.classList.add('hidden');
        if (taskInputSection) taskInputSection.style.display = 'none';
        
        // Limpiar lista y gráfico al salir
        State.tareas = [];
        Todo.render();
        ChartModule.update();
    }
};

/**
 * API PÚBLICA (Expuesta para los atributos onclick del HTML)
 */
window.app = {
    // Autenticación
    login: () => Auth.login(),
    logout: () => Auth.logout(),
    
    // Tareas
    addTodo: () => Todo.agregar(),
    deleteTodo: (id) => Todo.eliminar(id),
    
    // Utilidades
    toggleTheme: () => Theme.toggle(),
    filterTodos: () => Todo.filterTodos(),
    exportJSON: () => Todo.exportJSON()
};

/**
 * INICIALIZACIÓN DEL SISTEMA
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log("🚀 SE-Hub: Iniciando núcleo del sistema...");
    
    // 1. Iniciar Tema (Modo Oscuro/Claro)
    Theme.init();
    
    // 2. Iniciar Autenticación 
    // Auth.init() se encarga de escuchar si el usuario está logueado
    // y disparar Todo.cargar() automáticamente.
    Auth.init();
    
    // 3. Iniciar Gráficos
    ChartModule.init();

    console.log("✅ SE-Hub: Módulos cargados y esperando autenticación.");
});