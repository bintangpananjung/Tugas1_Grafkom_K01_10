var vCount = 0;
var posTemp = [];
var savei = 0;
var cCount = 0;
var cposTemp = [];
var squareVBuffer = gl.createBuffer();
var squareCBuffer = gl.createBuffer();

const renderSquare = function (isSquare) {
  if (isSquare) {
    canvas.addEventListener("mousedown", squareListener);
  } else {
    canvas.removeEventListener("mousedown", squareListener);
  }
};
const renderAllSquares = function () {
  // console.log(Squares.Vertices);
  for (let i = 0; i < Squares.Vertices.length; i += 8) {
    gl.bindBuffer(gl.ARRAY_BUFFER, squareVBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(Squares.Vertices.slice(i, i + 8)),
      gl.STATIC_DRAW
    );
    var positionAttr = gl.getAttribLocation(program, "vertPosition");
    gl.vertexAttribPointer(
      positionAttr,
      2,
      gl.FLOAT,
      gl.FALSE,
      2 * Float32Array.BYTES_PER_ELEMENT,
      0
    );
    gl.enableVertexAttribArray(positionAttr);

    gl.bindBuffer(gl.ARRAY_BUFFER, squareCBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(Squares.Colors.slice(i, i + 8)),
      gl.STATIC_DRAW
    );
    const colorAttr = gl.getAttribLocation(program, "color");
    gl.vertexAttribPointer(colorAttr, 3, gl.FLOAT, gl.FALSE, 0, 0);
    gl.enableVertexAttribArray(colorAttr);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
  }
};

function squareListener(e) {
  var pos = getCursorPos(canvas, e);
  pos.x = pos.x * 2;
  pos.y = pos.y * -2;

  posTemp.push(pos);

  // Squares.push(pos.x / canvas.width - 1);
  // Squares.push(pos.y / canvas.height + 1);

  // Squares.push(pos.x);
  // Squares.push(pos.y);

  vCount += 1;

  if (vCount == 1) {
    Squares.Vertices.push(pos.x / canvas.width - 1);
    Squares.Vertices.push(pos.y / canvas.height + 1);
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
      var x4 = posTemp[0].x;
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

    Squares.Vertices.push(x2 / canvas.width - 1);
    Squares.Vertices.push(y2 / canvas.height + 1);
    Squares.Vertices.push(x3 / canvas.width - 1);
    Squares.Vertices.push(y3 / canvas.height + 1);
    Squares.Vertices.push(x4 / canvas.width - 1);
    Squares.Vertices.push(y4 / canvas.height + 1);
    Squares.Colors.push(...[baseColor]);
    Squares.Colors.push(...[baseColor]);
    posTemp = [];

    vCount = 0;
    // console.log(Squares);
    renderAll();
  }
}

//Change Shape Square

const renderChangeSquare = function (isSquare) {
  if (isSquare) {
    canvas.addEventListener("mousedown", changeSquare);
  } else {
    canvas.removeEventListener("mousedown", changeSquare);
  }
};

function changeSquare(e) {
  // var positionAttr = gl.getAttribLocation(program, "vertPosition");
  // gl.enableVertexAttribArray(positionAttr);

  // gl.vertexAttribPointer(
  //   positionAttr,
  //   2,
  //   gl.FLOAT,
  //   gl.FALSE,
  //   2 * Float32Array.BYTES_PER_ELEMENT,
  //   0
  // );
  var pos = getCursorPos(canvas, e);
  var pos1 = pos;

  pos.x = (pos.x * 2) / canvas.width - 1;
  pos.y = (pos.y * -2) / canvas.height + 1;

  cCount += 1;

  if (cCount == 1) {
    for (let i = 0; i < Squares.Vertices.length; i += 2) {
      // console.log(i);
      // console.log(pos.x);
      // console.log(Squares.Vertices[i]);
      // console.log(pos.y);
      // console.log(Squares.Vertices[i + 1]);
      var dist = Math.sqrt(
        Math.pow(pos.x - Squares.Vertices[i], 2) +
          Math.pow(pos.y - Squares.Vertices[i + 1], 2)
      );
      // console.log(dist);

      if (dist < 0.1) {
        savei = i;
        if (i % 8 == 0 || i % 8 == 2) {
          pos1.x = Squares.Vertices[i + 4];
          pos1.y = Squares.Vertices[i + 5];
        } else if (i % 8 == 4 || i % 8 == 6) {
          pos1.x = Squares.Vertices[i - 4];
          pos1.y = Squares.Vertices[i - 3];
        }
        cposTemp.push(pos1);
        // console.log("Masuk disini");
        break;
      }
    }
  } else if (cCount == 2) {
    cposTemp.push(pos);
    // console.log("Push sekali lagi");

    let cdeltaX = Math.abs(cposTemp[1].x - cposTemp[0].x);
    let cdeltaY = Math.abs(cposTemp[1].y - cposTemp[0].y);

    if (cdeltaX >= cdeltaY) {
      // console.log("ashiap1");
      var cdeltaS = cdeltaY;
    } else {
      // console.log("ashiap2");
      var cdeltaS = cdeltaX;
    }
    console.log(cdeltaS);

    if (cposTemp[1].x > cposTemp[0].x) {
      var cx1 = cposTemp[0].x;
      var cx2 = cposTemp[0].x + cdeltaS;
      var cx3 = cposTemp[0].x + cdeltaS;
      var cx4 = cposTemp[0].x;
    } else {
      var cx1 = cposTemp[0].x;
      var cx2 = cposTemp[0].x - cdeltaS;
      var cx3 = cposTemp[0].x - cdeltaS;
      var cx4 = cposTemp[0].x;
    }

    if (cposTemp[1].y > cposTemp[0].y) {
      var cy1 = cposTemp[0].y;
      var cy2 = cposTemp[0].y;
      var cy3 = cposTemp[0].y + cdeltaS;
      var cy4 = cposTemp[0].y + cdeltaS;
    } else {
      var cy1 = cposTemp[0].y;
      var cy2 = cposTemp[0].y;
      var cy3 = cposTemp[0].y - cdeltaS;
      var cy4 = cposTemp[0].y - cdeltaS;
    }
    // console.log(cy1 - cy3);
    // console.log(cx1 - cx2);
    // console.log(savei);

    if (savei % 8 == 0) {
      Squares.Vertices[savei] = cx3;
      Squares.Vertices[savei + 1] = cy3;
      Squares.Vertices[savei + 2] = cx4;
      Squares.Vertices[savei + 3] = cy4;
      Squares.Vertices[savei + 4] = cx1;
      Squares.Vertices[savei + 5] = cy1;
      Squares.Vertices[savei + 6] = cx2;
      Squares.Vertices[savei + 7] = cy2;
    } else if (savei % 8 == 2) {
      Squares.Vertices[savei] = cx3;
      Squares.Vertices[savei + 1] = cy3;
      Squares.Vertices[savei + 2] = cx4;
      Squares.Vertices[savei + 3] = cy4;
      Squares.Vertices[savei + 4] = cx1;
      Squares.Vertices[savei + 5] = cy1;
      Squares.Vertices[savei - 2] = cx2;
      Squares.Vertices[savei - 1] = cy2;
    } else if (savei % 8 == 4) {
      Squares.Vertices[savei] = cx3;
      Squares.Vertices[savei + 1] = cy3;
      Squares.Vertices[savei + 2] = cx4;
      Squares.Vertices[savei + 3] = cy4;
      Squares.Vertices[savei - 4] = cx1;
      Squares.Vertices[savei - 3] = cy1;
      Squares.Vertices[savei - 2] = cx2;
      Squares.Vertices[savei - 1] = cy2;
    } else if (savei % 8 == 6) {
      Squares.Vertices[savei] = cx3;
      Squares.Vertices[savei + 1] = cy3;
      Squares.Vertices[savei - 6] = cx4;
      Squares.Vertices[savei - 5] = cy4;
      Squares.Vertices[savei - 4] = cx1;
      Squares.Vertices[savei - 3] = cy1;
      Squares.Vertices[savei - 2] = cx2;
      Squares.Vertices[savei - 1] = cy2;
    }

    cposTemp = [];

    cCount = 0;
    // console.log(Squares);
    renderAll();
  }
}
