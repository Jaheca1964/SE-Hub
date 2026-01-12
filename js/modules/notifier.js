export const Notifier = {
    show(message, type = 'success') {
        let container = document.getElementById('notification-area');
        
        // Si el contenedor no existe en el HTML, lo creamos dinámicamente
        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-area';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerText = message;

        container.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => toast.remove(), 500);
        }, 3000);
    }
};