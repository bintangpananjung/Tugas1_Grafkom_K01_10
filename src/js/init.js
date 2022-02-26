const vertexShaderText = `
precision mediump float;
attribute vec2 vertPosition;
void main() {
  gl_Position = vec4(vertPosition,0.0,1.0);
}
`;

const fragmentShaderText = `
precision mediump float;
void main(){
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
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
var canvas = document.getElementById("glCanvas");
var gl = canvas.getContext("webgl");
var program = gl.createProgram();

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

  const VertexBufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, VertexBufferObject);
};
