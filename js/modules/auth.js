import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider, 
    signOut, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { State, updateAuthUI } from '../main.js';
import { Notifier } from './notifier.js';
import { Todo } from './todo.js';

const auth = getAuth();
const provider = new GoogleAuthProvider();

export const Auth = {
    // Iniciar sesión con Google
    async login() {
        try {
            await signInWithPopup(auth, provider);
            // No necesitamos hacer nada más aquí, onAuthStateChanged se encarga
        } catch (error) {
            console.error("Error en login:", error);
            Notifier.show("Error al autorizar el dominio", "error");
        }
    },

    // Cerrar sesión
    async logout() {
        try {
            await signOut(auth);
            Notifier.show("Sesión cerrada", "info");
        } catch (error) {
            console.error("Error al salir:", error);
        }
    },

    // El "Vigilante": detecta si el usuario entra o sale
    init() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // Si hay usuario, actualizamos estado y cargamos sus tareas
                State.user = user;
                updateAuthUI(user);
                Todo.cargar(); 
            } else {
                // Si sale, limpiamos todo
                State.user = null;
                updateAuthUI(null);
            }
        });
    }
};