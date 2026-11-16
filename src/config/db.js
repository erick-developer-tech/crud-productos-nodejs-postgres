// Importamos el paquete dotenv para cargar las variables del archivo .env
require('dotenv').config();

// Extraemos la clase 'Pool' de la libreria 'pg' (node-postgres)
const { Pool } = require('pg');

// Configuramos la conexión a la base de datos utilizando las variables de entorno
const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// Evento opcional para confirmar la consola cuando se establece la conexión
pool.on('connect', () => {
  console.log('Conexión exitosa a la base de datos PostgreSQL');
});

// Exportamos el pool para poder ejecutar consultas SQL desde los controladores
module.exports = pool;
