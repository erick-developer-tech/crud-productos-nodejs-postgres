// URL base de nuestra API en Node.js
const API_URL = '/api/productos';

// Referencias a los elementos de html
const formulario = document.getElementById('form-producto');
const tablaProductos = document.getElementById('tabla-productos');
const inputId = document.getElementById('producto-id');
const inputNombre = document.getElementById('nombre');
const inputDescripcion = document.getElementById('descripcion');
const inputPrecio = document.getElementById('precio');
const inputStock = document.getElementById('stock');
const btnCancelar = document.getElementById('btn-cancelar');

document.addEventListener('DOMContentLoaded', cargarProductos);

async function cargarProductos() {
  try {
    const respuesta = await fetch(API_URL);
    const productos = await respuesta.json();

    // Limpiamos pirmero el contenido actual de la tabla
    tablaProductos.innerHTML = '';

    // Si no hay registros en PostgreSQL
    if (productos.length === 0) {
      tablaProductos.innerHTML =
        '<tr><td colspan="6">No hay productos registrados</td></tr>';
      return;
    }

    // Creamos una fila <tr> para cada producto recibido
    productos.forEach((prod) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${prod.id}</td>
        <td>${prod.nombre}</td>
        <td>${prod.descripcion}</td>
        <td>${Number(prod.precio)}</td>
        <td>${prod.stock}</td>
        <td>
        <button class="buttons" type="button" onclick="cargarFormulario(${prod.id}, '${prod.nombre}', '${prod.descripcion || ''}', ${prod.precio}, ${prod.stock})">Editar</button>
        <button class="buttons" type="button" onclick="eliminarProducto(${prod.id})">Eliminar</button>
        </td>
        `;
      tablaProductos.appendChild(fila);
    });
  } catch (error) {
    console.error('Error al cargar productos: ', error);
  }
}

// Guardar (Crear o Actualizar) al enviar al formulario
formulario.addEventListener('submit', async (e) => {
  e.preventDefault(); // Evita que la página se recargue sola

  // Empaquetamos los datos de los inputs
  const datosProducto = {
    nombre: inputNombre.value,
    descripcion: inputDescripcion.value,
    precio: parseFloat(inputPrecio.value),
    stock: parseInt(inputStock.value),
  };

  const id = inputId.value;

  try {
    if (id) {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosProducto),
      });
    } else {
      // Si no hay ID, estamos creando un nuevo POST
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosProducto),
      });
    }

    limpiarFormulario();
    cargarProductos(); // Se refresca la tabla con los nuevos cambios
  } catch (error) {
    console.error('Error al guardar el prodcuto: ', error);
  }
});

// Pasar datos de la tabla al formulario para editar
function cargarFormulario(id, nombre, descripcion, precio, stock) {
  inputId.value = id;
  inputNombre.value = nombre;
  inputDescripcion.value = descripcion;
  inputPrecio.value = precio;
  inputStock.value = stock;
}

// Eliminar un producto (DELETE)
async function eliminarProducto(id) {
  if (!confirm('¿Seguro que deseas eliminar este producto?')) return;

  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });

    cargarProductos(); // Refrescamos la tabla
  } catch (error) {
    console.error('Error al eliminar producto: ', error);
  }
}

// Limpiar el formulario
function limpiarFormulario() {
  formulario.reset();
  inputId.value = '';
}

btnCancelar.addEventListener('click', limpiarFormulario);
