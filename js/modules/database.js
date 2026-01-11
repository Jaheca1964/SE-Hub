// Importamos las funciones necesarias de los SDKs de Firebase (vía CDN)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyASHF6aRidVoFpb6J6A69XlJIWc-DM8F2w",
  authDomain: "se-hub-8b282.firebaseapp.com",
  projectId: "se-hub-8b282",
  storageBucket: "se-hub-8b282.firebasestorage.app",
  messagingSenderId: "902767539846",
  appId: "1:902767539846:web:10805a9828033684da4307",
  measurementId: "G-B4R0BL2NJT"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const tasksCol = collection(db, 'tareas');

export const Database = {
    // Guardar en la nube
    async save(task) {
        try {
            const docRef = await addDoc(tasksCol, task);
            return docRef.id;
        } catch (e) {
            console.error("Error en Database.save:", e);
            throw e;
        }
    },

    // Leer desde la nube
    async getAll() {
        const querySnapshot = await getDocs(tasksCol);
        return querySnapshot.docs.map(doc => ({
            id: doc.id, 
            ...doc.data()
        }));
    },

    async delete(id) {
        await deleteDoc(doc(db, "tareas", id));
    }
};