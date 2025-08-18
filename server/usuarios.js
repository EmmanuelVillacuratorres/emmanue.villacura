const express = require('express');
const router = express.Router();
const { sql, config } = require('./db');

//listar usuarios
router.get('/', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`
      SELECT Id, NombreUsuario, Correo, Rol, CreadoEn
      FROM Usuarios
    `;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//eliminar user por id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sql.connect(config);
    await sql.query`DELETE FROM Usuarios WHERE Id = ${id}`;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    await sql.connect(config);
    const result = await sql.query`
      SELECT Id, NombreUsuario, Correo, Rol
      FROM Usuarios
      WHERE NombreUsuario = ${username} AND HashPassword = ${password}
    `;
    if (result.recordset.length === 1) {
      res.json({ success: true, user: result.recordset[0] });
    } else {
      res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// registro de user
router.post('/', async (req, res) => {
  const { NombreUsuario, HashPassword, Correo, Rol } = req.body;
  try {
    await sql.connect(config);
    await sql.query`
      INSERT INTO Usuarios (NombreUsuario, HashPassword, Correo, Rol, CreadoEn)
      VALUES (${NombreUsuario}, ${HashPassword}, ${Correo}, ${Rol}, ${new Date()})
    `;
    res.json({ success: true });
  } catch (err) {
    console.error('Error al registrar usuario:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;