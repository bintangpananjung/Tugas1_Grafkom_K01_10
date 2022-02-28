var polygonVerticesBuffer = gl.createBuffer();
var polygonColorBuffer = gl.createBuffer();
var n_vertex = 0;

const hexToRgb = hex =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => "#" + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map(x => parseInt(x, 16) / 255);
const renderPrevPolygon = function () {
  let offset = Polygons.offset[0];
  if (Polygons.offset.length > 1) {
    for (let i = 1; i < Polygons.offset.length; i++) {
      gl.bindBuffer(gl.ARRAY_BUFFER, polygonVerticesBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(
          Polygons.Vertices.slice(offset * 2, Polygons.offset[i] * 2)
        ),
        gl.STATIC_DRAW
      );
      const positionAttr = gl.getAttribLocation(program, "vertPosition");
      gl.vertexAttribPointer(positionAttr, 2, gl.FLOAT, gl.FALSE, 0, 0);
      gl.enableVertexAttribArray(positionAttr);
      gl.bindBuffer(gl.ARRAY_BUFFER, polygonColorBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(
          Polygons.Colors.slice(offset * 3, Polygons.offset[i] * 3)
        ),
        gl.STATIC_DRAW
      );
      const colorAttr = gl.getAttribLocation(program, "color");
      gl.vertexAttribPointer(colorAttr, 3, gl.FLOAT, gl.FALSE, 0, 0);
      gl.enableVertexAttribArray(colorAttr);

      gl.drawArrays(gl.TRIANGLE_FAN, 0, Polygons.offset[i] - offset);
      offset = Polygons.offset[i];
    }
  }
};
const renderCurrPolygon = function () {
  gl.bindBuffer(gl.ARRAY_BUFFER, polygonVerticesBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(
      Polygons.Vertices.slice(
        Polygons.offset[Polygons.offset.length - 1] * 2,
        Polygons.Vertices.length
      )
    ),
    gl.STATIC_DRAW
  );
  const positionAttr = gl.getAttribLocation(program, "vertPosition");
  gl.vertexAttribPointer(positionAttr, 2, gl.FLOAT, gl.FALSE, 0, 0);
  gl.enableVertexAttribArray(positionAttr);
  gl.bindBuffer(gl.ARRAY_BUFFER, polygonColorBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(
      Polygons.Colors.slice(
        Polygons.offset[Polygons.offset.length - 1] * 3,
        Polygons.Colors.length
      )
    ),
    gl.STATIC_DRAW
  );
  const colorAttr = gl.getAttribLocation(program, "color");
  gl.vertexAttribPointer(colorAttr, 3, gl.FLOAT, gl.FALSE, 0, 0);
  gl.enableVertexAttribArray(colorAttr);
  n_vertex =
    Polygons.Vertices.length / 2 - Polygons.offset[Polygons.offset.length - 1];
  gl.drawArrays(gl.TRIANGLE_FAN, 0, n_vertex);
};
const renderPolygon = function (isPolygon) {
  // console.log(polygon);
  if (isPolygon) {
    canvas.addEventListener("mousedown", polygonListener);
  } else {
    canvas.removeEventListener("mousedown", polygonListener);
  }
};
function polygonListener(e) {
  var pos = getCursorPos(canvas, e);
  const x = (pos.x / canvas.width) * 2 - 1;
  const y = (pos.y / canvas.height) * -2 + 1;
  Polygons.Vertices.push(x);
  Polygons.Vertices.push(y);
  Polygons.Colors.push(...baseColor);

  //draw previous polygon
  renderAll();
}
const changePolygonColor = function (color) {
  baseColor = hexToRgb(color);
  // console.log(polygon.Colors);
  Polygons.Colors = Polygons.Colors.slice(
    0,
    Polygons.offset[Polygons.offset.length - 1] * 3
  );
  for (let index = 0; index < n_vertex; index++) {
    Polygons.Colors.push(...baseColor);
  }
  renderAll();
};

document.getElementById("polygon-color").addEventListener("change", e => {
  changePolygonColor(e.target.value);
});
document.getElementById("init-polygon").addEventListener("click", e => {
  if (n_vertex > 2) {
    Polygons.offset.push(
      n_vertex + Polygons.offset[Polygons.offset.length - 1]
    );
  }
});
