const express = require('express');
const sql = require('mssql');
const { config } = require('../dbconfig');
const router = express.Router();

// POST: http://localhost:5000/api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const pool = await sql.connect(config);
        const result = await pool.request()
            .input('e', sql.NVarChar, email)
            .input('p', sql.NVarChar, password)
            .query('SELECT id, nev, role FROM Users WHERE email = @e AND password = @p');

        if (result.recordset.length > 0) {
            res.json({ success: true, user: result.recordset[0] });
        } else {
            res.status(401).json({ success: false, error: "Hibás adatok" });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;