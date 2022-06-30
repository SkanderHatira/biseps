const createJbrowse = (jbPath, reset) => {
    const fs = require("fs");
    const ncp = require("ncp").ncp;
    const path = require("path");
    const homedir = require("os").homedir();
    const source = path.join(homedir, ".biseps", "jbrowse2");
    if (reset) {
        fs.rmdirSync(jbPath, { recursive: true });
    }
    ncp(source, jbPath, function (err) {
        if (err) {
            return console.error(err);
        }

        console.log("done!");
    });
};
module.exports = createJbrowse;
