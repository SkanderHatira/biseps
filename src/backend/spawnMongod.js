const spawnChild = async (unixSocket) => {
    const { exec, spawn } = require("child_process");
    const path = require("path");
    const fs = require("fs");
console.log(unixSocket)
console.log("hihihihi")
console.log("hihihihi")
console.log("hihihihi")
console.log("hihihihi")
console.log("hihihihi")

    const homedir = require("os").homedir();
    const logfile = path.join(homedir, "mongoWindow.txt");
    const output = fs.openSync(logfile, "a");
    const command =
        process.platform == "win32"
            ? "conda"
            : `$(head -n 1 $HOME/.conda/environments.txt)/bin/conda`;

    const options = {
        slient: false,
        detached: true,
        shell:
            process.platform == "win32"
                ? "powershell.exe"
                : `${process.env.SHELL}`,
        stdio: ["inherit", output, output],
    };
    const port = 27017;
    const dbpath = path.join(__dirname, "resources/database/data/db");
    console.log(port,dbpath,command,unixSocket)

    const child = spawn(
        command,
        [
            "run",
            "-n",
            "bisepsMongo",
            "--no-capture-output",
            "--live-stream",
            "mongod",
            "--port",
            port,
            "--dbpath",
            dbpath,
        ],
        options
    );

    let data = "";
    for await (const chunk of child.stdout) {
        console.log("stdout chunk: " + chunk);
        data += chunk;
    }
    let error = "";
    for await (const chunk of child.stderr) {
        console.error("stderr chunk: " + chunk);
        error += chunk;
    }
    const exitCode = await new Promise((resolve, reject) => {
        child.on("close", resolve);
    });

    if (exitCode) {
        throw new Error(`subprocess error exit ${exitCode}, ${error}`);
    }
    return data;
};
module.exports = spawnChild;
