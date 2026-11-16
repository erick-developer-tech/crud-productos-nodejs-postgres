// Cargamos las variables de entorno definidas en el archivo .env
require('dotenv').config();

// Importamos Express para crear el servidor y administrar rutas
const express = require('express');

// Importamos el archivo de rutas en productos
const productoRoutes = require('../src/routes/productos.routes');
// Importamos la conexión a PostgreSQL que creamos en el paso anterior
// const pool = require('./config/db');

// inicializamos la aplicación express
const app = express();

// Middleware que permite express entienda los datos enviados en formato JSON
app.use(express.json());

app.use(express.static('public'));

// Conectamos las rutas con el CRUD bajo la url base /api/productos
app.use('/api/productos', productoRoutes);

// Ruta de prueba para verificar que el servidor y PostgreSQL respondan correctamente
/*app.get('/api/prueba-db', async (req, res) => {
  try {
    // Ejecutamos una consulta rápida a PostgreSQL para pedir la hora actual del servidor
    const resultado = await pool.query('SELECT NOW()');
    res.json({
      mensaje: 'Conexión exitosa con Express y PostgreSQL!',
      hora_servidor_db: resultado.rows[0].now,
    });
  } catch (error) {
    console.error('Error al conectar con PostgreSQL: ', error.message);
    res.status(500).json({ error: 'No se pudo conectar con la base de datos' });
  }
}); */

// Definimos el puerto (toma el de .env o usa el 3000 por defecto)
const PORT = process.env.PORT || 3000;

// Encendemos el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
