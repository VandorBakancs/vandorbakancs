const express = require('express');
const { sql, poolPromise } = require('../dbconfig'); 
const router = express.Router();

// ==========================================
// 1. BEJELENTKEZÉS (Sima szöveges jelszóval)
// ==========================================
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const pool = await poolPromise; 
        
        const result = await pool.request()
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password)
            .query('SELECT id, nev, email, role FROM Users WHERE email = @email AND password = @password');

        if (result.recordset.length === 0) {
            return res.status(401).json({ success: false, error: "Hibás email cím vagy jelszó!" });
        }

        const user = result.recordset[0];

        res.json({ 
            success: true, 
            user: {
                id: user.id,
                nev: user.nev,
                email: user.email,
                role: user.role
            } 
        });

    } catch (error) {
        console.error("Bejelentkezési hiba a szerveren:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ==========================================
// 2. REGISZTRÁCIÓ (Sima szöveges jelszóval)
// ==========================================
router.post('/register', async (req, res) => {
    try {
        const { nev, email, password } = req.body;

        if (!nev || !email || !password) {
            return res.status(400).json({ success: false, error: "Minden mező kitöltése kötelező!" });
        }

        const pool = await poolPromise;

        const checkUser = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT id FROM Users WHERE email = @email');

        if (checkUser.recordset.length > 0) {
            return res.status(400).json({ success: false, error: "Ez az email cím már használatban van!" });
        }

        await pool.request()
            .input('nev', sql.NVarChar, nev)
            .input('email', sql.NVarChar, email)
            .input('password', sql.NVarChar, password)
            .query('INSERT INTO Users (nev, email, password, role) VALUES (@nev, @email, @password, \'user\')');

        res.json({ success: true, message: "Sikeres regisztráció!" });

    } catch (error) {
        console.error("Regisztrációs hiba a szerveren:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

module.exports = router;