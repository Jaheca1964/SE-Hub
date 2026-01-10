# Software Engineering Hub (SE Hub) 🚀

Este es un panel de control interactivo diseñado para ingenieros de software junior que buscan centralizar su aprendizaje, práctica de algoritmos y gestión de productividad. El proyecto aplica principios de **arquitectura modular** y **diseño orientado a componentes** con JavaScript Vanilla.



## 🛠️ Stack Tecnológico

* **Frontend:** HTML5, CSS3 (Variables modernas), JavaScript ES6+.
* **Visualización:** [Chart.js](https://www.chartjs.org/) para métricas de productividad.
* **APIs:** Integración con la GitHub Rest API.
* **Persistencia:** LocalStorage para almacenamiento local sin base de datos externa.

## 🏗️ Arquitectura del Proyecto

El proyecto utiliza un **Patrón de Diseño Modular (ES6 Modules)** para asegurar el bajo acoplamiento y la alta cohesión:

* `js/main.js`: Punto de entrada y orquestador del estado global.
* `js/modules/todo.js`: Lógica de negocio para la gestión de tareas y validaciones.
* `js/modules/chart.js`: Abstracción de la librería de visualización de datos.
* `js/modules/theme.js`: Manejo de preferencias de usuario (Dark/Light Mode).
* `js/modules/api.js`: Lógica asíncrona para comunicación externa.

## 🚀 Funcionalidades Clave

1.  **Gestión de Tareas con Programación Defensiva:** Validaciones de longitud y duplicidad de datos.
2.  **Visualización en Tiempo Real:** Gráficos dinámicos que reflejan la productividad del usuario.
3.  **Modo Oscuro Persistente:** Uso de CSS Variables y memoria local para mejorar la experiencia de usuario.
4.  **Consumo de API Asíncrona:** Uso de `async/await` para obtener perfiles de ingeniería desde GitHub.

## 📦 Instalación y Uso

1. Clonar el repositorio:
   ```bash
   git clone [https://github.com/Jaheca1964/se-hub.git](https://github.com/Jaheca1964/se-hub.git)