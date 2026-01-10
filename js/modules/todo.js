import { State } from '../main.js';
import { ChartModule } from './chart.js';
import { Notifier } from './notifier.js';

export const Todo = {
    // ... (mantén agregar y eliminar como estaban, pero añade Notifier)
    
    agregar() {
        const input = document.getElementById('taskInput');
        const priority = document.getElementById('taskPriority').value;
        
        if (input.value.trim().length < 3) {
            Notifier.show("La tarea es muy corta", "error");
            return;
        }

        const nuevaTarea = {
            id: Date.now(),
            texto: input.value.trim(),
            prioridad: priority,
            completada: false
        };
        
        State.tareas.push(nuevaTarea);
        this.save();
        Notifier.show("Tarea añadida con éxito");
        input.value = "";
    },

    // NUEVO: Lógica de Filtrado
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

    // NUEVO: Exportación de Datos
    exportJSON() {
        const dataStr = JSON.stringify(State.tareas, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = 'tareas_ingenieria.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
        
        Notifier.show("Archivo JSON generado", "info");
    },

    render(dataToRender = State.tareas) {
        const lista = document.getElementById('taskList');
        lista.innerHTML = dataToRender.map(t => `
            <li class="task-item ${t.prioridad}">
                <span>${t.texto}</span>
                <button onclick="app.deleteTodo(${t.id})">🗑️</button>
            </li>
        `).join('');
    },
    
    save() {
        localStorage.setItem('mis_tareas', JSON.stringify(State.tareas));
        this.render();
        ChartModule.update();
        document.getElementById('taskCount').textContent = State.tareas.length;
    }
};