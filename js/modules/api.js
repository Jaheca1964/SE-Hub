/**
 * Módulo de API
 * Encargado de la comunicación asíncrona con GitHub.
 * Implementa manejo de errores y renderizado dinámico.
 */
export const apiModule = {
    async buscar() {
        // Obtenemos el input usando el ID correcto del nuevo HTML
        const input = document.getElementById('githubUser');
        const container = document.getElementById('githubResult');
        
        const username = input.value.trim();
        
        if (!username) {
            container.innerHTML = `<p style="color:#e74c3c">⚠️ Por favor, ingresa un nombre de usuario.</p>`;
            return;
        }

        // Estado de carga (Feedback para el usuario)
        container.innerHTML = `
            <div style="text-align:center; padding: 20px;">
                <p>🔍 Buscando a <strong>${username}</strong>...</p>
            </div>`;

        try {
            // Uso de Fetch con bloque Try/Catch para robustez
            const response = await fetch(`https://api.github.com/users/${username}`);
            
            if (!response.ok) {
                if (response.status === 404) throw new Error("El usuario no existe en GitHub.");
                throw new Error("Error al conectar con el servidor.");
            }

            const data = await response.json();
            this.renderProfile(data);
            
            // Limpiar input después de éxito
            input.value = '';

        } catch (error) {
            container.innerHTML = `
                <div style="background: rgba(231, 76, 60, 0.1); padding: 15px; border-radius: 8px;">
                    <p style="color:#e74c3c; margin:0;">⚠️ ${error.message}</p>
                </div>`;
        }
    },

    renderProfile(data) {
        const container = document.getElementById('githubResult');
        
        // Aplicamos estilos que funcionan tanto en modo claro como oscuro
        container.innerHTML = `
            <div class="card profile-card" style="text-align: center; border-top: 4px solid #3498db;">
                <img src="${data.avatar_url}" alt="Avatar" 
                     style="width:80px; height:80px; border-radius:50%; margin-bottom:10px; border: 2px solid #3498db;">
                <h3 style="margin: 5px 0;">${data.name || data.login}</h3>
                <p style="font-size: 0.9em; opacity: 0.8;">${data.bio || 'Ingeniero sin biografía definida.'}</p>
                
                <div style="display: flex; justify-content: space-around; background: rgba(0,0,0,0.05); padding: 10px; border-radius: 8px; margin: 15px 0;">
                    <div><strong>${data.public_repos}</strong><br><small>Repos</small></div>
                    <div><strong>${data.followers}</strong><br><small>Seguidores</small></div>
                    <div><strong>${data.following}</strong><br><small>Siguiendo</small></div>
                </div>
                
                <a href="${data.html_url}" target="_blank" class="btn-primary" 
                   style="text-decoration:none; font-weight:bold; color:#3498db;">
                   🔗 Ver Perfil en GitHub
                </a>
            </div>
        `;
    }
};