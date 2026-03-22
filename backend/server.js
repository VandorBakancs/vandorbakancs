require('dotenv').config();
const express = require('express');
const cors = require('cors');

const turaRoutes = require('./routes/turak');
const authRoutes = require('./routes/auth');

const app = express();


app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Útvonalak
app.use('/api/turak', turaRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('<h1>VándorBakancs Szerver Online</h1>');
});

const PORT = 5000; // 👈 Átírtuk 5000-re!
app.listen(PORT, () => {
    console.log(`\n🚀 Szerver fut: http://localhost:${PORT}`);
    console.log(`🔗 API teszt: http://localhost:${PORT}/api/turak`);
});