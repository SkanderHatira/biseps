const cloneBiseps = (uniqueDir) => {
    const { execSync } = require("child_process");
    const path = require("path");
    const fs = require("fs");

    execSync(
        `git clone -b slurm git@forgemia.inra.fr:skander.hatira/bissprop.git ${uniqueDir}`,
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
module.exports = cloneBiseps;
