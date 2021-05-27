const spawnChild = async (body, profile, uniqueDir) => {
    const { execFile, exec, execFileSync } = require("child_process");
    let Client = require("ssh2-sftp-client");
    const path = require("path");
    const env = path.join(__dirname, "../resources/snakemake/bin");
    const slurmScript = path.join(__dirname, "../resources/slurmScript.sh");
    const remoteScript = path.join(
        __dirname,
        "../resources/remoteSnakemake.sh"
    );
    const localScript = path.join(__dirname, "../resources/snakemake.sh");
    const workflow = path.join(__dirname, "../resources/bissprop/");
    const conda = "/local/env/envconda.sh";
    const options = {
        slient: false,
        detached: true,
    };
    if (body.remote) {
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
            const child = execFileSync(
                remoteScript,
                [env, profile, uniqueDir],
                options
            );
            let sftp = new Client();
            sftp.connect({
                host: body.machine.hostname,
                port: body.machine.port,
                username: body.machine.username,
                privateKey: require("fs").readFileSync(body.machine.privateKey),
            })
                .then(() => {
                    return sftp.fastPut(
                        path.join(uniqueDir, "workflow.tar.gz"),
                        path.join(body.remoteOutdir, "workflow.tar.gz")
                    );
                })
                .then((data) => {
                    console.log("Snakemake in remote");
                    sftp.end();
                })
                .catch((err) => {
                    console.log(err, "catch error");
                });
        }
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
