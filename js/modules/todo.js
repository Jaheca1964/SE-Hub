import { State } from '../main.js';
import { ChartModule } from './chart.js';
import { Notifier } from './notifier.js';
import { Database } from './database.js';

export const Todo = {
    // 1. Cargar tareas filtradas por el usuario actual
    async cargar() {
        if (!State.user) return; // Seguridad: Si no hay usuario, no cargamos nada

        try {
            // Pasamos el UID del usuario a la base de datos para traer solo sus tareas
            State.tareas = await Database.getAllByUser(State.user.uid);
            this.render();
            ChartModule.update();
            this.updateBadge();
        } catch (error) {
            console.error("Error al sincronizar:", error);
            Notifier.show("Error al obtener tus tareas", "error");
        }
    },

    // 2. Agregar tarea vinculada permanentemente al UID del usuario
    async agregar() {
        const input = document.getElementById('taskInput');
        const priority = document.getElementById('taskPriority').value;
        
        if (!State.user) {
            Notifier.show("Debes iniciar sesión primero", "error");
            return;
        }

        if (input.value.trim().length < 3) {
            Notifier.show("Descripción demasiado corta", "error");
            return;
        }

        const nuevaTarea = {
            texto: input.value.trim(),
            prioridad: priority,
            completada: false,
            userId: State.user.uid, // <--- CLAVE: Vinculación con el usuario
            createdAt: Date.now()
        };
        
        try {
            const id = await Database.save(nuevaTarea);
            State.tareas.push({ id, ...nuevaTarea });
            
            this.save(); 
            Notifier.show(`Tarea guardada para ${State.user.displayName.split(' ')[0]} ☁️`);
            input.value = "";
        } catch (error) {
            console.error("Error al guardar:", error);
            Notifier.show("Error de permisos en la nube", "error");
        }
    },

    // 3. Eliminar tarea (Firestore verificará que el userId coincida)
    async eliminar(id) {
        try {
            await Database.delete(id);
            State.tareas = State.tareas.filter(t => t.id !== id);
            this.save();
            Notifier.show("Tarea eliminada", "info");
        } catch (error) {
            Notifier.show("No tienes permiso para borrar esto", "error");
        }
    },

    // 4. Filtrado local (Buscador)
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

    // 5. Utilidades de Interfaz
    updateBadge() {
        const badge = document.getElementById('taskCount');
        if (badge) badge.textContent = State.tareas.length;
    },

    save() {
        this.render();
        ChartModule.update();
        this.updateBadge();
    },

    render(dataToRender = State.tareas) {
        const lista = document.getElementById('taskList');
        if (!lista) return;

        if (dataToRender.length === 0) {
            lista.innerHTML = `<p class="empty-msg">No hay tareas pendientes.</p>`;
            return;
        }

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