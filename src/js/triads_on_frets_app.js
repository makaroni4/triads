import "../css/app.scss";
var showTriads = require('./show_triads');

(function() {
  var GUITAR_OPEN_STRING_NOTES = ["E", "B", "G", "D", "A", "E"];
  var NOTES_PROGRESSION = ["E", "F", ["F#", "Gb"], "G", ["G#", "Ab"], "A", ["A#", "Bb"], "B", "C", ["C#", "Db"], "D", ["D#", "Eb"]];
  var SCALE_NOTES = {
    "c-major": ["C", "D", "E", "F", "G", "A", "B"],
    "f-major": ["F", "G", "A", "Bb", "C", "D", "E"],
    "g-major": ["G", "A", "B", "C", "D", "E", "F#"],
    "d-major": ["D", "E", "F#", "G", "A", "B", "C#"],
    "a-major": ["A", "B", "C#", "D", "E", "F#", "G#"],
    "e-major": ["E", "F#", "G#", "A", "B", "C#", "D#"],
    "b-major": ["B", "C#", "D#", "E", "F#", "G#", "A#"]
  };
  var MAX_FRET = 14;
  var MAX_FRET_DISTANCE = 3;

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

  Object.keys(SCALE_NOTES).forEach(function(scale) {
    var opt = document.createElement("option");
    opt.value = scale;
    opt.innerHTML = scale;
    scaleSelect.append(opt);
  });

  var stringNotes = function(string, scale) {
    var openStringNote = GUITAR_OPEN_STRING_NOTES[string],
        nextNoteIndex = (NOTES_PROGRESSION.indexOf(openStringNote) + 1) % NOTES_PROGRESSION.length;

    return [openStringNote]
             .concat(NOTES_PROGRESSION.slice(nextNoteIndex))
             .concat(NOTES_PROGRESSION.slice(0, nextNoteIndex))
             .concat(NOTES_PROGRESSION.slice(nextNoteIndex));
  };

  var minFret = function(triad) {
    return Math.min.apply(null, triad.map(function(note) {
      return note.fret;
    }));
  };

  var generateTriadsForScale = function() {
    var scale = scaleSelect.options[scaleSelect.selectedIndex].value,
        lowString = parseInt(lowStringSelect.options[lowStringSelect.selectedIndex].value, 10);

    var notes = SCALE_NOTES[scale],
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

    var triadsOnFret = [];

    triads.forEach(function(triad, i) {
      var firstNote = triad[0],
          firstString = lowString,
          firstNoteFrets = stringNotes(firstString, scale).reduce(function(noteFrets, stringNote, fret) {
            if(stringNote.constructor === Array && stringNote.indexOf(firstNote) > -1 && fret < MAX_FRET) {
              noteFrets.push(fret);
            } else if (stringNote === firstNote && fret < MAX_FRET) {
              noteFrets.push(fret);
            }

            return noteFrets;
          }, []);

      firstNoteFrets.forEach(function(noteFret) {
        var triadNotes = [{
          fret: noteFret,
          string: firstString,
          note: firstNote
        }];

        var prevFret = noteFret;

        triad.slice(1).forEach(function(nextTriadNote, k) {
          var currentString = firstString + k + 1,
              fretIndex = stringNotes(currentString, scale).findIndex(function(stringNote, l) {
                if(stringNote.constructor === Array) {
                  return stringNote.indexOf(nextTriadNote) > -1 && Math.abs(l - prevFret) < MAX_FRET_DISTANCE && l >= 0;
                } else {
                  return stringNote === nextTriadNote && Math.abs(l - prevFret) < MAX_FRET_DISTANCE && l >= 0;
                }
              });

          if(fretIndex > -1) {
            triadNotes.push({
              fret: fretIndex,
              string: currentString,
              note: nextTriadNote
            });

            prevFret = fretIndex;
          }
        });

        if(triadNotes.length === 3) {
          triadsOnFret.push(triadNotes);
        }
      });
    });

    triadsContainer.innerHTML = "";

    triadsOnFret.sort(function(a, b) {
      return minFret(a) > minFret(b);
    });

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
