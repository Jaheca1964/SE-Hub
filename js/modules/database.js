import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    getDocs, 
    deleteDoc, 
    doc, 
    query, 
    where 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Tu configuración de Firebase (mantenla igual)
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
    // Guardar tarea
    async save(task) {
        const docRef = await addDoc(tasksCol, task);
        return docRef.id;
    },

    // NUEVO: Obtener tareas filtradas por el ID del usuario
    async getAllByUser(userId) {
        // Creamos una consulta: "Trae de la colección tareas donde userId == userId del usuario"
        const q = query(tasksCol, where("userId", "==", userId));
        const querySnapshot = await getDocs(q);
        
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    },

    // Eliminar tarea
    async delete(id) {
        await deleteDoc(doc(db, "tareas", id));
    }
};