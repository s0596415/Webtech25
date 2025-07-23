const express = require("express");
const router = express.Router(); 
const Anleitung = require("./models/Anleitung");


//======  GET  ======= Aufrufen

// Alle Anleitungen
router.get("/", async (req, res) => {
    // Alle Anleitung-Dokumente aus der MongoDB-Sammlung laden
    const anleitungen = await Anleitung.find();  // find() = alle Dokumente
    // Die gefundenen Anleitungen als JSON an den Client zurücksenden
    res.json(anleitungen);
});


// Einzelne Anleitung
router.get("/:id", async (req, res) => {
  // Eine Anleitung anhand der ID abrufen
  const anleitung = await Anleitung.findOne({ _id: req.params.id });
  console.log(req.params); // Nur zum Testen - zeigt ID in der konsole
  
  if (anleitung) {
    res.json(anleitung); // wenn gefunden -> zurückgeben
  } else {
    
    res.status(404);  // wenn nicht gefunden -> Fehlermeldung 404
    res.json({ error: "Anleitung existiert nicht!" });
  }
});


//=========   POST ================ Erstellen

// Neue Anleitung
router.post("/", async (req, res) => {
  // Neue Anleitung anhand der gesendeten Daten erzeugen
  const anleitung = new Anleitung(req.body);

  //Anleitung in Datenbank speichern
  await anleitung.save();

  // 201 = Erstellen erfolgreich
  res.status(201).json(anleitung);
});


//=========  PUT  =============== 
// Einzelne Anleitung aktualisieren
router.put("/:id", async (req, res) => {
  try {
    // Die gesamte Anleitung wird durch den Inhalt von req.body ersetzt (alt wird durch neu ersetzt)
    const anleitung = await Anleitung.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // gibt die aktualisierte Version zurück
    );
    res.json(anleitung);
  } catch (error) {
    // Fehler beim Zugriff oder Aktualisieren
    res.status(500).send("Fehler beim Speichern");
  }
});


//=========  PATCH  ============
// Anleitung teilweise aktualisieren

router.patch('/:id', async (req, res) => {
  try {
    // 1. Suche die Anleitung mit der übergebenen ID in der Datenbank
    const anleitung = await Anleitung.findOne({ _id: req.params.id });

    // 2. Falls keine Anleitung mit der ID gefunden wurde, sende eine 404 Fehlerantwort
    if (!anleitung) {
      return res.status(404).send({ error: "Anleitung existiert nicht!" });
    }

    // 3. Für jedes Feld prüfen, ob es im Request-Body enthalten ist (also aktualisiert werden soll)
    if (req.body.materialien !== undefined) {// Der Wert aus dem Body überschreibt das alte Feld
      anleitung.materialien = req.body.materialien;
    }
    if (req.body.runden !== undefined) {
      anleitung.runden = req.body.runden;
    }
    if (req.body.kommentare !== undefined) {
      anleitung.kommentare = req.body.kommentare;
    }
    if (req.body.youtubeLink !== undefined) {
      anleitung.youtubeLink = req.body.youtubeLink;
    }

    // 4. Speichere die aktualisierte Anleitung in der Datenbank

    // Alternative: await anleitung.save(); ← besser für Validierungen & Middleware
    await Anleitung.updateOne({ _id: req.params.id }, anleitung); 

    // 5. Sende die aktualisierte Anleitung als Antwort zurück an den Client
    res.send(anleitung);

  } catch (error) {
    // Falls ein Fehler während der Verarbeitung auftritt, sende eine 500 Fehlerantwort
    res.status(500).send({ error: "Fehler beim Aktualisieren der Anleitung" });
  }
});


//============  DELETE  ====================
// Kommplette Anleitung löschen

router.delete("/:id", async (req, res) => {
  // Anleitung anhand der ID löschen
  await Anleitung.findByIdAndDelete(req.params.id);

  // Antwort an den Client
  res.json({ message: "Anleitung gelöscht" });
});


// Router exportieren, damit er im Hauptserver geladen werden kann
module.exports = router;


