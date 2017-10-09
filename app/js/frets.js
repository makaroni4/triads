var showTriad = function(container, notes) {
  function drawCircle(x, y, radius, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  function drawLine(x, y, x1, y1) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  }

  var NUMBER_OF_FRETS = 4,
      NUMBER_OF_STRINGS = 6;

  var canvas = document.createElement("canvas");
  canvas.className = "triad-canvas";

  container.appendChild(canvas);

  var canvasStyle = window.getComputedStyle(canvas, null);

  canvas.width = parseInt(canvasStyle.getPropertyValue("width"));
  canvas.height = parseInt(canvasStyle.getPropertyValue("height"));

  var ctx = canvas.getContext("2d");

  ctx.strokeStyle = "#red";
  ctx.lineWidth = 1;

  var fretBoardWidth = canvas.width,
      fretBoardHeight = canvas.height,
      fretWidth = fretBoardWidth / NUMBER_OF_FRETS,
      stringDistance = fretBoardHeight / NUMBER_OF_STRINGS,
      fretCircleRadius = stringDistance * 0.4,
      triadCircleRadius = stringDistance * 0.5;

  // draw neck
  drawLine(0, fretBoardHeight, fretBoardWidth, fretBoardHeight);
  drawLine(0, 0, fretBoardWidth, 0);

  // draw vertical lines
  for(var i = 0; i <= NUMBER_OF_FRETS; i++) {
    var x = i * (fretBoardWidth - NUMBER_OF_FRETS + 1) / NUMBER_OF_FRETS;

    drawLine(x, 0, x, fretBoardHeight);
  }

  // draw single circles
  var CIRCLE_FRETS = [2, 4, 6, 8];
  var cirlceColor = "#f9f9f9";

  var minFret = Math.min.apply(null, notes.map(function(note) {
    return note.fret
  }));

  for(var i = minFret; i <= minFret + NUMBER_OF_FRETS; i++) {
    if(CIRCLE_FRETS.indexOf(i) > -1) {
      var x = (i - minFret) * fretWidth + fretWidth / 2;

      drawCircle(x, fretBoardHeight / 2, fretCircleRadius, "#eee");
    }
  }

  // draw strings
  for(var i = 0; i <= NUMBER_OF_STRINGS; i++) {
    var y = i * (fretBoardHeight - NUMBER_OF_STRINGS + 1) / NUMBER_OF_STRINGS;

    drawLine(0, y, fretBoardWidth, y);
  }

  // show number of min fret
  ctx.font = "30px Arial";
  ctx.fillStyle = "blue";
  ctx.fillText(minFret + 1, 15, canvas.height - 20);

  // show notes
  notes.forEach(function(note, i) {
    drawCircle((note.fret - minFret + 0.5) * fretWidth, canvas.height - note.string * stringDistance, triadCircleRadius, "red");
  });

  canvas.classList.add("triad-canvas--active");
};
