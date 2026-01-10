# 🚀 Software Engineering Hub (SE-Hub)

![Status](https://img.shields.io/badge/Status-Functional-success)
![Architecture](https://img.shields.io/badge/Architecture-ES6%20Modules-blue)
![Testing](https://img.shields.io/badge/Tests-Passing-brightgreen)
![User](https://img.shields.io/badge/User-Jaheca1964-orange)

**SE-Hub** es un panel de control avanzado para ingenieros de software, diseñado bajo principios de **Clean Code** y **Arquitectura Modular**. Este proyecto demuestra el manejo de estado sólido, manipulación dinámica del DOM y consumo de APIs asíncronas.



## 🛠️ Stack Tecnológico

* **HTML5** (Semántica estructural)
* **CSS3** (Variables dinámicas y Responsive Design)
* **JavaScript (ES6+)** (Arquitectura modular y Promesas)
* **Chart.js** (Visualización de datos de productividad)
* **GitHub API** (Integración de servicios externos)

## 🏗️ Arquitectura del Sistema

El proyecto implementa el patrón de **Módulos ES6**, asegurando que cada componente tenga una única responsabilidad (Single Responsibility Principle):

* **`main.js`**: Orquestador central y gestor del estado global (`State`).
* **`theme.js`**: Controlador de apariencia y persistencia (Dark/Light Mode).
* **`todo.js`**: Motor de lógica de negocio para la gestión de tareas.
* **`chart.js`**: Capa de abstracción para métricas visuales.
* **`api.js`**: Módulo de comunicación asíncrona (Lazy Loading).
* **`testing.js`**: Suite de pruebas unitarias integrada.



## 🧪 Control de Calidad (Testing)

El sistema incluye una suite de pruebas propia para validar la integridad de los datos sin depender de librerías externas. Para ejecutar los tests, abre la consola del navegador y escribe:

```javascript
app.runTests();