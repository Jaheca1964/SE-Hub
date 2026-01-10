// js/modules/theme.js

export const Theme = {
    init() {
        const isDark = localStorage.getItem('theme') === 'dark';
        if (isDark) {
            document.body.classList.add('dark-theme');
        }
        this.updateButtonText(isDark);
    },

    toggle() {
        const isDark = document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        this.updateButtonText(isDark);
    },

    updateButtonText(isDark) {
        const btn = document.getElementById('theme-toggle');
        if (btn) {
            btn.innerText = isDark ? 'Modo Claro' : 'Modo Oscuro';
        }
    }
};