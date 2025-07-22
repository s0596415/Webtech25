const express = require("express");
const router = express.Router();
const Anleitung = require("./models/Anleitung");

//Alle Anleitungen
router.get("/", async (req, res) => {
  const anleitungen = await Anleitung.find();
  res.json(anleitungen);
});

// Einzelne Anleitung
router.get("/:id", async (req, res) => {
  const anleitung = await Anleitung.findById(req.params.id);
  res.json(anleitung);
});

// Neue Anleitung
router.post("/", async (req, res) => {
  const anleitung = new Anleitung(req.body);
  await anleitung.save();
  res.status(201).json(anleitung);
});

// Anleitung Bearbeiten
router.put("/:id", async (req, res) => {
  const anleitung = await Anleitung.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(anleitung);
});

// Kommplette Anleitung Löschen
router.delete("/:id", async (req, res) => {
  await Anleitung.findByIdAndDelete(req.params.id);
  res.json({ message: "Anleitung gelöscht" });
});

// Einzelne Runden Löschen
router.delete('/api/anleitung/:anleitungId/runden/:rundenId', async (req, res) => {
  const { anleitungId, rundenId } = req.params;

  try {
    const result = await Anleitung.findByIdAndUpdate(
      anleitungId,
      { $pull: { runden: { _id: rundenId } } },
      { new: true }
    );

    if (!result) {
      return res.status(404).send({ message: 'Anleitung nicht gefunden' });
    }

    res.status(200).send({ message: 'Runde gelöscht', data: result });
  } catch (err) {
    res.status(500).send({ message: 'Fehler beim Löschen der Runde', error: err });
  }
});

// Einzelne Anleitung aktualisieren
router.put("/:id", async (req, res) => {
  try {
    const anleitung = await Anleitung.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(anleitung);
  } catch (error) {
    res.status(500).send("Fehler beim Speichern");
  }
});
module.exports = router;


