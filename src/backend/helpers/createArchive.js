const createArchive = (uniqueDir) => {
    const { execSync } = require("child_process");
    const path = require("path");
    const fs = require("fs");

    execSync(
        `git -c core.autocrlf=false clone https://o2auth:${process.env.ACCESS_TOKEN}forgemia.inra.fr/skander.hatira/biseps.git ${uniqueDir}`,
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
