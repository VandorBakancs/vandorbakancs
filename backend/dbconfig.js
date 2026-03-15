// dbconfig.js
require('dotenv').config();
const sql = require('mssql');

const config = {
    user: 'sa',
    password: process.env.DB_PASSWORD,
    server: '127.0.0.1', // localhost helyett fix IP
    database: 'VandorBakancsDb',
    port: 1433,          // Fix port az SQL Express-nek
    options: {
        encrypt: false,
        trustServerCertificate: true,
        // Az instanceName-t hagyd el, ha fix portot használsz!
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