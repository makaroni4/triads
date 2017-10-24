module.exports = (function(){
  return {
    openStringsNotes: ["E", "B", "G", "D", "A", "E"],
    notesProgression: ["E", "F", ["F#", "Gb"], "G", ["G#", "Ab"], "A", ["A#", "Bb"], "B", "C", ["C#", "Db"], "D", ["D#", "Eb"]],
    scale_notes: {
      "c-major": ["C", "D", "E", "F", "G", "A", "B"],
      "f-major": ["F", "G", "A", "Bb", "C", "D", "E"],
      "g-major": ["G", "A", "B", "C", "D", "E", "F#"],
      "d-major": ["D", "E", "F#", "G", "A", "B", "C#"],
      "a-major": ["A", "B", "C#", "D", "E", "F#", "G#"],
      "e-major": ["E", "F#", "G#", "A", "B", "C#", "D#"],
      "b-major": ["B", "C#", "D#", "E", "F#", "G#", "A#"]
    }
  }
})();
