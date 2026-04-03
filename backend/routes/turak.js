const express = require('express');
const { sql, poolPromise } = require('../dbconfig');
const router = express.Router();

// ==========================================
// KEDVENCEK FUNKCIÓK (Új szakasz)
// ==========================================

// Egy adott felhasználó kedvenceinek lekérése
router.get('/kedvencek/:userId', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', sql.Int, req.params.userId)
            .query(`
                SELECT t.* FROM Turak t
                JOIN KedvencTurak k ON t.id = k.tura_id
                WHERE k.user_id = @userId
            `);
        res.json({ success: true, data: result.recordset });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// Kedvenc hozzáadása vagy eltávolítása (Toggle)
router.post('/kedvencek', async (req, res) => {
    try {
        const { user_id, tura_id } = req.body;
        const pool = await poolPromise;

        // Megnézzük, bent van-e már a kedvencek között
        const check = await pool.request()
            .input('uid', sql.Int, user_id)
            .input('tid', sql.Int, tura_id)
            .query('SELECT * FROM KedvencTurak WHERE user_id = @uid AND tura_id = @tid');

        if (check.recordset.length > 0) {
            // Ha már ott van, eltávolítjuk
            await pool.request()
                .input('uid', sql.Int, user_id)
                .input('tid', sql.Int, tura_id)
                .query('DELETE FROM KedvencTurak WHERE user_id = @uid AND tura_id = @tid');
            res.json({ success: true, message: 'Eltávolítva a kedvencek közül' });
        } else {
            // Ha nincs ott, hozzáadjuk
            await pool.request()
                .input('uid', sql.Int, user_id)
                .input('tid', sql.Int, tura_id)
                .query('INSERT INTO KedvencTurak (user_id, tura_id) VALUES (@uid, @tid)');
            res.json({ success: true, message: 'Hozzáadva a kedvencekhez' });
        }
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});


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

// Új túra hozzáadása
router.post('/', async (req, res) => {
    try {
        const { nev, helyszin, idotartam, nehezseg } = req.body;

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