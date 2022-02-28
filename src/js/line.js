var lineVBuffer = gl.createBuffer();
var lineCBuffer = gl.createBuffer();

function lineListener(e) {
  var pos = getCursorPos(canvas, e);
  const x = (pos.x / canvas.width) * 2 - 1;
  const y = (pos.y / canvas.height) * -2 + 1;
  Lines.Vertices.push(x);
  Lines.Vertices.push(y);
  Lines.Colors.push(...baseColor);
  renderAll();
  // renderAllLines();
}
const renderAllLines = function () {
  var mode = [gl.POINTS, gl.LINES];

  mode.forEach(element => {
    gl.bindBuffer(gl.ARRAY_BUFFER, lineVBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(Lines.Vertices),
      gl.STATIC_DRAW
    );
    const positionAttr = gl.getAttribLocation(program, "vertPosition");
    gl.vertexAttribPointer(
      positionAttr,
      2,
      gl.FLOAT,
      false,
      0,
      // 2 * Float32Array.BYTES_PER_ELEMENT,
      0
    );
    gl.enableVertexAttribArray(positionAttr);
    gl.bindBuffer(gl.ARRAY_BUFFER, lineCBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(Lines.Colors),
      gl.STATIC_DRAW
    );
    const colorAttr = gl.getAttribLocation(program, "color");
    gl.vertexAttribPointer(colorAttr, 3, gl.FLOAT, gl.FALSE, 0, 0);
    gl.enableVertexAttribArray(colorAttr);
    gl.drawArrays(element, 0, Lines.Vertices.length / 2);
  });
};
const renderLine = function (isLine) {
  if (isLine) {
    canvas.addEventListener("mousedown", lineListener);
  } else {
    canvas.removeEventListener("mousedown", lineListener);
  }
};
