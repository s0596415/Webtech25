const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const path = require('path');
const routes = require('./routes');


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

// API-Routen einbinden
app.use('/api/anleitung', routes);


// Frontend-Dateien ausliefern
app.use(express.static('public'));
const frontendPath = path.join(__dirname, '../Semesteraufgabe'); // Pfad anpassen
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
    if (error) {
        console.log(error); 
    } else {
        console.log(`Server started and listening on port ${PORT} ... `);
    }
});
