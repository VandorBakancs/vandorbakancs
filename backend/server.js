const express = require('express');
const sql = require('mssql');
const cors = require('cors');

const app = express();

// FONTOS: Ez engedi, hogy a frontend (3000-es port) elérje a backendet (5000-es port)
app.use(cors());
app.use(express.json());

// MSSQL KONFIGURÁCIÓ - A TE ADATAIDAL
const config = {
    user: 'sa', 
    password: 'geci123', 
    server: 'DAVID\\SQLEXPRESS', 
    database: 'VandorBakancsDb', 
    options: {
        encrypt: false, // Helyi fejlesztésnél false
        trustServerCertificate: true // Self-signed cert miatt kötelező
    },
    port: 1433 // Alapértelmezett MSSQL port
};

// Adatbázis kapcsolat tesztelése az indulásnál
sql.connect(config).then(pool => {
    if (pool.connected) console.log('Sikeresen csatlakozva az MSSQL-hez (DAVID\\SQLEXPRESS)!');
}).catch(err => {
    console.error('MSSQL Kapcsolódási hiba! Ellenőrizd a jelszót:', err.message);
});

// TÚRÁK LEKÉRÉSE
app.get('/api/turak', async (req, res) => {
    try {
        let pool = await sql.connect(config);
        let result = await pool.request().query("SELECT * FROM Turak");
        res.json(result.recordset); 
    } catch (err) {
        console.error("Hiba a túrák lekérésekor:", err);
        res.status(500).json({ error: "Szerverhiba az adatok lekérésekor." });
    }
});

// REGISZTRÁCIÓ MENTÉSE MSSQL-BE
app.post('/api/regisztracio', async (req, res) => {
    const { nev, email, jelszo } = req.body;
    try {
        let pool = await sql.connect(config);
        await pool.request()
            .input('nev', sql.NVarChar, nev)
            .input('email', sql.NVarChar, email)
            .input('jelszo', sql.NVarChar, jelszo)
            .query("INSERT INTO Felhasznalok (Nev, Email, Jelszo) VALUES (@nev, @email, @jelszo)");
        
        res.status(201).json({ message: "Sikeres regisztráció és mentés!" });
    } catch (err) {
        console.error("Regisztrációs hiba:", err);
        res.status(500).json({ error: "Nem sikerült menteni az adatbázisba." });
    }
});

// Szerver indítása az 5000-es porton
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`A backend szerver fut: http://localhost:${PORT}`);
});