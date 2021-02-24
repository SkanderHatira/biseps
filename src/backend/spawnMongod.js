async function spawnChild() {
    const { spawn } = require("child_process");
    const isDev = require("electron-is-dev");
    const path = require("path");
    const options = {
        slient: true,
        detached: false,
    };
    const command = "bash";
    const args = [
        path.join(__dirname, "resources/database/mongod.sh"),
        path.join(__dirname, "resources/database/mongo/bin/activate"),
        path.join(__dirname, "resources/database/data/db"),
    ];

    const child = spawn(command, args, options);

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
spawnChild().then(
    (data) => {
        console.log("async result:\n" + data);
    },
    (err) => {
        console.error("async error:\n" + err);
    }
);
