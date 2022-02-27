const vertexShaderText = `
precision mediump float;
attribute vec2 vertPosition;
attribute vec3 color;
varying vec3 vertColor;
void main() {
  gl_Position = vec4(vertPosition,0.0,1.0);
  vertColor = color;
  gl_PointSize = 5.0;
}
`;

const fragmentShaderText = `
precision mediump float;
varying vec3 vertColor;
void main(){
  gl_FragColor = vec4(vertColor,1.0);  
}
`;

function getCursorPos(canvas, event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  return { x: x, y: y };
}

var canvas = document.getElementById("glCanvas");
var gl = canvas.getContext("webgl");
var program = gl.createProgram();
var baseColor = [0, 0, 0];
// var drawing = { Lines: [], Squares: [], Rectangles: [], Polygons: [{}] };
var Squares = [];
var Rectangles = [];
var Lines = [];
var Polygons = [];
const InitWebGL = function () {
  console.log("yes");

  //init webgl
  /** @type {HTMLCanvasElement} */

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
  gl.useProgram(program);
  var VertexBufferObject = gl.createBuffer();
  var colorBufferObject = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, VertexBufferObject);
  // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(2 * 8000), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBufferObject);
};
document.querySelectorAll(".shapes input").forEach(e => {
  e.addEventListener("change", val => {
    val.preventDefault();
    renderLine(document.getElementsByName("shape")[0].checked);
    renderSquare(document.getElementsByName("shape")[1].checked);
    renderRectangle(document.getElementsByName("shape")[2].checked);
    renderPolygon(Polygons, document.getElementsByName("shape")[3].checked);
  });
});

function renderAll() {
  // gl.clearColor(1, 1, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
}
