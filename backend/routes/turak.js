const express = require('express');
const { sql, poolPromise } = require('../dbconfig');
const router = express.Router();

// Összes túra lekérése
router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise; 
        const result = await pool.request().query('SELECT * FROM Turak');
        res.json({ success: true, data: result.recordset });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Új túra hozzáadása (Kijavítva a változó nevek!)
router.post('/', async (req, res) => {
    try {
        const { nev, helyszin, idotartam, nehezseg } = req.body;

        // Validáció: Ne engedjük üresen elküldeni a két legfontosabb mezőt!
        if (!nev || !helyszin) {
            return res.status(400).json({ success: false, error: "A túra neve és helyszíne kötelező!" });
        }

        const pool = await poolPromise;
        await pool.request()
            .input('nev', sql.NVarChar, nev)
            .input('helyszin', sql.NVarChar, helyszin)
            .input('idotartam', sql.NVarChar, idotartam || 'Nincs megadva')
            .input('nehezseg', sql.NVarChar, nehezseg || 'Közepes')
            .query('INSERT INTO Turak (nev, helyszin, idotartam, nehezseg) VALUES (@nev, @helyszin, @idotartam, @nehezseg)');
        
        res.json({ success: true, message: 'Túra sikeresen hozzáadva!' });
    } catch (err) {
        console.error("SQL hiba a hozzáadásnál:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// Túra törlése
router.delete('/:id', async (req, res) => {
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, req.params.id) 
            .query('DELETE FROM Turak WHERE id = @id'); 
            
        res.json({ success: true, message: 'Túra sikeresen törölve!' });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;