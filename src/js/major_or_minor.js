var majorOrMinor = function(triad) {
  var NOTES_PROGRESSION = ["E", "F", ["F#", "Gb"], "G", ["G#", "Ab"], "A", ["A#", "Bb"], "B", "C", ["C#", "Db"], "D", ["D#", "Eb"]];

  var indices = triad.map(function(note) {
    return NOTES_PROGRESSION.findIndex(function(progressionNote) {
      if(progressionNote.constructor === Array) {
        return progressionNote.indexOf(note) > -1;
      } else {
        return progressionNote === note;
      }
    });
  });

  var distance_1 = indices[1] - indices[0],
      distance_2 = indices[2] - indices[1];

  distance_1 = (distance_1 + 12) % 12;
  distance_2 = (distance_2 + 12) % 12;

  if(distance_1 === 3 && distance_2 === 4) {
    return triad[0] + " minor";
  } else if(distance_1 === 3 && distance_2 === 3) {
    return triad[0] + " dim";
  } else if(distance_1 === 4 && distance_2 === 3) {
    return triad[0] + " major";
  } else if(distance_1 === 5 && distance_2 === 3) {
    return triad[1] + " minor 2 inv";
  } else if(distance_1 === 4 && distance_2 === 5) {
    return triad[2] + " minor 1 inv";
  } else if(distance_1 === 5 && distance_2 === 4) {
    return triad[1] + " major 2 inv";
  } else if(distance_1 === 3 && distance_2 === 5) {
    return triad[2] + " major 1 inv";
  } else if(distance_1 === 6 && distance_2 === 3) {
    return triad[1] + " dim 2 inv";
  } else if(distance_1 === 3 && distance_2 === 6) {
    return triad[2] + " dim 1 inv";
  } else {
    throw "Unknown notes distances for " + triad;
  }
};

module.exports = majorOrMinor;
