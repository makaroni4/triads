import "../css/app.scss";
const showTriads = require('./show_triads');
const CONFIG = require('./config');
const generateFretPositions = require('./generate_fret_positions');

(function() {
  var triadsContainer = document.getElementsByClassName("triads")[0],
      scaleSelect = document.getElementsByClassName("scale-select")[0],
      lowStringSelect = document.getElementsByClassName("low-string-select")[0];

  var firstFretSelect = document.getElementsByClassName("first-fret-select")[0],
      lastFretSelect = document.getElementsByClassName("last-fret-select")[0];

  for(var i = 0; i < 12; i ++) {
    var opt = document.createElement("option");
    opt.value = i + 1;
    opt.innerHTML = i + 1;
    firstFretSelect.append(opt);

    if(i === 4) {
      opt.selected = true;
    }

    opt = document.createElement("option");
    opt.value = i + 1;
    opt.innerHTML = i + 1;

    if(i === 8) {
      opt.selected = true;
    }

    lastFretSelect.append(opt);
  }

  Object.keys(CONFIG.scale_notes).forEach(function(scale) {
    var opt = document.createElement("option");
    opt.value = scale;
    opt.innerHTML = scale;
    scaleSelect.append(opt);
  });

  var generateTriadsForScale = function() {
    var scale = scaleSelect.options[scaleSelect.selectedIndex].value,
        lowString = parseInt(lowStringSelect.options[lowStringSelect.selectedIndex].value, 10);

    var notes = CONFIG.scale_notes[scale],
        triads = [];

    notes.forEach(function(note, i) {
      var secondIndex = (i + 2) % 7,
          thirdIndex = (i + 4) % 7,
          triad = [note, notes[secondIndex], notes[thirdIndex]].reverse();

      triads.push(triad.slice(0));

      // 1st-inversion
      triad.unshift(triad.pop());
      triads.push(triad.slice(0));

      //2nd-inversion
      triad.unshift(triad.pop());
      triads.push(triad.slice(0));
    });

    triads = Array.from(new Set(triads));

    var triadsOnFret = generateFretPositions(triads, lowString, scale);

    triadsContainer.innerHTML = "";

    // filter for selected frets
    var firstFret = firstFretSelect.options[firstFretSelect.selectedIndex].value,
        lastFret = lastFretSelect.options[lastFretSelect.selectedIndex].value;

    triadsOnFret = triadsOnFret.filter(function(triad) {
      var displayTriad = false;
      triad.forEach(function(note) {
        if(note.fret >= firstFret && note.fret <= lastFret) {
          displayTriad = true;
        }
      });

      return displayTriad;
    });

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

  firstFretSelect.onchange = function() {
    generateTriadsForScale();
  };

  lastFretSelect.onchange = function() {
    generateTriadsForScale();
  };

  generateTriadsForScale();
})();
