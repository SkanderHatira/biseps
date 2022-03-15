const spawnChild = async (unixSocket) => {
    const { spawn } = require("child_process");
    const path = require("path");
    const fs = require("fs");

    const homedir = require("os").homedir();
    const logfile = path.join(homedir, "mongoWindow.txt");
    const output = fs.openSync(logfile, "a");
    const command = process.platform == "win32" ? "conda" : "conda";
    // : `$(head -n 1 $HOME/.conda/environments.txt)/bin/conda`;

    const options = {
        slient: false,
        detached: process.platform == "win32" ? false : true,
        shell:
            process.platform == "win32"
                ? "powershell.exe"
                : `${process.env.SHELL}`,
        stdio: ["inherit", output, output],
    };
    const port = 27017;
    const dbpath = path.join(homedir, ".biseps", "database", "data", "db");
    if (!fs.existsSync(dbpath)) {
        fs.mkdirSync(dbpath, { recursive: true });
    }
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
            process.platform == "win32" ? "" : `--bind_ip ${unixSocket}`,
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
