let mongoose = require("mongoose");
mongoose.Promise = global.Promise;
let Schema = mongoose.Schema;

let NoteSchema = new Schema({
  note: {
    type: String,
    default: 'No Note'
  },
  time: {
    type: Date,
    default: Date.now
  }
});

let Note = mongoose.model("Note", NoteSchema);

module.exports = Note;