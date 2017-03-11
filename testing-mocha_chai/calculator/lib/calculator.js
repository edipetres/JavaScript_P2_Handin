
exports.add = function (n1, n2) {
    return n1 + n2;
}

exports.subtract = function (n1, n2) {
        return n1 - n2;
}
exports.multiply = function (n1, n2) {
        return n1 * n2;
}

exports.divide = function(n1,n2) {
    if (n2 === 0) {
        throw new Error("Attempt to divide by zero");
    }
    return n1 / n2;
}