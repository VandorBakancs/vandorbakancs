require('dotenv').config();
const sql = require('mssql');


const config = process.env.DATABASE_URL ? {
    connectionString: process.env.DATABASE_URL,
    options: {
        encrypt: true,
        trustServerCertificate: false
    }
} : {
    user: process.env.DB_USER || 'sa',
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || '127.0.0.1',
    database: process.env.DB_DATABASE || 'VandorBakancsDb',
    port: parseInt(process.env.DB_PORT) || 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true
    },
    connectionTimeout: 30000
};

const poolPromise = new sql.ConnectionPool(config)
    .connect()
    .then(pool => {
        console.log('✅ ADATBÁZIS: Kapcsolat sikeresen felépítve!');
        return pool;
    })
    .catch(err => {
        console.error('❌ SQL HIBA:', err.message);
    });

module.exports = { sql, poolPromise, config };