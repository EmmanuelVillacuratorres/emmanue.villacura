const express = require('express');
const router = express.Router();
const { sql, config } = require('./db');


// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Productos`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agregar producto
router.post('/', async (req, res) => {
  const {
    Nombre,
    Descripcion,
    Precio,
    Categoria,
    UrlImagen,
    Duracion,
    Disponible
  } = req.body;

  try {
    await sql.connect(config);
    await sql.query`
      INSERT INTO Productos (Nombre, Descripcion, Precio, Categoria, UrlImagen, Duracion, Disponible)
      VALUES (${Nombre}, ${Descripcion}, ${Precio}, ${Categoria}, ${UrlImagen}, ${Duracion}, ${Disponible})
    `;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar producto
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    Nombre,
    Descripcion,
    Precio,
    Categoria,
    UrlImagen,
    Duracion,
    Disponible
  } = req.body;

  try {
    await sql.connect(config);
    await sql.query`
      UPDATE Productos
      SET Nombre = ${Nombre},
          Descripcion = ${Descripcion},
          Precio = ${Precio},
          Categoria = ${Categoria},
          UrlImagen = ${UrlImagen},
          Duracion = ${Duracion},
          Disponible = ${Disponible}
      WHERE Id = ${id}
    `;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cambiar disponibilidad de un producto
router.patch('/:id/disponible', async (req, res) => {
  const { id } = req.params;
  const { Disponible } = req.body;
  try {
    await sql.connect(config);
    await sql.query`
      UPDATE Productos
      SET Disponible = ${Disponible}
      WHERE Id = ${id}
    `;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;