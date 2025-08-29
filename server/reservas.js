const express = require('express');
const router = express.Router();
const { sql, config } = require('./db');

// Crear una reserva
router.post('/', async (req, res) => {
  const { UsuarioId, ProductoId, Fecha, Hora, Estado, Notas, CreadoEn, Telefono, Email } = req.body;
  try {
    await sql.connect(config);
    await sql.query`
      INSERT INTO Reservas (UsuarioId, ProductoId, Fecha, Hora, Estado, Notas, CreadoEn, Telefono, Email)
      VALUES (${UsuarioId}, ${ProductoId}, ${Fecha}, ${Hora}, ${Estado}, ${Notas}, ${CreadoEn}, ${Telefono}, ${Email})
    `;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener todas las reservas con datos de usuario y producto
router.get('/', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query(`
      SELECT 
        r.Id,
        r.NombreCliente,
        u.Correo AS UsuarioCorreo,
        u.Telefono AS UsuarioTelefono,
        p.Nombre AS NombreProducto,
        p.Categoria,
        p.Duracion,
        p.Precio,
        r.Fecha,
        r.Hora,
        r.Estado,
        r.Notas
      FROM Reservas r
      JOIN Usuarios u ON r.UsuarioId = u.Id
      LEFT JOIN Productos p ON r.ProductoId = p.Id
    `);
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cambiar estado de una reserva
router.patch('/:id/estado', async (req, res) => {
  const { id } = req.params;
  const { Estado } = req.body;
  try {
    await sql.connect(config);
    await sql.query`
      UPDATE Reservas
      SET Estado = ${Estado}
      WHERE Id = ${id}
    `;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;