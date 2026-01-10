const SE_Hub = {
    state: {
        tareas: JSON.parse(localStorage.getItem('mis_tareas')) || [],
        isDarkMode: localStorage.getItem('theme') === 'dark',
        chart: null // Referencia para el objeto del gráfico
    },

    init() {
        if (this.state.isDarkMode) document.body.classList.add('dark-theme');
        this.todoModule.render();
        this.chartModule.init(); // Inicializar gráfico
    },

    // --- Módulo de Gráficos ---
    chartModule: {
        init() {
            const ctx = document.getElementById('taskChart').getContext('2d');
            const dataProcessed = this.processData();

            this.state = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: dataProcessed.labels,
                    datasets: [{
                        label: 'Tareas creadas por día',
                        data: dataProcessed.values,
                        backgroundColor: '#3498db'
                    }]
                },
                options: { responsive: true }
            });
            SE_Hub.state.chart = this.state;
        },

        // Transforma la lista de tareas en: { fechas: [2023-10-01], cantidades: [5] }
        processData() {
            const counts = {};
            SE_Hub.state.tareas.forEach(t => {
                const fecha = t.fecha || "Sin fecha";
                counts[fecha] = (counts[fecha] || 0) + 1;
            });
            return {
                labels: Object.keys(counts),
                values: Object.values(counts)
            };
        },

        update() {
            const data = this.processData();
            if (SE_Hub.state.chart) {
                SE_Hub.state.chart.data.labels = data.labels;
                SE_Hub.state.chart.data.datasets[0].data = data.values;
                SE_Hub.state.chart.update();
            }
        }
    },

    todoModule: {
        agregar() {
            const input = document.getElementById('taskInput');
            const texto = input.value.trim();
            if (texto.length < 3) return;

            const nuevaTarea = { 
                id: Date.now(), 
                texto: texto,
                fecha: new Date().toLocaleDateString() // Guardamos la fecha actual
            };

            SE_Hub.state.tareas.push(nuevaTarea);
            this.save();
            SE_Hub.chartModule.update(); // Actualizamos el gráfico al agregar
            input.value = "";
        },

        eliminar(id) {
            SE_Hub.state.tareas = SE_Hub.state.tareas.filter(t => t.id !== id);
            this.save();
            SE_Hub.chartModule.update(); // Actualizamos el gráfico al eliminar
        },

        save() {
            localStorage.setItem('mis_tareas', JSON.stringify(SE_Hub.state.tareas));
            this.render();
        },

        render() {
            const lista = document.getElementById('taskList');
            lista.innerHTML = SE_Hub.state.tareas.map(tarea => `
                <li class="task-item">
                    <span>${tarea.texto} <small>(${tarea.fecha || 'N/A'})</small></span>
                    <button class="btn-delete" onclick="SE_Hub.todoModule.eliminar(${tarea.id})">Eliminar</button>
                </li>
            `).join('');
        }
    },

    themeModule: {
        toggle() {
            const isDark = document.body.classList.toggle('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }
    }
};

window.onload = () => SE_Hub.init();