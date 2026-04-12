const express = require('express');
const { sql, poolPromise } = require('../dbconfig');
const router = express.Router();

// 🏆 Egy adott felhasználó összes jelvényének lekérése
router.get('/user/:userId', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('userId', sql.Int, req.params.userId)
            .query(`
                SELECT J.nev, J.leiras, J.ikon, UJ.datum
                FROM UserJelvenyek UJ
                JOIN Jelvenyek J ON UJ.jelveny_id = J.id
                WHERE UJ.user_id = @userId
                ORDER BY UJ.datum DESC
            `);
        res.json({ success: true, data: result.recordset });
    } catch (err) {
        console.error("Hiba a jelvények lekérésekor:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// 🎖️ Összes létező jelvény lekérése (opcionális, pl. egy listához)
router.get('/osszes', async (req, res) => {
    try {
        const pool = await poolPromise;
        const result = await pool.request().query('SELECT * FROM Jelvenyek');
        res.json({ success: true, data: result.recordset });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;