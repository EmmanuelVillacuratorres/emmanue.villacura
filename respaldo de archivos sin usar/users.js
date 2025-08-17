const express = require('express');
const router = express.Router();
const { sql, config } = require('./db');

router.get('/', (req, res) => {
  res.json([]); // Devuelve un array vacío por ahora
});

router.post('/', async (req, res) => {
  const { nombreUsuario, password, correo } = req.body;
  try {
    await sql.connect(config);
    await sql.query(`
      EXEC RegistrarUsuario
        @NombreUsuario = N'${nombreUsuario}',
        @HashPassword = N'${password}',
        @Correo = N'${correo}'
    `);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;