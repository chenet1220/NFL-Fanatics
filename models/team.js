const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
 
 
  name: {
    type: String,
    required: true,
    unique: true
  },
  division: {
    type: String,
    required: true,
    enum: ["AFC East","AFC North","AFC South","AFC West","NFC East","NFC North","NFC South","NFC West"]
  },
  record: {
    type: String,
  }
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;


