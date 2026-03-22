const express = require('express');
const { sql, poolPromise } = require('../dbconfig'); 
const router = express.Router();

// ==========================================
// 1. BEJELENTKEZÉS (POST: http://localhost:3000/api/auth/login)
// ==========================================
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const pool = await poolPromise; 
        
        const result = await pool.request()
            .input('e', sql.NVarChar, email)
            .input('p', sql.NVarChar, password)
            .query('SELECT id, nev, role FROM Users WHERE email = @e AND password = @p');

        if (result.recordset.length > 0) {
            res.json({ success: true, user: result.recordset[0] });
        } else {
            res.status(401).json({ success: false, error: "Hibás email cím vagy jelszó!" });
        }
    } catch (error) {
        console.error("Bejelentkezési hiba a szerveren:", error.message);
        res.status(500).json({ success: false, error: error.message });
    }
});

// ==========================================
// 2. REGISZTRÁCIÓ (POST: http://localhost:3000/api/auth/register)
// ==========================================
router.post('/register', async (req, res) => {
    try {
        const { nev, email, password } = req.body;

        const pool = await poolPromise;

        // Először ellenőrizzük, hogy létezik-e már ez az email cím
        const checkUser = await pool.request()
            .input('email', sql.NVarChar, email)
            .query('SELECT id FROM Users WHERE email = @email');

        if (checkUser.recordset.length > 0) {
            return res.status(400).json({ success: false, error: "Ez az email cím már használatban van!" });
        }

        // Ha szabad az email, beszúrjuk az új felhasználót (alapértelmezetten 'user' role-lal)
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