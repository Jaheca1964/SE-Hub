/**
 * Módulo de Visualización de Datos
 * Maneja la lógica de Chart.js para mostrar métricas de tareas.
 */
export const ChartModule = {
    instance: null, // Guardamos la instancia para poder destruirla/actualizarla

    init() {
        this.update(); // Inicializa el gráfico con los datos actuales
    },

    processData(tareas) {
        // Reducción de datos: contamos cuántas tareas hay por cada prioridad
        const counts = { high: 0, medium: 0, low: 0 };
        
        tareas.forEach(t => {
            if (counts.hasOwnProperty(t.prioridad)) {
                counts[t.prioridad]++;
            }
        });

        return counts;
    },

    async update() {
        const ctx = document.getElementById('taskChart');
        if (!ctx) return;

        // Importamos el estado actual (importación dinámica para evitar ciclos)
        const { State } = await import('../main.js');
        const dataCounts = this.processData(State.tareas);

        // Si ya existe un gráfico, lo destruimos para evitar superposiciones visuales
        if (this.instance) {
            this.instance.destroy();
        }

        // Configuración de Chart.js
        this.instance = new Chart(ctx, {
            type: 'doughnut', // Gráfico de dona para mejor estética
            data: {
                labels: ['Alta', 'Media', 'Baja'],
                datasets: [{
                    label: 'Prioridad de Tareas',
                    data: [dataCounts.high, dataCounts.medium, dataCounts.low],
                    backgroundColor: [
                        '#e74c3c', // Rojo
                        '#f1c40f', // Amarillo
                        '#2ecc71'  // Verde
                    ],
                    borderWidth: 0,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: getComputedStyle(document.body).getPropertyValue('--text-color') || '#ffffff' }
                    }
                }
            }
        });
    }
};