import { State } from '../main.js';
import { ChartModule } from './chart.js';

/**
 * Módulo de Gestión de Tareas (To-Do)
 * Maneja el ciclo de vida de las tareas: creación, persistencia y renderizado.
 */
export const Todo = {
    agregar() {
        const input = document.getElementById('taskInput');
        const priority = document.getElementById('taskPriority');
        const errorMsg = document.getElementById('errorMsg');
        
        // Validación técnica: evitamos strings vacíos o muy cortos
        if (input.value.trim().length < 3) {
            if (errorMsg) errorMsg.style.display = 'block';
            return;
        }

        if (errorMsg) errorMsg.style.display = 'none';

        const nuevaTarea = {
            id: Date.now(),
            texto: input.value.trim(),
            prioridad: priority.value, // 'low', 'medium' o 'high'
            completada: false
        };
        
        State.tareas.push(nuevaTarea);
        this.save();
        
        // Limpieza de UI
        input.value = "";
        priority.value = "medium"; // Reset a prioridad por defecto
    },

    eliminar(id) {
        // Inmutabilidad: filtramos para obtener un nuevo array sin el ID seleccionado
        State.tareas = State.tareas.filter(t => t.id !== id);
        this.save();
    },

    save() {
        // Persistencia síncrona en LocalStorage
        localStorage.setItem('mis_tareas', JSON.stringify(State.tareas));
        
        // Notificamos a otros módulos que el estado cambió
        this.render();
        ChartModule.update();
        this.updateBadge();
    },

    updateBadge() {
        const badge = document.getElementById('taskCount');
        if (badge) badge.textContent = State.tareas.length;
    },

    render() {
        const lista = document.getElementById('taskList');
        if (!lista) return;

        // Renderizado dinámico inyectando la clase de prioridad para el CSS
        lista.innerHTML = State.tareas.map(t => `
            <li class="task-item ${t.prioridad}">
                <div class="task-content">
                    <span class="priority-dot"></span>
                    <span class="task-text">${t.texto}</span>
                </div>
                <button class="btn-delete" onclick="app.deleteTodo(${t.id})" title="Eliminar tarea">
                    🗑️
                </button>
            </li>
        `).join('');
    }
};