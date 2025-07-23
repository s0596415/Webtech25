const mongoose = require("mongoose");

const RundeSchema = new mongoose.Schema({
  text: String,
  completed: Boolean
}, { _id: true }); // <-- WICHTIG: damit jede Runde eine ID bekommt

const AnleitungSchema = new mongoose.Schema({
  titel: String,
  materialien: [String],
  runden: [RundeSchema], // eingebettetes Subschema
  kommentare: String,
  youtubeLink: String
});


module.exports = mongoose.model("Anleitung", AnleitungSchema);
