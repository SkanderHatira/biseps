const spawnServer = async (sock) => {
    console.log(sock);
    console.log(sock);
    console.log(sock);
    console.log(sock);
    console.log(sock);

    const { spawn } = require("child_process");
    const path = require("path");
    const options = {
        slient: false,
        detached: true,
    };
    const child = spawn(
        "node",
        [path.join(__dirname, "backend/server.js"), sock],
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
