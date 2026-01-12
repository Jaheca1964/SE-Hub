import { auth, provider } from './database.js';
import { signInWithPopup, signOut } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { Notifier } from './notifier.js';

export const Auth = {
    async login() {
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error(error);
            Notifier.show("Error al autenticar", "error");
        }
    },
    async logout() {
        try {
            await signOut(auth);
        } catch (error) {
            Notifier.show("Error al salir", "error");
        }
    }
};