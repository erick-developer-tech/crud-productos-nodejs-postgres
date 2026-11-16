// Importamos la conexión PostgreSQL que configuramos en src/config/db.js
const pool = require('../config/db');

// 1. Obtener todos los productos GET /api/productos
const obtenerProductos = async (req, res) => {
  try {
    // COnsultamos todos los registros por ID ascendete
    const resultado = await pool.query(
      'SELECT * FROM productos ORDER BY id ASC',
    );

    // Respondemos con la lista de filas de formato JSON
    res.json(resultado.rows);
  } catch (error) {
    console.error('Error al obterner productos: ', error.message);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// Obtener un producto por su ID GET /api/productos/:id
const obtenerProductoPorId = async (req, res) => {
  try {
    // Extraemos el id que viene en la url
    const { id } = req.params;

    // Usamos $1 como parámetro seguro para evitar inyección SQL
    const resultado = await pool.query(
      'SELECT * FROM productos WHERE id = $1',
      [id],
    );

    // Si no encontro ninguna fila devolvemos un error 404
    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error('Error al obtener producto por ID: ', error.message);
    res.status(500).json({ error: 'Error al consultar el producto' });
  }
};

// Crear un nuevo producto POST /api/productos
const crearProducto = async (req, res) => {
  try {
    // Extraemos los datos enviados desde el cuerpo de la petición (req.body)
    const { nombre, descripcion, precio, stock } = req.body;

    // Validación básica antes de consultar PostgreSQL
    if (!nombre || precio === undefined) {
      return res
        .status(400)
        .json({ error: 'El nombre y precio son obligatorios' });
    }

    // Returning * le pide a PostgreSQl que nos devuelva el registro recien creado
    const consulta = `
    INSERT INTO productos (nombre, descripcion, precio, stock)
    VALUES ($1, $2, $3, $4)
    RETURNING *
    `;
    const valores = [nombre, descripcion || null, precio, stock ?? 0];

    const resultado = await pool.query(consulta, valores);

    // Código 201 es que se creo con exitó
    res.status(201).json({
      mensaje: 'Producto creado exitosamente',
      producto: resultado.rows[0],
    });
  } catch (error) {
    console.error('Error al crear producto: ', error.message);
    res
      .status(500)
      .json({ error: 'Error al guardar el producto en la base de datos' });
  }
};

// Actualizar un producto existente PUT /api/productos/:id
const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, precio, stock } = req.body;

    const consulta = `
        UPDATE productos
        SET nombre = $1, descripcion = $2, precio = $3, stock = $4
        WHERE id = $5
        RETURNING *
        `;
    const valores = [nombre, descripcion, precio, stock, id];

    const resultado = await pool.query(consulta, valores);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json({
      mensaje: 'Producto actualizado correctamente',
      producto: resultado.rows[0],
    });
  } catch (error) {
    console.error('Error al actualizar producto: ', error.message);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

// Eliminar un producto Delete /api/productos/:id
const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const resultado = await pool.query(
      'DELETE FROM productos WHERE id = $1 RETURNING *',
      [id],
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    res.json({
      mensaje: 'Producto eliminado correctamente',
      productoEliminado: resultado.rows[0],
    });
  } catch (error) {
    console.error('Error al eliminar el producto: ', error.message);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

// Exportamos las 5 funciones para conectarlas con las rutas
module.exports = {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
};
