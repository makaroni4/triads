import { showTriads } from './show_triads';

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
      lowStringSelect = document.getElementsByClassName("low-string-select")[0],
      triadTypeSelect = document.getElementsByClassName("triad-type-select")[0];

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
        lowString = parseInt(lowStringSelect.options[lowStringSelect.selectedIndex].value, 10),
        triadType = triadTypeSelect.options[triadTypeSelect.selectedIndex].value;

    var notes = SCALE_NOTES[scale];
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

    var triadsOnFret = []

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
