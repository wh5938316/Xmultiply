function layerMerge(props, mode) {
    const {design, origin, pixel} = props;
    let cvs = false;
    switch (mode) {
        case "SOM":
            cvs = ScreenOverlayMultiply(design, origin, pixel);
            return cvs;
        default:
            cvs = ScreenOverlayMultiply(design, origin, pixel);
            return cvs;
    }
}

/**
 * screen, overlay, multiply 三种合成方法叠加获得
 * @param angle 角度
 * @return String
 */
function ScreenOverlayMultiply(design, origin, pixel) {
    let multiplyCvs = merge(origin, design, 1, "multiply", pixel);
    let overlayCvs = merge(multiplyCvs, origin, .15, "overlay", pixel);
    let screenCvs = merge(overlayCvs, origin, .15, "screen", pixel);

    let cvs = document.createElement('canvas');
    cvs.width = pixel;
    cvs.height = pixel;
    let ctx = cvs.getContext("2d");
    ctx.drawImage(multiplyCvs, 0, 0, multiplyCvs.width, multiplyCvs.height, 0, 0, pixel, pixel);
    ctx.drawImage(overlayCvs, 0, 0, overlayCvs.width, overlayCvs.height, 0, 0, pixel, pixel);
    ctx.drawImage(screenCvs, 0, 0, screenCvs.width, screenCvs.height, 0, 0, pixel, pixel);

    return cvs;
}

function merge(cvs1, cvs2, alpha, mode, pixel) {
    
    // const existMode = [
    //     'screen', 'overlay', 'multiply'
    // ];
    let cvs = document.createElement('canvas');
    cvs.width = pixel ? pixel : 750;
    cvs.height = pixel ? pixel : 750;
    let ctx = cvs.getContext("2d");
    ctx.globalAlpha = alpha;
    ctx.globalCompositeOperation = mode;
    ctx.drawImage(cvs1, 0, 0, cvs1.width, cvs1.height, 0, 0, pixel, pixel);
    ctx.drawImage(cvs2, 0, 0, cvs2.width, cvs2.height, 0, 0, pixel, pixel);

    return cvs;
}

export default layerMerge
