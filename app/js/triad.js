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
  triadHeader.innerHTML = majorOrMinor(notes.map(function(note) {
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
