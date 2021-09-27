const spawnChild = async () => {
    const { exec, spawn } = require("child_process");
    const path = require("path");
    const fs = require("fs");

    console.log(process.env.SHELL);
    const homedir = require("os").homedir();
    const logfile = path.join(homedir, "mongoWindow.txt");
    const output = fs.openSync(logfile, "a");
    const command = process.platform == "win32" ? "conda" : `conda`;

    const options = {
        slient: false,
        detached: true,
        shell:
            process.platform == "win32"
                ? process.env.ComSpec
                : `${process.env.SHELL}`,
        stdio: ["inherit", output, output],
    };

    const port = 27017;
    const dbpath = path.join(__dirname, "resources/database/data/db");
    const unixSocket = "/tmp/bisepsmongodb.sock";

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
            "--bind_ip",
            unixSocket,
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
