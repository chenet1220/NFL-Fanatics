const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
}, {
  timestamps: true
});

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
    type: String
  },
  comments: [commentSchema],
  imagePath: String 
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;





