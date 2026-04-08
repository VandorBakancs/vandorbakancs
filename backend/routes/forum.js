const express = require('express');
const { sql, poolPromise } = require('../dbconfig');
const router = express.Router();

// 📂 Témák lekérése + kommentek száma + szerző JOIN
router.get('/temak', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query(`
            SELECT FT.id, FT.cim, FT.datum, U.nev AS szerzo,
            (SELECT COUNT(*) FROM ForumKommentek WHERE tema_id = FT.id) AS hszSzam
            FROM ForumTemak FT
            JOIN Users U ON FT.user_id = U.id
            ORDER BY FT.datum DESC
        `);
        res.json({ success: true, data: result.recordset });
    } catch (err) {
        console.error("Lekérdezési hiba (temak):", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ➕ Új téma mentése (user_id alapú)
router.post('/temak', async (req, res) => {
    try {
        const { cim, user_id } = req.body;
        if (!cim || !user_id) {
            return res.status(400).json({ success: false, error: "Cím és felhasználó ID kötelező!" });
        }

        const pool = await poolPromise;
        await pool.request()
            .input('cim', sql.NVarChar, cim)
            .input('user_id', sql.Int, user_id)
            .query('INSERT INTO ForumTemak (cim, user_id, datum) VALUES (@cim, @user_id, GETDATE())');

        res.status(201).json({ success: true, message: "Téma sikeresen létrehozva!" });
    } catch (err) {
        console.error("Mentési hiba (temak):", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 💬 Kommentek lekérése + szerző JOIN
router.get('/kommentek/:temaId', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('temaId', sql.Int, req.params.temaId)
            .query(`
                SELECT FK.id, FK.szoveg, FK.datum, U.nev AS szerzo 
                FROM ForumKommentek FK
                JOIN Users U ON FK.user_id = U.id
                WHERE FK.tema_id = @temaId 
                ORDER BY FK.datum ASC
            `);

        res.json({ success: true, data: result.recordset });
    } catch (err) {
        console.error("Lekérdezési hiba (kommentek):", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ✍️ Új komment mentése (user_id alapú)
router.post('/kommentek', async (req, res) => {
    try {
        const { tema_id, user_id, szoveg } = req.body;
        if (!tema_id || !user_id || !szoveg) {
            return res.status(400).json({ success: false, error: "Hiányzó mezők!" });
        }

        const pool = await poolPromise;
        await pool.request()
            .input('tema_id', sql.Int, tema_id)
            .input('user_id', sql.Int, user_id)
            .input('szoveg', sql.NVarChar, szoveg)
            .query('INSERT INTO ForumKommentek (tema_id, user_id, szoveg, datum) VALUES (@tema_id, @user_id, @szoveg, GETDATE())');

        res.status(201).json({ success: true, message: "Komment elküldve!" });
    } catch (err) {
        console.error("Mentési hiba (kommentek):", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 🗑️ Fórum téma törlése (Adminoknak)
router.delete('/temak/:id', async (req, res) => {
    try {
        console.log(`\n🗑️ Beérkező téma törlés kérés, ID: ${req.params.id}`);
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM ForumTemak WHERE id = @id');

        res.json({ success: true, message: "Téma sikeresen törölve!" });
    } catch (err) {
        console.error("❌ Törlési hiba a backendben (temak):", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 🗑️ Egy darab komment törlése (Adminoknak)
router.delete('/kommentek/:id', async (req, res) => {
    try {
        console.log(`\n🗑️ Beérkező komment törlés kérés, ID: ${req.params.id}`);
        const pool = await poolPromise;
        await pool.request()
            .input('id', sql.Int, req.params.id)
            .query('DELETE FROM ForumKommentek WHERE id = @id');

        res.json({ success: true, message: "Komment sikeresen törölve!" });
    } catch (err) {
        console.error("❌ Törlési hiba a backendben (kommentek):", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;