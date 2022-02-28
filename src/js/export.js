function exportCAD() {
    let data = {
        square: Squares,
        rectangle: Rectangles,
        lines: Lines,
        polygon: Polygons
    }
    
    return JSON.stringify(data);
}

async function save() {
    const exportOptions = {
        types: [
            {
                description: '2D Web-CAD',
                accept: {
                    'text/json': ['.json'],
                }
            }
        ]
    }

    const handle = await window.showSaveFilePicker(exportOptions); 
    let stream = await handle.createWritable();
    await stream.write(exportCAD());
    await stream.close()
}