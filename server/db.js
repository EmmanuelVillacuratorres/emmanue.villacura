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

/*/

LOCAL
const sql = require('mssql');

const config = {
  user: '',       // Usuario de tu SQL Server local
  password: '',   // Contraseña de tu SQL Server local
  server: '(localdb)\MSSQLLocalDB',            // O la IP de tu máquina (127.0.0.1)
  database: 'moraartt',  // Nombre de tu base de datos local
  options: {
    encrypt: false,                // Generalmente false para conexiones locales
    trustServerCertificate: true   // Necesario si no tienes certificado configurado
  }
};

module.exports = { sql, config };

/*/ 