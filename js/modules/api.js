/**
 * Módulo de API
 * Encargado de la comunicación asíncrona con GitHub
 */
export const apiModule = {
    async buscar() {
        const username = document.getElementById('githubUser').value;
        const container = document.getElementById('githubResult');
        
        if (!username) {
            container.innerHTML = `<p style="color:var(--accent-color)">Por favor, ingresa un usuario.</p>`;
            return;
        }

        container.innerHTML = `<div class="loader">Buscando en el servidor...</div>`;

        try {
            // Realizamos la petición HTTP
            const response = await fetch(`https://api.github.com/users/${username}`);
            
            if (!response.ok) {
                throw new Error("Usuario no encontrado en la base de datos de GitHub.");
            }

            const data = await response.json();
            this.renderProfile(data);
            
        } catch (error) {
            container.innerHTML = `<p style="color:#e74c3c">⚠️ Error: ${error.message}</p>`;
        }
    },

    renderProfile(data) {
        const container = document.getElementById('githubResult');
        container.innerHTML = `
            <div class="card profile-card" style="text-align: center; padding: 20px;">
                <img src="${data.avatar_url}" alt="Avatar" style="width:100px; border-radius:50%; border: 3px solid var(--accent-color);">
                <h3>${data.name || data.login}</h3>
                <p>${data.bio || 'Sin biografía disponible'}</p>
                <div style="display: flex; justify-content: space-around; margin-top: 15px;">
                    <span><strong>Repos:</strong> ${data.public_repos}</span>
                    <span><strong>Seguidores:</strong> ${data.followers}</span>
                </div>
                <a href="${data.html_url}" target="_blank" style="display:inline-block; margin-top:15px; color:var(--accent-color);">Ver Perfil Completo</a>
            </div>
        `;
    }
};