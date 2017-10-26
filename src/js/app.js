import "../css/app.scss";
const showTriads = require('./show_triads');
const CONFIG = require('./config');
const generateFretPositions = require('./generate_fret_positions');

(function() {
  const MAX_FRET = 14;
  const MAX_FRET_DISTANCE = 3;

  var triadsContainer = document.getElementsByClassName("triads")[0],
      scaleSelect = document.getElementsByClassName("scale-select")[0],
      lowStringSelect = document.getElementsByClassName("low-string-select")[0],
      triadTypeSelect = document.getElementsByClassName("triad-type-select")[0];

  Object.keys(CONFIG.scale_notes).forEach(function(scale) {
    var opt = document.createElement("option");
    opt.value = scale;
    opt.innerHTML = scale;
    scaleSelect.append(opt);
  });

  var generateTriadsForScale = function() {
    var scale = scaleSelect.options[scaleSelect.selectedIndex].value,
        lowString = parseInt(lowStringSelect.options[lowStringSelect.selectedIndex].value, 10),
        triadType = triadTypeSelect.options[triadTypeSelect.selectedIndex].value;

    var notes = CONFIG.scale_notes[scale];
    var triads = notes.map(function(note, i) {
      var secondIndex = (i + 2) % 7,
          thirdIndex = (i + 4) % 7,
          triad = [note, notes[secondIndex], notes[thirdIndex]].reverse();

      switch(triadType) {
        case "1st-inversion":
          triad.unshift(triad.pop());
          break;
        case "2nd-inversion":
          triad.unshift(triad.pop());
          triad.unshift(triad.pop());
          break;
      };

      return triad;
    });

    var triadsOnFret = generateFretPositions(triads, lowString, scale);

    triadsContainer.innerHTML = "";

    triadsOnFret.forEach(function(triad, i) {
      showTriads(triadsContainer, triad);
    });
  }

  scaleSelect.onchange = function() {
    generateTriadsForScale();
  };

  lowStringSelect.onchange = function() {
    generateTriadsForScale();
  };

  triadTypeSelect.onchange = function() {
    generateTriadsForScale();
  };

  generateTriadsForScale();
})();
