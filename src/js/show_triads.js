const majorOrMinor = require('./major_or_minor');

var showTriads = function(container, notes) {
  function drawCircle(x, y, radius, color, padding) {
    x = Math.round(x + padding);
    y = Math.round(y + padding);
    radius = Math.round(radius);

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  function drawLine(x, y, x1, y1, padding) {
    x = Math.round(x + padding);
    y = Math.round(y + padding);
    x1 = Math.round(x1 + padding);
    y1 = Math.round(y1 + padding);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  }

  function backingScale(context) {
    if ('devicePixelRatio' in window) {
      if (window.devicePixelRatio > 1) {
        return window.devicePixelRatio;
      }
    }

    return 1;
  }

  var NUMBER_OF_FRETS = 4,
      NUMBER_OF_STRINGS = 6,
      VERTICAL_BORDER_WIDTH = 1,
      HORIZONTAL_BORDER_HEIGHT = 1;

  var triadHeader = document.createElement("div")
  triadHeader.className = "triad__header";
  triadHeader.innerHTML = majorOrMinor(notes.map(function(note) {
    return note.note;
  }).reverse());

  var triadBlock = document.createElement("div");
  triadBlock.className = "triads__triad triad";

  var canvas = document.createElement("canvas");
  canvas.className = "triad__canvas";

  triadBlock.appendChild(triadHeader);
  triadBlock.appendChild(canvas);

  container.appendChild(triadBlock);

  var canvasStyle = window.getComputedStyle(canvas, null),
      ctx = canvas.getContext("2d"),
      scaleFactor = backingScale(ctx);

  canvas.width = parseInt(canvasStyle.getPropertyValue("width")) * scaleFactor;
  canvas.height = parseInt(canvasStyle.getPropertyValue("height")) * scaleFactor;

  ctx.translate(0.5, 0.5);

  ctx.strokeStyle = "#red";
  ctx.lineWidth = 1;

  var canvasPadding = 14 * scaleFactor,
      fretCircleRadius = 9 * scaleFactor,
      triadCircleRadius = 13 * scaleFactor,
      fretWidth = (canvas.width - VERTICAL_BORDER_WIDTH * (NUMBER_OF_FRETS + 1) - canvasPadding * 2) / NUMBER_OF_FRETS,
      stringDistance = (canvas.height - HORIZONTAL_BORDER_HEIGHT * NUMBER_OF_STRINGS - canvasPadding * 2) / (NUMBER_OF_STRINGS - 1),
      fretBoardWidth = fretWidth * NUMBER_OF_FRETS + VERTICAL_BORDER_WIDTH * (NUMBER_OF_FRETS + 1) - 1,
      fretBoardHeight = stringDistance * (NUMBER_OF_STRINGS - 1) + HORIZONTAL_BORDER_HEIGHT * NUMBER_OF_STRINGS;

  // draw neck
  drawLine(0, fretBoardHeight, fretBoardWidth, fretBoardHeight, canvasPadding);
  drawLine(0, 0, fretBoardWidth, 0, canvasPadding);

  // draw vertical lines
  for(var i = 0; i <= NUMBER_OF_FRETS; i++) {
    var x = i * fretWidth + i * VERTICAL_BORDER_WIDTH;

    drawLine(x, 0, x, fretBoardHeight, canvasPadding);
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

      drawCircle(x, fretBoardHeight / 2, fretCircleRadius, "#eee", canvasPadding);
    }
  }

  // draw strings
  for(var i = 0; i < NUMBER_OF_STRINGS - 1; i++) {
    var y = i * stringDistance + i * HORIZONTAL_BORDER_HEIGHT;

    drawLine(0, y, fretBoardWidth, y, canvasPadding, canvasPadding);
  }

  // show number of min fret
  if(minFret > 0) {
    ctx.fillStyle = "#CCC";
    var fretFontSize = 16 * scaleFactor;
    ctx.font = fretFontSize + "px Georgia";
    ctx.fillText(Math.abs(minFret), 5 + canvasPadding, canvas.height - canvasPadding - 10);
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
      "#70C1B3",
      canvasPadding
    );

    // draw note name
    ctx.fillStyle = "#FFF";
    var noteFontSize = 16 * scaleFactor;
    ctx.font = noteFontSize + "px Helvetica";
    ctx.textAlign="center";
    ctx.textBaseline = "middle";
    ctx.fillText(note.note, x + canvasPadding, y + canvasPadding);
  });

  canvas.classList.add("triad__canvas--active");
};

module.exports = showTriads;
