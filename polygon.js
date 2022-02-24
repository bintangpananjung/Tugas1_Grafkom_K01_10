const vertexShaderText = `
precision mediump float;
attribute vec2 vertPosition;
attribute vec3 vertColor;
varying vec3 fragColor;
void main() {
  fragColor = vertColor;
  gl_Position = vec4(vertPosition,0.0,1.0);
}
`;

const fragmentShaderText = `
precision mediump float;
varying vec3 fragColor;
void main(){
  gl_FragColor = vec4(fragColor,1.0);
}
`;

function getCursorPos(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  return { x: x, y: y };
}
// function getNoPaddingNoBorderCanvasRelativeMousePosition(event, target) {
//   target = target || event.target;
//   var pos = getRelativeMousePosition(target, event);

//   pos.x = (pos.x * target.width) / target.clientWidth;
//   pos.y = (pos.y * target.height) / target.clientHeight;

//   return pos;
// }

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
  gl.viewport(0, 0, canvas.width, canvas.height);

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
  const Vertices = [];
  var vertLen = 0;
  console.log(Vertices.length / 2);
  const VertexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, VertexBufferObject);
  const positionAttr = gl.getAttribLocation(program, "vertPosition");
  const colorAttr = gl.getAttribLocation(program, "vertColor");

  gl.vertexAttribPointer(
    positionAttr,
    2,
    gl.FLOAT,
    gl.FALSE,
    5 * Float32Array.BYTES_PER_ELEMENT,
    0
  );
  gl.vertexAttribPointer(
    colorAttr,
    3,
    gl.FLOAT,
    gl.FALSE,
    5 * Float32Array.BYTES_PER_ELEMENT,
    2 * Float32Array.BYTES_PER_ELEMENT
  );
  gl.enableVertexAttribArray(positionAttr);
  gl.enableVertexAttribArray(colorAttr);
  canvas.addEventListener("mousedown", function (e) {
    // getNoPaddingNoBorderCanvasRelativeMousePosition(e, canvas);
    var pos = getCursorPos(canvas, e);
    const x = (pos.x / canvas.width) * 2 - 1;
    const y = (pos.y / canvas.height) * -2 + 1;
    Vertices.push(x);
    Vertices.push(y);
    Vertices.push(...[1, 0.2, 0.2]);
    vertLen += 1;
    console.log(Vertices);
    console.log("x: " + x + " y: " + y);

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(Vertices), gl.STATIC_DRAW);

    gl.useProgram(program);
    gl.drawArrays(gl.TRIANGLE_FAN, 0, vertLen);
  });
};
