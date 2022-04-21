const spawnServer = async (sock, unixSocket) => {
    const { fork, exec } = require("child_process");
    const path = require("path");
    const fs = require("fs");

    const options = {
        slient: false,
        detached: false,
    };
    // const child = spawn(
    //     "node",
    //     [path.join(__dirname, "backend/server.js"), sock],
    //     options
    // );

    const child = await fork(
        path.join(__dirname, "backend/server.js"),
        [sock, unixSocket],
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
module.exports = spawnServer;
