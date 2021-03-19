const canvasWidth = 500;
const canvasHeight = canvasWidth * 1.414; 
const footerHeight = canvasHeight * 0.1515;
const quadrantsMargin = 0.1; // il margine dei quadranti (tra qun quadrante e l'altro). es. 0.1 è il 10 percento della dimensione dell'immagine.
const extMargins = 0; // margini (oltre quelli dei quadranti)
module.exports = {
    canvasHeight,
    canvasWidth,
    footerHeight,
    quadrantsMargin,
    extMargins
}

// 50 / 330 = 0.1515 -> 