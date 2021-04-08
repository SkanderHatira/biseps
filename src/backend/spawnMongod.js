const spawnChild = async () => {
    const { spawn } = require("child_process");
    const path = require("path");
    const command = "bash";
    const options = {
        slient: false,
        detached: true,
    };

    const script = "resources/database/mongod.sh";
    const env = "resources/database/mongo/bin/";
    const port = 27017;
    const dbpath = "resources/database/data/db";
    const unixSocket = "/tmp/bisspropmongodb.sock";

    const child = spawn(
        command,
        [script, env, port, dbpath, unixSocket],
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
