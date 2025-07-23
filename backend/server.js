const express = require('express'); // Express ist das Webframework zum Erstellen des Servers
const mongoose = require('mongoose');   // Mongoose verbindet Node.js mit MongoDB-Datenbanken
require('dotenv').config();     //Liest Umgebungsvariablen aus der .env-Datei
const cors = require('cors');   // Ermöglicht Cross-Origin Requests (Frontend ↔ Backend)
const path = require('path');   // path erlaubt den Umgang mit Dateipfaden (z. B. für statische Dateien)

// Importiert unsere Routen (z. B. GET/POST/DELETE für Anleitungen)
const routes = require('./routes'); // → ./routes/index.js

const app = express();       // Unser Server (Express-Anwendung)
const PORT = 3000;           // Port, auf dem der Server läuft (localhost:3000)


// Erlaubt das Verarbeiten von JSON-Daten, die vom Client kommen
app.use(express.json());

// Erlaubt Zugriff von anderen Domains (Frontend z. B. über localhost:5173)
app.use(cors());


// API-Routen einbinden
app.use('/api/anleitung', routes);


// Frontend-Dateien ausliefern
app.use(express.static('public')); // Inhalte aus dem Ordner /public ausliefern (z. B. index.html, CSS, etc.)
// Weitere statische Dateien aus dem Semesterprojekt-Ordner ausliefern
const frontendPath = path.join(__dirname, '/Semesteraufgabe'); // __dirname = aktuelles Verzeichnis → ../Semesteraufgabe = Ordner mit dem Frontend 
app.use(express.static(frontendPath));

// connect to mongoDB
mongoose.connect(process.env.DB_CONNECTION, { dbName: process.env.DATABASE });
const db = mongoose.connection;
db.on('error', err => {
  console.log(err);
});
db.once('open', () => {
    console.log('connected to DB');
});

app.listen(PORT, (error) => {
    if (error) { // Wenn ein Fehler passiert, wird er in der Konsole angezeigt
        console.log(error); 
    } else {
        console.log(`Server started and listening on port ${PORT} ... `);// Sobald verbunden, wird "connected to DB" ausgegeben
    }
});
