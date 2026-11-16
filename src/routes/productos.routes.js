// Importamos el enrutador de Express
const { Router } = require('express');
const router = Router();

// Importamos las 5 funciones que creamos en el controlador
const {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} = require('../controllers/productos.controller');

// Definimos cada ruta y la petición HTTP correspondiente
// 1. Leer productos => GET http://localhost:3000/api/productos
router.get('/', obtenerProductos);

// 2. Leer producto por ID => GET http://localhost:3000/api/productos/:id
router.get('/:id', obtenerProductoPorId);

// 3. Crear producto nuevo => POST http://localhost:3000/api/productos
router.post('/', crearProducto);

// 4. Actualizar un producto por ID => PUT http://localhost:3000/api/productos/:id
router.put('/:id', actualizarProducto);

// 5. Eliminar un producto por ID => DELETE http://localhost:3000/api/producto/:id
router.delete('/:id', eliminarProducto);

// Exportamos el enrutador para usarlo en el index.js
module.exports = router;
