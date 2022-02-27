const hexToRgb = hex =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => "#" + r + r + g + g + b + b
    )
    .substring(1)
    .match(/.{2}/g)
    .map(x => parseInt(x, 16) / 255);
const renderPrevPolygon = function (polygon) {
  let offset = polygon.offset[0];
  if (polygon.offset.length > 1) {
    for (let i = 1; i < polygon.offset.length; i++) {
      gl.bindBuffer(gl.ARRAY_BUFFER, VertexBufferObject);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(
          polygon.Vertices.slice(offset * 2, polygon.offset[i] * 2)
        ),
        gl.STATIC_DRAW
      );
      const positionAttr = gl.getAttribLocation(program, "vertPosition");
      gl.vertexAttribPointer(positionAttr, 2, gl.FLOAT, gl.FALSE, 0, 0);
      gl.enableVertexAttribArray(positionAttr);
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferObject);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(
          polygon.Colors.slice(offset * 3, polygon.offset[i] * 3)
        ),
        gl.STATIC_DRAW
      );
      const colorAttr = gl.getAttribLocation(program, "color");
      gl.vertexAttribPointer(colorAttr, 3, gl.FLOAT, gl.FALSE, 0, 0);
      gl.enableVertexAttribArray(colorAttr);

      gl.drawArrays(gl.TRIANGLE_FAN, 0, polygon.offset[i] - offset);
      offset = polygon.offset[i];
    }
  }
};
const renderCurrPolygon = function (polygon) {
  gl.bindBuffer(gl.ARRAY_BUFFER, VertexBufferObject);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(
      polygon.Vertices.slice(
        polygon.offset[polygon.offset.length - 1] * 2,
        polygon.Vertices.length
      )
    ),
    gl.STATIC_DRAW
  );
  const positionAttr = gl.getAttribLocation(program, "vertPosition");
  gl.vertexAttribPointer(positionAttr, 2, gl.FLOAT, gl.FALSE, 0, 0);
  gl.enableVertexAttribArray(positionAttr);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferObject);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(
      polygon.Colors.slice(
        polygon.offset[polygon.offset.length - 1] * 3,
        polygon.Colors.length
      )
    ),
    gl.STATIC_DRAW
  );
  const colorAttr = gl.getAttribLocation(program, "color");
  gl.vertexAttribPointer(colorAttr, 3, gl.FLOAT, gl.FALSE, 0, 0);
  gl.enableVertexAttribArray(colorAttr);
  n_vertex =
    polygon.Vertices.length / 2 - polygon.offset[polygon.offset.length - 1];
  gl.drawArrays(gl.TRIANGLE_FAN, 0, n_vertex);
};
const renderPolygon = function (polygon, isPolygon) {
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
  drawing.Vertices.push(x);
  drawing.Vertices.push(y);
  drawing.Colors.push(...baseColor);

  //draw previous polygon
  renderPrevPolygon(drawing);
  renderCurrPolygon(drawing);
}
const changePolygonColor = function (polygon, color) {
  baseColor = hexToRgb(color);
  // console.log(polygon.Colors);
  polygon.Colors = polygon.Colors.slice(
    0,
    polygon.offset[polygon.offset.length - 1] * 3
  );
  for (let index = 0; index < n_vertex; index++) {
    polygon.Colors.push(...baseColor);
  }
  renderPrevPolygon(polygon);
  renderCurrPolygon(polygon);
};
var VertexBufferObject = gl.createBuffer();
var colorBufferObject = gl.createBuffer();
var n_vertex = 0;
// document.getElementsByName("shape")[3].addEventListener("change", e => {
//   if (document.getElementsByName("shape")[3].value === "polygon") {
//     renderPolygon(polygon);
//   }
// });
document.getElementById("polygon-color").addEventListener("change", e => {
  changePolygonColor(polygon, e.target.value);
});
document.getElementById("init-polygon").addEventListener("click", e => {
  if (n_vertex > 2) {
    drawing.render.push({
      offset: n_vertex + polygon.offset[polygon.offset.length - 1],
      mode: "polygon",
    });
  }
});
