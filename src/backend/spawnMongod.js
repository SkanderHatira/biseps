const spawnChild = async () => {
    const { spawn } = require("child_process");
    const path = require("path");
    const command = "conda";
    const options = {
        slient: false,
        detached: true,
    };

    const port = 27017;
    const dbpath = path.join(__dirname, "resources/database/data/db");
    const unixSocket = "/tmp/bisspropmongodb.sock";

    const child = spawn(
        command,
        [
            "run",
            "-n",
            "bisepsMongo",
            "mongod",
            "--port",
            port,
            "--dbpath",
            dbpath,
            "--bind_ip",
            unixSocket,
            "--filePermissions",
            "0777",
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
