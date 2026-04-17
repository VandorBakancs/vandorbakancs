// dbconfig.js
require('dotenv').config();
const sql = require('mssql');

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER, // 1
  database: process.env.DB_NAME,
  options: {
    encrypt: true, // Azure SQL esetén ez a sor KÖTELEZŐ!
    trustServerCertificate: false 
  },
  connectionTimeout: 30000 
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('✅ ADATBÁZIS: Kapcsolat OK (127.0.0.1:1433)');
        return pool;
    })
    .catch(err => {
        console.error('❌ SQL HIBA:', err.message);
    });

module.exports = { sql, poolPromise, config };