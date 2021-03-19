const fs = require("fs").promises;
const path = require("path");
const fabric = require('fabric').fabric

exports.handler = async () => {
  try {
    const content = await fs.readFile(path.join(__dirname, "data.json"), {
      encoding: "utf-8"
    });

    var canvas = new fabric.StaticCanvas(null, { width: 200, height: 200 });
    var text = new fabric.Text('Hello world', {
      left: 100,
      top: 100,
      fill: '#f55',
      angle: 15
    });
    canvas.add(text);
    canvas.renderAll();
    const base64ImageOutput = canvas.toDataURL();

    return {
      statusCode: 200,
      body: base64ImageOutput
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e
    };
  }
};