/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return showTriads; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__major_or_minor__ = __webpack_require__(1);


var showTriads = function(container, notes) {
  function drawCircle(x, y, radius, color) {
    x = Math.round(x);
    y = Math.round(y);
    radius = Math.round(radius);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  function drawLine(x, y, x1, y1) {
    x = Math.round(x);
    y = Math.round(y);
    x1 = Math.round(x1);
    y1 = Math.round(y1);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  }

  var NUMBER_OF_FRETS = 4,
      NUMBER_OF_STRINGS = 6,
      VERTICAL_BORDER_WIDTH = 1,
      HORIZONTAL_BORDER_HEIGHT = 1;

  var triadHeader = document.createElement("div")
  triadHeader.className = "triad-header";
  triadHeader.innerHTML = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__major_or_minor__["a" /* majorOrMinor */])(notes.map(function(note) {
    return note.note;
  }).reverse());

  var canvas = document.createElement("canvas");
  canvas.className = "triad-canvas";

  container.appendChild(triadHeader);
  container.appendChild(canvas);

  var canvasStyle = window.getComputedStyle(canvas, null);

  canvas.width = parseInt(canvasStyle.getPropertyValue("width"));
  canvas.height = parseInt(canvasStyle.getPropertyValue("height"));

  var ctx = canvas.getContext("2d");

  ctx.translate(0.5, 0.5);

  ctx.strokeStyle = "#red";
  ctx.lineWidth = 1;

  var fretWidth = (canvas.width - VERTICAL_BORDER_WIDTH * (NUMBER_OF_FRETS + 1)) / NUMBER_OF_FRETS,
      stringDistance = (canvas.height - HORIZONTAL_BORDER_HEIGHT * NUMBER_OF_STRINGS) / (NUMBER_OF_STRINGS - 1),
      fretBoardWidth = fretWidth * NUMBER_OF_FRETS + VERTICAL_BORDER_WIDTH * (NUMBER_OF_FRETS + 1),
      fretBoardHeight = stringDistance * (NUMBER_OF_STRINGS - 1) + HORIZONTAL_BORDER_HEIGHT * NUMBER_OF_STRINGS,
      fretCircleRadius = stringDistance * 0.32,
      triadCircleRadius = stringDistance * 0.45;

  // draw neck
  drawLine(0, fretBoardHeight, fretBoardWidth, fretBoardHeight);
  drawLine(0, 0, fretBoardWidth, 0);

  // draw vertical lines
  for(var i = 0; i <= NUMBER_OF_FRETS; i++) {
    var x = i * fretWidth + i * VERTICAL_BORDER_WIDTH;

    drawLine(x, 0, x, fretBoardHeight);
  }

  // draw single circles
  var CIRCLE_FRETS = [2, 4, 6, 8];
  var cirlceColor = "#f9f9f9";

  var minFret = Math.min.apply(null, notes.map(function(note) {
    return note.fret;
  })) || 1;

  for(var i = minFret; i <= minFret + NUMBER_OF_FRETS; i++) {
    if(CIRCLE_FRETS.indexOf(i) > -1) {
      var x = (i - minFret) * fretWidth + fretWidth / 2;

      drawCircle(x, fretBoardHeight / 2, fretCircleRadius, "#eee");
    }
  }

  // draw strings
  for(var i = 0; i <= NUMBER_OF_STRINGS; i++) {
    var y = i * stringDistance + i * HORIZONTAL_BORDER_HEIGHT;

    drawLine(0, y, fretBoardWidth, y);
  }

  // show number of min fret
  if(minFret > 0) {
    ctx.fillStyle = "#CCC";
    ctx.font = "16px Georgia";
    ctx.fillText(Math.abs(minFret), 5, canvas.height - 8);
  }

  // show notes
  notes.forEach(function(note, i) {
    if(note.fret === 0) {
      return
    }

    var x = (note.fret - minFret + 0.5) * fretWidth,
        y = fretBoardHeight - note.string * stringDistance - HORIZONTAL_BORDER_HEIGHT * (note.string + 1);

    drawCircle(
      x,
      y,
      triadCircleRadius,
      "#70C1B3"
    );

    // draw note name
    ctx.fillStyle = "#FFF";
    ctx.font = "16px Helvetica";
    ctx.fillText(note.note, x - triadCircleRadius / 2, y + 4);
  });

  canvas.classList.add("triad-canvas--active");
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return majorOrMinor; });
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
    return triad[1] + " minor 1 inv";
  } else if(distance_1 === 4 && distance_2 === 5) {
    return triad[2] + " minor 2 inv";
  } else if(distance_1 === 5 && distance_2 === 4) {
    return triad[1] + " major 1 inv";
  } else if(distance_1 === 3 && distance_2 === 5) {
    return triad[2] + " major 2 inv";
  } else if(distance_1 === 6 && distance_2 === 3) {
    return triad[1] + " dim 1 inv";
  } else if(distance_1 === 3 && distance_2 === 6) {
    return triad[1] + " dim 2 inv";
  } else {
    throw "Unknown notes distances for " + triad;
  }
};


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__show_triads__ = __webpack_require__(0);


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
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__show_triads__["a" /* showTriads */])(triadsContainer, triad);
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


/***/ })
/******/ ]);