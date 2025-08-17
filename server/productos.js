const express = require('express');
const router = express.Router();
const sql = require('mssql');
const config = {
  user: 'sa',
  password: 'Matiescucha90..',
  server: 'dev.matiivilla.cl',
  database: 'moraartt',
  options: {
    encrypt: false, // Cambia a true si usas Azure
    trustServerCertificate: true
  }
};

router.get('/', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Productos`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;