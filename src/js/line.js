var lineVBuffer = gl.createBuffer();
var lineCBuffer = gl.createBuffer();

function lineListener(e) {
  var pos = getCursorPos(canvas, e);
  const x = (pos.x / canvas.width) * 2 - 1;
  const y = (pos.y / canvas.height) * -2 + 1;

  // // check if points are clicked
  // var clicked = getLineVertice(x, y, Lines.Vertices);
  // if (clicked !== -1) {
  //   function dragVertices(event) {
  //     var tempCursor = getCursorPos(canvas, event);
  //     var deltax = (tempCursor.x / canvas.width) * 2 - 1;
  //     var deltay = (tempCursor.y / canvas.width) * -2 + 1;
  //     console.log("[" + deltay + ", " + tempCursor.y + "]");
  //     Lines.Vertices[clicked] = deltax;
  //     Lines.Vertices[clicked + 1] = deltay;
  //     renderAll();
  //   }

  //   function removeDragEvent(event) {
  //     document.removeEventListener("mousemove", dragVertices);
  //   }

  //   console.log(
  //     "Vertices clicked : " +
  //       Lines.Vertices[clicked] +
  //       ", " +
  //       Lines.Vertices[clicked + 1]
  //   );
  //   document.addEventListener("mousemove", dragVertices);
  //   document.addEventListener("mouseup", removeDragEvent);
  //   return;
  // }

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

const changeLine = function (e) {
  var pos = getCursorPos(canvas, e);
  const x = (pos.x / canvas.width) * 2 - 1;
  const y = (pos.y / canvas.height) * -2 + 1;

  // check if points are clicked
  var clicked = getLineVertice(x, y, Lines.Vertices);
  if (clicked !== -1) {
    function dragVertices(event) {
      var tempCursor = getCursorPos(canvas, event);
      var deltax = (tempCursor.x / canvas.width) * 2 - 1;
      var deltay = (tempCursor.y / canvas.width) * -2 + 1;
      // console.log("[" + deltay + ", " + tempCursor.y + "]");
      Lines.Vertices[clicked] = deltax;
      Lines.Vertices[clicked + 1] = deltay;
      renderAll();
    }

    function removeDragEvent(event) {
      document.removeEventListener("mousemove", dragVertices);
    }

    // console.log(
    //   "Vertices clicked : " +
    //     Lines.Vertices[clicked] +
    //     ", " +
    //     Lines.Vertices[clicked + 1]
    // );
    document.addEventListener("mousemove", dragVertices);
    document.addEventListener("mouseup", removeDragEvent);
    return;
  }
};

const renderChangeLine = function (isLine) {
  if (isLine) {
    canvas.addEventListener("mousedown", changeLine);
  } else {
    canvas.removeEventListener("mousedown", changeLine);
  }
};

const renderLine = function (isLine) {
  if (isLine) {
    canvas.addEventListener("mousedown", lineListener);
  } else {
    canvas.removeEventListener("mousedown", lineListener);
  }
};

function distance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function getLineVertice(mouseX, mouseY, vertices) {
  var treshold = 0.015;
  var offset = 2;
  for (let i = 0; i < vertices.length / 2; i++) {
    if (
      distance(mouseX, mouseY, vertices[offset * i], vertices[offset * i + 1]) <
      treshold
    ) {
      return i * offset;
    }
  }

  return -1;
}
