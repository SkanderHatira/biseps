async function spawnServer() {
    const options = {
        slient: true,
        detached: false,
    };
    const { spawn } = require("child_process");
    const path = require("path");
    const child = spawn(
        "node",
        [path.join(__dirname, "src/backend/server.js")],
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
}
spawnServer().then(
    (data) => {
        console.log("async result:\n" + data);
    },
    (err) => {
        console.error("async error:\n" + err);
    }
);
