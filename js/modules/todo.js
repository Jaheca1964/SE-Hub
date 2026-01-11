import { State } from '../main.js';
import { ChartModule } from './chart.js';
import { Notifier } from './notifier.js';
import { Database } from './database.js';

/**
 * Módulo de Gestión de Tareas con Persistencia en Firebase
 */
export const Todo = {
    // 1. Cargar tareas desde la nube al iniciar
    async cargar() {
        try {
            State.tareas = await Database.getAll();
            this.render();
            ChartModule.update();
            this.updateBadge();
        } catch (error) {
            console.error("Error al cargar datos:", error);
            Notifier.show("Error al sincronizar con la nube", "error");
        }
    },

    // 2. Agregar tarea a Firebase y al Estado Local
    async agregar() {
        const input = document.getElementById('taskInput');
        const priority = document.getElementById('taskPriority').value;
        
        if (input.value.trim().length < 3) {
            Notifier.show("La tarea es muy corta", "error");
            return;
        }

        const nuevaTarea = {
            texto: input.value.trim(),
            prioridad: priority,
            completada: false,
            createdAt: new Date().getTime() // Útil para ordenar por fecha
        };
        
        try {
            // Guardar en la nube y obtener el ID generado por Firestore
            const id = await Database.save(nuevaTarea);
            
            // Actualizar estado local
            State.tareas.push({ id, ...nuevaTarea });
            
            this.save(); // Actualiza UI
            Notifier.show("Tarea guardada en la nube ☁️");
            input.value = "";
        } catch (error) {
            const id = await Database.save(nuevaTarea);
            Notifier.show("Error al guardar la tarea", "error");
        }
    },

    // 3. Eliminar de Firebase y del Estado Local
    async eliminar(id) {
        try {
            await Database.delete(id);
            
            // Inmutabilidad: filtramos para obtener un nuevo array
            State.tareas = State.tareas.filter(t => t.id !== id);
            
            this.save();
            Notifier.show("Tarea eliminada correctamente", "info");
        } catch (error) {
            Notifier.show("No se pudo eliminar la tarea", "error");
        }
    },

    // 4. Filtrado en tiempo real (Lógica local sobre datos sincronizados)
    filterTodos() {
        const query = document.getElementById('searchInput').value.toLowerCase();
        const priorityFilter = document.getElementById('filterPriority').value;

        const tareasFiltradas = State.tareas.filter(t => {
            const coincideTexto = t.texto.toLowerCase().includes(query);
            const coincidePrioridad = priorityFilter === 'all' || t.prioridad === priorityFilter;
            return coincideTexto && coincidePrioridad;
        });

        this.render(tareasFiltradas);
    },

    // 5. Exportación de Datos a JSON
    exportJSON() {
        const dataStr = JSON.stringify(State.tareas, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', 'se_hub_backup.json');
        linkElement.click();
        
        Notifier.show("Copia de seguridad generada", "info");
    },

    // 6. Utilidades de UI
    updateBadge() {
        const badge = document.getElementById('taskCount');
        if (badge) badge.textContent = State.tareas.length;
    },

    save() {
        // Ya no es obligatorio el localStorage, pero ayuda a la velocidad de carga inicial
        localStorage.setItem('mis_tareas_backup', JSON.stringify(State.tareas));
        this.render();
        ChartModule.update();
        this.updateBadge();
    },

    render(dataToRender = State.tareas) {
        const lista = document.getElementById('taskList');
        if (!lista) return;

        lista.innerHTML = dataToRender.map(t => `
            <li class="task-item ${t.prioridad}">
                <div class="task-content">
                    <span class="task-text">${t.texto}</span>
                </div>
                <button class="btn-delete" onclick="app.deleteTodo('${t.id}')">
                    🗑️
                </button>
            </li>
        `).join('');
    }
};