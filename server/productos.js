const express = require('express');
const router = express.Router();
const sql = require('mssql');

const config = {
  user: 'sa',
  password: 'Matiescucha90..',
  server: 'dev.matiivilla.cl',
  database: 'moraartt',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

//listar productos
router.get('/', async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Productos`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



//eliminar producto por id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await sql.connect(config);
    await sql.query`DELETE FROM Productos WHERE Id = ${id}`;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// agregar producto
router.post('/', async (req, res) => {
  const { Nombre, Descripcion, Precio, Stock } = req.body;  
  try {
    await sql.connect(config);
    await sql.query`
      INSERT INTO Productos (Nombre, Descripcion, Precio, Stock, CreadoEn)
      VALUES (${Nombre}, ${Descripcion}, ${Precio}, ${Stock}, ${new Date()})
    `;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
  
    }




);// actualizar producto
router.put('/:id', async (req, res) => {
  const { id } = req.params;  
  const { Nombre, Descripcion, Precio, Stock } = req.body;
  try {
    await sql.connect(config);
    await sql.query`
      UPDATE Productos  
      SET Nombre = ${Nombre}, Descripcion = ${Descripcion}, Precio = ${Precio}, Stock = ${Stock}
      WHERE Id = ${id}
    `;
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;