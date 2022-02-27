var vCount = 0;
var posTemp = [];
var savei = 0;
var cCount = 0;
var cposTemp = [];

const renderSquare = function (isSquare) {
  if (isSquare) {
    canvas.addEventListener("mousedown", squareListener);
  } else {
    canvas.removeEventListener("mousedown", squareListener);
  }
};

function squareListener(e) {
  // getNoPaddingNoBorderCanvasRelativeMousePosition(e, canvas);
  var positionAttr = gl.getAttribLocation(program, "vertPosition");
  gl.enableVertexAttribArray(positionAttr);

  gl.vertexAttribPointer(
    positionAttr,
    2,
    gl.FLOAT,
    gl.FALSE,
    2 * Float32Array.BYTES_PER_ELEMENT,
    0
  );
  gl.useProgram(program);

  var pos = getCursorPos(canvas, e);
  // console.log(pos)

  // pos.x = (pos.x / canvas.width) * 2 - 1;
  // pos.y = (pos.y / canvas.height) * -2 + 1;

  pos.x = pos.x * 2;
  pos.y = pos.y * -2;

  posTemp.push(pos);

  // Squares.push(pos.x / canvas.width - 1);
  // Squares.push(pos.y / canvas.height + 1);

  // Squares.push(pos.x);
  // Squares.push(pos.y);

  vCount += 1;

  if (vCount == 1){
    Squares.push(pos.x / canvas.width - 1);
    Squares.push(pos.y / canvas.height + 1);
  } else if (vCount == 2) {
    let deltaX = Math.abs(posTemp[1].x - posTemp[0].x);
    let deltaY = Math.abs(posTemp[1].y - posTemp[0].y);

    if (deltaX >= deltaY) {
      var deltaS = deltaY;
    } else {
      var deltaS = deltaX;
    }

    if (posTemp[1].x > posTemp[0].x) {
      var x2 = posTemp[0].x + deltaS;
      var x3 = posTemp[0].x + deltaS;
      var x4 = posTemp[0].x;
    } else {
      var x2 = posTemp[0].x - deltaS;
      var x3 = posTemp[0].x - deltaS;
      var x4 = posTemp[0].x
    }

    if (posTemp[1].y > posTemp[0].y) {
      var y2 = posTemp[0].y;
      var y3 = posTemp[0].y + deltaS;
      var y4 = posTemp[0].y + deltaS;
    } else {
      var y2 = posTemp[0].y;
      var y3 = posTemp[0].y - deltaS;
      var y4 = posTemp[0].y - deltaS;
    }

    Squares.push(x2 / canvas.width - 1);
    Squares.push(y2 / canvas.height + 1);
    Squares.push(x3 / canvas.width - 1);
    Squares.push(y3 / canvas.height + 1);
    Squares.push(x4 / canvas.width - 1);
    Squares.push(y4 / canvas.height + 1);

    posTemp = [];

    vCount = 0;
    // console.log(Squares);
    renderAll();
  }
}

const renderSquare = function (isSquare) {
  if (isSquare) {
    canvas.addEventListener("mousedown", changeSquare);
  } else {
    canvas.removeEventListener("mousedown", changeSquare);
  }
};

function changeSquare(e) {
  var positionAttr = gl.getAttribLocation(program, "vertPosition");
  gl.enableVertexAttribArray(positionAttr);

  gl.vertexAttribPointer(
    positionAttr,
    2,
    gl.FLOAT,
    gl.FALSE,
    2 * Float32Array.BYTES_PER_ELEMENT,
    0
  );
  gl.useProgram(program);

  var pos = getCursorPos(canvas, e);
  var pos1 = pos

  pos.x = pos.x * 2;
  pos.y = pos.y * -2;

  cCount += 1;

  if (cCount == 1){
    for (let i = 0; i < Squares.length; i += 2) {
      var dist = Math.sqrt(Math.pow((pos.x-Squares[i]), 2) + Math.pow((pos.y-Squares[i+1]), 2));

      if (dist < 5) {
        savei = i;
        if (i % 8 == 0 || i % 8 == 2){
          pos1.x = Squares[i+4];
          pos1.y = Squares[i+5];
        } else if (i % 8 == 4 || i % 8 == 6) {
          pos1.x = Squares[i-4];
          pos1.y = Squares[i-3];
        }
        cposTemp.push(pos1);
        break;
      }
    }
  } else if (cCount == 2){
    cposTemp.push(pos);

    let cdeltaX = Math.abs(cposTemp[1].x - cposTemp[0].x);
    let cdeltaY = Math.abs(cposTemp[1].y - cposTemp[0].y);

    if (cdeltaX >= cdeltaY) {
      var cdeltaS = cdeltaY;
    } else {
      var cdeltaS = cdeltaX;
    }

    if (cposTemp[1].x > cposTemp[0].x) {
      var cx2 = cposTemp[0].x + cdeltaS;
      var cx3 = cposTemp[0].x + cdeltaS;
      var cx4 = cposTemp[0].x;
    } else {
      var cx2 = cposTemp[0].x - cdeltaS;
      var cx3 = cposTemp[0].x - cdeltaS;
      var cx4 = cposTemp[0].x
    }

    if (cposTemp[1].y > cposTemp[0].y) {
      var cy2 = cposTemp[0].y;
      var cy3 = cposTemp[0].y + cdeltaS;
      var cy4 = cposTemp[0].y + cdeltaS;
    } else {
      var cy2 = cposTemp[0].y;
      var cy3 = cposTemp[0].y - cdeltaS;
      var cy4 = cposTemp[0].y - cdeltaS;
    }

    if (savei % 8 == 0){
      Squares[savei] = pos1.x
      Squares[savei+1] = pos1.y
      Squares[savei+2] = cx2
      Squares[savei+3] = cy2
      Squares[savei+4] = cx3
      Squares[savei+5] = cy3
      Squares[savei+6] = cx4
      Squares[savei+7] = cy4
    } else if (savei % 8 == 2) {
      Squares[savei] = pos1.x
      Squares[savei+1] = pos1.y
      Squares[savei+2] = cx2
      Squares[savei+3] = cy2
      Squares[savei+4] = cx3
      Squares[savei+5] = cy3
      Squares[savei-2] = cx4
      Squares[savei-1] = cy4
    } else if (savei % 8 == 4) {
      Squares[savei] = pos1.x
      Squares[savei+1] = pos1.y
      Squares[savei+2] = cx2
      Squares[savei+3] = cy2
      Squares[savei-4] = cx3
      Squares[savei-3] = cy3
      Squares[savei-2] = cx4
      Squares[savei-1] = cy4
    } else if (savei % 8 == 6) {
      Squares[savei] = pos1.x
      Squares[savei+1] = pos1.y
      Squares[savei-6] = cx2
      Squares[savei-5] = cy2
      Squares[savei-4] = cx3
      Squares[savei-3] = cy3
      Squares[savei-2] = cx4
      Squares[savei-1] = cy4
    }

    cposTemp = [];

    cCount = 0;
    // console.log(Squares);
    renderAll();
  }
}