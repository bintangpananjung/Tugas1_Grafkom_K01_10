const renderLine = function () {
    const vertices = []

    canvas.addEventListener("mousedown", function(e) {
        // Get vertices from mouse
        var pos = getCursorPos(canvas, e);
        const x = (pos.x / canvas.width) * 2 - 1;
        const y = (pos.y / canvas.height) * -2 + 1;
        vertices.push(x);
        vertices.push(y);

        const positionAttr = gl.getAttribLocation(program, "vertPosition");
        gl.vertexAttribPointer(
            positionAttr,
            2,
            gl.FLOAT,
            false,
            2 * Float32Array.BYTES_PER_ELEMENT,
            0
        )

        gl.enableVertexAttribArray(positionAttr);

        gl.useProgram(program);

        var mode = [gl.POINTS, gl.LINES]
        mode.forEach(element => {
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
            gl.drawArrays(element, 0, vertices.length / 2);
        });
    });
}

document.getElementsByName("shape")[0].addEventListener("change", e => {
    if (document.getElementsByName("shape")[0].value === "line") {
      renderLine();
    }
  });