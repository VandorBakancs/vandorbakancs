require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// CORS és JSON middleware (kötelező az útvonalak előtt!!!!!!!)
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
const jelvenyRoutes = require('./routes/jelvenyek');
const galeriaRoutes = require('./routes/galeria');

// Statikus mappa kiszolgálása a képekhez (ha az 'uploads' mappába mented őket)
app.use('/uploads', express.static('uploads')); 

// útvonalak regisztrációja
// MEGJEGYZÉS: A kedvencek funkciókat a turak.js kezeli az /api/turak/kedvencek úton
app.use('/api/turak', turaRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/jelvenyek', jelvenyRoutes);
app.use('/api/galeria', galeriaRoutes); 

app.get('/', (req, res) => {
    res.send('<h1>A Vándor Bakancs szerver online!</h1>');
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`\n🚀 Szerver fut: http://localhost:${PORT}`);
    console.log(`🔗 Túra API teszt: http://localhost:${PORT}/api/turak`);
    console.log(`🔗 Fórum API teszt: http://localhost:${PORT}/api/forum/temak`);
    console.log(`🔗 Galéria API teszt: http://localhost:${PORT}/api/galeria`); 
});