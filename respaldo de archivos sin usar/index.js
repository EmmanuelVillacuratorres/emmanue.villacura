const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Simulación de base de datos en memoria
let productos = [
  { id: 1, nombre: "Producto 1", precio: 100 },
  { id: 2, nombre: "Producto 2", precio: 200 }
];

// Ruta para restaurar contraseña
app.post('/api/restore-password', (req, res) => {
  const { email } = req.body;
  // Aquí normalmente buscarías el usuario y enviarías el correo
  console.log(`Solicitud de restaurar contraseña para: ${email}`);
  // Simula respuesta exitosa
  res.json({ message: 'Si el correo existe, recibirás instrucciones para restaurar tu contraseña.' });
});

// Obtener todos los productos
app.get('/api/productos', (req, res) => {
  res.json(productos);
});

// Agregar un nuevo producto
app.post('/api/productos', (req, res) => {
  const { nombre, precio } = req.body;
  if (!nombre || !precio) {
    return res.status(400).json({ error: "Nombre y precio son requeridos" });
  }
  const nuevoProducto = {
    id: productos.length + 1,
    nombre,
    precio
  };
  productos.push(nuevoProducto);
  res.status(201).json(nuevoProducto);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`);
});