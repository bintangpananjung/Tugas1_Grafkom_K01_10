const vertexShaderText = `
precision mediump float;
attribute vec4 vertPosition;
void main() {
  gl_Position = vec4(vertPosition);
}
`;

const fragmentShaderText = `
precision mediump float;
void main(){
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}
`;

const InitWebGL = function () {
  console.log("yes");

  //init webgl
  /** @type {HTMLCanvasElement} */
  const canvas = document.getElementById("polygon-canvas");
  var gl = canvas.getContext("webgl");
  if (!gl) {
    gl = canvas.getContext("experimental-webgl");
  }
  if (!gl) {
    alert("Give up");
  }
  gl.clearColor(1, 1, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  gl.shaderSource(vertexShader, vertexShaderText);
  gl.shaderSource(fragmentShader, fragmentShaderText);

  gl.compileShader(vertexShader);
  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    console.log("error compiling vertex shader");
  }
  gl.compileShader(fragmentShader);
  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    console.log("error compiling fragment shader");
  }

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.log("error linking program");
  }

  gl.validateProgram(program);
  if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
    console.log("error validating program");
  }
  const triangleVertices = [
    -0.5, 0.5, 0.0, 1.0, 0.5, 0.5, 0.0, 1.0, -0.5, -0.5, 0.0, 1.0, 0.5, -0.5,
    0.0, 1.0,
  ];

  const triangleVertexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(triangleVertices),
    gl.STATIC_DRAW
  );

  const positionAttr = gl.getAttribLocation(program, "vertPosition");
  gl.vertexAttribPointer(
    positionAttr,
    4,
    gl.FLOAT,
    gl.FALSE,
    4 * Float32Array.BYTES_PER_ELEMENT,
    0
  );
  gl.enableVertexAttribArray(positionAttr);

  gl.useProgram(program);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};
