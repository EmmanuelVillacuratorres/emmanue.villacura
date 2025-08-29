const express = require('express');
const router = express.Router();
const { sql, config } = require('./db');

// Crear una reserva
router.post('/', async (req, res) => {
  const { UsuarioId, ProductoId, Fecha, Hora, Estado, Notas, CreadoEn } = req.body;
  try {
    await sql.connect(config);
    await sql.query`
      INSERT INTO Reservas (UsuarioId, ProductoId, Fecha, Hora, Estado, Notas, CreadoEn)
      VALUES (${UsuarioId}, ${ProductoId}, ${Fecha}, ${Hora}, ${Estado}, ${Notas}, ${CreadoEn})
    `;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;