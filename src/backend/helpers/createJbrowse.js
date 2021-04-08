const createJbrowse = (jbPath, reset) => {
    const fs = require("fs");
    const ncp = require("ncp").ncp;
    const path = require("path");
    const source = path.join(__dirname, "../../resources/jbrowse2");
    if (reset) {
        fs.rmdirSync(jbPath, { recursive: true });
    }
    ncp(source, jbPath, function (err) {
        if (err) {
            return console.error(err);
        }

        console.log(jbPath);
        console.log("done!");
    });
};
module.exports = createJbrowse;
