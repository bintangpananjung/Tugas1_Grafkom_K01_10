canvas.addEventListener("mousedown", function (e) {
  const Vertices = [];
  console.log(Vertices.length / 2);
  // getNoPaddingNoBorderCanvasRelativeMousePosition(e, canvas);
  var pos = getCursorPos(canvas, e);
  const x = (pos.x / canvas.width) * 2 - 1;
  const y = (pos.y / canvas.height) * -2 + 1;
  Vertices.push(x);
  Vertices.push(y);
  console.log("x: " + x + " y: " + y);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Vertices), gl.STATIC_DRAW);

  const positionAttr = gl.getAttribLocation(program, "vertPosition");
  gl.vertexAttribPointer(
    positionAttr,
    2,
    gl.FLOAT,
    gl.FALSE,
    2 * Float32Array.BYTES_PER_ELEMENT,
    0
  );
  gl.enableVertexAttribArray(positionAttr);

  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, Vertices.length / 2);
});

