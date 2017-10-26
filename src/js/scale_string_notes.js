const CONFIG = require('./config');

var scaleStringNotes = function(string, scale) {
  var openStringNote = CONFIG.openStringsNotes[string],
      nextNoteIndex = (CONFIG.notesProgression.indexOf(openStringNote) + 1) % CONFIG.notesProgression.length;

  return [openStringNote]
           .concat(CONFIG.notesProgression.slice(nextNoteIndex))
           .concat(CONFIG.notesProgression.slice(0, nextNoteIndex))
           .concat(CONFIG.notesProgression.slice(nextNoteIndex));
};

module.exports = scaleStringNotes;
