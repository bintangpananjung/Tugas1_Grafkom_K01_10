var vCount = 0;
var posTemp = [];

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

  Squares.push(pos.x / canvas.width - 1);
  Squares.push(pos.y / canvas.height + 1);

  vCount += 1;

  if (vCount == 2) {
    let deltaX = posTemp[1].x - posTemp[0].x;
    let deltaY = posTemp[1].y - posTemp[0].y;
    Squares.push((posTemp[0].x - deltaY) / canvas.width - 1);
    Squares.push((posTemp[0].y + deltaX) / canvas.height + 1);
    Squares.push((posTemp[1].x - deltaY) / canvas.width - 1);
    Squares.push((posTemp[1].y + deltaX) / canvas.height + 1);

    posTemp = [];

    vCount = 0;
    // console.log(Squares);
    renderAll();
    // for (let i = 0; i < Vertices.length; i += 8) {
    //   gl.bufferData(
    //     gl.ARRAY_BUFFER,
    //     new Float32Array(Vertices.slice(i, i + 8)),
    //     gl.STATIC_DRAW
    //   );
    //   gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    // }
  }
}
