import { State } from '../main.js';
import { Database } from './database.js';
import { Notifier } from './notifier.js';
import { ChartModule } from './chart.js';

export const Todo = {
    async cargar() {
        if (!State.user) return;
        try {
            State.tareas = await Database.getAllByUser(State.user.uid);
            this.updateUI();
        } catch (error) {
            console.error("Error al cargar:", error);
        }
    },

    async agregar() {
        const input = document.getElementById('taskInput');
        const priority = document.getElementById('taskPriority').value;
        if (!input || !input.value.trim()) return;

        const task = {
            texto: input.value.trim(),
            prioridad: priority,
            userId: State.user.uid,
            createdAt: Date.now()
        };

        try {
            const id = await Database.save(task);
            State.tareas.push({ id, ...task });
            input.value = "";
            this.updateUI();
            Notifier.show("Tarea guardada ✅");
        } catch (e) {
            Notifier.show("Error al guardar", "error");
        }
    },

    // LÓGICA DE BÚSQUEDA CORREGIDA
    filterTodos() {
        const query = document.getElementById('searchInput').value.toLowerCase();
        const filtradas = State.tareas.filter(t => 
            t.texto.toLowerCase().includes(query) || 
            t.prioridad.toLowerCase().includes(query)
        );
        this.render(filtradas);
    },

    exportJSON() {
        if (State.tareas.length === 0) {
            Notifier.show("No hay datos para exportar", "info");
            return;
        }
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(State.tareas, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "sehub_backup.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        Notifier.show("JSON exportado 📤");
    },

    updateUI() {
        this.render();
        if (ChartModule && ChartModule.update) ChartModule.update();
        const badge = document.getElementById('taskCount');
        if (badge) badge.innerText = State.tareas.length;
    },

    render(data = State.tareas) {
        const lista = document.getElementById('taskList');
        if (!lista) return;

        const etiquetas = { 
            'high': '🔴 Urgente', 
            'medium': '🟡 Importante', 
            'low': '🔵 Rutina' 
        };

        lista.innerHTML = data.map(t => `
            <div class="task-item ${t.prioridad}">
                <div class="task-content">
                    <span class="prio-label">${etiquetas[t.prioridad] || t.prioridad}</span>
                    <strong class="task-title">${t.texto}</strong>
                </div>
                <button onclick="app.deleteTodo('${t.id}')" class="btn-del">🗑️</button>
            </div>
        `).join('');
    },

    async eliminar(id) {
        try {
            await Database.delete(id);
            State.tareas = State.tareas.filter(t => t.id !== id);
            this.updateUI();
            Notifier.show("Eliminado correctamente");
        } catch (e) {
            Notifier.show("Error al eliminar", "error");
        }
    }
};