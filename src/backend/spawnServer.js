const spawnServer = async (sock) => {
    const { fork, exec } = require("child_process");
    const path = require("path");
    const fs = require("fs");
    // exec(
    //     "bash  " + path.join(__dirname, "resources/checkConda.sh"),
    //     (error, stdout, stderr) => {
    //         fs.writeFileSync(
    //             "/home/shatira/server.txt",
    //             stdout + error + stderr,
    //             function (err) {
    //                 if (err) throw err;
    //                 console.log("Saved!");
    //             }
    //         );

    //         if (error) {
    //             console.log(`error: ${error.message}`);
    //         }
    //         if (stderr) {
    //             console.log(`stderr: ${stderr}`);
    //         }

    //         console.log(`stdout: ${stdout}`);
    //     }
    // );
    // const options = {
    //     slient: false,
    //     detached: false,
    // };
    // const child = spawn(
    //     "node",
    //     [path.join(__dirname, "backend/server.js"), sock],
    //     options
    // );

    const child = fork(
        path.join(__dirname, "backend/server.js"),
        [sock],
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
