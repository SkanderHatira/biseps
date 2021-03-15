const fromDir = async (startPath, filter) => {
    const path = require("path"),
        fs = require("fs");

    //console.log('Starting from dir '+startPath+'/');

    if (!fs.existsSync(startPath)) {
        console.log("no dir ", startPath);
        return;
    }

    const files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            await fromDir(filename, filter); //recurse
        } else if (filename.indexOf(filter) >= 0) {
            console.log("-- found: ", filename);
        }
    }
};
module.exports = fromDir;
