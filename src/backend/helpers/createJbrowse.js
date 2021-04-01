const createJbrowse = (body) => {
    const fs = require("fs");
    const ncp = require("ncp").ncp;
    const path = require("path");
    const source = path.join(__dirname, "../../resources/jbrowse2");
    const destination = path.join(
        __dirname,
        `../../resources/users/${body.name}/`
    );
    console.log(`creating Jbrowse For ${body.name}`);
    ncp(source, destination, function (err) {
        if (err) {
            return console.error(err);
        }
        console.log("done!");
    });
};
module.exports = createJbrowse;
