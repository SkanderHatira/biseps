const spawnChild = async (body, profile) => {
    const { execFile, exec } = require("child_process");
    const path = require("path");
    const env = path.join(__dirname, "../resources/snakemake/bin");
    const slurmScript = path.join(__dirname, "../resources/slurmScript.sh");
    const localScript = path.join(__dirname, "../resources/snakemake.sh");
    const workflow = path.join(__dirname, "../resources/bissprop/workflow");
    const conda = "/local/env/envconda.sh";
    const options = {
        slient: false,
        detached: true,
    };
    if (body.cluster) {
        const child = exec(
            `sbatch ${slurmScript}  ${env} ${profile} ${workflow} ${conda}`,
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
    } else {
        const child = execFile(localScript, [env, profile, workflow], options);
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
};
module.exports = spawnChild;
