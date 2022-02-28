async function openfile() {
  // Open file Parameter
  const importOptions = {
    multiple: false,
    excludeAcceptAllOption: true,
    types: [
      {
        desciption: "2D Web-CAD",
        accept: {
          "text/json": [".json"],
        },
      },
    ],
  };

  let [fileHandle] = await window.showOpenFilePicker(importOptions);
  let fileData = await fileHandle.getFile();
  let contents = await fileData.text();

  json_file = JSON.parse(contents);

  // Deep copy vertex and colors
  // Square
  Squares.Vertices = [...json_file.square.Vertices];
  Squares.Colors = [...json_file.square.Colors];

  // Rectangles
  Rectangles.Vertices = [...json_file.rectangle.Vertices];
  Rectangles.Colors = [...json_file.rectangle.Colors];

  // Lines
  Lines.Vertices = [...json_file.lines.Vertices];
  Lines.Colors = [...json_file.lines.Colors];

  // Polygons
  Polygons.Vertices = [...json_file.polygon.Vertices];
  Polygons.Colors = [...json_file.polygon.Colors];

  // vertices = [...json_file.lines.Vertices]

  // Clear Canvas
  gl.clearColor(1, 1, 1, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Render
  renderAll();
}
