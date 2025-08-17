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

module.exports = { sql, config };