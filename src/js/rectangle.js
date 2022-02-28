var rectangleVBuffer = gl.createBuffer();
var rectangleCBuffer = gl.createBuffer();
var vCount = 0;
var posTemp = [];

const renderRectangle = function (isRectangle) {
  if (isRectangle) {
    canvas.addEventListener("mousedown", rectangleListener);
  } else {
    canvas.removeEventListener("mousedown", rectangleListener);
  }
};
// canvas.addEventListener("mousedown", function (e) {
// getNoPaddingNoBorderCanvasRelativeMousePosition(e, canvas);

function rectangleListener(e) {
  var pos = getCursorPos(canvas, e);
  // console.log(pos)

  // pos.x = (pos.x / canvas.width) * 2 - 1;
  // pos.y = (pos.y / canvas.height) * -2 + 1;

  pos.x = pos.x * 2;
  pos.y = pos.y * -2;

  posTemp.push(pos);

  vCount += 1;
  Rectangles.Colors.push(...[baseColor]);
  Rectangles.Colors.push(...[baseColor]);
  if (vCount == 1) {
    Rectangles.Vertices.push(pos.x / canvas.width - 1);
    Rectangles.Vertices.push(pos.y / canvas.height + 1);
  } else if (vCount == 2) {
    let deltaX = posTemp[1].x - posTemp[0].x;
    let deltaY = posTemp[1].y - posTemp[0].y;
    Rectangles.Vertices.push((posTemp[0].x + deltaX) / canvas.width - 1);
    Rectangles.Vertices.push(posTemp[0].y / canvas.height + 1);
    Rectangles.Vertices.push(pos.x / canvas.width - 1);
    Rectangles.Vertices.push(pos.y / canvas.height + 1);
    Rectangles.Vertices.push(posTemp[0].x / canvas.width - 1);
    Rectangles.Vertices.push((posTemp[0].y + deltaY) / canvas.height + 1);

    posTemp = [];

    vCount = 0;
    renderAll();
  }
}
function renderAllRectangles() {
  // gl.useProgram(program);

  for (let i = 0; i < Rectangles.Vertices.length; i += 8) {
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleVBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(Rectangles.Vertices.slice(i, i + 8)),
      gl.STATIC_DRAW
    );
    const positionAttr = gl.getAttribLocation(program, "vertPosition");

    gl.vertexAttribPointer(
      positionAttr,
      2,
      gl.FLOAT,
      gl.FALSE,
      0,
      // 2 * Float32Array.BYTES_PER_ELEMENT,
      0
    );
    gl.enableVertexAttribArray(positionAttr);
    gl.bindBuffer(gl.ARRAY_BUFFER, rectangleCBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(Rectangles.Colors.slice(i, i + 8)),
      gl.STATIC_DRAW
    );
    const colorAttr = gl.getAttribLocation(program, "color");
    gl.vertexAttribPointer(colorAttr, 3, gl.FLOAT, gl.FALSE, 0, 0);
    gl.enableVertexAttribArray(colorAttr);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
  }
}
// const renderRectangle = function () {
//   const Rectangles.Vertices = [];

//   canvas.addEventListener("mousedown", function (e) {
//     // getNoPaddingNoBorderCanvasRelativeMousePosition(e, canvas);
//   });
// };
