const express = require('express');
const { sql, poolPromise } = require('../dbconfig');
const router = express.Router();

// 📂 Témák lekérése + kommentek száma
router.get('/temak', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT id, cim, szerzo, datum,
            (SELECT COUNT(*) FROM ForumKommentek WHERE tema_id = ForumTemak.id) AS hszSzam
            FROM ForumTemak
            ORDER BY datum DESC
        `);
        res.json({ success: true, data: result.recordset });
    } catch (err) {
        console.error("Lekérdezési hiba (temak):", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ➕ Új téma mentése
router.post('/temak', async (req, res) => {
    try {
        const { cim, szerzo } = req.body;
        if (!cim || !szerzo) {
            return res.status(400).json({ success: false, error: "Cím és szerző kötelező!" });
        }

        const pool = await poolPromise;
        await pool.request()
            .input('cim', sql.NVarChar, cim)
            .input('szerzo', sql.NVarChar, szerzo)
            .query('INSERT INTO ForumTemak (cim, szerzo, datum) VALUES (@cim, @szerzo, GETDATE())');

        res.status(201).json({ success: true, message: "Téma sikeresen létrehozva!" });
    } catch (err) {
        console.error("Mentési hiba (temak):", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 💬 Kommentek lekérése
router.get('/kommentek/:temaId', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('temaId', sql.Int, req.params.temaId)
            .query('SELECT * FROM ForumKommentek WHERE tema_id = @temaId ORDER BY datum ASC');

        res.json({ success: true, data: result.recordset });
    } catch (err) {
        console.error("Lekérdezési hiba (kommentek):", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ✍️Új komment mentése
router.post('/kommentek', async (req, res) => {
    try {
        const { tema_id, szerzo, szoveg } = req.body;
        if (!tema_id || !szerzo || !szoveg) {
            return res.status(400).json({ success: false, error: "Hiányzó mezők!" });
        }

        const pool = await poolPromise;
        await pool.request()
            .input('tema_id', sql.Int, tema_id)
            .input('szerzo', sql.NVarChar, szerzo)
            .input('szoveg', sql.NVarChar, szoveg)
            .query('INSERT INTO ForumKommentek (tema_id, szerzo, szoveg, datum) VALUES (@tema_id, @szerzo, @szoveg, GETDATE())');

        res.status(201).json({ success: true, message: "Komment elküldve!" });
    } catch (err) {
        console.error("Mentési hiba (kommentek):", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router; 