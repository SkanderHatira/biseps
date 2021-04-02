const createJbrowse = (jbPath) => {
    const fs = require("fs");
    const ncp = require("ncp").ncp;
    const path = require("path");
    const source = path.join(__dirname, "../../resources/jbrowse2");
    ncp(source, jbPath, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("done!");
    });
};
module.exports = createJbrowse;
