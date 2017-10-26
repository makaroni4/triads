const scaleStringNotes = require('./scale_string_notes');

var generateFretPositions = function(triadsNotes, lowString, scale) {
  const MAX_FRET = 14;
  const MAX_FRET_DISTANCE = 3;

  var traidsFretPositions = [];

  var minFret = function(triad) {
    return Math.min.apply(null, triad.map(function(note) {
      return note.fret;
    }));
  };

  triadsNotes.forEach(function(triad, i) {
    var firstNote = triad[0],
        firstString = lowString,
        firstNoteFrets = scaleStringNotes(firstString, scale).reduce(function(noteFrets, stringNote, fret) {
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
            fretIndex = scaleStringNotes(currentString, scale).findIndex(function(stringNote, l) {
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
        traidsFretPositions.push(triadNotes);
      }
    });
  });

  traidsFretPositions.sort(function(a, b) {
    return minFret(a) > minFret(b);
  });

  return traidsFretPositions;
}

module.exports = generateFretPositions;
