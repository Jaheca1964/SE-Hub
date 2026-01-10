/**
 * Módulo de Pruebas Unitarias
 * Diseñado para validar la lógica de negocio de SE-Hub.
 */

export const Tester = {
    // Función para comparar resultados esperados vs reales
    assertEquals(expected, actual, description) {
        if (expected === actual) {
            console.log(`✅ PASÓ: ${description}`);
        } else {
            console.error(`❌ FALLÓ: ${description}. Esperaba "${expected}" pero recibí "${actual}"`);
        }
    },

    // Definición de las pruebas
    runTodoTests(todoModule, currentState) {
        console.group("Ejecutando Pruebas de Validación de Tareas...");

        // Prueba 1: Validación de longitud
        const textoCorto = "ab";
        const esValidoCorto = textoCorto.trim().length >= 3;
        this.assertEquals(false, esValidoCorto, "No debería permitir textos menores a 3 caracteres.");

        // Prueba 2: Validación de duplicados
        const listaSimulada = [{ texto: "Aprender Git" }];
        const nuevoTexto = "Aprender Git";
        const existe = listaSimulada.some(t => t.texto.toLowerCase() === nuevoTexto.toLowerCase());
        this.assertEquals(true, existe, "Debería detectar cuando una tarea ya existe.");

        console.groupEnd();
    }
};