const fs = require("fs").promises;
const path = require("path");
const fabric = require("fabric").fabric;
const canvasDimensions = require("mbres/constants/dimensions");
const generatoreService = require ("mbres/utils/utils");

exports.handler = async () => {
  try {
    const content = await fs.readFile(path.join(__dirname, "data.json"), {
      encoding: "utf-8",
    });
    // MBRESS

    // eslint-disable-line no-undef
    // Only allow POST
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }

    // When the method is POST, the name will no longer be in the event’s
    // queryStringParameters – it’ll be in the event body encoded as a query string
    const payload = JSON.parse(event.body);
    const name = payload.name || "World";

    const filename =
      (payload?.id || generatoreService.makeid(10)) +
      generatoreService.getDateHash();

    //importazione font custom

    fabric.nodeCanvas.registerFont(
      path.join(__dirname, "LibreBaskerville-Regular.ttf"),
      {
        family: "LibreBaskerville",
        weight: "regular",
        style: "normal",
      }
    );

    fabric.nodeCanvas.registerFont(
      path.join(__dirname, "LibreBaskerville-Regular.ttf"),
      {
        family: "LibreBaskerville",
        weight: "bold",
        style: "normal",
      }
    );

    fabric.nodeCanvas.registerFont(
      path.join(__dirname, "LibreBaskerville-Regular.ttf"),
      {
        family: "LibreBaskerville",
        weight: "regular",
        style: "italic",
      }
    );

    var canvas;

    try {
      canvas = new fabric.StaticCanvas(null, {
        width: canvasDimensions.canvasWidth,
        height: canvasDimensions.canvasHeight,
      });
    } catch (error) {
      return { statusCode: 501, body: "Errore creazione canvas" };
    }
    console.log("STEP1");
    try {
      generatoreService.generateBackground(
        payload.tipologie,
        canvas,
        payload.tipologie
      );
    } catch (error) {
      return { statusCode: 501, body: "Errore background" };
    }

    console.log("STEP2");
    try {
      generatoreService.generateBottom(payload.anno, canvas, payload.tipologie);
    } catch (error) {
      return { statusCode: 501, body: "Errore bottom" };
    }

    console.log("STEP3");
    try {
      generatoreService.generateLogo(canvas, payload.tipologie);
    } catch (error) {
      return { statusCode: 501, body: "Errore logo" };
    }

    console.log("STEP4");
    try {
      generatoreService.generateTitle(
        payload.titolo,
        canvas,
        payload.tipologie
      );
    } catch (error) {
      return { statusCode: 501, body: "Errore title" };
    }

    console.log("STEP5");
    try {
      canvas.renderAll();
    } catch (error) {
      return { statusCode: 501, body: "Errore render" };
    }

    const base64ImageOutput = canvas.toDataURL();

    // MBRESS

    return {
      statusCode: 200,
      body: base64ImageOutput,
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: e,
    };
  }
};
