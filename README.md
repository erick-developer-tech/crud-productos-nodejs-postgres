# CRUD de Productos - Node.js, Express y PostgreSQL

Aplicación web full-stack para la gestión básica de inventario de productos (Crear, Leer, Actualizar y Eliminar). El proyecto implementa una API REST estructurada por capas en el backend y una interfaz ligera en el frontend conectada mediante `fetch()`.

## Tecnologías utilizadas

* **Backend:** Node.js, Express.js
* **Base de datos:** PostgreSQL (`pg` / node-postgres)
* **Variables de entorno:** `dotenv`
* **Frontend:** HTML5, CSS3, JavaScript (Vanilla ES6+)

## Estructura del proyecto

```text
CRUD_Productos/
├── public/                        # Archivos estáticos del Frontend
│   ├── index.html                 # Estructura de formulario y tabla
│   ├── styles.css                 # Estilos visuales
│   └── app.js                     # Consumo de la API con fetch()
├── src/                           # Código fuente del Backend
│   ├── config/
│   │   └── db.js                  # Configuración y Pool de conexión a PostgreSQL
│   ├── controllers/
│   │   └── productos.controller.js # Lógica de negocio y consultas SQL
│   ├── routes/
│   │   └── productos.routes.js    # Definición de endpoints REST
│   └── index.js                   # Punto de entrada del servidor Express
├── .env.example                   # Plantilla de variables de entorno
├── .gitignore                     # Archivos excluidos del repositorio
└── package.json                   # Dependencias y scripts de ejecución
