require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// CORS és JSON middleware (kötelező az útvonalak előtt!!!!!!!)
app.use(cors({
    origin: [
        'http://localhost:3000', // helyi fejlesztéshez
        'vandorbakancs.vercel.app' 
    ], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'], // Authorization engedélyezése a login miatt
    credentials: true // Sütik és tokenek átengedése a két szerver között
}));

app.use(express.json());

// Útvonalak importálása
const turaRoutes = require('./routes/turak');
const authRoutes = require('./routes/auth');
const forumRoutes = require('./routes/forum');
const jelvenyRoutes = require('./routes/jelvenyek');
const galeriaRoutes = require('./routes/galeria');

app.use('/uploads', express.static('uploads')); 

// útvonalak regisztrációja
app.use('/api/turak', turaRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/forum', forumRoutes);
app.use('/api/jelvenyek', jelvenyRoutes);
app.use('/api/galeria', galeriaRoutes); 

app.get('/', (req, res) => {
    res.send('<h1>A Vándor Bakancs szerver online!</h1>');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`\n🚀 Szerver fut a ${PORT}-es porton!`);
    console.log(`🔗 Túra API teszt: http://localhost:${PORT}/api/turak`);
    console.log(`🔗 Fórum API teszt: http://localhost:${PORT}/api/forum/temak`);
    console.log(`🔗 Galéria API teszt: http://localhost:${PORT}/api/galeria`); 
});