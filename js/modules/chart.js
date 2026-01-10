// js/modules/chart.js

// Es vital que el nombre coincida exactamente con lo que importas en otros archivos
export const ChartModule = {
    init() {
        const ctx = document.getElementById('taskChart');
        if (!ctx) return; // Guard clause: seguridad si el elemento no existe

        // ... resto de tu código de inicialización ...
    },

    update() {
        console.log("Actualizando gráfico...");
        // ... lógica de actualización del gráfico ...
    },

    processData() {
        // ... lógica de procesamiento ...
    }
};