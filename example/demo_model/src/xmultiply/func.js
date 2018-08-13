function isNum(value) {
    var re = /^[0-9]+.?[0-9]*$/; 
    if (re.test(value)) {
        return true;
    } else {
        return false;
    }
}

function isInt(value) {
    var re = /^[1-9]+[0-9]*]*$/;
    if (re.test(value)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 角度转弧度
 * @param angle 角度
 * @return String
 */
function radianFromAngle(angle) {

    return Math.PI / 180 * angle;
}

/**
 * 弧度转角度
 * @param angle 弧度
 * @return String
 */
function angleFromRadian(radian) {

    return 180 / Math.PI * radian;
}

export { isNum, isInt, radianFromAngle, angleFromRadian }
