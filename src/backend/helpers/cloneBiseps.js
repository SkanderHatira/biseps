const cloneBiseps = (body, uniqueDir) => {
    const { execSync } = require("child_process");
    const path = require("path");
    const fs = require("fs");

    execSync(
        `git  ${
            process.platform == "win32" ? "-c core.autocrlf=false" : ""
        }  clone https://forgemia.inra.fr/irhs-bioinfo/biseps.git ${uniqueDir}`,
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
    fs.copyFile(
        body.machine.script,
        path.join(uniqueDir, "exec_scripts", "script.sh"),
        (err) => {
            if (err) throw err;
            console.log("script  was copied to destination");
        }
    );
};
module.exports = cloneBiseps;
