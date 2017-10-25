module.exports = (function(){
  return {
    openStringsNotes: ["E", "B", "G", "D", "A", "E"],
    notesProgression: ["E", "F", ["F#", "Gb"], "G", ["G#", "Ab"], "A", ["A#", "Bb"], "B", "C", ["C#", "Db"], "D", ["D#", "Eb"]],
    scale_notes: {
      "C-major": ["C", "D", "E", "F", "G", "A", "B"],
      "F-major": ["F", "G", "A", "Bb", "C", "D", "E"],
      "G-major": ["G", "A", "B", "C", "D", "E", "F#"],
      "D-major": ["D", "E", "F#", "G", "A", "B", "C#"],
      "A-major": ["A", "B", "C#", "D", "E", "F#", "G#"],
      "E-major": ["E", "F#", "G#", "A", "B", "C#", "D#"],
      "B-major": ["B", "C#", "D#", "E", "F#", "G#", "A#"],
      "F#-major": ["F#", "G#", "A#", "B", "C#", "D#", "E#"],
      "Db-major": ["Db", "Eb", "F", "Gb", "Ab", "Bb", "C"],
      "Ab-major": ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
      "Eb-major": ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
      "Bb-major": ["Bb", "C", "D", "Eb", "F", "G", "A"]
    }
  }
})();
