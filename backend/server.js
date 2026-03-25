require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// CORS és JSON middleware (Kötelező az útvonalak előtt!)
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.json());

// Útvonalak importálása
const turaRoutes = require('./routes/turak');
const authRoutes = require('./routes/auth');
const forumRoutes = require('./routes/forum'); 

// Útvonalak regisztrációja
app.use('/api/turak', turaRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/forum', forumRoutes); 

app.get('/', (req, res) => {
    res.send('<h1>A VándorBakancs szerver online!</h1>');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Szerver fut: http://localhost:${PORT}`);
    console.log(`🔗 Túra API teszt: http://localhost:${PORT}/api/turak`); // 👈 Visszakerült! :)
    console.log(`🔗 Fórum API teszt: http://localhost:${PORT}/api/forum/temak`); 
});