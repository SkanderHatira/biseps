const createArchive = (uniqueDir) => {
    const { execSync } = require("child_process");
    const path = require("path");
    const fs = require("fs");

    execSync(
        `git ${
            process.platform == "win32" ? "-c core.autocrlf=false" : ""
        } clone https://forgemia.inra.fr/skander.hatira/biseps.git ${uniqueDir}`,
        (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        }
    );
};
module.exports = createArchive;
