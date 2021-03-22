const spawnChild = async (profile) => {
    const { spawn } = require("child_process");
    const path = require("path");
    const script = path.join(__dirname, "../../resources/snakemake.sh");
    const env = path.join(__dirname, "../../resources/snakemake/bin");
    const workflow = path.join(__dirname, "../../resources/bissprop/workflow");
    const child = spawn("bash", [script, env, profile, workflow]);

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
