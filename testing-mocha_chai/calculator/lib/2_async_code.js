var fs = require('fs')
var path = require('path')

module.exports = function (dir, extension, callback) {
    
    fs.readdir(dir, function (err, data) {
        if (err) {
            return callback(err);
        }
        var filtered = data.filter((file) => path.extname(file) === extension);
        return callback(err, filtered);
    })
};

