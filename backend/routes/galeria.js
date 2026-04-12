const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { sql, poolPromise } = require('../dbconfig');

// 1. BIZTONSÁGI LÉPÉS: Ellenőrizzük és létrehozzuk az uploads mappát, ha nincs!
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
    console.log("📂 'uploads' mappa automatikusan létrehozva!");
}

// Multer beállítása (ide menti a képeket)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); 
    }
});
const upload = multer({ storage: storage });

// ==========================================
// KÉPEK LEKÉRÉSE (Túra és User nevekkel együtt!)
// ==========================================
router.get('/', async (req, res) => {
    try {
        const pool = await poolPromise;
        // Összekapcsoljuk a táblákat (JOIN), hogy a frontend megkapja a neveket is
        const result = await pool.request().query(`
            SELECT 
                tk.id, tk.kep_url, tk.leiras, tk.datum,
                t.nev AS turaNev,
                u.nev AS feltolto
            FROM TuraKepek tk
            JOIN Turak t ON tk.tura_id = t.id
            JOIN Users u ON tk.user_id = u.id
            ORDER BY tk.datum DESC
        `);
        res.json({ success: true, data: result.recordset });
    } catch (err) {
        console.error("Hiba a galéria lekérésekor:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// ÚJ KÉP FELTÖLTÉSE (POST)
// ==========================================
router.post('/', upload.single('kep'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: "Nem érkezett képfájl!" });
        }

        const { tura_id, user_id, leiras } = req.body;
        const kepUrl = `/uploads/${req.file.filename}`;

        const pool = await poolPromise;
        
        await pool.request()
            .input('tura_id', sql.Int, parseInt(tura_id))
            .input('user_id', sql.Int, parseInt(user_id))
            .input('kep_url', sql.NVarChar, kepUrl)
            .input('leiras', sql.NVarChar, leiras || '')
            .query(`
                INSERT INTO TuraKepek (tura_id, user_id, kep_url, leiras, datum) 
                VALUES (@tura_id, @user_id, @kep_url, @leiras, GETDATE())
            `);

        res.json({ success: true, message: 'A kép sikeresen feltöltve!' });

    } catch (err) {
        console.error("Hiba a feltöltésnél:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ==========================================
// KÉP TÖRLÉSE
// ==========================================
router.delete('/:id', async (req, res) => {
    try {
        const kepId = req.params.id;
        const pool = await poolPromise;

        const check = await pool.request()
            .input('id', sql.Int, kepId)
            .query('SELECT kep_url FROM TuraKepek WHERE id = @id');

        if (check.recordset.length === 0) {
            return res.status(404).json({ success: false, error: "A kép nem található az adatbázisban." });
        }

        const kepUrl = check.recordset[0].kep_url;

        await pool.request()
            .input('id', sql.Int, kepId)
            .query('DELETE FROM TuraKepek WHERE id = @id');

        if (kepUrl) {
            const tisztaUrl = kepUrl.startsWith('/') ? kepUrl.substring(1) : kepUrl;
            const filePath = path.join(__dirname, '..', tisztaUrl);

            fs.unlink(filePath, (fsErr) => {
                if (fsErr) console.error("Figyelem: A fájl már nem létezik a mappában.", fsErr);
            });
        }

        res.json({ success: true, message: 'A kép sikeresen törölve lett!' });
    } catch (err) {
        console.error("Hiba a kép törlése során:", err.message);
        res.status(500).json({ success: false, error: err.message });
    }
});

module.exports = router;