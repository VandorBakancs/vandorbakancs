const express = require('express');
const { sql, poolPromise } = require('../dbconfig');
const router = express.Router();

// Összes túra lekérése
router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise; // Itt várjuk meg a tényleges kapcsolatot
        const result = await pool.request().query('SELECT * FROM Turak');
        res.json({ success: true, data: result.recordset });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Új túra hozzáadása
router.post('/', async (req, res) => {
    try {
        const { nev, helyszin, idotartam, nehezseg } = req.body;
        const pool = await poolPromise;
        await pool.request()
            .input('n', sql.NVarChar, nev)
            .input('h', sql.NVarChar, helyszin)
            .input('i', sql.NVarChar, idotartam)
            .input('neh', sql.NVarChar, nehezseg)
            .query('INSERT INTO Turak (nev, helyszin, idotartam, nehezseg) VALUES (@n, @h, @i, @neh)');
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Törlés
router.delete('/:id', async (req, res) => {
    try {
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM Turak WHERE id = @id');
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;