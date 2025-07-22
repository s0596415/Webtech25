const mongoose = require("mongoose");

const AnleitungSchema = new mongoose.Schema({
  titel: String,
  materialien: [String],
  runden: [{
    text: String,
    completed: Boolean
  }],
  kommentare: String,
  youtubeLink: String
});

module.exports = mongoose.model("Anleitung", AnleitungSchema);
