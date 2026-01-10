import { State } from '../main.js';
import { ChartModule } from './chart.js';

export const Todo = {
    agregar() {
        const input = document.getElementById('taskInput');
        const texto = input.value.trim();
        if (texto.length < 3) return;

        const nuevaTarea = { 
            id: Date.now(), 
            texto, 
            fecha: new Date().toLocaleDateString() 
        };
        
        State.tareas.push(nuevaTarea);
        this.save();
        ChartModule.update();
        input.value = "";
    },

    eliminar(id) {
        State.tareas = State.tareas.filter(t => t.id !== id);
        this.save();
        ChartModule.update();
    },

    save() {
        localStorage.setItem('mis_tareas', JSON.stringify(State.tareas));
        this.render();
    },

    render() {
        const lista = document.getElementById('taskList');
        lista.innerHTML = State.tareas.map(t => `
            <li class="task-item">
                <span>${t.texto}</span>
                <button onclick="app.deleteTodo(${t.id})">Eliminar</button>
            </li>
        `).join('');
    }
};