/**
 * Módulo de Gestión de Temas
 * Controla la apariencia visual y la persistencia de preferencia del usuario.
 */
export const Theme = {
    init() {
        // 1. Prioridad: Preferencia guardada -> Preferencia del Sistema (OS)
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;

        if (isDark) {
            document.body.classList.add('dark-theme');
        }
        
        this.updateButtonText(isDark);
    },

    async toggle() {
        const isDark = document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        this.updateButtonText(isDark);

        // Mejora pro: Notificar al gráfico que el tema cambió 
        // para que actualice los colores de las etiquetas si es necesario.
        try {
            const { ChartModule } = await import('./chart.js');
            if (ChartModule.instance) {
                ChartModule.update();
            }
        } catch (e) {
            console.log("ChartModule no disponible aún.");
        }
    },

    updateButtonText(isDark) {
        const btn = document.getElementById('theme-toggle');
        if (btn) {
            // Usamos textContent por seguridad y rendimiento
            btn.textContent = isDark ? '☀️ Modo Claro' : '🌙 Modo Oscuro';
        }
    }
};